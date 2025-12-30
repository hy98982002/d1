好，这里我直接给你 **“可以原样丢给 Trae 执行的提示词”**。
这是**操作级 Prompt**，不是解释文。

我会给你 **两段**：

1️⃣ 给 Trae 的 **主提示词（让他改文件）**
2️⃣ 你**最终期望的结果结构（供你验收）**

---

## ✅ 给 Trae 的执行提示词（可直接复制）

```
You are modifying project constitution files.

TASK:
1) Add a mandatory rule to /frontend/CLAUDE.md defining Level entity naming constraints.
2) Add a reference notice to /CLAUDE.md pointing to /frontend/CLAUDE.md.
3) Do NOT duplicate the full rule in /CLAUDE.md.
4) Do NOT modify unrelated rules.

DETAIL REQUIREMENTS:

A) In /frontend/CLAUDE.md, add a new mandatory section titled:
"## Level Entity Naming Rule (Mandatory)"

The content MUST state:
- Level entity names (Beginner / Intermediate / Advanced) MUST be preserved in English across all languages.
- This rule applies to Course pages, Program pages, Level pages, and JSON-LD.
- Translated equivalents (e.g. 初级 / 进阶 / 高阶) MUST NOT replace Level entity names when used as references.
- Explanatory or descriptive text MAY be localized.
- Violations are considered semantic integrity errors.

B) In /CLAUDE.md, add a short reference-only notice stating:
- Frontend semantic and AEO execution rules are defined in /frontend/CLAUDE.md.
- Any AI modifying frontend content, routing, or structured data MUST comply with those rules.

CONSTRAINTS:
- Do NOT restate the Level naming rule in /CLAUDE.md.
- Do NOT weaken wording (MUST stays MUST).
- Do NOT change existing section hierarchy unless required.
- Output only the file changes summary after completion.
```

---

## 🧪 你验收时应看到的结果（对照用）

### `/frontend/CLAUDE.md` 中应新增一段（示意）

```md
## Level Entity Naming Rule (Mandatory)

Level entity names (Beginner / Intermediate / Advanced)
MUST be preserved in English across all languages
when used as entity references.

- This applies to Course, Program, Level pages, and JSON-LD.
- Translated equivalents (e.g. 初级 / 进阶 / 高阶) MUST NOT replace entity names.
- Explanatory and descriptive text MAY be localized.

Violation of this rule is considered a semantic integrity error.
```

---

### `/CLAUDE.md` 中只应新增“指向性声明”（不含细则）

```md
Frontend semantic and AEO execution rules are defined in:
/frontend/CLAUDE.md

Any AI modifying frontend content, routing, or structured data
MUST comply with those rules.
```

---

## ⚠️ 关键提醒（非常重要）

如果 Trae 出现以下行为之一，**必须回退**：

* ❌ 把 Level 命名规则完整复制进 `/CLAUDE.md`
* ❌ 把 MUST 改成 SHOULD / MAY
* ❌ 把规则塞进“Notes / Tips / Recommendations”
* ❌ 合并进已有章节导致层级混乱

你这一步的目标是：

> **让“语言选择”成为结构性约束，而不是写作习惯。**

---

### In short（中文总结）

> 用这条提示词让 Trae：
>
> * **规则写进 `/frontend/CLAUDE.md`（执行宪法）**
> * **根 `/CLAUDE.md` 只做引用声明（不展开）**
>
> 这是当前最干净、最不反噬未来的做法。



