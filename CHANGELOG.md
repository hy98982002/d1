# CHANGELOG

All notable changes to this project are documented in this file.

This file records WHAT changed, not WHY or HOW.

---

## [2025-12-08]

### Added
- Introduced `/levels/` entity defining Beginner / Intermediate / Advanced.
- Added Topic aggregation pages under `/t/`.

### Changed
- Unified learning stage naming from `basic` to `beginner`.
- Clarified semantic separation between Topic aggregation and Program learning paths.
- Standardized Program ↔ Course relationships using hasPart / isPartOf.

---

## [2025-12-01]

### Changed
- Refactored homepage course grouping logic to align with StageKey system.
- Improved route stability for course detail pages.

---

## [2025-11-20]

### Added
- Initial Program pages under `/programs/` with ordered course sequences.

---

## [2025-11-05]

### Fixed
- Corrected semantic misuse of Program as unordered container.

