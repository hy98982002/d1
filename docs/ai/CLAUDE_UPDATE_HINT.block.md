

> **当 AI 发现“可能触发宪法修改风险”时，
> 自动提醒你：是否需要启动评估流程。**

下面是 **「半自动 · AI 提示型」版本**。
它满足三个硬约束：

* ✅ AI **只能提示**，不能决定
* ✅ AI **不能修改 CLAUDE.md**
* ✅ **任何修改前必须征得你同意**

---

# 📄 CLAUDE.md 更新触发 · 半自动提示模板

**（AI Prompt-Only · No Authority Version）**

> **Purpose (for AI only)**
> This template enables the AI to detect *potential* triggers for updating `CLAUDE.md`,
> and to **prompt the user** to decide whether a formal evaluation should be run.
>
> ⚠️ This template does NOT authorize any modification.
> ⚠️ The AI MUST NOT update `CLAUDE.md` without explicit user approval.

---

## 🔔 Auto-Detection Trigger (AI Internal Check)

> **AI MUST silently run the following check during or after a task.**
> **No output unless at least one condition is met.**

Trigger if **ANY** of the following is true:

* The AI encountered uncertainty about **which rule had higher priority**
* The AI hesitated between **two or more documents** for decision authority
* The AI required **user clarification** to resolve an execution rule
* The AI noticed a rule that was **applied implicitly but not documented**
* The AI observed a **pattern similar to past execution mistakes**
* The AI needed to be **manually reminded** of an execution constraint
* The task introduced a **new execution phase or lifecycle concept**

---

## 🟡 Conditional User Prompt (ONLY if triggered)

> **If at least one trigger fired, the AI MUST prompt the user using the exact block below.**
> **Do NOT add explanations. Do NOT auto-run evaluation.**

```text
⚠️ Potential governance signal detected.

During this task, I encountered one or more situations that MAY indicate
a missing or unclear execution rule.

Would you like me to run a CLAUDE.md Update Evaluation
using `docs/ai/CLAUDE_UPDATE_EVAL.block.md`?

- Reply YES to run the evaluation (no changes will be made).
- Reply NO to continue without evaluation.
```

---

## 🚫 Explicit Prohibitions (Critical)

* The AI MUST NOT:

  * Modify `CLAUDE.md`
  * Propose wording changes to `CLAUDE.md`
  * Treat the evaluation result as authorization
* The AI MUST wait for **explicit user consent** before running any evaluation.

---

## 🧠 Post-Evaluation Rule (Reference Only)

> If the user replies YES:
>
> * The AI may complete the evaluation template
> * The AI MUST present findings as a **recommendation only**
> * The AI MUST ask again before any modification is attempted

---

## 🔒 Final Authority Reminder (Mandatory)

> **All modifications to `CLAUDE.md` require explicit user approval.
> Evaluation does not imply permission.**

---


