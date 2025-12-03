# ✅ 《Doviai 前端课程体系“纯新阶段”切换 PRD》（可直接执行版）

> 本版 PRD 假设**所有课程数据源、路由、slug、组件输入均已切换到新三级枚举**，前端不再接收旧枚举或旧 slug。目标是移除 legacy 迁移层，直接消费新字段，并在入口做强校验，降低长期维护成本。

---

## 0. 前提与目标
- 前提：
  - 后端/数据源已统一为 `basic | intermediate | advanced`，不会再返回旧枚举（free/advanced/project/landing/high 等）。
  - 现有 mock 数据与静态 JSON 已重命名为新阶段，并按“课程名-阶段”规则命名图片。
  - 路由及 slug 已统一为新规则（`/course/xxx-basic` → `/course/xxx-beginner` 等）。
- 目标：
  - **去除 legacy 映射逻辑**：删除旧→新转换、迁移统计，转为入口强校验模式。
  - **保留统一出口**：继续使用 `stageMap` 提供标签、slug、样式等单一来源，避免分散硬编码。
  - **数据清洁可观测**：输入若包含非法 stage，立即 fail-fast 并抛出显式错误日志，便于回归定位。
  - **与会员专区对齐**：会员专享课程依旧使用 `intermediate/advanced` 等新枚举，专属属性通过 `audienceType: 'membership'` 标注，不新增阶段枚举。

---

## 1. 范围与不做的事
- **本轮涵盖**：stage 枚举、slug 工具、store 数据入口校验、组件消费端改造、Program 页面、JSON-LD 构建工具、课程图片命名规则。
- **不做**：
  - 不再保留 legacy map 与迁移统计表。
  - 不处理真实后端数据迁移（假设后端已完成清洗）。
  - 不新增阶段枚举（会员专区用 `audienceType` 标注，而非新增 stage）。

---

## 2. 统一的三级体系（唯一合法枚举）
- `basic`      → Beginner（入门）
- `intermediate` → Intermediate（进阶）
- `advanced`    → Advanced（高阶）

**规则**：任何非以上枚举的值视为非法，必须在入口报错中断。

---

## 3. 涉及文件与改动要求
### 3.1 类型与工具
- `src/types/index.ts`
  - `StageKey` 仅保留 3 枚举；提供 `isStageKey(value: string): value is StageKey`。
  - 保留 JSON-LD 类型占位。
- `src/utils/stageMap.ts`
  - 删除 `LEGACY_STAGE_MAP` 与 `mapOldStageToNew`；保留/强化：
    - `getStageLabel`（用于 UI 文案）
    - `getStageSlug` / `slugToStageKey`（只接受新枚举）
    - `getStageStyle`（样式类名）
    - 新增 `assertStageKey(stage: string): asserts stage is StageKey`，非法时抛错并输出带课程 id/slug 的日志。
- `src/utils/slug.ts`
  - 仅支持新枚举 slug 生成与解析；删除与旧阶段相关的别名/关键词。

### 3.2 数据层（store/mock）
- `src/store/courseStore.ts`
  - 移除迁移函数与统计；在 `loadMockData`/数据注入时调用 `assertStageKey`，非法值直接抛错。
  - Mock 数据确保字段 `stage` 仅为新枚举，slug 由新规则生成。
- 静态/Mock JSON
  - 全量检查 stage 字段，必须使用新枚举。
  - 图片命名遵循“课程名在前-阶段在后”的 slug，如 `illustrator-beginner.webp`；会员专享课可增加 `-membership` 片段，但阶段尾缀仍用新枚举。

### 3.3 组件消费端
- `StageTabs.vue` / `CourseCard.vue` / `CampSection.vue` / `LessonRow.vue` 等
  - 全部改为直接消费新 `StageKey`，禁止再做旧值兼容。
  - 级别文案/样式统一调用 `stageMap`；任何 props/store 输入先经过 `assertStageKey` 或类型约束。

