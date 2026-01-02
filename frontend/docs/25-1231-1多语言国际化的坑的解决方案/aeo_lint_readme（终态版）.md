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

