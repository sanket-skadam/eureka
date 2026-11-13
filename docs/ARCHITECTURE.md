# Eureka — System Architecture

## 1. Architecture Overview

Eureka follows a modular monolithic architecture with a React frontend, FastAPI backend and Supabase PostgreSQL database.

External APIs and AI model providers are accessed through dedicated integration adapters.

The architecture separates:

1. User interface.
2. API and application services.
3. Business modules.
4. External integrations.
5. Data storage and retrieval.
6. Scheduled and background processing.

The initial implementation does not require microservices or autonomous AI agents.

---

## 2. High-Level System Architecture

```text
                       USERS
                         |
                         v
              REACT + TYPESCRIPT
                   FRONTEND
                         |
                    REST APIs
                         |
                         v
                  FASTAPI BACKEND
                         |
        +----------------+----------------+
        |                |                |
        v                v                v
  TECHNOLOGY         ENTERPRISE       WORKFORCE
  INTELLIGENCE       INTELLIGENCE     INTELLIGENCE
        |                |                |
        v                v                v
  DISCOVERY          DOCUMENT         SKILL GAP
  PIPELINE           PROCESSING       ANALYSIS
        |                |                |
        v                v                v
  EXTERNAL APIs       RAG ENGINE       LEARNING ENGINE
        |                |                |
        +----------------+----------------+
                         |
                         v
                  AI SERVICE LAYER
                         |
                  GEMINI / LLM APIs
                         |
                         v
                  SUPABASE DATABASE
                         |
              +----------+----------+
              |                     |
              v                     v
          POSTGRESQL              STORAGE
          + PGVECTOR              DOCUMENTS
```

---

## 3. Frontend Architecture

**Technology:** React, TypeScript, Vite, Tailwind CSS and shadcn/ui.

The frontend is organized by product features.

### Main application sections

| Section                 | Responsibility                          |
| ----------------------- | --------------------------------------- |
| Dashboard               | Organization-wide intelligence overview |
| Technology Hub          | Emerging technology discovery           |
| Technology Explorer     | Technology details and explanations     |
| Weekly Digest           | Curated weekly updates                  |
| Enterprise Intelligence | Company documents and RAG               |
| Skill Intelligence      | Employee competencies and gaps          |
| Upskilling Studio       | Learning paths and coding mentor        |
| Adoption Advisor        | Technology and model comparisons        |
| Notifications           | Personalized updates and preferences    |
| Profile                 | Employee information and interests      |
| Administration          | Organization and access management      |

### Frontend responsibilities

- Display information retrieved from backend APIs.
- Manage navigation and user interactions.
- Validate basic form input.
- Display loading, empty and error states.
- Support responsive layouts.
- Manage authenticated sessions.
- Present charts and progress indicators.
- Support browser-based voice interaction where available.

The frontend must never directly expose private provider API keys.

---

## 4. Backend Architecture

**Technology:** Python and FastAPI.

The backend follows a modular service-oriented structure within one deployable application.

### 4.1 Authentication Module

Responsibilities:

- User authentication.
- Session validation.
- Organization membership.
- Role-based permissions.
- Protected API access.

Supabase Auth handles authentication.

FastAPI validates the authenticated identity and enforces application permissions.

### 4.2 Organization Module

Responsibilities:

- Organization management.
- Departments.
- Designations and roles.
- Organization settings.
- Technology preferences.
- Notification policies.

### 4.3 Technology Intelligence Module

Responsibilities:

- External technology discovery.
- Source normalization.
- Validation.
- Deduplication.
- Research.
- Technology categorization.
- Ranking.
- Explanation generation.
- Source provenance.

### 4.4 Enterprise Intelligence Module

Responsibilities:

- Company document upload.
- Document extraction.
- Text chunking.
- Embedding generation.
- Vector storage.
- Semantic retrieval.
- Company-specific technology analysis.

### 4.5 Workforce Intelligence Module

Responsibilities:

- Employee skill profiles.
- Skill taxonomy.
- Competency requirements.
- Skill-gap analysis.
- Organizational skill reports.
- Employee-role matching.

### 4.6 Learning Module

Responsibilities:

- Learning pathway generation.
- Coding challenges.
- AI mentor conversations.
- Debugging assistance.
- Progress tracking.
- Skill reassessment.

### 4.7 Adoption Module

Responsibilities:

- Technology comparison.
- Model comparison.
- Compatibility analysis.
- Cost evaluation.
- Risk identification.
- Adoption recommendations.

### 4.8 Digest and Notification Module

Responsibilities:

- Weekly digest generation.
- Role-based personalization.
- Notification preferences.
- Email newsletter generation.
- Important-development alerts.

---

## 5. External Integration Architecture

All external integrations should be isolated from business logic.

```text
              APPLICATION SERVICES
                       |
                       v
              INTEGRATION LAYER
                       |
       +---------------+----------------+
       |               |                |
       v               v                v
   DATA SOURCES      LLM PROVIDERS     OTHER SERVICES
       |               |                |
       v               v                v
     GitHub          Gemini           Resend
     Hugging Face    Other LLM APIs   Judge0
     Reddit          Embeddings      Web Search
     RSS/Atom        Providers       Optional X API
```

### 5.1 Source Integrations

**GitHub**

Use official APIs to retrieve:

- Repository metadata.
- Stars and forks.
- Release information.
- Commit activity where available.
- Repository descriptions.
- License metadata.

**Hugging Face**

Use official APIs to retrieve:

- Trending models.
- Model metadata.
- Model cards.
- Datasets.
- Spaces.
- Downloads and likes.

**Reddit**

Use permitted API or RSS access to retrieve:

- Relevant discussions.
- Community feedback.
- Emerging developer interests.
- Frequently discussed tools.

Reddit is a discovery and community-signal source, not proof of technical correctness.

**RSS/Atom**

Retrieve updates from:

- Official engineering blogs.
- Framework announcements.
- AI research blogs.
- Developer newsletters.
- Product release feeds.

**X**

Optional integration. Implement only when API access and applicable usage limits permit it.

Do not make the core discovery pipeline dependent on X.

### 5.2 LLM Provider Abstraction

Create a common LLM service interface.

Example responsibilities:

- Generate structured technology explanations.
- Summarize technical documentation.
- Classify technologies.
- Evaluate semantic relevance.
- Generate learning pathways.
- Assist with debugging.
- Generate adoption recommendations.

Gemini is the initial provider.

Other providers can be added through adapters without changing business modules.

Provider-specific model names and capabilities must be configurable.

### 5.3 Embedding Provider

Use an embedding API to convert text chunks into vector representations.

The embedding provider should be replaceable.

Store the embedding model identifier and version with generated vectors. Changing embedding models may require regenerating existing embeddings.

### 5.4 Email Provider

Use an email service such as Resend for:

- Weekly newsletters.
- Important technology alerts.
- Learning reminders.
- Account-related notifications.

---

## 6. Technology Discovery Pipeline Architecture

The discovery pipeline is one of the central components of Eureka.

```text
GitHub   Hugging Face   Reddit   RSS   Optional X
   |          |           |      |        |
   +----------+-----------+------+--------+
                         |
                         v
                       SCOUT
                         |
                         v
                     NORMALIZE
                         |
                         v
                      VALIDATE
                         |
                         v
                    DEDUPLICATE
                         |
                         v
                  VERIFY / RESEARCH
                         |
                         v
                       CURATE
                         |
                         v
                TECHNOLOGY DATABASE
                         |
              +----------+----------+
              |                     |
              v                     v
        TECHNOLOGY HUB         WEEKLY DIGEST
```

### Stage 1: Scout

Each source adapter retrieves source-native records.

Responsibilities:

- Fetch new candidates.
- Respect rate limits.
- Handle pagination.
- Retry transient failures.
- Store collection timestamps.
- Preserve source identifiers and URLs.
- Isolate failures between sources.

Scout should not make final relevance decisions.

### Stage 2: Normalize

Convert different source formats into a shared candidate schema.

Suggested fields:

```text
candidate_id
source
source_item_id
title
description
canonical_url
published_at
discovered_at
category
repository_url
author
raw_metadata
```

Keep source-specific metadata separately when required.

### Stage 3: Validate

Evaluate:

- Technical relevance.
- Novelty.
- Practical usefulness.
- Actionability.
- Evidence availability.
- Marketing or hype risk.

Use deterministic checks for dates, counts, links and other objective values.

Use LLMs for semantic judgments.

### Stage 4: Deduplicate

Identify repeated coverage using:

- Canonical URLs.
- Repository identifiers.
- Source identifiers.
- Normalized titles.
- Content fingerprints.
- Semantic similarity when necessary.

Multiple reports about the same underlying development should contribute to one technology record rather than creating duplicate entries.

### Stage 5: Verify and Research

Retrieve authoritative sources.

Preferred source order:

1. Official repository.
2. Official documentation.
3. Official model card or research paper.
4. Official release announcement.
5. Maintainer announcement.
6. Developer community.
7. Secondary sources.

Extract important claims with their supporting URLs and evidence.