### 3.4 Program 页面
- `ProgramAView.vue` / `ProgramBView.vue`
  - 使用新枚举的课程列表；入口校验 stage。
  - JSON-LD `hasCourse`/`isPartOf` 仅输出新 slug。

### 3.5 JSON-LD 工具
- `src/utils/jsonld/buildCourseJsonLd.ts`
- `src/utils/jsonld/buildProgramJsonLd.ts`
  - 仅接受新枚举；在构建前调用 `assertStageKey`，非法直接抛错。

---

## 4. 实施步骤
1) **基线校验能力**：
   - 在 `stageMap.ts` 增加 `assertStageKey` 与 `isStageKey`，统一错误文案（含课程 id/slug）。
   - `slug.ts`、`types/index.ts` 对非法值返回显式错误，而非静默回退。
2) **移除迁移逻辑**：
   - 删除 `LEGACY_STAGE_MAP`、`mapOldStageToNew`、迁移统计输出。
   - `courseStore` 初始化只做校验 + slug 生成，不再转换。
3) **数据清洗与命名确认**：
   - 扫描 Mock/静态数据确保 stage/slug/图片名均为新规则；会员专享课通过 `audienceType` 标记。
4) **组件收敛**：
   - 所有组件使用 `StageKey` 类型/断言，禁止旧值 fallback；样式/文案统一走 `stageMap`。
5) **Program & JSON-LD 收尾**：
   - Program 页与 JSON-LD 工具仅输出新枚举，QA 用脚本确认无 legacy slug。
6) **验证**：
   - TypeScript 全量通过；脚本扫描确认无 `project`/`landing` 等旧枚举；关键路径运行时无非法值错误。

---

## 5. 验收标准
1. 代码中不存在旧阶段枚举（free/advanced/project/landing/high 等），扫描结果为 0。
2. `stageMap.ts` 内无 legacy 映射逻辑，存在 `assertStageKey` 与 `isStageKey` 并被调用。
3. `courseStore` 不再执行迁移/统计，入口仅做校验 + 新 slug 生成。
4. 所有组件/JSON-LD/Program 页面只消费新枚举，非法值会抛出显式错误（带课程标识）。
5. 图片/slug 命名符合“课程名-阶段”规则，会员专享课通过 `audienceType` 标注而非新阶段。
6. `npm run type-check` 通过；运行时无旧枚举导致的回退。

---

## 6. 风险与缓解
- **遗漏遗留值导致运行时抛错**：使用全局扫描与入口断言，提前暴露；必要时在 QA 环境跑全量页面。 
- **第三方/缓存数据仍携带旧值**：在数据接入层增加快速失败，并在日志中提示来源与字段。 
- **图片/slug 重命名成本**：一次性完成重命名与引用修复，提交前用脚本校验引用路径。 

---

## 7. 会员专区命名与阶段策略
- 阶段仍使用 `intermediate` / `advanced` 等新枚举，避免新增阶段类型。 
- 图片与 slug 采用“课程名-阶段”规则，可选在课程名中加入 `membership` 片段（示例：`illustrator-membership-intermediate.webp`），但尾缀必须是合法阶段。 
- `audienceType: 'membership'` 或布尔字段标识专享属性，过滤与展示逻辑基于该属性而非新增阶段。 

---

## 8. 给 Claude Code/自动化的执行提示
- 仅保留三级枚举：basic/intermediate/advanced。 
- 遇到旧枚举一律视为错误并移除，不允许 fallback。 
- 组件、store、JSON-LD 工具均通过 `StageKey` 类型与 `assertStageKey` 保证输入合法。 
- alias `@/...` 必须保留；禁止改为相对路径。 
- mock/静态数据与图片命名必须同步更新，确保引用路径正确。 

> 采用纯新阶段方案能减少长期维护的双轨复杂度，所有入口强校验可快速暴露残留问题，便于后续与后端契约保持一致。
