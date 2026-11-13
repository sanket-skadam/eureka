# Eureka — Validation and Testing Strategy

## 1. Purpose

This document defines how Eureka will be tested to ensure correctness, reliability, security and usefulness.

Validation must cover more than whether an API returns a successful response.

Eureka processes external information, generates AI explanations, retrieves confidential company documents and evaluates employee competencies. Each of these operations requires appropriate validation.

The testing strategy focuses on:

1. Functional correctness.
2. Data quality.
3. AI output reliability.
4. Source verification.
5. RAG retrieval accuracy.
6. Skill-gap calculation.
7. API integration reliability.
8. Security and access control.
9. Frontend usability.
10. End-to-end workflow correctness.

---

# 2. Testing Levels

| Testing level       | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| Unit Testing        | Test individual functions and services         |
| Integration Testing | Test interactions between modules              |
| API Testing         | Validate endpoints and response contracts      |
| Database Testing    | Validate schemas, relationships and policies   |
| AI Evaluation       | Evaluate generated content and recommendations |
| Security Testing    | Verify authorization and data isolation        |
| Frontend Testing    | Verify pages and user interactions             |
| End-to-End Testing  | Validate complete user workflows               |

---

# 3. Technology Discovery Validation

## 3.1 Source Integration Testing

Test each source independently.

### GitHub

Verify:

- Repository information is retrieved correctly.
- Repository URLs are valid.
- Release metadata is parsed correctly.
- Star and fork counts are handled correctly.
- Pagination works.
- Rate limits are handled.
- Missing metadata does not crash the pipeline.

### Hugging Face

Verify:

- Model information is retrieved.
- Dataset and Space records are parsed correctly.
- Model-card information is handled.
- Download and like metrics are parsed.
- Missing license information is preserved as unknown.

### Reddit

Verify:

- Posts are retrieved from configured sources.
- Post URLs are valid.
- Publication timestamps are normalized.
- Community engagement metrics are handled.
- Duplicate posts are identified.
- API or RSS failures are isolated.

### RSS/Atom

Verify:

- Feed entries are parsed correctly.
- Publication dates are handled.
- Missing descriptions do not crash processing.
- Duplicate entries are detected.
- Invalid feeds are reported.

### X

If implemented, test according to the actual API access level, response format, quota and usage restrictions.

## 3.2 Normalization Testing

Verify that different source records produce valid common candidate records.

Test:

- Missing titles.
- Missing descriptions.
- Invalid URLs.
- Invalid timestamps.
- Duplicate identifiers.
- Different date formats.
- Unexpected metadata structures.

Preserve original source metadata wherever practical.

## 3.3 Validation Testing

Test whether the validation stage:

- Rejects irrelevant content.
- Identifies technical developments.
- Detects insufficient evidence.
- Distinguishes announcements from meaningful technical releases.
- Handles marketing-heavy content.
- Uses deterministic metrics correctly.
- Records LLM assessment reasons.

The system must not reject a technology merely because it is new or has low popularity.

## 3.4 Deduplication Testing

Create test cases containing:

- Same URL from multiple sources.
- Different URLs pointing to the same repository.
- Slightly different titles.
- Multiple discussions about one release.
- Similar but unrelated technologies.

Verify that related records are grouped without incorrectly merging distinct projects.

## 3.5 Research and Verification Testing

Verify:

- Official sources are preferred.
- Important claims have evidence links.
- URLs are reachable where link checking is possible.
- License information is not invented.
- Unverified claims are flagged.
- Missing information is represented as unknown.
- Contradictory information is handled explicitly.

## 3.6 Curation Testing

Verify that generated technology explanations contain:

- Previous problem.
- Technology overview.
- Capabilities.
- Practical applications.
- Implementation resources.
- Limitations.
- License status.
- Supporting sources.

Check for:

- Unsupported technical claims.
- Incorrect commands.
- Fabricated specifications.
- Repeated content.
- Broken links.
- Misleading explanations.

---

# 4. Technology Ranking Validation

Popularity and technical relevance must be measured separately.

Test:

- Ranking consistency.
- Recency handling.
- Duplicate impact.
- Missing metrics.
- Low-popularity but technically useful developments.
- Popular but technically weak announcements.

The scoring formula and weights must be configurable and documented.

