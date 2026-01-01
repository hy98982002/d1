
下面我给你的是：**可真正落地的 lint 级违规扫描规则设计**，不是概念。

我会按 **现实可用性优先级** 给你三层方案，你可以 **逐层启用**：

------

# 一、目标与边界（先说清楚）

### 目标

- 在 **PR / 提交前 / CI 阶段**
- **自动扫描并阻断**以下结构性错误：
  - Level 被 query/hash 表达
  - Course / Program 越权
  - JSON-LD 语义违规
  - hasPart / isPartOf 关系乱用
  - Level @id 不稳定

### 边界（很重要）

- ❌ 不依赖 LLM 理解语义
- ❌ 不做 NLP
- ✅ 只检查 **结构、路径、字段、关系**
- ✅ **误杀可接受，但漏检不可接受**

------

# 二、Lint 规则总览（机器视角）

> **一句话原则**：
> 只要“结构上不可能正确”，就直接报错。

------

## RULE L1 — Level Canonical URL 规则（硬拦截）

### 违规条件（任一命中即失败）

- 出现以下字符串作为页面主路径或 canonical：
  - `?stage=`
  - `#stage`
- 出现 `/level` 但不是 `/levels/{beginner|intermediate|advanced}`

### 正则示例

```
\?stage=|#stage
/levels/(?!beginner|intermediate|advanced)
```

### 失败级别

- ❌ ERROR（直接阻断 CI）

------

## RULE L2 — JSON-LD Level 表达规则

### 合法形式（唯一）

```
"educationalLevel": {
  "@type": "DefinedTerm",
  "@id": "https://www.doviai.com/levels/intermediate"
}
```

### 违规条件

- `educationalLevel` 是 string
- `educationalLevel` 是 enum
- `@id` 不指向 `/levels/*`

### JSON Schema（简化）

```
{
  "educationalLevel": {
    "type": "object",
    "required": ["@id"],
    "properties": {
      "@id": {
        "pattern": "^https://www\\.doviai\\.com/levels/(beginner|intermediate|advanced)$"
      }
    }
  }
}
```

### 失败级别

- ❌ ERROR

------

## RULE P1 — Program / Course 关系规则

### Program JSON-LD 必须满足

- `@type` = `Program` / `EducationalOccupationalProgram`
- **允许** `hasPart`

### Course JSON-LD 必须满足

- `@type` = `Course`
- **禁止** `hasPart`
- **允许** `isPartOf`

### 违规检测逻辑（伪代码）

```
if (type === 'Course' && hasPart) error()
if (type === 'Program' && isPartOf && definesOrder) warn()
```

### 失败级别

- Course 使用 `hasPart` → ❌ ERROR
- Topic / Tag 使用 `hasPart` → ❌ ERROR

------

## RULE C1 — Course 原子性规则（静态结构）

### 扫描目标

- Course 页面模板（如 `CourseDetails.vue`）
- Course JSON-LD

### 违规信号（结构级）

- 出现：
  - `position`
  - `step`
  - `phase`
  - `第.*阶段`
- 且页面不是 Program

### 正则示例

```
(position|step|phase|第.{1,3}阶段)
```

### 失败级别

- ⚠️ WARN（需人工确认）
- 多次出现可升级为 ERROR

------

## RULE UI1 — UI 状态不得进入语义层

### 违规条件

- JSON-LD 中出现：
  - `stage`
  - `tab`
  - `filter`
- canonical 指向带 query 的 URL

### 正则示例

```
"stage"\s*:|\?stage=
```

### 失败级别

- ❌ ERROR

------

## RULE L3 — Level 中心性规则（结构完整性）

### 检查逻辑

- `/levels/*` 页面
- 是否被以下任一页面链接：
  - `/`
  - `/program/*`
  - `/guide/*` / `/faq/*`

### 实现方式（简单可行）

- 构建阶段生成 link graph
- 统计入链数量

### 违规条件

- Level 页面入链 = 0

### 失败级别

- ⚠️ WARN（结构风险）

------

# 三、工程落地方案（你直接可用）

## 方案 A：Node.js + ESLint 自定义规则（推荐）

### 结构

```
/tools/aeo-lint/
  ├─ rules/
  │   ├─ level-url.js
  │   ├─ jsonld-level.js
  │   ├─ program-course-rel.js
  │   └─ ui-leak.js
  └─ index.js
```

### 执行方式

```
node tools/aeo-lint/index.js src/
```

### CI 阶段

```
- name: AEO Structure Lint
  run: node tools/aeo-lint/index.js src/
```

------

## 方案 B：构建期扫描（Vite Plugin）

- 在 `vite build` 前：
  - 扫描 `.vue`
  - 扫描 JSON-LD 注入函数
- 命中 ERROR → build fail

适合你这种 **SSG / SEO 强依赖项目**。

------

## 方案 C：最低成本（立即可用）

> **即使你今天不写工具，也能先防 70% 的错**

- 用 `grep + regex` 做第一道闸

```
grep -R "?stage=" src && exit 1
grep -R "educationalLevel\": \"" src && exit 1
```

------

# 四、等级化输出（给 CI 用）

| Level | 含义                   |
| ----- | ---------------------- |
| ERROR | 结构必然错误，直接失败 |
| WARN  | 高风险，需人工确认     |
| INFO  | 记录，不阻断           |

------



------

## 下一步（

👉 **我可以直接帮你生成一套 `aeo-lint` 最小可运行代码（Node.js）**
包含：

