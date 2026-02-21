# Implementation Plan: Securely enable Gemini features (Smart Import)

## Phase 1: Cloudflare Workers Proxy Implementation
- [x] Task: Initialize Cloudflare Worker project cf32831
    - [x] Write Tests for project initialization and basic routing
    - [x] Implement Cloudflare Worker boilerplate using Wrangler
- [x] Task: Implement AI-Agnostic Extraction API a33e513
    - [x] Define the RESTful domain-specific API (e.g., `POST /extract-listing`)
    - [x] Write Tests for proxying requests to Gemini (using mocks)
    - [x] Implement the proxy logic including all Gemini configuration (model, prompts, hyperparameters) in the Worker
- [ ] Task: Secure Gemini API Key
    - [ ] Configure Cloudflare Workers Secrets for the Gemini API key
    - [ ] Implement secure retrieval of the secret within the Worker
- [ ] Task: Implement Session-based Token System
    - [ ] Write Tests for token generation, issuance, and validation
    - [ ] Implement the minimum-viable session cookie/token logic in the proxy
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Cloudflare Workers Proxy Implementation' (Protocol in workflow.md)

## Phase 2: Client-Side UI and Integration (AI-Agnostic)
- [ ] Task: Create Domain-Specific Smart Import UI Component
    - [ ] Write Tests for the Smart Import input/modal (ensure no "AI" or "Gemini" labels)
    - [ ] Implement the UI component using domain language (e.g., "Smart Import Listing")
- [ ] Task: Implement Domain API Client
    - [ ] Write Tests for the client-side communication with the Worker's domain-specific API
    - [ ] Implement the fetch logic with no mention of Gemini/AI in the code
- [ ] Task: Integrate Smart Import with AddListingForm
    - [ ] Write Tests for automatic form population from extracted data
    - [ ] Implement data mapping from the proxy's domain response to the `AddListingForm` fields
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Client-Side UI and Integration' (Protocol in workflow.md)

## Phase 3: End-to-End Verification and Tech Stack Sync
- [ ] Task: Final End-to-End Verification
    - [ ] Write E2E Tests for the complete "Smart Import" flow using Playwright
    - [ ] Verify that the Gemini API key is never exposed in the browser network logs
- [ ] Task: Synchronize Tech Stack and Project Documentation
    - [ ] Update `tech-stack.md` with Cloudflare Workers and Gemini integration details
    - [ ] Update `product.md` to reflect the enabled feature
- [ ] Task: Conductor - User Manual Verification 'Phase 3: End-to-End Verification and Tech Stack Sync' (Protocol in workflow.md)
