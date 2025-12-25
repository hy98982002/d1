很好，这一步我会**按“宪法附录（Appendix）”的标准**来给你，而不是随便一份 TODO。
下面这份内容 **可以直接原样放进根目录 `CLAUDE.md` 的 Appendix**，未来 2–3 年都不需要推翻，只会“逐条启用”。

---

# Appendix A — Future Semantic Entity Expansion Plan

> （未来语义实体扩展接口清单 · 宪法级蓝图）

---

## A.1 设计原则（必须先写清楚）

```md
### A.1 Principles for Future Entity Expansion

The following entities are part of the long-term AEO / Learning Graph design.

Rules:
- Entities MUST NOT be implemented before their content is ready.
- Data models may reference future entities, but pages and JSON-LD MUST NOT be generated prematurely.
- All entities follow the "Single Source of Truth" principle.
- Entity pages define meaning; other pages may only reference them.
```

---

## A.2 已确立的核心实体（当前或近期）

```md
### A.2 Core Entities (Confirmed)

These entities are either already implemented or scheduled in the near term.
```

| Path         | Entity Type      | Schema / Role                    | Responsibility                        |
| ------------ | ---------------- | -------------------------------- | ------------------------------------- |
| `/course/`   | Course           | `Course`                         | 单一课程内容与技能                             |
| `/levels/`   | Learning Level   | `DefinedTerm`                    | Beginner / Intermediate / Advanced 定义 |
| `/programs/` | Learning Program | `EducationalOccupationalProgram` | 学习顺序与路径                               |
| `/faq/`      | FAQ              | `FAQPage`                        | 问答型搜索与富结果                             |
| `/how-to/`   | HowTo            | `HowTo`                          | 操作型 / 教程型搜索                           |

---

## A.3 高优先级未来实体（强 AEO 推荐）

> **这些实体不需要现在实现页面，但需要在数据与架构中“可引用”。**

```md
### A.3 High-Priority Future Entities
```

### 1️⃣ `/skills/` — 技能实体（Skill Graph 核心）

```md
- Path: /skills/{skill-slug}
- Entity Type: DefinedTerm (Skill)
- Purpose:
  - Define individual, atomic skills (e.g. "Prompt Design", "Color Theory")
  - Serve as bridges between Courses, Programs, and Careers
```

**允许的提前接口（现在可以做）：**

```ts
course.skills?: string[]        // ['prompt-design', 'visual-composition']
program.skills?: string[]
```

**禁止：**

* ❌ 现在生成 `/skills` 页面
* ❌ JSON-LD 中虚构 Skill 实体

---

### 2️⃣ `/roles/` — 职业 / 角色实体（Career AEO）

```md
- Path: /roles/{role-slug}
- Entity Type: Occupation
- Purpose:
  - Map learning paths to career outcomes
  - Enable "How to become X" type searches
```

**允许的提前接口：**

```ts
program.targetRoles?: string[]  // ['ai-designer', 'ui-designer']
```

---

### 3️⃣ `/paths/` — 学习路径聚合实体（非单一 Program）

```md
- Path: /paths/{path-slug}
- Entity Type: Conceptual LearningPath (composed entity)
- Purpose:
  - Aggregate multiple Programs or Courses across levels
```

**说明：**

* `/paths/` ≠ `/programs/`
* paths 是“导航级语义”，program 是“教学组织单元”

---

## A.4 中优先级实体（搜索增强型）

```md
### A.4 Secondary AEO Entities
```

### 4️⃣ `/tools/` — 工具实体

```md
- Path: /tools/{tool-slug}
- Entity Type: SoftwareApplication
- Purpose:
  - Capture "Photoshop AI", "Midjourney" tool searches
```

**允许的接口：**

```ts
course.tools?: string[]   // ['photoshop', 'midjourney']
```

---

### 5️⃣ `/t/` — 主题 / Topic 聚合页

```md
- Path: /t/{topic-slug}
- Entity Type: DefinedTerm / Thing
- Purpose:
  - Topic-based aggregation (AIGC, Logo Design, UI Design)
```

**说明：**

* `/t/` 是内容聚合，不是教学阶段
* 不承担 Level / Program 职责

---

### 6️⃣ `/glossary/` — 概念词典

```md
- Path: /glossary/{term}
- Entity Type: DefinedTerm / DefinedTermSet
- Purpose:
  - Explain domain concepts for AEO and beginners
```

---

## A.5 接口预留规范（现在必须遵守）

```md
### A.5 Interface Reservation Rules
```

#### ✅ 允许现在存在的字段

* `skills`
* `tools`
* `targetRoles`
* `topics`
* `levelRef`
* `programRef`

#### ❌ 禁止现在做的事情

* 不生成未来实体页面
* 不在 JSON-LD 输出不存在的实体
* 不制造“空壳路径”

---

## A.6 启用流程（未来标准流程）

