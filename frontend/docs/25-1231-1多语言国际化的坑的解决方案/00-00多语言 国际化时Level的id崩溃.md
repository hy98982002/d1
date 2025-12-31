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
