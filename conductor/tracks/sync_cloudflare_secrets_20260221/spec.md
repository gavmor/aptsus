# Specification: Sync .dev.vars to Cloudflare Secrets

## Overview
Create a `pnpm` command to automatically synchronize secrets from the Cloudflare Worker's `.dev.vars` file directly to Cloudflare using the `wrangler` CLI. This removes the need for GitHub Secrets indirection and allows the Worker to be deployed with its required secrets directly from the local environment or CI.

## Functional Requirements
- **Sync Command**:
  - Implement a `pnpm secrets:sync` command in the root `package.json`.
  - The command will execute `wrangler secrets bulk .dev.vars` within the `gateway` directory.
  - This native Wrangler command automatically parses the file and uploads all secrets to Cloudflare.
- **Security**:
  - The process relies on Wrangler's native secure handling of secrets.
  - The script must ensure it is executed from the context of the `gateway` directory where `.dev.vars` resides.

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
