# CLAUDE.md

**🔥 强制要求：**

- **语言：所有交流必须使用中文，包括 bmad 代理、CCPlugins 命令和任何工具调用的对话**
- **文件读取：项目内文件必须使用 Claude 内置 Read 工具，禁用 mcp filesystem 工具**

本文件为 Claude Code (claude.ai/code) 在此代码仓库中工作时提供指导，定义项目的长期规则和强制约束。

## 文档职责说明

### 项目文档体系

| 文档 | 职责 |
|------|------|
| **CLAUDE.md** | 项目的语义宪法，定义长期规则和强制约束 |
| **CHANGELOG.md** | 记录系统/架构/AEO/路由/实体的可观测变化 |
| **frontend/docs/** | 记录 PRD、讨论、执行过程、测试与验证 |

### 职责边界

- **CLAUDE.md**: 定义"应该遵循什么规则"，不包含时间线、一次性事件或已完成事项
- **CHANGELOG.md**: 记录"发生了什么变化"，使用标准的 Added/Changed/Fixed/Removed 格式
- **frontend/docs/**: 存储"过程记录"，包括 PRD 文档、多轮讨论、执行过程和测试验证

## 项目概述

多维 AI 课堂 - 基于 Vue 3 + Django 构建的在线教育服务全栈 Web 应用。项目采用前后端分离架构，使用 JWT 身份验证。

## 项目目标与长期定位

### Project Vision & Long-Term Direction

- **平台定位**: 基于 Vue 3 + Django 构建的在线教育服务全栈 Web 应用，专注于 AI 课程的 AEO / LRMI 语义优化
- **核心技术**: Vue 3, Django, Pinia, Vue Router 4, TypeScript
- **AEO / SEO 优先级**: 遵循 Schema.org + LRMI + AEO 最佳实践，构建高质量的教育内容知识图谱
- **用户体验**: 提供清晰的学习路径，优化语义结构，提升搜索引擎理解和用户导航体验

## 内容与语义宪法

### Content Semantic Responsibility & AEO Page Roles

> This section defines constitutional-level semantic boundaries.
> Violations are considered architecture-level errors.

### Page Role Definitions (Must Follow)

To ensure correct AEO / LRMI semantic alignment, each page type MUST follow a single, non-overlapping responsibility.

#### 1. Course Pages
**Purpose**: Explain *what this specific course teaches*.

- Focus on: course content, skills taught, outcomes, syllabus, lessons
- MUST NOT explain global learning stages or learning order
- JSON-LD focus: Course, CourseInstance, educationalLevel (reference only)

> A Course page answers:
> "What will I learn in THIS course?"

---

#### 2. Level Pages (`/levels/`)
**Purpose**: Define *what a learning level means*.

- Focus on: Beginner / Intermediate / Advanced definitions
- Explain learner prerequisites, expected skills, learning difficulty
- Aggregate courses that belong to this level
- JSON-LD focus: DefinedTerm (educationalLevel entity)

> A Level page answers:
> "What does Beginner / Intermediate / Advanced mean?"

---

#### 3. Program / Path Pages
**Purpose**: Describe *learning sequence and progression*.

- Focus on: learning order, prerequisites, progression logic
- Connect multiple courses and/or levels into a structured path
- MUST NOT redefine level meanings
- JSON-LD focus: EducationalOccupationalProgram, hasPart, programPrerequisites

> A Program / Path page answers:
> "What should I learn first, then next, and why?"

---

### Forbidden Semantic Overlaps

- ❌ **Course pages**: Must NOT explain global learning stages or define what "Beginner" means
- ❌ **Level pages**: Must NOT teach specific course content or define learning order
- ❌ **Program pages**: Must NOT repeat course content or redefine level meanings
- ⚠️ **Rule**: A page MUST NOT take over responsibilities from another page type. Semantic responsibility overlap is considered a structural error.

## URL / Slug 宪法

### URL & Slug Canonical Rules

### Slug 的语义原则

- **slug ≠ 展示用**: Slugs are not for display purposes but for semantic anchoring
- **slug = 长期稳定语义锚点**: Slugs should remain stable over time to maintain SEO value
- **SEO / AEO 优先**: Slugs must follow AEO / LRMI best practices for optimal semantic understanding

### Course Slug Rules

- **Format**: `{topic}-{tool}-{level}`
- **Level part**: Must use system-defined level terms (`beginner` / `intermediate` / `advanced`)
- **Example**: `photoshop-ai-design-beginner`
- **禁止**: Using descriptive terms like `basic` instead of system-level terms

### Level & Program Slug Rules

- **Level pages**: `/levels/beginner`, `/levels/intermediate`, `/levels/advanced`
- **Program pages**: `/programs/ai-design-path`, `/programs/machine-learning-bootcamp`
- **Semantic clarity**: Slugs must clearly indicate the page type and purpose

## AEO / Schema / LRMI 宪法

### Schema 的“真实表达原则”

- ❌ **No false claims**: JSON-LD must accurately reflect the actual course content
- ✅ **Verifiable content**: All Schema.org claims must be verifiable from the page content
- ✅ **Semantic consistency**: JSON-LD terms must match page semantics and URL structure

### educationalLevel 使用规则

- **Must use DefinedTerm**: Avoid plain strings like `Literal[value='basic']`
- **Use Beginner instead of basic**: All educationalLevel references must use `beginner` instead of `basic`

### JSON-LD 生成函数中的映射

- **educationalLevel**: Must use DefinedTerm format with proper mapping
- **Example**: `"educationalLevel": {"@type": "DefinedTerm", "name": "Beginner", "@id": "https://www.doviai.com/levels/beginner"}`

## 最终原则

> **`CLAUDE.md（根目录） = 项目的语义宪法`**
> **`frontend/CLAUDE.md = 前端执行细则`**

This document defines the core semantic principles that guide all development decisions.
All AI agents, contributors, and future refactors must comply with these rules to maintain
consistent AEO / LRMI semantic alignment and optimal search engine understanding.