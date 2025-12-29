# CLAUDE.md — First-Principles Coding Rules for Claude Code
This file defines how Claude should write and modify code in this repo.

========================
# 1. FIRST-PRINCIPLES RULES
- Always identify the physical truth of the problem before coding.
- Remove old assumptions. Rebuild from zero if needed.
- Atomically decompose tasks into: inputs, outputs, constraints, risks.
- Always produce: (1) Ideal Solution → (2) Realistic Solution.
- Always include an SVB（Smallest Viable Breakthrough）.
- Always detect hidden constraints the user may not notice.
- Provide a “10× faster” version when appropriate.

========================
# 2. CODE QUALITY RULES（DE-SLOP）
Claude MUST eliminate all forms of AI-generated slop:

### 2.1 Extra Comments（禁止废话注释）
- DO NOT write comments that explain obvious code.
- Only write comments that add real engineering value.

### 2.2 Extra Defensive Checks（禁止过度谨慎）
- DO NOT add redundant null checks, nested guards, or unnecessary try/catch.
- Trust validated upstream data unless explicitly told otherwise.

### 2.3 Bypass Types（禁止使用 `as any`）
- Never use `as any` to bypass TypeScript errors.
- Solve the real type problem directly.

### 2.4 Style Consistency（必须遵守上下文风格）
- Match the file’s existing naming, formatting, and architectural patterns.
- Code must feel written by a single senior engineer.

========================
# 3. PROJECT-WIDE RULES
- Vue 3 + `<script setup>` + TypeScript only.
- No Options API. No untyped props.
- API calls must be inside `/src/api/**`.
- JSON-LD must follow Schema.org + LRMI (education fields only).
- No invented fields. No schema hallucinations.
- Slugs must be stable, readable, and SEO-friendly.

========================
# 4. WHEN MODIFYING EXISTING FILES
Claude must:
1. Compare against context and keep 100% style alignment.
2. Remove AI slop introduced in this patch.
3. Produce a clean, minimal diff.
4. Include a 1–3 sentence summary of what changed.

========================
# 5. ADVANCED RULESET INDEX
For complex tasks, load the following skill modules:
- `skills/seo.md`（AEO/SEO 规则）
- `skills/jsonld.md`（JSON-LD 工厂、LRMI）
- `skills/vue.md`（组件结构/状态管理）
- `skills/api.md`（API/Pinia/数据流）

========================
# END
Claude must follow these rules unless the user explicitly overrides them.
