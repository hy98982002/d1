# 更新日志

本文件记录了该项目的所有重要变更。

本文件仅记录**变更内容**，不记录变更原因或方式。

---

## [2025-12-31]

### 文档治理
- **整合 frontend/CLAUDE.md AEO 规则**: 将分散的 AEO 相关内容归并到新的统一章节 "AEO / Structured Entity Rules (Hard Constraints)"
- **新增两条硬规则**: 添加了语言无关的实体 ID 规则和 Level 实体名不可翻译规则
- **建立 AEO 总目录**: 创建了包含 Entity Identity、Level/Program/Course 分离、JSON-LD 输出契约的完整 AEO 规则体系
- **明确文档职责边界**: 解释了为什么 AEO 执行细则应放在前端 CLAUDE.md 而非根宪法
- **添加变更清单**: 在 frontend/CLAUDE.md 中添加了详细的变更记录
- **更新版本信息**: 将 frontend/CLAUDE.md 版本从 1.0.0 更新到 1.0.1
- **修正 AEO 规则结构**: 分离 UI/State 规则与 AEO 实体规则，确保 AEO 章节只包含 Level/Program/Course 实体相关规则
- **提升 Level 实体名规则级别**: 将 Level 实体名不可翻译规则提升为 Entity Identity & Canonical IDs 小节下的同级硬规则
- **修复 JSON-LD 引用**: 将课程 JSON-LD 规则中的页面 URL 引用修改为 Level canonical entity @id 引用
- **优化规则表述**: 为硬规则添加编号，提高可读性和执行权重
- **补充 Entity Identity 规则**: 完善了 Entity Identity & Canonical IDs 规则，明确指定使用 /_entity/ 下的语言无关 canonical @id
- **添加 hreflang 规则**: 新增 "hreflang & Entity Identity Separation (Hard Rule)" 小节，明确 hreflang 必须只引用页面 URL，不能使用实体 @id
- **添加 Level 完整性执行协议**: 创建 docs/ai/LEVEL_INTEGRITY_EXECUTION_PROMPT.md 执行协议，并在 CLAUDE.md 中添加引用声明
- **添加 Program/Course 执行协议**: 创建 docs/ai/PROGRAM_COURSE_GUARD.md 执行协议，规范 Program 和 Course 实体的关系
- **重构执行守卫引用**: 将独立的 Level Integrity Execution Gate 重构为统一的 Execution Guards 小节，同时引用 Level 和 Program/Course 守卫

---

## [2025-12-30]

### 工具新增
- **添加aeo-lint工具**:创建了tools/aeo-lint目录，实现了Level实体名称翻译检查规则
- **实现level-name-translation规则**:新增rules/level-name-translation.js规则，用于检测并禁止在AEO语境中使用中文翻译的Level实体名称（如初级、进阶等）
- **支持目录递归扫描**:工具支持对文件和目录进行递归扫描，检查Vue、MD、JS、TS等文件类型
- **实体锚点检查**:仅在出现实体锚点（Beginner/Intermediate/Advanced//levels/educationalLevel）时触发错误，避免误杀普通中文文本
- **紧邻语境匹配**:使用严格的正则表达式，只匹配同一行内紧邻的Level翻译和语境词
- **白名单机制**:允许正常的中文词汇如"能力进阶"、"高级功能"等通过检查

## [2025-12-28]

### 文档治理
- **更新AI_EXECUTION_CONTEXT.md**:添加Accessibility & Keyboard Interaction (A11y Mandatory Rules)章节，包含WCAG 2.1 AA合规要求、键盘导航规则、禁止的实践、焦点可见性规则和减少动画支持
- **更新AI_EXECUTION_CONTEXT.md**:在A11y章节末尾添加弱引用，指向common implementation patterns文档

## [2025-12-27]

### 文档治理
- **生成One-Click Prompt Template中文版**:新增中文版一键提示模板，方便中文环境下的AI代理使用
- **生成START_TASK.block中文版**:新增docs/ai/START_TASK.block-cn.md，为AI代理提供中文任务开始模板
- **更新CLAUDE.md**:在AI执行协议部分添加了Mandatory Task Start Protocol引用，规范AI代理的任务开始流程
- **清理CLAUDE.md**:对Mandatory Task End Protocol部分进行严格清理，只保留标题和引用行，删除冗余解释内容
- **更新docs/ai/END_TASK.block.md**:在文件末尾添加了Authority & Scope部分，明确文档的权限和范围
- **生成CLAUDE_UPDATE_HINT.block中文版**:新增docs/ai/CLAUDE_UPDATE_HINT.block-cn.md，为AI代理提供中文版本的CLAUDE.md更新触发提示模板
- **生成GOVERNANCE_COMMANDS中文版**:新增docs/ai/GOVERNANCE_COMMANDS-cn.md，为AI代理提供中文版本的AI治理控制命令文档

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

