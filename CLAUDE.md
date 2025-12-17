# CLAUDE.md

**🔥 强制要求：**

- **语言：所有交流必须使用中文，包括 bmad 代理、CCPlugins 命令和任何工具调用的对话**
- **文件读取：项目内文件(/Users/dongqingzhai/Desktop/UAI_project/)必须使用 Claude 内置 Read 工具，禁用 mcp**filesystem**\*工具**

本文件为 Claude Code (claude.ai/code) 在此代码仓库中工作时提供指导。

## 项目概述

多维 AI 课堂 - 基于 Vue 3 + Django 构建的在线教育服务全栈 Web 应用。项目采用前后端分离架构，使用 JWT 身份验证。

## Slug Rules-cn

slug.ts 是 URL 的唯一权威来源（single source of truth），
即使在 mock 数据阶段，路由层也必须调用它。

## 新体系对齐说明 (00*)

**已完成重构**：课程体系已从原来的7层结构重构为三级体系（LRMI + Schema.org + AEO 最佳实践）：

| Level                        | 描述               | 商业方式         |
| ---------------------------- | ------------------ | ---------------- |
| **Beginner（免费入门）**     | 软件基础、快速理解 | 全部免费         |
| **Intermediate（进阶实战）** | 技能训练、任务练习 | 单买 或 会员可看 |
| **Advanced（高阶训练）**     | 企业项目、商业案例 | 单买 + 会员 9 折 |

**核心架构特点**：
- 三级体系对应：Beginner/Intermediate/Advanced
- LRMI 教学类型：Lecture/Demonstration/Exercise → Lesson/Practice → Project/CaseStudy
- Program 体系课：Program A（会员实战训练体系）和 Program B（职业技能训练体系）
- 完整 AEO/Rich Result 结构：Level/Type/Access/Outcome/Pathway 五维结构化策略

## 大型任务完成后的文件变更硬性汇报规则（Ultra-Short）
- 完成任何跨文件 / 架构 / 重构 / SEO / AEO 任务后，必须在结尾列出所有涉及的文件路径，并明确说明是否有新增文件、是否有文件被完全删除，最后给出是否存在文件删除的明确安全结论（是 / 否）。
- 一句话：大型任务结束后必须交代改了哪些文件 + 有没有新增 + 有没有删文件 + 明确结论。


## 项目宪法

# Project Constitution (CLAUDE.md)

This document defines the non-negotiable rules of the project.
All AI agents, contributors, and future refactors MUST comply.

## 1️⃣ 项目目标与长期定位

## Project Vision & Long-Term Direction

- **平台定位**: 基于 Vue 3 + Django 构建的在线教育服务全栈 Web 应用，专注于 AI 课程的 AEO / LRMI 语义优化
- **核心技术**: Vue 3, Django, Pinia, Vue Router 4, TypeScript
- **AEO / SEO 优先级**: 遵循 Schema.org + LRMI + AEO 最佳实践，构建高质量的教育内容知识图谱
- **用户体验**: 提供清晰的学习路径，优化语义结构，提升搜索引擎理解和用户导航体验

---

## 2️⃣ 内容与语义宪法

## Content Semantic Responsibility & AEO Page Roles

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

---

## 3️⃣ URL / Slug 宪法

## URL & Slug Canonical Rules

### Slug 的语义原则

- **slug ≠ 展示用**: Slugs are not for display purposes but for semantic anchoring
- **slug = 长期稳定语义锚点**: Slugs should remain stable over time to maintain SEO value
- **SEO / AEO 优先**: Slugs must follow AEO / LRMI best practices for optimal semantic understanding

---

### Course Slug Rules

- **Format**: `{topic}-{tool}-{level}`
- **Level part**: Must use system-defined level terms (`beginner` / `intermediate` / `advanced`)
- **Example**: `photoshop-ai-design-beginner`
- **禁止**: Using descriptive terms like `basic` or `pro` instead of system-level terms
- **Migration rule**: Existing slugs may be preserved for backward compatibility unless a dedicated migration plan exists

---

### Level & Program Slug Rules

- **Level pages**: `/levels/beginner`, `/levels/intermediate`, `/levels/advanced`
- **Program pages**: `/programs/ai-design-path`, `/programs/machine-learning-bootcamp`
- **Semantic clarity**: Slugs must clearly indicate the page type and purpose

---

## 4️⃣ AEO / Schema / LRMI 宪法

## AEO, Schema.org & LRMI Principles

### Schema 的“真实表达原则”

- ❌ **No false claims**: JSON-LD must accurately reflect the actual course content
- ✅ **Verifiable content**: All Schema.org claims must be verifiable from the page content
- ✅ **Semantic consistency**: JSON-LD terms must match page semantics and URL structure

---

### educationalLevel 使用规则

- **Must use DefinedTerm**: Avoid plain strings, use structured DefinedTerm format
- **Must reference level entity**: Link to `/levels/` pages using `@id` or `inDefinedTermSet`
- **Example**: 
  ```json
  "educationalLevel": {
    "@type": "DefinedTerm",
    "name": "Beginner",
    "@id": "https://www.doviai.com/levels/beginner"
  }
  ```