Do not silently convert unverified claims into facts.

### Stage 6: Curate

Generate a structured technology record.

Suggested output:

- Technology overview.
- Previous problem.
- What changed.
- How it works.
- Main capabilities.
- Practical applications.
- Implementation resources.
- License status.
- Limitations.
- Supporting sources.

Store verification status and review warnings.

---

## 7. Enterprise RAG Architecture

RAG connects external technology information with internal company knowledge.

### Document Processing Pipeline

```text
Company Document
       |
       v
    UPLOAD
       |
       v
 TEXT EXTRACTION
       |
       v
    CLEANING
       |
       v
     CHUNKING
       |
       v
   EMBEDDINGS
       |
       v
  SUPABASE PGVECTOR
       |
       v
  SEMANTIC RETRIEVAL
       |
       v
 PERMISSION FILTERING
       |
       v
 GEMINI + RETRIEVED CONTEXT
       |
       v
 STRUCTURED RESPONSE
```

### Step 1: Upload

Users upload supported company documents.

Initial formats:

- PDF.
- DOCX.
- TXT.
- Markdown.

### Step 2: Extraction

Extract text and relevant document metadata.

Record extraction failures and unsupported formats.

### Step 3: Chunking

Divide documents into meaningful sections.

Avoid splitting technical explanations arbitrarily.

Preserve document ID, page information and section metadata.

### Step 4: Embedding

Generate vectors using the configured embedding provider.

### Step 5: Storage

Store:

- Document metadata.
- Extracted chunks.
- Embeddings.
- Organization ID.
- Access permissions.
- Processing status.

### Step 6: Retrieval

When analyzing a technology, retrieve relevant company documents using semantic search.

Apply organization and user permissions before exposing retrieved content to the LLM.

### Step 7: Generation

Pass retrieved context and verified technology information to Gemini.

### Step 8: Output

Generate:

- Company relevance.
- Related projects.
- Potential applications.
- Required skills.
- Infrastructure requirements.
- Potential benefits.
- Cost considerations.
- Risks.
- Recommended learning pathways.

The response must identify its supporting company documents and external sources.

---

## 8. Workforce Skill Intelligence Architecture

```text
EMPLOYEE PROFILES
       |
       v
SKILL EXTRACTION / ASSESSMENT
       |
       v
SKILL DATABASE
       |
       +--------------------+
       |                    |
       v                    v
CURRENT SKILLS       REQUIRED SKILLS
       |                    |
       +---------+----------+
                 |
                 v
          SKILL GAP ENGINE
                 |
        +--------+--------+
        |                 |
        v                 v
 EMPLOYEE REPORT     ORG REPORT
        |
        v
 LEARNING PATHWAY
```

### Skill Representation

Use a consistent skill taxonomy.

A skill record can contain:

- Skill identifier.
- Skill name.
- Category.
- Description.
- Related technologies.
- Proficiency scale.

### Skill Gap Calculation

For a basic proficiency-based comparison:

```text
Skill Gap = Required Proficiency - Current Proficiency
```

Only positive differences represent gaps.

Missing or unverified employee information should not automatically be interpreted as zero competency.

The platform should distinguish:

- Self-declared skills.
- Assessed skills.
- Demonstrated skills.
- AI-inferred skills.

---

## 9. Learning Architecture

The learning module receives:

- Employee skill profile.
- Target technology.
- Required competencies.
- Previous learning progress.
- Company-specific requirements.

It generates a structured pathway.

```text
EMPLOYEE PROFILE
       |
       v
SKILL GAP RESULTS
       |
       v
LEARNING PATH GENERATOR
       |
       v
PERSONALIZED ROADMAP
       |
       v
CODING CHALLENGES
       |
       v
AI CODING MENTOR
       |
       v
ASSESSMENT
       |
       v
PROGRESS UPDATE
       |
       v
SKILL REASSESSMENT
```

The AI mentor uses Gemini initially.

Browser-based speech-to-text and text-to-speech can be added as optional interaction modes.

If code execution is introduced, use an isolated execution provider such as Judge0. Never execute untrusted code directly inside the FastAPI server.

---

## 10. Weekly Digest Architecture

```text
SCHEDULED JOB
      |
      v
FETCH WEEKLY TECHNOLOGY RECORDS
      |
      v
FILTER AND RANK
      |
      v
PERSONALIZE BY ROLE
      |
      v
GENERATE NEWSLETTER
      |
      v
EMAIL DELIVERY
      |
      v
STORE DELIVERY STATUS
```

Important developments can also trigger separate notifications.