Evaluate ranking quality using a manually reviewed sample of technology records.

Possible evaluation measurements:

- Precision@K.
- Recall@K.
- NDCG@K.
- Human relevance ratings.

Do not treat engagement metrics as a substitute for technical usefulness.

---

# 5. RAG Validation

RAG is a critical component because company-specific recommendations depend on retrieved internal information.

## 5.1 Document Upload Testing

Test:

- Supported file formats.
- Unsupported formats.
- Empty documents.
- Corrupted documents.
- Oversized files.
- Duplicate uploads.
- Extraction failures.
- Permission restrictions.

## 5.2 Text Extraction Testing

Verify:

- Extracted text is readable.
- Page and section information is preserved where possible.
- Special characters are handled.
- Empty pages do not produce invalid chunks.
- Extraction errors are recorded.

## 5.3 Chunking Testing

Verify:

- Chunks remain within configured size limits.
- Important context is not unnecessarily separated.
- Document references are retained.
- Chunk ordering is preserved.
- Metadata is associated correctly.

## 5.4 Embedding Testing

Verify:

- Embedding dimensions match the configured model.
- Vectors are stored correctly.
- Model identifiers are recorded.
- Failed embedding requests are retried safely.
- Changing embedding models does not silently mix incompatible vectors.

## 5.5 Retrieval Testing

Prepare questions with known relevant document sections.

Measure:

- Recall@K.
- Precision@K.
- Retrieval relevance.
- Source-document correctness.
- Cross-organization isolation.

## 5.6 Generated Answer Testing

Verify:

- Answers use retrieved context.
- Relevant documents are cited.
- Unsupported information is not presented as company fact.
- Conflicting documents are handled carefully.
- Insufficient context produces an appropriate limitation response.

A successful RAG response must be both relevant and grounded.

---

# 6. Skill Intelligence Validation

## 6.1 Skill Profile Testing

Verify:

- Skills are stored correctly.
- Proficiency levels follow a consistent scale.
- Evidence sources are retained.
- Duplicate skills are handled.
- Missing values remain distinguishable from low proficiency.

## 6.2 Skill Gap Testing

Use manually constructed examples with known expected results.

Example:

| Skill  | Current | Required | Expected Gap |
| ------ | ------: | -------: | -----------: |
| Python |       3 |        4 |            1 |
| APIs   |       4 |        3 |            0 |
| RAG    |       1 |        4 |            3 |

Using:

`Gap = max(0, Required Level - Current Level)`

Verify:

- Correct gap calculations.
- Correct handling of missing skill records.
- Correct aggregation by department.
- Correct project-to-skill mapping.
- Consistency between employee and organizational dashboards.

## 6.3 Employee Matching Testing

Verify:

- Matching uses documented criteria.
- Scores are explainable.
- Missing data is handled.
- No unsupported competency claims are made.
- Results are not presented as objective employment decisions.

---

# 7. AI Learning and Mentor Validation

## 7.1 Learning Path Testing

Check whether generated pathways:

- Match the employee's skill gaps.
- Follow logical prerequisite ordering.
- Contain achievable learning stages.
- Include relevant resources.
- Align with the target technology.
- Avoid unnecessary topics.

## 7.2 Coding Challenge Testing

Verify:

- Problem statements are clear.
- Test cases represent expected behaviour.
- Difficulty levels are appropriate.
- Evaluation results are reproducible.
- Invalid submissions are handled.
- Code execution is isolated when external execution is enabled.

## 7.3 AI Mentor Testing

Evaluate:

- Explanation correctness.
- Relevance to the selected module.
- Difficulty adaptation.
- Hint quality.
- Debugging accuracy.
- Handling of incorrect assumptions.
- Consistency with official documentation.

The mentor should not automatically reveal complete solutions when the user requests hints.

## 7.4 Progress Tracking

Verify:

- Completed modules are recorded.
- Challenge scores are calculated correctly.
- Progress is associated with the correct employee.
- Reassessment updates competency records appropriately.

---

# 8. Technology Adoption Validation

Test model and technology comparisons using known provider information.

Verify:

- Pricing values.
- Context window information.
- Capability descriptions.
- Supported modalities.
- Hosting requirements.
- Rate limits.
- Deployment restrictions.

