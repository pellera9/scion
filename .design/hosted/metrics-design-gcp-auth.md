# GCP Authentication for Agent Telemetry Export

**Status:** Draft — Pending Technical Review
**Date:** 2026-03-03
**Parent Document:** [Hosted Scion Metrics System Design](metrics-system.md)

---

## 1. Context

The [Metrics System Design](metrics-system.md) establishes Google Cloud Observability (Cloud Trace, Cloud Logging, Cloud Monitoring) as the primary telemetry backend (§11.1). Section 11.8 deferred credential injection as out-of-scope, noting that the system would assume the "application default credentials" (ADC) pattern and leave it to the Runtime Broker to make credentials available.

This document supersedes §11.8 by defining a concrete, GCP-specific credential injection strategy for agent telemetry. While the overall OTEL pipeline remains vendor-agnostic, authenticating to GCP endpoints requires a targeted solution that:

1. Provides a hub-managed, least-privilege service account key dedicated to telemetry writes.
2. Injects the key into agent containers during provisioning.
3. Uses a **scion-specific environment variable** (not `GOOGLE_APPLICATION_CREDENTIALS`) so the credential is consumed exclusively by the sciontool OTEL exporter and is not inadvertently discovered by other Google client libraries running in the container.

---

## 2. Design Principles

1. **Telemetry-Scoped Credential**: The injected key must only be usable for writing telemetry data. It must not grant access to any other GCP resources.
2. **Collector-Only Visibility**: The credential must not be surfaced through `GOOGLE_APPLICATION_CREDENTIALS` or placed in the ADC well-known location (`~/.config/gcloud/application_default_credentials.json`), preventing any other Google SDK in the container from discovering it.
3. **Hub as Credential Authority**: The Hub (or its backing secrets store) is the single source of truth for the telemetry service account key. Brokers do not manage their own keys.
4. **Leverage Existing Infrastructure**: File injection and environment variable mechanisms already exist in the provisioning pipeline. This design should use them rather than introduce new projection channels.

---

## 3. GCP IAM Configuration

### 3.1 Dedicated Service Account

A GCP service account is created specifically for telemetry ingestion:

```
scion-telemetry-writer@<project-id>.iam.gserviceaccount.com
```

### 3.2 Minimum Required IAM Roles

The service account is granted only the following predefined roles at the project level:

| Role | Purpose |
|------|---------|
| `roles/cloudtrace.agent` | Write trace spans to Cloud Trace |
| `roles/logging.logWriter` | Write log entries to Cloud Logging |
| `roles/monitoring.metricWriter` | Write custom metrics to Cloud Monitoring |

No other roles should be granted. The account must not have `roles/editor`, `roles/owner`, or any data-read permissions.

### 3.3 Key Management

A JSON key file is generated for this service account and stored as a Hub-managed secret. Key rotation is handled out-of-band (see §7, Open Questions).

---

## 4. Credential Injection Flow

### 4.1 Overview

```
┌──────────────┐       ┌───────────────────┐       ┌───────────────────────────────┐
│   Scion Hub  │       │  Runtime Broker    │       │     Agent Container           │
│              │       │                    │       │                               │
│  Stores SA   │──────▶│  Receives key in   │──────▶│  Key written to agent-home:   │
│  key as a    │ Agent │  CreateAgent       │ File  │  ~/.scion/telemetry-gcp-     │
│  secret      │ Dispatch  dispatch payload │ Inject│  credentials.json            │
│              │       │                    │       │                               │
│  Attaches    │       │  Stages file in    │ Env   │  SCION_OTEL_GCP_CREDENTIALS  │
│  to grove    │       │  agent-home dir    │ Set   │  set to file path            │
│  config      │       │                    │       │                               │
└──────────────┘       └───────────────────┘       └───────────────────────────────┘
```

### 4.2 Hub: Secret Storage

The telemetry SA key is stored using the existing secrets system ([Secrets Design](secrets.md)) as a **file-type secret** scoped to the grove:

| Field | Value |
|-------|-------|
| **Name** | `scion-telemetry-gcp-credentials` |
| **Type** | `file` |
| **Target** | `~/.scion/telemetry-gcp-credentials.json` |
| **Scope** | `grove` (or `runtime_broker` — see §7.3) |
| **Value** | Base64-encoded service account JSON key |

When telemetry is enabled for a grove with the `gcp` cloud backend, the Hub includes this secret in the `ResolvedSecrets` list within the `CreateAgent` dispatch payload sent to the broker.

### 4.3 Broker: File Staging

The Runtime Broker receives the secret through the standard `CreateAgent` dispatch flow and stages it using the existing `writeFileSecrets` mechanism (`pkg/runtime/common.go`):

1. The base64-encoded key content is decoded and written to the host-side staging directory: `<agent-dir>/secrets/scion-telemetry-gcp-credentials`
2. The file is bind-mounted read-only into the container at `~/.scion/telemetry-gcp-credentials.json`
3. File permissions are set to `0600` (owner-read only).

No new file-staging code is required; the existing secrets projection pipeline handles this.

### 4.4 Broker: Environment Variable Injection

In addition to staging the file, the broker sets a scion-specific environment variable to inform sciontool where to find the credential:

```
SCION_OTEL_GCP_CREDENTIALS=/home/<user>/.scion/telemetry-gcp-credentials.json
```

This variable is set alongside the existing telemetry env vars emitted by `TelemetryConfigToEnv()` in `pkg/config/telemetry_convert.go`.

**Why not `GOOGLE_APPLICATION_CREDENTIALS`?**

Setting `GOOGLE_APPLICATION_CREDENTIALS` would cause every Google Cloud client library in the container to discover and use this credential. Agent containers may run tools (e.g., `gcloud`, `gsutil`, GCS FUSE, or application code using Google SDKs) that should authenticate with the agent's own identity — not the telemetry writer. A scion-namespaced variable ensures only the sciontool exporter consumes this credential.

---

## 5. Sciontool Credential Consumption

### 5.1 OTEL Exporter Configuration

The sciontool telemetry pipeline (`pkg/sciontool/telemetry/pipeline.go`) must be updated to:

1. Check for `SCION_OTEL_GCP_CREDENTIALS` at startup.
2. If present, read the JSON key file and construct a `google.Credentials` object from it using `google.CredentialsFromJSON()`.
3. Pass the credential explicitly to the GCP OTEL exporter via `option.WithCredentials()`, rather than relying on ADC auto-discovery.

```go
// Pseudocode for credential loading
if credPath := os.Getenv("SCION_OTEL_GCP_CREDENTIALS"); credPath != "" {
    keyBytes, err := os.ReadFile(credPath)
    if err != nil {
        return fmt.Errorf("failed to read GCP telemetry credentials: %w", err)
    }

    creds, err := google.CredentialsFromJSON(ctx, keyBytes,
        "https://www.googleapis.com/auth/trace.append",
        "https://www.googleapis.com/auth/logging.write",
        "https://www.googleapis.com/auth/monitoring.write",
    )
    if err != nil {
        return fmt.Errorf("failed to parse GCP telemetry credentials: %w", err)
    }

    // Pass creds to each GCP exporter
    traceExporter, _ := cloudtrace.New(cloudtrace.WithTraceClientOptions(
        option.WithCredentials(creds),
    ))
    // ... similarly for logging and monitoring exporters
}
```

### 5.2 Fallback Behavior

If `SCION_OTEL_GCP_CREDENTIALS` is not set, sciontool falls back to the standard ADC chain. This preserves backward compatibility for environments where Workload Identity, metadata server credentials, or a pre-existing `GOOGLE_APPLICATION_CREDENTIALS` is available (e.g., GKE pods with Workload Identity Federation).

### 5.3 Credential Caching

The `google.Credentials` object handles token refresh internally. Sciontool should create the credential once at startup and reuse it for all exporters (traces, logs, metrics). No additional caching is needed.

---

## 6. Configuration Surface

### 6.1 TelemetryCloudConfig Extension

