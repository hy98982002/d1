# AI_EXECUTION_CONTEXT.md

## 1. 文档说明

本文档用于帮助 AI 在执行宪法级代码调整前，正确理解项目全貌。
- 该文档不具备约束力
- 仅包含不属于宪法规则，但对 AI 理解和改造当前前端代码至关重要的信息
- 文风为“说明书 / 背景材料”，而非规范或指南

## 2. 项目历史背景

### 2.1 体系迁移

**旧体系**：7层递进式学习体系
- 体验 → 入门 → 精进 → 实战 → 项目落地 → 会员专区 → 就业班

**新体系**：三级体系（LRMI + Schema.org + AEO 最佳实践）
- Beginner（免费入门）：软件基础、快速理解
- Intermediate（进阶实战）：技能训练、任务练习
- Advanced（高阶训练）：企业项目、商业案例

**迁移状态**：已完成核心重构，包括：
- 实现语义页面角色
- 更新课程 slugs，将 `-basic` 替换为 `-beginner`
- 增强结构化数据，实现 DefinedTerm 格式 for educationalLevel
- 添加 level 页面
- 实现 Program 页面的动态路由
- 增强 JSON-LD
- 优化 URL 结构
- 添加 sitemap 生成

## 3. 实际目录结构与模块划分

```
src/
├── views/                         # Page-level components (PascalCase)
│   ├── AboutView.vue             # About page
│   ├── CourseDetails.vue         # Course details page
│   ├── HomeView.vue              # Landing page
│   ├── NotFound.vue              # 404 Not Found page
│   ├── Order.vue                 # Order processing page
│   ├── PersonalCenter.vue        # User dashboard
│   ├── ShoppingCart.vue          # Shopping cart page
│   └── program/                  # Program pages
│       └── [slug].vue            # Dynamic Program component (supports program/:slug)
├── components/                    # Reusable components (PascalCase)
│   ├── AuthNavbar.vue                   # Authenticated navigation bar
│   ├── BreadcrumbNav.vue                # Breadcrumb navigation component
│   ├── CampSection.vue                  # Camp section component
│   ├── ChapterItem.vue                  # Chapter item component
│   ├── CourseCard.vue                   # Course display card/首页课程卡和hover卡
│   ├── CourseCatalog.vue                # Course catalog component
│   ├── CourseGrid.vue                   # Course grid layout
│   ├── CourseHeroCard.vue               # Hero card for course details
│   ├── CourseIntro.vue                  # Course introduction
│   ├── CourseRelated.vue                # Related courses section
│   ├── CourseReviews.vue                # Course reviews section
│   ├── CourseTabs.vue                   # Course navigation tabs
│   ├── CurriculumSection.vue            # 实战课程体系
│   ├── HeroCarousel.vue                 # Hero carousel component
│   ├── LessonRow.vue                    # Lesson row component
│   ├── LoginModal.vue                   # Login modal (手机验证码/密码/微信)
│   ├── Navbar.vue                       # Main navigation
│   ├── ProfessionalDevelopmentSection.vue # 职业技能训练体系
│   ├── RegisterModal.vue                # Registration modal
│   ├── SidebarPricingCard.vue           # Sidebar pricing card
│   ├── StageTabs.vue                    # Course stage tabs/首页每个阶段的标签
│   ├── StarRating.vue                   # Star rating component
│   ├── TeacherCard.vue                  # Teacher card component
│   ├── Toast.vue                        # Toast notification component
│   ├── WorksShowSection.vue             # Works show section
│   ├── cart/                            # Shopping cart components
│   ├── order/                           # Order processing components
│   └── personCenter/                    # Personal dashboard components
├── store/                        # Pinia state management
│   ├── index.ts                 # Store configuration
│   ├── authStore.ts             # Authentication state
│   ├── courseStore.ts           # Course data state
│   └── uiStore.ts               # UI/UX state
├── router/                       # Vue Router configuration
│   └── index.ts                 # Route definitions
├── types/                        # TypeScript definitions
│   ├── index.ts                 # Common types
│   ├── cart.ts                  # Shopping cart types
│   └── order.ts                 # Order types
├── utils/                        # Utility functions
│   ├── slug.ts                  # SEO friendly URL slug generation
│   ├── stageMap.ts              # Course stage mapping
│   ├── toast.ts                 # Toast notifications
│   └── jsonld/                  # JSON-LD structured data generation
│       ├── index.ts             # JSON-LD utilities export
│       └── buildProgramJsonLd.ts # Program JSON-LD builder
├── assets/                       # Static resources
│   ├── icons/                   # Logo and icon resources
│   ├── images/                  # Business images (course covers, avatars)
│   ├── fonts-clarity.css        # Font clarity optimization
│   └── vue.svg                  # Framework assets
├── directives/                   # Vue指令
│   └── rbac.ts                  # 权限控制指令 (v-permission, v-role)
└── config/                       # Configuration files
    ├── featureFlags.ts          # Feature Flag统一配置
    ├── baidu.json               # 百度统计配置
    └── i18n/                    # 国际化配置预留 (V1不启用)
        └── zh-CN.json           # 简体中文文案 (结构化管理)
```

