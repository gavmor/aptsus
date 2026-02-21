# Specification: Sync .dev.vars to Cloudflare Secrets

## Overview
Create a `pnpm` command to automatically synchronize secrets from the Cloudflare Worker's `.dev.vars` file directly to Cloudflare using the `wrangler` CLI. This removes the need for GitHub Secrets indirection and allows the Worker to be deployed with its required secrets directly from the local environment or CI.

## Functional Requirements
- **Sync Command**:
  - Implement a `pnpm secrets:sync` command in the root `package.json`.
  - The command will trigger a process that parses `gateway/.dev.vars`.
  - For each secret defined, use `wrangler secret put <KEY>` to upload the value to Cloudflare.
- **Security**:
  - Values must be piped to `wrangler secret put` via stdin to ensure they do not appear in process logs or history.
  - The script must validate the existence of `.dev.vars` before attempting synchronization.

## Tech Stack
- **Command Runner**: pnpm
- **Tooling**: Wrangler CLI (Cloudflare)
- **Scripting**: Shell / Bash

## Acceptance Criteria
- [ ] A `pnpm secrets:sync` command is available in the root directory.
- [ ] Executing the command correctly uploads all keys in `gateway/.dev.vars` to the Cloudflare Worker.
- [ ] Verified via `wrangler secret list` (or similar validation).
- [ ] No secrets are exposed in logs during the sync process.

## Out of Scope
- Synchronizing GitHub repository secrets (unless explicitly requested later).
- Bi-directional sync (Cloudflare to local).
