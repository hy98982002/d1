# 更新日志

本文件记录了该项目的所有重要变更。

本文件仅记录**变更内容**，不记录变更原因或方式。

---

## [2025-12-21]

### 文档治理
- **CLAUDE.md 重构完成**:将原始 CLAUDE-original.md 重组为 9 大章节 + Appendix 的终态宪法结构
  - 移除所有带日期的历史记录,迁移至本文件
  - 移除阶段性说明和临时性内容
  - 保留并升格所有永久性规则
  - 强化了 AEO / Schema 语义约束
  - 完善了文档治理体系说明（CLAUDE.md / CHANGELOG.md / frontend/docs 职责分离）

---

## [2025-12-08]

### 新增
- 引入了 `/levels/` 实体，定义了初级 / 中级 / 高级。
- 在 `/t/` 下添加了主题聚合页面。
- 实现了 Program 动态路由 `/program/:slug`,支持 `aigc-intermediate` 和 `ai-designer-advanced`。
- 新增 Program 相关类型定义和 Store 方法（`getProgramBySlug`, `programExists`, `getProgramCourses`）。
- 实现了 Program 页面的动态 Meta 标签和 JSON-LD 生成。
- 集成了 Sitemap 自动生成到构建流程（`scripts/generate-sitemap.js`），支持 16 个 URL。

### 变更
- 将学习阶段名称从 `basic` 统一改为 `beginner`。
- 明确了主题聚合与学习路径之间的语义分离。
- 使用 hasPart / isPartOf 标准化了学习路径与课程之间的关系。
- 完成了课程体系从 7 层到 3 层（Beginner/Intermediate/Advanced）的重构。
- 实现了 `assertStageKey` 运行时校验，确保 fail-fast。

### SEO 优化
- 实现了 `buildProgramJsonLd` 工具函数，支持 Schema.org EducationalOccupationalProgram。
- 配置了 robots.txt，允许搜索引擎抓取，禁止私密页面。
- 实现了动态 Meta 标签管理（title, description, og:*, twitter:*）。

---

## [2025-12-01]

### 变更
- 重构了首页课程分组逻辑，以与 StageKey 系统保持一致。
- 改进了课程详情页的路由稳定性。

---

## [2025-11-20]

### 新增
- 在 `/programs/` 下添加了初始学习路径页面，包含有序的课程序列。

---

## [2025-11-05]

### 修复
- 纠正了将学习路径用作无序容器的语义错误。

