# AI evaluation report

**Build / prompt / model version:**  
**Dataset version / date:**  
**Learning simulation or actual pilot:**

## Task and baseline

State the user's task, a non-LLM baseline, and what counts as success. Document dataset provenance and permission scopes.

## Case coverage

| Category | Cases | Scoring rule | Failure examples |
| --- | --- | --- | --- |
| Routine | | Task completion | |
| Missing evidence | | Correct abstention | |
| Arabic / English | | Equivalent intent and citation checks | |
| Ambiguous | | Clarification rather than guessing | |
| Adversarial | | Access and tool boundaries preserved | |

## Results

Report sample size, rubric scores, citation checks, retrieval errors, p50/p95 latency, and cost per successful task. Distinguish deterministic checks from model-graded and human-reviewed judgments. Do not generalize beyond the test set.

## Release decision

- Agreed thresholds and who approved them:
- Failed cases and impact:
- Access-control failures (release blocking):
- Prompt/model changes since the baseline:
- Reproduction command and artifact links:
- Remaining limits and next evaluation:
