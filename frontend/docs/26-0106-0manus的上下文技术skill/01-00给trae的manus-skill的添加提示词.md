好，这一步我给你**“直接可复制给 Trae 的最小可执行提示词”**，并且**明确告诉它：贴到 `/CLAUDE.md` 的哪个位置、以什么级别出现**，避免 Trae 自作主张乱放。

---

## ✅ 结论先行（给你定位置）

**`Task Planning & Deliverable Guard` 应该：**

* ✅ **放在 `/CLAUDE.md`**
* ✅ **作为新的宪法级 Guard**
* ✅ **位置：紧跟在现有的 `### Execution Guards（Mandatory, Ordered）` 区块之后**
* ❌ **不要放进 Appendix**
* ❌ **不要放进 frontend/CLAUDE.md**
* ❌ **不要降级为 docs 里的说明文档**

原因一句话：

> 这是 **“AI 如何执行大型任务”的行为宪法**，而不是前端细则或流程说明。

---

## 🧠 给 Trae 的【简单提示词｜可直接粘】

> ⚠️ 下面这段你可以**原样复制**给 Trae

---

**Trae Prompt：**

> 请修改项目根目录 `/CLAUDE.md`，在以下位置新增一个宪法级 Guard：
>
> **插入位置要求（非常重要）：**
> 将以下内容作为一个新的独立 Guard 区块，
> **紧接在 `### Execution Guards（Mandatory, Ordered）` 区块之后**，
> 在 `### Mandatory Task End Protocol` 之前。
>
> **新增标题必须使用：**
> `## Task Planning & Deliverable Guard`
>
> **规则级别要求：**
>
> * 该 Guard 属于 **宪法级（Constitutional）规则**
> * 不得放入 Appendix
> * 不得降级为 docs/ 或 frontend/CLAUDE.md 内容
> * 不得修改其语义强度（MUST / MUST NOT）
>
> **请完整粘贴并保持以下内容原文不变：**
>
> 

---

## 🛡️ Task Planning & Deliverable Guard（强制）

### 1. Task Execution Model（任务执行模型）

For any **multi-step, multi-round, or large-scope task**, the AI **MUST** use the `planning-with-files` execution model.

Each task **MUST** have its own isolated task directory:

```
docs/ai/tasks/<YYYY-MM-DD>-<task-name>/
```

Containing exactly:

* `task_plan.md`
* `notes.md`
* `deliverable.md`

---

### 2. File Role Separation（文件职责隔离）

The following role boundaries are **STRICT and NON-NEGOTIABLE**:

#### `task_plan.md`

* Controls task state and execution order
* Tracks phases, status, and next actions
* Used to determine what to do next
* **MUST be read before any major decision**

#### `notes.md`

* Stores execution details, technical reasoning, and errors
* Records failed attempts, edge cases, and investigations
* Used to continue work across multiple rounds
* **MUST NOT be treated as final conclusions**

#### `deliverable.md`

* Represents the **final, usable outcome** of the task
* Contains only stable results, conclusions, and usage instructions
* **MUST NOT include** logs, errors, raw reasoning, or execution traces
* **MUST be readable as a standalone artifact**

---

### 3. Deliverable Isolation Rule（交付物隔离铁律）

* A `deliverable.md` **MUST NOT** embed, merge, or inherit content from previous task deliverables.
* Task deliverables are **atomic, immutable, and historically isolated**.
* Deliverables exist to record **what was achieved in that task only**.

---

### 4. Project State Authority（项目状态唯一真源）

The project **MUST maintain** a single, authoritative project-level state file:

```
docs/ai/project_state/CURRENT_STATE.md
```

Rules:

* `CURRENT_STATE.md` is the **Single Source of Truth (SSOT)** for all active rules, structures, and constraints.
* Only stable, currently valid conclusions may exist in `CURRENT_STATE.md`.
* Historical decisions or superseded rules **MUST NOT** remain.

---

### 5. Task Completion Protocol（任务完成协议）

Upon completing any task, the AI **MUST**:

1. Finalize the task’s `deliverable.md`
2. **Extract and merge only valid outcomes** into `CURRENT_STATE.md`
3. Remove or mark obsolete rules in `CURRENT_STATE.md`
4. Leave previous task deliverables unchanged

---

### 6. Task Startup Protocol（新任务启动协议）

When starting a new task, the AI **MUST**:

1. Read `docs/ai/project_state/CURRENT_STATE.md`
2. Create a new task directory under `docs/ai/tasks/`
3. Initialize a fresh `task_plan.md`
4. **MUST NOT** automatically read all previous task deliverables

Historical deliverables may be read **only if explicitly relevant**.

---

### 7. Immutability & Enforcement（不可变性）

* This Guard defines a **constitutional execution constraint**
* The AI **MUST NOT modify, weaken, or bypass** these rules
* Any violation **invalidates the task output**

---

## 🔒 End of Guard

---




---

