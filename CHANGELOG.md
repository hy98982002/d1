# 更新日志

本文件记录了该项目的所有重要变更。

本文件仅记录**变更内容**，不记录变更原因或方式。

---

## [2025-12-27]

### 文档治理
- **生成One-Click Prompt Template中文版**:新增中文版一键提示模板，方便中文环境下的AI代理使用
- **生成START_TASK.block中文版**:新增docs/ai/START_TASK.block-cn.md，为AI代理提供中文任务开始模板

## [2025-12-26]

### 文档治理
- **前端技术债修正说明**:生成了前端技术债修正说明文档，指出当前前端代码中违反宪法规则的部分
- **任务概述记录**:将本次任务的完整概述添加到CHANGELOG.md
- **CLAUDE.md AI工作上下文地图**:在根目录CLAUDE.md中添加AI Working Context Map，明确各文档职责边界与优先级，指导AI代理理解项目文档体系
- **创建DEPLOY_NOTES.md**:将部署、构建、环境配置从AI执行上下文中分离，避免污染AI执行上下文
- **细化AI_EXECUTION_CONTEXT.md**:移除规范性语言，确保其仅作为工程现实背景材料，不作为次要宪法

---

## [2025-12-25]

### 文档治理
- **CLAUDE.md 宪法级升级到 2.0.1**:进行了多轮宪法级修改和极致洁癖微调
  - 修改顶部强制要求为默认策略+允许例外
  - 明确索引页JSON-LD规则
  - 优化Course Slug Format为语义约束+可选段
  - 收紧Review Requirements的规则变更范围
  - 增强附录示例安全性
  - 新增Priority 1.5 — Topic Hub定义
  - 新增AEO Entity Expansion Plan（预案·非激活）
  - 新增预案约束规则
  - 微调正文Topic定义的语义预留
  - 收紧Topic Hub的Schema类型描述
  - Review Requirements的职责去重
  - 更新版本号至2.0.1

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

