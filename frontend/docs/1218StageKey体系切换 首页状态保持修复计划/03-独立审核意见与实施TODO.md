# 03 - 独立审核意见与实施TODO

> **审核员角色**：独立技术审核员
> **审核时间**：2025-12-18
> **审核对象**：00-StageKey体系切换修复计划 + 01-进一步调整建议
> **审核结论**：✅ **方案可行，建议采用两阶段渐进式实施**

---

## 一、整体评估

### 审核总结

| 维度 | 评分 | 说明 |
|------|------|------|
| **技术可行性** | ⭐⭐⭐⭐⭐ | 方案清晰，技术路径明确 |
| **架构一致性** | ⭐⭐⭐⭐⭐ | 符合项目CLAUDE.md宪法，遵循AEO/LRMI最佳实践 |
| **风险控制** | ⭐⭐⭐⭐ | 有明确的修改顺序，但需要补充回滚方案 |
| **长期维护性** | ⭐⭐⭐⭐⭐ | 01*的增强建议为长期演进做了准备 |
| **实施完整性** | ⭐⭐⭐⭐ | 核心修改点齐全，但有6个补充点需要加强 |

### 核心判断

✅ **00*文档（合并版）可以作为"执行基线（baseline）"**

- StageKey从`basic → beginner`的切换是**完整的**
- 首页状态错乱问题的根因定位**准确**
- 修改顺序（类型 → 常量 → store → 组件）是**工程正确顺序**
- 不触碰SEO/JSON-LD决策边界，**符合CLAUDE.md宪法**

✅ **01*文档（进一步建议）是"把00*提升到长期可维护级别"**

| 文档 | 角色定位 |
|------|----------|
| 00* | **最低可交付方案（MVP Fix）** |
| 01* | **工程化/AEO友好增强版** |

01*不是"推翻00*"，而是提供了长期演进所需的补充点。

---

## 二、方案审核详情

### ✅ 方案的正确之处

#### 1. 问题定位准确

- ✅ 正确识别了"UI标签与课程数据不匹配"的根因：组件本地状态与store状态不同步
- ✅ 正确识别了体系切换的核心问题：`basic` → `beginner`的类型定义不一致

#### 2. 修改顺序合理

```
类型定义(types/index.ts)
  ↓
常量映射(STAGES/STAGE_STYLES)
  ↓
Store默认值(courseStore.ts)
  ↓
组件层(CampSection.vue/StageTabs.vue)
  ↓
应用层(其他引用组件)
```

这是工程上正确的自底向上修改顺序，可以避免类型错误。

#### 3. 符合项目宪法

- ✅ 遵循了CLAUDE.md中的"三级体系对齐说明"
- ✅ 使用`assertStageKey`保持fail-fast机制
- ✅ 符合AEO/LRMI语义要求（Beginner/Intermediate/Advanced）

#### 4. 01*的增强建议价值高

| 增强点 | 价值评估 | 说明 |
|--------|----------|------|
| `useStageSync()` composable | ⭐⭐⭐⭐⭐ | 架构级进化，避免重复代码，为/levels、program页复用做准备 |
| URL深链恢复(`?stage=`) | ⭐⭐⭐⭐⭐ | 提升AEO和用户分享体验，支持Google索引 |
| sessionStorage持久化 | ⭐⭐⭐⭐ | 改善用户回访体验，不是小优化而是"用户意图的短期记忆" |
| JSON-LD同步检查 | ⭐⭐⭐⭐⭐ | 确保Schema.org一致性，避免SEO分权 |
| 批量清理残留`basic` | ⭐⭐⭐⭐⭐ | 长期AEO项目必须做，"语义不留垃圾" |

---

### ⚠️ 需要补充和改进的6个关键点

#### 1. 批量清理残留`basic`的具体方案

**问题**：01*提到需要"批量搜索-替换"，但没有具体执行方案。

**补充方案**：

