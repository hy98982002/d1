# CLAUDE.md

**🔥 基础规则（默认策略 + 允许例外）：**

- **语言：默认中文；当工具/协议要求固定英文/语法时，以工具协议为准，但解释必须中文**
- **文件读取：默认优先使用内置 Read 工具；若当前执行器不支持或读取失败，允许使用等价安全读取方式，必须在输出中声明采用了哪种读取方式**

This document defines the immutable rules, semantic contracts, and AI-execution constraints of this project.

This is a constitution, not a changelog, not a notebook, and not a discussion log.

All human and AI changes MUST comply with this document.

---


## 0. Document Governance & Reading Guide（文档治理与阅读指引）

本仓库采用**分层文档治理体系**。  
请在阅读或修改前，明确每个文件的职责边界。

### 文档分工总览（非常重要）

- **/CLAUDE.md（本文件）**  
  项目的最高级宪法，仅包含：
  - 不可违背的长期规则
  - AEO / 语义 / 架构红线
  - AI 与人类的行为边界  
  ❗本文件**不会**：
  - 记录历史过程  
  - 解释具体实现细节  
  - 保存阶段性思考  

- **/CHANGELOG.md**  
  仅记录「发生了什么」，例如：
  - 新增 / 删除了哪些实体或路径
  - URL / 语义 / AEO 结构变化
  - 架构层面的可观测变更  
  ❗不解释为什么，只记录结果。

- **/frontend/CLAUDE.md**  
  前端专用执行细则，回答：
  - 在前端“具体怎么做”
  - Vue / Vite / Pinia / JSON-LD / SEO 的实现约定  
  ❗不得重复本文件中的全局规则。

