# UAI Education Platform Product Requirements Document (PRD) v6.0

## Goals and Background Context

### Goals

• 将UAI教育平台从v5.0版本升级至v6.0版本，全面强化SEO/AEO优化能力
• 实现海内外简体中文用户的全面覆盖，建立百度+Google双引擎流量入口
• 补强区域化元标记、Schema结构化数据、robots/sitemap等技术实现细节
• 扩展多平台AEO支持（Kimi、Bing Chat、夸克等新兴AI搜索平台）
• 建立完整的外链EEAT体系和权威性信号，提升Google排名能力
• 建立SEO/AEO效果监控与迭代机制，确保策略可持续优化

### Background Context

基于SEO/AEO专项评估，UAI教育平台v5.0版本已建立了较为完整的"百度AEO + Google SEO"双引擎策略框架，涵盖了关键词集群、内容矩阵、技术SEO基础设施等核心要素。然而，随着AI搜索生态的快速发展，平台需要在区域化标记、多平台适配、Schema丰富度、外链权威性等方面进行系统性补强，以确保在激烈的教育内容竞争中保持流量获取优势。

本次v6.0升级将重点解决评估中发现的技术盲点，同时前瞻性地布局新兴AI问答平台，为UAI构建更加坚实和可持续的自然流量基础。

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-08-31 | 6.0 | 基于SEO/AEO评估建议的系统性优化升级 | PM John |

## Requirements

### Functional

FR1: 系统必须支持区域化元标记配置，包括 `hreflang="zh-CN"`、`geo.region`、`content-language` 等标记，确保海外搜索引擎正确识别简体中文内容

FR2: 系统必须扩展多平台AEO支持，涵盖夸克、神马、Kimi.com（月之暗面）、Bing Chat、DuckDuckGo AI等新兴AI搜索/问答平台

FR3: 系统必须实现丰富的Schema结构化数据支持，包括Course、Person、Event、Review、FAQPage等JSON-LD标记，支持语音助手调用

FR4: 系统必须提供差异化的robots.txt配置，大陆版本允许BaiduSpider，海外版本允许Googlebot/Bingbot等

FR5: 系统必须实现自动分片的sitemap.xml生成机制，支持大量课程内容的高效索引

FR6: 系统必须提供完整的无障碍SEO支持，包括alt属性、aria-label标签，兼顾AEO辅助读屏友好性

FR7: 系统必须建立SEO/AEO监控体系，支持Search Console（百度版、Google版）、Server Log监控关键词抓取情况

FR8: 系统必须支持A/B测试功能，用于标题、描述等元素的效果测试和优化

FR9: 系统必须提供外链和EEAT信号管理功能，支持学术机构、行业权威的反链计划管理

FR10: 系统必须建立多平台问答内容同步机制，确保同一份简体中文内容适配各平台Snippet格式要求

### Non Functional

NFR1: SEO相关页面的Core Web Vitals必须达到Google Good评分标准（LCP < 2.5s, FID < 100ms, CLS < 0.1）

NFR2: 区域化CDN部署必须确保海外用户访问速度提升15-20%，支持简体中文内容的全球分发

NFR3: Schema结构化数据的渲染不得影响页面初始加载性能，采用异步加载或服务端渲染优化

NFR4: SEO/AEO监控系统必须提供实时数据更新能力，关键指标延迟不超过5分钟

NFR5: 多平台内容同步机制必须支持高并发，单次发布能够同时推送至8+平台且成功率达到95%以上

NFR6: 外链权威性评估系统必须支持自动化Domain Authority检测，减少人工审核工作量70%以上

NFR7: A/B测试系统必须支持流量分割的精确控制，确保测试结果的统计学显著性

NFR8: 系统必须保持向后兼容性，确保v5.0现有SEO配置在升级过程中平滑迁移

## User Interface Design Goals

### Overall UX Vision

