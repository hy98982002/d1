下面这段你直接丢给 Trae 执行即可。我把目标写得很硬：**先审计、再归并、再补硬规则、再解释为什么不进根宪法**，并且明确“不得改语义宪法”。

---

## 给 Trae 的提示词（可照抄执行）

你正在修改 `frontend/CLAUDE.md`。请严格遵守根目录 `/CLAUDE.md` 作为唯一宪法，不得重写、稀释或与之冲突。根宪法已明确：前端的语义与 AEO 执行细则应在 `frontend/CLAUDE.md` 中落地（参见根宪法对 `/frontend/CLAUDE.md` 的职责定义）。

### 任务目标（一次性完成，禁止拆成多轮发散）

**A) 先做“内容审计”：**

1. 通读当前 `frontend/CLAUDE.md`，定位所有与 AEO / JSON-LD / structured data / entity / hreflang / canonical / level/program/course 语义相关的段落。
2. 把这些段落从原位置“提取并归并”到一个新的统一章节下（见 B），**不得丢失任何必要约束**；若发现重复或冲突，必须选择“更硬、更明确、更可执行”的版本，并在变更说明里写清“冲突点 + 取舍理由”。

**B) 新增并建立 AEO 总目录（总章，硬约束）：**
在 `frontend/CLAUDE.md` 中新增一个一级标题（必须是一级标题）：

```md
## AEO / Structured Entity Rules (Hard Constraints)
```

然后在该总章下建立三个二级小节（标题照抄）：

```md
### 1) Entity Identity & Canonical IDs
### 2) Level / Program / Course Page–Entity Separation
### 3) JSON-LD Output Contract (Frontend)
```

把你在 A) 找到的所有 AEO 相关内容，全部移动到这个总章下，按语义归类到对应小节；移动后原位置应删除或改为引用（避免重复）。

**C) 加入新增硬规则（必须写进总章内，且必须“可 lint 化”）：**
把下面两条新增硬规则写入 `### 1) Entity Identity & Canonical IDs` 小节，使用 MUST / MUST NOT 语气，保持可机器检测：

1. **语言无关的实体 ID（Canonical @id）**

```md
All Level entities MUST use a language-agnostic canonical @id.
Page URLs MUST NOT be used as entity identifiers.
Entity identifiers MUST remain stable across all languages/locales.
```

2. **Level 实体名不可翻译（实体引用时必须英文）**

```md
Level entity names (Beginner / Intermediate / Advanced)
MUST be preserved in English across all languages when used as entity references.
Explanatory/descriptive text MAY be localized.
```

> 注意：这里的“entity references”指 JSON-LD 的 `name`（作为实体名）/ `@id` 引用 / 以及正文中“作为实体指代”出现的情况；普通中文语境的“进阶/高级”（非实体指代）不算违规。

**D) 明确“为什么不写进根目录宪法 /CLAUDE.md”：**
在 `frontend/CLAUDE.md` 的该 AEO 总章末尾，新增一个简短的说明段（3–6 行）：

* 解释这类规则属于“前端落地执行细则”，不应膨胀根宪法。
* 根宪法只保留跨全仓的长期红线；前端执行细则负责实现与可执行约束。
* 引用根宪法的职责划分（不要复制大段，只需一句话说明并链接/指向即可）。

**E) 输出变更清单（强制）：**
修改完成后，在 `frontend/CLAUDE.md` 末尾（版本信息之前）新增一个小节：

```md
### Change Log (this edit)
- Moved: <列出被移动的 AEO 相关小节标题/关键词>
- Added: AEO / Structured Entity Rules (Hard Constraints) + 2 new hard rules
- Removed/De-duplicated: <列出删除的重复段落标题>
- No semantic changes to /CLAUDE.md
```

### 禁止事项（必须遵守）

* 不要创建/建议新的 git worktree（本仓库通常已在 worktree 内；除非用户明确要求）。
* 不要把这些前端实现级规则搬到根目录 `/CLAUDE.md`。
* 不要扩展新的实体类型或新枚举（仅围绕 Level / Program / Course 现有体系整理）。
* 不要把 AEO 总章写成“建议/最佳实践”，必须是 Hard Constraints。

---

## 你问的“为什么不写进宪法里”的答案（直说）

根目录 `/CLAUDE.md` 的职责是**跨仓、跨端、长期不变的语义红线**；你这两条规则虽然很硬，但它们属于**前端如何输出 JSON-LD、如何组织页面与实体 ID 的执行契约**，一旦未来你把 JSON-LD 迁移到后端/构建层（SSG/SSR pipeline），实现细则会变，但宪法不该跟着频繁改。把它放 `frontend/CLAUDE.md`，符合你宪法里“分层文档治理”的定义。

---

### In short（中文总结）

把 AEO 规则集中到 `frontend/CLAUDE.md` 的一个总章里是对的；
根宪法只管“跨仓长期红线”，前端细则管“怎么落地、怎么可 lint”。
我给你的提示词会强制 Trae：**先审计→再归并→再加硬规则→再解释不进宪法的原因→最后输出变更清单**。
