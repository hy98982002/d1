# 更新日志

本文件记录了该项目的所有重要变更。

本文件仅记录**变更内容**，不记录变更原因或方式。

---

## [2026-01-04]

### 宪法规则更新
- **更新 AEO 语义主权规则**: 在根 `/CLAUDE.md` 的 "AEO 语义主权：Program / Skill / Path（强制）" 章节下添加了完整的 Skill 实体规则：
  - ✅ 已存在规则：Skill MAY be supported by standalone foundational Courses，Such Courses MUST represent cross-program, cross-domain prerequisites，and MUST NOT encode program-level progression
  - ✅ 新增规则：Skill entities represent ability abstractions. They MUST NOT define learning order, levels, or program-level progression.
  - ✅ 新增规则：Programs are structured learning paths that support a Skill. A Skill MUST NOT be defined as containing or owning Programs.

### 执行守卫（Execution Guards）更新
- **新增 3 个语义边界守卫**: 
  - `03-SEMANTIC-PROGRAM-PATH-GUARD.md`: 防止 Program 与 Path 的语义混淆
  - `04-SEMANTIC-SKILL-BOUNDARY-GUARD.md`: 确保 Skill 保持为能力抽象层
  - `05-SEMANTIC-STORE-DECOUPLING-GUARD.md`: 防止基于存储结构的语义耦合
- **更新 Guard 执行顺序**: 在 `/CLAUDE.md` 的 "Execution Guards（Mandatory, Ordered）" 部分添加了新的守卫顺序

### 前端执行细则更新
- **更新 frontend/CLAUDE.md**: 
  - ✅ 新增 "Skill Page Presentation Rules" 章节，包含：
    - Rule 6.1: Tool Expression - Tools MUST be presented as dependencies, not prerequisites on Skill pages
    - Rule 6.2: Practice Expression - Skill-level Practices MUST describe verifiable outcomes, not guarantees or marketing claims
  - ✅ 新增三个补丁级澄清说明：
    - Program ≠ Path 的前端澄清：Program 页面在前端术语中可称为学习路径，但语义上它们代表有序的教学结构，不得视为推荐路径
    - Store 混合承载的语义澄清：Course、Program 和 Stage 数据在 courseStore.ts 中的共存仅为实现便利，不得解释为语义所有权、层次结构或耦合
    - Skill 页与 Course 引用的边界澄清：Skill 页面不得枚举或深度链接 Courses 作为学习内容，仅允许将基础 Courses 作为外部先决条件引用
  - ✅ 更新版本信息从 1.0.2 到 1.0.4
  - ✅ 更新最后修改日期为 2026-01-04

## [2026-01-02]

### 核心原则新增
- **添加 AEO 第一原则**: 在根 `/CLAUDE.md` 中添加了 "### Semantic Identity Isolation (AEO First Principle)"，明确规定："If an identifier participates in @id, it must never participate in navigation, localization, or ranking signals."

### 规则新增与优化
- **新增 2 个 CI 级 ERROR 规则**: 
  - `no-entity-id-in-page-metadata.js`: 禁止实体 @id 出现在页面元数据（canonical/hreflang/og:url/twitter:url）中
  - `entity-namespace-not-indexable.js`: 确保 `/ _entity /` 是语义命名空间，仅包含机器可读内容，禁止 HTML 页面
- **修复规则误杀风险**: 调整 `entity-namespace-not-indexable.js` 规则，仅对 `.html|.vue` 文件进行检查，避免误杀合法的纯 JSON/LD/RDF 文件

### 文档更新
- **更新 frontend/CLAUDE.md**: 
  - 添加 "Entity Namespace Specification" 部分，定义 `/ _entity /` 为语义命名空间
  - 明确 `/ _entity /` 仅包含机器可读资源，禁止 HTML 页面
- **添加变更记录**: 在 frontend/CLAUDE.md 中添加了今天的变更记录

### 工具更新
- **更新 aeo-lint 规则集**: 将新规则整合到 aeo-lint 工具中
- **优化规则检查逻辑**: 确保规则正确识别文件类型和内容，减少误报

