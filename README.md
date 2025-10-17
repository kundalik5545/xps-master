## XPS Master — Engineering Toolkit

A Next.js app for managing QA tasks, bugs, released tasks, menus, test cases, user guides, and database tables for XPS and eMember portals. It includes form tooling, rich UI primitives, and a Prisma-backed data layer.

### Quick Start

1. Install dependencies

```bash
npm install
# or: pnpm install / yarn / bun install
```

2. Environment
   Create a `.env` file at the repo root. Defaults to SQLite; override as needed.

```bash
DATABASE_URL="file:./prisma/dev.db"
```

3. Database (Prisma)

```bash
npx prisma migrate dev --name init
npx prisma generate
```

4. Run the app

```bash
npm run dev
# http://localhost:3000
```

### Scripts

- `dev`: Start Next.js dev server
- `build`: Build for production
- `start`: Start production server
- `lint`: Run ESLint

### Tech Stack

- Next.js App Router, React 19
- Tailwind CSS v4, Radix UI primitives, custom UI in `components/ui` and `components/myUi`
- Forms with `react-hook-form` + `zod`
- Data via Prisma ORM (SQLite by default). Generated client in `generated/prisma`

### Project Structure

- `app/(main)/**`: Feature routes (dashboards, menus, bugs, scripts, tables, etc.)
- `actions/**`: Server actions and data helpers per feature area
- `components/**`: Shared components (`ui`, `myUi`, `appLayout`)
- `lib/**`: Utilities (`ApiResponse`, `Log`, `utils`, `Schema`)
- `db/db.config.js`: Prisma client instance
- `prisma/schema.prisma`: DB schema; migrations in `prisma/migrations`

### Conventions

- Use the `@/` alias for root imports (configured in `jsconfig.json`). Examples:
  - `@/db/db.config`
  - `@/lib/ApiResponse`
  - `@/components/ui/button`
- Standardize API/action results using `ApiRes(success, statusCode, message, data)` from `lib/ApiResponse.js`.
- Use `log`/`logger` from `lib/Log.js` for consistent logging.
- Validate inputs with `zod` schemas under `lib/Schema/*`.

### Prisma Notes

- Default datasource is SQLite via `prisma/dev.db`.
- After schema changes:
  1. `npx prisma migrate dev --name <change>`
  2. `npx prisma generate`
- Access Prisma via the shared client:

```js
import prisma from "@/db/db.config";

export async function getPortals() {
  return prisma.portals.findMany();
}
```

### Development Tips

- Reuse primitives in `components/ui` and helpers like `cn` (`lib/utils.js`).
- Keep feature code colocated in the relevant `app/(main)` folder.
- Prefer small, focused commits with descriptive messages.

### Cursor Rules

See `.cursor/rules` for repository-specific guidance used by AI agents and contributors.
