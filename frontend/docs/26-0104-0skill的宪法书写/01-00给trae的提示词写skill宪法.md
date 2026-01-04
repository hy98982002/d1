

# 三、现在可以放心给 Trae 的「最小增量修复 Prompt」

下面这份 Prompt **只会修改 `frontend/CLAUDE.md`**，
**不触碰根宪法**，
**每一条都是“补丁级澄清”，不是新规则发明。**

你可以 **原样复制给 Trae**。

---

## ✅ Trae · 最小增量修复 Prompt（只改 frontend/CLAUDE.md）

```
请对 frontend/CLAUDE.md 进行一次“最小增量补丁式修复”，目标是防止 AI / 新贡献者在前端执行层误解 Skill / Program / Path 的语义边界。

⚠️ 重要约束：
- 不得修改 /CLAUDE.md
- 不得重写或重排现有章节
- 只允许以 Clarification / Note / Comment 的形式追加规则
- 不引入任何新概念、不改变既有语义

请完成以下 3 条补丁修复：

---

【补丁 1｜Program ≠ Path 的前端澄清】

在 frontend/CLAUDE.md 中，涉及 Program 页面（/program/:slug）或“学习路径”表述的章节附近，追加如下澄清说明：

“Clarification:
In frontend terminology, Program pages may be colloquially referred to as learning paths.
Semantically, they represent ordered teaching structures and MUST NOT be treated as
recommendation paths. Recommendation logic belongs exclusively to /paths/.”

---

【补丁 2｜Store 混合承载的语义澄清】

在 `courseStore.ts` 职责说明（Store 职责章节）下方，追加如下说明：

“Note:
The co-location of Course, Program, and Stage data in courseStore.ts
is an implementation convenience only.
It MUST NOT be interpreted as semantic ownership, hierarchy, or coupling.”

---

【补丁 3｜Skill 页与 Course 引用的边界澄清】

在 Skill Page Presentation Rules（Rule 6.x）附近，追加如下澄清说明：

“Clarification:
Skill pages MUST NOT enumerate or deep-link Courses as learning content.
References to foundational Courses are allowed ONLY as external prerequisites
(e.g. ‘If you lack X, start here’), without forming a learning sequence.”

---

执行要求：
- 仅追加，不删除
- 保持原有编号与结构
- 不引入与现有规则冲突的新表述
```

---