---

### Program / Course / Skill 的关系规则

- **isPartOf / hasPart**: Use these properties to define hierarchical relationships
- **programPrerequisites**: Clearly define prerequisites for Program pages
- **educationalUse**: Use LRMI educationalUse values to categorize content types
- **禁止**: Using unrelated or misleading properties to inflate SEO value

---

## 5️⃣ 数据模型与页面关系宪法

## Data Model & Page Relationship Rules

### Course / Level / Program 的数据职责

- **Course**: Contains specific course content, lessons, outcomes, and metadata
- **Level**: Defines learning stage characteristics, prerequisites, and aggregates courses
- **Program**: Defines learning pathways, connects multiple courses, and explains progression logic

### Single Source of Truth Rule

- **Level definitions**: Must only be defined in `/levels/` pages, referenced elsewhere
- **Course data**: Must be centralized in the course store, with consistent identifiers
- **Program structure**: Must be defined in the program store, referencing existing courses and levels

---

## 6️⃣ 前后端边界宪法

## Frontend / Backend Responsibility Boundary

### Backend负责什么

- **Data source**: Provides the single source of truth for all content data
- **Semantic consistency**: Ensures data follows semantic rules and AEO best practices
- **API design**: Exposes RESTful endpoints that align with page roles and semantic responsibilities
- **Authentication**: JWT-based authentication for secure access

### Frontend负责什么

- **Content display**: Renders content according to semantic rules
- **User experience**: Implements navigation, interactive elements, and responsive design
- **JSON-LD generation**: Generates and injects structured data based on backend data
- **Route management**: Implements client-side routing with proper guards and semantic validation
- **State management**: Manages client-side state using Pinia, following single source of truth principles

---

## 7️⃣ AI / Agent 行为约束

## AI & Agent Behavioral Constraints

### Claude / Codex 的生成红线

- ❌ **Do not invent new concepts**: Only use defined terms and concepts
- ❌ **Do not modify slug rules**: Follow established slug conventions
- ❌ **Do not create new level names**: Only use `beginner`, `intermediate`, `advanced`
- ✅ **Follow semantic boundaries**: Respect page role definitions and forbidden overlaps
- ✅ **Use existing patterns**: Follow established code patterns and architectures

### How to Change the Constitution

- **Must update CLAUDE.md**: All rule changes must be documented in this file
- **Must record change reasons**: Explain why the change is necessary and its impact
- **Must maintain backward compatibility**: Whenever possible, avoid breaking changes
- **Review process**: Major changes should be reviewed and approved before implementation

---

## 8️⃣ CHANGELOG 与宪法同步规则

## Constitution & CHANGELOG Synchronization

- **CHANGELOG.md**: Records "what happened" - implementation details, features, bug fixes
- **CLAUDE.md**: Records "what rules changed" - semantic principles, page roles, AEO guidelines
- **Sync requirement**: Any changes to semantic rules or page roles must be reflected in both documents

---

## 9️⃣ 附录

## Appendix

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
      "description": "适合零基础学员，提供软件基础和快速理解的免费课程。",
      "url": "https://www.doviai.com/levels/beginner"
    }
  ]
}
```

### Common Mistakes to Avoid

1. **Mixing page responsibilities**: For example, explaining what "Beginner" means on a Course page
2. **Using incorrect level terms**: Using `basic` instead of `beginner` in slugs or structured data
3. **False Schema.org claims**: Claiming to teach skills not actually covered in the course
4. **Semantic overlap**: Having Program pages repeat course content instead of focusing on learning order
5. **Ignoring single source of truth**: Defining level meanings in multiple places

---

# 🎯 使用建议

## Implementation Roadmap

### Immediate Actions (Now)

1. ✅ **Implement semantic page roles**: Ensure Course, Level, and Program pages follow their defined responsibilities
2. ✅ **Update course slugs**: Replace `-basic` with `-beginner` in all course slugs
3. ✅ **Enhance structured data**: Implement DefinedTerm format for educationalLevel with level page references
4. ✅ **Add level pages**: Create `/levels/` pages with clear level definitions

### Short-Term Actions (Next 2 Weeks)

1. **Implement Program pages**: Create structured learning pathways connecting courses
2. **Enhance JSON-LD**: Add more comprehensive Schema.org markup following LRMI best practices
3. **Optimize URL structure**: Ensure all URLs follow semantic rules and AEO best practices
4. **Add sitemap generation**: Include all level and program pages in the sitemap

### Long-Term Actions (Future)

1. **Build knowledge graph**: Develop a more comprehensive knowledge graph connecting courses, skills, and learning outcomes
2. **Implement advanced AEO features**: Add educationalOccupationalProgram, learningResourceType, and other advanced Schema.org properties
3. **Enhance level progression**: Implement clear prerequisites and progression indicators between levels
4. **Optimize for voice search**: Ensure semantic structure is optimized for voice assistants and conversational search

---

## Final Principles

> **`CLAUDE.md（根目录） = 项目的语义宪法`**
> **`frontend/CLAUDE.md = 前端执行细则`**

This document defines the core semantic principles that guide all development decisions.
All AI agents, contributors, and future refactors must comply with these rules to maintain
consistent AEO / LRMI semantic alignment and optimal search engine understanding.

---

*Last updated: 2025-12-17*
*Version: 1.0.0*

## 技术栈

## Package manager

This project uses **pnpm**.

After first install, run:

pnpm approve-builds

to allow required native dependencies (e.g. esbuild).


**前端：**

- Vue 3 配合 Composition API + TypeScript
- Vite 构建工具
- Bootstrap 5.3.6 UI 框架（禁用其他 UI 框架）
- Pinia 状态管理
- Vue Router 路由
- Axios API 请求

**后端：**

- Python 3.12 + Django 5.2
- Django REST Framework API 框架
- JWT 身份验证 (SimpleJWT)
- MySQL 8.4+ (Railway 生产环境) / mysql (本地开发)
- Django Admin 后台管理
- Redis 缓存和会话存储 (MVP 可选)

## 开发命令

### 前端 (从 `/frontend` 目录执行)

```bash
npm install                    # 安装依赖
npm run dev                   # 启动开发服务器 (localhost:5173)
npm run build                 # 生产构建
npm run build:check           # 带TypeScript检查的构建
npm run type-check            # 仅TypeScript类型检查
npm run preview               # 预览生产构建

