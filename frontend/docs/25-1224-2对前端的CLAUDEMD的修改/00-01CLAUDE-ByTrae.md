# 前端执行细则（Frontend Execution Charter）

## 1. 权威与优先级

- `/CLAUDE.md`（项目根目录）是【唯一宪法】，不可违反、不可重写、不可稀释
- 本文件是前端层面的具体执行细则，回答"在前端具体怎么做"
- 所有前端开发必须遵守本文件中的规则

## 2. 页面与路由实现

### 2.1 路由结构

| 路由路径               | 组件位置                | 职责说明                  |
| ---------------------- | ----------------------- | ------------------------- |
| `/`                    | `views/HomeView.vue`    | 首页，展示课程列表        |
| `/course/:slug`        | `views/CourseDetails.vue` | 课程详情页，展示课程内容  |
| `/program/:slug`       | `views/program/[slug].vue` | 学习路径页，展示系列课程  |
| `/cart`                | `views/ShoppingCart.vue` | 购物车页面                |
| `/order/:id?`          | `views/Order.vue`       | 订单页面                  |
| `/user`                | `views/PersonalCenter.vue` | 个人中心页面              |
| `/about`               | `views/AboutView.vue`   | 关于页面                  |
| `/404`                 | `views/NotFound.vue`    | 404页面                   |

### 2.2 路由守卫

- 首页路由支持从URL参数 `stage` 读取学习阶段，用于保持状态
- 课程和程序路由使用 `beforeEnter` 守卫验证slug的存在性
- 所有需要登录的路由使用 `meta: { requiresAuth: true }` 标记

### 2.3 页面组件职责

| 组件名称              | 职责说明                                  |
| --------------------- | ----------------------------------------- |
| `CourseIntro.vue`     | 展示课程简介、目标和基本信息              |
| `CourseCatalog.vue`   | 展示课程章节和课程结构                    |
| `CourseReviews.vue`   | 展示课程评价和评分                        |
| `CourseRelated.vue`   | 展示相关课程推荐                          |
| `CourseTabs.vue`      | 管理课程详情页的标签切换                  |

## 3. 数据与状态管理

### 3.1 状态管理架构

- 使用 Pinia 进行状态管理
- 核心状态包括：课程数据、程序数据、当前学习阶段、用户认证状态等

### 3.2 Store 职责

| Store 文件             | 职责说明                                  |
| ---------------------- | ----------------------------------------- |
| `authStore.ts`         | 管理用户认证状态                          |
| `courseStore.ts`       | 管理课程数据、程序数据和学习阶段          |
| `uiStore.ts`           | 管理UI状态，如弹窗、通知等                |

### 3.3 数据模型

- `Course`：包含课程的基本信息、价格、阶段、标签等
- `Program`：包含学习路径的配置、课程列表等
- 所有数据模型定义在 `types/` 目录下

### 3.4 阶段管理

- 学习阶段使用 `StageKey` 枚举：`beginner`、`intermediate`、`advanced`
- 使用 `assertStageKey` 函数进行运行时校验，确保 fail-fast 原则
- 阶段数据进入 store、路由或组件前必须调用 `assertStageKey`

## 4. Slug 管理

### 4.1 Slug 生成规则

- 使用 `utils/slug.ts` 中的 `generateCourseSlug` 函数生成课程slug
- Slug 必须可读、稳定、与内容一致
- Level 必须出现且只能是枚举值：`beginner` / `intermediate` / `advanced`
- Tool 作为可选段：有工具就写，没有就不写
- 禁止堆砌营销词、临时状态、UI状态

### 4.2 Slug 验证

- 路由守卫中验证课程和程序slug的存在性
- 使用 `courseStore.getCourseBySlug` 和 `courseStore.getProgramBySlug` 进行验证
- 不存在的slug会被重定向到404页面

## 5. JSON-LD 实现

### 5.1 JSON-LD 生成工具

| 工具函数                | 职责说明                                  |
| ----------------------- | ----------------------------------------- |
| `buildCourseJsonLd.ts`  | 生成课程页面的JSON-LD数据                 |
| `buildProgramJsonLd.ts` | 生成学习路径页面的JSON-LD数据             |

### 5.2 JSON-LD 核心维度

| Vue 页面            | JSON-LD 核心维度             |
| ------------------- | ---------------------------- |
| `CourseIntro.vue`   | Type + Outcome               |
| `CourseCatalog.vue` | Level + Pathway（课程章节）  |
| `CourseReviews.vue` | Access（通过用户身份判定）   |
| `CourseRelated.vue` | Type + Pathway（跨课程推荐） |

