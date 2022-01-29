# Traveloggers Web App

## Getting Started

### Requirements

- Node.js 12.22+

### Installation

```bash
npm install
```

### Run local development server

```bash
npm run dev
```

## Architecture

Traveloggers is a decentralized static website, without SSR (server-side rendering).

## Tech Stack

We use React framework [Next.js](https://nextjs.org/) for the frontend development, with some out-of-box features:

- [TypeScript](https://nextjs.org/docs/basic-features/typescript)
- [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css) + [PostCSS](https://nextjs.org/docs/advanced-features/customizing-postcss-config)

Recommended Libraries:

- [Formik](https://formik.org/) for forms
- [SVGR](https://react-svgr.com/docs/next/) for icons

### Data Fetching

- [The Graph](https://thegraph.com/): indexing service to query on-chan application data
  - Logbook List
  - Logbook Details
  - ...
- Infura/Alchemy: provider to interact with on-chain data/contracts
  - Transfer Logbook
  - Publish a log
  - Read wallet balance
  - Resolve wallet ENS name
  - ...

### File Structure

### Design System

- Mobile-first
- Reponsive

### Routing

### i18n

- English-first
- Supports multiple languages
- [Sub-path Routing](https://nextjs.org/docs/advanced-features/i18n-routing#sub-path-routing)

## Conventions

- Component: Atomic, reusable, stateless, pure UI component

## Testing && Deployment

We use GitHub Actions for the CI/CD pipeline.
