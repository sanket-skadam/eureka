# Eureka

## Enterprise Technology & Workforce Intelligence Platform

Eureka is an AI-powered enterprise intelligence platform designed to help organizations keep pace with emerging technologies, understand their relevance to existing business requirements, identify workforce skill gaps and prepare employees for future technology demands.

Instead of expecting employees and HR/L&D teams to constantly monitor the technology landscape, Eureka discovers, evaluates and explains important developments, then connects them with company requirements and employee capabilities.

The platform transforms technology awareness into practical learning and informed technology adoption.

---

## 1. The Problem

Technology evolves rapidly. New AI models, frameworks, developer tools, programming languages and engineering methodologies emerge continuously.

Organizations struggle with:

- Identifying which emerging technologies are actually relevant.
- Understanding how new technologies can benefit existing projects.
- Tracking employee competencies accurately.
- Identifying current and future skill gaps.
- Providing personalized training instead of generic learning material.
- Connecting theoretical learning with practical implementation.
- Making cost-effective technology and AI model adoption decisions.
- Keeping employees updated without overwhelming them.

## 2. The Solution

Eureka connects external technology intelligence with internal organizational knowledge and employee skill profiles.

Its central workflow is:

**Discover → Understand → Contextualize → Identify Skill Gaps → Upskill → Adopt**

### Core Product Pillars

#### 1. Technology Intelligence Hub

- Discover emerging technologies from GitHub, Hugging Face, Reddit, RSS feeds and other permitted sources.
- Track new repositories, releases, models, frameworks and developer tools.
- Categorize technologies by domain.
- Generate beginner-friendly technical explanations using LLM APIs.
- Provide official documentation, repositories and tutorials.
- Rank developments using technical relevance, novelty, community activity and potential impact.

#### 2. Enterprise Intelligence

- Upload company documents and technical specifications.
- Understand existing projects, technology stacks and business requirements.
- Extract relevant information from organizational documents.
- Use Retrieval-Augmented Generation (RAG) to connect emerging technologies with company context.
- Generate company-specific technology recommendations.

#### 3. Workforce Skill Intelligence

- Maintain employee skill profiles.
- Identify skills required by upcoming projects.
- Compare existing competencies against required competencies.
- Generate organizational skill-gap reports.
- Identify employees who may benefit from specific training opportunities.

#### 4. Adaptive Upskilling Studio

- Generate personalized learning pathways.
- Provide interactive coding challenges.
- Offer an adaptive AI coding mentor.
- Explain errors and provide step-by-step debugging assistance.
- Track learning progress and reassess demonstrated competencies.

#### 5. Technology Adoption Intelligence

- Compare frameworks, tools and AI models.
- Evaluate compatibility with existing infrastructure.
- Compare pricing, latency, capabilities and deployment requirements.
- Highlight security, licensing and operational considerations.
- Generate evidence-backed technology adoption recommendations.

### Additional Feature: Weekly Technology Digest

- Automatically curate important technology developments every week.
- Rank technologies according to relevance and potential impact.
- Generate simple explanations and practical use cases.
- Provide documentation, GitHub repositories and tutorials.
- Personalize updates according to employee roles and interests.
- Send weekly email newsletters.
- Trigger separate notifications for particularly important developments.
- Allow employees to configure notification preferences.

The objective is to make continuous technology awareness part of employees' regular routines.

---

## 3. Technology Stack

| Layer            | Technology                                |
| ---------------- | ----------------------------------------- |
| Frontend         | React, TypeScript, Vite                   |
| Styling          | Tailwind CSS, shadcn/ui                   |
| Backend          | Python, FastAPI                           |
| Database         | Supabase PostgreSQL                       |
| Authentication   | Supabase Auth                             |
| File Storage     | Supabase Storage                          |
| Vector Search    | pgvector                                  |
| LLM              | Google Gemini API                         |
| External Sources | GitHub, Hugging Face, Reddit, RSS         |
| Optional Source  | X API, subject to access and usage limits |
| Embeddings       | Configurable embedding API                |
| Email            | Resend or equivalent provider             |
| Voice STT/TTS    | Browser Web Speech APIs                   |
| Code Execution   | Judge0, optional                          |
| Version Control  | Git and GitHub                            |

The system uses API-first integrations. External services are accessed through backend adapters so providers can be replaced without rewriting business logic.

---

## 4. Architecture Philosophy

Eureka initially follows a modular monolithic architecture.

The backend is divided into independent business modules, while external integrations are isolated in provider adapters.

Technology discovery follows a staged pipeline:

1. Scout — collect raw information.
2. Normalize — convert source records into a common structure.
3. Validate — evaluate relevance and technical substance.
4. Deduplicate — identify repeated coverage.
5. Verify — check claims against authoritative sources.
6. Research — enrich selected technologies.
7. Curate — generate structured explanations and digest content.

Company documents follow a separate RAG pipeline.

LLMs assist with semantic understanding, summarization and recommendations. Objective measurements and validation rules are handled programmatically wherever possible.

Agentic AI is not required for the initial implementation.

---

## 5. Initial Development Priorities

| Priority | Features                                             |
| -------- | ---------------------------------------------------- |
| P0       | Technology discovery, validation, technology feed    |
| P0       | Company document ingestion and RAG                   |
| P0       | Company-specific technology recommendations          |
| P0       | Basic employee skill profiles and skill-gap analysis |
| P1       | Personalized learning pathways                       |
| P1       | AI coding mentor                                     |
| P1       | Technology adoption advisor                          |
| P1       | Weekly digest and email notifications                |
| P2       | Interactive code execution                           |
| P2       | Advanced employee-role matching                      |
| P2       | Explainer video generation                           |
| P2       | Advanced agentic workflows                           |

The initial goal is to demonstrate one complete workflow rather than implementing every feature independently.

---

## 6. Repository Structure

```text
eureka/
├── frontend/
├── backend/
├── database/
├── docs/
├── tests/
├── .env.example
├── .gitignore
├── AGENTS.md
└── README.md
```

See [FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md).

---

## 7. Documentation

- [Project Overview](docs/OVERVIEW.md)
- [System Architecture](docs/ARCHITECTURE.md)
- [Implementation Plan](docs/IMPLEMENTATION.md)
- [Validation Strategy](docs/VALIDATION.md)
- [Folder Structure](docs/FOLDER_STRUCTURE.md)

---

## 8. Development Status

**Current status: Planning and initial project setup.**

The project is not yet implemented.

All features described in this document represent the intended product scope. Their implementation and validation will be tracked as development progresses.

---

## 9. Development Principles

1. Build working functionality before adding complexity.
2. Prefer official APIs and permitted data sources over unrestricted scraping.
3. Keep API keys and secrets exclusively on the backend.
4. Preserve the original source of every important technology claim.
5. Never treat popularity as proof of technical usefulness.
6. Use deterministic calculations for objective metrics.
7. Use LLMs for semantic tasks where they provide genuine value.
8. Provide fallback behaviour when external APIs are unavailable.
9. Respect organization-level data isolation.
10. Test each module independently before integrating it.
11. Avoid premature microservices and agentic orchestration.
12. Keep documentation synchronized with actual implementation.

---

**Eureka — Turning emerging technology into organizational capability.**