创建一个SEO/AEO友好的教育平台界面，在保持现有用户体验质量的基础上，系统性地集成搜索优化元素。界面设计需要平衡"用户友好"与"搜索引擎友好"，确保结构化数据、无障碍标记、语义化HTML等技术要求无缝融入用户交互流程中，让用户在获得优质学习体验的同时，帮助平台在各大搜索和AI问答平台中获得更好的展现效果。

### Key Interaction Paradigms

- **语义化导航模式**：采用清晰的面包屑导航和结构化菜单，既满足用户快速定位需求，也为搜索引擎提供清晰的信息架构信号
- **内容发现增强**：在课程展示、FAQ展示等关键页面集成Schema标记，通过结构化数据提升搜索结果的富摘要展现
- **多平台内容同步界面**：为运营团队提供统一的内容发布界面，支持一键同步至百度、Google、Kimi等多个平台
- **SEO效果监控面板**：集成实时SEO指标展示，让运营团队能够直观了解优化效果

### Core Screens and Views

- **SEO优化的课程详情页**：集成Course Schema、评价Schema、FAQ Schema等结构化数据
- **多语言/区域化管理界面**：支持hreflang、geo.region等元标记的可视化配置
- **外链权威性管理页面**：EEAT信号管理、合作机构反链跟踪界面  
- **多平台AEO内容同步中心**：统一管理向夸克、Kimi、Bing Chat等平台的内容分发
- **SEO/AEO效果监控仪表盘**：关键词排名、流量来源、转化漏斗的可视化展示
- **A/B测试管理界面**：支持标题、描述等SEO元素的测试配置和结果分析

### Accessibility: WCAG AA

严格遵循WCAG AA标准，不仅满足无障碍合规要求，同时服务于SEO/AEO目标：
- 完整的alt属性和aria-label标签覆盖，支持AI搜索引擎的内容理解
- 语义化HTML结构，为搜索引擎提供清晰的内容层次信息
- 键盘导航支持，提升页面的可访问性评分
- 色彩对比度优化，间接提升用户体验指标

### Branding

保持UAI教育平台现有的专业教育品牌形象，同时强化权威性信号：
- 突出教师资质认证、课程认证等权威标识，增强EEAT信号
- 在合适位置展示合作院校、行业认可等权威背书
- 统一的视觉语言确保在不同搜索平台展现时的品牌一致性
- 针对简体中文用户的本土化设计元素，提升用户认同感

### Target Device and Platforms: Web Responsive

基于现有技术栈继续坚持响应式设计，同时优化SEO表现：
- 移动优先的响应式布局，符合Google移动优先索引要求
- 跨设备的Core Web Vitals优化，确保在不同设备上都达到Good评分
- 渐进式Web应用(PWA)特性考虑，提升移动端用户体验和搜索排名
- 确保结构化数据在不同设备上的正确渲染

## Technical Assumptions

### Repository Structure: Monorepo

继续使用当前的Monorepo结构，在现有frontend和backend目录基础上增加SEO/AEO相关模块，便于统一管理和版本控制。

### Service Architecture

**CRITICAL DECISION** - 维持现有的前后端分离架构（Vue 3 + Django REST），同时增加SEO服务层：

- **前端（Vue 3 + Vite）**: 负责SSR/SSG优化，集成结构化数据渲染，实现Core Web Vitals优化
- **后端（Django REST Framework）**: 扩展SEO API模块，提供元数据管理、Schema生成、多平台内容同步等服务
- **SEO服务层**: 新增独立的SEO微服务模块，处理sitemap生成、robots.txt管理、搜索引擎提交等任务
- **监控服务**: 集成Search Console API、百度统计API等第三方监控服务

### Testing Requirements

**CRITICAL DECISION** - 扩展现有测试框架，增加SEO特定的测试需求：

- **单元测试**: 继续使用现有框架，重点测试SEO API逻辑、Schema生成函数
- **集成测试**: 新增SEO功能的端到端测试，验证元数据正确性、结构化数据有效性
- **SEO专项测试**: 
  - Schema验证测试（使用Google Rich Results Test）
  - Core Web Vitals性能测试（Lighthouse CI集成）
  - 多平台内容同步测试
  - A/B测试功能验证
