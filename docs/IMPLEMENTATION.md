# Eureka — Implementation Plan

## 1. Purpose

This document defines the recommended development sequence for Eureka.

The objective is to build a working enterprise technology and workforce intelligence platform incrementally without introducing unnecessary complexity.

Development should prioritize functional integration over building isolated screens or disconnected AI features.

**Initial architecture:** React frontend + FastAPI backend + Supabase PostgreSQL + external APIs.

**Initial AI approach:** Gemini API and configurable embedding APIs.

**Agentic AI:** Deferred.

---

# 2. Development Strategy

Follow these principles:

1. Establish the repository and development environment first.
2. Build the backend and frontend foundations.
3. Integrate external sources through individual adapters.
4. Build the technology discovery pipeline.
5. Implement company document ingestion and RAG.
6. Implement skill intelligence.
7. Connect the learning and adoption modules.
8. Implement the weekly digest and notifications.
9. Integrate everything through the frontend.
10. Validate security, functionality and reliability.

Do not implement all modules simultaneously.

---

# 3. Phase-Wise Implementation

## Phase 0 — Project Initialization

### Objectives

- Initialize Git repository.
- Configure frontend and backend projects.
- Establish documentation.
- Configure environment variables.
- Define coding conventions.

### Frontend

Initialize:

- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- shadcn/ui.
- React Router.

### Backend

Initialize:

- Python.
- FastAPI.
- Uvicorn.
- Pydantic.
- Environment configuration.
- Logging.

### Database

Create Supabase project.

Configure:

- PostgreSQL.
- Authentication.
- Storage.
- pgvector extension when required.

### Deliverables

- Running frontend.
- Running backend.
- Database connection.
- Environment templates.
- Git repository.
- Initial project documentation.

---

## Phase 1 — Authentication and Organization Management

### Objectives

Build the foundation for multi-user enterprise functionality.

### Implementation

1. Configure Supabase Auth.
2. Implement login and registration.
3. Create user profiles.
4. Create organizations.
5. Implement organization membership.
6. Configure role-based access.
7. Implement protected backend endpoints.
8. Add frontend route protection.

### Suggested Roles

- Organization Admin.
- HR/L&D Manager.
- Technical Lead.
- Employee.

Permissions should be enforced by the backend and database, not merely by hiding frontend elements.

### Deliverables

- Authentication workflow.
- Organization creation.
- Membership management.
- Role-based authorization.

---

## Phase 2 — Technology Intelligence and External Integrations

### Objectives

Build the technology discovery engine.

### Step 1: Create source adapters

Implement separate integrations for:

1. GitHub.
2. Hugging Face.
3. Reddit.
4. RSS/Atom.
5. Optional X API.

Each adapter should:

- Retrieve data.
- Handle pagination.
- Respect rate limits.
- Handle failures.
- Normalize source metadata where appropriate.
- Preserve original source identifiers.
- Record retrieval timestamps.

### Step 2: Create the common candidate schema

Define a Pydantic model containing:

- Candidate ID.
- Source.
- Source item ID.
- Title.
- Description.
- Canonical URL.
- Publication date.
- Discovery date.
- Category.
- Source metadata.

### Step 3: Implement Scout

Retrieve candidate information from each source.

Save raw source records for later processing.

### Step 4: Implement Normalization

Convert records into the common candidate schema.

### Step 5: Implement Validation

Apply:

- Required-field checks.
- URL validation.
- Date validation.
- Technical relevance checks.
- Novelty assessment.
- Evidence availability checks.
- Marketing/hype filtering.

Use deterministic rules for objective checks and Gemini for selected semantic judgments.

### Step 6: Implement Deduplication

Start with:

- Canonical URL matching.
- Repository matching.
- Source ID matching.
- Normalized title matching.

Add semantic similarity only when necessary.

### Step 7: Implement Research

Retrieve official documentation, repository information and other authoritative sources.

Generate structured technology briefs.

Verify important claims and links programmatically wherever possible.

### Step 8: Implement Curation

Generate structured explanations.

Each explanation should contain:

- Previous problem.
- Technology description.
- Working principle.
- Capabilities.
- Applications.
- Implementation resources.
- Limitations.
- License information.
- Supporting sources.

### Step 9: Implement Ranking

Use a configurable ranking system.

