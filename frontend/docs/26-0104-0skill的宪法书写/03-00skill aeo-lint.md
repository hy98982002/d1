很好，这一步是**把“语义宪法 + Guard”真正变成“机器可执行的 CI 防线”**。
我下面给你的不是泛泛而谈，而是**可以直接落进你现有 AEOLint 架构的「规则草案级定义」**。

我会按你当前的 **AEO-Lint 体系习惯**来写：

* 每条 Guard → **1 条 AEOLint Rule**
* 明确：**Rule ID / Level / Scope / Detect / Fail Condition / Auto-Fix Policy**
* **不假设新架构**，完全贴合你已有 scan / rule / report 模式

---

# 总览：3 条 Guard → 3 条 AEOLint 规则

| Guard          | AEOLint Rule ID          | 等级             |
| -------------- | ------------------------ | -------------- |
| Program ≠ Path | `AEO-PROGRAM-PATH-001`   | ERROR          |
| Skill 边界       | `AEO-SKILL-BOUNDARY-002` | ERROR          |
| Store ≠ 语义     | `AEO-STORE-SEMANTIC-003` | WARN（可升 ERROR） |

---

# 规则 1：Program / Path 语义越权检测

## 🧪 Rule ID

```
AEO-PROGRAM-PATH-001
```

## Severity

```
ERROR
```

## Scope（扫描范围）

* `/programs/**`
* `/paths/**`
* 对应的 JSON-LD 生成文件（如 `buildProgramJsonLd.ts`）

---

## Rule Intent（规则意图）

> 防止 **Program 页面或 JSON-LD**
> 被错误写成 **推荐路径 / 学习规划层**

---

## Detect Logic（检测逻辑草案）

### A. Program 页面中禁止出现的语义信号

在 `/programs/{slug}` 页面或 JSON-LD 中，**出现以下任一即报错**：

#### ❌ 文案级关键词（regex / keyword match）

```text
recommended order
learning plan
study plan
skill progression
pathway
suggested sequence
```

#### ❌ 结构级违规（JSON-LD）

* `@type: EducationalOccupationalProgram` 中：

  * ❌ 使用 `isPartOf` 指向 Path
  * ❌ 出现 `pathway` / `learningPath` / 非 hasPart 结构字段

---

### B. Path 页面中禁止出现的教学结构

在 `/paths/{slug}` JSON-LD 中：

#### ❌ 结构级违规

* 使用 `hasPart` / `isPartOf` 指向 Course 或 Program
* 出现 Course 级结构顺序字段

---

## Fail Condition（失败条件）

```
If Program contains recommendation semantics
OR
If Path encodes teaching order structurally
→ FAIL (ERROR)
```

---

## Auto-Fix Policy

```
NO AUTO-FIX
Manual semantic correction required
```

---

# 规则 2：Skill 边界 / Curriculum 越权检测

## 🧪 Rule ID

```
AEO-SKILL-BOUNDARY-002
```

## Severity

```
ERROR
```

## Scope

* `/skills/**`
* Skill JSON-LD（未来激活）

---

## Rule Intent

> 防止 Skill 被错误当成：
>
> * 课程目录
> * Program 容器
> * Curriculum / 学习路径

---

## Detect Logic

### A. Skill 页面禁止的结构行为

#### ❌ Course 枚举（硬违规）

* `/skills/{slug}` 页面中：

  * 出现 CourseCard / CourseList 组件
  * 出现 `/course/` 链接 **作为学习步骤**

#### ❌ Program “包含”语义（硬违规）

* 文案出现：

```text
This skill includes
This skill consists of
包含以下 Program
```

---

### B. 允许但受限的例外（需模式匹配）

#### ⚠️ Foundational Course 合法模式（仅允许这一种）

必须匹配以下语义结构之一：

```text
If you lack X, start with …
You may begin with …
Foundational / prerequisite course
```

且：

* 不得形成列表
* 不得出现顺序词（first / then / next）

---

## Fail Condition

```
If Skill enumerates Courses as curriculum
OR
If Skill claims ownership of Programs
→ FAIL (ERROR)
```

---

## Auto-Fix Policy

```
NO AUTO-FIX
```

---

# 规则 3：Store 语义耦合误推断检测

## 🧪 Rule ID

```
AEO-STORE-SEMANTIC-003
```

## Severity

```
WARN   (可在 CI 成熟后升级为 ERROR)
```

## Scope

* `stores/**`
* `courseStore.ts`
* PR / Diff 文本（尤为重要）

---

## Rule Intent

> 防止 AI 或人类**从实现层结构“推断语义关系”**

---

## Detect Logic

### A. 高风险模式（文本 / 注释 / PR）

#### ❌ 语义推断型表述

```text
Course belongs to Program
Stage is part of Course
Program owns Courses
```

#### ❌ 基于 store 文件名的推断

* 在 PR / 代码注释中出现：

```text
because they are in the same store
since courseStore manages everything
```

---

## Fail / Warn Condition

```
If semantic hierarchy is inferred from store layout
→ WARN
```

（在你未来 CI 严格化时可升为 ERROR）

---

## Auto-Fix Policy

```
Suggest adding semantic clarification comment
Do NOT modify logic automatically
```

---

# 规则整合示意（你可以直接塞进 AEOLint）

```text
rules/
├─ AEO-PROGRAM-PATH-001.js
├─ AEO-SKILL-BOUNDARY-002.js
└─ AEO-STORE-SEMANTIC-003.js
```

并在 `index.js` 注册：

```js
registerRule('AEO-PROGRAM-PATH-001')
registerRule('AEO-SKILL-BOUNDARY-002')
registerRule('AEO-STORE-SEMANTIC-003')
```

---

# 为什么这是“正确的 CI 粒度”

* ❌ 不检测“好不好”
* ✅ 只检测“**结构性必错**”
* ❌ 不碰业务判断
* ✅ 只守**语义主权边界**

这正是 **AEOLint 应该干的事**。

---

## In short（中文极简版）

* 已把 3 条 Guard **完整翻译为 AEOLint 规则草案**
* 覆盖：

  * Program ≠ Path（ERROR）
  * Skill ≠ Curriculum（ERROR）
  * Store ≠ 语义主权（WARN）
* 可直接接入你现有 CLI / CI
* 不自动修，只**硬拦错误**

如果你愿意，下一步我可以**直接给你其中一条规则的 JS 实现草稿**（比如最关键的 `AEO-SKILL-BOUNDARY-002`），让你 10 分钟内跑起来。
