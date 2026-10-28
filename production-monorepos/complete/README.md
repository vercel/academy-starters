# GeniusGarage - Production Monorepo

A complete developer platform for storing and sharing code snippets, built with Turborepo.

## What's Inside?

This monorepo includes **4 deployed apps** and **3 shared packages**:

### Apps

- **web**: Marketing site (Next.js) - [geniusgarage.com](https://geniusgarage.com)
- **app**: Snippet manager (Next.js) - [app.geniusgarage.com](https://app.geniusgarage.com)
- **docs**: API documentation (Nextra) - [docs.geniusgarage.com](https://docs.geniusgarage.com)
- **admin**: Internal dashboard (Next.js) - [admin.geniusgarage.com](https://admin.geniusgarage.com)

### Packages

- **@geniusgarage/ui**: Shared React components (Button, Card, CodeBlock, SnippetCard)
- **@geniusgarage/config**: ESLint, TypeScript, and Tailwind configs
- **@geniusgarage/utils**: Formatters, validators, and helpers

## Quick Start

```bash
# Install dependencies
pnpm install

# Run all apps in dev mode
pnpm dev

# Build everything
pnpm build

# Run tests
pnpm test
```

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

## Environment Variables

Each app has its own environment configuration:

```bash
# Copy example env files
cp apps/web/.env.example apps/web/.env.local
cp apps/app/.env.example apps/app/.env.local
cp apps/admin/.env.example apps/admin/.env.local
```

Apps automatically load their `.env.local` files. Shared validation is available via `@geniusgarage/config/env`.

## Remote Caching

This project uses Vercel Remote Cache for lightning-fast builds:

```bash
# First build (cold cache)
pnpm build  # ~45s

# Second build (hot cache)
pnpm build  # ~200ms ⚡️
```

### Setup Remote Cache

1. Create a Vercel account and generate a token
2. Create `.turbo/config.json`:

```json
{
  "teamId": "your-team-id",
  "apiUrl": "https://api.vercel.com"
}
```

3. Set environment variables:

```bash
export TURBO_TOKEN="your-token"
export TURBO_TEAM="your-team-slug"
```

4. Run builds and see cache hits:

```bash
turbo run build
# Cache miss - builds from scratch

turbo run build
# Cache hit - completes in <1s
```

## CI/CD

GitHub Actions workflow automatically:
- Runs tests on every PR
- Builds all apps and packages
- Uses remote caching for fast builds
- Deploys to Vercel on merge to main

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
│ Next.js  │ Next.js  │  Nextra  │    Next.js     │
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
- [Nextra](https://nextra.site)