The `TelemetryCloudConfig` struct (`pkg/api/types.go`) gains an optional field to signal that GCP-specific authentication is configured:

```go
type TelemetryCloudConfig struct {
    Enabled  *bool             `json:"enabled,omitempty" yaml:"enabled,omitempty"`
    Endpoint string            `json:"endpoint,omitempty" yaml:"endpoint,omitempty"`
    Protocol string            `json:"protocol,omitempty" yaml:"protocol,omitempty"`
    Headers  map[string]string `json:"headers,omitempty" yaml:"headers,omitempty"`
    TLS      *TelemetryTLS     `json:"tls,omitempty" yaml:"tls,omitempty"`
    Batch    *TelemetryBatch   `json:"batch,omitempty" yaml:"batch,omitempty"`
    // Provider identifies the cloud backend type (e.g., "gcp", "generic").
    // When set to "gcp", the provisioning pipeline will inject the
    // telemetry SA key if available.
    Provider string            `json:"provider,omitempty" yaml:"provider,omitempty"`
}
```

### 6.2 Environment Variable Emission

`TelemetryConfigToEnv()` is extended to emit:

| Condition | Variable | Value |
|-----------|----------|-------|
| `Cloud.Provider == "gcp"` | `SCION_TELEMETRY_CLOUD_PROVIDER` | `gcp` |

The `SCION_OTEL_GCP_CREDENTIALS` variable itself is not emitted by `TelemetryConfigToEnv()` — it is set by the broker's secret-injection path based on the presence of the resolved secret. This keeps the telemetry config conversion stateless (it doesn't need to know about file paths).

### 6.3 Grove Settings Example

```yaml
telemetry:
  enabled: true
  cloud:
    enabled: true
    provider: gcp
  hub:
    enabled: true
```

When `provider: gcp` is set and the `scion-telemetry-gcp-credentials` secret exists for the grove, the full injection chain activates automatically during agent provisioning.

---

## 7. Open Questions

### 7.1 Key Rotation Strategy

**Question:** How should the telemetry SA key be rotated?

**Options:**
1. **Manual rotation**: Admin generates a new key, updates the Hub secret, and restarts affected agents.
2. **Automated rotation**: The Hub periodically rotates the key via the GCP IAM API and updates the secret. Running agents would need a mechanism to pick up the new key (restart or signal).
3. **Short-lived tokens**: Instead of a long-lived key, the Hub could mint short-lived access tokens and inject those. This would require a token-refresh sidecar or periodic re-injection.

**Recommendation:** Start with manual rotation (option 1). Automated rotation can be added as a secrets-system enhancement without changing this design.

### 7.2 Per-Grove vs. Shared Key

**Question:** Should each grove have its own dedicated SA key, or should a single telemetry SA key be shared across all groves on a Hub?

