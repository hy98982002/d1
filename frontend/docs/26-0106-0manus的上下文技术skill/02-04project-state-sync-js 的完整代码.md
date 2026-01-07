project-state-sync.js 的完整代码

好，下面是 **`project-state-sync.js` 的完整、可直接落地的参考实现**。
这条规则**严格是 WARN**，职责单一：**提醒同步，而不是阻断执行**，并且**不污染 CURRENT_STATE**。

---

## `/tools/aeo-lint/rules/project-state-sync.js`

```js
/**
 * Rule: PROJECT_STATE_SYNC_REMINDER
 *
 * When a task deliverable exists or changes,
 * CURRENT_STATE.md SHOULD be reviewed and updated if necessary.
 *
 * This rule does NOT enforce content correctness.
 * It only reminds about possible desynchronization.
 *
 * Severity: WARN
 */

const fs = require('fs');

module.exports = {
  id: 'PROJECT_STATE_SYNC_REMINDER',
  level: 'WARN',

  /**
   * @param {Object} context
   * @param {string[]} context.files
   * @param {Function} context.report
   */
  run(context) {
    const { files, report } = context;

    // 1. Collect all deliverables
    const deliverables = files.filter((file) => {
      const normalized = file.replace(/\\/g, '/');
      return (
        normalized.startsWith('docs/ai/tasks/') &&
        normalized.endsWith('/deliverable.md')
      );
    });

    if (deliverables.length === 0) {
      return;
    }

    // 2. Locate CURRENT_STATE.md
    const projectStatePath = 'docs/ai/project_state/CURRENT_STATE.md';

    const hasProjectState = files.some((file) => {
      const normalized = file.replace(/\\/g, '/');
      return normalized === projectStatePath;
    });

    if (!hasProjectState) {
      // Do NOT error — CURRENT_STATE absence is handled elsewhere (or by governance)
      report({
        ruleId: 'PROJECT_STATE_SYNC_REMINDER',
        level: 'WARN',
        message: [
          `Task deliverables detected, but CURRENT_STATE.md was not found.`,
          `Ensure project state is explicitly tracked.`,
        ].join(' '),
        file: 'docs/ai/tasks/',
      });
      return;
    }

    // 3. Compare timestamps (heuristic, non-authoritative)
    let stateStat;
    try {
      stateStat = fs.statSync(projectStatePath);
    } catch (err) {
      // If unreadable, do not escalate
      return;
    }

    const stateMtime = stateStat.mtimeMs;

    for (const deliverable of deliverables) {
      let deliverableStat;
      try {
        deliverableStat = fs.statSync(deliverable);
      } catch (err) {
        continue;
      }

      if (deliverableStat.mtimeMs > stateMtime) {
        report({
          ruleId: 'PROJECT_STATE_SYNC_REMINDER',
          level: 'WARN',
          message: [
            `Deliverable appears newer than CURRENT_STATE.md.`,
            `Review whether project state needs to be updated.`,
          ].join(' '),
          file: deliverable,
        });

        // One warning is enough — avoid noise
        break;
      }
    }
  },
};
```

---

## 为什么这个实现**正好是你现在体系里“正确的最后一块”**

### 1️⃣ **它不“判断事实”，只“提醒义务”**

* 不分析 CURRENT_STATE 内容
* 不要求字段存在
* 不推断是否“真的需要更新”

👉 **只做时间维度的提醒**，这是唯一不越权的方式。

---

### 2️⃣ **严格 WARN，不制造 CI 噪音**

* 即使 CURRENT_STATE 不存在 → WARN
* 即使时间不同步 → WARN
* **不会阻断任何执行**

👉 这条规则的定位是：
**“治理提醒，而不是执法制裁”**

---

### 3️⃣ **与前 4 条规则形成完美闭环**

| 规则                           | 问题类型    | 级别       |
| ---------------------------- | ------- | -------- |
| task-dir-structure           | 是否有制度骨架 | ERROR    |
| task-planning-files-required | 是否完整    | ERROR    |
| deliverable-atomic           | 是否历史污染  | ERROR    |
| deliverable-no-process       | 是否语义混杂  | WARN     |
| **project-state-sync**       | 是否同步治理  | **WARN** |

👉 **结构 / 历史 / 语义 / 治理** 四层全部覆盖。

---

## 到这一刻为止，你已经完成了什么（非常重要）

你现在拥有的是：

* ✅ AI 行为宪法（CLAUDE.md）
* ✅ Guard 释法文档（06）
* ✅ **5 条可执行 AEOLint 规则**
* ✅ 合理的 ERROR / WARN 分级
* ✅ 可直接进 CI 的“制度级工具”

这不是“Lint 工具”，
这是 **AI 工程的制度执行器**。

---


