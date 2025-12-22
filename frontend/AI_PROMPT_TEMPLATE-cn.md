

This checklist is derived from frontend/AI_CHECKLIST.md.
If any discrepancy exists, the checklist file is the source of truth.


---

```text
You are an AI agent modifying the frontend of this project.

Before writing or changing ANY code,
you MUST complete the mandatory checklist below.

If any item cannot be answered with a clear YES,
you MUST STOP and ask for clarification.

==================================================
FRONTEND AI MANDATORY CHECKLIST
==================================================

1. Rule Awareness
- Have you read and understood the root CLAUDE.md? (YES / NO)
- Have you read and understood frontend/CLAUDE.md? (YES / NO)
- Does this task avoid introducing new entities, stages, or semantics? (YES / NO)

2. Semantic Safety
- Does this change preserve Course / Topic / Program / Path responsibilities? (YES / NO)
- Does Program remain an ordered learning path only? (YES / NO)
- Does Topic remain an unordered aggregation only? (YES / NO)

3. StageKey Compliance
- Are you ONLY using: beginner | intermediate | advanced? (YES / NO)
- Are you avoiding basic / intro / pro or aliases? (YES / NO)
- Is StageKey used only for display/filtering, not sequencing? (YES / NO)

4. Routing Integrity
- Are route semantics unchanged? (YES / NO)
- Is slug meaning preserved? (YES / NO)
- Do invalid slugs fail-fast to 404? (YES / NO)

5. JSON-LD & AEO Safety
- Is schema strictly matched to page type? (YES / NO)
- Are Program ↔ Course relationships expressed ONLY via hasPart / isPartOf? (YES / NO)
- Is all JSON-LD content visible in UI? (YES / NO)

6. State Management Safety
- Is business state sourced from Pinia only? (YES / NO)
- Are URL params NOT treated as business truth? (YES / NO)
- Is there a single source of truth for each concept? (YES / NO)

7. Component Boundary Safety
- Are Page components responsible only for data & semantics? (YES / NO)
- Are UI components free of business logic? (YES / NO)
- Is Program ordering logic not leaking into Topic/Course? (YES / NO)

8. Documentation Compliance
- Does this change NOT require modifying CLAUDE.md? (YES / NO)
- If rules need changes, will you STOP and ask first? (YES / NO)
- Have you evaluated whether CHANGELOG.md needs an entry? (YES / NO)

9. Final Confirmation
- Is this change fully reviewable? (YES / NO)
- Is this change safely reversible? (YES / NO)
- Does this avoid irreversible long-term impact? (YES / NO)

==================================================
AI DECLARATION (MANDATORY)
==================================================

Before proceeding, respond ONLY with:

1) A completed checklist with YES/NO for each item  
2) A short risk summary (if any item is NO)  
3) Explicit confirmation that you will STOP if any rule is violated

DO NOT write any code yet.

==================================================
TASK DESCRIPTION
==================================================

【在这里写你的具体前端修改需求】
```

---

