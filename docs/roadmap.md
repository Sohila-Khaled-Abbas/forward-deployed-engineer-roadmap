# Forward Deployed Engineer: Sohila's roadmap

[Open the interactive roadmap](https://sohila-khaled-abbas.github.io/forward-deployed-engineer-roadmap/) · [Weekly plan](weekly-plan.md) · [Portfolio builds](projects.md)

Personalized for Python, SQL, BI, analytics engineering, and n8n experience. **24 weeks × 9 hours = 216 guided hours.** These are learning estimates; move by demonstrated exit checks. Existing exposure is not counted as completed work.

> [!IMPORTANT]
> This is an original learning plan, not an employer's official hiring curriculum or a guarantee of job readiness. Projects are proposed learning builds. Synthetic data, simulated customer work, and projected benefits must be labeled.

## 01. Frame the problem

**Weeks 01–04 · 36 hours**

> [!TIP]
> A scoped customer problem, a reproducible data baseline, and a tested integration script.

### Customer discovery

**6 hours · Develop new depth**

Find the workflow that hurts before choosing a technology.

**For Sohila:** Your KPI and dashboard work is a starting point for asking operational questions. Add direct user discovery and an explicit scope agreement.

Learn and practice:

- Map one user's current workflow, workarounds, and decision points.
- Separate the buyer, daily user, technical owner, and approver.
- Write a measurable outcome, constraints, assumptions, and exclusions.

**Deliverable:** A one-page brief for a fictional Egyptian SME: problem, user, baseline, success metric, and a two-week pilot scope.

**Exit check:** You can explain who has the problem, how it is handled today, and how the pilot would be accepted without naming a tool.

**Prerequisites:** Start here.

**Sources:** [Forward Deployed Software Engineer role](https://jobs.lever.co/palantir/7ea66860-ae93-4139-9388-b7284cb33f37) · [Forward Deployed Engineer role](https://job-boards.greenhouse.io/anthropic/jobs/5391016008)

### Data & KPI baseline

**6 hours · Build on an existing foundation**

Turn a business question into an auditable measurement.

**For Sohila:** Reuse Power BI, DAX, dimensional modeling, and your PixelFed data contracts. Familiarity is a starting advantage, not an automatic completed topic.

Learn and practice:

- Define metric grain, population, refresh frequency, and ownership.
- Record missingness, duplicates, lineage, and source limitations.
- Keep observed values separate from synthetic fixtures and projected benefits.

**Deliverable:** A data contract and baseline table for creator activity or support workflow handling time.

**Exit check:** A peer can reproduce the metric from the documented source; synthetic records and unknowns are clearly labeled.

**Prerequisites:** Customer discovery

**Sources:** [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html)

### Python as a service skill

**6 hours · Build on an existing foundation**

Move from useful scripts to code another engineer can maintain.

**For Sohila:** Keep your Python and ETL experience. Focus on interfaces, packaging, exceptions, configuration, and small testable functions.

Learn and practice:

- Use modules, type hints, logging, and a reproducible environment.
- Separate I/O, transformation, and business rules.
- Handle errors deliberately and keep secrets out of code.

**Deliverable:** A small installable or module-based ingestion utility with configuration and a repeatable example command.

**Exit check:** A clean checkout can run the utility with a fixture; bad input produces an actionable error and no partial write.

**Prerequisites:** Customer discovery

**Sources:** [The Python Tutorial](https://docs.python.org/3/tutorial/) · [Get started with pytest](https://docs.pytest.org/en/stable/getting-started.html)

### HTTP & API integration

**6 hours · Build on an existing foundation**

Understand what actually happens across an integration boundary.

**For Sohila:** Build on your networking labs and n8n HTTP Request workflows. Implement one integration directly in Python.

Learn and practice:

- Explain methods, headers, status codes, pagination, and TLS at a practical level.
- Set timeouts; distinguish retryable failures from invalid requests.
- Handle authentication, rate limits, and idempotency expectations.

**Deliverable:** An API client against a local mock with pagination, timeout handling, and bounded retries.

**Exit check:** Demonstrate a timeout, a 429, an invalid credential, and a successful paginated response without leaking credentials.

**Prerequisites:** Python as a service skill

**Sources:** [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) · [FastAPI tutorial](https://fastapi.tiangolo.com/tutorial/)

### SQL integration contracts

**6 hours · Build on an existing foundation**

Make database access correct, bounded, and predictable.

**For Sohila:** Use your PostgreSQL and SQL Server background. Add the perspective of an application consuming your data.

Learn and practice:

- Define keys, null semantics, and query result contracts.
- Use parameterized queries, scoped permissions, and sensible indexes.
- Inspect a query plan and bound result sizes.

**Deliverable:** A read-only query layer over synthetic PixelFed gold aggregates with freshness metadata.

**Exit check:** A parameter cannot change SQL structure; missing data and empty results are handled explicitly.

**Prerequisites:** Data & KPI baseline; Python as a service skill

**Sources:** [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html)

### Git, tests & review

**6 hours · Develop new depth**

Make a change reviewable and prove its behavior.

**For Sohila:** You already work with GitHub, PRs, and CI. Add meaningful tests around the integration boundaries you own.

Learn and practice:

- Use focused branches, small commits, and a clear PR description.
- Write fixtures and tests for success, invalid input, and dependency failure.
- Document one debugging investigation and the evidence that resolved it.

**Deliverable:** A reviewed PR with a test suite for the API client and query layer.

**Exit check:** Tests fail when a real contract is broken; the README reproduces both the happy path and a failure case.

**Prerequisites:** HTTP & API integration; SQL integration contracts

**Sources:** [Get started with pytest](https://docs.pytest.org/en/stable/getting-started.html) · [Testing a FastAPI application](https://fastapi.tiangolo.com/tutorial/testing/)

## 02. Ship a useful application

**Weeks 05–08 · 36 hours**

> [!TIP]
> Project 01: a working operations console with a typed API, a small UI, and access checks.

### Typed Python APIs

**6 hours · Develop new depth**

Expose a business capability through a clear, validated API.

**For Sohila:** Wrap the logic you already understand in a service rather than rebuilding your analytics stack.

Learn and practice:

- Build request/response models, validation, and consistent error responses.
- Separate routes, business logic, and data access.
- Test the API contract and document sample requests.

**Deliverable:** FastAPI endpoints for creator metrics, freshness, and data-quality summaries.

**Exit check:** Valid, invalid, missing, and unauthorized requests have tested responses; the API never returns raw sensitive rows.

**Prerequisites:** Git, tests & review

**Sources:** [FastAPI tutorial](https://fastapi.tiangolo.com/tutorial/) · [Testing a FastAPI application](https://fastapi.tiangolo.com/tutorial/testing/)

### Transactions & migrations

**6 hours · Develop new depth**

Own the lifecycle of application data, not just SELECT queries.

**For Sohila:** Your data-modeling skills transfer well. Add constraints, atomic writes, schema migration, and connection management.

Learn and practice:

- Model a small operational table with constraints.
- Use transactions and a versioned migration approach.
- Practice a failed write and a tested recovery path.

**Deliverable:** A synthetic issue-triage table with migration scripts and an atomic update test.

**Exit check:** A failed multi-step operation leaves consistent state; a fresh database is reproducible from migrations.

**Prerequisites:** SQL integration contracts; Typed Python APIs

**Sources:** [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html) · [FastAPI tutorial](https://fastapi.tiangolo.com/tutorial/)

### Identity & permissions

**6 hours · Develop new depth**

Decide who can see or change each resource.

**For Sohila:** Use a small role model before enterprise SSO. Authentication and authorization are separate design decisions.

Learn and practice:

- Distinguish identity verification from resource authorization.
- Enforce roles and tenant boundaries on the server.
- Understand OAuth/OIDC concepts and use established identity tooling.

**Deliverable:** A viewer/operator permission matrix and API tests for denied access.

**Exit check:** Changing a resource ID cannot expose another tenant's data; expired or absent credentials are rejected.

**Prerequisites:** Typed Python APIs; Transactions & migrations

**Sources:** [FastAPI tutorial](https://fastapi.tiangolo.com/tutorial/) · [Top 10 for LLM applications](https://genai.owasp.org/llm-top-10/)

### JavaScript → TypeScript

**6 hours · Develop new depth**

Read and write the browser side of a customer solution.

**For Sohila:** Transfer your Python problem-solving habits. Spend time on JavaScript semantics before adding TypeScript types.

Learn and practice:

- Practice arrays, objects, modules, promises, and async/await.
- Type API payloads and narrow nullable/error states.
- Explain that compile-time types do not validate untrusted network data.

**Deliverable:** A typed API client that represents success, empty, loading, and error states.

**Exit check:** You can trace a button click through a network request to a rendered result and diagnose a failed call.

**Prerequisites:** HTTP & API integration

**Sources:** [The TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html) · [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)

### One useful customer UI

**6 hours · Develop new depth**

Build a screen that helps a user make a decision.

**For Sohila:** Apply your Power BI UX instincts to React components, forms, and application state.

Learn and practice:

- Use basic components, state, forms, and accessible labels.
- Design loading, empty, error, and retry states.
- Add filters and a detail view with clear data freshness.

**Deliverable:** A small creator-operations console with filters and an issue detail screen.

**Exit check:** A user can complete the intended task with a keyboard and recover from an API failure.

**Prerequisites:** JavaScript → TypeScript; Typed Python APIs

**Sources:** [React quick start](https://react.dev/learn) · [The TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### Deliver a vertical slice

**6 hours · Develop new depth**

Connect the user's action to data, service behavior, and a visible result.

**For Sohila:** Extend PixelFed into a product surface. Keep its social-content scope; do not invent sales or ROAS metrics.

Learn and practice:

- Trace a user action across UI, API, and database.
- Check data freshness and permissions at integration boundaries.
- Write a short demo script and collect structured feedback.

**Deliverable:** Project 01: PixelFed Operations Console, with setup instructions and one complete user journey.

**Exit check:** A clean checkout supports a working demo and an access-denied demo; limitations and synthetic data are disclosed.

**Prerequisites:** Identity & permissions; One useful customer UI

**Sources:** [Testing a FastAPI application](https://fastapi.tiangolo.com/tutorial/testing/) · [React quick start](https://react.dev/learn)

## 03. Add grounded AI

**Weeks 09–12 · 36 hours**

> [!TIP]
> A workflow support copilot with cited answers, scoped tools, and a small repeatable evaluation set.

### LLM application basics

**6 hours · Build on an existing foundation**

Use a model as a fallible component with an explicit contract.

**For Sohila:** You have n8n AI Agent, structured output, and sentiment workflows. Add direct SDK calls and controlled experiments.

Learn and practice:

- Explain context, tokens, sampling, and structured output.
- Validate outputs and handle rate limits, timeouts, and refusals.
- Compare a deterministic solution with an LLM baseline.

**Deliverable:** A small support-ticket classifier with a labeled fixture set and a non-LLM baseline.

**Exit check:** Malformed output is rejected; the same test cases compare quality, latency, and estimated token cost.

**Prerequisites:** Deliver a vertical slice

**Sources:** [Building effective agents](https://www.anthropic.com/research/building-effective-agents) · [Demystifying evals for AI agents](https://www.anthropic.com/research/demystifying-evals-for-ai-agents)

### RAG with evidence

**6 hours · Build on an existing foundation**

Retrieve authorized evidence and say when it is insufficient.

**For Sohila:** Reuse Qdrant from your stack. Start with a small, sanitized set of workflow runbooks, including Arabic and English examples.

Learn and practice:

- Chunk documents and preserve source IDs, versions, and metadata.
- Compare retrieval against a keyword baseline.
- Filter by access scope and return citations or an explicit no-answer.

**Deliverable:** A runbook assistant over sanitized n8n documentation with citations and tenant filters.

**Exit check:** Known answers cite the right source; missing evidence and unauthorized documents never produce a fabricated confident answer.

**Prerequisites:** LLM application basics; Identity & permissions

**Sources:** [Qdrant documentation](https://qdrant.tech/documentation/) · [Top 10 for LLM applications](https://genai.owasp.org/llm-top-10/)

### Evaluate before you trust

**6 hours · Develop new depth**

Measure failure modes, not just the best-looking response.

**For Sohila:** Bring your analyst mindset to AI quality. Treat the evaluation dataset and scoring rules as versioned assets.

Learn and practice:

- Create at least 30 learning cases: routine, ambiguous, missing-evidence, Arabic/English, and adversarial.
- Separate retrieval, task success, citation quality, and permission failures.
- Record model/prompt versions and measure latency and cost per successful task.

**Deliverable:** A versioned eval report with a baseline, failure taxonomy, and a proposed release threshold.

**Exit check:** You can reproduce the score and explain the worst failures. A suggested learning target is 80% rubric pass with zero access leaks; negotiate real pilot thresholds with users.

**Prerequisites:** LLM application basics; RAG with evidence

**Sources:** [Demystifying evals for AI agents](https://www.anthropic.com/research/demystifying-evals-for-ai-agents) · [Top 10 for LLM applications](https://genai.owasp.org/llm-top-10/)

### Tools with boundaries

**6 hours · Develop new depth**

Give an assistant only the capabilities the task needs.

**For Sohila:** Your automation experience helps with tool schemas and side effects. Start read-only, then simulate an approval-gated action.

Learn and practice:

- Define narrow schemas, resource scopes, and server-side validation.
- Distinguish model suggestions from authorized execution.
- Bound calls and execution time; use idempotency keys for writes.

**Deliverable:** Read-only execution-status tools plus a mock proposed retry requiring human approval.

**Exit check:** Prompt injection cannot broaden permissions; a repeated approval cannot execute the same side effect twice.

**Prerequisites:** Evaluate before you trust; Identity & permissions

**Sources:** [Building effective agents](https://www.anthropic.com/research/building-effective-agents) · [Top 10 for LLM applications](https://genai.owasp.org/llm-top-10/)

### Reliable workflow design

**6 hours · Build on an existing foundation**

Choose a workflow or an agent based on uncertainty and risk.

**For Sohila:** Use your n8n queue-mode project as a lab, without assuming its production readiness from the repository description.

Learn and practice:

- Model deterministic paths, retries, dead-letter handling, and human review.
- Carry correlation IDs across API, n8n, and database.
- Handle duplicate webhooks and partially completed jobs.

**Deliverable:** A support-triage workflow with explicit states and a replay-safe failure path.

**Exit check:** A duplicate webhook and a crashed dependency do not cause duplicate side effects; failed jobs are visible and recoverable.

**Prerequisites:** Tools with boundaries; Transactions & migrations

**Sources:** [Enable queue mode](https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode.md) · [Building effective agents](https://www.anthropic.com/research/building-effective-agents)

### One narrow MCP server

**6 hours · Develop new depth**

Understand a standard tool boundary by implementing a tiny one.

**For Sohila:** Expose an existing read-only capability rather than adding another framework or agent swarm.

Learn and practice:

- Explain host, client, server, tools, and resources.
- Validate arguments and scope credentials per tool.
- Version the tool contract and report structured errors.

**Deliverable:** One read-only workflow-status tool, plus a diagram of its trust boundary.

**Exit check:** A client can discover and call the tool; invalid arguments and out-of-scope resources are rejected by the server.

**Prerequisites:** Tools with boundaries; Reliable workflow design

**Sources:** [What is MCP?](https://modelcontextprotocol.io/docs/getting-started/intro) · [Top 10 for LLM applications](https://genai.owasp.org/llm-top-10/)

## 04. Make it dependable

**Weeks 13–16 · 36 hours**

> [!TIP]
> Project 02: a deployable Support Copilot with telemetry, a recovery drill, and release checks.

### Reproducible containers

**6 hours · Build on an existing foundation**

Make local success reproducible on a clean machine.

**For Sohila:** Your Docker, Redis, PostgreSQL, and n8n troubleshooting gives you useful context. Practice with a small isolated lab stack.

Learn and practice:

- Pin compatible versions, configure health checks, and separate config from secrets.
- Understand networks, named volumes, and resource limits.
- Verify backup and restore rather than only creating backup files.

**Deliverable:** A minimal Compose stack for API, database, and copilot dependencies, with a restore drill.

**Exit check:** A clean startup works; a recreated container preserves intended data; a backup restores into a separate test instance.

**Prerequisites:** One narrow MCP server

**Sources:** [Docker Compose documentation](https://docs.docker.com/compose/) · [Enable queue mode](https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode.md)

### One cloud, end to end

**6 hours · Develop new depth**

Deploy one service and understand the infrastructure it depends on.

**For Sohila:** Azure is a reasonable learning default beside your Microsoft BI tools. Choose one cloud; do not learn three at once.

Learn and practice:

- Map identity, compute, networking, storage, and managed database.
- Configure TLS, environment separation, and a budget alert.
- Compare a managed service with self-hosting using explicit tradeoffs.

**Deliverable:** A deployment diagram and a small pilot environment, or a reproducible local simulation if a paid account is unavailable.

**Exit check:** You can explain the request path, service identity, secret source, and shutdown procedure. Record any untested cloud assumptions.

**Prerequisites:** Reproducible containers; Identity & permissions

**Sources:** [Describe Azure architecture and services](https://learn.microsoft.com/en-us/training/paths/azure-fundamentals-describe-azure-architecture-services/) · [Docker Compose documentation](https://docs.docker.com/compose/)

### Security & data boundaries

**6 hours · Develop new depth**

Treat data movement and tool permissions as design decisions.

**For Sohila:** Extend your local-network and access-control work into application and AI threat modeling.

Learn and practice:

- Map sensitive data, entry points, credentials, and tenant boundaries.
- Apply least privilege, output validation, log redaction, and retention limits.
- Test prompt injection and unauthorized access; document residual risks.

**Deliverable:** A small threat model and abuse-case test report for Project 02.

**Exit check:** No secret enters a client bundle or committed fixture; denied requests remain denied across API, retrieval, and tools.

**Prerequisites:** Tools with boundaries; One cloud, end to end

**Sources:** [Top 10 for LLM applications](https://genai.owasp.org/llm-top-10/) · [What is MCP?](https://modelcontextprotocol.io/docs/getting-started/intro)

### Logs, metrics & traces

**6 hours · Develop new depth**

Explain what happened to one user request across the stack.

**For Sohila:** Use your dashboard skills on operational measurements: task success, failures, queue delay, latency, and freshness.

Learn and practice:

- Carry a correlation ID and redact sensitive log fields.
- Define service and task-level indicators with an agreed observation window.
- Follow one failed request through a distributed trace or correlated logs.

**Deliverable:** An operations view with p50/p95 latency, error rate, queue delay, and cost per successful task.

**Exit check:** A simulated failure can be traced to its cause; the dashboard distinguishes a healthy process from a successful user task.

**Prerequisites:** Reproducible containers; Reliable workflow design

**Sources:** [Observability primer](https://opentelemetry.io/docs/concepts/observability-primer/) · [Enable queue mode](https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode.md)

### Failure & recovery drills

**6 hours · Develop new depth**

Practice the failures a demo usually hides.

**For Sohila:** Turn your Redis and n8n debugging experience into a repeatable diagnostic method and a tested recovery procedure.

Learn and practice:

- Use bounded retries, backoff, idempotency, and dead-letter states.
- Inject a dependency outage, duplicate event, and malformed payload.
- Measure recovery time and data loss against explicit learning objectives.

**Deliverable:** A failure matrix and recovery drill report with commands, expected state, and evidence.

**Exit check:** Restore and replay are tested in the lab; observed recovery time and data loss are reported honestly, with no invented availability claim.

**Prerequisites:** Security & data boundaries; Logs, metrics & traces

**Sources:** [Docker Compose documentation](https://docs.docker.com/compose/) · [Observability primer](https://opentelemetry.io/docs/concepts/observability-primer/)

### CI/CD & safe releases

**6 hours · Develop new depth**

Release a known version and know how to recover.

**For Sohila:** Build on your GitHub Actions and protected-branch experience. Include API contracts and AI regressions in release decisions.

Learn and practice:

- Run tests and a small eval suite before publishing an artifact.
- Separate staging from production and record deployed versions.
- Distinguish code rollback from restoring incompatible data migrations.

**Deliverable:** Project 02 release checklist, CI pipeline, deployment notes, and rollback/restore procedure.

**Exit check:** A failed contract or access test blocks release; a known version can be redeployed and a data-restore limitation is documented.

**Prerequisites:** Failure & recovery drills; Evaluate before you trust

**Sources:** [Testing a FastAPI application](https://fastapi.tiangolo.com/tutorial/testing/) · [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) · [Demystifying evals for AI agents](https://www.anthropic.com/research/demystifying-evals-for-ai-agents)

## 05. Lead the customer pilot

**Weeks 17–20 · 36 hours**

> [!TIP]
> A capstone pilot plan with agreed acceptance criteria, feedback evidence, and an operational handover.

### Scope & stakeholder alignment

**6 hours · Develop new depth**

Turn a promising prototype into a bounded delivery commitment.

**For Sohila:** Use your BI requirements experience, then add a stakeholder map and an explicit acceptance decision.

Learn and practice:

- Run a discovery simulation with user, sponsor, and technical-owner perspectives.
- Separate must-haves from requests and maintain an assumptions log.
- Agree deliverables, exclusions, dependencies, and escalation paths.

**Deliverable:** A pilot brief and stakeholder map for a fictional Egyptian cosmetics distributor.

**Exit check:** A reviewer can identify the pilot owner, a single target workflow, and what is excluded from this iteration.

**Prerequisites:** CI/CD & safe releases; Customer discovery

**Sources:** [Forward Deployed Engineer role](https://job-boards.greenhouse.io/anthropic/jobs/5391016008) · [Forward Deployed Software Engineer role](https://jobs.lever.co/palantir/7ea66860-ae93-4139-9388-b7284cb33f37)

### Explain architecture tradeoffs

**6 hours · Develop new depth**

Make an engineering choice understandable to both users and engineers.

**For Sohila:** Extend your lakehouse and galaxy diagrams into request flows, trust boundaries, and decision records.

Learn and practice:

- Draw a system context and one end-to-end sequence.
- Compare build/buy, workflow/agent, and managed/self-hosted options.
- Write a decision record with consequences and a revisit trigger.

**Deliverable:** Two architecture diagrams and a one-page decision record for the capstone.

**Exit check:** You can explain a rejected option and the condition under which it would become preferable.

**Prerequisites:** Scope & stakeholder alignment; One cloud, end to end

**Sources:** [Building effective agents](https://www.anthropic.com/research/building-effective-agents) · [Describe Azure architecture and services](https://learn.microsoft.com/en-us/training/paths/azure-fundamentals-describe-azure-architecture-services/)

### Demos & feedback loops

**6 hours · Develop new depth**

Use a demo to learn whether the workflow is useful.

**For Sohila:** Your dashboard storytelling translates well. Add a task-based usability session with structured notes.

Learn and practice:

- Demo the user's before-and-after workflow in five minutes.
- Ask a reviewer to complete a task without coaching.
- Turn observed friction into a prioritized issue with a clear acceptance test.

**Deliverable:** A demo script, feedback log, and three prioritized changes.

**Exit check:** Separate actual reviewer feedback from your own hypotheses; if no reviewer is available, label the exercise as a self-review.

**Prerequisites:** Scope & stakeholder alignment; Explain architecture tradeoffs

**Sources:** [Forward Deployed Software Engineer role](https://jobs.lever.co/palantir/7ea66860-ae93-4139-9388-b7284cb33f37)

### Measure value & adoption

**6 hours · Build on an existing foundation**

Show what improved, for whom, and at what cost.

**For Sohila:** This is where your KPI and Power BI background is an advantage. Add adoption and total operating cost to the story.

Learn and practice:

- Compare task completion and handling time with a stated baseline.
- Measure adoption, rework, failure rate, and cost per successful task.
- Separate measured pilot results from estimated business value.

**Deliverable:** A pilot scorecard with a small sensitivity analysis and assumptions.

**Exit check:** Benefits are reproducible from evidence; projected EGP savings are labeled estimates and include labor and API/cloud assumptions.

**Prerequisites:** Demos & feedback loops; Data & KPI baseline; Logs, metrics & traces

**Sources:** [Demystifying evals for AI agents](https://www.anthropic.com/research/demystifying-evals-for-ai-agents) · [Observability primer](https://opentelemetry.io/docs/concepts/observability-primer/)

### Enablement & handover

**6 hours · Develop new depth**

Leave behind a system someone else can operate.

**For Sohila:** Turn your technical walkthroughs into a short operator guide and a clear ownership agreement.

Learn and practice:

- Write a user quickstart, operator runbook, and troubleshooting decision tree.
- Document credentials ownership, escalation, backup, and change procedures.
- Train a reviewer through one routine task and one failure case.

**Deliverable:** A handover pack and a teach-back checklist.

**Exit check:** A reviewer can follow the runbook without undocumented help; any simulated training is labeled as such.

**Prerequisites:** Measure value & adoption; Failure & recovery drills

**Sources:** [Docker Compose documentation](https://docs.docker.com/compose/) · [Observability primer](https://opentelemetry.io/docs/concepts/observability-primer/)

### Incident communication

**6 hours · Develop new depth**

Communicate clearly when a customer's workflow breaks.

**For Sohila:** Build on your evidence-first troubleshooting: state impact, current facts, next action, and the next update time.

Learn and practice:

- Triage an incident with impact, severity, and containment.
- Write a plain-language status update and a technical timeline.
- Produce a blameless root-cause analysis with corrective actions.

**Deliverable:** A simulated incident update and postmortem for a queue or retrieval failure.

**Exit check:** The update distinguishes known facts from hypotheses; every corrective action has an owner and a verification step.

**Prerequisites:** Enablement & handover; Logs, metrics & traces

**Sources:** [Observability primer](https://opentelemetry.io/docs/concepts/observability-primer/) · [Enable queue mode](https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode.md)

## 06. Prove the whole journey

**Weeks 21–24 · 36 hours**

> [!TIP]
> Project 03: a portfolio pilot demonstrating discovery, implementation, measurement, and handover.

### Freeze the capstone slice

**6 hours · Develop new depth**

Choose a small workflow and make its acceptance tests explicit.

**For Sohila:** Use an Egyptian SME operations scenario to connect SQL, BI, API development, and n8n without starting a sprawling new platform.

Learn and practice:

- Choose stock exceptions or order reconciliation for a fictional distributor.
- Use labeled synthetic order/inventory fixtures with documented EGP assumptions.
- Define success, access, correctness, performance, and recovery checks.

**Deliverable:** A final implementation plan, data contract, test fixtures, and acceptance checklist.

**Exit check:** One user, one workflow, one measurable outcome, and a documented data provenance story fit in a two-minute explanation.

**Prerequisites:** Incident communication; Explain architecture tradeoffs

**Sources:** [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html) · [Testing a FastAPI application](https://fastapi.tiangolo.com/tutorial/testing/)

### Build the pilot system

**6 hours · Develop new depth**

Connect the smallest system that completes the workflow.

**For Sohila:** Reuse components and lessons from Projects 01 and 02. AI is optional unless it improves the chosen task.

Learn and practice:

- Connect React, FastAPI, PostgreSQL, and an n8n integration.
- Preserve permission boundaries and audit operational actions.
- Keep any assistant read-only or approval-gated and show its evidence.

**Deliverable:** A working exception-to-resolution flow with a reproducible fixture and audit trail.

**Exit check:** The user completes the workflow from the UI; the backend validates actions, records outcomes, and handles a retry safely.

**Prerequisites:** Freeze the capstone slice; Deliver a vertical slice; CI/CD & safe releases

**Sources:** [FastAPI tutorial](https://fastapi.tiangolo.com/tutorial/) · [React quick start](https://react.dev/learn) · [Enable queue mode](https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode.md)

### Validate with a user lens

**6 hours · Develop new depth**

Check usability, correctness, and failure behavior against the agreed scope.

**For Sohila:** Use the same measurement discipline you apply to a BI model. Make failed checks visible rather than hiding them in the demo.

Learn and practice:

- Run happy-path, access, empty-data, duplicate-event, and dependency-failure scenarios.
- Use a reviewer or explicitly labeled self-review.
- If AI is present, run the fixed eval set and record remaining failures.

**Deliverable:** An acceptance report with evidence, open issues, and the release recommendation.

**Exit check:** Every agreed criterion is passed or explicitly deferred with impact; no access-control failure is waved through.

**Prerequisites:** Build the pilot system

**Sources:** [Testing a FastAPI application](https://fastapi.tiangolo.com/tutorial/testing/) · [Demystifying evals for AI agents](https://www.anthropic.com/research/demystifying-evals-for-ai-agents) · [Top 10 for LLM applications](https://genai.owasp.org/llm-top-10/)

### Plan rollout & ownership

**6 hours · Develop new depth**

Show how a pilot becomes a maintained workflow.

**For Sohila:** Combine your Docker runbooks, CI habits, and handover practice into one deployment story.

Learn and practice:

- Define a staged rollout, monitoring checks, and a stop condition.
- Run a backup/restore or rollback drill in the lab.
- Assign operational ownership and document ongoing cost assumptions.

**Deliverable:** A pilot release pack with deployment, recovery, monitoring, and handover instructions.

**Exit check:** A reviewer can start the lab, run the workflow, identify a failure, and recover using the documented procedure.

**Prerequisites:** Validate with a user lens; Enablement & handover

**Sources:** [Docker Compose documentation](https://docs.docker.com/compose/) · [Observability primer](https://opentelemetry.io/docs/concepts/observability-primer/)

### Publish the case study

**6 hours · Develop new depth**

Tell the engineering story with evidence and honest limits.

**For Sohila:** Link your existing portfolio, PixelFed, and n8n repos to a complete customer-outcome narrative.

Learn and practice:

- Explain problem, discovery, architecture, tradeoffs, delivery, and results.
- Include screenshots, diagrams, a five-minute demo, and reproduction steps.
- Label fictional customers, synthetic data, simulations, and unmeasured projections.

**Deliverable:** A case study, architecture diagrams, demo video, and public sanitized repository.

**Exit check:** A hiring reviewer can see your own contribution, run the demo, and distinguish measured outcomes from learning targets.

**Prerequisites:** Plan rollout & ownership; Measure value & adoption

**Sources:** [Forward Deployed Engineer role](https://job-boards.greenhouse.io/anthropic/jobs/5391016008) · [Forward Deployed Software Engineer role](https://jobs.lever.co/palantir/7ea66860-ae93-4139-9388-b7284cb33f37)

### FDE interview & role fit

**6 hours · Develop new depth**

Practice ambiguous problems, code, and customer conversations.

**For Sohila:** Position yourself around data and AI integration delivery. Remote Solutions Engineer, Implementation Engineer, and AI Integration Engineer roles may also fit your constraint set.

Learn and practice:

- Practice Python/SQL coding, practical data structures, and API debugging.
- Run a 45-minute discovery-to-design case and explain tradeoffs aloud.
- Screen each job for country eligibility, remote policy, travel, seniority, and customer duties.

**Deliverable:** Three mock cases, a concise project narrative, and a role-fit checklist.

**Exit check:** You can scope an ambiguous customer problem, implement a small integration, explain failure recovery, and discuss a real tradeoff. This plan builds evidence; it does not guarantee role readiness or a job.

**Prerequisites:** Publish the case study

**Sources:** [Forward Deployed Engineer role](https://job-boards.greenhouse.io/anthropic/jobs/5391016008) · [Forward Deployed Software Engineer role](https://jobs.lever.co/palantir/7ea66860-ae93-4139-9388-b7284cb33f37)

## Scope and role fit

FDE roles combine customer interaction with implementation and deployment. The emphasis varies by employer. The [Anthropic role reference](https://job-boards.greenhouse.io/anthropic/jobs/5391016008) and [Palantir role reference](https://jobs.lever.co/palantir/7ea66860-ae93-4139-9388-b7284cb33f37) inform the delivery emphasis here; they are not a list of eligible remote jobs.

For a remote-first search from Egypt, also consider Solutions Engineer, Implementation Engineer, AI Integration Engineer, and Technical Consultant roles. Verify geography, travel, seniority, and hands-on coding expectations for each opening.

Defer deep model training, Kubernetes administration, multiple cloud platforms, and elaborate agent frameworks until the project actually needs them.

Sources reviewed: 2026-10-31.
