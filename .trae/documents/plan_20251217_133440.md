# StageKey体系切换与首页状态保持修复计划

## 问题分析

### 核心问题
1. **StageKey体系不一致**：当前代码使用`'basic'`，但新体系需要使用`'beginner'`
2. **首页状态保持问题**：页面回退时，UI标签与显示的课程不匹配

### 根本原因
- StageKey类型定义使用的是`'basic'`，但slug和JSON-LD使用的是`'beginner'`
- 组件本地状态与store状态不同步，导致UI与数据不匹配

## 解决方案

### 修复顺序（重要）
1. **修改StageKey类型定义**（类型层）
2. **更新STAGES和STAGE_STYLES映射**（常量层）
3. **修改CampSection.vue默认值**（组件层）
4. **实现状态同步**（状态管理）
5. **更新相关组件和逻辑**（应用层）

### 具体修改

#### 1. 修改StageKey类型定义

**位置**：`/Users/dongqingzhai/Desktop/Projects/UAI_project--codex-jsonld/frontend/src/types/index.ts`

**修改内容**：
```typescript
// 原代码
export const StageKeySchema = z.enum(['basic', 'intermediate', 'advanced'])

// 修改为
export const StageKeySchema = z.enum(['beginner', 'intermediate', 'advanced'])
```

**同时更新**：
```typescript
// 原代码
export const STAGES = {
  basic: '入门',
  intermediate: '进阶',
  advanced: '高阶'
} as const

// 修改为
export const STAGES = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高阶'
} as const

// 原代码
export const STAGE_STYLES = {
  basic: { textClass: 'text-primary', bgClass: 'bg-primary-subtle', label: '入门' },
  intermediate: { textClass: 'text-info', bgClass: 'bg-info-subtle', label: '进阶' },
  advanced: { textClass: 'text-danger', bgClass: 'bg-danger-subtle', label: '高阶' }
} as const

// 修改为
export const STAGE_STYLES = {
  beginner: { textClass: 'text-primary', bgClass: 'bg-primary-subtle', label: '入门' },
  intermediate: { textClass: 'text-info', bgClass: 'bg-info-subtle', label: '进阶' },
  advanced: { textClass: 'text-danger', bgClass: 'bg-danger-subtle', label: '高阶' }
} as const
```

#### 2. 修改CampSection.vue组件

**位置**：`/Users/dongqingzhai/Desktop/Projects/UAI_project--codex-jsonld/frontend/src/components/CampSection.vue`

**修改内容**：

1. **初始化使用courseStore.currentStage**：
   ```typescript
   // 原代码
   const currentStage = ref<StageKey>('basic')
   
   // 修改为
   const currentStage = ref<StageKey>(courseStore.currentStage)
   ```

2. **添加状态同步监听**：
   ```typescript
   // 添加到组件的script部分
   watch(
     () => courseStore.currentStage,
     newStage => {
       currentStage.value = newStage
     }
   )
   ```

#### 3. 修改courseStore.ts

**位置**：`/Users/dongqingzhai/Desktop/Projects/UAI_project--codex-jsonld/frontend/src/store/courseStore.ts`

**修改内容**：
```typescript
// 原代码
state: () => ({
  // ...
  currentStage: 'basic' as StageKey, // 默认阶段：basic（入门基础）
  // ...
})

// 修改为
state: () => ({
  // ...
  currentStage: 'beginner' as StageKey, // 默认阶段：beginner（入门基础）
  // ...
})
```

#### 4. 修改StageTabs组件

**位置**：`/Users/dongqingzhai/Desktop/Projects/UAI_project--codex-jsonld/frontend/src/components/StageTabs.vue`

**检查并修改**：
- 确保组件中的stage选项使用`'beginner'`而不是`'basic'`
- 确保组件与courseStore.currentStage保持同步

## 预期效果

1. ✅ StageKey体系统一为`'beginner'`
2. ✅ UI标签与显示的课程匹配
3. ✅ 页面回退时保持之前的状态
4. ✅ 组件状态与store状态同步
5. ✅ 符合新体系的AEO/LRMI最佳实践

## 验证测试

1. **功能测试**：
   - 从首页点击"进阶专区"课程进入详情页
   - 回退到首页，验证标签仍为"进阶专区"
   - 验证显示的课程与标签匹配

2. **类型检查**：
   ```bash
   npm run type-check
   ```

3. **构建测试**：
   ```bash
   npm run build:check
   ```

## 实施步骤

1. 修改StageKey类型定义和相关常量
2. 更新courseStore默认状态
3. 修改CampSection.vue组件
4. 添加状态同步监听
5. 检查并修改相关组件
6. 运行测试验证修复效果

## 技术要点

- **类型安全**：确保TypeScript类型定义与实际使用一致
- **状态同步**：组件状态与store状态保持双向绑定
- **体系一致性**：确保整个应用使用统一的StageKey体系
- **向后兼容**：考虑旧数据的处理方案

这个计划将确保StageKey体系顺利切换到`'beginner'`，同时修复首页状态保持问题，使UI与显示的课程保持一致。