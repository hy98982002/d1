You are modifying the aeo-lint tool.

TASK:
Integrate a new lint rule that forbids translating Level entity names
(Beginner / Intermediate / Advanced) into Chinese when used as entity references,
and make CI fail on violation.

IMPLEMENTATION REQUIREMENTS:

1) Create a new rule file:
   tools/aeo-lint/rules/level-name-translation.js

2) The rule MUST:
   - Scan frontend content files (.vue, .md, .js, .ts, .tsx, .jsx).
   - Detect Chinese translations of Level names:
     初级, 入门, 进阶, 中级, 高级, 高阶
   - Trigger ERROR ONLY when these words are used in Level reference contexts,
     such as near: 阶段, 级别, 等级, Level.
   - Treat this as a blocking error (CI must fail).

3) Add the rule to tools/aeo-lint/index.js so it is executed with other rules.

4) The error message MUST clearly state:
   - Translated Level names are forbidden.
   - Level entity names MUST remain in English
     (Beginner / Intermediate / Advanced).

CONSTRAINTS:
- Do NOT flag generic descriptive usage (e.g. 能力进阶).
- Do NOT modify existing lint rules.
- Do NOT weaken severity (must be ERROR).
- Keep the implementation minimal and deterministic (no NLP, no LLM).

OUTPUT:
After implementation, output ONLY a concise summary listing:
- New file(s) added
- Existing file(s) modified
