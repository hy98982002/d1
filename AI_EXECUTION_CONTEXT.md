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

### 7.5 Feature Flag 管理

#### 7.5.1 目的与作用

Feature Flag 是当前项目中用于管理企业功能开关的机制，允许在不修改代码的情况下控制功能的开启和关闭。

当前项目中，Feature Flag 主要用于：
- 逐步推出企业版功能，降低风险
- 支持 A/B 测试和灰度发布
- 快速回滚有问题的功能
- 适应不同环境和客户需求

#### 7.5.2 实现现状

当前项目已在前后端实现了统一的 Feature Flag 管理机制：
- 前端配置位于 `src/config/featureFlags.ts`
- 后端配置位于 Django 设置中
- 所有企业相关功能都通过 Feature Flag 控制

#### 7.5.3 配置方式

**前端配置示例：**

```typescript
// frontend/src/config/featureFlags.ts
export const ENTERPRISE_FLAGS = {
  ENTERPRISE_SUBSCRIPTION_ENABLED: false, // 企业订阅UI
  ENTERPRISE_ADMIN_PANEL_ENABLED: false, // 企业管理面板
  ENTERPRISE_SEAT_MANAGEMENT_ENABLED: false, // 席位管理界面
  ENTERPRISE_BULK_PURCHASE_ENABLED: false, // 批量购买界面
  ENTERPRISE_REPORTING_ENABLED: false, // 企业统计报表
  ENTERPRISE_DATA_ISOLATION_ENABLED: false, // 数据隔离逻辑
  ENTERPRISE_RBAC_ROLE_ENABLED: false // 企业角色权限
} as const
```

**前端使用示例：**

```typescript
// 前端组件中使用 Feature Flag
import { ENTERPRISE_FLAGS } from '@/config/featureFlags'

if (ENTERPRISE_FLAGS.ENTERPRISE_ADMIN_PANEL_ENABLED) {
  // 显示企业管理面板
  showEnterpriseAdminPanel()
}
```

#### 7.5.4 命名规范

当前项目中，Feature Flag 采用以下命名规范：
- 全部大写字母
- 下划线分隔单词
- 以 `ENTERPRISE_` 前缀标识企业功能
- 清晰描述功能内容

#### 7.5.5 MVP 阶段配置

当前 MVP 阶段，所有企业相关 Feature Flag 均设置为 `false`，确保：
- 个人用户功能不受影响
- 企业相关 UI 完全隐藏
- 企业逻辑预留但不执行
- 数据库字段预留但不启用

#### 7.5.6 未来计划

项目规划在满足以下条件时逐步启用企业功能：
- 月付费用户数 > 500 人
- 企业主动咨询数 >= 3 家
- 个人会员续费率 > 60%

满足条件后，将按以下步骤推进：
1. 启用基础企业功能 Flag (ENTERPRISE_SUBSCRIPTION_ENABLED)
2. 开展 2-3 家试点企业验证
3. 收集反馈后决定完整企业版上线

### 7.6 API 集成细节

#### 7.6.1 API 基础 URL 配置

当前项目中，API 基础 URL 采用环境变量配置：
- **开发环境**: `http://localhost:8000/api/`
- **生产环境**: 通过 Railway 后端 URL 配置（环境变量 `VITE_API_BASE_URL`）
- **超时设置**: 默认 10 秒

#### 7.6.2 身份验证方式

当前项目使用 JWT（JSON Web Token）进行身份验证：
- JWT 令牌通过 Axios 拦截器自动附加到请求头
- 令牌存储在 localStorage 中，并设置过期时间
- 401 错误全局处理：自动登出并跳转到登录页

#### 7.6.3 统一 API 响应格式

所有 API 返回结果遵循统一结构：

```json
{
  "status": 200, // HTTP 状态码
  "data": {}, // 响应数据
  "msg": "Success" // 响应消息
}
```

#### 7.6.4 API 服务模式

当前项目采用模块化 API 服务设计：
- 按功能模块划分 API 服务文件（如 `courses.ts`、`auth.ts` 等）
- 使用 Axios 实例封装基础请求配置
- 支持请求拦截器和响应拦截器

#### 7.6.5 错误处理

当前项目的 API 错误处理策略：
- 全局拦截 401 错误，处理令牌失效情况
- 错误信息统一格式化和展示
- 提供详细的错误日志，便于调试和监控

### 7.7 开发理念与决策框架

#### 7.7.1 核心开发信念

当前项目遵循以下核心开发信念：
- **渐进式进展优于大重构**：能编译和通过测试的小变更更有价值
- **从现有代码中学习**：先研究再计划后实现
- **实用主义优于教条主义**：适应项目现实情况
- **意图清晰优于巧妙代码**：选择明显和可理解的解决方案

#### 7.7.2 简单性原则

