# Architecture proposals

These diagrams describe suggested learning builds, not existing production systems. Keep trust boundaries visible and test them at the server, data, and tool layers.

## Project 01: Operations Console

```mermaid
flowchart TD
  User["Operations user"] --> UI["React / TypeScript console"]
  UI --> API["FastAPI · validation and authorization"]
  API --> Metrics["Synthetic gold metrics · read only"]
  API --> Issues["Issue database · transactions and audit"]
  Metrics --> Freshness["Freshness and quality signals"]
  Freshness --> API
```

The console exposes aggregate social-content metrics. Source freshness and missing data are part of the response contract. An operational issue table is separate from the analytical data. Include permission denial tests.

## Project 02: Support Copilot

```mermaid
flowchart TD
  User["Operator"] --> API["API · identity and scope"]
  API --> Flow["n8n workflow · bounded execution"]
  Flow --> Retrieval["Qdrant · authorized runbooks"]
  Flow --> Model["Model adapter · validated output"]
  Flow --> Tools["Read-only status tools / MCP"]
  Model --> Proposal["Proposed mock action"]
  Proposal --> Review{"Explicit human approval?"}
  Review -->|Yes| Action["Simulated retry · idempotency key"]
  Review -->|No| Stop["No action"]
```

Propagate a correlation ID across requests. Enforce permissions in the retrieval/tool service, not just the prompt. Version documents and eval cases. Public fixtures and logs must be sanitized. The approval example is a simulation until the operational safety checks are demonstrated.

## Project 03: SME pilot

```mermaid
flowchart TD
  Fixtures["Synthetic orders and inventory"] --> DB["PostgreSQL · contracts and constraints"]
  DB --> API["FastAPI · resource authorization"]
  API <--> UI["Operations UI · review and resolve"]
  API --> Flow["n8n · replay-safe integration"]
  Flow --> Audit["Audit events and outcomes"]
  Audit --> Scorecard["Pilot scorecard · quality, time, cost"]
  Scorecard -.-> Acceptance["Customer acceptance and handover"]
  Acceptance -.-> UI
```

The fictional distributor scenario uses its own commerce schema. Label EGP assumptions and time comparisons. AI is optional; add it only if a measured workflow need justifies the complexity.

## The roadmap website itself

```mermaid
flowchart TD
  JSON["roadmap.json · original curriculum"] --> UI["Static HTML / CSS / JavaScript"]
  JSON --> Docs["Generated Markdown companions"]
  UI --> Browser["Browser · map, filters, and notes"]
  Browser <--> Local["Local storage · device and origin only"]
  Browser <--> Backup["User-controlled JSON backup"]
  Source["GitHub main"] --> Checks["Tests and integrity checks"]
  Checks --> Pages["GitHub Pages · dist artifact"]
  Pages --> Browser
```

GitHub Pages hosts static assets. It cannot run the portfolio projects' APIs or keep an API key secret in frontend JavaScript. Those services need a separate runtime when the learning projects are implemented.