Maintain separate fields for objective popularity/activity measurements and semantic relevance assessments.

### Deliverables

- Working source integrations.
- Technology discovery pipeline.
- Technology database records.
- Technology feed API.
- Source-backed technology explanations.

---

## Phase 3 — Technology Hub Frontend

### Objectives

Connect the technology intelligence backend to the frontend.

### Pages

1. Technology dashboard.
2. Technology explorer.
3. Technology detail page.
4. Category filters.
5. Search.
6. Trending technologies.
7. Source information.

### UI requirements

- Search and filters.
- Category badges.
- Technology cards.
- Ranking indicators.
- Source links.
- Loading states.
- Empty states.
- Error states.
- Responsive layouts.

### Deliverables

A functional technology discovery experience using actual backend data.

---

## Phase 4 — Enterprise Intelligence and RAG

### Objectives

Allow organizations to upload documents and receive company-specific technology recommendations.

### Step 1: Document Upload

Implement:

- PDF upload.
- DOCX upload.
- TXT upload.
- Markdown upload.
- File validation.
- Private document storage.
- Upload status.

### Step 2: Text Extraction

Use appropriate Python libraries for supported formats.

Record extraction errors.

### Step 3: Chunking

Divide documents into meaningful chunks.

Store:

- Document ID.
- Organization ID.
- Chunk text.
- Page/section metadata.
- Chunk order.

### Step 4: Embeddings

Generate embeddings using a configurable provider.

Store vectors in Supabase pgvector.

### Step 5: Semantic Search

Implement similarity-based retrieval.

Apply organization-level and document-level access restrictions.

### Step 6: Contextualized Technology Analysis

When a technology is selected:

1. Retrieve verified technology information.
2. Search relevant company documents.
3. Construct a grounded context.
4. Send the context to Gemini.
5. Generate structured recommendations.
6. Preserve references to the supporting documents and sources.

### Deliverables

- Document management.
- RAG ingestion pipeline.
- Vector search.
- Company-specific recommendations.
- Evidence-linked responses.

---

## Phase 5 — Workforce Skill Intelligence

### Objectives

Create employee skill profiles and organizational skill-gap analysis.

### Step 1: Skill Taxonomy

Create a consistent list of skills and categories.

### Step 2: Employee Profiles

Store:

- Department.
- Designation.
- Existing skills.
- Proficiency levels.
- Evidence source.
- Assessment history.

### Step 3: Required Competencies

Derive required skills from:

- Company projects.
- Technology requirements.
- Organization-defined roles.
- Adoption recommendations.

### Step 4: Skill Gap Engine

Compare employee competencies against required competencies.

### Step 5: Organizational Dashboard

Display:

- Available skills.
- Missing competencies.
- Department-level gaps.
- Skill distribution.
- Emerging requirements.

### Step 6: Employee Matching

Implement basic requirement-based matching with explainable scoring.

Do not use unverified AI-inferred skills as confirmed competencies.

### Deliverables

- Employee skill profiles.
- Skill taxonomy.
- Skill-gap API.
- Organizational skill dashboard.
- Explainable employee matching.

---

## Phase 6 — Adaptive Upskilling Studio

### Objectives

Transform identified skill gaps into practical learning activities.

### Step 1: Learning Path Generator

Use Gemini to generate structured learning pathways.

Inputs:

- Current employee skills.
- Target technology.
- Required competencies.
- Learning preferences.
- Company-specific objectives.

### Step 2: Learning Module Management

Store generated roadmaps and modules.

Allow users to track progress.

### Step 3: Coding Challenges

Generate or curate practical exercises.

Every generated challenge should include:

- Problem statement.
- Difficulty.
- Required concepts.
- Expected behaviour.
- Test cases.
- Evaluation criteria.

### Step 4: AI Coding Mentor

Implement chat-based assistance.

The mentor should:

- Understand the selected learning module.
- Explain unfamiliar concepts.
- Provide hints.
- Analyze submitted code.
- Explain errors.
- Suggest improvements.

### Step 5: Voice Interaction

Optional enhancement using browser speech recognition and speech synthesis.

Provide a text-based alternative when browser voice functionality is unavailable.

### Step 6: Code Execution

Integrate Judge0 or an equivalent isolated execution service only after the basic learning experience works.

### Step 7: Progress Tracking

Track completion and assessment results.