## 4. 工程工具与技术栈选择

### 4.1 核心技术栈

| 技术/工具 | 版本/说明 |
|-----------|-----------|
| Vue | 3 配合 Composition API + TypeScript |
| 构建工具 | Vite |
| UI 框架 | Bootstrap 5.3.6 |
| 状态管理 | Pinia |
| 路由 | Vue Router 4 |
| API 请求 | Axios |
| 图标库 | iconfont |
| 包管理器 | pnpm |

### 4.2 开发工具

| 工具 | 用途 |
|------|------|
| TypeScript | 类型安全 |
| ESLint | 代码质量检查 |
| Prettier | 代码格式化 |
| Playwright | 端到端测试 |

## 5. 工程中的现实依赖假设

### 5.1 阶段体系

- **当前状态**：三级体系（Beginner/Intermediate/Advanced）
- **运行时校验**：`StageMeta`/`StageKeySchema` 是当前阶段数据的主要校验机制
- **Fail-fast 原则**：当前实现中，阶段数据进入 store、路由或组件前通常调用 `assertStageKey`
- **迁移假设**：当前前端代码假定仅存在三级阶段体系，并依赖这一假设进行状态管理与校验。旧阶段或映射逻辑被视为历史遗留，未来可能被进一步清理

### 5.2 Slug 规则

- **当前实现**：当前前端实现中，slug.ts 被作为主要的 slug 生成与校验工具，多个模块依赖这一实现假设
- **Course Slug Format**：当前课程 slug 通常遵循 `{topic}-{tool}-{level}` 格式
- **Level 惯例**：当前 slug 实现中，level 通常使用系统级术语（`beginner`/`intermediate`/`advanced`），以保持与现有页面和结构化数据的一致性
- **避免使用**：当前代码中较少使用描述性术语如 `basic` 或 `pro` 代替系统级术语
- **SEO 惯例**：当前实现中，暴露给搜索引擎的内容通常使用英文或中文，避免使用拼音

### 5.3 JSON-LD 实现

- **现有工具**：当前实现中已包含 `buildProgramJsonLd` 函数，用于生成 Schema.org EducationalOccupationalProgram 类型的数据
- **当前覆盖范围**：当前实现中，JSON-LD 已覆盖 Level、Type、Access、Outcome、Pathway 等多个维度。这些维度反映的是现阶段实现状态，不代表最终或唯一的结构模型
- **动态注入**：当前代码中，通常使用 `onMounted` 和 `onUnmounted` 生命周期钩子管理 JSON-LD，避免内存泄漏
- **Meta 标签支持**：当前实现中，动态 Meta 标签支持 title、description、og:_、twitter:_ 等多个社交平台

### 5.4 Sitemap 生成

- **自动生成**：当前已集成到构建流程，执行构建命令时会自动生成 `public/sitemap.xml`
- **覆盖范围**：当前生成的 sitemap 包含首页、About 页、Program 页和所有课程页
- **URL 数量**：当前实现支持生成 16 个 URL

## 6. 历史遗留或待修正的现实状态

### 6.1 页面职责越权

