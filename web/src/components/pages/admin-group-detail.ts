/**
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Admin Group detail page component
 *
 * Shows group info, members list, and add/remove member actions
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { AdminGroup, GroupMember } from '../../shared/types.js';

@customElement('scion-page-admin-group-detail')
export class ScionPageAdminGroupDetail extends LitElement {
  @state()
  private groupId = '';

  @state()
  private loading = true;

  @state()
  private group: AdminGroup | null = null;

  @state()
  private members: GroupMember[] = [];

  @state()
  private error: string | null = null;

  @state()
  private membersError: string | null = null;

  @state()
  private addDialogOpen = false;

  @state()
  private addMemberType = 'user';

  @state()
  private addMemberId = '';

  @state()
  private addMemberRole = 'member';

  @state()
  private addMemberLoading = false;

  @state()
  private addMemberError: string | null = null;

  @state()
  private removingMember: string | null = null;

  static override styles = css`
    :host {
      display: block;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--scion-text-muted, #64748b);
      text-decoration: none;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .back-link:hover {
      color: var(--scion-primary, #3b82f6);
    }

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      gap: 1rem;
    }

    .header-info {
      flex: 1;
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.25rem;
    }

    .header h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--scion-text, #1e293b);
      margin: 0;
    }

    .header-slug {
      font-family: var(--scion-font-mono, monospace);
      font-size: 0.875rem;
      color: var(--scion-text-muted, #64748b);
    }

    .group-icon {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .group-icon.explicit {
      background: var(--sl-color-primary-100, #dbeafe);
      color: var(--sl-color-primary-600, #2563eb);
    }

    .group-icon.grove_agents {
      background: var(--sl-color-success-100, #dcfce7);
      color: var(--sl-color-success-600, #16a34a);
    }

    .group-icon sl-icon {
      font-size: 1.25rem;
    }

    .type-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.125rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .type-badge.explicit {
      background: var(--sl-color-primary-100, #dbeafe);
      color: var(--sl-color-primary-700, #1d4ed8);
    }

    .type-badge.grove_agents {
      background: var(--sl-color-success-100, #dcfce7);
      color: var(--sl-color-success-700, #15803d);
    }

    .details-card {
      background: var(--scion-surface, #ffffff);
      border: 1px solid var(--scion-border, #e2e8f0);
      border-radius: var(--scion-radius-lg, 0.75rem);
      padding: 1.25rem;
      margin-bottom: 2rem;
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
    }

    .detail-label {
      font-size: 0.75rem;
      color: var(--scion-text-muted, #64748b);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.25rem;
    }

    .detail-value {
      font-size: 0.875rem;
      color: var(--scion-text, #1e293b);
    }

    .detail-value.mono {
      font-family: var(--scion-font-mono, monospace);
    }

    .labels-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }

    .label-tag {
      display: inline-flex;
      align-items: center;
      padding: 0.0625rem 0.375rem;
      border-radius: var(--scion-radius, 0.5rem);
      font-size: 0.6875rem;
      font-family: var(--scion-font-mono, monospace);
      background: var(--scion-bg-subtle, #f1f5f9);
      color: var(--scion-text-muted, #64748b);
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .section-header h2 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0;
    }

    .member-count {
      font-size: 0.875rem;
      color: var(--scion-text-muted, #64748b);
      margin-left: 0.5rem;
      font-weight: 400;
    }

    .table-container {
      background: var(--scion-surface, #ffffff);
      border: 1px solid var(--scion-border, #e2e8f0);
      border-radius: var(--scion-radius-lg, 0.75rem);
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      text-align: left;
      padding: 0.75rem 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--scion-text-muted, #64748b);
      background: var(--scion-bg-subtle, #f1f5f9);
      border-bottom: 1px solid var(--scion-border, #e2e8f0);
    }

    td {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      color: var(--scion-text, #1e293b);
      border-bottom: 1px solid var(--scion-border, #e2e8f0);
      vertical-align: middle;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: var(--scion-bg-subtle, #f1f5f9);
    }

    .member-identity {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .member-icon {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      background: var(--scion-bg-subtle, #f1f5f9);
      color: var(--scion-text-muted, #64748b);
    }

    .member-icon.user {
      background: var(--sl-color-primary-100, #dbeafe);
      color: var(--sl-color-primary-600, #2563eb);
    }

    .member-icon.group {
      background: var(--sl-color-warning-100, #fef3c7);
      color: var(--sl-color-warning-600, #d97706);
    }

    .member-icon.agent {
      background: var(--sl-color-success-100, #dcfce7);
      color: var(--sl-color-success-600, #16a34a);
    }

    .member-icon sl-icon {
      font-size: 0.875rem;
    }

    .member-info {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .member-id {
      font-family: var(--scion-font-mono, monospace);
      font-size: 0.8125rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .member-type-label {
      font-size: 0.6875rem;
      color: var(--scion-text-muted, #64748b);
      text-transform: capitalize;
    }

    .role-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.125rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .role-badge.member {
      background: var(--scion-bg-subtle, #f1f5f9);
      color: var(--scion-text-muted, #64748b);
    }

    .role-badge.admin {
      background: var(--sl-color-warning-100, #fef3c7);
      color: var(--sl-color-warning-700, #b45309);
    }

    .role-badge.owner {
      background: var(--sl-color-primary-100, #dbeafe);
      color: var(--sl-color-primary-700, #1d4ed8);
    }

    .meta-text {
      font-size: 0.8125rem;
      color: var(--scion-text-muted, #64748b);
    }

    .actions-cell {
      text-align: right;
    }

    .empty-state {
      text-align: center;
      padding: 3rem 2rem;
      background: var(--scion-surface, #ffffff);
      border: 1px dashed var(--scion-border, #e2e8f0);
      border-radius: var(--scion-radius-lg, 0.75rem);
    }

    .empty-state > sl-icon {
      font-size: 3rem;
      color: var(--scion-text-muted, #64748b);
      opacity: 0.5;
      margin-bottom: 0.75rem;
    }

    .empty-state h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0 0 0.5rem 0;
    }

    .empty-state p {
      color: var(--scion-text-muted, #64748b);
      margin: 0 0 1.25rem 0;
      font-size: 0.875rem;
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      color: var(--scion-text-muted, #64748b);
    }

    .loading-state sl-spinner {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .error-state {
      text-align: center;
      padding: 3rem 2rem;
      background: var(--scion-surface, #ffffff);
      border: 1px solid var(--sl-color-danger-200, #fecaca);
      border-radius: var(--scion-radius-lg, 0.75rem);
    }

    .error-state sl-icon {
      font-size: 3rem;
      color: var(--sl-color-danger-500, #ef4444);
      margin-bottom: 1rem;
    }

    .error-state h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0 0 0.5rem 0;
    }

    .error-state p {
      color: var(--scion-text-muted, #64748b);
      margin: 0 0 1rem 0;
    }

    .error-details {
      font-family: var(--scion-font-mono, monospace);
      font-size: 0.875rem;
      background: var(--scion-bg-subtle, #f1f5f9);
      padding: 0.75rem 1rem;
      border-radius: var(--scion-radius, 0.5rem);
      color: var(--sl-color-danger-700, #b91c1c);
      margin-bottom: 1rem;
    }

    .members-error {
      color: var(--sl-color-danger-600, #dc2626);
      font-size: 0.875rem;
      padding: 0.75rem 1rem;
      background: var(--sl-color-danger-50, #fef2f2);
      border-radius: var(--scion-radius, 0.5rem);
      margin-bottom: 1rem;
    }

    .dialog-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .dialog-error {
      color: var(--sl-color-danger-600, #dc2626);
      font-size: 0.875rem;
      padding: 0.5rem 0.75rem;
      background: var(--sl-color-danger-50, #fef2f2);
      border-radius: var(--scion-radius, 0.5rem);
    }

    @media (max-width: 768px) {
      .hide-mobile {
        display: none;
      }

      .details-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/\/admin\/groups\/([^/]+)/);
      if (match) {
        this.groupId = match[1];
      }
    }
    void this.loadData();
  }

  private async loadData(): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const [groupResponse, membersResponse] = await Promise.all([
        fetch(`/api/v1/groups/${encodeURIComponent(this.groupId)}`, {
          credentials: 'include',
        }),
        fetch(`/api/v1/groups/${encodeURIComponent(this.groupId)}/members`, {
          credentials: 'include',
        }),
      ]);

      if (!groupResponse.ok) {
        const errorData = (await groupResponse.json().catch(() => ({}))) as { message?: string };
        throw new Error(errorData.message || `HTTP ${groupResponse.status}: ${groupResponse.statusText}`);
      }

      this.group = (await groupResponse.json()) as AdminGroup;

      if (membersResponse.ok) {
        const data = (await membersResponse.json()) as { members?: GroupMember[] } | GroupMember[];
        this.members = Array.isArray(data) ? data : data.members || [];
      } else {
        this.members = [];
        this.membersError = `Failed to load members (HTTP ${membersResponse.status})`;
      }
    } catch (err) {
      console.error('Failed to load group:', err);
      this.error = err instanceof Error ? err.message : 'Failed to load group';
    } finally {
      this.loading = false;
    }
  }

  private async loadMembers(): Promise<void> {
    this.membersError = null;

    try {
      const response = await fetch(
        `/api/v1/groups/${encodeURIComponent(this.groupId)}/members`,
        { credentials: 'include' }
      );

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = (await response.json()) as { members?: GroupMember[] } | GroupMember[];
      this.members = Array.isArray(data) ? data : data.members || [];
    } catch (err) {
      console.error('Failed to load members:', err);
      this.membersError = err instanceof Error ? err.message : 'Failed to load members';
    }
  }

  private openAddDialog(): void {
    this.addMemberType = 'user';
    this.addMemberId = '';
    this.addMemberRole = 'member';
    this.addMemberError = null;
    this.addDialogOpen = true;
  }

  private closeAddDialog(): void {
    this.addDialogOpen = false;
  }

  private async handleAddMember(e: Event): Promise<void> {
    e.preventDefault();

    if (!this.addMemberId.trim()) {
      this.addMemberError = 'Member ID is required';
      return;
    }

    this.addMemberLoading = true;
    this.addMemberError = null;

    try {
      const response = await fetch(
        `/api/v1/groups/${encodeURIComponent(this.groupId)}/members`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            memberType: this.addMemberType,
            memberId: this.addMemberId.trim(),
            role: this.addMemberRole,
          }),
        }
      );

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      this.closeAddDialog();
      await this.loadMembers();
    } catch (err) {
      console.error('Failed to add member:', err);
      this.addMemberError = err instanceof Error ? err.message : 'Failed to add member';
    } finally {
      this.addMemberLoading = false;
    }
  }

  private async handleRemoveMember(member: GroupMember): Promise<void> {
    if (!confirm(`Remove ${member.memberType} "${member.memberId}" from this group?`)) {
      return;
    }

    const memberKey = `${member.memberType}/${member.memberId}`;
    this.removingMember = memberKey;

    try {
      const response = await fetch(
        `/api/v1/groups/${encodeURIComponent(this.groupId)}/members/${encodeURIComponent(member.memberType)}/${encodeURIComponent(member.memberId)}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (!response.ok && response.status !== 204) {
        const errorData = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(errorData.message || `Failed to remove member (HTTP ${response.status})`);
      }

      await this.loadMembers();
    } catch (err) {
      console.error('Failed to remove member:', err);
      alert(err instanceof Error ? err.message : 'Failed to remove member');
    } finally {
      this.removingMember = null;
    }
  }

  private formatRelativeTime(dateString: string): string {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      const diffMs = Date.now() - date.getTime();
      const diffSeconds = Math.round(diffMs / 1000);
      const diffMinutes = Math.round(diffMs / (1000 * 60));
      const diffHours = Math.round(diffMs / (1000 * 60 * 60));
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

      if (Math.abs(diffSeconds) < 60) {
        return rtf.format(-diffSeconds, 'second');
      } else if (Math.abs(diffMinutes) < 60) {
        return rtf.format(-diffMinutes, 'minute');
      } else if (Math.abs(diffHours) < 24) {
        return rtf.format(-diffHours, 'hour');
      } else {
        return rtf.format(-diffDays, 'day');
      }
    } catch {
      return dateString;
    }
  }

  private getMemberIcon(memberType: string): string {
    switch (memberType) {
      case 'user':
        return 'person';
      case 'group':
        return 'diagram-3';
      case 'agent':
        return 'cpu';
      default:
        return 'question-circle';
    }
  }

  override render() {
    if (this.loading) {
      return this.renderLoading();
    }

    if (this.error || !this.group) {
      return this.renderError();
    }

    const labels = this.group.labels ? Object.entries(this.group.labels) : [];

    return html`
      <a href="/admin/groups" class="back-link">
        <sl-icon name="arrow-left"></sl-icon>
        Back to Groups
      </a>

      <div class="header">
        <div class="header-info">
          <div class="header-title">
            <div class="group-icon ${this.group.groupType}">
              <sl-icon name="${this.group.groupType === 'grove_agents' ? 'cpu' : 'people'}"></sl-icon>
            </div>
            <h1>${this.group.name}</h1>
            <span class="type-badge ${this.group.groupType}">
              ${this.group.groupType === 'grove_agents' ? 'grove agents' : 'explicit'}
            </span>
          </div>
          <span class="header-slug">${this.group.slug}</span>
        </div>
      </div>

      <div class="details-card">
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">Description</span>
            <span class="detail-value">${this.group.description || '\u2014'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Owner</span>
            <span class="detail-value mono">${this.group.ownerId || '\u2014'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Created</span>
            <span class="detail-value">${this.formatRelativeTime(this.group.created)}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Updated</span>
            <span class="detail-value">${this.formatRelativeTime(this.group.updated)}</span>
          </div>
          ${labels.length > 0
            ? html`
                <div class="detail-item">
                  <span class="detail-label">Labels</span>
                  <div class="labels-container">
                    ${labels.map(
                      ([key, value]) => html`<span class="label-tag">${key}=${value}</span>`
                    )}
                  </div>
                </div>
              `
            : nothing}
          ${this.group.groveId
            ? html`
                <div class="detail-item">
                  <span class="detail-label">Grove</span>
                  <span class="detail-value mono">${this.group.groveId}</span>
                </div>
              `
            : nothing}
        </div>
      </div>

      <div class="section-header">
        <h2>
          Members
          <span class="member-count">(${this.members.length})</span>
        </h2>
        <sl-button variant="primary" size="small" @click=${this.openAddDialog}>
          <sl-icon slot="prefix" name="person-plus"></sl-icon>
          Add Member
        </sl-button>
      </div>

      ${this.membersError
        ? html`<div class="members-error">${this.membersError}</div>`
        : nothing}

      ${this.members.length === 0 ? this.renderEmptyMembers() : this.renderMembersTable()}
      ${this.renderAddDialog()}
    `;
  }

  private renderMembersTable() {
    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th class="hide-mobile">Added</th>
              <th class="actions-cell"></th>
            </tr>
          </thead>
          <tbody>
            ${this.members.map((member) => this.renderMemberRow(member))}
          </tbody>
        </table>
      </div>
    `;
  }

  private renderMemberRow(member: GroupMember) {
    const memberKey = `${member.memberType}/${member.memberId}`;
    const isRemoving = this.removingMember === memberKey;

    return html`
      <tr>
        <td>
          <div class="member-identity">
            <div class="member-icon ${member.memberType}">
              <sl-icon name="${this.getMemberIcon(member.memberType)}"></sl-icon>
            </div>
            <div class="member-info">
              <span class="member-id">${member.memberId}</span>
              <span class="member-type-label">${member.memberType}</span>
            </div>
          </div>
        </td>
        <td>
          <span class="role-badge ${member.role}">${member.role}</span>
        </td>
        <td class="hide-mobile">
          <span class="meta-text">${this.formatRelativeTime(member.addedAt)}</span>
        </td>
        <td class="actions-cell">
          <sl-icon-button
            name="trash"
            label="Remove member"
            ?disabled=${isRemoving}
            @click=${() => this.handleRemoveMember(member)}
          ></sl-icon-button>
        </td>
      </tr>
    `;
  }

  private renderEmptyMembers() {
    return html`
      <div class="empty-state">
        <sl-icon name="people"></sl-icon>
        <h3>No Members</h3>
        <p>This group doesn't have any members yet.</p>
        <sl-button variant="primary" size="small" @click=${this.openAddDialog}>
          <sl-icon slot="prefix" name="person-plus"></sl-icon>
          Add Member
        </sl-button>
      </div>
    `;
  }

  private renderAddDialog() {
    return html`
      <sl-dialog
        label="Add Member"
        ?open=${this.addDialogOpen}
        @sl-request-close=${this.closeAddDialog}
      >
        <form class="dialog-form" @submit=${this.handleAddMember}>
          <sl-select
            label="Member Type"
            value=${this.addMemberType}
            @sl-change=${(e: Event) => {
              this.addMemberType = (e.target as HTMLSelectElement).value;
            }}
          >
            <sl-option value="user">User</sl-option>
            <sl-option value="group">Group</sl-option>
            <sl-option value="agent">Agent</sl-option>
          </sl-select>

          <sl-input
            label="Member ID"
            placeholder="Enter the ${this.addMemberType} ID"
            value=${this.addMemberId}
            @sl-input=${(e: Event) => {
              this.addMemberId = (e.target as HTMLInputElement).value;
            }}
            required
          ></sl-input>

          <sl-select
            label="Role"
            value=${this.addMemberRole}
            @sl-change=${(e: Event) => {
              this.addMemberRole = (e.target as HTMLSelectElement).value;
            }}
          >
            <sl-option value="member">Member</sl-option>
            <sl-option value="admin">Admin</sl-option>
            <sl-option value="owner">Owner</sl-option>
          </sl-select>

          ${this.addMemberError
            ? html`<div class="dialog-error">${this.addMemberError}</div>`
            : nothing}
        </form>

        <sl-button
          slot="footer"
          variant="default"
          @click=${this.closeAddDialog}
          ?disabled=${this.addMemberLoading}
        >
          Cancel
        </sl-button>
        <sl-button
          slot="footer"
          variant="primary"
          ?loading=${this.addMemberLoading}
          ?disabled=${this.addMemberLoading}
          @click=${this.handleAddMember}
        >
          Add Member
        </sl-button>
      </sl-dialog>
    `;
  }

  private renderLoading() {
    return html`
      <div class="loading-state">
        <sl-spinner></sl-spinner>
        <p>Loading group...</p>
      </div>
    `;
  }

  private renderError() {
    return html`
      <a href="/admin/groups" class="back-link">
        <sl-icon name="arrow-left"></sl-icon>
        Back to Groups
      </a>

      <div class="error-state">
        <sl-icon name="exclamation-triangle"></sl-icon>
        <h2>Failed to Load Group</h2>
        <p>There was a problem loading this group.</p>
        <div class="error-details">${this.error || 'Group not found'}</div>
        <sl-button variant="primary" @click=${() => this.loadData()}>
          <sl-icon slot="prefix" name="arrow-clockwise"></sl-icon>
          Retry
        </sl-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scion-page-admin-group-detail': ScionPageAdminGroupDetail;
  }
}