Every time-sensitive specification should have a source and retrieval timestamp.

Evaluate recommendation quality against manually reviewed scenarios.

Check whether recommendations consider:

- Technical compatibility.
- Cost.
- Performance.
- Security.
- Existing infrastructure.
- Organizational requirements.

The LLM should explain trade-offs, not invent quantitative measurements.

---

# 9. Weekly Digest and Notification Validation

Verify:

- Correct digest period.
- No accidental duplicate entries.
- Ranking consistency.
- Role-based personalization.
- Correct technology links.
- Relevant learning resources.
- Email formatting.
- Recipient preferences.
- Delivery status recording.

### Smart Notification Tests

Test:

- Important release alerts.
- Irrelevant notification filtering.
- Duplicate alert prevention.
- User preference enforcement.
- Email delivery failure.
- Retry behaviour.
- Notification frequency limits.

Verify that immediate notifications do not unnecessarily repeat information already included in the weekly digest.

---

# 10. API Testing

Test all major endpoint categories.

| Module         | Validation                       |
| -------------- | -------------------------------- |
| Authentication | Login, session and permissions   |
| Organization   | Membership and access            |
| Technology     | Search, filtering and details    |
| Discovery      | Job creation and status          |
| Documents      | Upload and processing            |
| Enterprise     | Contextual analysis              |
| Skills         | Profile and skill-gap operations |
| Learning       | Pathway and progress operations  |
| Mentor         | Chat requests and responses      |
| Adoption       | Comparison and recommendations   |
| Digest         | Digest retrieval                 |
| Notifications  | Preferences and delivery records |

Check:

- HTTP status codes.
- Request validation.
- Response schemas.
- Authentication requirements.
- Authorization failures.
- Pagination.
- Error responses.
- Rate limiting where applicable.

---

# 11. Database and Security Validation

## Database

Verify:

- Foreign-key relationships.
- Unique constraints.
- Required fields.
- Indexes.
- Migration consistency.
- Transaction behaviour.
- Vector column compatibility.

## Organization Isolation

Create at least two test organizations.

Verify that:

- Organization A cannot read Organization B's documents.
- Organization A cannot retrieve Organization B's embeddings.
- Organization A cannot access Organization B's employee profiles.
- Unauthorized users cannot access organization-level reports.
- Storage URLs do not expose private documents.

Test RLS policies directly, not only through frontend navigation.

## API Key Security

Verify:

- Keys are not present in frontend bundles.
- Keys are not returned in API responses.
- `.env` files are excluded from Git.
- Logs do not contain secrets.
- Provider credentials are stored securely.

## Prompt Injection and Untrusted Content

Test documents and external posts containing instructions that attempt to manipulate the LLM.

Verify that:

- External content is treated as data, not trusted instructions.
- Retrieved content cannot override system policies.
- Recommendations remain grounded in relevant evidence.
- Tool execution requires explicit server-side authorization.

---

# 12. Frontend Validation

Test:

- Login and logout.
- Protected routes.
- Dashboard loading.
- Search and filtering.
- Technology details.
- Document uploads.
- Skill profile editing.
- Learning interactions.
- Mentor conversations.
- Notifications.
- Responsive layouts.
- Keyboard navigation.
- Accessibility.

Every page should have:

- Loading state.
- Error state.
- Empty state.
- Successful state.

Also verify that the application remains usable on smaller screens.

---

# 13. End-to-End Validation

The following workflows are the most important acceptance scenarios.

### Workflow A: Technology Discovery

```text
Fetch technology from GitHub
          |
          v
Normalize candidate
          |
          v
Validate relevance
          |
          v
Deduplicate
          |
          v
Verify official sources
          |
          v
Generate explanation
          |
          v
Display in Technology Hub
```

Expected result: A valid technology entry with source information and an explanation.

### Workflow B: Company-Specific Analysis

```text
Upload company document
          |
          v
Extract and chunk text
          |
          v
Generate embeddings
          |
          v
Store in pgvector
          |
          v
Select technology
          |
          v
Retrieve company context
          |
          v
Generate recommendation
```

Expected result: A recommendation grounded in relevant company documents and external technology sources.

### Workflow C: Skill Gap and Learning

