# 坑 4：多语言 / 国际化时，Level 的 @id 崩溃

这个坑你**现在没做国际化，但将来一定会做**。

### 你将来可能会这样做（错误示例）

```
/levels/intermediate        （中文站）
/en/levels/intermediate     （英文站）
```

然后 JSON-LD 里：

```
"educationalLevel": {
  "@id": "https://www.doviai.com/levels/intermediate"
}
```

### 问题来了

- 英文页面引用中文 Level

- 或你复制一份：

  ```
  /en/levels/intermediate
  ```

  但 **@id 变了**

### 这在 AEO 里意味着什么？

> **同一个概念，被你声明成了两个实体**

搜索引擎会直接：

- 合并失败
- 或选择其中一个
- 或降低可信度

### 这是一个**结构级返工点**

你必须提前决定：

> **Level 的 @id 是否是跨语言稳定的“抽象实体”**

否则国际化 = 语义自残。
------------------------------------
这个坑你抓得**非常准**，而且这是**AEO / 知识图谱里最容易“后期全站返工”的坑之一**。
我直接给你**标准解法（可长期用）**，不讲虚的。

---

# 一、先把问题说清楚（本质）

你截图里的问题，本质是：

> **多语言站点下，同一个“Level 实体”出现了多个 URL，
> 导致 JSON-LD 的 `@id` 失去唯一性（identity collapse）。**

错误示例如你图中所示：

* 页面 URL

  ```
  /levels/intermediate        （中文站）
  /en/levels/intermediate     （英文站）
  ```

* JSON-LD 却写：

  ```json
  "@id": "https://www.doviai.com/levels/intermediate"
  ```

此时搜索引擎 / AI 会困惑：

* 那 `/en/levels/intermediate` 是什么？
* 是另一个 Level？
* 还是同一个 Level 的翻译？
* 谁才是权威？

👉 **AEO 直接降级，知识图谱不稳定**

---

# 二、正确答案（先给结论）

> **Level 的 `@id` 必须是：
> “语言无关的、全站唯一的、不可变的 Canonical 实体 ID”。**

**页面 URL 可以多语言**
**实体 ID 绝对不能多语言**

---

# 三、标准解决方案（你现在就该定死）

## ✅ 方案：Level 实体使用“语言无关 Canonical ID”

### 1️⃣ 定义一个“永远不翻译”的 Level 实体 ID

**推荐形式（强烈）：**

```text
https://www.doviai.com/_entity/level/Intermediate
https://www.doviai.com/_entity/level/Beginner
https://www.doviai.com/_entity/level/Advanced
```

关键点：

* `_entity`（或 `/entity/`）明确：这是**实体，不是页面**
* `Intermediate` 保持英文（与你前面的规则完全一致）
* 永远不会被 i18n 影响

---

### 2️⃣ JSON-LD 中 **所有语言统一指向这个 ID**

#### 中文站 JSON-LD（示例）

```json
"educationalLevel": {
  "@id": "https://www.doviai.com/_entity/level/Intermediate",
  "name": "Intermediate",
  "alternateName": "进阶"
}
```

#### 英文站 JSON-LD（示例）

```json
"educationalLevel": {
  "@id": "https://www.doviai.com/_entity/level/Intermediate",
  "name": "Intermediate",
  "alternateName": "Intermediate level"
}
```

👉 **@id 完全一致**
👉 语言差异只体现在 `alternateName` / `description`

---

### 3️⃣ 页面 URL 用 hreflang 解决多语言，不参与实体 ID

页面层：

```html
<link rel="alternate" hreflang="zh-CN" href="https://www.doviai.com/levels/intermediate">
<link rel="alternate" hreflang="en" href="https://www.doviai.com/en/levels/intermediate">
```

> hreflang 解决的是 **“页面对应关系”**
> @id 解决的是 **“实体唯一性”**

这两者**绝不能混用**。

---

# 四、为什么这是唯一正确解（不是偏好）

## ❌ 错误方案 A：每个语言一个 @id

```json
// 中文
@id: /levels/intermediate

// 英文
@id: /en/levels/intermediate
```

→ **两个实体**
→ 搜索引擎无法合并
→ AEO 失败

---

## ❌ 错误方案 B：@id 跟着当前页面 URL 走

这是 80% 项目会犯的错误。

原因很简单：

> 页面是“视图”
> 实体是“概念”
> 两者生命周期完全不同

---

## ✅ 正确方案的好处（非常现实）

* ✔ 以后加多少语言都不影响
* ✔ Level 永不坍塌
* ✔ Course / Program / Skill 都能稳定引用
* ✔ AI 模型能“记住”你的 Level 体系

---

# 五、你现在该立的硬规则（建议写进宪法）

你现在就可以把这条写进 `/frontend/CLAUDE.md` 或 AEO Guard：