- **手动测试**: SEO效果需要定期人工验证，建立SEO测试检查清单

### Additional Technical Assumptions and Requests

**框架和库选择**：
- 继续使用Bootstrap 5.3.6作为UI框架，确保响应式和无障碍性
- 集成Vue SEO插件（如vue-meta或@unhead/vue）用于动态元数据管理
- 使用schema-dts或类似库确保结构化数据的类型安全

**数据库扩展**：
- 扩展现有MySQL数据库，新增SEO元数据表、A/B测试配置表、外链管理表
- 考虑使用Redis缓存频繁访问的SEO数据（sitemap、Schema等）

**第三方服务集成**：
- 百度Search Console API、Google Search Console API
- 百度统计、Google Analytics 4
- 各大AI平台的内容提交API（如有）
- Domain Authority检测服务API

**部署和基础设施**：
- 继续使用Vercel（前端）+ Railway（后端）部署架构
- 配置全球CDN确保海外访问性能
- 设置定时任务处理sitemap更新、监控数据收集等

**安全和合规**：
- 确保所有第三方API调用的安全性
- 遵循GDPR等数据隐私法规（如涉及海外用户）
- API调用频率限制和错误处理机制

**监控和日志**：
- 扩展现有日志系统，记录SEO相关操作和效果数据
- 建立SEO异常告警机制（排名下降、流量异常等）
- 性能监控重点关注Core Web Vitals指标

## Epic List

**Epic 1: SEO基础设施升级与监控体系建立**
建立完整的SEO技术基础设施，包括区域化元标记、Schema结构化数据框架、监控API集成等核心能力，为后续优化工作奠定技术基础。

**Epic 2: 多平台AEO内容管理与分发系统**  
开发统一的内容管理界面，实现向百度、Google、Kimi、Bing Chat等多个AI平台的内容同步分发，建立问答内容的标准化生产和管理流程。

**Epic 3: 外链权威性与EEAT信号管理系统**
构建外链权威性评估和管理系统，建立与学术机构、行业权威的合作反链计划，系统性提升平台的专业权威信号。

**Epic 4: SEO/AEO效果分析与A/B测试平台**
建立完整的SEO效果监控、分析和优化迭代机制，包括A/B测试功能、效果仪表盘、自动化报告等，形成数据驱动的SEO优化闭环。

## Epic 1: SEO基础设施升级与监控体系建立

**Epic目标**: 建立完整的SEO技术基础设施，包括区域化元标记系统、Schema结构化数据框架、第三方监控API集成等核心技术能力。通过这个Epic，UAI平台将具备系统性的SEO优化技术基础，为后续的内容优化和效果分析提供坚实的技术支撑。

### Story 1.1: 区域化元标记配置系统

As a SEO专家,
I want 在后台配置页面和课程的区域化元标记(hreflang, geo.region, content-language),
so that 海外搜索引擎能够正确识别和索引简体中文内容，提升海外用户的搜索发现率。

#### Acceptance Criteria
1. 后台管理界面提供区域化元标记的可视化配置功能
2. 支持页面级别和全站级别的hreflang="zh-CN"配置  
3. 自动在HTML头部生成正确的geo.region和content-language标记
4. 配置变更后实时生效，无需重新部署
5. 提供元标记预览功能，确保配置正确性

### Story 1.2: Schema结构化数据框架搭建

As a 内容运营人员,
I want 系统自动为课程、讲师、FAQ等内容生成标准的Schema结构化数据,
so that 搜索引擎和AI平台能够更好地理解和展示我们的教育内容。

#### Acceptance Criteria
1. 实现Course、Person、Event、Review、FAQPage等Schema类型的自动生成
2. Schema数据以JSON-LD格式嵌入页面头部
3. 支持动态数据绑定，Schema内容随页面内容自动更新
4. 通过Google Rich Results Test验证Schema数据有效性
5. 提供Schema数据的后台预览和调试功能

