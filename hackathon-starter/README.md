# Hackathon Starter Kit

A reusable Next.js starter designed to help teams ship quickly during hackathons without rebuilding the same foundation every time.

## Features

- App Router setup with TypeScript and Tailwind CSS
- Reusable UI, common, and layout component layers
- Shared hooks, utilities, types, and service wrappers
- Centralized configuration and environment validation
- Built-in documentation for setup, architecture, demos, and submission prep
- GitHub contribution and review templates for faster team coordination

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zod
- React Hook Form
- Sonner

## Folder Structure

```text
.
|-- .github/
|-- docs/
|-- public/
|-- src/
|   |-- app/
|   |-- components/
|   |   |-- common/
|   |   |-- layout/
|   |   `-- ui/
|   |-- config/
|   |-- constants/
|   |-- hooks/
|   |-- lib/
|   |-- providers/
|   |-- services/
|   |-- styles/
|   `-- types/
|-- .env.example
|-- AGENTS.md
`-- CONTRIBUTING.md
```

- `.github/`: Repository templates for issues and pull requests.
- `docs/`: Supporting guides for setup, architecture, demos, and submission readiness.
- `public/`: Static assets served without transformation.
- `src/app/`: App Router entrypoints, route files, global styles, and environment parsing.
- `src/components/ui/`: Low-level reusable UI primitives.
- `src/components/common/`: Shared product-facing patterns built from UI primitives.
- `src/components/layout/`: Shell, navigation, and page layout building blocks.
- `src/config/`: Site-level and navigation configuration.
- `src/constants/`: Stable project-wide constants and defaults.
- `src/hooks/`: Reusable client hooks.
- `src/lib/`: Framework-agnostic helpers, validators, and utility functions.
- `src/providers/`: Global React providers and app-wide context setup.
- `src/services/`: Shared service wrappers for data fetching or integrations.
- `src/styles/`: Shared style entrypoints outside route-local CSS.
- `src/types/`: Reusable TypeScript types and response shapes.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

Detailed setup steps live in [docs/SETUP.md](./docs/SETUP.md).

## Environment Variables

This starter includes a `.env.example` file that documents the environment variables expected by the template.

Current variables:

- `NEXT_PUBLIC_APP_URL`: Base application URL used for local development and absolute links.
- `NEXT_PUBLIC_SUPABASE_URL`: Example backend service URL used by the starter's existing client utilities.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Example public client key used by the starter's existing client utilities.

Recommended workflow:

1. Copy `.env.example` to `.env.local`.
2. Replace placeholder values with team-specific credentials.
3. Keep secrets out of version control.

## Scripts

- `npm run dev`: Start the local development server.
- `npm run build`: Create a production build.
- `npm run lint`: Run ESLint checks.

## Project Structure Philosophy

- `components/ui` exists to hold low-level building blocks that should stay generic and reusable.
- `components/common` exists for higher-level shared patterns that combine UI primitives into useful application pieces.
- `lib` exists for small, framework-friendly helpers that can be reused across routes, services, and components.
- `providers` exists to centralize app-wide concerns such as theme and notifications.
- `hooks` exists for reusable state and browser behavior abstractions.
- `config` exists for editable project settings such as site metadata and navigation.
- `types` exists to keep shared contracts consistent across the codebase.
- `services` exists for reusable wrappers around HTTP or external integration access.

## Hackathon Workflow

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Configure `.env.local` from `.env.example`.
4. Start coding with `npm run dev`.
5. Commit often with small, reviewable changes.
6. Deploy once the README, demo assets, and checks are ready.

Supporting docs:

- [Architecture Guide](./docs/ARCHITECTURE.md)
- [Setup Guide](./docs/SETUP.md)
- [Hackathon Checklist](./docs/HACKATHON_CHECKLIST.md)
- [Submission Checklist](./docs/SUBMISSION_CHECKLIST.md)
- [Demo Script](./docs/DEMO_SCRIPT.md)

## Placeholder Sections

### Problem Statement

Describe the user problem your team chose to solve and why it matters.

### Solution

Summarize the product approach in two or three concise paragraphs.

### Architecture

Link the final project shape back to the starter foundation and explain major technical decisions.

### Screenshots

Add key product screenshots or interface captures before submission.

### Demo Video

Add the final recorded demo link and a one-line summary of what it covers.

### Live Demo

Add the deployed application URL and any reviewer notes.

### Future Improvements

List the next features or polish items your team would tackle after the hackathon.

### Team Members

List names, roles, and profile links if your event requires them.

### License

Add the license your team wants to use for the final project.