当前项目追求简单性，具体表现为：
- 每个函数/类单一责任
- 避免过早抽象
- 不做巧妙的技巧 - 选择无聊的解决方案
- 如果你需要解释它，那就太复杂了

#### 7.7.3 实现流程

当前项目的标准实现流程：
1. **理解**：研究代码库中的现有模式
2. **测试**：先写测试(红)
3. **实现**：最少代码使测试通过(绿)
4. **重构**：在测试通过的情况下清理代码
5. **提交**：带有清晰的消息链接到计划

#### 7.7.4 遇到困难时的预案

当遇到困难或尝试失败时，当前项目采取以下策略：
1. 尝试 3 次失败后，必须停下来
2. 记录失败原因：尝试了什么、具体错误、失败原因
3. 研究替代方案：找到 2-3 个类似的实现
4. 质疑基础：这是正确的抽象层级吗？能分解为更小的问题吗？
5. 尝试不同角度：不同的库/框架特性？不同的架构模式？移除抽象？

#### 7.7.5 决策框架

当存在多个有效方法时，当前项目按以下顺序选择：
1. **可测试性**：我能轻松测试这个吗？
2. **可读性**：6 个月后有人能理解这个吗？
3. **一致性**：这符合项目模式吗？
4. **简单性**：这是可行的最简单解决方案吗？
5. **可逆性**：后续变更有多难？

### 7.8 SEO/AEO 优化状态

#### 7.8.1 已完成的 SEO 准备工作

当前项目已完成以下 SEO 准备：
- **动态 Meta 标签**：支持 title、description、og:*、twitter:* 等标签
- **Sitemap 自动生成**：集成到构建流程，生成 16 个 URL
- **robots.txt 配置**：允许搜索引擎抓取，禁止私密页面
- **JSON-LD 结构化数据**：使用 Schema.org 标准构建
- **Search Console 准备**：上线后执行步骤已记录

#### 7.8.2 动态 Meta 标签实现

当前项目的动态 Meta 标签实现：
- 使用原生 DOM 操作实现动态 Meta 标签管理
- 在 `onMounted` 和 `onUnmounted` 生命周期中管理
- 支持社交媒体平台的开放图谱和 Twitter Cards

#### 7.8.3 JSON-LD 实现

当前项目的 JSON-LD 实现：
- 已实现 `buildProgramJsonLd` 工具函数
- 支持 Schema.org EducationalOccupationalProgram 类型
- 覆盖 Level/Type/Access/Outcome/Pathway 等维度
- 使用 `onMounted` 和 `onUnmounted` 管理，避免内存泄漏

#### 7.8.4 Sitemap 生成

当前项目的 Sitemap 生成：
- 自动扫描 `courseStore.ts` 中的课程数据
- 包含首页、About 页、Program 页和所有课程页
- 集成到构建流程，执行构建命令时自动生成
- 支持生成 16 个 URL

## 8. Accessibility & Keyboard Interaction (Current Implementation Baseline)

### 8.1 WCAG Compliance

- Currently implemented to comply with WCAG 2.1 AA standards
- Currently implemented to use semantic HTML elements (header, nav, main, footer, etc.)
- Currently implemented to provide meaningful alt attributes for all images
- Currently implemented to use decorative images with empty alt attributes
- Currently implemented to associate labels with form controls
- Currently implemented to use aria-describedby for additional form instructions

### 8.2 Keyboard Navigation

- Currently implemented to ensure all interactive elements are keyboard accessible via Tab
- Currently implemented to maintain logical tab order that matches visual layout
- Currently implemented to ensure buttons and links can be activated with Enter/Space keys
- Currently implemented to ensure modals and dropdowns can be closed with Escape key
- Currently implemented to manage focus when modals are opened and closed

### 8.3 Prohibited Practices

- Currently avoided: Using div/span elements as buttons or links without complete accessibility implementation
- Currently avoided: Removing outline or hiding focus indicators
- Currently avoided: Relying solely on hover for interactive state indication

### 8.4 Focus Visibility

- Currently implemented to use :focus-visible for custom focus styles
- Currently implemented to avoid removing or hiding focus indicators

### 8.5 Reduced Motion Support

- Currently implemented to support prefers-reduced-motion media query
- Currently implemented to disable animations and transitions when prefers-reduced-motion is enabled
- Currently implemented to ensure all animation rules degrade gracefully for users who prefer reduced motion

> Reference only (non-normative): 
> See docs/ai/snippets/a11y-reference-snippets.md for common implementation patterns. 

## 9. 前后端边界宪法

### 9.1 后端职责

当前项目中，后端主要负责：
- **数据源**: 提供所有内容数据的唯一来源
- **语义一致性**: 确保数据遵循语义规则和 AEO 最佳实践
- **API 设计**: 暴露符合 RESTful 规范的 API 端点，与页面角色和语义职责对齐
- **身份验证**: 基于 JWT 的身份验证，确保安全访问

