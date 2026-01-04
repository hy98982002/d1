很好，这一步**是把“文字宪法”升级为“可执行防火墙”的关键跃迁**。
我直接给你**最终可落地方案**：**3 条补丁 → 3 条 Guard 规则**，并且**无缝接入你现有的 AEO / Semantic Guard 体系**，不引入新概念、不破坏现有顺序。

---

# 一、总体设计结论（先给结论）

> ✅ 这 3 条补丁**不再写成文档规则**
> ✅ 而是压缩为 **3 条 Guard（防错断言）**
> ✅ 接入位置：`docs/ai/guards/`
> ✅ 类型：**Semantic Boundary Guards（语义边界守卫）**

它们的目标只有一个：

> **在 AI / 自动化修改时，直接阻断 Skill / Program / Path 的语义越权行为**

---

# 二、Guard 在你体系中的正确定位（对齐你现有架构）

你现在已有的 Guard 顺序是：

```text
01-GLOBAL-LEVEL-GUARD
02-SEMANTIC-PROGRAM-COURSE-GUARD
```

### 正确的新增方式是：

```text
03-SEMANTIC-PROGRAM-PATH-GUARD
04-SEMANTIC-SKILL-BOUNDARY-GUARD
05-SEMANTIC-STORE-DECOUPLING-GUARD
```

⚠️ **不修改已有 Guard，不插队，只追加**

---

# 三、三条 Guard 的“压缩版规范定义”

下面是**可以直接落地为 `.md` Guard 文件的版本**
（风格、语气、结构都已对齐你现有 Guard）

---

## 🛡️ Guard 03：Program / Path 语义越权防护

**文件名：**

```
docs/ai/guards/03-SEMANTIC-PROGRAM-PATH-GUARD.md
```

**Guard 定义：**

```md
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
- Introducing “recommended order”, “learning plan”, or cross-skill sequencing
  inside /programs/{slug}.
- Using hasPart / isPartOf in Path JSON-LD to model teaching order.

## Allowed Patterns (ALLOW)

- Program explaining why a specific course order exists.
- Path describing suggested progression in page content (non-structural).

## Enforcement
If a change introduces recommendation semantics into Program
or teaching structure semantics into Path,
execution MUST STOP and require human review.
```

---

## 🛡️ Guard 04：Skill 语义边界防护（Course / Program 越权）

**文件名：**

```
docs/ai/guards/04-SEMANTIC-SKILL-BOUNDARY-GUARD.md
```

**Guard 定义：**

```md
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
- Phrasing Skill as “including” or “consisting of” Programs.

## Enforcement
If Skill pages or JSON-LD encode teaching structure
or curriculum-like ordering,
execution MUST STOP and require correction.
```

---

## 🛡️ Guard 05：Store 语义耦合防护（实现 ≠ 语义）

**文件名：**

```
docs/ai/guards/05-SEMANTIC-STORE-DECOUPLING-GUARD.md
```

**Guard 定义：**

```md
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
```

---

# 四、如何接入你现有的 Guard 执行链（关键）

在你 **Guard 加载顺序说明** 中，更新为：

```text
Execution Guards (Mandatory, Ordered):

1) Global semantic integrity
   → 01-GLOBAL-LEVEL-GUARD.md

2) Program–Course structural integrity
   → 02-SEMANTIC-PROGRAM-COURSE-GUARD.md

3) Program–Path semantic boundary
   → 03-SEMANTIC-PROGRAM-PATH-GUARD.md

4) Skill abstraction boundary
   → 04-SEMANTIC-SKILL-BOUNDARY-GUARD.md

5) Store–semantic decoupling
   → 05-SEMANTIC-STORE-DECOUPLING-GUARD.md
```

👉 **不需要改 Guard Loader 的逻辑，只是新增 3 个文件**

---

# 五、为什么这一步是“终局级正确”

这 3 条 Guard 的价值在于：

* 🧱 **把“容易被误读的地方”变成“不可执行的错误”**
* 🤖 **AI 不能再用“合理推断”越权**
* 🧠 **人类新成员也不会靠直觉破坏体系**
* 📐 **宪法保持抽象，Guard 负责落地执行**

这是一个**成熟系统才会做的事情**。

---

## In short（中文极简版）

* ✅ 已将 3 条补丁**压缩为 3 条 Guard**
* ✅ 不改宪法、不改前端规则
* 🛡️ Guard 分别防：

  * Program ≠ Path
  * Skill ≠ Curriculum
  * Store ≠ 语义主权
* 🔒 一旦越权 → **直接 Stop 执行**


