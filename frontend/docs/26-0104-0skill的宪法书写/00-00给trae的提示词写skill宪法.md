

---

# 一、先给总判定（结论）

> **本页关于 Skill 的规则中：**

* ✅ **有 3 条必须进入 `/CLAUDE.md`（宪法级）**
* ⚠️ **有 2 条应进入 `frontend/CLAUDE.md`（前端执行级）**
* ❌ **有 1 类内容不应写入任何 CLAUDE，只用于页面文案层**

你已经加进去的 **L406–L408 是完全正确的，而且位置也对**，这是核心之一。

---

# 二、回忆并抽取「本页 Skill 的完整规则池」

这是我在本页对你反复确认、并且已经“稳定、不再变化”的 Skill 规则（只列最终形态，不列推导过程）。

---

## A. Skill 的**本体语义规则**（宪法级）

这些是 **结构不变量**，未来谁都不能改，包括 AI。

### ✅ 规则 A1（你已加入，正确）

> Skill MAY be supported by standalone foundational Courses
> Such Courses MUST represent cross-program, cross-domain prerequisites
> and MUST NOT encode program-level progression

✔ **已写入 /CLAUDE.md，正确**

---

### ✅ 规则 A2（必须补充进 /CLAUDE.md）

> **Skill is an ability abstraction layer, not a learning sequence**

推导自我们反复强调的事实：

* Skill 不定义学习顺序
* Skill 不解释 Beginner / Intermediate / Advanced
* Skill 不承载教学结构

**建议标准英文宪法表述：**

```md
Skill entities represent ability abstractions.
They MUST NOT define learning order, levels, or program-level progression.
```

---

### ✅ 规则 A3（必须补充进 /CLAUDE.md）

> **Skill does not contain Programs; Programs support Skills**

这是你刚才问到 Program 展现方式时的核心纠偏点。

**宪法级表达：**

```md
Programs are structured learning paths that support a Skill.
A Skill MUST NOT be defined as containing or owning Programs.
```

这条不写进去，未来 AI 一定会写出：

> “This skill includes the following programs”
> 然后你的语义体系直接塌。

---

## B. Skill 的**支撑要素规则**（前端执行级）

这些规则 **不改变实体语义**，但会直接影响页面结构与表达，
👉 **适合放在 `frontend/CLAUDE.md`**

---

### ⚠️ 规则 B1：Tool 的表达方式（前端级）

稳定结论是：

> Tool = 能力依赖
> Course = 学会 Tool 的路径
> 二者不能混写

**前端约束表达：**

```md
On Skill pages, Tools MUST be presented as dependencies, not prerequisites.
Tool learning SHOULD be referenced via Courses, without gating access to the Skill.
```

这条**不适合进总宪法**，但非常适合约束前端 AI 写页面。

---

### ⚠️ 规则 B2：Practice 的表达方式（前端级）

稳定结论是：

> Practice = 可验证能力结果
> 不是承诺、不是广告、不是就业导向

**前端执行规则：**

```md
Skill-level Practices MUST describe verifiable outcomes.
They MUST NOT be phrased as guarantees, promises, or marketing claims.
```

---

## C. 明确 **不应写进任何 CLAUDE 的内容**

这一点也很重要。

### ❌ 不写入宪法 / CLAUDE 的内容

* 具体文案示例
* “设计一个商用 UI” 这类表述
* 页面 section 名称（What You Can Do / Practice 等）

👉 这些**属于页面实现层**，不是规则层。

---

# 三、最终「该写入哪些文件」对照表

| 规则 | 内容                     | 写入位置                 |
| -- | ---------------------- | -------------------- |
| A1 | Skill 可由独立基础 Course 支撑 | `/CLAUDE.md`（已完成）    |
| A2 | Skill 不定义顺序 / Level    | `/CLAUDE.md`         |
| A3 | Program 支撑 Skill，而非包含  | `/CLAUDE.md`         |
| B1 | Tool 是依赖，不是门槛          | `frontend/CLAUDE.md` |
| B2 | Practice 是能力验证         | `frontend/CLAUDE.md` |

---

# 四、给 Trae 的【一次性执行提示词】

下面这段你可以**原样复制给 Trae**。

---

### ✅ Trae Prompt（宪法 + 前端规则一次性写入）

```
请根据以下要求，对项目中的 /CLAUDE.md 与 frontend/CLAUDE.md 进行一次性补充修改，仅新增规则，不重写、不重排已有内容。

【一】在 /CLAUDE.md 中（宪法级规则）补充以下 Skill 相关不变量：

1. 明确 Skill 的语义边界：
   - Skill 是能力抽象层（ability abstraction）
   - Skill 不定义学习顺序、不定义 Level（Beginner / Intermediate / Advanced）
   - Skill 不编码 Program 级进阶关系

   推荐英文规则表述：
   “Skill entities represent ability abstractions.
    They MUST NOT define learning order, levels, or program-level progression.”

2. 明确 Skill 与 Program 的关系：
   - Program 是支持 Skill 的结构化学习路径
   - Skill 不包含、不拥有 Program

   推荐英文规则表述：
   “Programs are structured learning paths that support a Skill.
    A Skill MUST NOT be defined as containing or owning Programs.”

【二】在 frontend/CLAUDE.md 中（前端执行级规则）补充以下 Skill 页面约束：

1. Tool 的页面表达规则：
   - Tool 作为能力依赖（dependency）呈现
   - 不作为进入 Skill 的前置门槛
   - Tool 的学习路径应通过 Course 引用，而非阻断 Skill

   推荐表述：
   “On Skill pages, Tools MUST be presented as dependencies, not prerequisites.
    Tool learning SHOULD be referenced via Courses, without gating access to the Skill.”

2. Practice 的页面表达规则：
   - Practice 用于描述可验证的能力结果
   - 不得写成承诺、保证、营销或就业导向文案

   推荐表述：
   “Skill-level Practices MUST describe verifiable outcomes.
    They MUST NOT be phrased as guarantees, promises, or marketing claims.”

【三】不要修改已有规则，不要调整原有段落顺序，仅在合适的 Skill 规则位置追加以上内容。
```

---