### Story 1.3: 搜索引擎API集成基础

As a SEO分析师,
I want 系统集成百度Search Console和Google Search Console的API,
so that 能够自动获取搜索表现数据，为优化决策提供数据支持。

#### Acceptance Criteria  
1. 成功集成百度Search Console API和Google Search Console API
2. 实现OAuth认证流程，安全存储API访问凭证
3. 能够获取关键词排名、点击率、展现量等核心数据
4. 建立数据同步定时任务，每日更新搜索表现数据
5. 提供API连接状态监控和异常告警机制

### Story 1.4: Core Web Vitals性能监控集成

As a 技术负责人,
I want 系统自动监控和报告Core Web Vitals指标,
so that 确保页面性能符合Google搜索排名要求，提升用户体验和SEO表现。

#### Acceptance Criteria
1. 集成Lighthouse CI进行自动化性能测试
2. 监控LCP、FID、CLS等Core Web Vitals关键指标
3. 建立性能指标的历史趋势记录和报告
4. 性能指标低于Good评分时自动告警
5. 提供性能优化建议和改进跟踪功能

### Story 1.5: 差异化Robots.txt和Sitemap管理

As a SEO技术专家,
I want 系统支持针对不同地区和搜索引擎的robots.txt差异化配置,
so that 能够精确控制不同搜索引擎的抓取行为，优化索引效率。

#### Acceptance Criteria
1. 支持基于用户地理位置的动态robots.txt生成
2. 大陆版本允许BaiduSpider，海外版本允许Googlebot/Bingbot
3. 实现自动分片的XML sitemap生成，支持大量课程内容
4. sitemap自动更新机制，内容变化时实时重新生成
5. 提供sitemap提交到各大搜索引擎的自动化功能

## Epic 2: 多平台AEO内容管理与分发系统

**Epic目标**: 开发统一的内容管理和分发系统，实现向百度、Google、Kimi、Bing Chat、夸克等多个AI搜索平台的内容同步发布。建立标准化的问答内容生产流程，确保同一份简体中文内容能够适配各平台的Snippet格式要求，最大化AEO流量获取效果。

### Story 2.1: 统一内容管理界面开发

As a 内容运营专员,
I want 在统一的后台界面管理所有平台的问答内容,
so that 能够高效地创建、编辑和维护适配多个AI搜索平台的教育内容。

#### Acceptance Criteria
1. 提供直观的内容编辑器，支持富文本和Markdown格式
2. 内容分类管理功能（课程相关、技能相关、行业相关等）
3. 内容版本控制，支持草稿、待审核、已发布等状态管理
4. 批量内容导入导出功能，支持Excel和CSV格式
5. 内容预览功能，模拟在不同平台的展示效果

### Story 2.2: 多平台内容格式适配引擎

As a SEO运营专家,
I want 系统自动将标准内容转换为适配各平台Snippet要求的格式,
so that 同一份内容能够在百度、Google、Kimi等平台获得最佳展示效果。

#### Acceptance Criteria
1. 建立各平台Snippet格式的配置模板（长度限制、格式要求等）
2. 自动化内容格式转换引擎，支持标题、描述、标签的平台适配
3. 智能内容截取和优化，确保关键信息在有限字符内完整展现
4. 平台特定的关键词密度和语义优化
5. 转换结果预览和手动调整功能

### Story 2.3: 百度系平台内容同步集成

As a 国内市场运营负责人,
I want 系统支持向百度知道、百度百科、文心一言等平台自动分发内容,
so that 最大化在国内主流AI问答平台的曝光机会。

#### Acceptance Criteria
1. 集成百度系平台的内容发布API（如可用）
2. 建立内容发布队列，避免频率限制导致的发布失败
3. 发布状态跟踪，记录成功/失败状态和原因
4. 支持定时发布和批量发布功能
5. 平台反馈数据收集（浏览量、互动数等）

