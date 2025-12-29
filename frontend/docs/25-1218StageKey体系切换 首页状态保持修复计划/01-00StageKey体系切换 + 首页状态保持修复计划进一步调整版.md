### 评测：`StageKey体系切换 + 首页状态保持修复计划`

| 维度                | 现有方案要点                                                           | 评测与补充建议                                                                                                                                                     |
| ----------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **统一枚举**          | 将 `basic` ➜ `beginner`，同步修改 **类型定义 / 映射常量 / 默认状态**               | ✅ 方向正确。**补充**：<br>1. 需要一次性脚本（或 codemod）批量搜索-替换组件模板中硬编码的 `'basic'`，防止遗漏。<br>2. 为老数据做兼容：在 `courseStore` 初始化时检测旧值并转换为 `beginner`，避免刷新后白屏。                      |
| **组件-Store 同步**   | `CampSection.vue` 初始值改为 `courseStore.currentStage`，并 `watch` 同步  | ✅ 能解决回退失效。**补充**：<br>1. 抽出一个 `useStageSync()` composable，其他列表页也可复用。<br>2. 考虑用 `v-model` 双向绑定 `StageTabs` 和 `courseStore`，减少手写 watch。                        |
| **路由守卫**          | 当前方案未提及 `router/index.ts`                                        | ⚠️ 若路由中含 `stage` query / param，需确保：<br>① 在进入课程详情页时把当前 stage 写入 query；<br>② 在 `beforeRouteEnter` 中回写到 `courseStore`；<br>③ 在返回首页时，优先用 query → store → 默认值三选一。 |
| **持久化**           | 未提及浏览器持久化                                                        | 建议用 `pinia-plugin-persistedstate` 将 `currentStage` 写入 `sessionStorage`，刷新也能记住。                                                                              |
| **测试矩阵**          | 已列举基本回退测试                                                        | 补充 e2e：<br>1. 切换 **三次**阶段 → 进详情 → 回退 → 再刷新。<br>2. 直接输入带 `?stage=advanced` 的首页 URL，应正确高亮。                                                                    |
| **SEO / AEO 一致性** | 方案声明符合 LRMI / Schema 最佳实践                                        | 若 JSON-LD 里仍写 `basic`，要同改；并在 `/levels` 枚举页新增 `<link rel="canonical">` 指向新 URL，避免历史 URL 分权。                                                                  |

> **结论**：现有 `s*.md` 方案覆盖了 80 % 关键步骤，按上表补完即可直接落地。

---

## ClaudeCode PRD（精简版）

> **标题**：切换 StageKey 到 `beginner` 并保持首页阶段状态
> **版本**：v2025-12-18
> **目标**：① 前端枚举一律采用 `beginner / intermediate / advanced`<br>② 用户在导航、刷新、深链场景下始终看到期望阶段课程

### 1. 功能需求

1. 新旧枚举兼容：如果本地存储或接口返回 `basic`，自动映射为 `beginner`。
2. 首页阶段 UI 与课程列表、路由查询串、Pinia 状态三方保持一致。
3. 进入详情页时自动把当前阶段写入 `?stage=`，回退后复现。
4. 刷新或重新打开浏览器时恢复最近一次选择。
5. 所有 JSON-LD、slug、路径等对外字段同步更新。

### 2. 非功能需求

* **SEO**：旧 URL 301 ➜ 新 URL；/levels 页生成 canonical。
* **性能**：不得引入 > 2 KB(gzip) 的新依赖。
* **回滚**：保留 `basic` 枚举一周，可通过 `.env` 开关回退。

### 3. 影响范围 & 文件清单

| 层级         | 文件                                                | 动作                                                          |
| ---------- | ------------------------------------------------- | ----------------------------------------------------------- |
| Type 定义    | `src/types/index.ts`                              | 将 `basic` ➜ `beginner`；同步 `STAGES / STAGE_STYLES`           |
| Store      | `src/store/courseStore.ts`                        | 默认值改为 `beginner`；加 `migrateOldStage()`                      |
| 组件         | `components/StageTabs.vue`、`CampSection.vue`、其他引用 | 引入 `useStageSync()`；去掉硬编码 `'basic'`                         |
| 路由         | `router/index.ts`                                 | 在 `CourseDetails` 守卫内：`to.query.stage && courseStore.set()` |
| Composable | `composables/useStageSync.ts`                     | **新建**：实现双向同步 & persisitedstate                             |
| 资源         | `src/utils/jsonld.ts`                             | 替换 `basic`；确保 `/levels` 生成 `DefinedTermSet`                 |

### 4. 验收标准

1. 手动 / 自动测试全部通过（含 e2e）。
2. Lighthouse > SEO 分数 ≥ 98。
3. 在地址栏输入 `https://doviai.com/?stage=advanced` 可直接高亮「高阶专区」。

---

## 技术落地文档（给 ClaudeCode）

```diff
// src/types/index.ts
- export const StageKeySchema = z.enum(['basic', 'intermediate', 'advanced'])
+ export const StageKeySchema = z.enum(['beginner', 'intermediate', 'advanced'])

- export const STAGES = {
-   basic: '入门',
+ export const STAGES = {
+   beginner: '入门',
    intermediate: '进阶',
    advanced: '高阶'
 } as const
```

```ts
// composables/useStageSync.ts  (NEW)
import { watch } from 'vue'
import { useCourseStore } from '@/store/courseStore'

export function useStageSync () {
  const store = useCourseStore()
  watch(() => store.currentStage, s => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('stage', s)
    }
  }, { immediate: true })
}
```

> 👆 其余文件请按 **文件清单** 进行等价替换 / 引用 `useStageSync()`，并提交 **单独 PR** 命名 `feat(stagekey-migration)`。

---

### In short（中文摘要）

* 方案方向正确：统一枚举 + 组件-Store 同步能解决 UI 错乱问题。
* 补充：批量替换残留 `basic`、路由带 `stage`、sessionStorage 持久化、301 跳转与 JSON-LD 更新。
* 已给出 ClaudeCode 可直接执行的 **PRD + 技术改动清单**，按此实施即可。
