# Implementation Plan: Securely enable Gemini features (Smart Import)

## Phase 1: Cloudflare Workers Proxy Implementation [checkpoint: 9b7d6f3]
- [x] Task: Initialize Cloudflare Worker project cf32831
    - [x] Write Tests for project initialization and basic routing
    - [x] Implement Cloudflare Worker boilerplate using Wrangler
- [x] Task: Implement AI-Agnostic Extraction API a33e513
    - [x] Define the RESTful domain-specific API (e.g., `POST /extract-listing`)
    - [x] Write Tests for proxying requests to Gemini (using mocks)
    - [x] Implement the proxy logic including all Gemini configuration (model, prompts, hyperparameters) in the Worker
- [x] Task: Secure Gemini API Key a591c41
    - [x] Configure Cloudflare Workers Secrets for the Gemini API key
    - [x] Implement secure retrieval of the secret within the Worker
- [x] Task: Implement Session-based Token System 2a3aebe
    - [x] Write Tests for token generation, issuance, and validation
    - [x] Implement the minimum-viable session cookie/token logic in the proxy
- [x] Task: Conductor - User Manual Verification 'Phase 1: Cloudflare Workers Proxy Implementation' (Protocol in workflow.md) 9b7d6f3

## Phase 2: Client-Side UI and Integration (AI-Agnostic) [checkpoint: f08a0ed]
- [x] Task: Create Domain-Specific Smart Import UI Component 7899790
    - [x] Write Tests for the Smart Import input/modal (ensure no "AI" or "Gemini" labels)
    - [x] Implement the UI component using domain language (e.g., "Smart Import Listing")
- [x] Task: Implement Domain API Client bc30c79
    - [x] Write Tests for the client-side communication with the Worker's domain-specific API
    - [x] Implement the fetch logic with no mention of Gemini/AI in the code
- [x] Task: Integrate Smart Import with AddListingForm 2172312
    - [x] Write Tests for automatic form population from extracted data
    - [x] Implement data mapping from the proxy's domain response to the `AddListingForm` fields
- [x] Task: Conductor - User Manual Verification 'Phase 2: Client-Side UI and Integration' (Protocol in workflow.md) f08a0ed

## Phase 3: End-to-End Verification and Tech Stack Sync [checkpoint: 90d8511]
- [x] Task: Final End-to-End Verification 8f3b670
    - [x] Write E2E Tests for the complete "Smart Import" flow using Playwright
    - [x] Verify that the Gemini API key is never exposed in the browser network logs
- [x] Task: Synchronize Tech Stack and Project Documentation 37c2e4b
    - [x] Update `tech-stack.md` with Cloudflare Workers and Gemini integration details
    - [x] Update `product.md` to reflect the enabled feature
- [x] Task: Conductor - User Manual Verification 'Phase 3: End-to-End Verification and Tech Stack Sync' (Protocol in workflow.md) 90d8511
