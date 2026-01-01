# aeo-lint（AEO / Semantic Structure Linter）

> **工程级 AEO 结构防火墙（非 LLM、非语义推断）**  
> 用于在本地 / CI 阶段自动阻断 *结构上必然错误* 的语义与 AEO 违规。

---

## 一、定位与原则（非常重要）

### 工具定位

aeo-lint 是一个 **工程级静态扫描工具**，用于验证项目是否违反：

- `/CLAUDE.md` 中定义的语义宪法
- Level / Program / Course 的不可坍塌结构
- AEO / Schema.org / LRMI 的硬性表达约束

它 **不是**：
- 语义解释器
- NLP / LLM 工具
- 业务校验逻辑

---

### 设计原则

- ❌ 不依赖 LLM、不做语义理解
- ❌ 不做“可能正确”的推断
- ✅ 只检查 **结构、路径、字段、关系**
- ✅ **误杀可接受，漏检不可接受**
- ✅ 结构必然错误 → 直接失败（ERROR）

---

## 二、与整体体系的关系

```
CLAUDE.md        → 定义“语义主权与红线”（宪法）
Execution Guards → 执行前 fail-fast Gate

        ↓

aeo-lint         → 工程级扫描 + CI 阻断
```

- **Guard**：任务执行前的硬 Gate，失败即 STOP
- **aeo-lint**：代码 / 文档层面的结构扫描器

> aeo-lint 不新增规则，只“执行并验证”既有宪法规则。

---

## 三、目录结构（终态）

```
tools/aeo-lint/
├─ index.js                # CLI 入口
├─ scan.js                 # 文件递归扫描
├─ rules/
│  ├─ level-name-translation.js   # 既有规则（保留）
│  ├─ level-url.js                # L1: Level canonical / query
│  ├─ jsonld-level.js             # L2: educationalLevel / DefinedTerm
│  ├─ level-centrality.js         # L3: Level 中心性（WARN）
│  ├─ program-course.js           # P1: Program / Course 关系
│  ├─ course-atomic.js            # C1: Course 原子性（WARN）
│  ├─ ui-leak.js                  # UI1: UI 状态渗透
│  ├─ level-id-stability.js       # N1: Level @id 跨语言稳定性
│  └─ topic-program.js            # N2: Topic / Tag 禁止 isPartOf Program
└─ utils/
   └─ report.js                   # 统一输出与退出码
```

---

## 四、规则总览（终态）

### ERROR（命中即阻断 CI）

| 规则 | 说明 |
|----|----|
| L1 | 禁止使用 `?stage=` / `#stage` 表达 Level；仅允许 `/levels/{beginner|intermediate|advanced}` |
| L2 | `educationalLevel` 必须使用 `DefinedTerm` + `/levels/*` 的稳定 `@id` |
| P1 | Course ❌ `hasPart`；Program ✅ `hasPart`；Topic / Tag ❌ `hasPart` |
| UI1 | UI 状态（stage / tab / filter）不得进入 JSON-LD 或 canonical URL |
| N1 | Level `@id` 必须跨语言稳定（禁止 `/zh/levels/*` 等变体） |
| N2 | Topic / Tag ❌ `isPartOf` Program（禁止反向污染结构主权） |

---

### WARN（不阻断 CI，需人工 review）

| 规则 | 说明 |
|----|----|
| L3 | Level 页面必须至少有一个非 Course 页面入链（结构风险） |
| C1 | Course 页面出现顺序/阶段信号（position / step / 第X阶段） |

> WARN 是“高风险信号”，不是违规判决。

---

## 五、扫描范围与排除规则

### 默认扫描文件类型

- `.vue`
- `.ts`
- `.js`
- `.json`
- `.md`

### 强制排除目录（必须）

- `node_modules/`
- `dist/`
- `build/`
- `.git/`

---

## 六、运行方式

### 本地运行

```bash
node tools/aeo-lint/index.js src
```

- ❌ 命中 ERROR → exit 1
- ⚠️ 仅 WARN → exit 0（输出警告）
- ✅ 全通过 → exit 0

---

### CI（GitHub Actions 示例）

```yaml
- name: AEO Structure Lint
  run: node tools/aeo-lint/index.js src
```

---

## 七、输出规范

- **ERROR 优先输出**（决定是否阻断）
- WARN 次级输出
- 最后输出 summary

示例：

```
[ERROR] src/course/ai-design.vue
  → Course must not use hasPart. Ordering is Program-only.

[WARN] src/levels/beginner.vue
  → Level page has no inbound links from non-course pages.
```

---

## 八、扩展与维护原则

- 新规则 **只能新增**，不得修改既有规则语义
- 不得将 WARN 静默升级为 ERROR
- 所有 ERROR 规则必须对应 `/CLAUDE.md` 中的明确红线
- 规则文件粒度：**一个规则 = 一个不可坍塌点**

---

## 九、最终声明（终态）

> aeo-lint 是本项目 AEO / 语义结构的**工程级防火墙**。  
> 它不解释规则，只负责发现**结构上不可能正确的状态**并阻止其进入主分支。

---

