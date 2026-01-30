# Runtime Host Authentication

> **Status:** Future Work - This document is a placeholder for the runtime host authentication design.

## Overview

Runtime hosts (Docker, Apple Virtualization, Kubernetes) require a different trust model than user authentication. This design will be addressed separately to handle the unique security requirements of distributed compute resources.

## Scope

This document will cover:

- **Host Registration** - How hosts register with the Hub
- **Host Identity** - Certificates or tokens for host identification
- **Mutual TLS** - Secure communication between Hub and hosts
- **Host Capabilities** - What operations hosts can perform

## Key Considerations

### Trust Model

Runtime hosts act as compute nodes that execute agents on behalf of users. The trust relationship is different from user authentication:

1. **Hub trusts Host** - The Hub must verify that a host is authorized to execute agents
2. **Host trusts Hub** - Hosts must verify they're receiving commands from a legitimate Hub
3. **Mutual Authentication** - Both parties authenticate each other

### Security Requirements

- Hosts should not be able to impersonate users
- Compromised hosts should have limited blast radius
- Host credentials should be rotatable without downtime
- Network communication must be encrypted

### Potential Approaches

1. **Certificate-based (mTLS)**
   - Hub acts as CA or uses external CA
   - Hosts receive certificates during registration
   - Certificates include host identity and capabilities

2. **Token-based**
   - Similar to API keys but for hosts
   - Shorter-lived tokens with automatic rotation
   - Simpler to implement but requires secure token distribution

3. **Hybrid**
   - mTLS for transport security
   - Tokens for fine-grained authorization

## Related Documents

- [Auth Overview](auth-overview.md) - User authentication overview
- [Implementation Milestones](auth-milestones.md) - Phased implementation plan

---

*This document will be expanded when runtime host authentication is prioritized for implementation.*