```bash
# 1. 全局搜索残留的'basic'字符串（排除node_modules）
grep -r "'basic'" src/ --exclude-dir=node_modules

# 2. 重点检查区域
# - 组件模板中的硬编码: <div v-if="stage === 'basic'">
# - 测试文件中的mock数据
# - JSON-LD生成函数中的映射
# - URL slug生成逻辑

# 3. 建立检测脚本（防止未来回退）
# 在package.json中添加：
# "lint:no-basic": "eslint src/ --rule 'no-restricted-syntax: [\"error\", {\"selector\": \"Literal[value='basic']\", \"message\": \"Use 'beginner' instead of 'basic'\"}]'"
```

**检查清单**：

- [ ] src/components/\*_/_.vue（所有组件模板）
- [ ] src/store/courseStore.ts（mock数据）
- [ ] src/utils/jsonld/\*.ts（JSON-LD生成函数）
- [ ] src/router/index.ts（路由配置）
- [ ] src/types/index.ts（类型定义）

#### 2. 旧数据兼容性处理

**问题**：00_和01_都没有提到如何处理已存在的旧数据（如localStorage/sessionStorage中的'basic'）。

**补充方案**：

```typescript
// 在 src/store/courseStore.ts 中添加迁移函数

/**
 * 迁移旧的stage值（basic → beginner）
 * 用于兼容旧版本的localStorage/sessionStorage数据
 */
const migrateOldStage = (stage: string): StageKey => {
  if (stage === 'basic') {
    console.warn('[StageKey Migration] Converting old "basic" to "beginner"')
    return 'beginner'
  }
  // 使用assertStageKey确保类型安全
  return assertStageKey(stage)
}

// 在store初始化时应用
const savedStage = localStorage.getItem('currentStage')
if (savedStage) {
  this.currentStage = migrateOldStage(savedStage)
} else {
  this.currentStage = 'beginner' // 新用户默认值
}
```

#### 3. 路由守卫实现细节

**问题**：01*提到需要在路由守卫中处理`?stage=`参数，但没有具体实现。

**补充实现**：

```typescript
// src/router/index.ts

import { useCourseStore } from '@/store/courseStore'
import { StageKeySchema } from '@/types'

// 课程详情页路由
{
  path: '/course/:slug',
  name: 'CourseDetails',
  component: () => import('@/views/CourseDetails.vue'),
  props: true,
  beforeEnter: (to, from, next) => {
    const courseStore = useCourseStore()

    // 1. 从query读取stage参数
    const queryStage = to.query.stage as string | undefined

    // 2. 如果有有效的stage参数，更新store
    if (queryStage && StageKeySchema.safeParse(queryStage).success) {
      courseStore.setCurrentStageOnly(queryStage as StageKey)
    }

    // 3. 如果从首页跳转，保持首页选择的stage
    // （不需要额外处理，因为组件已经同步了store）

    next()
  }
}

// 首页路由（可选：支持深链）
{
  path: '/',
  name: 'Home',
  component: () => import('@/views/HomeView.vue'),
  beforeEnter: (to, from, next) => {
    const courseStore = useCourseStore()

    // 从query读取stage参数，支持深链直达
    // 例如：/?stage=advanced
    const queryStage = to.query.stage as string | undefined
    if (queryStage && StageKeySchema.safeParse(queryStage).success) {
      courseStore.setCurrentStageOnly(queryStage as StageKey)
    }

    next()
  }
}

// 可选：在离开详情页时，将stage写入URL（利于分享）
// 这一步是增强功能，可以放到Phase 2实施
```

#### 4. JSON-LD同步检查清单

**问题**：01*提到需要同步JSON-LD，但没有给出检查清单。

**补充检查清单**：

