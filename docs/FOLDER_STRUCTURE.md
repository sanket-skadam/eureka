# Eureka — Repository Folder Structure

## 1. Recommended Repository Structure

```text
eureka/
│
├── frontend/
│   ├── public/
│   │   └── assets/
│   │
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.tsx
│   │   │   ├── router.tsx
│   │   │   └── providers.tsx
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── layout/
│   │   │   ├── common/
│   │   │   ├── charts/
│   │   │   └── notifications/
│   │   │
│   │   ├── features/
│   │   │   ├── dashboard/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   └── hooks/
│   │   │   │
│   │   │   ├── technology/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   ├── hooks/
│   │   │   │   └── services/
│   │   │   │
│   │   │   ├── digest/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   └── hooks/
│   │   │   │
│   │   │   ├── enterprise/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   └── hooks/
│   │   │   │
│   │   │   ├── skills/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   └── hooks/
│   │   │   │
│   │   │   ├── learning/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   └── hooks/
│   │   │   │
│   │   │   ├── adoption/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   └── hooks/
│   │   │   │
│   │   │   ├── organization/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   └── hooks/
│   │   │   │
│   │   │   └── profile/
│   │   │       ├── components/
│   │   │       └── pages/
│   │   │
│   │   ├── services/
│   │   │   ├── api/
│   │   │   │   ├── client.ts
│   │   │   │   └── endpoints.ts
│   │   │   └── supabase/
│   │   │       └── client.ts
│   │   │
│   │   ├── hooks/
│   │   ├── contexts/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── styles/
│   │   └── main.tsx
│   │
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   │   ├── router.py
│   │   │   └── dependencies.py
│   │   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   ├── logging.py
│   │   │   ├── exceptions.py
│   │   │   └── constants.py
│   │   │
│   │   ├── modules/
│   │   │   ├── authentication/
│   │   │   │   ├── router.py
│   │   │   │   ├── service.py
│   │   │   │   └── schemas.py
│   │   │   │
│   │   │   ├── organizations/
│   │   │   │   ├── router.py
│   │   │   │   ├── service.py
│   │   │   │   ├── models.py
│   │   │   │   └── schemas.py
│   │   │   │
│   │   │   ├── technology/
│   │   │   │   ├── router.py
│   │   │   │   ├── service.py
│   │   │   │   ├── schemas.py
│   │   │   │   ├── discovery.py
│   │   │   │   ├── normalization.py
│   │   │   │   ├── validation.py
│   │   │   │   ├── deduplication.py
│   │   │   ├── research.py
│   │   │   │   ├── ranking.py
│   │   │   │   └── curation.py
│   │   │   │
│   │   │   ├── enterprise/
│   │   │   │   ├── router.py
│   │   │   │   ├── service.py
│   │   │   │   ├── schemas.py
│   │   │   │   ├── document_upload.py
│   │   │   │   ├── extraction.py
│   │   │   │   ├── chunking.py
│   │   │   │   ├── embeddings.py
│   │   │   │   └── retrieval.py
│   │   │   │
│   │   │   ├── skills/
│   │   │   │   ├── router.py
│   │   │   │   ├── service.py
│   │   │   │   ├── schemas.py
│   │   │   │   ├── gap_analysis.py
│   │   │   │   └── matching.py
│   │   │   │
│   │   │   ├── learning/
│   │   │   │   ├── router.py
│   │   │   │   ├── service.py
│   │   │   │   ├── schemas.py
│   │   │   │   ├── pathway_generator.py
│   │   │   │   ├── mentor.py
│   │   │   │   ├── challenges.py
│   │   │   │   └── progress.py
│   │   │   │
│   │   │   ├── adoption/
│   │   │   │   ├── router.py
│   │   │   │   ├── service.py
│   │   │   │   ├── schemas.py
│   │   │   │   ├── comparison.py
│   │   │   │   ├── compatibility.py
│   │   │   │   └── recommendations.py
│   │   │   │
│   │   │   ├── digest/
│   │   │   │   ├── router.py
│   │   │   │   ├── generator.py
│   │   │   │   ├── personalization.py
│   │   │   │   └── schemas.py
│   │   │   │
│   │   │   └── notifications/
│   │   │       ├── router.py
│   │   │       ├── service.py
│   │   │       ├── email.py
│   │   │       └── preferences.py
│   │   │
│   │   ├── integrations/
│   │   │   ├── sources/
│   │   │   │   ├── base.py
│   │   │   │   ├── github/
│   │   │   │   ├── huggingface/
│   │   │   │   ├── reddit/
│   │   │   │   ├── rss/
│   │   │   │   └── x/
│   │   │   │
│   │   │   ├── llm/
│   │   │   │   ├── base.py
│   │   │   │   ├── gemini.py
│   │   │   │   └── other_providers.py
│   │   │   │
│   │   │   ├── embeddings/
│   │   │   │   └── base.py
│   │   │   │
│   │   │   ├── email/
│   │   │   │   └── resend.py
│   │   │   │
│   │   │   ├── search/
│   │   │   │   └── web_search.py
│   │   │   │
│   │   │   └── code_execution/
│   │   │       └── judge0.py
│   │   │
│   │   ├── database/
│   │   │   ├── supabase.py
│   │   │   └── repositories/
│   │   │
│   │   ├── services/
│   │   │   ├── ai_service.py
│   │   │   ├── retrieval_service.py
│   │   │   └── provenance_service.py
│   │   │
│   │   └── jobs/
│   │       ├── scheduler.py
│   │       ├── ingestion_job.py
│   │       ├── digest_job.py
│   │       └── notification_job.py
│   │
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   ├── api/
│   │   ├── security/
│   │   └── fixtures/
│   │
│   ├── migrations/
│   ├── scripts/
│   │   ├── seed_database.py
│   │   ├── run_ingestion.py
│   │   └── validate_data.py
│   │
│   ├── .env.example
│   ├── requirements.txt
│   └── README.md
│
├── database/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_organization_security.sql
│   │   └── 003_vector_search.sql
│   │
│   ├── seed/
│   │   ├── skills.sql
│   │   └── sample_data.sql
│   │
│   └── README.md
│
├── tests/
│   ├── e2e/
│   ├── evaluation/
│   └── test_data/
│
├── docs/
│   ├── README.md
│   ├── OVERVIEW.md
│   ├── ARCHITECTURE.md
│   ├── IMPLEMENTATION.md
│   ├── VALIDATION.md
│   └── FOLDER_STRUCTURE.md
│
├── .github/
│   └── workflows/
│       └── tests.yml
│
├── .env.example
├── .gitignore
├── AGENTS.md
└── README.md
```