- **/frontend/docs/**  
  过程性与历史性文档存档区，包括：
  - PRD（不带 x 前缀）
  - 多轮实施、修订、验证过程（x* 文件）
  - 评测、推演、试错与历史决策  
  ❗这些内容**有价值但不具备宪法效力**。

> ⚠️ 若你在 claude-original.md 中看到但在本文件中找不到的内容，
> 说明它已被**降级为“非宪法内容”**，应存在于 docs 或历史文档中，
> 而不是回填到本文件。

### 核心设计蓝本（Design Source of Truth）

以下目录包含项目的**概念源头与体系推演文档**：

核心设计蓝本位于：
- frontend/docs/25-00-core-design/

这些文档：
- 不参与日常实现
- 不随 PRD 或实现频繁修改
- 仅在涉及体系级、语义级、商业模型级调整时参考

AI Agents:
- MUST NOT 自动遍历 docs
- MUST ONLY 读取被明确指向的文档
- MUST 优先遵守 CLAUDE.md 与 frontend/CLAUDE.md
除非当前任务明确涉及体系或语义重构。

### AI Working Context Map（AI 工作上下文地图）

在执行任何任务前，AI Agent 应理解以下文档的**职责差异**：

- `/CLAUDE.md`  
  → 唯一宪法。定义语义主权、实体关系、AEO 红线。  
  → 不解释实现，不描述工程现实。

- `/frontend/CLAUDE.md`  
  → 前端执行细则。说明在前端“如何实现”宪法规则。  
  → 仅约束前端，不得扩展或修改宪法语义。

- `/AI_EXECUTION_CONTEXT.md`  
  → AI 理解工程现实的背景材料。  
  → 描述当前代码结构、历史迁移、现实假设。  
  → **不具备任何约束力，不得作为规则依据。**

- `/DEPLOY_NOTES.md`  
  → 部署、构建、环境与运维说明。  
  → 与语义、AEO、实体规则无关，不得反向影响宪法判断。

AI Agent 在发生冲突时：
**必须以 `/CLAUDE.md` 为唯一裁决来源。**

## 文件与目录命名规则（跨平台强制）

本项目 **必须** 在 Windows / macOS / Linux 环境下
可 `git clone`、可 `git checkout`、可协作。

### 强制规则
- **禁止** 在文件名或目录名中使用以下字符：
  `* ? : < > | " / \`
- 仅允许使用字符集：
  - `a-z A-Z 0-9`
  - `- _`
  - 中文（需克制，不得过长）
- 所有重命名操作 **必须使用 `git mv`**
- AI / 自动生成文件 **同样适用本规则**

### 权威文档
- 详细规则请参见：
  `docs/跨平台仓库命名铁律.md`

> 违反本规则的提交一律视为 **无效提交**，必须修复后才能继续。



## 1. Scope & Authority（适用范围与权威）

本宪法适用于:

- frontend/
- backend/（如存在）
- 项目整体的语义结构、AEO 设计与文档治理体系

所有人类开发者与 AI Agent（Claude / Codex / Cursor / Trae）
**必须遵守本文件中的规则。**

如本文件与其他说明发生冲突,**以 CLAUDE.md 为最高优先级**。

---

## 2. Content & Semantic Constitution（内容与语义宪法）

### 2.1 Page Responsibility Definitions（页面职责定义）

> 每个页面类型必须遵循单一、不重叠的语义职责。

#### Course（/course/）
课程页面表示**一门独立的教学单元**。

- 说明:课程教什么、学什么、产出什么
- 包含:课程内容、技能目标、学习成果、章节结构
- MUST NOT:定义学习顺序或学习路径

**职责边界**:
- ✅ 回答"这门课程教什么?"
- ❌ 不能解释全局学习阶段
- ❌ 不能定义学习顺序

---

#### Topic（/t/{topic}）
主题页用于**按主题聚合内容（以 Course 为主）**。

- 只负责"内容相关性"
- 不表达先后顺序
- MUST NOT:表现为 Program 或 Path

**职责边界**:
- ✅ 聚合同主题的课程
- ❌ 不能定义学习顺序
- ❌ 不能使用 hasPart 关系

---

#### Program（/programs/{program}）
体系课页面,表示**有明确顺序的学习路径**。

- Courses are intentionally ordered
- 用于表达"先学什么 → 再学什么"
- 是结构化学习的核心单位

**职责边界**:
- ✅ 回答"应该先学什么,再学什么,为什么?"
- ✅ 定义课程顺序和前置条件
- ❌ 不能重新定义 Level 含义
- ❌ 不能重复课程内容

---

#### Path（/paths/{path}）
路径页用于**宏观学习路线聚合**。

- MAY 聚合多个 Program
- DOES NOT 取代 Program 的顺序定义

---

#### Levels（/levels/）
学习阶段定义页,仅用于解释阶段语义。

- Levels 是枚举,不是课程
- 不承载具体教学内容

**职责边界**:
- ✅ 回答"Beginner/Intermediate/Advanced 是什么意思?"
- ✅ 解释学习者前置条件、预期技能、学习难度
- ✅ 聚合该阶段的课程
- ❌ 不能教授具体课程内容

---

#### FAQ / HowTo
用于问答与教程型搜索。

- MUST NOT:重新定义课程或体系课语义

---

### 2.2 Entity Relationship Rules（AEO 实体关系）

所有实体关系必须遵循 Schema.org 和 AEO 安全语义。

#### Mandatory Relationships（强制关系）

**Program ↔ Course**:
- Program → Course:hasPart
- Course → Program:isPartOf

**Topic ↔ Course**:
- Topic → Course:about / mentions

#### Forbidden Relationships（禁止关系）

- ❌ Topic MUST NOT use hasPart
- ❌ Course MUST NOT define position outside Program context
- ❌ Program MUST NOT act as unordered aggregation

---

### 2.3 Naming & Enumeration Rules（唯一命名源）

#### StageKey Enumeration（唯一合法枚举）

```
beginner | intermediate | advanced
```

- `basic` is **FORBIDDEN**
- 枚举值必须在以下位置完全一致:
  - URL slug
  - UI 文案
  - JSON-LD
  - 内部数据模型

**运行时校验**:
- 阶段数据进入 store、路由或组件前应调用 `assertStageKey`
- 保持 fail-fast 原则
- 新增工具/接口需沿用 `assertStageKey` 策略,避免 silent fallback

---

#### Slug Rules

- Slugs MUST be semantic and stable
- Slugs MUST NOT encode transient UI state
- Slug meaning MUST match page content meaning

**SEO/AEO 优化原则**:
- ✅ 允许使用拼音:TypeScript 类型定义、组件内部变量名
- ❌ 禁止使用拼音:URL 路径、HTML class/id、Schema.org 数据、图片文件名、Meta 标签

**Course Slug Format**:
- Slug 必须可读、稳定、与内容一致
- Level 必须出现且只能是枚举值（`beginner` / `intermediate` / `advanced`）
- Tool 作为可选段：有工具就写，没有就不写
- 明确禁止：堆砌营销词、临时状态、UI 状态
- Example:`photoshop-ai-design-beginner` (带工具) 或 `design-psychology-beginner` (无工具)

---

## 3. Routing & URL Canonical Rules（路由与规范）

### URL Hierarchy（URL 层级结构）

- `/course/`:原子教学单元
- `/t/`:主题聚合
- `/programs/`:有序学习路径
- `/paths/`:宏观学习路线
- `/levels/`:学习阶段定义

### Canonical Rules（规范规则）

- 每个实体只有一个 canonical URL
- Slug 变更必须提供 redirect
- 影响索引的路由变化 MUST 记录在 CHANGELOG.md

### Slug Stability（Slug 稳定性原则）

- slug ≠ 展示用:Slugs are not for display purposes but for semantic anchoring
- slug = 长期稳定语义锚点:Slugs should remain stable over time to maintain SEO value
- SEO / AEO 优先:Slugs must follow AEO / LRMI best practices

---

## 4. Data & Schema Rules（Schema / LRMI）

### Schema 真实表达原则

- 所有 Course / Program / Level 页面 MUST 提供 JSON-LD
- Schema 必须与页面内容真实一致
- 禁止夸大技能、成果或前置条件

**Forbidden Practices**:
- ❌ No false claims:JSON-LD must accurately reflect the actual course content
- ❌ 不得过度宣称:Over-claiming skills, outcomes, or prerequisites is FORBIDDEN

### educationalLevel 使用规则

- **Must use DefinedTerm**:Avoid plain strings, use structured DefinedTerm format
- **Must reference level entity**:Link to `/levels/` pages using `@id` or `inDefinedTermSet`

**Example**:
```json
"educationalLevel": {
  "@type": "DefinedTerm",
  "name": "Beginner",
  "@id": "https://www.doviai.com/levels/beginner"
}
```

### Program / Course / Skill 关系规则

- **isPartOf / hasPart**:Use these properties to define hierarchical relationships
- **programPrerequisites**:Clearly define prerequisites for Program pages
- **educationalUse**:Use LRMI educationalUse values to categorize content types

### AEO 语义主权：Program / Skill / Path（强制）

#### 1) Skill 实体规则（/skills/{slug}）
- 一旦 Skill 拥有独立实体页（/skills/{slug}），所有 Program / Course 与 Skill 的关系**必须使用实体级引用**（@id / isPartOf / relatedTo 等），**不再使用字符串型 teaches 作为主干表达**。
- /skills/{slug} 是“能力抽象与入口页”：
  - ✅ 允许：链接 Program（体系入口）、抽象描述能力构成/收益
  - ❌ 禁止：展开或链接任何 Course；禁止在 skills 页定义学习顺序；禁止解释 Level（Beginner/Intermediate/Advanced）

#### 2) 教学结构主权（/programs/{slug}）
- /programs/{slug} 是“教学结构顺序”的唯一主权实体（跨课程结构主干）：
  - ✅ 允许：Program → Course 使用 hasPart；Course → Program 使用 isPartOf；在 Program 内定义课程的强依赖与顺序
  - ❌ 禁止：把 Path 的推荐顺序写进 Program；禁止把商业权限/会员等级混入 Level/Stage 语义

#### 3) 学习规划与推荐顺序（/paths/{slug}）
- /paths/{slug} 只负责“Skill 之间的推荐学习顺序”（建议性、外生、可调整）：
  - ✅ 页面内容层：可写推荐顺序；可解释性推荐 Program（可链接）
  - ❌ 结构主干（JSON-LD）：不得用 hasPart / isPartOf 表达教学结构；不得把 Program 当作路径步骤；不得出现 Course 链接

#### 4) Course 内部结构权限（/course/{slug}）
- /course/{slug} 可使用 hasPart 表达课程内部结构（如 CourseSection）
- /course/{slug} 不得使用 hasPart 表达跨课程教学顺序

#### 5) 命名空间 vs 实体页（强制）
- /programs/、/skills/、/paths/ 仅作为 URL 命名空间或索引/导航页存在：
  - ✅ 允许：`BreadcrumbList`、`WebPage`、`CollectionPage`
  - ❌ 禁止：把它当作 Program/Skill/Path 实体输出（比如 `@type: Course`/`DefinedTermSet`/实体型）
- 所有 AEO 实体必须是具体节点：
  - /programs/{slug}
  - /skills/{slug}
  - /paths/{slug}

#### 6) Slug 防冲突规则（强制）
- /paths/{slug} 的 slug 必须表达“学习规划目标”，不得复用任何 /skills/{slug} 或 /programs/{slug}（避免语义同名冲突）。

#### 7) LRMI 使用范围（强制）
- LRMI 仅用于教育语义字段（educationalLevel、educationalUse、learningResourceType 等教育相关字段）；非教育字段按 Schema.org 常规写法处理。


---

## 5. Coding Philosophy & Architectural Constraints（编码哲学）

以下原则为**长期约束**:

### Core Principles（核心原则）

- **显式优于隐式**:Explicit over implicit
- **状态必须可追溯、可调试**:State traceability and debuggability
- **避免将业务语义编码进 UI 表现层**:Avoid coupling business semantics with presentation logic
- **禁止同一概念存在多个真源**:Single source of truth for each concept

### Data Model Principles（数据模型原则）

- **Course**:Contains specific course content, lessons, outcomes, and metadata
- **Level**:Defines learning stage characteristics, prerequisites, and aggregates courses
- **Program**:Defines learning pathways, connects multiple courses, and explains progression logic

**Single Source of Truth Rule**:
- Level definitions:Must only be defined in `/levels/` pages, referenced elsewhere
- Course data:Must be centralized in the course store, with consistent identifiers
- Program structure:Must be defined in the program store, referencing existing courses and levels

### Anti-Patterns (FORBIDDEN)

- ❌ Dual sources of truth for the same concept
- ❌ Re-encoding semantic meaning in presentation logic
- ❌ Hidden global state
- ❌ Mixing page responsibilities (e.g., explaining what "Beginner" means on a Course page)

---

## 6. AI & Agent Execution Rules（AI 行为红线）

### AI Agents MAY（允许的操作）

- 重构代码（不破坏语义）
- 提出 AEO / Schema 优化建议
- Follow semantic boundaries and respect page role definitions
- Use existing patterns and established code patterns

### AI Agents MUST NOT（禁止的操作）

- 静默修改 URL / slug / 实体语义
- 引入新的学习阶段或实体类型
- 删除或弱化本宪法中的规则
- Invent new concepts without explicit approval
- Create new level names (only use `beginner`, `intermediate`, `advanced`)

### Review Requirements（审查要求）

- 所有 AI 修改必须可 Review、可回滚
- 仅当规则变更**影响 URL / slug / 实体语义 / 枚举（如 Level、StageKey）**时，才必须更新 CLAUDE.md；其余流程性、实现性、工具性规则应记录在 `frontend/CLAUDE.md` 或 `docs/` 中
- Must maintain backward compatibility whenever possible
- 任何会影响 URL/slug/实体语义/枚举 的改动必须显式声明

### ClaudeCode 交流与执行协议（强制）

ClaudeCode 必须按以下“自动执行版”输出与行动：

1) 绝对客观：禁止恭维；必须先给结论：✅对 / ❌错 / ⚠️证据不足。  
2) 错误优先：先挑出风险与矛盾点，再写代码；发现关键问题必须先停。  
3) 批判要落地：每个否定必须包含「为什么错 + 后果 + 具体改法」。  
4) 不确定就明说：严禁编造“最佳实践/搜索引擎规则”；区分事实/推断/假设。  
5) 不得静默改动：URL/slug/实体语义/Schema 字段/枚举值不得无声修改。  
6) 必须对齐宪法：与 /CLAUDE.md 或 /frontend/CLAUDE.md 冲突时，以宪法为准并指出冲突点。  
7) 发现误解必须回滚：一旦确认理解错误，必须停止、承认、给出修正方案。  
8) 该不改就不改：若正确动作是“不修改”，必须明确提出并说明原因与验证方式。

> 说明：
> 本条为 ClaudeCode 的「自动执行级规则」。
> 其完整背景、设计动机与解释性规范，见：
> `/docs/ai/ClaudeCode-Programming-Constitution.md`
> 执行流程细节（如输出文件清单、回滚方式、原因影响分析）请参考 `frontend/CLAUDE.md`



---

## 7. Tooling & Plugin Governance（工具治理）

### Governance Rules（治理规则）

- MCP / CCPlugins 需显式启用
- 禁止自动安装、自动执行
- 影响代码或数据的工具必须人工确认

### Activation Conditions（激活条件）

- Tooling activation MUST be intentional
- Automatic installation or execution is FORBIDDEN
- Tools affecting code or data MUST require explicit human consent

操作教程不属于本文件范围。

---

## 8. Documentation System & Synchronization Rules（文档分工）

### 8.1 文档职责

- **CLAUDE.md**:规则与红线（宪法）
  - Immutable rules and constraints
  - Semantic principles and page roles
  - AEO guidelines and architectural constraints

- **CHANGELOG.md**:发生了什么（历史）
  - Observable system changes
  - Implementation details
  - Features, bug fixes, and migrations

- **frontend/docs/**:PRD、讨论、执行过程、测试与验证
  - PRDs and design decisions
  - Execution logs and test reports
  - Validation and verification records

### 8.2 同步原则

- 规则变化 → 更新 CLAUDE.md
- 可观测变化 → 更新 CHANGELOG.md
- 过程细节 → 更新 docs/

**Synchronization Protocol**:
- Rule change → update `CLAUDE.md`
- Observable behavior change → update `CHANGELOG.md`
- Process detail → update `frontend/docs/`

Documents MUST NOT duplicate responsibilities.

---

## 9. Enforcement & Review Protocol（执行与审查）

### Violation Handling（违规处理）

- 所有违反本宪法的修改必须被修正
- 临时例外需显式记录
- Review Checklist 必须引用本文件

### Review Requirements（审查要求）

- Violations of this constitution MUST be corrected
- Temporary exceptions require explicit documentation
- Review checklists MUST reference this document（审查标准详见 §6）

---

## Appendix（非规范性附录）

本节内容仅供说明与预案使用,不具备强制约束力。

### Example JSON-LD Structures

> ⚠️ 警告：以下示例仅供参考，**严禁直接复制**。使用时必须与页面内容逐项核对，确保 Schema 与实际内容真实一致。

#### Course Page JSON-LD Example
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "AI Photoshop Design Beginner",
  "description": "Learn the basics of AI-powered Photoshop design.",
  "educationalLevel": {
    "@type": "DefinedTerm",
    "name": "Beginner",
    "@id": "https://www.doviai.com/levels/beginner"
  },
  "educationalUse": ["Lecture", "Demonstration", "Exercise"],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CNY",
    "availability": "https://schema.org/InStock"
  }
}
```

#### Level Page JSON-LD Example
```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "Learning Levels",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "name": "Beginner",
      "description": "适合零基础学员,提供软件基础和快速理解的免费课程。",
      "url": "https://www.doviai.com/levels/beginner"
    }
  ]
}
```

### Common Mistakes to Avoid

1. **Mixing page responsibilities**:For example, explaining what "Beginner" means on a Course page
2. **Using incorrect level terms**:Using `basic` instead of `beginner` in slugs or structured data
3. **False Schema.org claims**:Claiming to teach skills not actually covered in the course
4. **Semantic overlap**:Having Program pages repeat course content instead of focusing on learning order
5. **Ignoring single source of truth**:Defining level meanings in multiple places

### Priority 1.5 — Topic Hub（/t/，语义聚合实体 · 非教学）

**`/t/`（Topic Hub）** 是主题级语义聚合实体，用于：
- 跨 Course / Skill / HowTo / FAQ 的主题归档
- 构建稳定的主题语义锚点
- 作为站内内链与语义关联的中心节点

#### 语义边界（强制）

- `/t/` **不定义** 学习阶段（Level）
- `/t/` **不定义** 学习顺序或学习路径
- `/t/` **不具备** 教学结构主权
- `/t/` **不得表现为** Program / Path / Skill

#### 允许的职责

- ✅ 按“主题相关性”聚合内容
- ✅ 作为内链与语义推荐中心
- ✅ 关联 Course / Skill / HowTo / FAQ（非顺序、非依赖）

#### 禁止的行为（FORBIDDEN）

- ❌ 使用 `hasPart` 表达教学结构
- ❌ 表达先学 / 后学、阶段划分
- ❌ 替代或弱化 Program / Path 的结构主权
- ❌ 在 `/t/` 中解释 Beginner / Intermediate / Advanced 含义

#### AEO / Schema 原则

- `/t/` 仅作为 **主题聚合语义节点**
- Schema 类型应使用 `Thing` 或等价的**非教学型**轻量语义类型
- 不得输出 Course / EducationalOccupationalProgram / DefinedTermSet

### AEO Entity Expansion Plan（预案 · 非激活）

#### 实体优先级路线图（非承诺）

* Priority 0：Course / Program / Level（已激活）
* Priority 1：Skill（/skills/{slug}）
* Priority 1.5：Topic Hub（/t/）
* Priority 2：Role / Career（如 /roles/{slug}）
* Priority 3：Tool / Glossary / Other abstractions

#### 字段预留规则（Interface Reservation）

* 允许在数据模型中预留但不得启用以下字段：
  `skills / tools / targetRoles / topics / levelRef / programRef`
* 禁止在页面、JSON-LD、站点地图中提前暴露这些实体

#### 实体启用强制流程（Activation Gate）

* 内容成熟 → 页面模板 → Schema → sitemap → 内链 → Search Console 监控
* 缺任一步，实体不得激活

#### 强制声明

* 本节仅为长期规划预案
* 不构成当前系统的一部分
* AI 不得基于本节自动创建页面、路由或 JSON-LD

### 预案约束规则

本 Appendix 中的任何未来实体规划
**不得反向修改、弱化或解释 CLAUDE.md 正文中的既有规则**。

---

## Final Principles

> **`CLAUDE.md（根目录） = 项目的语义宪法`**
> **`frontend/CLAUDE.md = 前端执行细则`**

This document defines the core semantic principles that guide all development decisions.
All AI agents, contributors, and future refactors must comply with these rules to maintain
consistent AEO / LRMI semantic alignment and optimal search engine understanding.

---

*Version: 2.0.1*
*Last restructured: 2025-12-25*