| 页面/组件 | 问题描述 | 违宪条款 |
|-----------|----------|----------|
| `CourseRelated.vue` | 展示相关课程推荐，可能包含路径相关功能 | 根宪法 2.1：Course 页面 MUST NOT 定义学习顺序或学习路径 |
| `CourseTabs.vue` | 管理标签切换，可能涉及学习路径的表达 | 根宪法 2.1：Course 页面 MUST NOT 定义学习顺序或学习路径 |
| `CourseCatalog.vue` | 可能同时处理课程章节和学习路径 | 根宪法 2.1：Course 页面 MUST NOT 定义学习顺序或学习路径 |

### 6.2 Program 与 Course 的结构混合

- **问题**：Program 页面和 Course 页面在结构上有混合倾向
- **表现**：`program/[slug].vue` 组件可能包含了过多 Course 页面的功能，Course 页面可能包含了 Program 页面的路径定义功能
- **影响**：削弱了 Program 页面的路径定义主权，导致页面职责不清晰

### 6.3 组件职责混乱

- **问题**：`StageTabs.vue` 组件可能在多个页面中使用，导致语义边界不清
- **影响**：降低了代码的可维护性，增加了理解代码的难度

## 7. 开发约定与最佳实践

### 7.1 Vue 3 编码标准

- 当前前端代码主要基于 Composition API 与 `<script setup>`，现有组件普遍遵循这一模式
- 大部分 `.vue` 文件使用 `<script setup lang="ts">`
- 组件命名通常使用 PascalCase
- Props/Emits 通常使用 TypeScript 接口定义
- 当前实现中，优先使用 Bootstrap 工具类而非自定义 CSS

### 7.2 状态管理

- 当前实现中，使用 Pinia 进行状态管理
- 当前代码中，每个存储通常处理一个特定域(身份验证、课程等)
- 通常使用 Vue 的 `computed()` 处理派生状态
- 对关键数据，通常使用 `localStorage`/`sessionStorage` 进行持久化

### 7.3 性能优化

- 当前实现中，使用动态导入减少初始加载时间
- 通常使用 `loading="lazy"` 属性懒加载图像
- 部分关键 CSS 和 JavaScript 使用 `<link rel="preload">` 预加载
- 当前代码中，JSON-LD 注入和 Meta 标签管理经过优化，以避免内存泄漏

### 7.4 图片资源管理

- 当前代码中，通常将图片作为模块导入，如 `import logoImg from '@/assets/icons/logo.png'`
- 当前课程图片命名模式：`{课程名称}(-membership)-{难度阶段}-cover-{尺寸}.{格式}`
- 示例：`photoshop-beginner-cover-480.png`、`python-intermediate-cover-1280.webp`

## 8. 开发工作流

### 8.1 常见开发任务

当前代码库中，添加新功能的常见流程通常包括：

1. 在 `src/api/` 中创建 API 服务，遵循 nREST 约定
2. 在 `src/types/` 中定义 TypeScript 类型用于数据结构
3. 在 `src/store/` 中实现 Pinia 存储用于状态管理
4. 在 `src/components/` 中构建可复用组件，使用正确命名
5. 在 `src/views/` 中创建页面组件，使用现有模式
6. 在 `src/router/index.ts` 中更新路由配置以支持新路由

### 8.2 质量门禁

当前实现中，通常会检查以下质量指标：

- TypeScript 编译无错误通过
- 所有组件都是响应式的(手机、平板、桌面)
- 图片使用适当的 import 语句
- 组件遵循 PascalCase 命名
- 优先使用 Bootstrap 工具类而非自定义 CSS
- Props 和 emits 使用 TypeScript 接口
- Pinia 存储遵循 Composition API 模式

## 9. 代码观察结果

在理解与修改现有代码时，通常可以观察到以下实践：

- 将图片作为模块导入，较少使用字符串路径
- 使用 Composition API 配合 `<script setup lang="ts">`
- 优先使用 Bootstrap 工具类而非自定义 CSS
- 在多个屏幕尺寸上测试组件
- 所有 Vue 组件遵循 PascalCase 命名

当前代码库中较少出现以下模式：
- 使用 Options API
- 硬编码 API URL 或敏感数据
- 在组件/文件名中混合中英文
- 使用字符串路径导入图片
- 跳过 TypeScript 类型定义

## 10. 部署与配置说明

（本节已移出 AI_EXECUTION_CONTEXT.md，相关内容请参考独立的部署与运维说明文档）
