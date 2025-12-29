## 需要添加到 AI\_EXECUTION\_CONTEXT.md 的内容

### 1. 企业功能 Feature Flag 管理

* 前后端统一的 Feature Flag 命名规范

* 企业功能的触发条件和 MVP 阶段配置

* 前后端 Feature Flag 的使用示例

### 2. API 集成细节

* 后端 API 的基础 URL 和生产 URL

* 身份验证方式（JWT 令牌）

* 统一的 API 响应格式

### 3. 开发理念与决策框架

* 核心开发信念和简单性原则

* 实现流程和遇到困难时的预案

* 决策框架（可测试性 > 可读性 > 一致性 > 简单性）

### 4. SEO/AEO 优化状态

* 已完成的 SEO 准备工作

* 动态 Meta 标签和 JSON-LD 实现

* Sitemap 自动生成和 robots.txt 配置

### 5. 前后端边界宪法

* 后端职责：数据源、语义一致性、API 设计、身份验证

* 前端职责：内容展示、用户体验、JSON-LD 生成、路由管理、状态管理

### 6. 国内版语言策略

* V1.0 简化策略（仅简体中文）

* 性能优势和未来规划

* 海外简中用户优化策略

### 7. 统一分析策略

* 分析工具选择（百度统计）

* 前后端分析实现方式

* 事件跟踪标准和分阶段实施计划

### 8. 部署架构

* 前端（Vercel）和后端（Railway）部署配置

* CI/CD 流水线和环境配置

* 数据库迁移策略

## 需要单独提取的示范代码

### 1. Vue 3 组件结构示例

* 文件：`docs/ai/snippets/vue-component-structure.md`

* 内容：推荐的 Vue 3 组件结构和最佳实践

### 2. Pinia 状态管理示例

* 文件：`docs/ai/snippets/pinia-state-management.md`

* 内容：Pinia 存储的最佳实践和示例代码

### 3. 动画效果规范示例

* 文件：`docs/ai/snippets/animation-guidelines.md`

* 内容：推荐的动画实现方式和规范

### 4. 无障碍设计示例

* 文件：`docs/ai/snippets/accessibility-examples.md`

* 内容：图像无障碍、表单无障碍、键盘可访问性示例

### 5. JSON-LD 结构化数据示例

* 文件：`docs/ai/snippets/json-ld-examples.md`

* 内容：Program 页面和 Course 页面的 JSON-LD 实现

### 6. 动态 Meta 标签示例

* 文件：`docs/ai/snippets/dynamic-meta-tags.md`

* 内容：动态管理 Meta 标签的实现方式

### 7. Axios 配置示例

* 文件：`docs/ai/snippets/axios-config.md`

* 内容：Axios 拦截器和 API 服务模式

### 8. 路由配置示例

* 文件：`docs/ai/snippets/router-config.md`

* 内容：动态路由、路由守卫和懒加载示例

### 9. 会员系统集成示例

* 文件：`docs/ai/snippets/membership-integration.md`

* 内容：会员状态管理和访问控制示例

### 10. RBAC 权限系统示例

* 文件：`docs/ai/snippets/rbac-implementation.md`

* 内容：基于角色的访问控制实现示例

## 实施步骤

1. 更新 AI\_EXECUTION\_CONTEXT.md，添加上述8个方面的内容
2. 创建 `docs/ai/snippets/` 目录（如果不存在）
3. 提取示范代码，创建10个独立的代码示例文件
4. 在 AI\_EXECUTION\_CONTEXT.md 中添加对这些代码示例文件的引用

## 预期效果

* AI\_EXECUTION\_CONTEXT.md 将包含更全面的工程现实和背景信息

* 示范代码将被组织到专门的文件中，便于AI查阅和参考

* 文档结构将更加清晰，符合宪法中定义的文档治理体系

* AI将能够更好地理解项目的技术实现细节和开发文化

