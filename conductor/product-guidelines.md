# Product Guidelines: ApartmentHunter

## Visual Design & UI
- **Styling**: Leverage Tailwind CSS v4 for a utility-first, performant, and maintainable styling system.
- **Components**: Utilize reusable UI primitives stored in `src/components/ui`. Every new UI component MUST have a corresponding `.stories.tsx` file for Storybook.
- **Icons**: Use Lucide React for consistent and accessible iconography.
- **Density**: Prioritize data density and clarity. Use clean layouts, consistent spacing, and clear typography to make complex listing information easy to scan.
- **Responsiveness**: Ensure the interface is fully responsive across mobile, tablet, and desktop devices.

## UX & Interaction
- **Feedback**: Provide immediate visual feedback for user actions (e.g., loading states, success messages, validation errors).
- **Accessibility (a11y)**: Adhere to WCAG 2.1 AA standards. Ensure proper semantic HTML, ARIA labels, and keyboard navigability.
- **AI Integration**: AI-driven features (Import, Scam Detection, Commute estimation) should be clearly marked and provide clear explanations of their results.
- **Navigation**: Keep the primary navigation simple and focused on the core features (Listings, Priority Panel, Destinations).

## Content & Prose
- **Tone**: Professional, helpful, and concise. Avoid technical jargon when communicating with the user.
- **Clarity**: Listing information should be presented with clear labels and units (e.g., ",500/mo", "950 sqft").
- **Error Messages**: Provide actionable error messages that help the user resolve the issue.

## Development Workflow
- **Testing**:
  - **Unit Tests**: Every new feature or utility function MUST have unit tests using Vitest and React Testing Library.
  - **E2E Tests**: Critical user flows (e.g., adding a listing, modifying priorities) MUST be covered by Playwright end-to-end tests.
- **Documentation**: Use Storybook to document and develop components in isolation.
- **Commits**: Follow conventional commits for clear and structured version history.
