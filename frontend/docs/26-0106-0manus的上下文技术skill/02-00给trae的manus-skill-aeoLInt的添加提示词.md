好，这里我给你的是**「一次性可交付给 Trae 的工程级提示词」**，目标只有两个，**不多、不乱、不越权**：

1. **只写 aeo-lint 的 JS 规则文件**
2. **只在 `/CLAUDE.md` 里把 06 号 Guard 正确接入 Execution Guards 顺序**

下面内容你可以 **整段原样复制给 Trae**。

---

## ✅ 给 Trae 的统一提示词（Strong / Minimal / Safe）

> **任务目标（严格按顺序执行）：**
>
> ### Part A — 实现 AEOLint 执法层（只写 JS，不碰 md）
>
> 请在以下目录中新增 AEOLint 规则文件：
>
> ```
> /tools/aeo-lint/rules/
> ```
>
> 新增并实现以下规则文件（文件名与职责必须严格对应）：
>
> ```
> task-dir-structure.js
> task-planning-files-required.js
> deliverable-atomic.js
> deliverable-no-process.js
> project-state-sync.js   // WARN 级
> ```
>
> **实现约束（非常重要）：**
>
> * 只实现 CLI / 文件级检测逻辑
> * 不修改、不生成、不重写任何 md 文档
> * 不修改 `/CLAUDE.md`
> * 不修改 `docs/ai/guards/` 下任何文件
> * ERROR 级规则必须 fail-fast
> * WARN 级规则只提示，不中断
>
> **规则语义依据：**
>
> * `/CLAUDE.md` → `Task Planning & Deliverable Guard`
> * `docs/ai/guards/06-TASK-PLANNING-DELIVERABLE-GUARD.md`
>
> JS 规则只负责“执法”，不负责“解释”。

---

> ### Part B — 更新 `/CLAUDE.md` 的 Execution Guards 顺序
>
> 在项目根目录 `/CLAUDE.md` 中，
> **`### Execution Guards (Mandatory, Ordered)`** 区块内，
> **在第 5 条之后追加第 6 条 Guard**：
>
> ```
> 6) Task planning & deliverable integrity
>    → `docs/ai/guards/06-TASK-PLANNING-DELIVERABLE-GUARD.md`
> ```
>
> **修改约束（非常重要）：**
>
> * 只允许在 Execution Guards 列表中新增这一条
> * 不得重写、移动、合并、删改已有 1–5 条 Guard
> * 不得修改 Guard 的编号与顺序含义
> * 不得在 `/CLAUDE.md` 其他位置重复 Guard 内容
>
> 该 Guard 为 **宪法级执行约束**，仅作为顺序声明接入。

---

> ### 全局禁止事项（必须遵守）
>
> * ❌ 不得在 `docs/ai/guards/` 中新增“实现说明”
> * ❌ 不得把 JS 实现逻辑写进任何 md
> * ❌ 不得调整 Guard 的语义强度（MUST / MUST NOT）
> * ❌ 不得自行合并或简化规则

---



---

## 一句工程级确认（非常重要）

> **这一步完成后，你的体系是：**
>
> * `/CLAUDE.md` → 立法（AI 行为）
> * `docs/ai/guards/06*` → 释法（制度说明）
> * `aeo-lint/*.js` → 执法（CI 强制）
>
> **职责完全解耦，可长期演进。**