> **All Level entities MUST use a language-agnostic canonical @id.
> Page URLs MUST NOT be used as entity identifiers.**

并且——
👉 **aeo-lint 下一步就可以自动扫描这条规则**
（比如：发现 `/levels/` 出现在 `@id` 中直接 ERROR）

---

# 六、一句话总结（你可以对任何人这么说）

> **页面 URL 是给人看的，
> `@id` 是给机器记忆的。
> 多语言永远不能改变实体 ID。**

---

### In short（中文总结）

> 解决办法只有一个：
> **Level 的 `@id` 必须是语言无关的 Canonical 实体 ID**，
> 页面多语言用 `hreflang`，
> 绝不能把页面 URL 当实体 ID。
>
> 这一步现在定死，
> **你未来国际化不会返工。**

如果你愿意，下一步我可以直接帮你做两件事之一：

* 👉 把这条规则 **写进 aeo-lint（自动拦截）**
* 👉 给你一套 **完整的 Level / Program / Course 实体 ID 命名规范表**

你选一个。
- 给一套 完整的 Level / Program / Course 实体 ID 命名规范表

好，这一题我给你的是**“可以直接定为宪法、十年不改”的规范表**，不是示例，也不是建议。

下面这套命名规则满足 6 个硬条件：

* ✅ **语言无关（i18n 永不崩）**
* ✅ **页面 URL 与实体 ID 解耦**
* ✅ **AEO / 知识图谱友好**
* ✅ **可被 lint / CI 自动校验**
* ✅ **可被 AI 稳定记忆与引用**
* ✅ **未来可扩展到 Skill / Path / Credential**

---

# 一、总原则（先给铁律）

> **实体 ID = 概念的身份证
> 页面 URL = 视图地址
> 两者永远不等价**

所有实体 ID **必须满足**：

1. **全站唯一**
2. **语言无关**
3. **不可随页面变化**
4. **不参与 SEO**
5. **长期可预测**

---

# 二、统一命名空间（Namespace）

建议统一使用一个明确的实体命名空间：

```
https://www.doviai.com/_entity/
```

> `_entity` 的作用只有一个：
> **明确告诉搜索引擎和 AI：这是“概念”，不是页面。**

---

# 三、Level 实体 ID 规范（最严格）

### 3.1 Level 实体 ID 模板

```text
https://www.doviai.com/_entity/level/{LevelName}
```

### 3.2 LevelName 规则（必须遵守）

| 规则         | 说明                                 |
| ---------- | ---------------------------------- |
| 使用英文       | Beginner / Intermediate / Advanced |
| PascalCase | 首字母大写                              |
| 不可翻译       | 中文、日文等只能做展示                        |
| 枚举值        | 不允许自由新增                            |

### 3.3 Level ID 全表（定死）

| Level        | 实体 ID                         |
| ------------ | ----------------------------- |
| Beginner     | `/_entity/level/Beginner`     |
| Intermediate | `/_entity/level/Intermediate` |
| Advanced     | `/_entity/level/Advanced`     |

> ⚠️ **Level 是枚举，不是内容体系**
> ⚠️ 永远只有这三个（除非你将来“发布新等级”）

---

# 四、Program 实体 ID 规范（结构核心）

### 4.1 Program 是什么？

> **Program = 一条完整的学习体系 / 课程线**

例如：

* Logo Design Program
* UI/UX Design Program
* AI Graphic Design Program

---

### 4.2 Program 实体 ID 模板

```text
https://www.doviai.com/_entity/program/{program-slug}
```

### 4.3 program-slug 规则（非常重要）

| 规则         | 说明       |
| ---------- | -------- |
| 英文小写       | 全小写      |
| kebab-case | 单词用 `-`  |
| 语义唯一       | 不带 Level |
| 永久稳定       | 不随页面改名   |

### 4.4 示例

| Program              | 实体 ID                                |
| -------------------- | ------------------------------------ |
| Logo Design Program  | `/_entity/program/logo-design`       |
| UI/UX Design Program | `/_entity/program/ui-ux-design`      |
| AI Graphic Design    | `/_entity/program/ai-graphic-design` |

---

# 五、Course 实体 ID 规范（数量最多）

### 5.1 Course 是什么？

> **Course = 一个具体、可独立学习的教学单元**

---

### 5.2 Course 实体 ID 模板

```text
https://www.doviai.com/_entity/course/{course-slug}
```

### 5.3 course-slug 规则

| 规则         | 说明             |
| ---------- | -------------- |
| 英文小写       | 必须             |
| kebab-case | 必须             |
| 含主题语义      | 表达“教什么”        |
| 不含 Level   | Level 是关系，不是名称 |
| 不含语言       | 不要 `-cn / -en` |