```markdown
### JSON-LD同步检查清单

#### 文件级检查
- [ ] `src/utils/jsonld/buildProgramJsonLd.ts`
  - educationalLevel.name: 'Basic' → 'Beginner' ✓
  - educationalLevel.@id: /levels/basic → /levels/beginner ✓

- [ ] `src/utils/jsonld/buildCourseJsonLd.ts`（如果存在）
  - educationalLevel.@id: /levels/basic → /levels/beginner ✓
  - educationalLevel.inDefinedTermSet: /levels ✓

- [ ] `src/views/program/[slug].vue`
  - JSON-LD script标签中的level映射 ✓
  - 确保使用buildProgramJsonLd工具函数 ✓

- [ ] 所有CourseCard组件
  - 显示的阶段标签使用STAGE_STYLES['beginner'] ✓

#### /levels页面检查（重要）
- [ ] 创建或更新`/levels/beginner`页面
  - 定义Beginner的含义、适用对象、课程列表
  - 添加DefinedTerm JSON-LD结构
  - 添加canonical链接

- [ ] 旧的`/levels/basic`页面处理
  - 301重定向到/levels/beginner
  - 或添加rel="canonical"指向/levels/beginner

#### SEO验证
- [ ] 使用Google Rich Results Test验证JSON-LD
- [ ] 使用Schema.org Validator验证语义
- [ ] 确保所有educationalLevel引用一致
```

#### 5. 测试矩阵补充

**问题**：00*只提到基本测试，需要补充完整的测试场景。

**补充测试矩阵**：

```markdown
### 功能测试场景

#### 1. 首页阶段切换测试
- [ ] 点击"入门专区"标签
  - ✓ URL包含?stage=beginner（如果实现了URL同步）
  - ✓ UI标签高亮"入门专区"
  - ✓ 显示的课程列表为beginner阶段课程
  - ✓ courseStore.currentStage === 'beginner'

- [ ] 点击"进阶专区"标签
  - ✓ URL包含?stage=intermediate
  - ✓ UI标签高亮"进阶专区"
  - ✓ 显示的课程列表为intermediate阶段课程
  - ✓ courseStore.currentStage === 'intermediate'

- [ ] 点击"高阶专区"标签
  - ✓ URL包含?stage=advanced
  - ✓ UI标签高亮"高阶专区"
  - ✓ 显示的课程列表为advanced阶段课程
  - ✓ courseStore.currentStage === 'advanced'

#### 2. 导航回退测试（核心场景）
- [ ] 首页选择"进阶专区" → 点击课程卡进入详情 → 浏览器后退
  - ✓ 回到首页后，标签仍高亮"进阶专区"
  - ✓ 显示的课程列表仍为进阶课程
  - ✓ UI与数据完全一致

#### 3. 深链测试
- [ ] 直接在浏览器输入`/?stage=advanced`
  - ✓ 首页直接显示"高阶专区"标签高亮
  - ✓ 课程列表显示高阶课程

- [ ] 直接在浏览器输入`/course/xxx?stage=intermediate`
  - ✓ 进入课程详情页
  - ✓ 返回首页时保持intermediate阶段

#### 4. 刷新测试
- [ ] 首页选择"进阶专区" → 刷新页面（F5）
  - ✓ 如果实现了sessionStorage，阶段保持为"进阶专区"
  - ✓ 如果没有实现，恢复为默认的"入门专区"（可接受）

#### 5. 跨页面测试
- [ ] 首页选择"高阶专区" → 访问About页面 → 返回首页
  - ✓ 阶段选择保持为"高阶专区"

#### 6. 旧数据迁移测试
- [ ] 手动在localStorage中设置`currentStage: 'basic'`
- [ ] 刷新页面
  - ✓ 控制台显示迁移警告日志
  - ✓ 首页显示"入门专区"（beginner）
  - ✓ localStorage更新为'beginner'

### 类型检查
```bash
npm run type-check  # 必须通过，无任何TypeScript错误
```

### 构建测试
```bash
npm run build:check  # 必须通过，无构建错误
```

### E2E测试（如果项目有配置）
```bash
npm run test:e2e
# 或使用Playwright
npx playwright test
```

### JSON-LD验证
- [ ] 使用[Google Rich Results Test](https://search.google.com/test/rich-results)验证
- [ ] 使用[Schema.org Validator](https://validator.schema.org/)验证
```

#### 6. 回滚方案

**问题**：01*提到"保留basic枚举一周"，但没有具体回滚机制。

**补充回滚方案**：