# 国际化 (实现OpenCC时)
npm install opencc-js         # 安装OpenCC简繁转换

# 分析跟踪 (实现分析时)
npm install vue-gtag          # Vue3 Google Analytics集成 (条件加载)
npm install @types/gtag       # gtag的TypeScript定义
```

### 后端 (从 `/backend` 目录执行)

```bash
# 设置虚拟环境
python -m venv venv
source venv/bin/activate      # macOS/Linux
# 或 venv\Scripts\activate    # Windows

# 安装依赖
pip install -r requirements.txt

# 开发服务器
python manage.py runserver    # 启动Django服务器 (localhost:8000)

# 数据库操作
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

# 生产部署准备
# requirements.txt中已包含mysqlclient用于MySQL支持
pip install gunicorn         # 生产环境WSGI服务器
pip install whitenoise       # 静态文件服务
```

## 项目架构

### 前端结构 (`/frontend/src/`)

- `views/` - 页面级组件 (PascalCase 命名)
  - `program/[slug].vue` - ✅ 动态 Program 路由组件 (2025-12-08 更新)
    - 支持 `/program/aigc-intermediate` (会员进阶路线)
    - 支持 `/program/ai-designer-advanced` (高阶技能路径)
    - Advanced 阶段课程当前为空，显示"即将推出"提示
- `components/` - 可复用组件 (PascalCase 命名)
  - `i18n/` - 国际化组件 (语言切换等,海外版才设置)
- `store/` - Pinia 状态管理存储
  - `courseStore.ts` - ✅ 新增 Program 相关方法 (2025-12-08 更新)
    - `getProgramBySlug(slug)` - 根据 slug 获取 Program 配置
    - `programExists(slug)` - 验证 Program 是否存在
    - `getProgramCourses(slug)` - 获取 Program 对应的课程列表
- `api/` - Axios 请求封装 (每模块一个文件)
- `router/` - Vue Router 路由配置
  - ✅ 动态路由 `/program/:slug` (2025-12-08 更新)
- `types/` - TypeScript 类型定义
  - `index.ts` - ✅ 新增 Program 相关类型 (2025-12-08 更新)
    - `Program` - Program 配置接口
    - `ProgramBenefit` - Program 权益接口
    - `PROGRAM_SLUGS` - Program slug 常量
    - `assertProgramSlug()` - 运行时校验函数
- `utils/` - 工具函数
  - `i18n.ts` - OpenCC 转换工具 (实现时)
  - `tracking.ts` - 分析和事件跟踪工具
- `assets/` - 静态资源，按子目录组织：
  - `icons/` - 图标和 Logo 资源
  - `images/` - 业务图片 (课程封面、头像等)
- `config/` - 配置文件
  - `tracking.json` - 分析跟踪配置

### 路由设计模式 (2025-12-08 更新)

**统一的动态路由规范**:

- Course: `/course/:slug` (已实现)
- Program: `/program/:slug` (✅ 2025-12-08 实现)

**路由守卫**: 使用`beforeEnter`验证资源存在性，不存在则重定向到 404

**Program 路由支持**:

- `aigc-intermediate` - 会员进阶路线 (Intermediate 阶段，5 门课程)
- `ai-designer-advanced` - 高阶技能路径 (Advanced 阶段，当前课程为空)

### SEO 优化状态 (2025-12-08 更新)

**已完成的 SEO 准备工作** (为 SSG 迁移打好基础):

- ✅ **动态 Meta 标签**: Program 页面支持动态 title、description、og:*、twitter:*标签
- ✅ **Sitemap 自动生成**: `scripts/generate-sitemap.js` 集成到构建流程
  - 生成 16 个 URL (1 首页 + 1About + 2Program + 12Course)
  - 自动扫描 courseStore.ts 提取课程 slugs
- ✅ **robots.txt 配置**: 允许搜索引擎抓取，禁止私密页面
- ✅ **JSON-LD 结构化数据**: 使用`buildProgramJsonLd`工具函数构建 Schema.org 标准数据
- 📝 **Search Console 准备**: 上线后执行步骤已记录在`frontend/docs/Search-Console准备指南.md`

**SPA 架构特点** (vite-plugin-ssr 迁移前):

- 使用`beforeEnter`路由守卫验证资源存在性
- 使用原生 DOM 操作实现动态 Meta 标签（onMounted/onUnmounted）
- 未来迁移 SSG 时可轻松替换为`useHead`和`onBeforeRender`

### 后端结构 (`/backend/`)

- `apps/` - Django 应用模块：
  - `users/` - 用户认证和管理
  - `courses/` - 课程管理系统
  - `cart/` - 购物车功能
  - `orders/` - 订单处理
  - `learning/` - 学习进度跟踪
  - `reviews/` - 课程评价系统
  - `analytics/` - 用户行为跟踪和分析
  - `system/` - 系统级功能

### API 设计模式

所有 API 响应遵循以下结构：

```json
{
  "status": 200, // HTTP状态码
  "data": {}, // 响应数据
  "msg": "Success" // 响应消息
}
```

所有 API 端点都使用 `/api/` 前缀，并采用 JWT 身份验证。

## 开发约定

### 代码风格

- **前端**: 只使用 Composition API (禁止 Options API)
- **组件**: PascalCase 命名 (如：`UserProfile.vue`)
- **API 文件**: camelCase (如：`userService.ts`)
- **图片导入**: 总是使用 import 语句，永远不用字符串路径
- **所有交流**: 注释和文档使用中文

### 安全要求

- 永远不要硬编码敏感信息 (API 密钥、密码等)
- 使用 `.env` 文件进行配置 (确保 `.env` 在 `.gitignore` 中)
- 遵循 Django 安全最佳实践进行身份验证和 CSRF 保护

### 国内版语言策略 (Domestic Version Language Strategy)

- **V1.0 简化策略**: 专注中国大陆用户，仅支持简体中文，移除繁简转换复杂度
- **当前域名**: doviai.com 专门服务中国大陆用户（简体中文单一语言）
- **海外版规划**: 未来独立开发海外版本（doviai.org），支持完整国际化和多语言
- **性能优势**: 移除语言转换开销，页面加载速度提升 15-20%
- **SEO 策略**: 专注百度等国内搜索引擎优化
- **海外简中用户优化（GoSEO）**：为居住在海外、使用 Google 搜索的简体中文用户提供优化内容
- **AEO 准备**: 添加中文 FAQ 和结构化数据，优化 AI 搜索

### 统一分析策略 (Unified Analytics Strategy)

- **分析工具**: 专门使用百度统计服务中国大陆用户
- **技术实现**: 直接集成，无需区域检测逻辑复杂度
- **业务级事件**: Django 自定义模型进行转换漏斗分析
- **前端实现**: Vue3 组合式 API 事件跟踪，使用 data-track 属性
- **后端实现**: Django 中间件用于 API 请求跟踪
- **隐私合规**: 仅基于 ID 跟踪，无敏感个人信息
- **性能优势**: 单一分析提供商，优化加载速度

### 图片管理

- 图片必须作为模块导入：`import logoImg from '@/assets/icons/logo.png'`
- 所有图片必须有有意义的 `alt` 属性
- 课程图片命名规则：`{课程名称}(-membership)-{难度阶段}-cover-{尺寸}.{格式}`，例如 `photoshop-basic-cover-480.png`
  - 课程阶段已统一收敛为 `basic`/`intermediate`/`advanced` 三级体系
  - 会员课程在课程名称和难度阶段之间添加 `-membership` 标识
  - 同时提供多种分辨率和格式，以适应不同设备和网络环境
- 阶段：basic/intermediate/advanced（已统一收敛为三级体系）

## 重要文件和配置

### 关键配置文件

- `frontend/vite.config.ts` - Vite 配置和路径别名
- `backend/uai_backend/settings.py` - Django 设置 (当前使用 SQLite)
- `frontend/package.json` - 前端依赖和脚本
- `backend/requirements.txt` - Python 依赖

### 开发环境

- 前端开发服务器: `http://localhost:5173`
- 后端开发服务器: `http://localhost:8000`
- 数据库: MySql(开发环境), MySQL (生产环境)
- 数据库管理: TablePlus (本地和远程客户端)

