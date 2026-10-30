# Production Monorepos with Turborepo: complete

> This is the finished app for **[Production Monorepos with Turborepo](https://vercel.com/academy/production-monorepos)** on Vercel Academy. Use it to check your work as you go through the course.

## Run it locally

### Prerequisites

- Node.js 20.19 or later in the 20 line, 22.13 or later in the 22 line, or 24 and up (from `engines` in `package.json`)
- pnpm 9.1.0, from `packageManager` in `package.json`
- A Vercel account for the deploy and Remote Caching lessons

### Environment variables

Each app has its own `.env.example`. Copy each one to `.env.local` in the same app folder:

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/app/.env.example apps/app/.env.local
cp apps/docs/.env.example apps/docs/.env.local
cp apps/admin/.env.example apps/admin/.env.local
```

- `NEXT_PUBLIC_API_URL` (web, app, admin): the base URL of the snippet manager app. The web app falls back to `http://localhost:3001`.
- `NEXT_PUBLIC_APP_NAME` (every app): the display name for that app.

Shared validation is available via `@geniusgarage/config/env`.

### Commands

```bash
pnpm install
pnpm dev
```

`pnpm dev` runs every app at once. `pnpm build` builds everything, and `pnpm test` runs the tests.

## GeniusGarage

A complete developer platform for storing and sharing code snippets, built with Turborepo.

## What's Inside?

This monorepo includes **4 apps** and **3 shared packages**:

### Apps

- **web**: Marketing site (Next.js), on port 3000
- **app**: Snippet manager (Next.js), on port 3001
- **docs**: API documentation (Next.js), on port 3002
- **admin**: Internal dashboard (Next.js), on port 3003

### Packages

- **@geniusgarage/ui**: Shared React components (Button, Card, CodeBlock, SnippetCard)
- **@geniusgarage/config**: ESLint, TypeScript, and Tailwind configs
- **@geniusgarage/utils**: Formatters, validators, and helpers

## Working with Specific Apps

Turborepo's filtering lets you run tasks for specific apps or packages:

### Basic Filtering

```bash
# Run dev for only the web app
turbo run dev --filter=@geniusgarage/web

# Build only the app (snippet manager)
turbo run build --filter=@geniusgarage/app

# Test only the UI package
turbo run test --filter=@geniusgarage/ui

# Lint all apps (excludes packages)
turbo run lint --filter='./apps/*'
```

### Build with Dependencies

```bash
# Build app AND all packages it depends on
turbo run build --filter=@geniusgarage/app...

# Build web app WITHOUT dependencies
turbo run build --filter=@geniusgarage/web --no-deps
```

### Changed Files (Git-based)

```bash
# Build only apps/packages changed since main branch
turbo run build --filter='[main]'

# Test only changed packages since last commit
turbo run test --filter='[HEAD^1]'

# Build changed apps and their dependents
turbo run build --filter='[main]...'
```

### Multiple Filters

```bash
# Run dev for web AND app
turbo run dev --filter=@geniusgarage/web --filter=@geniusgarage/app

# Test UI and utils packages
turbo run test --filter=@geniusgarage/ui --filter=@geniusgarage/utils
```

### Common Development Workflows

```bash
# Work on web app only (fast dev loop)
turbo run dev --filter=@geniusgarage/web

# Test all packages before committing
turbo run test --filter='./packages/*'

# Build everything that changed (CI optimization)
turbo run build --filter='[origin/main]'

# Dry run to see what would execute
turbo run build --filter=@geniusgarage/web --dry=json
```

## Generators

Create new components and packages with Turborepo generators:

```bash
# Generate a new component
pnpm gen:component

# Generate a new package
pnpm gen:package
```

## Remote Caching

Turborepo can share its build cache through Vercel Remote Cache, so a task that already ran on another machine (or in CI) is restored instead of rebuilt. [Lesson 6.3, Remote Caching Setup](https://vercel.com/academy/production-monorepos/remote-caching) walks through it:

```bash
pnpm dlx turbo login
pnpm dlx turbo link
```

Run `turbo run build` twice and the second run reports cache hits. In CI, set `TURBO_TOKEN` and `TURBO_TEAM` so the pipeline can reach the same cache.

## CI/CD

`.github/workflows/ci.yml` runs on pushes and pull requests to `main`. It installs dependencies, then builds, lints, and tests every app and package.

## Code Ownership

See `CODEOWNERS` file for package and app ownership.

## Versioning

This project uses [Changesets](https://github.com/changesets/changesets) for version management:

```bash
# Add a changeset
pnpm changeset

# Version packages
pnpm changeset version

# Publish packages
pnpm changeset publish
```

## Architecture

```
┌─────────────────────────────────────────────────┐
│                    Apps Layer                    │
├──────────┬──────────┬──────────┬────────────────┤
│   web    │   app    │   docs   │     admin      │
│ Next.js  │ Next.js  │ Next.js  │    Next.js     │
└────┬─────┴────┬─────┴────┬─────┴────────┬───────┘
     │          │          │              │
     └──────────┴──────────┴──────────────┘
                    │
     ┌──────────────┴──────────────┐
     │      Shared Packages         │
     ├──────────┬──────────┬────────┤
     │    ui    │  config  │  utils │
     └──────────┴──────────┴────────┘
```

## Learn More

- [Turborepo Docs](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Next.js Documentation](https://nextjs.org/docs)