### 9.2 前端职责

当前项目中，前端主要负责：
- **内容展示**: 根据语义规则渲染内容
- **用户体验**: 实现导航、交互元素和响应式设计
- **JSON-LD 生成**: 基于后端数据生成和注入结构化数据
- **路由管理**: 实现客户端路由，包含适当的守卫和语义验证
- **状态管理**: 使用 Pinia 管理客户端状态，遵循单一数据源原则

## 10. 开发工作流

### 10.1 常见开发任务

当前代码库中，添加新功能的常见流程通常包括：

1. 在 `src/api/` 中创建 API 服务，遵循 nREST 约定
2. 在 `src/types/` 中定义 TypeScript 类型用于数据结构
3. 在 `src/store/` 中实现 Pinia 存储用于状态管理
4. 在 `src/components/` 中构建可复用组件，使用正确命名
5. 在 `src/views/` 中创建页面组件，使用现有模式
6. 在 `src/router/index.ts` 中更新路由配置以支持新路由

### 10.2 质量门禁

当前实现中，通常会检查以下质量指标：

- TypeScript 编译无错误通过
- 所有组件都是响应式的(手机、平板、桌面)
- 图片使用适当的 import 语句
- 组件遵循 PascalCase 命名
- 优先使用 Bootstrap 工具类而非自定义 CSS
- Props 和 emits 使用 TypeScript 接口
- Pinia 存储遵循 Composition API 模式

## 11. 国内版语言策略

### 11.1 V1.0 简化策略

当前项目采用 V1.0 简化语言策略：
- **目标市场**: 专注中国大陆用户
- **语言支持**: 仅简体中文，无繁简转换
- **性能优势**: 移除语言转换开销，页面加载速度提升 15-20%
- **域名策略**: doviai.com 专门服务中国大陆用户

### 11.2 未来规划

- **海外版规划**: 未来将独立开发海外版本（doviai.org），支持完整国际化
- **多语言支持**: 海外版将支持多语言，包括英语和繁体中文

### 11.3 海外简中用户优化策略

当前项目为海外简中用户提供优化：
- 添加中文 FAQ 和结构化数据，优化 AI 搜索
- 考虑内容中的简繁中文关键词（适用于海外版）

## 12. 代码观察结果

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

## 13. 统一分析策略

### 13.1 分析工具选择

当前项目采用统一的分析策略：
- **分析工具**: 仅使用百度统计服务中国大陆用户
- **技术实现**: 直接集成，无需区域检测逻辑
- **性能优势**: 单一分析提供商，优化加载速度

### 13.2 前后端分析实现

**前端实现**：
- 使用 Vue3 组合式 API 事件跟踪
- 使用 `data-track` 属性标记可跟踪元素
- 动态注入分析脚本

**后端实现**：
- Django 中间件用于 API 请求跟踪
- 自定义模型进行转换漏斗分析
- 仅基于 ID 跟踪，无敏感个人信息

### 13.3 事件跟踪标准

当前项目的事件命名约定：
- 格式：`module.action.state` (如: `video.play.start`)
- 分类清晰，便于分析和监控

### 13.4 分阶段实施计划

**阶段一：注册与登录转化路径**
- 事件：`user.register`, `user.login`, `user.logout`, `user.wechat_bind`
- 目标：优化注册转化率

**阶段二：试听与课程探索路径**
- 事件：`course.trial.start`, `course.view`, `stage.tiyan.enter`, `faq.click`
- 目标：提升免费用户到付费的转化

**阶段三：购买与会员转化路径**
- 事件：`cart.add`, `payment.success`, `membership.subscribe`, `coupon.apply`
- 目标：优化付费转化和会员订阅

**阶段四：学习行为深度分析**
- 事件：`video.play.start/pause/end`, `course.progress.update`, `learning.complete`
- 目标：提升课程完成率和用户留存

**阶段五：SEO/AEO 效果跟踪**
- 事件：`search.from.baidu`, `course.view.from.seo`, `content.share`
- 目标：评估 SEO 流量质量和内容传播效果

## 14. 部署架构

### 14.1 前端部署配置

当前项目前端部署在 Vercel 上：
- **框架预设**: Vite
- **构建命令**: `npm run build`
- **输出目录**: `dist`
- **安装命令**: `npm install`
- **自定义域名**: doviai.com
- **环境变量**: API_BASE_URL 等

### 14.2 后端部署配置

当前项目后端部署在 Railway 上：
- **框架**: Django
- **数据库**: MySQL 8.4+
- **Git 自动部署**: 代码推送后自动部署
- **环境变量**: DATABASE_URL, SECRET_KEY, DEBUG=False 等
- **可选服务**: Redis 缓存和会话存储（MVP 阶段可选）

