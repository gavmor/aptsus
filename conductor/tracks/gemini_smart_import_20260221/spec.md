# Specification: Securely enable Gemini features (Smart Import)

## Overview
Enable the "Smart Import" feature for ApartmentHunter using Gemini 1.5 Flash. To protect the Gemini API key, a secure proxy will be implemented using Cloudflare Workers. This proxy will handle data extraction requests and implement a minimum-viable authentication/authorization scheme using session cookies/tokens.

## Functional Requirements
- **Cloudflare Workers Proxy**:
  - Implement a gateway that proxies requests to the Gemini 1.5 Flash API.
  - Store the Gemini API key securely using Cloudflare Workers Secrets.
  - Implement a session-based token system to authorize client requests.
  - **AI Abstraction**: The proxy MUST provide a RESTful domain-specific API (e.g., `POST /extract-listing`). All AI-specific configuration (model name, hyperparameters, system prompts) MUST reside exclusively within the Cloudflare Worker.
- **Smart Import Feature**:
  - Provide a UI (e.g., a modal or text area) where users can paste unstructured listing descriptions.
  - Send the description to the Cloudflare Workers proxy for extraction using the domain-specific API.
  - Automatically populate the `AddListingForm` with extracted data (price, beds, sqft, location, etc.).
  - **AI-Agnostic Client**: The client-side code (UI, API client, types) MUST NOT mention "Gemini", "AI", or any provider-specific terms. Use domain-specific language (e.g., "Smart Import", "Extract Listing", "Data Extraction Service").
- **Authentication/Authorization**:
  - Generate and manage a session cookie/token on the client-side for authorized proxy access.
  - Ensure the Gemini API key is never exposed to the client.

## Tech Stack (Updates)
- **AI Model**: Gemini 1.5 Flash (Flash) ⚡
- **Proxy/Gateway**: Cloudflare Workers
- **Auth**: Session Cookie / Browser-Token System

## Acceptance Criteria
- [ ] A Cloudflare Workers proxy is successfully deployed and integrated.
- [ ] The Gemini API key is stored only as a secret on Cloudflare.
- [ ] Users can paste text into the app and have it converted into a structured listing.
- [ ] The form in `AddListingForm` is automatically populated with the extracted data.
- [ ] Unauthorized requests (without a valid session) are blocked by the proxy.

## Out of Scope
- Scam Detection and Commute Matrix features (for subsequent tracks).
- Comprehensive user account management or persistent cloud data storage.
