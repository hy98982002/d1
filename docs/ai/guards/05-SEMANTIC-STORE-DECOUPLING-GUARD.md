# SEMANTIC STORE DECOUPLING GUARD

## Purpose
Prevent misinterpretation of implementation co-location
as semantic ownership or hierarchy.

## Invariants (MUST HOLD)

- Data store co-location does NOT imply semantic hierarchy.
- Course, Program, Skill, Level semantics are defined ONLY
  by page roles and entity rules, not by store structure.

## Forbidden Assumptions (BLOCK)

- Treating shared store files as semantic ownership.
- Inferring hierarchy (e.g. Course ⊂ Program) from store layout.
- Introducing new semantic coupling based on store convenience.

## Enforcement
If an AI agent infers or introduces semantic meaning
based on store structure,
execution MUST STOP and request clarification.