### 14.3 CI/CD 流水线

**前端 CI/CD 流程**：
1. 代码推送至 Git 仓库
2. Vercel 自动触发构建
3. 执行类型检查（vue-tsc）
4. 执行构建优化（vite build）
5. 部署到 CDN 边缘节点
6. 生成 PR 预览部署

**后端 CI/CD 流程**：
1. 代码推送至 Git 仓库
2. Railway 自动触发部署
3. 安装依赖（pip install -r requirements.txt）
4. 执行数据库迁移（python manage.py migrate）
5. 收集静态文件（python manage.py collectstatic）
6. 健康检查和监控
7. 代码变更自动重启

### 14.4 环境配置

- **本地开发**: 使用 `.env` 文件存储敏感数据
- **生产环境**: 使用平台特定环境变量
  - Vercel: 环境变量面板
  - Railway: 环境变量标签页
- **CORS 设置**: 后端配置允许 Vercel 域名源
- **API 端点**: 前端配置 Railway 后端 URL

### 14.5 数据库迁移策略

- **开发环境**: MySQL 8.45 用于快速本地开发
- **生产环境**: Railway 上的 MySQL 8.4+
  - 支持 JSON 字段
  - 优秀的 Web 应用性能
  - TablePlus 提供卓越的 MySQL 管理体验
- **迁移路径**: requirements.txt 中已配置 mysqlclient

## 15. 示范代码文件参考

为了帮助 AI 更好地理解和实现项目功能，我们创建了一系列示范代码文件，涵盖了项目中的核心技术和最佳实践。这些代码示例可以作为 AI 执行任务时的参考模板。

### 15.1 Vue 3 组件结构示例
- **文件路径**: `docs/ai/snippets/vue-component-structure.md`
- **用途**: 展示推荐的 Vue 3 组件结构和最佳实践
- **内容**: 包含模板、脚本和样式的完整组件示例

### 15.2 Pinia 状态管理示例
- **文件路径**: `docs/ai/snippets/pinia-state-management.md`
- **用途**: 展示 Pinia 存储的最佳实践和示例代码
- **内容**: 包含状态定义、getters 和 actions 的完整存储示例

### 15.3 动画效果参考示例
- **文件路径**: `docs/ai/snippets/animation-reference-snippets.md`
- **用途**: 展示推荐的动画实现方式和规范
- **内容**: 包含各种动画效果的 CSS 实现和最佳实践

### 15.4 无障碍设计示例
- **文件路径**: `docs/ai/snippets/a11y-reference-snippets.md`
- **用途**: 展示图像无障碍、表单无障碍和键盘可访问性的实现
- **内容**: 包含各种无障碍设计模式的代码示例

### 15.5 JSON-LD 结构化数据示例
- **文件路径**: `docs/ai/snippets/json-ld-examples.md`
- **用途**: 展示 Program 页面和 Course 页面的 JSON-LD 实现
- **内容**: 包含多种页面类型的 JSON-LD 示例和最佳实践

### 15.6 动态 Meta 标签示例
- **文件路径**: `docs/ai/snippets/dynamic-meta-tags.md`
- **用途**: 展示动态管理 Meta 标签的实现方式
- **内容**: 包含基本实现和封装的组合式 API 示例

### 15.7 Axios 配置示例
- **文件路径**: `docs/ai/snippets/axios-config.md`
- **用途**: 展示 Axios 拦截器和 API 服务模式的实现
- **内容**: 包含基础配置、API 服务模式和错误处理示例

### 15.8 路由配置示例
- **文件路径**: `docs/ai/snippets/router-config.md`
- **用途**: 展示动态路由、路由守卫和懒加载的实现
- **内容**: 包含基本路由配置、动态路由、路由守卫和嵌套路由示例

### 15.9 会员系统集成示例
- **文件路径**: `docs/ai/snippets/membership-integration.md`
- **用途**: 展示会员状态管理和访问控制的实现
- **内容**: 包含会员状态管理、访问控制组件和导航栏集成示例

### 15.10 RBAC 权限系统示例
- **文件路径**: `docs/ai/snippets/rbac-reference-implementation.md`
- **用途**: 展示基于角色的访问控制实现
- **内容**: 包含 RBAC 状态管理、权限指令、权限门组件和组合式 API 示例

### 使用说明

这些示范代码文件提供了项目中的最佳实践和实现模板，AI 在执行任务时可以：
1. 参考这些示例代码的结构和实现方式
2. 根据具体需求调整和扩展示例代码
3. 确保实现符合项目的技术规范和最佳实践
4. 避免重复发明轮子，提高开发效率

这些示例代码仅供参考，AI 在使用时应根据实际情况进行调整，确保代码符合当前项目的具体需求和约束。


