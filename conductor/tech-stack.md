# Tech Stack: ApartmentHunter

## Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **TypeScript**: [TypeScript 5](https://www.typescriptlang.org/)

## Testing & Quality Assurance
- **Unit Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **End-to-End Testing**: [Playwright](https://playwright.dev/)
- **Documentation**: [Storybook 10](https://storybook.js.org/)
- **Linting & Formatting**: (Standard React/TypeScript linting with Vite default setup)

## Infrastructure & Package Management
- **Package Manager**: [pnpm 10](https://pnpm.io/)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Deployment**: [GitHub Pages](https://pages.github.com/)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)

## Architecture & State Management
- **State Management**: React Context API & Hooks
- **Data Flow**: One-way data flow from parent to child components.
- **Modularity**: Components are separated into feature-specific (e.g., `AddListingForm`) and reusable UI primitives (e.g., `Button`).
