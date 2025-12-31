

---

## 结论先行（非常明确）

**这句话：**

> `Entity @id MUST NOT be used in hreflang.  
> hreflang MUST reference page URLs only.  
> Entity identity and page localization are separate layers.`

👉 **不写进 `/CLAUDE.md`（根宪法）**
👉 **应该写进 `/frontend/CLAUDE.md`**
👉 **你现在这版 `frontend/CLAUDE.md`：❌ 还没明确包含这条规则**

---

## 为什么「不能写进根宪法 /CLAUDE.md」

这是一个**层级判断问题**，不是内容对不对的问题。

### 根宪法的职责（你自己已经定义得很清楚）

`/CLAUDE.md` =

> **跨全仓、跨端、长期不可讨论的红线**

而这条规则本质是：

* 约束 **HTML `<link rel="alternate" hreflang>`**
* 明确 **页面 SEO 实现方式**
* 只在 **前端 / SSR / SSG / Head 注入阶段** 才会出现

👉 后端 / 数据层 / schema 生成工具
👉 **根本不会碰 hreflang**

**所以：**

* 写进根宪法 = 污染宪法
* 会让宪法承担「实现细节」
* 未来你自己都会嫌它臃肿

**❌ 不该进 `/CLAUDE.md`**

---

## 为什么「必须写进 frontend/CLAUDE.md」

因为这句话解决的是一个**非常危险、非常常见的误用点**：

> ❌ 把 `_entity/...` 当成 hreflang URL
> ❌ 把 identity 层和 localization 层混在一起

这是**前端最容易犯、AI 最容易犯、SEO 最容易 silently fail 的地方**。

而你现在的 frontend/claude.md 里：

* ✅ 已经有

  * entity identity
  * canonical @id
  * page vs entity separation
* ❌ 但**还没点名 hreflang 是 page-only 机制**

👉 **这是一个“缺口”**

---

## 回答你的第二个问题：

###「我刚新的 frontend/claude.md 已经包含了吗？」

**答案：没有。**

现在你写的是（我帮你抽象总结）：

* Page URLs ≠ Entity IDs ✅
* Entity identity ≠ page presentation ✅
* JSON-LD 用 canonical @id ✅

但你**没有一条硬规则**明确说：

> **hreflang 属于 page localization 层，禁止触碰 entity @id**

这就是为什么你现在才会反复问：

> “为什么 hreflang 里的 URL 和 `_entity/...` 不一样？”

---

## 正确做法（我给你“可以直接落地”的版本）

### 放置位置（很重要）

在 **`/frontend/CLAUDE.md` → AEO / Structured Entity Rules** 下面
新增一个 **单独小节**，而不是混在 Rule 1 里。

---

### ✅ 推荐标题（用这个）

```md
### 4) hreflang & Entity Identity Separation (Hard Rule)
```

---

### ✅ 推荐正文（原句几乎不用改）


Entity @id MUST NOT be used in hreflang.

hreflang MUST reference page URLs only.

Entity identity and page localization are separate layers.
```

如果你想再“宪法化一点”，可以加一句：


Violation is considered a semantic integrity error.


（是否加这句取决于你打算是否纳入 aeo-lint）

---

## 再给你一句“架构级确认”

你现在形成的是一个**非常高级、非常干净的三层模型**：

| 层级                  | 机制            | URL 示例                        |
| ------------------- | ------------- | ----------------------------- |
| **Entity Identity** | JSON-LD / @id | `/_entity/level/Intermediate` |
| **Canonical Page**  | SEO / 内容页     | `/levels/intermediate`        |
| **Localization**    | hreflang      | `/en/levels/intermediate`     |

👉 **hreflang 只允许存在于第 3 层**
👉 **@id 永远只存在于第 1 层**

这句话写进 frontend/claude.md，**完全合理、非常必要、不会反噬**。

---

## In short（中文总结）

* 这句 **不该进根宪法 `/CLAUDE.md`**
* **必须进 `/frontend/CLAUDE.md`**
* 你当前版本 **还没明确包含 hreflang 的硬约束**
* 应新增一个小节：**hreflang & Entity Identity Separation**
* 这是一个**前端 / AEO / SEO 交叉点的关键硬规则**

