这个问题问得**非常关键**。
你现在已经在写**宪法级 / 执行级 / 规则级**文档了，如果对 `# / ## / ###` 没有**统一、工程化的理解**，后面一定会乱。

我不讲“语法说明书”，我按**你现在这个项目的真实用法**来讲。

---

# 一、一句话先给你“总纲”

> **Markdown 的 `#` 不是“大小标题”，而是“治理层级”。**

在你的项目里，它们分别代表：

| 符号     | 本质含义    | 你项目里的角色  |
| ------ | ------- | -------- |
| `#`    | 文档身份    | 我是谁      |
| `##`   | 章节 / 模块 | 我管什么     |
| `###`  | 规则 / 条款 | 你必须怎么做   |
| `####` | 细则 / 说明 | 为什么 / 如何 |

👉 **不是排版问题，是“权力层级问题”**

---

# 二、`#` —— 文档级（Document Identity）

### 含义（非常重要）

```md
# CLAUDE.md
```

等价于一句话：

> **“你现在读的是哪一部法律 / 宪法 / 手册”**

### 在你项目里的规则

* **一个文件，只允许一个 `#`**
* 它定义：

  * 文档身份
  * 文档作用域
  * 文档权威等级

### 你的例子（正确）

```md
# CLAUDE.md
```

* 根目录：项目宪法
* frontend/CLAUDE.md：前端执行宪章

👉 **永远不要在一个文件里写两个 `#`**

---

# 三、`##` —— 章节级（Domain / Chapter）

### 含义

```md
## 0. Document Governance & Reading Guide
```

等价于：

> **“这一章，我讨论的是哪一个治理域”**

### 特点

* 是**逻辑分区**
* 不是具体指令
* 通常比较稳定，不常改

### 你项目里的典型用途

```md
## AI Execution Protocols
## Frontend Execution Charter
## 数据与状态管理
## JSON-LD 实现
```

👉 **看到 `##`，AI 会认为：
“这是一个主题域，我要整体理解”**

---

# 四、`###` —— 规则级（Rule / Constraint）🔥最关键

### 含义

```md
### Superpowers × Git Worktree Rule (Constitutional)
```

等价于一句话：

> **“下面这几条，是必须遵守的规则”**

### 为什么我一直强调你要用 `###`

因为在 AI 行为解析中：

* `###` ≈ **强约束节点**
* AI 会：

  * 停下来
  * 当成规则处理
  * 优先级高于普通段落

### 你刚刚做对的一个关键点

```md
### Override Rule (Critical)
```

这在 AI 眼里是：

> ⚠️ **“这里发生规则覆盖”**

如果你当时写成：

```md
Override Rule:
```

那只是**说明文字，不是规则**。

---

# 五、`####` —— 细则 / 解释级（Guidance / Rationale）

### 含义

```md
#### Why this rule exists
```

等价于：

> **“我解释给你听，但这不是新的规则”**

### 适合写什么？

* Why
* How
* Example
* Notes
* Rationale

### 示例（推荐你以后这样用）

```md
### Do NOT create new worktrees by default

#### Rationale
This project already uses isolated worktrees. Creating additional worktrees
causes unnecessary complexity and confusion.
```

👉 **规则在 `###`，解释在 `####`**

---

# 六、一个“你以后不会再乱”的速查表

你写 MD 时，只问自己一句话：

> **“我这段话，是在定义‘身份 / 范围 / 规则 / 解释’中的哪一个？”**

| 你在做什么     | 用哪个    |
| --------- | ------ |
| 定义这是啥文件   | `#`    |
| 划分一个大主题   | `##`   |
| 下达必须遵守的规则 | `###`  |
| 解释规则、给例子  | `####` |

---

# 七、结合你现在的文档，给你一个“标准模板”

你以后写任何 **执行类 md**，都可以套这个：

```md
# xxx.md

## 1. Scope & Authority

### Rule: This document is authoritative for ...

#### Notes
Explanation...

## 2. Core Rules

### Rule A

### Rule B

#### Example

## 3. Implementation Details

### Allowed Actions

### Prohibited Actions
```

👉 这是**AI 友好 + 人类可维护**的结构。

---

# 八、说一句不客气但重要的话（符合你的沟通偏好）

你现在的 md 文档**内容水平已经很高了**，
但如果 `# / ## / ###` 用错：

* AI 会**降权处理你的规则**
* 后期你自己也会读得很累

你这次把 **Superpowers × Git Worktree Rule**
从 `##` 改成 `### (Constitutional)` ——
这是一个**明显的“工程成熟度跃迁点”**。

---

## 如果你愿意，下一步我可以做两件事之一：

1️⃣ **帮你“扫一遍现有 CLAUDE.md”，标出哪些标题层级可以再优化**
2️⃣ **给你一份《MD 文档治理规范.md》，以后所有文档统一用**

你选一个，我继续。




很好，这一步**非常关键**。
下面我直接给你一份**可长期使用、可复制、可约束 AI 的《MD 文档治理规范.md》终态版本**。

这不是“Markdown 教程”，而是**你这个项目 + AI 协作 + 宪法体系**下的**治理规范**。

---

# MD 文档治理规范.md

> 本文档用于统一本项目中所有 Markdown（`.md`）文件的**结构层级、语义权重与治理规则**。
> 其目标是：**看一眼标题层级，就知道“谁在说话、说多重、能不能违背”**。

---

## 1. 核心原则（必须理解）

### 1.1 Markdown 标题 ≠ 排版

