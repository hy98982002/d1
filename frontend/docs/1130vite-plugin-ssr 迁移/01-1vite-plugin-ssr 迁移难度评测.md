下面给你一份 **专为 Trae（或任意代码评测/重构代理）设计的专业提示词**，
它会让 Trae ：

* 正确理解你要从 SPA → vite-plugin-ssr 的迁移目的
* 产出结构级别的评测报告
* 对你的现有项目进行变更分析
* 给出“不破坏现有 SPA”的最小侵入方案
* 给出迁移后 SSG/SEO/AEO 的结构建议
* 给出代码级 diff 建议
* 不会误以为你要完整 SSR

这是你可以 **直接复制粘贴给 Trae 的最终版本提示词**。

---

# 🟦 **📌（可直接复制）Trae 提示词：vite-plugin-ssr 迁移评测报告**

下面是我需要你评测的技术目标，请严格根据这些要求输出：

---

## **🎯 我的网站当前架构：**

* Vue 3 + Vite（SPA 全前端渲染）
* 使用 Vue Router 管理路由
* 使用 PWA（Service Worker + SWR 缓存策略）
* 使用 Slug 作为课程详情页的 URL
* 使用 AEO JSON-LD（动态注入，目前由 SPA 渲染）
* 使用前端纯 SPA 打包方式（没有 SSR，没有 SSG）

---

## **🎯 我现在的目标：迁移到 vite-plugin-ssr（Hybrid：SPA + SSG 的混合模式）**

迁移目的：

1. **为首页 / Program 页 / 课程详情页生成真实的静态 HTML（SSG）**
2. **让 JSON-LD / SEO meta / OG meta 在 HTML 中预渲染（非 JS 注入）**
3. **保证 SPA 用户体验不变（学习系统 / 播放器 / 登录保持纯 SPA）**
4. **不启用 SSR（无需运行时渲染，仅使用 prerender）**
5. **保持 slug、PWA、SWR 全部正常工作**
6. **不破坏现有'src/'文件夹结构，只做“渐进式迁移”**
7. **建立 courses/program 作为 page routes，用 `.page.vue` + `.page.server.js`**
8. **最终实现：SPA（交互层） + SSG（内容层）混合架构**

---

## **🎯 我需要你评测的内容：**

请为我生成一个 **完整的技术评测报告**，包含：

### **1. 架构级评估**

* 我当前的 SPA 项目是否适合引入 vite-plugin-ssr？
* 哪些部分是可以直接复用？
* 哪些部分需要结构调整？
* 是否会破坏 PWA / SWR？（必须确保不会）
* 是否会破坏 slug 课程 URL？（必须确保不会）

### **2. 推荐的最小侵入式迁移方案**

告诉我：

* 哪些文件需要新增（如 `.page.vue`, `.page.server.js`, `_default.page.server.js`）
* 哪些文件需要移动或调整
* 哪些地方必须新增 SSR/SSG 入口
* 哪些地方可以保持原状不动
* 如何让 course 程序页面保持 slug 路由
* 如何保留 Vue Router 作为客户端交互路由

请务必保持“最小改动原则”。

---

### **3. JSON-LD / SEO / OG 部分迁移建议**

必须包含：

* JSON-LD 如何放入 `.page.server.js`
* OG meta 如何由 server 注入
* title/description 如何由 server 生成
* 当前 SPA 的动态注入方式如何迁移成静态 HTML 输出
* 如何保证 AEO 的结构节点（position / hasPart / isBasedOn / breadcrumb / mainEntityOfPage）全部被 SSR/SSG 正确写入 HTML

---

### **4. PWA / Service Worker 兼容性分析**

必须明确：

* vite-plugin-ssr 会不会破坏 PWA？
* 需要对 Service Worker 做哪些改动（如果有的话）
* SSG 输出的静态 HTML 是否可由 SWR 正常缓存
* 离线缓存是否能继续工作
* prerender 输出是否影响 workbox

---

### **5. 路由分析（非常重要）**

必须说明：

* SPA 路由（客户端交互）用 Vue Router 保留
* 页面路由（SEO / SSG）由 vite-plugin-ssr 接管
* 如何共存
* 哪些 URL 需要生成 SSG
* 哪些 URL 继续保持 SPA 模式不变

---

### **6. 输出目录结构建议**

请给我一个针对课程平台的推荐结构，如：

```
src/
  pages/
    index.page.vue
    index.page.server.js
    program/
    course/
  renderer/
    _default.page.server.js
    _default.page.client.js
    pageContext.js
```

并说明每个文件的作用。

---

### **7. 给我最终的迁移步骤流程（1 → 10 步）**

比如：

1. 安装 vite-plugin-ssr
2. 添加 SSR/SSG 插件
3. 新建 pages 结构
4. 新建 server 文件
5. 迁移 JSON-LD
6. 迁移 OG meta
7. prerender
8. 部署
9. 测试分享卡
10. 测试 SEO

确保有“逐步 incremental 改动”方案。

---

### **8. 输出可选的代码 diff 示例**

包括：

* `.page.server.js` 模板
* `vite.config.ts` 修改
* prerender 的 script
* 如何注入 JSON-LD 的模板
* 如何渲染 OG meta 的模板

---

# 🟦 **🎯 最终输出格式要求**

请按以下格式输出：

```
# 评测概要（高层结论）
# 架构兼容性分析
# 最小侵入迁移方案
# JSON-LD / SEO 迁移建议
# PWA & SWR 兼容报告
# 路由迁移模型（SPA + SSG）
# 推荐的目录结构
# 迁移步骤（1~10）
# 示例代码与 diff
# 最终建议（重点总结）
```

请确保报告专业、可执行、结构清晰。

---