### 5.3 课程 JSON-LD 规则

- 必须使用 `DefinedTerm` 格式的 `educationalLevel`，引用 `/levels` 页面
- 必须包含 `offers` 字段，明确课程价格和访问方式
- 必须包含 `learningOutcome`，描述学习结果
- 必须使用 `isPartOf` 关联到对应的学习路径

### 5.4 学习路径 JSON-LD 规则

- Schema 类型必须使用 `EducationalOccupationalProgram`
- 必须使用 `hasPart` 定义课程顺序
- 必须明确学习路径的目标和预期成果

## 6. 组件开发规范

### 6.1 组件命名

- 页面组件使用 PascalCase，如 `HomeView.vue`
- 功能组件使用 PascalCase，如 `CourseCard.vue`
- 组件文件放置在 `components/` 目录下，按功能模块分组

### 6.2 组件通信

- 父子组件通信使用 props 和 emit
- 跨组件通信使用 Pinia store
- 避免使用事件总线（Event Bus）

### 6.3 组件职责

- 每个组件必须遵循单一职责原则
- 页面组件负责数据获取和页面布局
- 功能组件负责具体功能实现和UI展示

## 7. 样式与设计

### 7.1 样式架构

- 使用 CSS 变量定义主题颜色和尺寸
- 避免使用内联样式
- 组件样式使用 `<style scoped>` 或 CSS Modules

### 7.2 响应式设计

- 支持移动端和桌面端
- 使用媒体查询实现响应式布局
- 确保在不同设备上的良好体验

## 8. SEO 与性能优化

### 8.1 SEO 最佳实践

- 每个页面必须包含合适的 `title` 和 `meta` 标签
- 必须生成正确的 JSON-LD 结构化数据
- 图片必须包含 `alt` 属性
- 确保良好的页面加载速度

### 8.2 性能优化

- 使用 Vue 的异步组件和代码分割
- 优化图片加载，使用适当的图片格式和尺寸
- 减少不必要的网络请求
- 使用缓存机制减少重复请求

## 9. 开发与构建流程

### 9.1 开发环境

- 使用 Vite 作为构建工具
- 使用 TypeScript 进行类型检查
- 使用 ESLint 和 Prettier 进行代码质量检查和格式化

### 9.2 构建命令

| 命令                 | 说明                          |
| -------------------- | ----------------------------- |
| `npm run dev`        | 启动开发服务器                |
| `npm run build`      | 构建生产版本                  |
| `npm run typecheck`  | 运行类型检查                  |
| `npm run lint`       | 运行代码质量检查              |

## 10. 测试与质量保障

### 10.1 测试策略

- 使用 Playwright 进行端到端测试
- 关键功能必须编写测试用例
- 定期运行测试确保功能正常

### 10.2 代码质量

- 遵循 ESLint 规则
- 确保 TypeScript 类型正确
- 代码必须经过 Review 才能合并

## 11. 版本控制

### 11.1 Git 工作流

- 遵循 Git Flow 工作流
- 功能开发在 feature 分支进行
- 定期合并到 develop 分支
- 发布版本合并到 main 分支

### 11.2 提交规范

- 提交信息必须清晰描述变更内容
- 遵循 Conventional Commits 规范
- 重要变更必须更新 CHANGELOG.md

## 12. 安全规范

### 12.1 数据安全

- 敏感数据必须加密存储
- 避免在前端存储敏感信息
- API 请求必须使用 HTTPS

### 12.2 代码安全

- 避免 XSS 攻击，对用户输入进行验证和转义
- 避免 CSRF 攻击，使用合适的防护机制
- 定期更新依赖，修复安全漏洞

## 13. 文档与知识管理

### 13.1 文档更新

- 代码变更必须同步更新相关文档
- 新功能必须添加文档说明
- 文档必须保持最新和准确

### 13.2 知识共享

- 定期进行代码 Review 和知识分享
- 重要决策必须记录在文档中
- 建立和维护技术知识库

## 14. 实施与执行

### 14.1 规则生效

- 本文件自发布之日起生效
- 所有前端开发必须遵守本文件中的规则
- 规则变更必须经过团队讨论和批准

### 14.2 违规处理

- 违反规则的代码必须被修正
- 严重违规者将受到相应的处罚
- 定期进行规则执行情况的检查和评估

## 15. 版本信息

*Version: 1.0.0*
*Last updated: 2025-12-25*