```typescript
// .env.local（本地开发）或 .env.production（生产环境）
VITE_STAGE_MIGRATION_ENABLED=true  # false则回退到basic

// src/config/featureFlags.ts
export const STAGE_MIGRATION_ENABLED =
  import.meta.env.VITE_STAGE_MIGRATION_ENABLED !== 'false'

// src/types/index.ts
export const StageKeySchema = z.enum(
  STAGE_MIGRATION_ENABLED
    ? ['beginner', 'intermediate', 'advanced']  // 新体系
    : ['basic', 'intermediate', 'advanced']     // 旧体系（回滚）
)

export type StageKey = z.infer<typeof StageKeySchema>

// 同步修改 STAGES 和 STAGE_STYLES
export const STAGES = STAGE_MIGRATION_ENABLED
  ? {
      beginner: '入门',
      intermediate: '进阶',
      advanced: '高阶'
    } as const
  : {
      basic: '入门',
      intermediate: '进阶',
      advanced: '高阶'
    } as const

// STAGE_STYLES同理
export const STAGE_STYLES = STAGE_MIGRATION_ENABLED
  ? {
      beginner: { textClass: 'text-primary', bgClass: 'bg-primary-subtle', label: '入门' },
      intermediate: { textClass: 'text-info', bgClass: 'bg-info-subtle', label: '进阶' },
      advanced: { textClass: 'text-danger', bgClass: 'bg-danger-subtle', label: '高阶' }
    } as const
  : {
      basic: { textClass: 'text-primary', bgClass: 'bg-primary-subtle', label: '入门' },
      intermediate: { textClass: 'text-info', bgClass: 'bg-info-subtle', label: '进阶' },
      advanced: { textClass: 'text-danger', bgClass: 'bg-danger-subtle', label: '高阶' }
    } as const
```

**回滚操作步骤**：

1. 修改环境变量：`VITE_STAGE_MIGRATION_ENABLED=false`
2. 重新构建：`npm run build`
3. 部署新版本
4. 验证功能恢复正常

---

## 三、实施建议与优先级

### 两阶段渐进式实施策略

#### Phase 1: 核心修复（立即执行）- 基于00*

```markdown
优先级：P0（阻塞性问题）
预计工时：2-4小时
风险等级：低
目标：修复首页状态保持问题 + 完成StageKey体系切换

### 待办清单

1. [ ] 修改StageKey类型定义（`src/types/index.ts`）
   - [ ] StageKeySchema: `['basic', ...]` → `['beginner', ...]`
   - [ ] STAGES映射: `basic: '入门'` → `beginner: '入门'`
   - [ ] STAGE_STYLES映射: `basic: {...}` → `beginner: {...}`

2. [ ] 修改courseStore默认值（`src/store/courseStore.ts`）
   - [ ] currentStage: `'basic' as StageKey` → `'beginner' as StageKey`

3. [ ] 修改CampSection.vue组件（`src/components/CampSection.vue`）
   - [ ] 修改初始值：`const currentStage = ref<StageKey>('basic')` → `ref<StageKey>(courseStore.currentStage)`
   - [ ] 添加watch监听：
     ```typescript
     watch(
       () => courseStore.currentStage,
       newStage => {
         currentStage.value = newStage
       }
     )
     ```

4. [ ] 检查StageTabs.vue组件（`src/components/StageTabs.vue`）
   - [ ] 确保阶段选项使用`'beginner'`而不是`'basic'`
   - [ ] 确保与courseStore.currentStage保持同步

5. [ ] 运行类型检查和构建测试
   - [ ] `npm run type-check` - 必须通过
   - [ ] `npm run build:check` - 必须通过

6. [ ] 手动功能测试（测试矩阵1-3）
   - [ ] 测试首页阶段切换
   - [ ] 测试导航回退
   - [ ] 测试深链

### 验收标准
- ✅ TypeScript类型检查无错误
- ✅ 构建成功无警告
- ✅ 首页阶段切换后，回退时UI与课程匹配
- ✅ 所有阶段标签显示正确
```

#### Phase 2: 补强与持久化（紧随其后）- 基于01*增强