Digest generation and notification delivery should be separate operations so email failures do not destroy generated digest records.

Maintain:

- Digest period.
- Technology entries.
- Ranking and relevance reasons.
- Recipient preferences.
- Delivery status.
- Notification history.

---

## 11. Database Architecture

**Database:** Supabase PostgreSQL.

**Vector search:** pgvector.

Suggested logical entities:

| Table                    | Purpose                                |
| ------------------------ | -------------------------------------- |
| organizations            | Organization records                   |
| departments              | Organization departments               |
| profiles                 | Authenticated user profiles            |
| memberships              | User-to-organization membership        |
| roles                    | Organization roles and permissions     |
| projects                 | Company project information            |
| documents                | Uploaded company documents             |
| document_chunks          | Extracted and chunked content          |
| technology_candidates    | Raw and normalized discoveries         |
| technologies             | Curated technology records             |
| technology_sources       | Source and evidence relationships      |
| technology_metrics       | Time-based popularity/activity metrics |
| technology_relevance     | Organization-specific relevance        |
| skills                   | Skill taxonomy                         |
| employee_skills          | Employee competencies and evidence     |
| project_requirements     | Required project competencies          |
| skill_gaps               | Calculated competency gaps             |
| learning_paths           | Personalized roadmaps                  |
| learning_modules         | Roadmap modules                        |
| coding_challenges        | Practical exercises                    |
| learning_progress        | Employee progress                      |
| mentor_sessions          | AI mentor conversation metadata        |
| adoption_recommendations | Technology adoption analysis           |
| digests                  | Weekly digest records                  |
| digest_items             | Technologies included in digests       |
| notification_preferences | User notification settings             |
| notifications            | Notification records                   |

The final schema should be created incrementally through SQL migrations.

Do not create all tables before their corresponding features are implemented.

### Organization Isolation

Every organization-owned record must have an organization identifier.

Implement Row Level Security (RLS) and backend authorization.

Never trust organization IDs supplied by the frontend without checking the authenticated user's membership.

Use private storage buckets for company documents.

---

## 12. Background Processing

Scheduled and potentially long-running operations should not block user-facing API requests.

Initial approach:

- Scheduled ingestion using APScheduler or an external cron scheduler.
- Background tasks for document processing.
- Scheduled weekly digest generation.
- Independent notification delivery.

For the first version, a lightweight scheduler and persistent job status are sufficient.

A dedicated task queue can be introduced when workload and reliability requirements justify it.

---

## 13. API Design

Use versioned REST endpoints.

Base path:

```text
/api/v1
```

Suggested endpoint groups:

| Module         | Example endpoints            |
| -------------- | ---------------------------- |
| Authentication | `/auth/me`                   |
| Organizations  | `/organizations`             |
| Technology     | `/technologies`              |
| Discovery      | `/technology/discovery/run`  |
| Digest         | `/digests/latest`            |
| Documents      | `/documents/upload`          |
| Enterprise     | `/enterprise/analyze`        |
| Skills         | `/skills`                    |
| Skill Gaps     | `/skills/gaps`               |
| Learning       | `/learning/paths`            |
| Mentor         | `/learning/mentor/chat`      |
| Adoption       | `/adoption/compare`          |
| Notifications  | `/notifications`             |
| Preferences    | `/notifications/preferences` |

Use appropriate HTTP methods and structured request/response schemas.

Long-running operations should return a job identifier that the frontend can poll for status.

---

## 14. Agentic AI — Future Extension

Agentic AI is intentionally excluded from the initial architecture.

Future agents may coordinate complex tasks such as:

- Multi-source technology research.
- Deep compatibility investigations.
- Multi-step company adoption analysis.
- Complex learning pathway revisions.

Before introducing an agent, first determine whether the workflow can be handled reliably using normal API calls, deterministic services and a predefined sequence of LLM requests.

Agentic orchestration should only be introduced when it provides measurable value.

---

## 15. Security and Reliability

- Store provider keys in backend environment variables.
- Never expose service-role credentials to the browser.
- Enforce organization-level authorization.
- Validate uploads and restrict file sizes.
- Treat external content as untrusted input.
- Protect against prompt injection in retrieved documents.
- Preserve source provenance.
- Respect API rate limits.
- Implement timeouts and retry limits.
- Avoid sending confidential company documents to external LLM providers without appropriate authorization.
- Record failures and processing status.
- Use isolated code execution for coding challenges.

---

## 16. Architectural Guiding Principle

**Keep data collection, validation, reasoning, storage and presentation separate.**

Every module should have a clearly defined responsibility and should be independently testable and replaceable.
