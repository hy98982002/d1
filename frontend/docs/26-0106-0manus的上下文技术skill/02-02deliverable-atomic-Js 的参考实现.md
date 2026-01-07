直接给 deliverable-atomic.js 的参考实现

好，下面是 **`deliverable-atomic.js` 的可直接落地参考实现**，
**风格、接口、语义全部对齐你现有 aeo-lint 规则体系**，并且是 **ERROR / fail-fast 级别**。

> 这条规则是 **Task Planning & Deliverable Guard 里“最核心的一条执法规则”**，
> 用来**彻底阻断 deliverable 链式继承 / 历史污染**。

---

## `/tools/aeo-lint/rules/deliverable-atomic.js`

```js
/**
 * Rule: DELIVERABLE_MUST_BE_ATOMIC
 *
 * A task deliverable MUST be atomic and historically isolated.
 * deliverable.md MUST NOT reference or embed other task deliverables.
 *
 * Severity: ERROR (fail-fast)
 */

const fs = require('fs');
const path = require('path');

module.exports = {
  id: 'DELIVERABLE_MUST_BE_ATOMIC',
  level: 'ERROR',

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
        // If deliverable exists but is unreadable, still fail
        report({
          ruleId: 'DELIVERABLE_MUST_BE_ATOMIC',
          level: 'ERROR',
          message: `Unable to read deliverable file: ${deliverablePath}`,
          file: deliverablePath,
        });
        continue;
      }

      const normalizedContent = content.replace(/\\/g, '/');

      // ---- Detection Patterns ----

      const forbiddenPathPatterns = [
        /docs\/ai\/tasks\/.+\/deliverable\.md/i,
        /\.\.\/.+\/deliverable\.md/i,
      ];

      const forbiddenTextPatterns = [
        /previous deliverable/i,
        /see deliverable/i,
        /based on deliverable/i,
        /merged from/i,
        /inherited from/i,
        /continued from/i,
      ];

      const violations = [];

      for (const pattern of forbiddenPathPatterns) {
        if (pattern.test(normalizedContent)) {
          violations.push(`references another task deliverable (path match)`);
          break;
        }
      }

      for (const pattern of forbiddenTextPatterns) {
        if (pattern.test(normalizedContent)) {
          violations.push(`references another task deliverable (semantic match)`);
          break;
        }
      }

      // ---- Report ----
      if (violations.length > 0) {
        report({
          ruleId: 'DELIVERABLE_MUST_BE_ATOMIC',
          level: 'ERROR',
          message: [
            `Deliverable must be atomic and historically isolated.`,
            `Violations detected: ${violations.join('; ')}.`,
            `Deliverables MUST NOT reference or inherit from other task deliverables.`,
          ].join(' '),
          file: deliverablePath,
        });
      }
    }
  },
};
```

---

## 为什么这个实现是“你现在体系里**正确的那种**”

我帮你对照了你前面确立的 **制度 → 执法原则**：

### 1️⃣ **只看结果，不看意图**

* 不管 AI 是“无意引用”还是“刻意复用”
* 只要 deliverable **出现跨任务引用 → ERROR**

👉 完全符合 **“AEOLint 只执法，不释法”**

---

### 2️⃣ **路径级 + 语义级双保险**

* **路径匹配**：防止直接 copy-paste
* **文本语义匹配**：防止“换个说法偷偷继承”

👉 这是防“聪明 AI”的关键一刀

---

### 3️⃣ **范围严格受控**

* 只扫描：

  ```
  docs/ai/tasks/**/deliverable.md
  ```
* 不误伤其他 md（README / guards / notes）

---

### 4️⃣ **ERROR 级 fail-fast 合理**

这条规则一旦触发，**项目已经处于结构性污染状态**，
继续执行只会扩大损害。

👉 ERROR 是唯一正确等级

---

## 和 Guard 文档的精确映射关系

| Guard 文档条目                          | JS 行为     |
| ----------------------------------- | --------- |
| Deliverables MUST be atomic         | ERROR     |
| MUST NOT inherit other deliverables | 路径 + 文本检测 |
| Historical isolation mandatory      | fail-fast |

---

## 你现在已经完成的里程碑

到这一刻，你已经真正完成了：

* ✅ 宪法（CLAUDE.md）
* ✅ 释法（06 Guard）
* ✅ **第一条结构执法**
* ✅ **第一条语义执法**

接下来再完成两条：

* `deliverable-no-process.js`
* `project-state-sync.js`

你的 **Task Planning Guard** 就会成为**完整可运行制度**。

---

## 下一步我建议你继续的顺序（非常重要）

> **下一条：`deliverable-no-process.js`**

原因：

* 这是**第二高频出问题点**
* 而且 **WARN → ERROR** 可渐进上线
* 非常适合现在这个阶段

如果你点头，我下一条直接给你 **`deliverable-no-process.js` 的参考实现**。


