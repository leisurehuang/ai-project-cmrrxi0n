---
name: implement
description: Guided workflow for projects from the ai-native-dev-platform — start by listing the user's projects (list_projects), pick one, read its overview (get_project_overview: requirement feature list + solution tech stack/modules/data models/API endpoints), then implement module-by-module, verify with real sandbox runs, and report results back to drive the project's state machine. Use when the user wants to work on / implement / develop / take over a project from ai-native-dev-platform, or when MCP tools list_projects / get_project_overview / get_solution / run_sandbox / write_test_report are available. Triggers on "实施项目" / "开发项目" / "接手项目" / "看看我的项目" / "继续开发" / mentions the platform or a scaffolded repo from it.
---

# Implement a Platform Project (Guided)

You are helping the user work on a project from the **ai-native-dev-platform**. The platform produced the requirement + solution, scaffolded a starter repo on GitHub, and the project is waiting at some stage of its state machine. You drive it forward through the platform's MCP tools.

**You do NOT need the user to paste a projectId** — start by listing their projects.

## Prerequisites
- The platform's MCP server is connected (you have `list_projects`, `get_project_overview`, `get_project_status`, `get_repo_url`, `get_requirement`, `get_solution`, `run_sandbox`, `write_test_report`, `signal_deploy_verified`).
- If `list_projects` is missing, the MCP server is not connected — tell the user to add it via the platform's "交接给 IDE" panel (it prints the exact `claude mcp add` command with the backend URL filled in).

## Guided entry (always start here)

### Step 1 — Pick a project
Call `list_projects` (optionally filter by `status`). Show the user a numbered list:
```
1. <name>  [IMPLEMENTATION]  updated 2h ago
2. <name>  [REQUIREMENT]     updated 1d ago
```
Ask which one they want to work on. If they already named one, match it.

### Step 2 — Read the overview
Call `get_project_overview(projectId)` for the chosen project. Summarize for the user in plain language:
- **current stage + stageHint** (what to do next at this stage)
- **requirement.featureList** — what features are in scope
- **solution.techStack / modules / dataModels / apiEndpoints** — the technical blueprint
- **implementation** — scaffold mode + file count + repo url (if generated)

Do not dump raw JSON. Render it as a readable brief the user can act on.

### Step 3 — Branch by stage
Follow the section below matching `currentStage`. If the user's intent conflicts with the stage (e.g. they want to deploy but the project is still at REQUIREMENT), explain the gap and suggest the right next step on the platform website.

---

## IMPLEMENTATION stage (the main path)

This is where you take over the scaffolded repo and implement the real business code.

1. `get_repo_url(projectId)` → `git clone` to a local checkout; work on real files.
2. Re-read details as needed: `get_requirement(projectId)` (full feature list + acceptance criteria) and `get_solution(projectId)` (full tech stack / architecture / modules / dataModel / apiDesign / risks). Cross-check so no feature is missed.
3. Implement **module-by-module** using real file reads/edits — never blind-generate whole files. Follow the solution's `techStack` exactly; match the scaffold's existing style.

### Verify (the core loop — never skip)
- After each meaningful chunk, call `run_sandbox(projectId, command)` to build/test for real.
- Read the real `exitCode` / `stdout` / `stderr`. On failure, fix against the **real stack trace**, then re-run.
- Pass `fresh: true` after pushing new code, so the sandbox re-clones the latest from GitHub.
- **Never assume code works without a sandbox exit code as evidence.**

### Report tests
- When tests run, call `write_test_report(projectId, summary, testResults)` with **real** numbers.
- `failed > 0` → project stays `IMPLEMENTATION` (keep fixing). All pass → platform advances to `DEPLOYMENT`. The website's acceptance page updates in real time.

## TESTING stage
- `run_sandbox` to run the test suite; `write_test_report` to report. Same loop as above.

## DEPLOYMENT stage
- The platform generates the deploy config on the website first (DeployAgent). Verify it actually boots via `run_sandbox` (build + run).
- Pass → `signal_deploy_verified(projectId)` → project `COMPLETED`.

## REQUIREMENT / SOLUTION stages
- These stages are driven on the platform website (chat with the requirement/solution Agent). Tell the user to complete them there first, then come back here once the project reaches `IMPLEMENTATION`.

---

## Red lines
- ❌ Never set project status directly — only via `write_test_report` / `signal_deploy_verified`.
- ❌ Never paste the whole codebase back into the platform — code lives in Git; the platform stores artifacts only.
- ❌ Never claim "it works" without a real sandbox `exitCode` as proof.
- ✅ Always start from `list_projects` — don't make the user hunt for a projectId.
