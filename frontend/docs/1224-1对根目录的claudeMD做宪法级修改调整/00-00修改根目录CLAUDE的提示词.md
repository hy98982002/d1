
这是**宪法级修改指令**，不是讨论稿，也不是建议稿，Trae 只需要照做。

---

## ✅ Trae 执行用【调整提示词 · 宪法级】

> **角色设定（必须原样使用）**
> 你是一个严格遵守项目宪法的 AI 修改执行器。
> 你只允许做“结构性、语义一致性”的调整，不得引入新概念，不得扩大范围，不得重写风格。

---

### 🎯 目标

对根目录 `CLAUDE.md` 做**最小必要调整**，以达到：

* 宪法级稳定（长期不频繁修改）
* 消除流程性规则对宪法的污染
* 合法引入「未来 AEO 实体规划」但**不激活、不生成实体**
* 不改变现有语义判断结论、不推翻任何已确立规则

---

### 🧭 总体修改原则（必须遵守）

1. **只改 CLAUDE.md，不创建新文件**
2. **不删除任何已存在的语义红线**
3. **不重写大段内容，只做局部替换 / 增补**
4. **所有新增内容必须放在 Appendix（非规范性附录）**
5. **不得提前激活任何 AEO 实体或 JSON-LD**

---

### ✂️ 必须执行的 3 个具体调整

#### ✅ 调整 1：收紧 Review Requirements 的“规则变更范围”

在以下位置：

```md
### Review Requirements（审查要求）
- All rule changes must be documented in CLAUDE.md
```

**替换为（语义必须一致）：**

> 仅当规则变更**影响 URL / slug / 实体语义 / 枚举（如 Level、StageKey）**时，才必须更新 CLAUDE.md；
> 其余流程性、实现性、工具性规则应记录在 `frontend/CLAUDE.md` 或 `docs/` 中。

> ⚠️ 注意：
> 不得删除“任何会影响 URL/slug/实体语义/枚举 的改动必须显式声明”这条规则，而是让它成为**唯一强制标准**。

---

#### ✅ 调整 2：在 Appendix 中新增「AEO 实体扩展预案（不激活）」

在 `Appendix（非规范性附录）` 末尾新增一个小节，标题示例：

```md
### AEO Entity Expansion Plan（预案 · 非激活）
```

内容需包含以下 **四点，缺一不可**（可精简表述，但语义必须完整）：

1. **实体优先级路线图（非承诺）**

* Priority 0：Course / Program / Level（已激活）
* Priority 1：Skill（/skills/{slug}）
* Priority 2：Role / Career（如 /roles/{slug}）
* Priority 3：Tool / Glossary / Other abstractions

2. **字段预留规则（Interface Reservation）**

* 允许在数据模型中预留但不得启用以下字段：
  `skills / tools / targetRoles / topics / levelRef / programRef`
* 禁止在页面、JSON-LD、站点地图中提前暴露这些实体

3. **实体启用强制流程（Activation Gate）**

* 内容成熟 → 页面模板 → Schema → sitemap → 内链 → Search Console 监控
* 缺任一步，实体不得激活

4. **强制声明**

* 本节仅为长期规划预案
* 不构成当前系统的一部分
* AI 不得基于本节自动创建页面、路由或 JSON-LD

---

#### ✅ 调整 3：禁止未来实体规划“反向污染宪法正文”

在 Appendix 中 **明确写一句**（位置不限，但必须存在）：

> 本 Appendix 中的任何未来实体规划
> **不得反向修改、弱化或解释 CLAUDE.md 正文中的既有规则**。

---

### 🚫 明确禁止 Trae 做的事

* ❌ 不得新增 `/skills/`、`/roles/` 等实体规则到正文章节
* ❌ 不得修改已有 Page Responsibility / Entity Relationship 判断
* ❌ 不得引入时间表（如“半年内”“未来一年”）
* ❌ 不得生成或补全新的 JSON-LD 示例

---

### 📦 输出要求

修改完成后，请输出：

1. **修改了哪些位置（标题级别即可）**
2. **每一处修改的目的（一句话）**
3. 明确声明：

   > “未新增任何激活实体，未改变现有语义裁决。”

---



---