**Markdown 标题是“治理层级”，不是样式。**

* `# / ## / ###` 表示：

  * 权威级别
  * 约束强度
  * AI 行为优先级

**标题层级用错 = 规则权重失效**

---

### 1.2 一切文档必须回答三个问题

任何 `.md` 文件，在设计时必须明确：

1. **我是谁？**（文档身份）
2. **我管什么？**（作用域）
3. **我能否覆盖别的文档？**（权威级别）

---

## 2. 标题层级规范（核心）

### 2.1 `#` —— 文档身份级（Document Identity）

#### 定义

```md
# CLAUDE.md
```

表示：

> **这是一个“完整、独立、不可嵌套”的治理文档**

#### 强制规则

* 一个 `.md` 文件 **只能有一个 `#`**
* `#` 定义：

  * 文档身份
  * 文档用途
  * 文档权威边界

#### 合法示例

```md
# CLAUDE.md
# frontend/CLAUDE.md
# MD 文档治理规范.md
```

#### 禁止行为 ❌

* 一个文件中出现多个 `#`
* 在中间章节重新定义文档身份

---

### 2.2 `##` —— 章节 / 治理域级（Domain / Chapter）

#### 定义

```md
## AI Execution Protocols
```

表示：

> **这是一个“主题域 / 职责域”**

#### 使用场景

* 文档结构分区
* 逻辑模块划分
* 长期稳定的章节

#### 特点

* **不直接下达命令**
* 为 `###` 提供上下文

#### 合法示例

```md
## Document Governance
## Frontend Execution Charter
## 数据与状态管理
## JSON-LD 实现
```

---

### 2.3 `###` —— 规则级（Rule / Constraint）🔥最重要

#### 定义

```md
### Superpowers × Git Worktree Rule (Constitutional)
```

表示：

> **下面的内容是“必须遵守的规则”**

#### 语义权重

* 对 AI：**强约束**
* 对人：**不可随意违背**
* 对项目：**稳定规则节点**

#### 使用场景

* 禁止 / 允许行为
* Override 规则
* 必须遵守的工程约定

#### 合法示例

```md
### Do NOT create new git worktrees by default
### Override Rule (Critical)
### Slug Generation Rules
```

#### ❗重要说明

> **如果一段话是规则，却不用 `###`，
> 那它在 AI 眼里只是“建议”**

---

### 2.4 `####` —— 解释 / 细则级（Rationale / Guidance）

#### 定义

```md
#### Rationale
```

表示：

> **这是解释，不是新规则**

#### 使用场景

* Why（为什么）
* How（怎么做）
* Example（示例）
* Notes（补充说明）

#### 推荐用法（强烈）

```md
### Do NOT create new worktrees by default

#### Rationale
This project already uses isolated git worktrees.
```

#### 禁止行为 ❌

* 用 `####` 下达新规则
* 在 `####` 中引入 override 逻辑

---

## 3. 文档权威分级（非常重要）

### 3.1 权威等级定义

| 文档类型 | 示例                    | 权威  |
| ---- | --------------------- | --- |
| 宪法级  | `/CLAUDE.md`          | 最高  |
| 执行级  | `/frontend/CLAUDE.md` | 次高  |
| 规范级  | `xxx.rules.md`        | 模块内 |
| 说明级  | README / notes        | 最低  |

---

### 3.2 覆盖规则（Override Rule）

**只有满足以下条件，才允许覆盖上级规则：**

1. 必须使用 `### Override Rule`
2. 必须明确写出覆盖范围
3. 必须位于执行级文档中

#### 示例

```md
### Override Rule (Critical)

This rule overrides default Superpowers assumptions.
```

---

## 4. 规则与说明的分离原则

### 正确结构 ✅

```md
### Rule: X is forbidden

#### Rationale
Explanation...

#### Example
Example...
```

### 错误结构 ❌

```md
## Rule explanation
Some rules mixed with explanations...
```

---

## 5. AI 协作专用规范（强制）

### 5.1 给 AI 的规则必须满足

* 位于 `###` 或更高层级
* 使用明确动词：

  * MUST
  * MUST NOT
  * ONLY allowed when
* 不依赖上下文猜测

### 5.2 禁止模糊语言 ❌

* “should consider”
* “usually”
* “recommended”
* “try to”

---

## 6. 常见错误速查表

| 错误                | 后果     |
| ----------------- | ------ |
| 规则写在普通段落          | AI 忽略  |
| Override 不用 `###` | 不生效    |
| 一个文件多个 `#`        | 文档身份混乱 |
| 执行细节写进宪法          | 长期不可维护 |

---

## 7. 推荐标准模板（可复制）

```md
# Document Name

## 1. Scope & Authority

### Rule: Authority Definition

#### Notes

## 2. Core Rules

### Rule A
### Rule B

## 3. Implementation

### Allowed Actions
### Prohibited Actions
```

---

## 8. 最终原则（一句话）

> **Markdown 的标题不是给“人好看”，
> 而是给“系统、AI、未来自己”做治理用的。**

---

### 版本信息

* Version: 1.0.0
* Status: Stable
* Scope: Project-wide
* Last updated: 2025-12-26

---

如果你愿意，下一步我可以帮你做两件事之一：

1️⃣ **把你现有所有 md 文档“按本规范跑一遍体检”**
2️⃣ **生成一个“给 AI 用的《MD Writing Skill》文件”，以后写 md 自动合规**

你选一个，我继续。