## [2025-12-31]

### 工具新增
- **完整开发 aeo-lint 工具**: 创建了工程级 AEO 结构防火墙，用于在本地/CI阶段自动阻断结构上必然错误的语义与 AEO 违规
- **实现工具核心架构**: 
  - `scan.js`: 文件扫描，支持排除 node_modules、dist/build、.git 目录
  - `utils/report.js`: 统一输出，优化 ERROR 和 WARN 的输出顺序
  - `index.js`: CLI 入口，支持指定目标目录

### 规则新增
- **实现 8 个 AEO 规则**: 
  - **ERROR 级别规则**: 
    - `level-url.js`: Level URL / Query 禁止（L1）
    - `jsonld-level.js`: JSON-LD Level 表达规则（L2）
    - `program-course.js`: Program / Course 关系规则（P1）
    - `ui-leak.js`: UI 状态不得进入语义层（UI1）
    - `level-id-stability.js`: Level @id 跨语言稳定性（N1）
    - `topic-program.js`: Topic/Tag 禁止 isPartOf Program（N2）
  - **WARN 级别规则**: 
    - `level-centrality.js`: Level 中心性规则（L3）
    - `course-atomic.js`: Course 原子性规则（C1）
- **整合现有规则**: 明确 `level-name-translation.js` 的级别区分（语言展示差异为 WARN，slug/@id/JSON-LD 中翻译为 ERROR）

### 文档更新
- **编写 aeo-lint README.md**: 详细记录工具定位、设计原则、与整体体系的关系、目录结构、规则总览、扫描范围、运行方式、输出规范、扩展与维护原则等
- **调整 README.md 结构**: 更新为更清晰的文档结构，包含定位与原则、与整体体系的关系、目录结构、规则总览、扫描范围与排除规则、运行方式、输出规范、扩展与维护原则、最终声明等章节
- **完善工具定位与原则**: 明确 aeo-lint 作为工程级静态扫描工具的定位，强调不依赖 LLM、不做语义理解、只检查结构路径字段关系、误杀可接受漏检不可接受的设计原则
- **明确与整体体系关系**: 清晰定义 aeo-lint 与 CLAUDE.md 和 Execution Guards 的关系，形成完整的语义治理体系
- **规范目录结构**: 定义终态目录结构，明确各文件职责
- **优化规则总览**: 按照 ERROR 和 WARN 级别分类，明确规则编号和具体内容
- **定义扫描范围与排除规则**: 明确默认扫描文件类型和强制排除目录
- **规范运行方式**: 提供本地运行和 CI 集成示例
- **统一输出规范**: 明确 ERROR 优先输出，WARN 次级输出，最后输出 summary
- **制定扩展与维护原则**: 规定新规则只能新增，不得修改既有规则语义，所有 ERROR 规则必须对应 /CLAUDE.md 中的明确红线
- **添加附录内容**: 
  - **Appendix C**: 工程示例与执行细节，包含 CLI 输出示例、level-name-translation 规则等级说明、执行路径示例和明确不支持的能力
  - **Appendix D**: 版本冻结与变更控制，确立规则语义冻结原则、允许的变更类型、明确禁止的变更、规则变更的唯一合法流程、审计与追责机制和终态声明
- **强化最终声明**: 明确 aeo-lint 作为工程级防火墙的地位，只负责发现结构上不可能正确的状态并阻止其进入主分支
- **统一命名规范**: 移除 claudex 命名，直接统一到 aeo-lint
- **保持 CLAUDE.md 独立性**: 确保 aeo-lint 规则不写入宪法，规则的唯一立法源始终是 /CLAUDE.md

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
- **组织 Guard 文件**: 在 docs/ai/ 下创建 guards 文件夹，统一存放 Guard 类文件
- **规范 Guard 命名**: 按照 {NN}-{SCOPE}-{ENTITY}-GUARD.md 格式重命名 Guard 文件，确保加载顺序和作用域清晰
- **更新 Guard 引用**: 将 CLAUDE.md 中的 Execution Guards 引用路径更新为新的文件路径

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

