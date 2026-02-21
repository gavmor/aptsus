# Specification: Deploy ApartmentHunter to GitHub Pages

## Goal
Host the ApartmentHunter application on GitHub Pages to provide a publicly accessible preview and testing environment.

## Requirements
- Configure Vite with the correct `base` URL for GitHub Pages.
- Create a GitHub Actions workflow (`.github/workflows/deploy.yml`) to automatically build and deploy the application on pushes to the `main` branch.
- Ensure the build process handles the project's tech stack (React 19, Vite 6, Tailwind CSS v4, pnpm 10).
- Verify the deployment once the GitHub Action has successfully run.

## Tech Stack
- **Platform**: GitHub Pages
- **Automation**: GitHub Actions
- **Build Tool**: Vite 6
- **Package Manager**: pnpm 10

## Success Criteria
- The application is accessible at `https://<username>.github.io/<repo-name>/`.
- All features work as expected in the production environment.
- Subsequent pushes to `main` trigger an automatic redeployment.
