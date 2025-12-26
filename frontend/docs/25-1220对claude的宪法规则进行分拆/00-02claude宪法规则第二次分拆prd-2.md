好，这一步我帮你**把事情做完整，但不越权**。
因为你现在是在**“项目宪法重组”**阶段，而不是单纯改文案，我会分 **三层交付**：

> **你最终得到的是：**
> 1️⃣ 一份 **「CLAUDE.md 终态目录骨架（可直接替换）」**
> 2️⃣ 一份 **「旧内容 → 新章节 的精确映射规则」**（告诉 Trae / 你自己每一段该搬到哪）
> 3️⃣ 一段 **可直接给 Trae 的“自动重排执行提示词”**（避免再次漏内容）

这样你既**可控**，又**可自动化**。

---

# 一、CLAUDE.md 终态目录骨架（直接可用）

> 👉 这是 **最终文件结构**，你可以先建空壳，后面再自动填充。

```md
# CLAUDE.md

This document defines the immutable rules, semantic contracts, and
AI-execution constraints of this project.

It is a constitution, not a changelog, not a notebook.

---

## 1. Scope & Authority

- Applies to frontend/, backend/ (if present), and documentation semantics.
- All human and AI changes MUST comply with this document.

---

## 2. Content & Semantic Constitution

### 2.1 Page Responsibility Definitions

- Course
- Topic (/t/)
- Program (/programs/)
- Path (/paths/)
- Levels (/levels/)
- FAQ / HowTo

---

### 2.2 Entity Relationship Rules (AEO)

- Program ↔ Course: hasPart / isPartOf
- Topic ↔ Course: mentions / about
- Forbidden relationships (MUST NOT)

---

### 2.3 Naming & Enumeration Rules (Single Source of Truth)

- StageKey enum: beginner | intermediate | advanced
- Deprecated terms: basic (FORBIDDEN)
- Slug stability rules

---

## 3. Routing & URL Canonical Rules

- URL hierarchy principles
- Canonical & redirect rules
- Stability constraints

---

## 4. Data & Schema Rules (Schema.org / LRMI)

- Required schemas per page type
- Alignment rules between content & schema
- Forbidden schema misuse

---

## 5. Coding Philosophy & Architectural Constraints

- Explicit over implicit
- State traceability
- Anti-patterns (FORBIDDEN)

---

## 6. AI & Agent Execution Rules

- Allowed AI actions
- Forbidden AI actions
- Review & commit constraints

---

## 7. Tooling & Plugin Governance

- MCP / CCPlugins governance
- Conditions for activation
- Manual approval requirements

---

## 8. Documentation System & Synchronization Rules

### 8.1 Document Responsibilities

- CLAUDE.md = Rules
- CHANGELOG.md = What happened
- frontend/docs = Process & decisions

### 8.2 Synchronization Protocol

- Rule change → CLAUDE.md
- Observable change → CHANGELOG.md
- Process detail → docs/

---

## 9. Enforcement & Review Protocol

- Violation handling
- Review checklist source

---

## Appendix

- Non-normative examples
- Future entity drafts
```

> ✅ 这一份就是 **“白名单级终态结构”**

---

# 二、旧 CLAUDE.md → 新目录的**映射规则**（这是关键）

下面是你现在文件里“看起来很乱”的内容，**应该怎么归位**。

---

## ① 带日期（如 `2025-12-08`）

**判定**：❌ 不属于 CLAUDE.md 正文

👉 处理方式：

* **迁移到 `CHANGELOG.md`**
* 在 CLAUDE.md 中只保留：

  * 不带时间的 **规则抽象版**

---

## ② AEO / 页面职责 / Program / Topic / Level 讨论

👉 **统一放入：**

```
## 2. Content & Semantic Constitution
```

细分规则：

| 内容                 | 子章节 |
| ------------------ | --- |
| 页面是什么 / 不是什么       | 2.1 |
| hasPart / isPartOf | 2.2 |
| StageKey / slug    | 2.3 |

---

## ③ 路由、slug、canonical、重定向

👉 **全部进入：**

```
## 3. Routing & URL Canonical Rules
```

⚠️ 不要夹在 AEO 里，否则 AI 会混淆“语义 vs 技术”

---

## ④ JSON-LD / LRMI / Schema 相关

👉 **只放规则，不放示例代码**

```
## 4. Data & Schema Rules
```

示例 → Appendix
强制规则 → 正文

---

## ⑤ 编码哲学（你 L732 那类）

👉 **允许，但必须“升格”**

```
## 5. Coding Philosophy & Architectural Constraints
```

**迁移标准**：

