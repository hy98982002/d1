# SEMANTIC PROGRAM–PATH BOUNDARY GUARD

## Purpose
Prevent semantic conflation between Program (teaching structure)
and Path (recommendation planning).

## Invariants (MUST HOLD)

- Program represents an ordered teaching structure.
- Path represents a recommendation or planning layer.
- Program MUST NOT express recommendation logic.
- Path MUST NOT express teaching order via structural relations.

## Forbidden Patterns (BLOCK)

- Referring to Program pages as recommendation paths.
- Introducing "recommended order", "learning plan", or cross-skill sequencing
  inside /programs/{slug}.
- Using hasPart / isPartOf in Path JSON-LD to model teaching order.

## Allowed Patterns (ALLOW)

- Program explaining why a specific course order exists.
- Path describing suggested progression in page content (non-structural).

## Enforcement
If a change introduces recommendation semantics into Program
or teaching structure semantics into Path,
execution MUST STOP and require human review.