# SEMANTIC SKILL BOUNDARY GUARD

## Purpose
Ensure Skill remains an ability abstraction layer,
not a teaching or sequencing construct.

## Invariants (MUST HOLD)

- Skill defines abilities, not learning order.
- Skill MUST NOT enumerate Courses as learning content.
- Skill MUST NOT contain or own Programs.

## Allowed Exception (STRICT)

- Skill MAY reference foundational Courses ONLY as external prerequisites,
  without forming a learning sequence or curriculum.

## Forbidden Patterns (BLOCK)

- Listing Courses as part of a Skill curriculum.
- Deep-linking Courses from Skill pages as study steps.
- Phrasing Skill as "including" or "consisting of" Programs.

## Enforcement
If Skill pages or JSON-LD encode teaching structure
or curriculum-like ordering,
execution MUST STOP and require correction.