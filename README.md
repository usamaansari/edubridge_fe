# EduBridge Academy — Frontend

EduBridge Academy brings JEE and NEET coaching into the school system for Classes 9–12. This repository is the web frontend. It has two parts:

- **A public marketing site:** landing, about, programs, features and contact pages.
- **Five role-based portals:** one each for students, parents, teachers, mentors and admins. Each portal has its own navigation and access rules.

The app talks to a separate Express API through a pass-through proxy (the "backend for frontend" pattern). It can also run **without a backend at all** in demo mode, using built-in mock data. That's useful for UI work and demos.

---

## Table of contents

- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Demo mode](#demo-mode)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Routing and portals](#routing-and-portals)
- [Authentication and access control](#authentication-and-access-control)
- [Talking to the backend](#talking-to-the-backend)
- [State management](#state-management)
- [Validation](#validation)
- [Components](#components)
- [Styling and UI](#styling-and-ui)
- [Mock data](#mock-data)
- [Conventions](#conventions)
- [Next.js 16 notes](#nextjs-16-notes)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI library | React 19 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4, `tw-animate-css` |
| UI primitives | [shadcn/ui](https://ui.shadcn.com) on top of [Base UI](https://base-ui.com) |
| Icons | `lucide-react` |
| HTTP client | `axios` |
| Validation | `zod` v4 |
| Client state | `zustand` v5 |
| Linting | ESLint 9 with `eslint-config-next` |

---

## Getting started

### Prerequisites

- Node.js 20 or later
- npm (a `package-lock.json` is committed)

### Install and run

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

With no `.env.local` file, the app starts in [demo mode](#demo-mode). Go to [`/login`](http://localhost:3000/login), enter any email and a password of at least 8 characters, pick a role from **Sign in as**, and you'll land on that role's dashboard.

### Production build

```bash
npm run build
npm run start
```

---

## Environment variables

Create a `.env.local` file in the project root. `.env.example` shows the format.

| Variable | Required | Description |
| --- | --- | --- |
| `API_URL` | No | Base URL of the Express API, e.g. `http://localhost:4000`. When set, sign-in and every `/api/*` request go to this server. When **unset**, the app runs in demo mode. |

> **Heads-up:** `.env.example` sets `API_URL`. If you copy it to `.env.local` without a backend running, sign-in will fail. Comment the line out to stay in demo mode.

`API_URL` is only read on the server (in the proxy route handler and the auth server actions). It is never sent to the browser.

---

## Demo mode

Demo mode is on whenever `API_URL` isn't set (see `isDemoMode()` in `src/lib/auth/config.ts`). In demo mode:

- The login form shows a **Sign in as** dropdown with all six roles.
- Signing in creates a local session without contacting any server. The display name comes from the email address: `aarav.mehta@…` becomes "Aarav Mehta".
- Every page renders from `src/lib/mock-data.ts` or from data defined inside the page itself.
- `/api/*` requests return `503` with a message saying no API is configured.

---

## Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server on port 3000 |
| `npm run build` | Creates a production build (including the TypeScript check) |
| `npm run start` | Serves the production build |
| `npm run lint` | Runs ESLint |
| `npx next typegen` | Regenerates the route types (`PageProps`, `LayoutProps`, `RouteContext`) |

---

## Project structure

```
src/
├── app/                              # Next.js App Router root
│   ├── (public)/                     # Marketing site, no auth
│   │   ├── page.tsx                  # Landing page (/)
│   │   ├── about/  programs/  features/  contact/
│   ├── (auth)/                       # Centred-card auth layout
│   │   ├── layout.tsx
│   │   ├── login/  register/  forgot-password/
│   ├── (student)/student/            # /student/*
│   │   ├── dashboard/
│   │   ├── learn/[subjectId]/[topicId]/
│   │   ├── tests/  tests/[testId]/attempt/  tests/[testId]/result/
│   │   ├── doubts/  mentor/  analytics/  schedule/
│   ├── (parent)/parent/              # /parent/*
│   │   ├── dashboard/  performance/[studentId]/  fees/
│   ├── (teacher)/teacher/            # /teacher/*
│   │   ├── dashboard/  content/  content/upload/
│   │   ├── tests/builder/  doubts/  batch/[batchId]/analytics/
│   ├── (mentor)/mentor/              # /mentor/*
│   │   ├── dashboard/  students/[studentId]/  sessions/
│   ├── (admin)/admin/                # /admin/* (centre_admin + super_admin)
│   │   ├── dashboard/  batches/  students/  staff/  fees/
│   │   ├── timetable/  scholarships/
│   │   ├── organisations/            # super_admin only
│   │   └── audit-logs/               # super_admin only
│   ├── api/[...path]/route.ts        # Pass-through proxy to the Express API
│   ├── layout.tsx                    # Root layout: fonts, metadata, globals
│   ├── not-found.tsx
│   ├── error.tsx
│   └── globals.css
├── components/
│   ├── ui/                           # shadcn/ui generated components
│   ├── layout/                       # Shell, Sidebar, Topbar, Breadcrumbs, PageHeader, nav config
│   ├── auth/                         # LoginForm, RegisterForm, ForgotPasswordForm, OtpInput
│   ├── student/                      # StudentCard, ProgressRing, StreakBadge
│   ├── content/                      # VideoPlayer, PDFViewer, ContentTree
│   ├── tests/                        # TestCard, QuestionRenderer, Timer, TestAttempt
│   ├── analytics/                    # ScoreChart, HeatmapGrid, WeakTopics
│   ├── doubts/                       # DoubtCard, DoubtReply, LatexEditor
│   ├── admin/                        # DataTable, StatusBadge, FormDialog, form fields, BatchForm, FeeTable
│   ├── common/                       # EmptyState, LoadingSpinner, ErrorBoundary, StatCard
│   └── landing/ about/ programs/ features/ contact/   # Marketing page sections
├── lib/
│   ├── api/                          # axios instance, typed endpoints, useApiQuery / useApiMutation
│   ├── auth/                         # Role config, session cookies, server actions
│   ├── validations/                  # Zod schemas mirroring the backend
│   ├── utils/                        # cn(), formatDate(), formatScore(), formatCurrency(), …
│   └── mock-data.ts                  # Demo data used across portals
├── hooks/                            # useCountdown, useDebounce, useSession
├── store/                            # Zustand stores (UI, session, test attempt)
├── types/                            # Global TypeScript types
└── proxy.ts                          # Route protection (formerly middleware.ts)
```

The `@/*` import alias points to `src/*`.

---

## Routing and portals

### Why each portal has a URL prefix

Route groups like `(student)` let each portal have its own layout, but they don't add anything to the URL. Next.js won't build if two groups resolve to the same path. So `(student)/dashboard` and `(teacher)/dashboard` would both claim `/dashboard` and the build would fail. To avoid that, every portal group contains a matching URL segment:

| Group | URL prefix | Allowed roles |
| --- | --- | --- |
| `(public)` | `/`, `/about`, `/programs`, `/features`, `/contact` | Everyone |
| `(auth)` | `/login`, `/register`, `/forgot-password` | Signed-out users |
| `(student)` | `/student/*` | `student` |
| `(parent)` | `/parent/*` | `parent` |
| `(teacher)` | `/teacher/*` | `teacher` |
| `(mentor)` | `/mentor/*` | `mentor` |
| `(admin)` | `/admin/*` | `centre_admin`, `super_admin` |

### The `/dashboard` shortcut

`/dashboard` has no page of its own. The proxy redirects it to the signed-in user's home page (for example `/teacher/dashboard`), or to `/login` if nobody is signed in. Use it wherever you need a generic "go to my dashboard" link, such as the marketing header.

### Portal layout

Each portal's `layout.tsx` does two things:

1. Calls `requirePortal("<portal>")`, which redirects users who are signed out or in the wrong role.
2. Wraps the page in `<Shell>`, which provides the sidebar, the top bar (breadcrumbs, user menu, sign-out) and the main content area.

Sidebar links are defined per portal in `src/components/layout/nav-config.ts`. A link can be limited to certain roles with `roles` (this is how super-admin-only links are hidden). A link can also set `match`, a URL prefix that decides when it shows as active. This matters for links that point at a specific dynamic page.

---

## Authentication and access control

### Roles

`student`, `parent`, `teacher`, `mentor`, `centre_admin`, `super_admin`. These are defined in `src/types/index.ts`, with labels and home pages in `src/lib/auth/config.ts`.

### Sign-in flow

1. `LoginForm` submits to the `signIn` server action (`src/lib/auth/actions.ts`) using `useActionState`.
2. The input is validated with `loginSchema` (Zod).
3. **With a backend:** the action sends `POST ${API_URL}/auth/login` and expects `{ accessToken, user }` back.
   **In demo mode:** it builds a session from the email and the selected role.
4. It sets two cookies, both `httpOnly`, `sameSite=lax`, `secure` in production and valid for 7 days:
   - `eb_session`: the user (`id`, `name`, `email`, `role`) as base64url-encoded JSON
   - `eb_token`: the API access token
5. It redirects to the `?next=` path if one was given, otherwise to the role's home page.

`signOut` deletes both cookies and redirects to `/login`.

### Route protection (two layers)

1. **`src/proxy.ts`** runs before each request matched by its config:
   - Signed-out users on any portal page are sent to `/login?next=<path>`.
   - Signed-in users visiting an auth page are sent to their own home page.
   - Users in the wrong portal are sent to their own home page.
   - `/admin/organisations` and `/admin/audit-logs` require `super_admin`.
2. **Portal layouts** call `requirePortal()` on the server as a second check.

> **Security note:** `eb_session` is not signed. It is only used to decide routing and what the UI shows. **The Express API must check the bearer token on every request.** Never trust the role in that cookie for anything sensitive.

### Reading the session

- **Server components:** `await getSession()` from `@/lib/auth/session` (server-only).
- **Client components:** `useSession()` from `@/hooks`. The top bar copies the server session into a Zustand store when it mounts.

---

## Talking to the backend

### Pass-through proxy: `app/api/[...path]/route.ts`

The browser never calls the Express API directly. Every request to `/api/<path>` is forwarded to `${API_URL}/<path>` like this:

- The method, query string, headers and body are passed along. Connection-specific headers and cookies are removed.
- `Authorization: Bearer <eb_token>` is added from the httpOnly cookie, so the token is never visible to JavaScript in the browser.
- The upstream status, headers and body are streamed back unchanged.
- It returns `503` when `API_URL` isn't set and `502` when the API can't be reached.

Supported methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.

### API client: `src/lib/api`

```ts
import { testsApi, doubtsApi, useApiQuery, useApiMutation } from "@/lib/api";

// Fetch data in a client component
const { data: tests, isLoading, error, refetch } = useApiQuery(() => testsApi.list());

// Send a change
const { mutate: postDoubt, isPending } = useApiMutation(doubtsApi.create);
await postDoubt({ subject: "physics", topic: "Torque", question: "…" });
```

- `api` is an axios instance with `baseURL: "/api"`. It turns failures into an `ApiError` (`{ status, message, details? }`) and signs the user out automatically on a `401`.
- `endpoints.ts` has typed wrappers for each resource: `subjectsApi`, `testsApi`, `doubtsApi`, `studentsApi` and `contentApi` (multipart upload).

> Pages currently render mock data. The client is ready, and switching each page over to real endpoints is the next step (see [Roadmap](#roadmap)).

---

## State management

Zustand stores live in `src/store/`:

| Store | Purpose |
| --- | --- |
| `useUiStore` | Whether the mobile sidebar is open |
| `useSessionStore` | The current user on the client (filled in by the top bar) |
| `useTestAttemptStore` | The test in progress: current question, answers, flagged and visited questions, start time |

Server state (data from the API) should go through `useApiQuery`/`useApiMutation` or server components. Don't copy it into Zustand.

---

## Validation

Zod schemas in `src/lib/validations/` are meant to **mirror the backend schemas**. Keep them in sync.

| File | Schemas |
| --- | --- |
| `auth.ts` | `loginSchema`, `registerSchema`, `forgotPasswordSchema`, `otpSchema`, `roleSchema` |
| `academics.ts` | `doubtSchema`, `doubtReplySchema`, `questionSchema`, `testSchema`, `contentUploadSchema` |
| `admin.ts` | `batchSchema`, `feeSchema`, `scholarshipSchema` |

Each schema also exports its inferred type, e.g. `type LoginInput = z.infer<typeof loginSchema>`.

---

## Components

Components are grouped by area. Each folder has an `index.ts` barrel, so you can import with `import { DoubtCard } from "@/components/doubts"`.

| Folder | Highlights |
| --- | --- |
| `layout/` | `Shell` (portal frame), `Sidebar` (role-filtered, picks the longest matching link as active), `Topbar`, `Breadcrumbs`, `PageHeader` |
| `common/` | `StatCard`, `EmptyState`, `LoadingSpinner`, `ErrorBoundary` (class component with a retry button) |
| `admin/` | `DataTable` (generic, column-based), `StatusBadge`, `FormDialog`, `FormField` / `FormSelect` / `FormTextarea`, `BatchForm`, `FeeTable` |
| `auth/` | `LoginForm`, `RegisterForm`, `ForgotPasswordForm` (email → OTP → done), `OtpInput` (6 digits, supports paste) |
| `student/` | `StudentCard`, `ProgressRing` (SVG), `StreakBadge` |
| `content/` | `VideoPlayer` (playback speed control, placeholder when there's no source), `PDFViewer`, `ContentTree` (chapter and topic navigation) |
| `tests/` | `TestCard`, `QuestionRenderer` (single, multiple and numeric answers, plus a review mode with solutions), `Timer`, `TestAttempt` (full exam screen with question palette) |
| `analytics/` | `ScoreChart` (SVG line chart), `HeatmapGrid` (topic mastery), `WeakTopics` |
| `doubts/` | `DoubtCard` (expandable thread with replies), `DoubtReply`, `LatexEditor` (textarea with a maths-symbol toolbar) |

Charts are plain SVG, so the project has no chart library dependency.

---

## Styling and UI

- **Tailwind CSS v4** is configured in `src/app/globals.css` with `@theme inline`. Design tokens (`--primary`, `--muted`, `--sidebar`, …) are CSS variables.
- **Fonts:** Plus Jakarta Sans (`--font-sans`) and Outfit (`--font-heading`), loaded with `next/font` in the root layout.
- **shadcn/ui** uses the `base-luma` style on Base UI (see `components.json`). Add components with:
  ```bash
  npx shadcn@latest add <component>
  ```
- **Links that look like buttons:** use `buttonVariants()` on a `<Link>`, not `<Button render={<Link />}>`. Base UI's `Button` expects a real `<button>` and logs a warning otherwise.
  ```tsx
  <Link href="/student/tests" className={buttonVariants({ size: "sm" })}>Go to tests</Link>
  ```
- Use `cn()` from `@/lib/utils` to combine class names.

---

## Mock data

`src/lib/mock-data.ts` holds the demo data shared across portals:

- `subjects` (chapters → topics) and `findTopic(subjectId, topicId)`
- `tests`, `sampleQuestions`
- `doubts`
- `students` and `findStudent(id)`
- `batches` and `findBatch(id)`
- `scoreTrend`, `topicMastery`

Some valid IDs for trying out the dynamic routes:

| Route | Example |
| --- | --- |
| `/student/learn/[subjectId]/[topicId]` | `/student/learn/physics/projectile-motion` |
| `/student/tests/[testId]/attempt` | `/student/tests/jee-main-mock-07/attempt` |
| `/student/tests/[testId]/result` | `/student/tests/jee-main-mock-06/result` |
| `/parent/performance/[studentId]` | `/parent/performance/ST-2041` |
| `/mentor/students/[studentId]` | `/mentor/students/ST-2044` |
| `/teacher/batch/[batchId]/analytics` | `/teacher/batch/jee-2027-a/analytics` |

Unknown IDs show the 404 page.

---

## Conventions

- **Server components by default.** Add `"use client"` only for interactivity (state, effects, event handlers).
- **Typed route props:** use the global helpers `PageProps<"/route">`, `LayoutProps<"/route">` and `RouteContext<"/route">`. In Next 16, `params` and `searchParams` are Promises and must be awaited.
- **Metadata:** server pages export `metadata` or `generateMetadata`. Portal layouts set a title template such as `"%s | EduBridge Student"`.
- **Server-only code** (`lib/auth/session.ts`) imports `"server-only"` so it can't end up in a client bundle by accident.
- **New portal page:** add the page under `(portal)/portal/…`, then add a link in `nav-config.ts`. If you add a new top-level URL prefix, also add it to the matcher in `src/proxy.ts`.
- **File names** are kebab-case. Component names are PascalCase.

---

## Next.js 16 notes

This project uses Next.js 16, which changes several things from earlier versions. The version-matched docs are in `node_modules/next/dist/docs/`. Main differences:

- **`middleware.ts` is now `proxy.ts`**, and the exported function is called `proxy`. It always runs on the Node.js runtime.
- **`error.tsx` receives `retry`** instead of `reset`.
- **`params` / `searchParams` are async**, and `cookies()` / `headers()` must be awaited.
- **Route type helpers** (`PageProps`, etc.) are generated into `.next/` by `next dev`, `next build` or `next typegen`.

---

## Troubleshooting

**The build fails with errors in `.next/dev/types/validator.ts` about routes that no longer exist.**
Route types left over from an earlier dev session. Delete the folder and rebuild:
```bash
rm -rf .next/dev/types && npm run build
```

**Every login attempt fails with "Invalid email or password".**
`API_URL` is set but the backend isn't running or rejected the login. Start the API, or remove `API_URL` from `.env.local` to use demo mode.

**I keep getting sent back to my own dashboard.**
You're signed in as a role that isn't allowed in that portal. Sign out from the top bar and sign in with the right role.

**`/api/...` returns 503.**
Expected in demo mode, because there's no backend to forward to. Set `API_URL`.

**Console warning: "Base UI: A component that acts as a button expected a native `<button>`".**
A `<Button render={<Link />}>` is being used somewhere. Switch it to `<Link className={buttonVariants()}>`.

---

## Roadmap

- [ ] Switch portal pages from `mock-data.ts` to the real API through `@/lib/api`
- [ ] Hook up `RegisterForm` and the forgot-password OTP flow to backend endpoints
- [ ] Limit parents to viewing only their own children on `/parent/performance/[studentId]`
- [ ] Render LaTeX in doubts and questions (e.g. with KaTeX)
- [ ] Persist in-progress test attempts across page reloads
- [ ] Add unit tests (Vitest + Testing Library) and end-to-end tests (Playwright)