**Status**: Stable / CI-ready  
**Role**: Engineering-level AEO enforcement



---

## Appendix C — 工程示例与执行细节（吸收 Trae 版有效内容）

> 本附录仅补充**工程可读性与使用示例**，不引入任何新规则，
> 不改变规则等级，不具备立法效力。

---

### CLI 输出示例（工程参考）

```text
ERRORS (7):
================
[ERROR] frontend/src/components/CampSection.vue
  → Level must not be represented by query/hash (?stage= / #stage).

WARNINGS (4):
==================
[WARN] frontend/src/components/CourseCard.vue
  → Level 实体名不可翻译。请使用英文 Beginner / Intermediate / Advanced 作为实体引用。

SUMMARY:
========
Total issues: 11
Errors: 7
Warnings: 4
```

> 说明：
> - ERROR 永远优先输出
> - WARN 仅作为风险提示（除 strict / ci 模式外）

---

### level-name-translation 规则等级说明（明确）

该规则用于约束 **Level 实体名的语言使用边界**：

| 场景 | 等级 | 说明 |
|---|---|---|
| UI 展示文案（页面文本） | WARN | 允许翻译，不影响实体语义 |
| slug / URL | ERROR | 实体标识不得翻译 |
| JSON-LD `@id` / `name` | ERROR | 必须使用英文 Beginner / Intermediate / Advanced |

> 该区分直接源自 `/CLAUDE.md` 的 **实体主权与唯一真源原则**。

---

### 执行路径示例（非规范）

```bash
# 前端项目扫描示例
node tools/aeo-lint/index.js frontend/src
```

> 路径仅用于示例，具体扫描目录以项目结构为准。

---

### 明确不支持的能力（终态声明）

以下能力**刻意不支持**，以避免语义主权被工程层稀释：

- ❌ 通过配置文件调整规则等级
- ❌ 自动修复（auto-fix）任何语义 / AEO 问题
- ❌ 在运行时动态禁用规则

> 如需变更规则，必须先修改 `/CLAUDE.md` 并经过人工审查。



---

## Appendix D — Version Freeze & Change Control（终态锁定）

> 本章节用于**冻结 aeo-lint 的规则语义与权力边界**，
> 防止工具在长期演进中发生“隐性立法”“规则漂移”或“工程越权”。
>
> 一经确认，本章节视为 **长期有效治理条款**。

---

### D.1 版本冻结原则（Version Freeze）

- aeo-lint 的 **规则语义一经发布即冻结**
- 任何规则（ERROR / WARN）：
  - ❌ 不得在不修改 `/CLAUDE.md` 的前提下变更其语义
  - ❌ 不得通过 README、配置文件或代码注释“软性调整含义”

> 规则的**唯一立法源**始终是 `/CLAUDE.md`。

---

### D.2 允许的变更类型（Allowed Changes）

在不违反宪法的前提下，仅允许以下变更：

1. **新增规则文件**（append-only）
   - 必须对应 `/CLAUDE.md` 中已存在的明确条款
   - 不得拆分、合并或重写既有规则

2. **工程实现优化**
   - 性能优化
   - 扫描范围优化
   - 日志 / 输出格式改进
   - CI 适配（不改变行为结果）

3. **执行模式扩展**
   - 如 `--strict` / `--ci`
   - 仅改变执行强度，不改变规则定义

---

### D.3 明确禁止的变更（Forbidden Changes）

以下变更被视为 **违宪行为**：

- ❌ 修改 ERROR / WARN 的规则含义
- ❌ 将规则降级、弱化或引入默认忽略机制
- ❌ 通过配置文件调整规则等级
- ❌ 自动修复（auto-fix）任何语义 / AEO 问题
- ❌ 引入 README 层面的“解释性新规则”
- ❌ 在未更新 `/CLAUDE.md` 的情况下新增 ERROR 规则

---

### D.4 规则变更的唯一合法流程（Change Control）

任何 **规则语义相关变更**，必须严格遵循以下顺序：

1. **修改 `/CLAUDE.md`**
   - 明确新增 / 调整的宪法条款
   - 说明动机与影响范围

2. **人工 Review 通过**
   - 明确这是“语义立法”，而非工程实现

3. **更新 aeo-lint 规则实现**
   - 新增或调整对应 rule 文件

4. **同步更新本 README**
   - 更新规则列表或 Appendix（仅做映射说明）

> 跳过任一步，均视为无效变更。

---

### D.5 审计与追责（Audit & Accountability）

- 每一条 aeo-lint 规则：
  - 都必须能反向映射到 `/CLAUDE.md` 的明确条款（见 Appendix A）
- 无法完成映射的规则：
  - ❌ 视为非法规则
  - ❌ 不得进入主分支

---

### D.6 终态声明（Final Lock）

> **aeo-lint 是宪法的执行器，不是立法者。**
>
> 本章节确立的冻结与变更控制机制，
> 旨在确保：
> - 工程层永远无法“悄悄改变语义”
> - AI 与人类在任何时间点，都只有一个规则真源

---

**Status**: Frozen after approval  
**Change Policy**: Constitution-first, append-only, review-required