---

# 2. Folder Responsibilities

## frontend/

Contains the React and TypeScript application.

### app/

Application initialization, routing and global providers.

### components/

Reusable interface components shared across multiple features.

### features/

Feature-specific pages, components, hooks and UI logic.

Each feature should manage its own presentation and client-side interactions.

### services/

Centralized API communication and Supabase client configuration.

### hooks/

Reusable React hooks.

### contexts/

Shared application state and context providers.

### types/

Shared TypeScript interfaces and types.

### utils/

Reusable helper functions.

### constants/

Application-wide constants.

---

## backend/app/

Contains the FastAPI application.

### api/

Root API router and common dependencies.

### core/

Application configuration, security, logging and exception handling.

### modules/

Contains the main business modules.

Each module should own its routes, business services and request/response schemas.

### integrations/

Contains external API adapters.

Business modules should not directly depend on provider-specific SDK implementations.

### database/

Database client and repository implementations.

### services/

Reusable cross-module services.

### jobs/

Scheduled and background tasks.

---

## backend/app/modules/

### authentication/

Authentication and access control.

### organizations/

Organization, department, membership and role management.

### technology/

Technology discovery, normalization, validation, deduplication, research, ranking and curation.

### enterprise/

Company document ingestion, extraction, chunking, embeddings and retrieval.

### skills/

Employee competencies, skill-gap analysis and matching.

### learning/

Learning pathways, coding challenges, AI mentor and progress tracking.

### adoption/

Technology comparison, compatibility and adoption recommendations.

### digest/