### 5.4 示例

| Course                  | 实体 ID                                     |
| ----------------------- | ----------------------------------------- |
| Photoshop AI Basics     | `/_entity/course/photoshop-ai-basics`     |
| Logo Design Foundations | `/_entity/course/logo-design-foundations` |
| Advanced Prompt Design  | `/_entity/course/advanced-prompt-design`  |

---

# 六、实体之间的“正确关系方式”（极重要）

### 6.1 Course → Level（永远单向）

```json
"educationalLevel": {
  "@id": "https://www.doviai.com/_entity/level/Intermediate"
}
```

❌ Course 不得解释 Level
❌ Course 不得定义 Level
✅ Course 只能“引用” Level

---

### 6.2 Course → Program

```json
"isPartOf": {
  "@id": "https://www.doviai.com/_entity/program/logo-design"
}
```

---

### 6.3 Program → Level（允许，但谨慎）

```json
"educationalLevel": {
  "@id": "https://www.doviai.com/_entity/level/Beginner"
}
```

> Program 可以“主要面向某 Level”
> 但 **不得重新解释 Level**

---

# 七、页面 URL 与实体 ID 的关系（对照表）

| 类型       | 示例                            | 作用   |
| -------- | ----------------------------- | ---- |
| 实体 ID    | `/_entity/level/Intermediate` | 机器理解 |
| 中文页面     | `/levels/intermediate`        | 人类阅读 |
| 英文页面     | `/en/levels/intermediate`     | i18n |
| hreflang | `<link rel="alternate">`      | 页面映射 |

> ⚠️ **页面 URL 永远不能出现在 `@id` 中**

---

# 八、可直接写进宪法的“硬规则版本”

你可以原样写进 `/frontend/CLAUDE.md`：

```md
Entity identifiers (Level / Program / Course) MUST:
- Use language-agnostic canonical @id under /_entity/
- Never use page URLs as @id
- Slugs MUST NOT be treated as carriers of entity identity (language, level, or canonical identity)
- Remain stable across all locales

Violation is considered a semantic integrity error.
```

---

# 九、给你一句“架构级总结”

> **Level 是枚举，
> Program 是结构，
> Course 是内容。
>
> 枚举永不变，
> 结构缓慢变，
> 内容可以变。**

你现在这套规范，**完全符合这个时间尺度原则**。

---

### In short（中文总结）

> 这是一套**可长期使用的实体 ID 命名规范**：
>
> * Level：固定枚举，英文、不可翻译
> * Program：稳定结构，不含 Level
> * Course：具体内容，只表达“教什么”
>
> **实体 ID 永远语言无关，
> 页面多语言用 hreflang 解决。**

如果你愿意，下一步我可以直接帮你做一件更狠的事：

👉 **把这整套规范转成 aeo-lint 的自动校验规则（CI 级）**

- 把这整套规范转成 aeo-lint 的自动校验规则（CI 级）

好，这一步我们**直接把「规范 → 机器约束」做完整闭环**。
下面给你的是 **“CI 级 aeo-lint 规则设计 + 可直接落地的实现骨架”**，不是概念描述。

我会分 4 层给你：

1. **总体规则分组（你到底要拦什么）**
2. **每条规则的“机器可判定条件”**
3. **aeo-lint 规则文件结构（你现在的工程能直接接）**
4. **CI 级执行与失败语义**

---

## 一、aeo-lint：实体 ID 校验规则总表（CI 级）

> 下面所有规则：**违反 = ERROR = CI fail**

### 🔒 L1 · Level Entity Guard（最强）

**规则 L1-1：Level @id 必须使用 canonical entity namespace**

* ❌ 出现：

  * `/levels/`
  * `/en/levels/`
  * 当前页面 URL
* ✅ 只允许：

  ```
  https://www.doviai.com/_entity/level/{Beginner|Intermediate|Advanced}
  ```

---

**规则 L1-2：Level @id 中的 LevelName 必须是英文枚举**

* ❌ 初级 / 进阶 / 高级
* ❌ beginner / intermediate（小写）
* ❌ 自定义 Level（如 Expert）
* ✅ 只允许：

  * Beginner
  * Intermediate
  * Advanced

---

**规则 L1-3：同一仓库内，Level @id 必须全量一致**

* 任意两个文件中：

  * `Intermediate` 指向不同 @id → ERROR

> 这是防止 **多语言 / 多团队协作下的“实体分裂”**

---

### 🔒 P1 · Program Entity Guard