```md
### A.6 Entity Activation Process

1. Content readiness confirmed
2. Data model validated
3. Page template implemented
4. JSON-LD enabled
5. Sitemap inclusion
6. Internal linking activated
```

> ⚠️ An entity MUST NOT be partially activated.

---

## A.7 长期目标（Learning Graph）

```md
### A.7 Long-Term Goal

The platform evolves toward a Learning Knowledge Graph:

Course → Skill → Level → Program → Path → Role
```

This appendix serves as a roadmap, not an implementation checklist.

---

## A.8 宪法声明（非常重要，建议保留）

```md
> This appendix defines future semantic expansion possibilities.
> It does not grant permission to implement entities prematurely.
> All future entities must comply with the core constitution.
```

---

## In short（中文极简版）

* 这是 **可直接放进 `CLAUDE.md` 的 Appendix**
* 明确了 **未来要加什么、不该现在加什么**
* 现在只需 **预留字段与语义接口**
* 页面 + JSON-LD **必须等内容成熟再启用**
* 这是你平台未来的 **Learning Graph 蓝图**

如果你愿意，下一步我可以直接帮你做：
👉 **把这份 Appendix 转成一张“实体 × 页面 × Schema”的对照总表**，方便你以后按阶段逐个点亮。
----
下面按照你平台的 **业务阶段 + AEO 必要性 + 实现成本**，把 10 个候选实体分成 4 档——**必须立即、短期优先、中期迭代、可选/按需**。这样既不漏掉核心 SEO/AEO 红利，也避免一次性“开太多坑”。

| 档次                    | 路径 (Entity)                                   | 为什么放在这一档                             | 备注 / 时间点建议                              |
| --------------------- | --------------------------------------------- | ------------------------------------ | --------------------------------------- |
| **① 必须立即**            | `/course/ (Course)`                           | 核心业务页；没有它就谈不上教育平台或 AEO。              | 已上线。继续保持单一事实源、完善 JSON-LD。               |
|                       | `/levels/ (DefinedTerm)`                      | 三级体系基石；所有课程、路径都要引用它。                 | 先完成实体页 + `/levels/beginner …`；后期可再加富媒介。 |
|                       | `/programs/ (EducationalOccupationalProgram)` | 学习路径入口；搜索引擎最看重的深链维度之一。               | Priority: MVP 级路径页→再加教学大纲 / 关联课程。       |
| **② 短期优先<br>(6 个月内)** | `/faq/ (FAQPage)`                             | CTR 提升最快的富结果；实现成本极低。                 | 建议一次性整理高频问答 20+ 条后上线。                   |
|                       | `/how-to/ (HowTo)`                            | “教程”型搜索流量大；对图像/步骤要求可控。               | 先选 3–5 个爆款入门案例；每篇 HowTo ≈4–6 步即可。       |
|                       | `/skills/ (DefinedTerm Skill)`                | 课程 ↔ 技能 ↔ 职业 的关键连接点；长尾流量来源。          | 先做“技能目录页”+ 每技能最小卡片；内容可渐进充实。             |
| **③ 中期迭代<br>(1 年内)**  | `/paths/ (LearningPath)`                      | 把多个 Program/Level 串起来，形成全景图；对新手导航友好。 | 等 `/programs/` 稳定后再抽象；需要可视化路线图。         |
|                       | `/tools/ (SoftwareApplication)`               | 方便抓取“软件 + 教程”关键词；但视频/图文维护成本高。        | 与第三方插件测评/工具库一起推出效果更好。                   |
| **④ 可选 / 按需**         | `/roles/ (Occupation)`                        | 只有当你做“职业导向课程＋证书”时才明显加分。              | 当前偏技能提升 → 可暂缓；等就业辅导业务成熟再做。              |
|                       | `/glossary/ (DefinedTermSet)`                 | 科普/解释向流量；对转化帮助有限，维护成本高。              | 可以在博客/专栏里以“术语小百科”形式慢慢填充；非刚需。            |

---

## 为什么这样分档？

1. **阶段闭环**：一旦 `/levels/`、`/programs/` 建立，就能形成 “Course ↔ Level ↔ Program” 的 **最小可行知识图谱**。
2. **ROI 最大化**：FAQ & HowTo 属于“低投入→高 CTR”板块，尽快上线可以验证流量回报。
3. **演进式图谱**：`/skills/` 提前铺接口能让现有 Course 元数据“可前向兼容”，未来接入职业路径不会被卡住。
4. **内容真实度**：Occupation / Glossary 若内容薄弱反而被搜索引擎判为“空壳”，所以宁缺毋滥。

---

## 操作提示

* **接口预留**：在 Course/Program 数据结构里提前留 `skills`、`toolRefs`、`pathRef` 字段，但保持为空数组，避免破坏现有 JSON-LD。
* **版本化上线**：每引入一个新实体，**先出最小内容 + JSON-LD 模板**，通过 Rich-Snippet 测试工具验证后再批量推广。
* **监控指标**：把 `FAQ rich result`、`HowTo impression`、`Skills 关键词排名` 加入 Search Console 自定义报表，量化成效后再决定下一步投入。