### 安全注意事项

⚠️ **警告**: 当前的 `settings.py` 包含硬编码的 SECRET_KEY 和 DEBUG=True。这些应该在任何生产部署之前移至环境变量。

## 部署架构

### 生产环境

- **前端部署**: Vercel (Git 自动部署)
  - 域名: `doviai.com` (主域名)
  - 构建命令: `npm run build`
  - 框架预设: Vite
  - 环境变量: API 端点、SEO 密钥
- **后端部署**: Railway (Django + MySQL)
  - Git 仓库自动部署
  - MySQL 8.4+ 数据库配置连接池
  - Redis 缓存和会话 (MVP 可选)
  - 环境变量: DATABASE_URL, SECRET_KEY, DEBUG=False
- **数据库管理**:
  - Railway Dashboard (生产环境监控)
  - TablePlus (本地开发和远程访问)

### CI/CD 流水线

#### 开发工作流

```bash
本地开发 → Git推送 → 自动部署
├── 前端 (Vercel):
│   ├── 类型检查 (vue-tsc)
│   ├── 构建优化 (vite build)
│   ├── CDN分发 (全球边缘节点)
│   └── PR预览部署
│
└── 后端 (Railway):
    ├── 依赖安装 (pip install -r requirements.txt)
    ├── 数据库迁移 (python manage.py migrate)
    ├── 静态文件收集 (python manage.py collectstatic)
    ├── 健康检查和监控
    └── 代码变更自动重启
```

#### 环境配置

- **本地开发**: `.env` 文件存储敏感数据
- **生产环境**: 平台特定环境变量
  - Vercel: 环境变量面板
  - Railway: 环境变量标签页
- **CORS 设置**: 后端配置允许 Vercel 域名源
- **API 端点**: 前端配置 Railway 后端 URL

#### 数据库迁移策略

- **开发环境**: MySQL 8.45 用于快速本地开发
- **生产环境**: Railway 上的 MySQL 8.4+
  - 熟悉的 MySQL 语法和管理
  - MySQL 8.0+提供 JSON 字段支持
  - 优秀的 Web 应用性能
  - TablePlus 提供卓越的 MySQL 管理体验
- **迁移路径**: requirements.txt 中已配置 mysqlclient

## 开发工作流

1. **前端开发**: 初期使用模拟数据，后期集成后端 API
2. **后端开发**: 遵循 Django REST 约定，实现 RBAC 权限
3. **API 集成**: 确保所有请求自动包含 JWT 令牌
4. **状态管理**: 使用 Pinia 存储，避免与组件本地状态混合
5. **样式设计**: 使用 Bootstrap 5.3.6 类，维护响应式设计

## 常见开发任务

添加新功能时：

1. 在后端创建遵循 nREST 约定的 API 端点
2. 在 `src/api/` 中添加对应的前端 API 服务
3. 必要时实现 Pinia 存储用于状态管理
4. 在 `src/components/` 中创建可复用组件
5. 在 `src/views/` 中构建页面组件
6. 更新路由配置以支持新路由

### SEO/AEO 优化任务

添加内容页面(课程、文章等)时：

1. 添加结构化数据(JSON-LD)用于课程、FAQ、组织模式
2. 包含 FAQ 部分和自然语言问答
3. 确保适当的元标题、描述和 alt 属性
4. 考虑内容中的简繁中文关键词(适用于海外版)

### 分析实现任务

实现用户行为跟踪时：

1. **设置阶段**：

   - 添加百度统计集成
   - 创建 `analytics` Django 应用用于自定义事件存储
   - 配置 Vue3 跟踪组合式函数用于统一跟踪

2. **核心事件跟踪**：

   - 用户旅程: `user.register`, `user.login`, `user.logout`
   - 学习行为: `video.play.start/pause/end`, `course.progress.update`
   - 转化漏斗: `cart.add`, `payment.success`, `coupon.apply`
   - SEO/AEO 事件: `search.from.baidu`, `faq.click`, `ai.referral`

3. **实现标准**：
   - 事件命名约定: `module.action.state` (如: `video.play.start`)
   - 为可跟踪元素添加 `data-track` 属性
   - 使用 Django 中间件进行 API 请求跟踪
   - 在 MySQL 中存储关键业务事件(永远不依赖第三方)
   - 性能: 直接百度统计集成以获得最佳加载速度

### 部署任务

准备生产部署时：

1. **前端 (Vercel 设置)**：

   - 连接 GitHub 仓库到 Vercel 项目
   - 配置构建设置(框架: Vite, 构建命令: `npm run build`)
   - 设置环境变量(API_BASE_URL 等)
   - 配置自定义域名(doviai.com)

2. **后端 (Railway 设置)**：

   - 连接 GitHub 仓库到 Railway 项目
   - 添加 MySQL 数据库服务(8.4+推荐)
   - 设置环境变量(SECRET_KEY, DEBUG=False, DATABASE_URL)
   - 为 Vercel 域名配置 CORS 设置
   - 添加 Redis 服务用于缓存(MVP 可选)
   - 设置分析环境变量(BAIDU_ANALYTICS_ID)

