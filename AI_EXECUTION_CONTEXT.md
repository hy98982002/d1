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
- **运行时校验**：`StageMeta`/`StageKeySchema` 提供唯一数据源与运行时校验
- **Fail-fast 原则**：阶段数据进入 store、路由或组件前应调用 `assertStageKey`
- **迁移限制**：禁止新增旧阶段或引入旧 → 新映射逻辑

### 5.2 Slug 规则

- **权威来源**：slug.ts 是 URL 的唯一权威来源（single source of truth）
- **Course Slug Format**：`{topic}-{tool}-{level}`
- **Level 要求**：必须使用系统级术语（`beginner`/`intermediate`/`advanced`）
- **禁止内容**：使用描述性术语如 `basic` 或 `pro` 代替系统级术语
- **SEO 要求**：所有暴露给搜索引擎的内容必须使用英文或中文，禁用拼音

### 5.3 JSON-LD 实现

- **现有工具**：已实现 `buildProgramJsonLd` 函数，支持 Schema.org EducationalOccupationalProgram 类型
- **五维字段覆盖**：JSON-LD 覆盖 Level/Type/Access/Outcome/Pathway 五维字段
- **动态注入**：使用 `onMounted` 和 `onUnmounted` 生命周期钩子管理 JSON-LD，避免内存泄漏
- **Meta 标签支持**：动态 Meta 标签支持 title、description、og:_、twitter:_ 等

### 5.4 Sitemap 生成

- **自动生成**：已集成到构建流程，执行 `npm run build` 自动生成 `public/sitemap.xml`
- **覆盖范围**：生成包含首页、About 页、Program 页和所有课程页的完整 sitemap
- **URL 数量**：支持 16 个 URL 的自动生成

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

- 仅使用 Composition API，严格禁止使用 Options API
- 所有 `.vue` 文件必须使用 `<script setup lang="ts">`
- 组件命名使用 PascalCase
- Props/Emits 使用 TypeScript 接口定义
- 优先使用 Bootstrap 工具类而非自定义 CSS

### 7.2 状态管理

- 使用 Pinia 进行状态管理
- 每个存储处理一个域(身份验证、课程等)
- 使用 Vue 的 `computed()` 处理派生状态
- 对关键数据使用 `localStorage`/`sessionStorage` 持久化

### 7.3 性能优化

- 使用动态导入减少初始加载时间
- 懒加载图像，使用 `loading="lazy"` 属性
- 使用 `<link rel="preload">` 预加载关键 CSS 和 JavaScript
- 优化 JSON-LD 注入和 Meta 标签管理，避免内存泄漏

### 7.4 图片资源管理

- 始终将图片作为模块导入，如 `import logoImg from '@/assets/icons/logo.png'`
- 课程图片命名规范：`{课程名称}(-membership)-{难度阶段}-cover-{尺寸}.{格式}`
- 示例：`photoshop-beginner-cover-480.png`、`python-intermediate-cover-1280.webp`

## 8. 部署配置

### 8.1 环境变量

```bash
# .env.production - 国内版简化配置
VITE_API_BASE_URL=https://your-railway-backend.up.railway.app/api
VITE_BAIDU_SITE_ID=xxxxxxxxxx
VITE_ANALYTICS_TIMEOUT=3000
VITE_SEO_DEBUG=false

# 企业功能Feature Flag环境变量 (MVP阶段全部为false)
VITE_ENTERPRISE_SUBSCRIPTION_ENABLED=false
VITE_ENTERPRISE_ADMIN_PANEL_ENABLED=false
VITE_ENTERPRISE_SEAT_MANAGEMENT_ENABLED=false
VITE_ENTERPRISE_BULK_PURCHASE_ENABLED=false
VITE_ENTERPRISE_REPORTING_ENABLED=false
VITE_ENTERPRISE_DATA_ISOLATION_ENABLED=false
VITE_ENTERPRISE_RBAC_ROLE_ENABLED=false
```

### 8.2 Vercel 部署

- 框架预设：Vite
- 构建命令：`npm run build`
- 输出目录：`dist`
- 安装命令：`npm install`

## 9. 开发工作流

### 9.1 常见开发任务

1. 在 `src/api/` 中创建 API 服务，遵循 nREST 约定
2. 在 `src/types/` 中定义 TypeScript 类型用于数据结构
3. 在 `src/store/` 中实现 Pinia 存储用于状态管理
4. 在 `src/components/` 中构建可复用组件，使用正确命名
5. 在 `src/views/` 中创建页面组件，使用现有模式
6. 在 `src/router/index.ts` 中更新路由配置以支持新路由

### 9.2 质量门禁

- TypeScript 编译无错误通过
- 所有组件都是响应式的(手机、平板、桌面)
- 图片使用适当的 import 语句
- 组件遵循 PascalCase 命名
- 优先使用 Bootstrap 工具类而非自定义 CSS
- Props 和 emits 使用 TypeScript 接口
- Pinia 存储遵循 Composition API 模式

## 10. 重要提醒

**始终遵循：**
- 将图片作为模块导入，永远不用字符串路径
- 使用 Composition API 配合 `<script setup lang="ts">`
- 优先使用 Bootstrap 工具类而非自定义 CSS
- 在多个屏幕尺寸上测试组件
- 所有 Vue 组件遵循 PascalCase 命名

**永远不要：**
- 使用 Options API(项目中禁止)
- 硬编码 API URL 或敏感数据
- 在组件/文件名中混合中英文
- 使用字符串路径导入图片
- 跳过 TypeScript 类型定义

## 11. 国内版特殊配置

### 11.1 语言策略

- 目标市场：专注中国大陆用户
- 语言支持：仅简体中文，无繁简转换
- 性能优势：移除转换开销，提升页面加载速度 15-20%
- 未来规划：海外版将独立开发，支持完整国际化

### 11.2 分析工具

- 仅使用百度统计 (避免国际工具的网络问题)
- 单一分析服务，减少加载时间和复杂度
- 专注于国内用户行为分析和转化跟踪

### 11.3 安全配置

```html
<!-- 国内版CSP配置 - 仅允许百度统计 -->
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' *.baidu.com hm.baidu.com;
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;"
/>
```