```text
Employee Skill Profile
          |
          v
Required Skill Mapping
          |
          v
Skill Gap Calculation
          |
          v
Personalized Learning Path
          |
          v
Coding Challenge
          |
          v
Assessment
          |
          v
Progress Update
```

Expected result: An explainable skill-gap report and a relevant learning pathway.

### Workflow D: Weekly Digest

```text
Scheduled Weekly Job
          |
          v
Select Relevant Technologies
          |
          v
Rank and Personalize
          |
          v
Generate Digest
          |
          v
Send Newsletter
          |
          v
Record Delivery Status
```

Expected result: A personalized newsletter with valid sources and correct delivery records.

---

# 14. AI Evaluation Methodology

LLM output should not be considered correct merely because the API returns valid JSON or HTTP 200.

Maintain a small evaluation dataset containing:

- Technology descriptions.
- Official source material.
- Expected categories.
- Expected claims.
- Company document examples.
- Skill-gap examples.
- Expected learning prerequisites.

Evaluate generated outputs for:

| Dimension           | Evaluation                                    |
| ------------------- | --------------------------------------------- |
| Factual correctness | Does the response match the evidence?         |
| Relevance           | Does it address the requested problem?        |
| Grounding           | Are claims supported by sources?              |
| Completeness        | Are required sections present?                |
| Clarity             | Is the explanation understandable?            |
| Consistency         | Are repeated runs reasonably consistent?      |
| Safety              | Does it respect permissions and restrictions? |

Use automated checks where possible and human review for semantic quality.

---

# 15. Suggested Initial Acceptance Criteria

These are proposed starting targets, not measured project results. Calibrate them using the first evaluation dataset.

| Area                    | Initial acceptance criterion                                              |
| ----------------------- | ------------------------------------------------------------------------- |
| Source integration      | Valid source records are parsed and retained                              |
| Normalization           | All valid candidates follow the common schema                             |
| Deduplication           | Known exact duplicates are grouped correctly                              |
| Source verification     | Important claims have traceable evidence or an explicit unverified status |
| Technology explanations | Required sections are present and source-supported                        |
| RAG retrieval           | Relevant known document chunks appear in top-K results                    |
| RAG isolation           | Zero cross-organization retrieval in security tests                       |
| Skill gap               | All predefined calculation test cases pass                                |
| Learning paths          | Required competencies and prerequisites are represented                   |
| Adoption                | Quantitative comparisons have authoritative supporting data               |
| Digest                  | Correct period, personalization and duplicate handling                    |
| Notifications           | User preferences are enforced                                             |
| API security            | Unauthorized requests are rejected                                        |

Suggested quantitative targets after establishing a baseline:

- RAG Recall@5: at least 0.80 on a curated test set.
- Exact-duplicate detection: 100% on deterministic test cases.
- Skill-gap calculation: 100% on predefined unit tests.
- Cross-organization access: zero successful unauthorized cases.
- Critical factual claims without evidence: zero in published verified content.

These targets must be evaluated against the defined test sets, not assumed from development completion.

---

# 16. Testing Tools

| Purpose                  | Suggested tools                   |
| ------------------------ | --------------------------------- |
| Backend unit tests       | pytest                            |
| API tests                | FastAPI TestClient / HTTPX        |
| Frontend unit tests      | Vitest                            |
| Frontend component tests | React Testing Library             |
| Browser testing          | Playwright                        |
| Database testing         | PostgreSQL test database          |
| API documentation        | FastAPI OpenAPI                   |
| Code quality             | Ruff, ESLint                      |
| Type checking            | mypy, TypeScript                  |
| AI evaluation            | Curated datasets and human review |
| Security                 | RLS tests, dependency audits      |

---

# 17. Testing Workflow

For every development phase:

1. Write the expected behaviour.
2. Define valid and invalid inputs.
3. Implement unit tests.
4. Implement integration tests.
5. Test API contracts.
6. Test permission boundaries.
7. Test frontend interactions.
8. Record known limitations.
9. Fix critical failures.
10. Update documentation.

Run offline tests during normal development.

Network-dependent integration tests should be explicitly enabled and should respect provider quotas.

---

# 18. Final Validation Principle

**A feature is complete only when its functionality, data quality, permissions, error handling and expected outputs have been tested.**

Eureka must prioritize trustworthy intelligence over impressive-looking AI-generated results.