3. **数据库迁移**：
   - requirements.txt 中已配置 mysqlclient
   - 创建包含环境变量的生产设置文件
   - 在 Railway 预发环境测试迁移
   - 配置 TablePlus 远程 MySQL 访问

## Development Philosophy

> **开发哲学**: 比如"增量优于全部重构"、"代码要清晰而非聪明"。

> **标准工作流**: 规划 -> 写测试 -> 实现 -> 重构 -> 提交。

> **"卡住怎么办"预案**: 尝试 3 次失败后，必须停下来，记录失败、研究替代方案、反思根本问题。

> **决策框架**: 当有多种方案时，按可测试性 > 可读性 > 一致性 > 简单性的顺序选择。

# 开发指南

## 理念

### 核心信念

- **渐进式进展优于大爬轰** - 能编译和通过测试的小变更
- **从现有代码中学习** - 先研究再计划后实现
- **实用主义优于教条主义** - 适应项目现实
- **意图清晰优于巧妙代码** - 做无聊和明显的事

### 简单意味着

- 每个函数/类单一责任
- 避免过早抽象
- 不做巧妙的技巧 - 选择无聊的解决方案
- 如果你需要解释它，那就太复杂了

## 流程

### 1. 计划和分阶段

将复杂工作分解 3-5 个阶段。在 `IMPLEMENTATION_PLAN.md` 中文档化：

```markdown
## 阶段 N: [名称]

**目标**: [具体交付物]
**成功标准**: [可测试结果]
**测试**: [具体测试用例]
**状态**: [未开始|进行中|完成]
```

- 进展时更新状态
- 所有阶段完成时删除文件

### 2. 实现流程

1. **理解** - 研究代码库中的现有模式
2. **测试** - 先写测试(红)
3. **实现** - 最少代码使测试通过(绿)
4. **重构** - 在测试通过的情况下清理代码
5. **提交** - 带有清晰的消息链接到计划

### 3. 遇到困难时(尝试 3 次后)

**关键**: 每个问题最多尝试 3 次，然后停下。

1. **记录失败原因**:

   - 你尝试了什么
   - 具体的错误消息
   - 你认为失败的原因

2. **研究替代方案**:

   - 找到 2-3 个类似的实现
   - 注意使用的不同方法

3. **质疑基础**:

   - 这是正确的抽象层级吗？
   - 这能分解为更小的问题吗？
   - 有更简单的方法吗？

4. **尝试不同角度**:
   - 不同的库/框架特性？
   - 不同的架构模式？
   - 移除抽象而不是添加？

## 技术标准

### 架构原则

- **组合优于继承** - 使用依赖注入
- **接口优于单例** - 启用测试和灵活性
- **明确优于隐式** - 清晰的数据流和依赖
- **尽可能测试驱动** - 不要禁用测试，修复它们

### 代码质量

- **每次提交必须**:

  - 编译成功
  - 通过所有现有测试
  - 包含新功能的测试
  - 遵循项目格式化/代码检查

- **提交之前**:
  - 运行格式化程序/代码检查器
  - 自审查变更
  - 确保提交消息解释“为什么”

### 错误处理

- 使用描述性消息快速失败
- 包含调试上下文
- 在适当的层级处理错误
- 永远不要静默吞没异常

## 决策框架

当存在多个有效方法时，按以下顺序选择：

1. **可测试性** - 我能轻松测试这个吗？
2. **可读性** - 6 个月后有人能理解这个吗？
3. **一致性** - 这符合项目模式吗？
4. **简单性** - 这是可行的最简单解决方案吗？
5. **可逆性** - 后续变更有多难？

## 项目集成

### 学习代码库

- 找到 3 个类似的功能/组件
- 识别通用模式和约定
- 尽可能使用相同的库/工具
- 遵循现有的测试模式

### 工具

- 使用项目现有的构建系统
- 使用项目的测试框架
- 使用项目的格式化/代码检查器设置
- 没有充分理由不要引入新工具

## 质量门禁

### 完成的定义

- [ ] 已编写和通过测试
- [ ] 代码遵循项目约定
- [ ] 没有代码检查器/格式化器警告
- [ ] 提交消息清晰
- [ ] 实现与计划匹配
- [ ] 没有无 issue 编号的 TODO

### 测试指南

- 测试行为，而不是实现
- 尽可能每个测试一个断言
- 清晰的测试名称描述场景
- 使用现有的测试工具/助手
- 测试应该是确定性的

## 重要提醒

**永远不要**:

- 使用 `--no-verify` 绕过提交钩子
- 禁用测试而不是修复它们
- 提交不能编译的代码
- 做假设 - 用现有代码验证

**总是**:

- 增量式提交可工作的代码
- 进展时更新计划文档
- 从现有实现中学习
- 3 次失败尝试后停下来重新评估

## 文档参考

- 主项目规则: `README.md`
- 前端特定规则: `frontend/AGENTS.md`
- 后端特定规则: `backend/AGENTS.md`
- Cursor 开发规则: `.cursor/rules/` 目录
- 安全指南: `Cursor User Rules.md`