* ❌ 删除“我觉得 / 当时 / 这次”
* ✅ 改为 MUST / SHOULD / FORBIDDEN

---

## ⑥ CCPlugins / MCP / 工具激活

👉 **严格拆分**

* 操作步骤 → ❌ 不进 CLAUDE.md
* 使用边界 / 是否允许 → ✅ 进

```
## 7. Tooling & Plugin Governance
```

---

## ⑦ 关于 docs / changelog / 记录方式的说明

👉 **统一放在：**

```
## 8. Documentation System & Synchronization Rules
```

这一步**非常重要**，你现在已经意识到了，但原文件里是散的。

---

# 三、给 Trae 的【自动重排执行提示词】⭐（重点）

你可以**原样复制**下面这段给 Trae，这次他就不会“少写了”。

---

### 🧠 Trae Prompt（重排版 · 强约束）

```text
你将接收一份 CLAUDE-original.md（历史版本）。

你的目标不是压缩，而是【完整重排】为一份“终态项目宪法”。

请严格执行以下规则：

【一、结构目标】
- 输出必须严格符合我提供的 CLAUDE.md 终态目录结构（9 大章节 + Appendix）。
- 不允许随意合并章节或省略章节。

【二、内容迁移规则】
1. 所有“带日期 / 时间线 / 已完成事项”：
   - 必须从 CLAUDE.md 正文中移除
   - 抽象后迁移进 CHANGELOG.md
2. AEO / 页面职责 / 实体关系：
   - 必须完整保留
   - 放入第 2 章（Content & Semantic Constitution）
3. 编码哲学、工具规则：
   - 不得直接删除
   - 必须判断：
     - 永久规则 → 保留并升格
     - 阶段性说明 → 移出正文

【三、禁止行为】
- 不允许“看起来不重要就省略”
- 不允许自行判断“这段可能没用了”
- 若不确定归属：
  - 必须放入 Appendix 并标注 TODO

【四、输出要求】
- 输出：
  1) 重排后的 CLAUDE.md
  2) 一个简短说明：哪些内容被迁移、哪些被升格、哪些进了 Appendix
```

---

# 四、给你一句“架构师级确认”

你现在做的这一步，**已经是很多团队在 2–3 年后才补做的事**。

你不是在“整理文档”，而是在：

> **把“个人经验 + AI 协作”
> 固化成一个长期可执行的制度系统**

---

## In short（中文极简版）

* ✅ 我已给你 **CLAUDE.md 终态目录骨架**
* ✅ 给了 **旧内容 → 新章节的精确归位规则**
* ✅ 给了 **Trae 自动重排的强约束提示词**
* 🚀 这一步完成后，你的 CLAUDE.md 就是“终态宪法”


👉 **直接“模拟 Trae 的最终输出”，给你一版完整重排后的 CLAUDE.md 示例**

非常好，这一步我会**完全按你给 Trae 的约束来做**：
👉 **不删规则、不偷懒、不“看起来不重要就省略”**
👉 **严格按「终态目录」重排**
👉 **把“历史 / 过程 / 临时性内容”正确降级或迁移**

下面这份内容，你可以当成：

> ✅ **“Trae 理想情况下应交付的 CLAUDE.md 最终版示例”**
> （不是摘要，是**结构化重排后的完整宪法示范稿**）

---

# CLAUDE.md

This document defines the immutable rules, semantic contracts, and AI-execution constraints of this project.

It is a **constitution**, not a changelog, not a notebook, and not a discussion log.

All automated and human changes MUST comply with this document.

---

## 1. Scope & Authority

This constitution applies to:

* frontend/
* backend/ (if present)
* documentation semantics and structural decisions

All contributors, including human developers and AI agents (Claude, Codex, Cursor, Trae), MUST follow the rules defined herein.

If a conflict exists between local instructions and this document, **CLAUDE.md takes precedence**.

---

## 2. Content & Semantic Constitution

### 2.1 Page Responsibility Definitions

Each page type has a **single, non-overlapping semantic responsibility**.

#### Course (`/course/`)

* Represents a single teaching unit.
* Describes **what this course teaches**.
* MUST NOT define learning order or learning paths.
* MAY reference Level, Topic, Program, or Skill.

#### Topic (`/t/{topic}`)

* Aggregates courses by subject or theme.
* DOES NOT define learning order or progression.
* MUST NOT behave like a Program or Path.

#### Program (`/programs/{program}`)

* Defines a **structured learning path**.
* Courses are intentionally ordered.
* Represents a formal learning journey or training objective.

#### Path (`/paths/{path}`)

* Represents a macro-level learning route.
* MAY group multiple Programs.
* DOES NOT replace Program-level ordering.