Weekly digest generation and personalization.

### notifications/

Email delivery and notification preferences.

---

## backend/app/integrations/

### sources/

External information providers.

Each provider should implement a consistent interface wherever practical.

### llm/

LLM provider abstraction and implementations.

Gemini is the initial provider.

### embeddings/

Embedding provider abstraction.

### email/

Email delivery integration.

### search/

Optional web search integration for deeper technology research.

### code_execution/

Optional integration with an isolated coding execution service.

---

## backend/tests/

Contains tests for individual backend modules.

### unit/

Tests individual functions and business logic.

### integration/

Tests communication between modules and external integrations.

### api/

Tests HTTP endpoints and response contracts.

### security/

Tests authorization, RLS and organization isolation.

### fixtures/

Reusable test data.

---

## database/

Contains SQL migrations and seed data.

### migrations/

Version-controlled schema changes.

### seed/

Initial skill taxonomy and development data.

Do not use this folder as a replacement for application-level database access logic.

---

## tests/

Contains project-wide tests.

### e2e/

Complete browser-based user workflows.

### evaluation/

AI output, ranking and RAG evaluation datasets.

### test_data/

Shared non-sensitive sample documents and test inputs.

---

## docs/

Contains project documentation.

- `OVERVIEW.md` — Product purpose, problem and features.
- `ARCHITECTURE.md` — Technical design and system communication.
- `IMPLEMENTATION.md` — Development phases and tasks.
- `VALIDATION.md` — Testing and acceptance criteria.
- `FOLDER_STRUCTURE.md` — Repository organization.
- `README.md` — Documentation index.

---

# 3. Environment Files

Maintain environment templates at the root and within individual applications.

### Root `.env.example`

Contains shared configuration references and deployment-related variables where necessary.

### frontend/.env.example

Only browser-safe public configuration.

Example:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Never place Gemini, GitHub private tokens, Resend or database service-role keys in frontend environment variables.

### backend/.env.example

Example:

```env
APP_ENV=development
APP_NAME=Eureka
DEBUG=true

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_DB_URL=

GEMINI_API_KEY=
GEMINI_MODEL=

GITHUB_TOKEN=
HF_TOKEN=

REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=
REDDIT_USER_AGENT=

X_API_KEY=

EMBEDDING_API_KEY=
EMBEDDING_MODEL=

RESEND_API_KEY=

FRONTEND_URL=http://localhost:5173
```

Only configure credentials for integrations that are actually implemented. Use placeholders in the template and keep real values in the ignored `.env` file.

---

# 4. AGENTS.md Responsibilities

The root `AGENTS.md` should contain instructions for AI coding assistants.

It should define:

- Project purpose and scope.
- Architecture and technology stack.
- Commands to run frontend and backend.
- Coding conventions.
- Folder ownership.
- API integration rules.
- Database and RLS rules.
- Environment variable restrictions.
- Testing requirements.
- Documentation update requirements.
- Git safety rules.
- Implementation phase boundaries.

AI coding assistants must read the relevant documentation before making architectural changes.

---

# 5. Important Folder Structure Rules

1. Do not create all files immediately.
2. Create a module when its implementation phase begins.
3. Keep source integrations separate from business logic.
4. Avoid unnecessary duplicate utility functions.
5. Keep frontend feature modules independent where practical.
6. Keep database schema changes in migrations.
7. Store tests alongside the relevant application or in the root testing area.
8. Never commit `.env` files.
9. Avoid creating microservices for individual modules.
10. Update this document when the actual repository structure changes.

---

# 6. Initial Repository Setup

The initial repository should start small.

Create:

```text
eureka/
├── frontend/
├── backend/
├── database/
├── tests/
├── docs/
│   ├── OVERVIEW.md
│   ├── ARCHITECTURE.md
│   ├── IMPLEMENTATION.md
│   ├── VALIDATION.md
│   └── FOLDER_STRUCTURE.md
├── .env.example
├── .gitignore
├── AGENTS.md
└── README.md
```

Expand the structure as the corresponding implementation phases begin.

**The folder structure is a guide for organizing real code, not a requirement to create empty files and folders in advance.**
