## CHAB – The Collective Human-AI Brain

This is a pnpm monorepo containing the CHAB web app, API, and shared packages.

### Workspaces

- apps/web – Next.js frontend
- apps/api – GraphQL backend
- packages/db – MongoDB connection and models
- packages/core-ai – Gemini client, embeddings, RAG utils
- packages/shared – shared TypeScript types and utilities

### Scripts

- pnpm dev – run all app dev servers in parallel
- pnpm build – build all apps
- pnpm start – start all apps
- pnpm lint – lint all packages
