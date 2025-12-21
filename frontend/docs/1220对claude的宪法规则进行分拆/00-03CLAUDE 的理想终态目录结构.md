# CLAUDE.md 的理想终态目录结构

太好了，这一步其实是**整个项目治理的“封顶动作”**。
我直接给你一份 **「CLAUDE.md 理想终态目录结构（白名单级）」**，并且解释**为什么这样分、每一节放什么、不放什么**。
你可以把它当成 **最终版宪法目录**，以后只做微调，不再推倒重来。

---

# ✅ CLAUDE.md 理想终态目录结构（Final Form）

> 定位一句话：
> **CLAUDE.md = 项目不可变规则的单一真源（Single Source of Truth）**

---

## 0️⃣ Preamble（序言｜只写一次）

```md
# CLAUDE.md

This document defines the immutable rules, semantic contracts, and
AI-execution constraints of this project.

It is a constitution, not a changelog, not a notebook.
```

**作用**

* 给 AI / 人类一个“心理锚点”
* 防止把它当 notes / prompt

**规则**

* ❌ 不写时间
* ❌ 不写背景故事

---

## 1️⃣ Scope & Authority（适用范围与权威性）

```md
## 1. Scope & Authority
```

内容包括：

* 本 CLAUDE.md 对哪些目录生效

  * frontend
  * backend（如有）
  * docs（只定义职责，不管内容）
* 谁必须遵守（Claude / Codex / Cursor / 人类）

**示例**

```md
This constitution applies to:
- frontend/
- backend/
- documentation structure and semantics

Any automated or human change MUST comply with this document.
```

---

## 2️⃣ Content & Semantic Constitution（内容与语义宪法）

> ⭐ **这是整份文件最核心的一章**

```md
## 2. Content & Semantic Constitution
```

### 2.1 页面类型与职责（你已经在做）

```md
### 2.1 Page Responsibility Definitions
```

* Course
* Topic (/t/)
* Program (/programs/)
* Path (/paths/)
* Levels (/levels/)
* FAQ / HowTo（只定义角色）

👉 **只定义“它是什么 / 它不是什么”**

---

### 2.2 实体关系强制规则（AEO 核心）

```md
### 2.2 Entity Relationship Rules (AEO)
```

这里放：

* Program ↔ Course：`hasPart / isPartOf`
* Topic ↔ Course：`mentions / about`
* 禁止关系（MUST NOT）

---

### 2.3 命名与枚举统一（Single Source of Truth）

```md
### 2.3 Naming & Enumeration Rules
```

例如：

* StageKey：`beginner | intermediate | advanced`
* 禁止 `basic`
* slug 命名原则

👉 **任何枚举只能在这里定义一次**

---

## 3️⃣ Routing & URL Canonical Rules（路由与规范）

```md
## 3. Routing & URL Canonical Rules
```

内容包括：

* URL 结构原则
* `/programs/` vs `/t/`
* slug 稳定性
* canonical / redirect 原则

**这里不放具体路由代码，只放“红线”**

---

## 4️⃣ Data & Schema Rules（Schema / JSON-LD / LRMI）

```md
## 4. Data & Schema Rules
```

内容：

* Schema.org / LRMI 使用边界
* 哪些字段必须出现
* 哪些字段禁止滥用
* “内容必须与 Schema 一致”的约束

👉 **这是 AEO 的技术宪法**

---

## 5️⃣ Coding Philosophy & Architectural Constraints

```md
## 5. Coding Philosophy & Architectural Constraints
```

> 注意：这是**升格后的“编码哲学”**

只保留 **长期成立的原则**：

* 状态优先级
* 显式 > 隐式
* 可追溯性
* 不允许的模式（anti-pattern）

❌ 不写“我当时觉得”

---

## 6️⃣ AI / Agent Execution Rules（AI 行为红线）

```md
## 6. AI & Agent Execution Rules
```

内容包括：

* Claude / Codex 能做什么
* 不能做什么
* 自动修改前必须满足的条件
* Review / Commit 规则

👉 **这是防止 AI 误操作的安全带**

---

## 7️⃣ Tooling & Plugin Governance（工具治理）

```md
## 7. Tooling & Plugin Governance
```

⚠️ 只放 **治理规则**，不放使用教程：

* MCP / CCPlugins 何时允许启用
* 哪些场景必须人工确认
* 禁止自动安装 / 自动执行的条件

---

## 8️⃣ Documentation System & Synchronization Rules

```md
## 8. Documentation System & Synchronization Rules
```

> ⭐ 你刚刚问 CHANGELOG 的那一节，就在这里

### 8.1 文档分工

* CLAUDE.md = 规则
* CHANGELOG.md = 发生了什么
* frontend/docs = 过程与决策

### 8.2 同步规则

* 规则变 → CLAUDE.md
* 事实变 → CHANGELOG.md
* 过程 → docs

---

## 9️⃣ Enforcement & Review Protocol（执行与审查）

```md
## 9. Enforcement & Review Protocol
```

内容：

* 如果修改违反本宪法怎么办
* 是否允许临时豁免
* Review checklist 的来源

---

## 🔚 Appendix（附录｜可扩展，不污染正文）

```md
## Appendix
```

放这里的内容：

* 示例（非规范性）
* 未来实体草案
* 说明性补充

👉 **不影响正文权威性**

---

# 🔑 总结一句“终态判断标准”

> 如果删掉 **CHANGELOG.md + docs/**，
> 只剩下 CLAUDE.md，
> **AI 是否还能正确、长期地维护这个项目？**

如果答案是 **能** ——
👉 这份 CLAUDE.md 就是终态。

---

## In short（中文极简版）

* CLAUDE.md = **规则宪法，只放“永远成立的东西”**
* 历史 → CHANGELOG.md
* 过程 → frontend/docs
* 理想终态 ≈ 9 大章节 + Appendix
* 你现在做的不是整理，而是**制度化工程记忆**