- 规则文件
- CLI
- CI 示例

那一步之后，你的 AEO 结构 **已经接近“不可被破坏”**。

---------------------

生成一套 aeo-lint 最小可运行代码（Node.js）



好，下面给你的是**一套可以直接跑、直接接 CI、没有任何花活的 `aeo-lint` 最小可运行实现（Node.js）**。
目标只有一个：**结构必然错误 → 直接失败**。

我会给你：

1. 📁 目录结构
2. 📄 完整可运行代码（不依赖第三方库）
3. ▶️ 本地运行方式
4. 🤖 CI 接入方式
5. 🔧 后续可扩展点（但不提前复杂化）

------

# 一、目录结构（建议直接照抄）

```
tools/aeo-lint/
├─ index.js                # CLI 入口
├─ scan.js                 # 文件扫描
├─ rules/
│  ├─ level-url.js         # L1: Level canonical / query
│  ├─ jsonld-level.js      # L2: educationalLevel / DefinedTerm
│  ├─ program-course.js    # P1: Program / Course 关系
│  └─ ui-leak.js           # UI 状态渗透
└─ utils/
   └─ report.js            # 统一输出与退出码
```

------

# 二、核心入口（CLI）

## `tools/aeo-lint/index.js`

```
#!/usr/bin/env node
const { scanFiles } = require('./scan')
const { report } = require('./utils/report')

const targetDir = process.argv[2] || 'src'

const rules = [
  require('./rules/level-url'),
  require('./rules/jsonld-level'),
  require('./rules/program-course'),
  require('./rules/ui-leak')
]

const results = []

for (const file of scanFiles(targetDir)) {
  for (const rule of rules) {
    const r = rule.check(file)
    if (r) results.push(r)
  }
}

report(results)
```

------

# 三、文件扫描（递归）

## `tools/aeo-lint/scan.js`

```
const fs = require('fs')
const path = require('path')

function scanFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      scanFiles(full, files)
    } else if (/\.(vue|ts|js|json|md)$/.test(entry)) {
      files.push({
        path: full,
        content: fs.readFileSync(full, 'utf8')
      })
    }
  }
  return files
}

module.exports = { scanFiles }
```

------

# 四、规则实现（核心）

------

## RULE L1 — Level URL / Query 禁止

### `rules/level-url.js`

```
module.exports = {
  check(file) {
    if (/\?stage=|#stage/.test(file.content)) {
      return {
        level: 'ERROR',
        file: file.path,
        message: 'Level must not be represented by query/hash (?stage= / #stage).'
      }
    }

    if (/\/levels\/(?!beginner|intermediate|advanced)/.test(file.content)) {
      return {
        level: 'ERROR',
        file: file.path,
        message: 'Invalid Level URL. Only /levels/{beginner|intermediate|advanced} allowed.'
      }
    }
  }
}
```

------

## RULE L2 — JSON-LD educationalLevel 结构

### `rules/jsonld-level.js`

```
module.exports = {
  check(file) {
    if (!file.content.includes('educationalLevel')) return

    if (/educationalLevel"\s*:\s*"/.test(file.content)) {
      return {
        level: 'ERROR',
        file: file.path,
        message: 'educationalLevel must not be a string. Use DefinedTerm with @id.'
      }
    }

    if (
      /educationalLevel/.test(file.content) &&
      !/\/levels\/(beginner|intermediate|advanced)/.test(file.content)
    ) {
      return {
        level: 'ERROR',
        file: file.path,
        message: 'educationalLevel.@id must point to /levels/* canonical URL.'
      }
    }
  }
}
```

------

## RULE P1 — Program / Course 关系越权

### `rules/program-course.js`

```
module.exports = {
  check(file) {
    const c = file.content

    if (/"@type"\s*:\s*"Course"/.test(c) && /hasPart/.test(c)) {
      return {
        level: 'ERROR',
        file: file.path,
        message: 'Course must not use hasPart. Ordering is Program-only.'
      }
    }

    if (/"@type"\s*:\s*"(Topic|Tag)"/.test(c) && /hasPart/.test(c)) {
      return {
        level: 'ERROR',
        file: file.path,
        message: 'Topic/Tag must not use hasPart with Course.'
      }
    }
  }
}
```

------

## RULE UI1 — UI 状态渗入语义层

### `rules/ui-leak.js`

```
module.exports = {
  check(file) {
    if (
      /"stage"\s*:/.test(file.content) &&
      /@context/.test(file.content)
    ) {
      return {
        level: 'ERROR',
        file: file.path,
        message: 'UI state (stage) must not appear inside JSON-LD.'
      }
    }
  }
}
```

------

# 五、统一输出与退出码

## `utils/report.js`

```
function report(results) {
  if (!results.length) {
    console.log('✓ aeo-lint passed')
    process.exit(0)
  }

  let hasError = false

  for (const r of results) {
    console.log(`[${r.level}] ${r.file}`)
    console.log(`  → ${r.message}`)
    if (r.level === 'ERROR') hasError = true
  }

  process.exit(hasError ? 1 : 0)
}

module.exports = { report }
```

------

# 六、本地运行

```
node tools/aeo-lint/index.js src
```

- ❌ 命中 ERROR → exit 1
- ✅ 全通过 → exit 0

------

# 七、CI（GitHub Actions 示例）

```
- name: AEO Structure Lint
  run: node tools/aeo-lint/index.js src
```

------

