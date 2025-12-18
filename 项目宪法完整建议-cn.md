# 项目宪法 (CLAUDE.md)

本文档定义了项目的不可协商规则。
所有 AI 代理、贡献者和未来的重构都必须遵守。

## 1️⃣ 项目目标与长期定位

### 项目愿景与长期方向

- **平台定位**: 基于 Vue 3 + Django 构建的在线教育服务全栈 Web 应用，专注于 AI 课程的 AEO / LRMI 语义优化
- **核心技术**: Vue 3, Django, Pinia, Vue Router 4, TypeScript
- **AEO / SEO 优先级**: 遵循 Schema.org + LRMI + AEO 最佳实践，构建高质量的教育内容知识图谱
- **用户体验**: 提供清晰的学习路径，优化语义结构，提升搜索引擎理解和用户导航体验

---

## 2️⃣ 内容与语义宪法

### 内容语义责任与 AEO 页面角色

> 本节定义了宪法级别的语义边界。
> 违反被视为架构级错误。

#### 页面角色定义 (必须遵循)

为确保正确的 AEO / LRMI 语义对齐，每个页面类型必须遵循单一、不重叠的责任。

##### 1. 课程页面
**目的**: 解释 *这门特定课程教授什么*。

- 重点关注: 课程内容、教授的技能、学习成果、教学大纲、课程
- 禁止: 解释全局学习阶段或学习顺序
- JSON-LD 重点: Course, CourseInstance, educationalLevel (仅参考)

> 课程页面回答:
> "我将在这门课程中学到什么？"

---

##### 2. 级别页面 (`/levels/`)
**目的**: 定义 *学习级别意味着什么*。

- 重点关注: Beginner / Intermediate / Advanced 的定义
- 解释学习者先决条件、预期技能、学习难度
- 聚合属于此级别的课程
- JSON-LD 重点: DefinedTerm (educationalLevel 实体)

> 级别页面回答:
> "Beginner / Intermediate / Advanced 意味着什么？"

---

##### 3. 学习路径页面
**目的**: 描述 *学习顺序和进展*。

- 重点关注: 学习顺序、先决条件、进展逻辑
- 将多个课程和/或级别连接成结构化路径
- 禁止: 重新定义级别含义
- JSON-LD 重点: EducationalOccupationalProgram, hasPart, programPrerequisites

> 学习路径页面回答:
> "我应该先学什么，然后学什么，为什么？"

---

#### 禁止的语义重叠

- ❌ **课程页面**: 禁止解释全局学习阶段或定义 "Beginner" 含义
- ❌ **级别页面**: 禁止教授特定课程内容或定义学习顺序
- ❌ **学习路径页面**: 禁止重复课程内容或重新定义级别含义
- ⚠️ **规则**: 页面不得接管其他页面类型的职责。语义责任重叠被视为结构错误。

---

## 3️⃣ URL / Slug 宪法

### URL 与 Slug 规范规则

#### Slug 的语义原则

- **slug ≠ 展示用**: Slug 不是用于展示目的，而是用于语义锚定
- **slug = 长期稳定语义锚点**: Slug 应长期保持稳定，以维持 SEO 价值
- **SEO / AEO 优先**: Slug 必须遵循 AEO / LRMI 最佳实践，以获得最佳语义理解

---

#### 课程 Slug 规则

- **格式**: `{topic}-{tool}-{level}`
- **级别部分**: 必须使用系统定义的级别术语 (`beginner` / `intermediate` / `advanced`)
- **示例**: `photoshop-ai-design-beginner`
- **禁止**: 使用描述性术语如 `basic` 或 `pro` 代替系统级别术语
- **迁移规则**: 除非有专门的迁移计划，否则现有 slug 可保留以保持向后兼容性

---

#### 级别与学习路径 Slug 规则

- **级别页面**: `/levels/beginner`, `/levels/intermediate`, `/levels/advanced`
- **学习路径页面**: `/programs/ai-design-path`, `/programs/machine-learning-bootcamp`
- **语义清晰度**: Slug 必须清晰指示页面类型和用途

---

## 4️⃣ AEO / Schema / LRMI 宪法

### AEO、Schema.org 和 LRMI 原则

#### Schema 的"真实表达原则"

- ❌ **禁止虚假声明**: JSON-LD 必须准确反映实际课程内容
- ✅ **可验证内容**: 所有 Schema.org 声明必须可从页面内容验证
- ✅ **语义一致性**: JSON-LD 术语必须与页面语义和 URL 结构匹配

---

#### educationalLevel 使用规则

- **必须使用 DefinedTerm**: 避免使用纯字符串，使用结构化的 DefinedTerm 格式
- **必须引用级别实体**: 使用 `@id` 或 `inDefinedTermSet` 链接到 `/levels/` 页面
- **示例**: 
  ```json
  "educationalLevel": {
    "@type": "DefinedTerm",
    "name": "Beginner",
    "@id": "https://www.doviai.com/levels/beginner"
  }
  ```

---

#### 学习路径 / 课程 / 技能的关系规则

- **isPartOf / hasPart**: 使用这些属性定义层次关系
- **programPrerequisites**: 为学习路径页面清晰定义先决条件
- **educationalUse**: 使用 LRMI educationalUse 值对内容类型进行分类
- **禁止**: 使用不相关或误导性属性来夸大 SEO 价值