Update demonstrated competencies based on evidence.

### Deliverables

- Personalized learning pathways.
- Coding challenges.
- AI mentor.
- Progress tracking.
- Optional voice interface.

---

## Phase 7 — Technology Adoption Advisor

### Objectives

Help organizations evaluate whether emerging technologies should be adopted.

### Implementation

1. Create a technology comparison model.
2. Retrieve current provider specifications.
3. Compare compatibility.
4. Compare costs.
5. Evaluate deployment requirements.
6. Identify risks.
7. Generate structured recommendations.

For AI models, maintain current pricing and capability information from authoritative provider sources.

Do not use LLM-generated guesses for numerical comparisons.

### Deliverables

- Technology comparison.
- AI model comparison.
- Compatibility assessment.
- Cost analysis.
- Adoption recommendations.

---

## Phase 8 — Weekly Digest and Smart Notifications

### Objectives

Keep employees updated about important technology developments.

### Step 1: Weekly Digest Generator

Select relevant technology records from the previous digest period.

Rank them using technical relevance and organizational importance.

### Step 2: Personalization

Filter digest content based on:

- Employee role.
- Department.
- Technology interests.
- Organization priorities.

### Step 3: Newsletter Generation

Use Gemini to generate concise explanations and practical summaries from verified technology records.

### Step 4: Email Integration

Integrate Resend or another supported email service.

### Step 5: Smart Notifications

Implement configurable notifications for important releases and developments.

### Step 6: Preferences

Allow employees to configure:

- Weekly digest frequency.
- Immediate alerts.
- Technology categories.
- Email preferences.

### Deliverables

- Weekly digest.
- Personalized newsletter.
- Notification preferences.
- Email delivery.
- Notification history.

---

## Phase 9 — Integration and Final Polish

### Objectives

Integrate all modules into one coherent application.

### Tasks

- Connect all frontend pages to backend APIs.
- Validate authentication across modules.
- Verify organization-level permissions.
- Improve error handling.
- Improve loading and empty states.
- Test responsive layouts.
- Validate data consistency.
- Optimize API calls.
- Add logging.
- Review security.
- Update documentation.

---

# 4. Recommended Initial MVP

Do not wait until every phase is completed to have a demonstrable product.

The initial working demonstration should include:

1. A technology discovered through an external API.
2. A structured, source-backed explanation.
3. A company document uploaded to Eureka.
4. RAG retrieving relevant company information.
5. A company-specific technology recommendation.
6. An employee skill profile.
7. A skill-gap report.
8. A generated learning pathway.

This workflow demonstrates the central value of Eureka.

---

# 5. Development Rules

## API-First Development

Implement backend API contracts before connecting frontend components.

## Provider Abstraction

Do not directly embed Gemini, GitHub or other provider calls throughout business modules.

Create reusable integration adapters.

## Configuration

Keep API keys and provider settings in environment variables.

Maintain `.env.example` with placeholder values only.

## Error Handling

Handle:

- API rate limits.
- Network failures.
- Invalid responses.
- LLM quota exhaustion.
- Document extraction failures.
- Database failures.
- Email delivery failures.

## Fallback Behaviour

The application should remain usable when optional integrations fail.

For example:

- Technology discovery should continue if one source fails.
- Technology explanations should retain their source links if Gemini is unavailable.
- The digest should preserve previously curated content if email delivery fails.
- Text-based mentor interaction should remain available when voice support is unavailable.

## Documentation

Update the relevant documentation whenever architecture, APIs, database schemas or implementation decisions change.

---

# 6. Future Agentic AI Integration

Agentic AI may be introduced after the deterministic workflows are reliable.

Potential future use cases:

- Multi-source research coordination.
- Complex technology investigation.
- Multi-step enterprise compatibility analysis.
- Adaptive learning pathway orchestration.

First implement these workflows as normal services and predefined pipelines.

Introduce agents only when autonomous planning, tool selection or iterative task execution provides a measurable advantage.

---

# 7. Implementation Completion Criteria

A phase is complete only when:

- Its primary functionality works.
- Backend APIs are tested.
- Database operations are verified.
- Permissions are enforced.
- Error cases are handled.
- Frontend integration works where applicable.
- Documentation reflects the implementation.
- Required validation tests pass.

Do not mark a phase complete merely because its UI has been created.