---

### In short（中文超简总结）

* **立即**：Course / Levels / Programs（核心三件套）。
* **半年内**：FAQ、How-To、Skills（三大流量加速器）。
* **一年内**：Paths、Tools（导航和工具生态）。
* **可选**：Roles、Glossary（等职业导向或内容厚度够时再上）。
------
下面这段你可以**直接粘贴进根目录 `CLAUDE.md`**（建议放在 `Appendix` 里，或放在 **AEO / Entity** 相关章节末尾）。它是对我之前给你的“实体扩展 Appendix”的**简化改写 + 按 o3 的优先级排序**，并且**补上 `/t/`**。

---

## Appendix — Entity Build Priority

> 实体建设优先级（AEO / Learning Graph 路线图）

### Priority 0 — 已存在且必须稳定（Core Runtime）

* **`/course/` (Course)**：核心内容页，所有 AEO 架构的根基。
* **`/levels/` (DefinedTerm)**：学习阶段实体（Beginner / Intermediate / Advanced），作为全站阶段的唯一事实源（SSoT）。
* **`/programs/` (EducationalOccupationalProgram)**：学习路径/体系课实体，定义“先学什么→再学什么”。

> Rule: 任何新实体不得破坏以上三者的稳定性与语义一致性。

---

### Priority 1 — 短期必须上线（Fast AEO Wins, ≤ 6 months）

* **`/faq/` (FAQPage)**：低成本高回报的富结果入口，用于提升 CTR 与覆盖高频疑问。
* **`/how-to/` (HowTo)**：教程型搜索入口，承接“怎么做/步骤/操作”类需求，形成可分享的深链。
* **`/skills/` (DefinedTerm: Skill)**：技能实体，用于连接 Course ↔ Program ↔（未来）Role，构建技能图谱与长尾流量。

---

### Priority 2 — 中期迭代（Structured Navigation, ≤ 12 months）

* **`/paths/` (LearningPath, composed entity)**：跨 Program/Level 的导航聚合实体，强调学习顺序与推荐路线（不等同于单一 Program）。
* **`/tools/` (SoftwareApplication)**：工具/软件实体，承接“工具+教程/工具+技巧”关键词与内容生态。

---

### Priority 3 — 可选 / 按需（Only when content is ready）

* **`/roles/` (Occupation)**：职业路径实体；仅在平台明确提供职业导向课程、就业训练或职业转型路线时启用。
* **`/glossary/` (DefinedTermSet)**：术语词典实体；仅在概念内容足够密度与质量时启用（避免空壳页面）。

---

### Priority 1.5 — 主题聚合（Topic Hub, added)

* **`/t/` (DefinedTerm / Thing)**：主题聚合实体（Topic Hub），用于跨课程、技能、HowTo、FAQ 的主题归档与内链枢纽。

  * `/t/` 不定义学习阶段、不定义学习顺序
  * 只做“主题聚合 + 关联推荐 + 内链中心”

---

## Interface Reservation Rules（接口预留规则）

### ✅ 允许现在预留（但可为空）

* `course.levelRef` → `/levels/{level}`
* `course.skills[]` → `['prompt-design', ...]`
* `course.tools[]` → `['photoshop', ...]`
* `course.topics[]` → `['ai-logo', ...]`（用于 `/t/`）
* `program.skills[]`, `program.topics[]`, `program.targetRoles[]`
* `path.programs[]` / `path.courses[]`（未来 `/paths/`）

### ❌ 禁止现在启用

* 不生成内容不成熟的实体页面
* 不在 JSON-LD 中输出“空壳实体”
* 不让 Course/Level/Program 的职责串权（必须遵守 Content Semantic Responsibility & AEO Page Roles）

---

## Activation Process（启用流程）

任何新实体必须按以下流程启用，禁止跳步：

1. 内容准备就绪（至少最小可用内容）
2. 数据模型字段稳定（SSoT 明确）
3. 页面模板落地
4. JSON-LD 输出启用并通过校验
5. sitemap 收录 + 内链启用
6. 监控收录与点击表现，再扩容

---

### In short（中文超简总结）

* **马上必须稳住**：`/course/` + `/levels/` + `/programs/`
* **半年内优先上**：`/faq/` + `/how-to/` + `/skills/` +（补充）`/t/`
* **一年内再做**：`/paths/` + `/tools/`
* **内容成熟才启用**：`/roles/` + `/glossary/`

如果你把这段贴进 CLAUDE.md，我建议你在目录里给 Appendix 加一个入口，例如：
`## Appendix — AEO Entity Roadmap & Priority`（这样以后 AI/协作者一眼就能找到规则源头）。
