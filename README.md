# ApartmentHunter 🏠

A high-performance apartment search decision matrix and tracker built with React, Vite, and Tailwind CSS v4. Modularized for scalability and fully integrated with Gemini AI for smart listing extraction and scam detection.

## 🌐 Live Demo

The application is deployed to GitHub Pages: **[Live URL](https://gavmor.github.io/aptsus/)**.

## 🚀 Features

- **AI Smart Import**: Paste messy listing descriptions and let Gemini extract price, beds, sqft, and more.
- **Scam Detection**: Automatic AI flagging of suspicious listings based on market data and common fraud patterns.
- **Commute Matrix**: Real-time AI estimation of drive times to multiple custom destinations.
- **Weighted Ranking**: Dynamic scoring system based on your custom-ranked priorities.
- **Export to CSV**: Download your top candidates for offline comparison.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **E2E**: [Playwright](https://playwright.dev/)
- **Documentation**: [Storybook 10](https://storybook.js.org/)

## 📁 Project Structure

```text
src/
├── components/          # Feature-specific components
│   └── ui/             # Reusable UI primitives (Atom components)
│       ├── __tests__/  # Unit tests
│       └── *.stories.tsx # Storybook documentation
├── types.ts            # Shared TypeScript interfaces
├── app.tsx             # Main application logic & state
└── main.tsx            # Entry point
e2e/                   # Playwright end-to-end tests
```

## ⌨️ Development

### Setup
```bash
pnpm install
```

### Run Locally
```bash
pnpm dev
```

### Documentation (Storybook)
```bash
pnpm storybook
```

### Secret Management
To synchronize local secrets from `gateway/.dev.vars` to Cloudflare:
```bash
pnpm secrets:sync
```

### Testing
```bash
# Unit Tests
pnpm test

# E2E Tests
pnpm e2e

# Type Checking
pnpm typecheck
```

## 📝 License

ISC
