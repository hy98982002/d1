直接给 deliverable-no-process.js 的参考实现。

好，下面是 **`deliverable-no-process.js` 的可直接落地参考实现**。
这条规则是 **在你体系里“非常关键但语义要克制”的一条**，我按你现在的成熟度，**设计为可调等级（默认 WARN）**，完全对齐你之前的制度表述。

---

## `/tools/aeo-lint/rules/deliverable-no-process.js`

```js
/**
 * Rule: DELIVERABLE_NO_PROCESS_CONTENT
 *
 * A deliverable MUST describe final outcomes only.
 * It MUST NOT contain execution process, steps, logs, or reasoning.
 *
 * Severity: WARN (default)
 * (Can be promoted to ERROR later if desired)
 */

const fs = require('fs');

module.exports = {
  id: 'DELIVERABLE_NO_PROCESS_CONTENT',
  level: 'WARN',

  /**
   * @param {Object} context
   * @param {string[]} context.files
   * @param {Function} context.report
   */
  run(context) {
    const { files, report } = context;

    // Only inspect deliverable.md files under docs/ai/tasks/
    const deliverables = files.filter((file) => {
      const normalized = file.replace(/\\/g, '/');
      return (
        normalized.startsWith('docs/ai/tasks/') &&
        normalized.endsWith('/deliverable.md')
      );
    });

    for (const deliverablePath of deliverables) {
      let content;
      try {
        content = fs.readFileSync(deliverablePath, 'utf8');
      } catch (err) {
        // If unreadable, do not escalate here (structure rule already covers this)
        continue;
      }

      const text = content.toLowerCase();

      // ---- Process / execution indicators ----
      const processIndicators = [
        // step-by-step language
        /step\s+\d+/,
        /first[, ]|second[, ]|third[, ]|then[, ]|finally[, ]/,
        /步骤/,
        /流程/,
        /执行过程/,
        /实现过程/,

        // reasoning / logs
        /we decided/,
        /i decided/,
        /reasoning/,
        /thought process/,
        /analysis/,
        /debug/,
        /log/,
        /trace/,
        /尝试/,
        /调试/,
        /失败/,
        /修改了/,

        // temporal narration
        /initially/,
        /at first/,
        /later/,
        /eventually/,
        /随后/,
        /接着/,
        /最后/,

        // tooling narration
        /ran command/,
        /executed/,
        /npm install/,
        /git commit/,
        /git push/,
      ];

      const violations = [];

      for (const pattern of processIndicators) {
        if (pattern.test(text)) {
          violations.push(pattern.toString());
          break;
        }
      }

      if (violations.length > 0) {
        report({
          ruleId: 'DELIVERABLE_NO_PROCESS_CONTENT',
          level: 'WARN',
          message: [
            `Deliverable should contain final outcomes only.`,
            `Process / execution language detected.`,
            `Move process details to notes.md.`,
          ].join(' '),
          file: deliverablePath,
        });
      }
    }
  },
};
```

---

## 为什么这条规则**必须是 WARN（现在）**

这是一个**非常重要的设计判断**，我直接说结论，不绕：

### ❗ 为什么不是 ERROR？

* **过程性语言 ≠ 一定破坏项目结构**
* 很多 deliverable 初期不可避免会夹带一点过程
* 过早 ERROR 会：

  * 降低 AI 执行效率
  * 诱发“删内容逃避 lint”的反行为

👉 **WARN 是正确的“制度引导阶段”**

---

## 和前两条规则的职责边界（非常清晰）

| 规则                     | 职责     | 严厉度      |
| ---------------------- | ------ | -------- |
| task-dir-structure     | 结构是否存在 | ERROR    |
| deliverable-atomic     | 是否污染历史 | ERROR    |
| deliverable-no-process | 是否夹带过程 | **WARN** |

这三条 **组合起来，刚好构成一个稳定制度闭环**。

---

## 和 Guard 文档的映射关系（严谨）

| Guard 文档                          | JS 行为 |
| --------------------------------- | ----- |
| Deliverable records outcomes only | WARN  |
| Process belongs in notes.md       | 提示迁移  |
| No execution narration            | 非阻断   |

---

## 你现在所处的阶段（非常关键）

到这里为止，你已经完成了：

* 🧠 **AI 行为宪法**
* 📜 **可读 Guard**
* ⚙️ **3 条真实可执行规则**
* 🔥 **2 ERROR + 1 WARN 的合理组合**

这已经不是“实验性 lint”，
这是**可以进 CI、可以长期用的工程制度**。

---

## 下一步（只剩最后一块拼图）

> **`project-state-sync.js`（WARN）**

它的作用不是限制，而是提醒：

* deliverable 发生变化
* CURRENT_STATE.md 是否需要同步

如果你愿意，我可以 **直接把最后这一条也给你完整实现**，
然后你的 **Task Planning & Deliverable Guard** 就是 **100% 闭环完成**。