### Story 2.4: 海外AI平台内容同步集成

As a 海外市场拓展专员,
I want 系统支持向Google搜索、Bing Chat、Kimi等海外和新兴AI平台分发内容,
so that 扩大海外简体中文用户的发现和触达机会。

#### Acceptance Criteria
1. 集成Google My Business、Bing Places等平台的内容API
2. 新增对Kimi.com（月之暗面）等新兴AI平台的内容提交支持
3. 建立地理位置智能分发逻辑，针对海外用户优化内容推送
4. 跨平台内容一致性检查，确保品牌信息统一
5. 海外平台专有的内容优化（时区、货币、联系方式等本地化）

### Story 2.5: 内容效果监控与优化建议系统

As a 数据分析师,
I want 监控各平台内容的表现效果并获得优化建议,
so that 能够持续改进内容策略，提升AEO流量转化效果。

#### Acceptance Criteria
1. 建立跨平台内容效果数据收集机制
2. 关键指标监控：曝光量、点击率、转化率等
3. 内容表现对比分析，识别高效内容模式
4. AI驱动的内容优化建议生成
5. 效果报告自动生成和邮件推送功能

## Epic 3: 外链权威性与EEAT信号管理系统

**Epic目标**: 构建完整的外链权威性评估和管理系统，建立与学术机构、行业权威、知名媒体的系统化合作反链计划。通过提升专业性(Expertise)、权威性(Authority)、可信度(Trustworthiness)信号，显著改善Google等搜索引擎对UAI平台的评价，提升整体搜索排名和流量质量。

### Story 3.1: 外链权威性评估工具开发

As a SEO策略专员,
I want 系统自动评估潜在合作网站的权威性和相关性,
so that 能够科学地筛选高质量外链机会，避免低质量外链对排名的负面影响。

#### Acceptance Criteria
1. 集成Domain Authority、Page Authority等权威性评估API
2. 自动分析目标网站的行业相关性和内容质量
3. 评估网站的流量质量、用户参与度等指标
4. 建立外链机会评分模型，综合多维度指标给出建议
5. 提供批量网站评估功能，支持Excel导入导出

### Story 3.2: 学术机构合作管理系统

As a 商务合作经理,
I want 管理与高等院校、研究机构的合作关系和外链建设,
so that 通过权威学术背书提升平台在教育领域的专业可信度。

#### Acceptance Criteria
1. 建立学术机构合作伙伴数据库，记录合作状态和联系信息
2. 跟踪来自.edu域名的外链建设进展
3. 管理学术合作内容（客座文章、研究报告、课程认证等）
4. 合作效果评估，监控学术外链对排名的积极影响
5. 自动化合作进展报告和续签提醒功能

### Story 3.3: 行业权威背书管理系统

As a 品牌营销经理,
I want 系统化管理行业认证、媒体报道、专家推荐等权威背书,
so that 在网站上有效展示这些EEAT信号，提升用户和搜索引擎的信任度。

#### Acceptance Criteria
1. 权威背书内容库管理（证书、奖项、媒体报道、专家推荐等）
2. 背书展示组件，在合适页面自动展示相关权威信号
3. 背书有效期管理，过期内容自动隐藏或提醒更新
4. 背书来源可信度验证，避免虚假权威信号
5. 背书效果跟踪，分析不同类型背书对转化率的影响

### Story 3.4: 内容专家署名与作者权威系统

As a 内容质量管理员,
I want 建立完善的内容作者署名和专家资质展示系统,
so that 通过展示作者专业背景提升内容的专业性和可信度评分。

#### Acceptance Criteria
1. 专家作者档案管理系统，包含教育背景、职业经历、专业认证
2. 内容自动关联作者信息，在文章页面展示作者资质
3. 作者权威度评估，基于资历、发文质量等因素给出评分
4. Schema Person标记自动生成，帮助搜索引擎识别作者权威性
5. 专家作者SEO页面，集中展示平台的专业团队实力

