# CLAUDE.md

**🔥 强制要求：**

- **语言：所有交流必须使用中文，包括 bmad 代理、CCPlugins 命令和任何工具调用的对话**
- **文件读取：项目内文件必须使用 Claude 内置 Read 工具，禁用 mcp**filesystem**\*工具**

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
主题页用于**按主题聚合课程**。

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
- Format:`{topic}-{tool}-{level}`
- Level part:Must use system-defined level terms (`beginner` / `intermediate` / `advanced`)
- Example:`photoshop-ai-design-beginner`

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

LRMI 仅用于教育语义字段（educationalLevel 等）。

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
- All rule changes must be documented in CLAUDE.md
- Must record change reasons and impact
- Must maintain backward compatibility whenever possible

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
- Review checklists MUST reference this document

---

## Appendix（非规范性附录）

本节内容仅供说明与预案使用,不具备强制约束力。

### Example JSON-LD Structures

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

### Future Entity Proposals

（本节预留用于未来实体草案）

---

## Final Principles

> **`CLAUDE.md（根目录） = 项目的语义宪法`**
> **`frontend/CLAUDE.md = 前端执行细则`**

This document defines the core semantic principles that guide all development decisions.
All AI agents, contributors, and future refactors must comply with these rules to maintain
consistent AEO / LRMI semantic alignment and optimal search engine understanding.

---

*Version: 2.0.0*
*Last restructured: 2025-12-21*