## CCPlugins - Enhanced Development Commands

**IMPORTANT**: 这个项目配置了 CCPlugins 扩展，提供 24 个专业命令用于增强开发效率。当用户提到相关任务时，我应该自动识别并使用对应的命令。命令文件存储在全局`.claude/commands/`文件夹中。

### 🚀 Development Workflow Commands

#### /cleanproject

- **用途**: 清理项目中的调试工件，保持 Git 安全
- **自动触发场景**: 需要清理临时文件、调试输出、构建缓存时
- **命令说明**: 智能移除 debug artifacts，保护 git 历史

#### /commit

- **用途**: 智能化的常规提交，带有分析功能
- **自动触发场景**: 用户要求提交代码或保存更改时
- **命令说明**: 分析变更内容，生成符合规范的 commit message

#### /format

- **用途**: 自动检测并应用项目格式化工具
- **自动触发场景**: 代码格式不一致、需要统一代码风格时
- **命令说明**: 根据项目配置（prettier/eslint/black 等）自动格式化

#### /scaffold feature-name

- **用途**: 从现有模式生成完整功能模块
- **自动触发场景**: 创建新功能、新组件、新模块时
- **命令说明**: 分析项目结构，生成符合项目规范的完整功能代码

#### /test

- **用途**: 运行测试并提供智能失败分析
- **自动触发场景**: 需要验证代码、运行测试套件时
- **命令说明**: 执行测试并分析失败原因，提供修复建议
- **ℹ️ 优先保留**: 与/test-harness 功能相近，但/test 更适合日常测试

#### /implement url/path/feature

- **用途**: 从任何来源导入和适配代码，带验证阶段
- **自动触发场景**: 需要集成外部代码、实现参考功能时
- **命令说明**: 智能导入并适配外部代码到项目规范

#### /refactor

- **用途**: 智能代码重构，带验证和去参数化
- **命令说明**: 分析并重构代码，确保功能不变的情况下提升质量
- **⚠️ 手动调用**: 与/refactor-clean 有功能重叠，请明确指定使用哪个

### 🛡️ Code Quality & Security Commands

#### /review

- **用途**: 多代理分析（安全、性能、质量、架构）
- **命令说明**: 全面分析代码的各个维度并提供改进建议
- **⚠️ 手动调用**: 与/ai-review、/full-review、/multi-agent-review 有功能重叠，请明确指定使用哪个

#### /security-scan

- **用途**: 漏洞分析，带扩展思考和修复跟踪
- **命令说明**: 深度扫描安全问题并提供修复方案
- **⚠️ 手动调用**: 与/security-hardening 有功能重叠，请明确指定使用哪个

#### /predict-issues

- **用途**: 主动问题检测，带时间线估计
- **自动触发场景**: 风险评估、问题预测、技术债务分析时
- **命令说明**: 预测潜在问题并估算影响时间线

#### /remove-comments

- **用途**: 清理明显注释，保留有价值文档
- **自动触发场景**: 代码清理、移除冗余注释时
- **命令说明**: 智能识别并移除无用注释，保留重要文档

#### /fix-imports

- **用途**: 修复重构后的导入问题
- **自动触发场景**: 导入错误、模块路径问题时
- **命令说明**: 自动检测并修复 import/require 语句

#### /find-todos

- **用途**: 定位并组织开发任务
- **自动触发场景**: 查找待办事项、任务管理时
- **命令说明**: 扫描代码中的 TODO/FIXME 等标记

#### /create-todos

- **用途**: 基于分析结果添加上下文 TODO 注释
- **自动触发场景**: 需要标记待完成任务时
- **命令说明**: 智能添加 TODO 注释并包含上下文信息

#### /fix-todos

- **用途**: 智能实现 TODO 修复，带上下文
- **自动触发场景**: 处理 TODO 项、完成待办任务时
- **命令说明**: 分析 TODO 内容并自动实现修复

### 🔍 Advanced Analysis Commands

#### /understand

- **用途**: 分析整个项目架构和模式
- **自动触发场景**: 项目理解、架构分析、代码库熟悉时
- **命令说明**: 深度分析项目结构、设计模式和架构决策

#### /explain-like-senior

- **用途**: 资深级别的代码解释，带上下文
- **自动触发场景**: 复杂代码解释、技术分享、知识传递时
- **命令说明**: 以资深开发者视角解释代码逻辑和设计考虑

#### /contributing

- **用途**: 完整的贡献准备度分析
- **自动触发场景**: 准备贡献代码、开源参与时
- **命令说明**: 分析项目贡献指南和准备度

#### /make-it-pretty

- **用途**: 提升可读性，不改变功能
- **自动触发场景**: 代码美化、可读性优化时
- **命令说明**: 重构代码提升可读性，保持功能不变

### 📁 Session & Project Management Commands

#### /session-start

- **用途**: 开始记录会话，集成 CLAUDE.md
- **自动触发场景**: 开始新的开发会话时
- **命令说明**: 初始化会话记录并加载项目上下文