```markdown
优先级：P1（重要但不阻塞）
预计工时：3-5小时
风险等级：低-中
目标：长期可维护性 + AEO友好增强

### 待办清单

1. [ ] 批量清理残留'basic'
   - [ ] 使用grep搜索所有'basic'字符串
   - [ ] 逐个检查并替换
   - [ ] 添加linter规则防止回退：`npm run lint:no-basic`

2. [ ] 实现旧数据兼容
   - [ ] 在courseStore.ts中添加`migrateOldStage()`函数
   - [ ] 在store初始化时应用迁移逻辑
   - [ ] 测试旧数据迁移场景

3. [ ] 实现sessionStorage持久化（可选）
   - [ ] 创建`composables/useStageSync.ts`
   - [ ] 在CampSection中引入并使用
   - [ ] 测试刷新后状态保持

4. [ ] 路由守卫实现
   - [ ] 在课程详情页路由添加beforeEnter守卫
   - [ ] 支持`?stage=`参数读取
   - [ ] 测试深链直达功能

5. [ ] JSON-LD同步检查
   - [ ] 检查`src/utils/jsonld/buildProgramJsonLd.ts`
   - [ ] 检查所有CourseCard组件
   - [ ] 确保/levels页的DefinedTerm正确
   - [ ] 使用Google Rich Results Test验证

6. [ ] 完整测试（测试矩阵1-6）
   - [ ] 所有功能测试场景
   - [ ] 旧数据迁移测试
   - [ ] 跨页面测试

### 验收标准
- ✅ 所有残留'basic'字符串清理完毕
- ✅ 旧数据自动迁移为'beginner'
- ✅ sessionStorage持久化工作正常（如果实现）
- ✅ 深链`/?stage=advanced`正确工作
- ✅ JSON-LD通过Schema.org验证
```

#### Phase 3: 长期优化（可延后）- 基于01*前瞻

```markdown
优先级：P2（优化性项目）
预计工时：4-8小时
风险等级：低
目标：架构优化 + 回滚能力

### 待办清单

1. [ ] 抽取useStageSync composable（复用）
   - [ ] 将状态同步逻辑抽取为独立composable
   - [ ] 为/levels、program页面复用做准备

2. [ ] v-model双向绑定优化（可选）
   - [ ] 改造StageTabs为支持v-model
   - [ ] 与courseStore直接双向绑定
   - [ ] 减少手写watch代码

3. [ ] 回滚方案实施
   - [ ] 添加VITE_STAGE_MIGRATION_ENABLED Feature Flag
   - [ ] 修改types/index.ts支持条件枚举
   - [ ] 保留一周观察期，无问题后移除

4. [ ] 301重定向配置（如果有旧URL）
   - [ ] 配置Vercel重定向：/levels/basic → /levels/beginner
   - [ ] 配置course slug重定向（如有必要）

5. [ ] 监控与分析
   - [ ] 添加百度统计埋点：跟踪阶段切换行为
   - [ ] 分析用户路径：从哪个阶段进入最多
   - [ ] 监控404错误：是否有旧URL访问

### 验收标准
- ✅ useStageSync composable可在多个页面复用
- ✅ 回滚方案验证可用
- ✅ 埋点数据正常收集
```

---

## 四、风险评估与缓解措施

| 风险项 | 风险等级 | 影响范围 | 缓解措施 |
|--------|----------|----------|----------|
| 类型定义修改导致其他文件报错 | 中 | 全局 | 先运行`npm run type-check`，TypeScript会指出所有错误位置，逐个修复 |
| 残留'basic'导致运行时错误 | 中 | 局部 | 使用`assertStageKey`强制校验，确保fail-fast |
| 旧数据无法迁移导致用户体验异常 | 低 | 局部 | 实现`migrateOldStage`兼容函数，自动转换 |
| JSON-LD不一致影响SEO | 中 | SEO | 使用检查清单逐一验证，用Google Rich Results Test确认 |
| 回滚困难 | 低 | 全局 | 实现Feature Flag(`VITE_STAGE_MIGRATION_ENABLED`)，可快速回退 |
| sessionStorage持久化引入bug | 低 | 局部 | 充分测试刷新、跨标签页场景，确保数据同步正确 |