---

## 5️⃣ 数据模型与页面关系宪法

### 数据模型与页面关系规则

#### 课程 / 级别 / 学习路径的数据职责

- **课程**: 包含特定课程内容、课程、成果和元数据
- **级别**: 定义学习阶段特征、先决条件和聚合课程
- **学习路径**: 定义学习路径，连接多个课程，并解释进展逻辑

#### 单一数据源规则

- **级别定义**: 必须仅在 `/levels/` 页面中定义，在其他地方引用
- **课程数据**: 必须集中在课程存储中，具有一致的标识符
- **学习路径结构**: 必须在学习路径存储中定义，引用现有课程和级别

---

## 6️⃣ 前后端边界宪法

### 前后端责任边界

#### 后端负责什么

- **数据源**: 为所有内容数据提供单一数据源
- **语义一致性**: 确保数据遵循语义规则和 AEO 最佳实践
- **API 设计**: 公开符合页面角色和语义责任的 RESTful 端点
- **身份验证**: 基于 JWT 的安全访问认证

#### 前端负责什么

- **内容展示**: 根据语义规则渲染内容
- **用户体验**: 实现导航、交互元素和响应式设计
- **JSON-LD 生成**: 基于后端数据生成和注入结构化数据
- **路由管理**: 使用适当的守卫和语义验证实现客户端路由
- **状态管理**: 使用 Pinia 管理客户端状态，遵循单一数据源原则

---

## 7️⃣ AI / Agent 行为约束

### AI 与 Agent 行为约束

#### Claude / Codex 的生成红线

- ❌ **不要发明新概念**: 只使用已定义的术语和概念
- ❌ **不要修改 slug 规则**: 遵循已建立的 slug 约定
- ❌ **不要创建新的级别名称**: 只使用 `beginner`, `intermediate`, `advanced`
- ✅ **遵循语义边界**: 尊重页面角色定义和禁止的重叠
- ✅ **使用现有模式**: 遵循已建立的代码模式和架构

#### 如何更改宪法

- **必须更新 CLAUDE.md**: 所有规则更改必须记录在此文件中
- **必须记录更改原因**: 解释更改的必要性及其影响
- **必须保持向后兼容性**: 尽可能避免破坏性更改
- **审查流程**: 重大更改应在实施前进行审查和批准

---

## 8️⃣ CHANGELOG 与宪法同步规则

### 宪法与 CHANGELOG 同步

- **CHANGELOG.md**: 记录"发生了什么" - 实现细节、功能、错误修复
- **CLAUDE.md**: 记录"什么规则改变了" - 语义原则、页面角色、AEO 指南
- **同步要求**: 任何对语义规则或页面角色的更改都必须反映在两个文档中

---

## 9️⃣ 附录

### 附录

#### 示例 JSON-LD 结构

##### 课程页面 JSON-LD 示例
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "AI Photoshop 设计入门",
  "description": "学习 AI 驱动的 Photoshop 设计基础知识。",
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

##### 级别页面 JSON-LD 示例
```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "学习级别",
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

#### 常见错误要避免

1. **混合页面职责**: 例如，在课程页面上解释"Beginner"的含义
2. **使用不正确的级别术语**: 在 slug 或结构化数据中使用 `basic` 而不是 `beginner`
3. **虚假 Schema.org 声明**: 声称教授课程中未实际涵盖的技能
4. **语义重叠**: 让学习路径页面重复课程内容，而不是专注于学习顺序
5. **忽略单一数据源**: 在多个地方定义级别含义

---

# 🎯 使用建议

## 实施路线图

### 立即行动 (现在)

1. ✅ **实现语义页面角色**: 确保课程、级别和学习路径页面遵循其定义的职责
2. ✅ **更新课程 slug**: 将所有课程 slug 中的 `-basic` 替换为 `-beginner`
3. ✅ **增强结构化数据**: 实现带有级别页面引用的 educationalLevel 的 DefinedTerm 格式
4. ✅ **添加级别页面**: 创建带有清晰级别定义的 `/levels/` 页面

### 短期行动 (接下来 2 周)

1. **实现学习路径页面**: 创建连接课程的结构化学习路径
2. **增强 JSON-LD**: 添加更全面的遵循 LRMI 最佳实践的 Schema.org 标记
3. **优化 URL 结构**: 确保所有 URL 遵循语义规则和 AEO 最佳实践
4. **添加站点地图生成**: 将所有级别和学习路径页面包含在站点地图中

### 长期行动 (未来)

1. **构建知识图谱**: 开发更全面的连接课程、技能和学习成果的知识图谱
2. **实现高级 AEO 功能**: 添加 educationalOccupationalProgram、learningResourceType 和其他高级 Schema.org 属性
3. **增强级别进展**: 在级别之间实现清晰的先决条件和进展指示器
4. **优化语音搜索**: 确保语义结构针对语音助手和对话搜索进行优化

---

## 最终原则

> **`CLAUDE.md（根目录） = 项目的语义宪法`**
> **`frontend/CLAUDE.md = 前端执行细则`**

本文档定义了指导所有开发决策的核心语义原则。
所有 AI 代理、贡献者和未来的重构都必须遵守这些规则，以保持一致的 AEO / LRMI 语义对齐和最佳搜索引擎理解。

---

*最后更新: 2025-12-17*
*版本: 1.0.0*