**Trade-offs:**
- **Per-grove**: Better audit trail (logs are attributable to a specific grove's key), blast radius limited on key compromise. More keys to manage.
- **Shared**: Simpler management, fewer keys. Compromise affects all groves.

**Recommendation:** Start with a single key per Hub instance. The GCP resource labels attached to telemetry data (grove name, agent name) already provide attribution. Per-grove keys can be introduced later without changing the injection mechanism.

### 7.3 Secret Scope: Grove vs. Runtime Broker

**Question:** Should the telemetry credential secret be scoped to the grove or to the runtime broker?

**Context:**
- `grove` scope: Every broker serving that grove receives the same key. Simplest model.
- `runtime_broker` scope: Each broker could have its own key, enabling per-broker revocation. More operational complexity.

**Recommendation:** `grove` scope. The telemetry key is logically a property of the project, not the compute infrastructure.

### 7.4 Workload Identity Federation as Alternative

**Question:** On GKE or Cloud Run, should we prefer Workload Identity Federation (WIF) over injected key files?

**Context:** WIF eliminates the need for key files entirely by binding Kubernetes service accounts to GCP service accounts. However, it only works in GKE/Cloud Run environments, not on self-hosted Docker brokers.

**Recommendation:** Design the key-file injection as the universal baseline. WIF support can be added as a `provider: gcp-wif` variant that skips key injection and relies on ambient credentials. The sciontool fallback-to-ADC behavior (§5.2) already supports this path.

### 7.5 Key File Path Convention

**Question:** Is `~/.scion/telemetry-gcp-credentials.json` the right path, or should it live elsewhere?

**Considerations:**
- It should be outside of `~/.config/gcloud/` to avoid ADC discovery.
- It should be within the `.scion` namespace for consistency with other scion-managed files.
- It must not collide with the existing `~/.scion/secrets.json` (variable secrets store).

**Current proposal:** `~/.scion/telemetry-gcp-credentials.json` — clear, namespaced, and unlikely to be discovered by convention-based credential loaders.

### 7.6 Multiple Cloud Providers

**Question:** If a future deployment needs to export to both GCP and another cloud simultaneously, does this design accommodate that?

**Answer:** Yes. The `SCION_OTEL_GCP_CREDENTIALS` variable is GCP-specific by name and only consumed by the GCP exporter codepath. A second provider (e.g., AWS) would use its own namespaced variable (e.g., `SCION_OTEL_AWS_CREDENTIALS`) and its own injected credential, without conflict.

### 7.7 Credential File Permissions in Apple Runtime

**Question:** The Apple Virtualization Framework runtime uses a file-copy mechanism (secret-map.json) rather than bind-mounts. Does the existing `writeSecretMap` path preserve `0600` permissions on the credential file inside the VM?

**Context:** `writeSecretMap` in `pkg/runtime/common.go` writes a manifest that the in-VM agent copies from a shared volume. The copy step would need to enforce restrictive permissions.

**Action needed:** Verify that the Apple runtime's secret-copy logic sets appropriate permissions, or add explicit `chmod 0600` in the copy step.

---

## 8. Security Considerations

### 8.1 Blast Radius

The SA key can only write telemetry data. Even if compromised, an attacker can only:
- Write spurious trace spans, log entries, or metrics to the project.
- They cannot read existing telemetry, access other GCP resources, or escalate privileges.

Volume-based abuse (writing excessive data) can be mitigated with GCP quotas and billing alerts.

### 8.2 Key Exposure Surface

The key exists in three locations:
1. **Hub secrets store** (encrypted at rest via the secrets backend, e.g., GCP Secret Manager).
2. **Broker staging directory** (ephemeral, per-agent, filesystem permissions restricted).
3. **Agent container filesystem** (bind-mounted read-only or copied with `0600` perms).

The key is never transmitted to the agent process as an environment variable value — only the *path* to the file is set in the environment.

### 8.3 Container Escape

If an agent process escapes the container, it could read the key file from the host staging directory. This is an existing risk for all file-type secrets and is mitigated by:
- Running containers with minimal capabilities.
- Using rootless container runtimes where available.
- The key's limited permissions (telemetry-write only) bounding the impact.

---

## 9. Implementation Checklist

1. **GCP Setup**: Create `scion-telemetry-writer` service account with roles from §3.2. Generate JSON key.
2. **Hub Secret**: Store the key as a `file`-type secret named `scion-telemetry-gcp-credentials` at grove scope.
3. **API Types**: Add `Provider` field to `TelemetryCloudConfig` (§6.1).
4. **Config Conversion**: Emit `SCION_TELEMETRY_CLOUD_PROVIDER` from `TelemetryConfigToEnv()` (§6.2).
5. **Provisioning**: Ensure `CreateAgent` dispatch includes the telemetry secret when `provider: gcp` and the secret exists. Set `SCION_OTEL_GCP_CREDENTIALS` env var pointing to the mounted path.
6. **Sciontool**: Update OTEL provider setup to load explicit credentials from `SCION_OTEL_GCP_CREDENTIALS` (§5.1).
7. **Tests**: Unit tests for credential loading, env var emission, and fallback-to-ADC behavior.
8. **Documentation**: Update operator runbook with GCP setup instructions and key rotation procedure.
