# The 24-week field plan

**Default pace:** 9 hours/week: 2 learning, 5 building, 1 verification, 1 communication. Projects are embedded in the weekly work. At 5 hours/week, budget roughly 43 weeks. Reuse the components you already have.

## 01. Frame the problem

| Week | Focus | Tasks | Evidence |
| --- | --- | --- | --- |
| 1 | Find one painful workflow | Draft the discovery brief and list five questions for a user. Define a baseline, source limitations, and success criteria. | Problem brief + metric contract |
| 2 | Make the Python boundary clean | Refactor one ingestion utility into small modules. Use a fixture and document configuration and failures. | Reproducible Python utility |
| 3 | Integrate API and database | Build a bounded API client against a local mock. Add a parameterized read-only SQL query and freshness check. | Integration slice + failure log |
| 4 | Prove the foundations | Test invalid input, missing data, timeout, and rate limiting. Open a reviewable PR and record a three-minute walkthrough. | Tested integration PR + stage review |

## 02. Ship a useful application

| Week | Focus | Tasks | Evidence |
| --- | --- | --- | --- |
| 5 | Put a contract around the data | Build and test the first FastAPI endpoints. Add migrations and one atomic operational update. | Typed API + database lifecycle |
| 6 | Protect resources and learn the browser | Test viewer/operator and cross-tenant denial cases. Practice JavaScript async calls and type the API payload. | Permission matrix + typed client |
| 7 | Build the smallest useful screen | Create the React filters, metrics view, and detail screen. Cover loading, empty, stale-data, and error states. | Usable operations UI |
| 8 | Demo one complete outcome | Connect UI, API, and database and test the full journey. Record Project 01 and ask for feedback against the brief. | Operations Console + project review |

## 03. Add grounded AI

| Week | Focus | Tasks | Evidence |
| --- | --- | --- | --- |
| 9 | Establish an AI baseline | Compare deterministic and model-based classification. Record output validation, latency, and token estimates. | Baseline report + model adapter |
| 10 | Retrieve with sources | Ingest sanitized runbooks with version and access metadata. Test citations, missing evidence, and Arabic/English queries. | Cited retrieval prototype |
| 11 | Measure and constrain | Build the 30-case learning eval set and inspect failures. Add narrow tools and a mock approval-gated action. | Eval report + bounded tool contract |
| 12 | Connect the support workflow | Handle retries, duplicate events, and explicit states in n8n. Expose one read-only MCP tool and document the trust boundary. | Support Copilot prototype + stage review |

## 04. Make it dependable

| Week | Focus | Tasks | Evidence |
| --- | --- | --- | --- |
| 13 | Reproduce the stack | Containerize the minimal services with explicit versions. Restore a backup into a separate lab instance. | Compose setup + restore evidence |
| 14 | Deploy with boundaries | Map one-cloud architecture and environment configuration. Test access, prompt injection, secret handling, and log redaction. | Deployment diagram + threat model |
| 15 | Observe and break it | Instrument task success, latency, queue delay, and cost. Run dependency-outage, duplicate-event, and recovery drills. | Telemetry view + failure matrix |
| 16 | Release the support copilot | Gate the release on tests and the versioned eval set. Record a demo, known limitations, and rollback/restore instructions. | Project 02 release + stage review |

## 05. Lead the customer pilot

| Week | Focus | Tasks | Evidence |
| --- | --- | --- | --- |
| 17 | Scope a customer pilot | Draft the Egyptian SME pilot brief and stakeholder map. Agree acceptance criteria and exclusions in a discovery simulation. | Pilot scope + acceptance rubric |
| 18 | Make tradeoffs visible | Draw architecture and write one decision record. Create a before/after demo and collect task-based feedback. | Architecture pack + feedback log |
| 19 | Measure and teach | Build a baseline/value/adoption scorecard. Write a user guide and operator handover runbook. | Pilot scorecard + enablement pack |
| 20 | Practice ownership under pressure | Run a handover teach-back or labeled self-review. Simulate an incident and write an update and postmortem. | Handover evidence + incident review |

## 06. Prove the whole journey

| Week | Focus | Tasks | Evidence |
| --- | --- | --- | --- |
| 21 | Build one narrow pilot | Freeze the scope, fixtures, and acceptance checklist. Reuse existing components to connect the first full workflow. | Capstone implementation slice |
| 22 | Finish and validate the journey | Complete UI, API, database, and workflow integration. Run user-task, permission, and failure acceptance scenarios. | Working pilot + acceptance report |
| 23 | Rehearse the release and handover | Run deployment/recovery and monitoring checks. Publish the case study, diagrams, and a five-minute demo. | Project 03 release + portfolio case study |
| 24 | Practice the FDE conversation | Run three discovery, coding/debugging, and system-design mock cases. Use the role-fit checklist to target eligible remote opportunities. | Interview pack + evidence review |

## Weekly review

- What user problem did I make easier?
- What evidence did I produce, and what failed?
- What tradeoff can I explain without relying on jargon?
- What is the smallest useful next step?
