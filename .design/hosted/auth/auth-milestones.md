# Authentication Implementation Milestones

This document tracks the phased implementation of Scion authentication.

---

## Phase 0: Development Authentication (Interim)

- [ ] Add `auth.devMode`, `auth.devToken`, `auth.devTokenFile` to config schema
- [ ] Implement `InitDevAuth()` function
- [ ] Add `--dev-auth` flag to `scion server start`
- [ ] Implement `DevAuthMiddleware`
- [ ] Add startup logging for dev token
- [ ] Add validation to block non-localhost + no-TLS + devMode
- [ ] Add `WithDevToken()` option to `hubclient`
- [ ] Add `WithAutoDevAuth()` option to `hubclient`
- [ ] Add `SCION_DEV_TOKEN` environment variable support in CLI

---

## Phase 1: Web OAuth

- [x] OAuth provider integration (Google, GitHub)
- [x] Session cookie management
- [x] User creation/lookup on login
- [ ] Hub auth endpoints (`/api/v1/auth/*`)

---

## Phase 2: CLI Authentication

- [ ] `scion hub auth login` command
- [ ] Localhost callback server
- [ ] PKCE implementation
- [ ] Credential storage (`~/.scion/credentials.json`)
- [ ] `scion hub auth status` command
- [ ] `scion hub auth logout` command

---

## Phase 3: API Keys

- [ ] API key generation endpoint
- [ ] API key validation middleware
- [ ] Key management UI in dashboard
- [ ] `scion hub auth set-key` command

---

## Phase 4: Security Hardening

- [ ] Rate limiting on auth endpoints
- [ ] Audit logging
- [ ] Token revocation lists
- [ ] Session invalidation on password change

---

## Related Documents

- [Auth Overview](auth-overview.md) - Identity model and token types
- [Web Authentication](web-auth.md) - Browser-based OAuth flows
- [CLI Authentication](cli-auth.md) - Terminal-based authentication
- [Server Auth Setup](server-auth-setup.md) - API keys and dev authentication
- [Runtime Host Auth](runtime-host-auth.md) - Host registration (future)
