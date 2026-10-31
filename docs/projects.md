# Portfolio builds

These are proposed learning projects. They extend existing work but do not claim real clients, production deployment, or measured business benefits.

## 01. PixelFed Operations Console

**Weeks 01–08 · Python / FastAPI / PostgreSQL / React / TypeScript**

A fictional community operations team needs to investigate creator activity and stale metrics without moving between raw tables and reports.

**Reuse:** Extend your existing PixelFed data contracts and gold-level analytics. All records remain synthetic; this is a learning build, not a real customer engagement.

Deliverables:

- A discovery brief and metric/freshness contract
- A read-only metrics API plus a small operational issue table
- An accessible console with filters, detail views, and explicit error states
- A tested permissions matrix and a short user-task demo

**Success evidence:** A reviewer can investigate one activity anomaly from the UI, trace its source, and explain data freshness. Unauthorized access tests pass.

[Existing project repository](https://github.com/Sohila-Khaled-Abbas/pixelfed-analytics-engineering)

## 02. Workflow Support Copilot

**Weeks 09–16 · n8n / Qdrant / Python / MCP / Docker / OpenTelemetry**

A fictional automation operator needs to find the right runbook, inspect a failed execution, and decide what action is safe.

**Reuse:** Use sanitized runbooks and a lab copy of your n8n stack. Credentials and production execution data do not enter the public demo.

Deliverables:

- A cited English/Arabic runbook assistant with permission-aware retrieval
- A versioned 30-case learning eval set and a keyword baseline
- Read-only execution tools plus a mock human-approved retry
- A deployment, telemetry, and recovery drill report

**Success evidence:** Suggested learning target: at least 80% rubric pass on the fixed learning set, zero access leaks, and no duplicate simulated action. Report actual latency/cost; real pilot targets require agreement.

[Existing project repository](https://github.com/Sohila-Khaled-Abbas/n8n-production-queue-setup)

## 03. Egypt SME Operations Pilot

**Weeks 17–24 · SQL / FastAPI / React / n8n / Power BI**

A fictional Egyptian cosmetics distributor reconciles stock/order exceptions manually and needs a visible resolution workflow.

**Reuse:** Combine your cosmetics-domain interest, BI scorecards, and the API/automation components built earlier. Use a separate synthetic commerce schema; PixelFed is not a sales dataset.

Deliverables:

- A stakeholder map, pilot scope, and explicit acceptance criteria
- Synthetic orders/inventory fixtures with documented EGP and timing assumptions
- An exception-to-resolution application with audit trail and replay-safe actions
- A measured lab scorecard, case study, demo, operator runbook, and handover

**Success evidence:** A reviewer completes the target workflow and a recovery drill using only the documentation. Show baseline versus observed lab results; label savings projections and fictional customer details.

Create a separate capstone repository when implementation starts.

[Architecture proposals](architecture.md) · [Case study template](templates/case-study.md)