#### /session-end

- **用途**: 总结并保存会话上下文
- **自动触发场景**: 结束开发会话时
- **命令说明**: 生成会话总结并保存重要上下文

#### /docs

- **用途**: 智能文档管理和更新
- **自动触发场景**: 文档更新、README 维护时
- **命令说明**: 自动更新和维护项目文档

#### /todos-to-issues

- **用途**: 将代码 TODO 转换为 GitHub issues
- **自动触发场景**: 任务管理、issue 创建时
- **命令说明**: 扫描 TODO 并创建对应的 GitHub issues

#### /undo

- **用途**: 安全回滚，使用 git checkpoint 恢复
- **自动触发场景**: 需要撤销更改、回滚操作时
- **命令说明**: 使用 git 安全回滚到之前的检查点

### 使用指南

#### 🎯 **自动触发 vs 手动调用**

**自动触发命令**（无冲突，可用自然语言）：

- 基础工作流：cleanproject, commit, format, test
- 项目管理：understand, docs, session-start/end
- TODO 管理：find-todos, create-todos, fix-todos
- 功能开发：scaffold, implement
- 代码优化：make-it-pretty, fix-imports, predict-issues
- 特殊工具：explain-like-senior, todos-to-issues, undo, remove-comments

**手动调用命令**（有冲突，请明确指定）：

- 重构相关：/refactor vs /refactor-clean
- 审查相关：/review vs /ai-review vs /full-review vs /multi-agent-review
- 安全相关：/security-scan vs /security-hardening

1. **智能选择**: 根据上下文自动选择最合适的无冲突命令
2. **明确指定**: 对于有冲突的命令，请使用`/命令名`格式明确调用
3. **验证阶段**: 多数命令包含验证和优化阶段，确保输出质量

### 命令使用示例

```bash
# 开发工作流
/scaffold user-profile     # 生成用户档案功能
/test                      # 运行测试
/commit                    # 智能提交

# 代码质量
/review                    # 全面代码审查
/security-scan            # 安全扫描
/refactor                 # 智能重构

# 项目管理
/session-start            # 开始会话
/understand              # 理解项目
/docs                    # 更新文档
```

### 注意事项

- 命令执行前会进行验证，确保安全性
- 某些命令可能需要额外确认（如/undo）
- 命令可以组合使用以完成复杂任务
- 所有命令都遵循项目的开发规范和哲学
- "自动化规则：每次前端改动后，使用 Playwright 自动打开浏览器、截图、检查错误，并根据提示中的验收标准调整。"

## 企业扩展 Feature Flag 统一管理

**重要说明**: 为确保前后端一致性，所有企业相关功能必须使用统一的 Feature Flag 控制。

### Feature Flag 命名规范

```python
# 后端Django Settings (settings.py)
ENTERPRISE_FLAGS = {
    'ENTERPRISE_SUBSCRIPTION_ENABLED': False,      # 企业订阅功能
    'ENTERPRISE_ADMIN_PANEL_ENABLED': False,       # 企业管理后台
    'ENTERPRISE_SEAT_MANAGEMENT_ENABLED': False,   # 席位管理功能
    'ENTERPRISE_BULK_PURCHASE_ENABLED': False,     # 批量购买功能
    'ENTERPRISE_REPORTING_ENABLED': False,         # 企业报表统计
    'ENTERPRISE_DATA_ISOLATION_ENABLED': False,    # 企业数据隔离
    'ENTERPRISE_RBAC_ROLE_ENABLED': False,         # Enterprise Admin角色
}
```

```typescript
// 前端配置 (frontend/src/config/featureFlags.ts)
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

### 企业版触发条件统一标准

**市场验证阶段触发条件**:

- 月付费用户数 > 500 人
- 企业主动咨询数 >= 3 家
- 个人会员续费率 > 60%

**满足条件后的行动**:

1. 启用基础企业功能 Flag (ENTERPRISE_SUBSCRIPTION_ENABLED)
2. 开展 2-3 家试点企业验证
3. 收集反馈后决定完整企业版上线

### 使用方式

```python
# 后端使用示例
from django.conf import settings

if settings.ENTERPRISE_FLAGS['ENTERPRISE_SUBSCRIPTION_ENABLED']:
    # 企业订阅逻辑
    process_enterprise_subscription(user)
```

```typescript
// 前端使用示例
import { ENTERPRISE_FLAGS } from '@/config/featureFlags'

if (ENTERPRISE_FLAGS.ENTERPRISE_ADMIN_PANEL_ENABLED) {
  // 显示企业管理面板
  showEnterpriseAdminPanel()
}
```

### MVP 阶段配置

当前所有企业 Flag 设置为`false`，确保：

- 个人用户功能 100%不受影响
- 企业相关 UI 完全隐藏
- 企业逻辑预留但不执行
- 数据库字段预留但不启用

# 文件读取规则

- 只有在读取项目外部文件时才考虑使用 MCP filesystem 工具
