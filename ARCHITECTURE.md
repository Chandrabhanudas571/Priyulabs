# Priyulabs modular monolith

The repository contains one deployable product boundary, organized into a React web client and a Node.js API. The API will run as one process and use one MySQL database, while feature modules retain their own routes, services, repositories, validation, and database access.

```text
apps/
  web/                 React + Tailwind marketing/application client
  api/                 Node.js API
    modules/
      leads/           First bounded feature module
      auth/            Planned
      tenants/         Planned
      pos/             Planned
      inventory/       Planned
packages/
  contracts/           Shared API DTOs when a feature needs them
```

No module may access another module's database tables directly. Cross-module work goes through a public service interface or domain event inside this same process. This keeps extraction possible later without adding distributed-system complexity now.

## Local run

Copy `apps/api/.env.example` to `apps/api/.env` and `apps/web/.env.example` to
`apps/web/.env`, then run `npm run dev` from the repository root. The web app
starts on Vite's default port (5173) and the API on port 4000.