### Story 3.5: 外链建设自动化工作流

As a SEO执行专员,
I want 自动化的外链建设工作流程和效果跟踪,
so that 能够高效执行外链策略并实时监控建设效果。

#### Acceptance Criteria
1. 外链建设任务管理系统，支持任务分配和进度跟踪
2. 外链提交模板库，针对不同类型网站的标准化沟通模板
3. 外链状态自动检测，监控外链是否正常存在和nofollow状态
4. 外链效果分析报告，展示新增外链对排名和流量的贡献
5. 外链建设ROI计算，评估不同外链渠道的投入产出比

## Epic 4: SEO/AEO效果分析与A/B测试平台

**Epic目标**: 建立完整的SEO/AEO效果监控、分析和优化迭代机制，通过数据驱动的方式持续优化搜索表现。构建A/B测试平台用于标题、描述等关键元素的实验优化，建立SEO效果仪表盘和自动化报告体系，形成"监控→分析→优化→验证"的完整闭环。

### Story 4.1: SEO效果监控仪表盘开发

As a SEO数据分析师,
I want 在统一的仪表盘查看所有SEO关键指标的实时数据和历史趋势,
so that 能够快速识别SEO表现变化并及时调整优化策略。

#### Acceptance Criteria
1. 集成多数据源：Search Console、百度统计、Google Analytics等
2. 关键指标展示：关键词排名、有机流量、点击率、转化率等
3. 数据可视化图表：趋势线、对比图、热力图等多种展示方式
4. 自定义时间范围查询和数据导出功能
5. 异常指标自动告警，如排名下降、流量异常等

### Story 4.2: A/B测试管理平台开发

As a SEO优化专员,
I want 对页面标题、meta描述、Schema标记等关键SEO元素进行A/B测试,
so that 能够科学验证优化方案的效果，避免凭经验做决策。

#### Acceptance Criteria
1. A/B测试创建和配置界面，支持多种测试元素（标题、描述、Schema等）
2. 流量分割机制，精确控制测试组和对照组的用户比例
3. 测试效果实时监控，展示关键指标的对比变化
4. 统计学显著性检验，确保测试结果的可靠性
5. 测试历史记录和知识库，积累优化经验

### Story 4.3: 关键词排名跟踪与分析系统

As a SEO策略规划师,
I want 自动跟踪目标关键词在各大搜索引擎的排名变化,
so that 能够评估SEO策略效果并及时调整关键词布局。

#### Acceptance Criteria
1. 支持百度、Google、搜狗、360等主流搜索引擎的排名监控
2. 关键词分组管理，按课程类别、难度等维度组织
3. 排名变化趋势分析和竞争对手排名对比
4. 关键词机会发现，识别排名提升潜力大的词汇
5. 排名报告自动生成和定期邮件推送

### Story 4.4: 转化漏斗分析与归因系统

As a 数据分析经理,
I want 分析从搜索发现到付费转化的完整用户路径,
so that 能够识别转化瓶颈并优化用户体验提升ROI。

#### Acceptance Criteria
1. 建立搜索→点击→浏览→注册→付费的完整转化漏斗
2. 多触点归因分析，识别不同搜索渠道的转化贡献
3. 用户行为路径分析，发现高价值用户的共同特征
4. 转化率优化建议生成，基于数据洞察提供行动指导
5. ROI计算和投入产出比分析报告

### Story 4.5: 自动化SEO报告与优化建议系统

As a SEO团队负责人,
I want 系统自动生成SEO效果报告并提供优化建议,
so that 能够向管理层展示SEO工作成果并指导团队持续改进。

#### Acceptance Criteria
1. 周报、月报、季报等多频次自动报告生成
2. 报告包含关键指标总结、亮点分析、问题识别、改进建议等
3. AI驱动的优化建议生成，基于数据模式识别提供策略建议
4. 报告自定义模板，适配不同受众的信息需求
5. 报告分发机制，支持邮件、钉钉、企微等多种推送方式