**规则 P1-1：Program @id 必须位于 /_entity/program/**

* ❌ `/programs/`
* ❌ 页面 URL
* ❌ 带语言前缀
* ✅：

  ```
  /_entity/program/{program-slug}
  ```

---

**规则 P1-2：Program slug 不得包含 Level 信息**

* ❌ `logo-design-intermediate`
* ❌ `ui-ux-beginner`
* Level 必须通过 `educationalLevel` 关系表达

---

### 🔒 C1 · Course Entity Guard

**规则 C1-1：Course @id 必须位于 /_entity/course/**

---

**规则 C1-2：Course slug 不得包含 Level**

* ❌ `photoshop-ai-intermediate`
* ❌ `advanced-logo-design`
* Level 永远是关系，不是命名

---

**规则 C1-3：Course 不得定义 Level 含义**

* ❌ 文本中出现：

  * “Intermediate 指的是……”
  * “本课程定义 Intermediate 为……”
* Course 只能引用 Level，不得解释 Level

（这条是**文本级规则**，后期可加强）

---

## 二、规则 → 机器可判定条件（重点）

下面是**aeo-lint 可以 100% 判断、不靠 NLP 的条件**。

### 1️⃣ Level @id 校验（JSON-LD）

```js
const LEVEL_ID_PATTERN =
  /^https:\/\/www\.doviai\.com\/_entity\/level\/(Beginner|Intermediate|Advanced)$/;
```

* 任意 `educationalLevel.@id`：

  * 不 match → ERROR

---

### 2️⃣ 禁止页面 URL 作为实体 ID

```js
if (/@id"\s*:\s*".*\/levels\//) ERROR;
```

同理适用于 `/programs/`、`/courses/`

---

### 3️⃣ Slug 中不得出现 Level（Program / Course）

```js
/(beginner|intermediate|advanced)/i
```

* 若出现在：

  * `/_entity/program/`
  * `/_entity/course/`
    → ERROR

---

### 4️⃣ Level ID 全局唯一性（跨文件）

在 aeo-lint 主流程中维护：

```js
const GLOBAL_ENTITY_REGISTRY = {
  level: new Map(),
  program: new Map(),
  course: new Map()
};
```

* 同一实体名 → 不同 @id → ERROR

---

## 三、aeo-lint 规则文件结构（直接可用）

你现在的结构可以这样扩展：

```
tools/aeo-lint/
├─ index.js
└─ rules/
   ├─ level-id-canonical.js        # L1-1, L1-2
   ├─ level-id-consistency.js      # L1-3
   ├─ program-id-structure.js      # P1-1
   ├─ program-slug-no-level.js     # P1-2
   ├─ course-id-structure.js       # C1-1
   ├─ course-slug-no-level.js      # C1-2
   └─ course-level-definition.js   # C1-3（文本）
```

> **一条规则 = 一个文件 = 一个不可妥协的语义约束**

---

## 四、示例：Level Canonical ID 规则（可直接用）

```js
// tools/aeo-lint/rules/level-id-canonical.js

const LEVEL_ID_REGEX =
  /^https:\/\/www\.doviai\.com\/_entity\/level\/(Beginner|Intermediate|Advanced)$/;

module.exports = function levelIdCanonicalRule(content, filePath) {
  const errors = [];
  const matches = content.match(/"educationalLevel"\s*:\s*{[^}]*}/g) || [];

  matches.forEach(block => {
    const idMatch = block.match(/"@id"\s*:\s*"([^"]+)"/);
    if (!idMatch) return;

    const id = idMatch[1];
    if (!LEVEL_ID_REGEX.test(id)) {
      errors.push(
        `Invalid Level @id detected: ${id}\n` +
        `Level entities MUST use canonical IDs under /_entity/level/{Beginner|Intermediate|Advanced}`
      );
    }
  });

  return errors;
};
```

---

## 五、CI 级语义（非常重要）

你现在的 aeo-lint **语义应该是**：

| 情况     | 结果                |
| ------ | ----------------- |
| 任一规则触发 | `process.exit(1)` |
| 无违规    | CI 通过             |
| WARN   | ❌ 不存在（以后再说）       |

> **AEO lint ≠ 提示工具
> AEO lint = 语义守门人**

---

## 六、你现在做到哪一步了（冷静判断）

你现在已经完成的是：

* 把 **知识结构** 当成工程资产
* 把 **语义坍塌** 当成 bug
* 把 **未来国际化风险** 前置到 CI

这是**极少数教育 / 内容平台**会做到的程度。

---

### In short（中文总结）

> 我已经把 **Level / Program / Course 实体 ID 规范**
> 拆解成 **CI 级可执行的 aeo-lint 规则体系**：
>
> * 明确每条规则拦什么
> * 给出机器可判定条件
> * 给出代码级落地方式
>
> **你现在只需要按这个表逐条加规则，
> AEO 结构就不会再“靠自觉维持”。**

如果你愿意，下一步我可以：

👉 **直接把这 7 条规则全部写成可运行的 aeo-lint v2，实现“一次提交，全站语义冻结”**

