# CHANGELOG

## [1.0.0] - 2025-12-17

### Added
- 实现三级课程体系：Beginner/Intermediate/Advanced
- 新增Program路由支持：/program/:slug动态路由
- 实现Program相关store方法：getProgramBySlug、programExists、getProgramCourses
- 新增Program相关类型定义
- 实现动态Meta标签和JSON-LD结构化数据
- 集成sitemap自动生成脚本
- 配置robots.txt允许搜索引擎抓取

### Changed
- 课程slug规则统一使用三级体系术语：beginner/intermediate/advanced
- 路由设计模式统一为动态路由规范
- SEO优化准备工作完成，为SSG迁移打好基础

### Fixed
- 修复课程体系命名不一致问题
- 统一页面语义职责边界

## [0.1.0] - 2025-12-08

### Added
- 实现动态Program路由组件：/program/[slug].vue
- 支持Program页面动态title、description、og:*、twitter:*标签
- 实现Program JSON-LD结构化数据生成
- 配置路由守卫验证资源存在性
- 生成包含16个URL的sitemap.xml

### Changed
- 更新courseStore，添加Program相关方法
- 扩展types/index.ts，添加Program相关类型定义
- 优化路由设计，支持统一的动态路由规范

### Fixed
- 修复页面语义重叠问题
- 统一slug命名规范