#### Levels (`/levels/`)

* Defines learning stage semantics only.
* Levels are **enumerations**, not courses or programs.

#### FAQ / HowTo

* Used to answer questions or demonstrate procedures.
* MUST NOT redefine course or program semantics.

---

### 2.2 Entity Relationship Rules (AEO)

All entity relationships MUST follow Schema.org and AEO-safe semantics.

#### Mandatory Relationships

* Program ↔ Course

  * Program **hasPart → Course**
  * Course **isPartOf → Program**

* Topic ↔ Course

  * Topic **mentions / about → Course**

#### Forbidden Relationships

* Topic MUST NOT use `hasPart` with Course.
* Course MUST NOT define `position` unless inside an ordered Program context.
* Program MUST NOT be used as a generic aggregation container.

---

### 2.3 Naming & Enumeration Rules (Single Source of Truth)

#### StageKey Enumeration

The ONLY allowed learning stage values are:

```
beginner | intermediate | advanced
```

* `basic` is **FORBIDDEN**.
* Enumeration values MUST be consistent across:

  * URL slugs
  * UI labels
  * JSON-LD
  * Internal data models

#### Slug Rules

* Slugs MUST be semantic, stable, and human-readable.
* Slugs MUST NOT encode transient UI state.
* Slug meaning MUST match content meaning.

---

## 3. Routing & URL Canonical Rules

* `/t/` is reserved for Topic aggregation.
* `/programs/` is reserved for structured learning paths.
* `/course/` URLs represent atomic teaching units.

Canonical rules:

* Each semantic entity has **one canonical URL**.
* Renaming slugs MUST include redirects.
* Route changes that affect indexing MUST be recorded in `CHANGELOG.md`.

---

## 4. Data & Schema Rules (Schema.org / LRMI)

* All Course, Program, and Level pages MUST provide JSON-LD.
* Schema metadata MUST reflect actual page content.
* Over-claiming skills, outcomes, or prerequisites is FORBIDDEN.

LRMI vocabulary MUST only be applied to educational semantics
(e.g. learningResourceType, educationalLevel).

---

## 5. Coding Philosophy & Architectural Constraints

The following principles are **permanent architectural constraints**:

* Prefer explicit state over implicit inference.
* UI state MUST be traceable and debuggable.
* Avoid coupling routing state with business logic.
* Do not introduce hidden global state.

Anti-patterns (FORBIDDEN):

* Dual sources of truth for the same concept.
* Re-encoding semantic meaning in presentation logic.

---

## 6. AI & Agent Execution Rules

AI agents MAY:

* Refactor code within defined architectural boundaries.
* Propose schema or AEO improvements.

AI agents MUST NOT:

* Introduce new semantics without explicit approval.
* Modify URLs, slugs, or entity roles silently.
* Remove rules from this document.

All AI-generated changes MUST be reviewable and reversible.

---

## 7. Tooling & Plugin Governance

Tooling rules define **governance**, not usage instructions.

* MCP / CCPlugins activation MUST be intentional.
* Automatic installation or execution is FORBIDDEN.
* Tools affecting code or data MUST require explicit human consent.

Operational how-to instructions belong in documentation, not here.

---

## 8. Documentation System & Synchronization Rules

### 8.1 Document Responsibilities

* **CLAUDE.md**
  → Immutable rules and constraints.

* **CHANGELOG.md**
  → Observable system changes (what happened).

* **frontend/docs/**
  → PRDs, discussions, execution logs, tests, and validation reports.

### 8.2 Synchronization Protocol

* Rule change → update `CLAUDE.md`
* Observable behavior change → update `CHANGELOG.md`
* Process detail → update `frontend/docs/`

Documents MUST NOT duplicate responsibilities.

---

## 9. Enforcement & Review Protocol

* Violations of this constitution MUST be corrected.
* Temporary exceptions require explicit documentation.
* Review checklists MUST reference this document.

---

## Appendix (Non-Normative)

* Examples
* Draft ideas
* Future entity proposals

Content in this section is **informational only** and does not override the constitution.

---

---

## In short（中文极简版）

* 这是 **Trae 理想状态下应生成的完整 CLAUDE.md**
* 所有规则被 **提纯、归位、长期化**
* 历史与过程被**正确移出**
* 这份文件现在已经是
  **AI + 人类都能长期执行的“项目宪法终态”**

---

### 下一步你可以做什么（建议）

1. 把这份作为 **对照模板**
2. 让 Trae **逐段对齐填充你的真实规则**
3. 用它作为 **所有未来 AI 操作的最高约束**