---

## 五、最终建议

### 🎯 执行策略建议

**推荐采用"两阶段渐进式实施"**：

1. **本周完成 Phase 1**（核心修复）
   - 基于00*文档，完成StageKey切换和状态同步
   - 确保类型检查和构建通过
   - 完成基础功能测试（测试矩阵1-3）
   - **交付标准**：首页状态保持问题修复 + StageKey体系切换完成

2. **下周完成 Phase 2**（补强增强）
   - 基于01*增强建议，添加持久化和路由守卫
   - 完成旧数据兼容和批量清理
   - 完成完整测试矩阵（测试矩阵1-6）
   - **交付标准**：长期可维护 + AEO友好

3. **按需完成 Phase 3**（长期优化）
   - 根据用户反馈和监控数据决定优先级
   - 可以在后续迭代中逐步完成
   - **交付标准**：架构优化 + 回滚能力

### 📋 关键决策点

在开始实施前，需要明确以下决策：

1. **是否实现sessionStorage持久化？**
   - ✅ 推荐实现：提升用户体验，工作量不大（1-2小时）
   - ❌ 暂不实现：Phase 1可以跳过，Phase 2再补充

2. **是否实现URL深链功能？**
   - ✅ 推荐实现：有利于AEO和分享，工作量适中（2-3小时）
   - ❌ 暂不实现：可延后到Phase 3

3. **是否实现回滚方案？**
   - ✅ 推荐实现：提供安全网，心理安全感高（1-2小时）
   - ❌ 暂不实现：如果团队对方案有充分信心，可以不做

### 📝 文档化建议

建议创建以下配套文档：

1. ✅ **03-独立审核意见与实施TODO.md**（本文档）
2. **04-实施检查清单.md**（简化版TODO，用于执行时勾选）
3. **05-测试报告.md**（记录测试结果，用于验收）

---

## 六、附录：快速参考

### 文件修改清单（Phase 1）

| 文件路径 | 修改内容 | 修改类型 |
|----------|----------|----------|
| `src/types/index.ts` | StageKeySchema枚举：basic → beginner | 类型定义 |
| `src/types/index.ts` | STAGES映射：basic → beginner | 常量定义 |
| `src/types/index.ts` | STAGE_STYLES映射：basic → beginner | 常量定义 |
| `src/store/courseStore.ts` | currentStage默认值：'basic' → 'beginner' | 状态默认值 |
| `src/components/CampSection.vue` | currentStage初始值：使用courseStore | 组件初始化 |
| `src/components/CampSection.vue` | 添加watch监听courseStore.currentStage | 状态同步 |
| `src/components/StageTabs.vue` | 确认使用'beginner'而非'basic' | 组件验证 |

### 关键命令

```bash
# 类型检查
npm run type-check

# 构建检查
npm run build:check

# 搜索残留'basic'
grep -r "'basic'" src/ --exclude-dir=node_modules

# 运行开发服务器测试
npm run dev

# 生产构建
npm run build
```

### 关键概念速查

- **StageKey**: 课程阶段的类型定义，值为'beginner' | 'intermediate' | 'advanced'
- **assertStageKey**: 运行时校验函数，确保stage值合法，不合法则fail-fast
- **courseStore.currentStage**: 全局当前选择的阶段状态
- **组件本地currentStage**: CampSection等组件的本地响应式状态，需要与store同步

---

## 总结

✅ **审核通过，建议立即执行**

- 00*方案是**可靠的执行基线**
- 01*增强建议是**长期必要的**
- 两阶段实施策略是**风险最低的**
- 补充的6个关键点是**完整性保障**

**下一步行动**：

1. 确认关键决策点（sessionStorage、URL深链、回滚方案）
2. 开始执行Phase 1（预计2-4小时）
3. 完成Phase 1验收后，规划Phase 2时间

---

**文档版本**：v1.0
**最后更新**：2025-12-18
**审核人**：Claude Code 独立技术审核员
