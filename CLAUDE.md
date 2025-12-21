# CLAUDE.md

This document defines the immutable rules, semantic contracts, and AI-execution constraints of this project.

This is a constitution, not a changelog, not a notebook, and not a discussion log.

All human and AI changes MUST comply with this document.

---

## 1. Scope & Authority（适用范围与权威）

本宪法适用于：

- frontend/
- backend/（如存在）
- 项目整体的语义结构、AEO 设计与文档治理体系

所有人类开发者与 AI Agent（Claude / Codex / Cursor / Trae）  
**必须遵守本文件中的规则。**

如本文件与其他说明发生冲突，**以 CLAUDE.md 为最高优先级**。

---

## 2. Content & Semantic Constitution（内容与语义宪法）

### 2.1 Page Responsibility Definitions（页面职责定义）

#### Course（/course/）
课程页面表示**一门独立的教学单元**。

- 说明：课程教什么、学什么、产出什么
- 包含：课程内容、技能目标、学习成果、章节结构
- MUST NOT：定义学习顺序或学习路径

---

#### Topic（/t/{topic}）
主题页用于**按主题聚合课程**。

- 只负责“内容相关性”
- 不表达先后顺序
- MUST NOT：表现为 Program 或 Path

---

#### Program（/programs/{program}）
体系课页面，表示**有明确顺序的学习路径**。

- Courses are intentionally ordered
- 用于表达“先学什么 → 再学什么”
- 是结构化学习的核心单位

---

#### Path（/paths/{path}）
路径页用于**宏观学习路线聚合**。

- MAY 聚合多个 Program
- DOES NOT 取代 Program 的顺序定义

---

#### Levels（/levels/）
学习阶段定义页，仅用于解释阶段语义。

- Levels 是枚举，不是课程
- 不承载具体教学内容

---

#### FAQ / HowTo
用于问答与教程型搜索。

- MUST NOT：重新定义课程或体系课语义

---

### 2.2 Entity Relationship Rules（AEO 实体关系）

#### Mandatory Relationships

- Program → Course：hasPart  
- Course → Program：isPartOf

- Topic → Course：about / mentions

#### Forbidden Relationships

- Topic MUST NOT use hasPart
- Course MUST NOT define position outside Program context
- Program MUST NOT act as unordered aggregation

---

### 2.3 Naming & Enumeration Rules（唯一命名源）

#### StageKey Enumeration（唯一合法枚举）

# beginner | intermediate | advanced

- `basic` is FORBIDDEN
- 枚举值必须在以下位置完全一致：
  - URL slug
  - UI 文案
  - JSON-LD
  - 内部数据模型

---

#### Slug Rules

- Slugs MUST be semantic and stable
- Slugs MUST NOT encode transient UI state
- Slug meaning MUST match page content meaning

---

## 3. Routing & URL Canonical Rules（路由与规范）

- `/course/`：原子教学单元
- `/t/`：主题聚合
- `/programs/`：有序学习路径
- `/paths/`：宏观学习路线

Canonical rules:

- 每个实体只有一个 canonical URL
- Slug 变更必须提供 redirect
- 影响索引的路由变化 MUST 记录在 CHANGELOG.md

---

## 4. Data & Schema Rules（Schema / LRMI）

- 所有 Course / Program / Level 页面 MUST 提供 JSON-LD
- Schema 必须与页面内容真实一致
- 禁止夸大技能、成果或前置条件

LRMI 仅用于教育语义字段（educationalLevel 等）。

---

## 5. Coding Philosophy & Architectural Constraints（编码哲学）

以下原则为**长期约束**：

- 显式优于隐式
- 状态必须可追溯、可调试
- 避免将业务语义编码进 UI 表现层
- 禁止同一概念存在多个真源

---

## 6. AI & Agent Execution Rules（AI 行为红线）

AI Agents MAY：

- 重构代码（不破坏语义）
- 提出 AEO / Schema 优化建议

AI Agents MUST NOT：

- 静默修改 URL / slug / 实体语义
- 引入新的学习阶段或实体类型
- 删除或弱化本宪法中的规则

所有 AI 修改必须可 Review、可回滚。

---

## 7. Tooling & Plugin Governance（工具治理）

- MCP / CCPlugins 需显式启用
- 禁止自动安装、自动执行
- 影响代码或数据的工具必须人工确认

操作教程不属于本文件范围。

---

## 8. Documentation System & Synchronization Rules（文档分工）

### 8.1 文档职责

- **CLAUDE.md**：规则与红线（宪法）
- **CHANGELOG.md**：发生了什么（历史）
- **frontend/docs/**：PRD、讨论、执行过程、测试与验证

### 8.2 同步原则

- 规则变化 → 更新 CLAUDE.md
- 可观测变化 → 更新 CHANGELOG.md
- 过程细节 → 更新 docs/

---

## 9. Enforcement & Review Protocol（执行与审查）

- 所有违反本宪法的修改必须被修正
- 临时例外需显式记录
- Review Checklist 必须引用本文件

---

## Appendix（非规范性附录）

本节内容仅供说明与预案使用，不具备强制约束力。
