
# 06 – Task Planning & Deliverable Guard

## Guard Level
**Constitutional (Derived Guard)**  
This document is a formal interpretation and enforcement mapping of the  
**Task Planning & Deliverable Guard** defined in `/CLAUDE.md`.

This file is **explanatory, not authoritative**.  
The authoritative source of truth remains `/CLAUDE.md`.

---

## Purpose

This Guard defines a **mandatory execution discipline** for large, multi-step,
or multi-round tasks.

Its goal is to prevent:
- task drift
- hidden state loss
- deliverable pollution
- implicit inheritance of previous task outcomes

This Guard enforces a strict separation between:
- **planning**
- **execution memory**
- **final outcomes**

---

## Core Principles

### 1. Tasks Are Atomic Units

Each task is treated as an **independent execution unit** with:
- its own planning state
- its own execution memory
- its own final deliverable

No task may implicitly depend on, merge, or inherit another task’s deliverable.

---

### 2. Planning Is Mandatory for Large Tasks

Any task that involves:
- multiple steps
- multiple rounds
- broad scope changes
- cross-file or cross-module edits

**MUST** explicitly use a planning-based execution model
(e.g. `planning-with-files`).

Unplanned large changes are considered structurally unsafe.

---

### 3. Deliverables Are Final Outcomes Only

A deliverable represents:
- stable conclusions
- finalized rules
- usable outputs
- externally consumable results

A deliverable **MUST NOT** contain:
- execution logs
- error traces
- failed attempts
- investigation notes
- speculative reasoning

Deliverables are not execution diaries.

---

### 4. Historical Isolation Is Mandatory

Task deliverables are **historical records**, not cumulative documents.

Therefore:
- Deliverables MUST NOT embed or reference other task deliverables
- Deliverables MUST remain immutable once finalized
- Historical tasks must never be rewritten to fit newer decisions

---

### 5. Project State Is Centralized

While deliverables are task-scoped,  
**project-wide truth must be centralized**.

A single file acts as the authoritative project snapshot:

```

docs/ai/project_state/CURRENT_STATE.md

```

Only currently valid rules, constraints, and structures may exist there.

Deliverables inform the project state,  
but do not replace it.

---

## Required Task Structure

Each task MUST reside in its own directory:

```

docs/ai/tasks/<YYYY-MM-DD>-<task-name>/

```

Containing exactly:

- `task_plan.md`  
  → controls execution order and task state

- `notes.md`  
  → stores execution details and intermediate reasoning

- `deliverable.md`  
  → records the final usable outcome of the task

---

## Enforcement Model

### Human / AI Enforcement
- Enforced through `/CLAUDE.md`
- Applied at task start and during execution
- Prevents incorrect behavior before it happens

### Machine Enforcement (AEOLint)
This Guard is enforced programmatically via AEOLint rules, including:

- task directory structure validation
- mandatory planning file presence
- deliverable isolation checks
- deliverable content quality checks
- project state synchronization warnings

AEOLint enforces **results**, not intent.

---

## Non-Goals

This Guard does **NOT**:
- prescribe task content
- define domain-specific rules
- replace semantic or AEO guards
- manage UI or application logic

It only governs **how work is executed and finalized**.

---

## Relationship to Other Guards

This Guard operates **orthogonally** to:

- Semantic Program / Course Guards
- Skill Boundary Guards
- Store Decoupling Guards

It constrains **process integrity**, not domain semantics.

---

## Summary (Normative Interpretation)

- Tasks must be planned
- Execution memory must be isolated
- Deliverables must be clean and atomic
- Project truth must be centralized
- History must remain immutable

Violations of this Guard indicate **structural execution failure**,  
not merely stylistic issues.

---

_End of Guard_
```



