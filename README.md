# AIM CRM — Web Application

Custom CRM & Business Management System built with Next.js 14.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **UI:** shadcn/ui + Tailwind CSS
- **State:** TanStack Query (server) + Zustand (client)
- **Forms:** React Hook Form + Zod
- **Tables:** TanStack Table
- **Charts:** Recharts
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your API URL

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description | Default |
|----------|------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3001/v1` |
| `NEXT_PUBLIC_APP_URL` | Frontend app URL | `http://localhost:3000` |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Public auth pages (login)
│   ├── (dashboard)/        # Protected pages (sidebar layout)
│   └── booking/            # Public booking pages
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── layout/             # Sidebar, header, mobile nav
│   ├── leads/              # Lead-specific components
│   ├── customers/          # Customer-specific components
│   ├── tasks/              # Task-specific components
│   ├── sales/              # Sale-specific components
│   └── shared/             # Reusable components
├── hooks/                  # React Query hooks per entity
├── lib/                    # API client, utils, formatters
├── providers/              # React context providers
├── stores/                 # Zustand stores
└── types/                  # TypeScript type definitions
```

## Features

- **Leads Management** — Full CRUD with pipeline statuses, conversion to customer
- **Customer Management** — Full CRUD with contact info, sales, tasks, documentation
- **Task Management** — Tasks with priorities, due dates, time tracking
- **Sales & Billing** — Sale records with line items, retainers, VAT
- **Calendar** — Meeting management with multiple formats
- **Products** — Product catalog with retainer support
- **Reports** — Dashboard stats, lead/sales analytics
- **Settings** — Users, permissions, statuses, custom fields
- **Role-Based Access** — Permission-based UI with entity-level control

## Architecture

This is a **frontend-only** project. All data comes from the Express.js REST API via Axios + React Query. No direct database access.

## Development Patterns

- **Pages** are thin wrappers that compose feature components
- **Hooks** (one per entity) encapsulate all API calls
- **Components** follow: table, filters, form, detail, dialogs per feature
- **Permissions** checked via `usePermission()` hook for conditional rendering
# AIM-CRM-Web
