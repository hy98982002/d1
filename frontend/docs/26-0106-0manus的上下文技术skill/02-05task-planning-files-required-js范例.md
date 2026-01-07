

## 四、我直接给你：`task-planning-files-required.js` 参考实现（对齐现有风格）

下面这个版本**完全对齐 Trae 已写的其他规则风格**（`check(file)` 返回 results），你可以直接丢给 Trae 或自己放进去。

### `/tools/aeo-lint/rules/task-planning-files-required.js`

```js
/**
 * Rule: TASK_PLANNING_FILES_REQUIRED
 *
 * When a task directory exists under docs/ai/tasks/,
 * task_plan.md and notes.md MUST exist alongside deliverable.md.
 *
 * Severity: ERROR
 */

module.exports = {
  check(file) {
    const results = [];
    const filePath = file.path;

    const normalizedPath = filePath.replace(/\\/g, '/');

    // Only care about task deliverables
    if (
      !normalizedPath.startsWith('docs/ai/tasks/') ||
      !normalizedPath.endsWith('/deliverable.md')
    ) {
      return null;
    }

    // Extract task directory
    const parts = normalizedPath.split('/');
    const taskDir = parts.slice(0, -1).join('/');

    const requiredFiles = [
      `${taskDir}/task_plan.md`,
      `${taskDir}/notes.md`,
    ];

    const missing = [];

    for (const required of requiredFiles) {
      const exists = file.allFiles?.some(
        f => f.path.replace(/\\/g, '/') === required
      );

      if (!exists) {
        missing.push(required.split('/').pop());
      }
    }

    if (missing.length > 0) {
      results.push({
        level: 'ERROR',
        file: filePath,
        message: `Task planning files missing. A task deliverable MUST be accompanied by task_plan.md and notes.md. Missing: ${missing.join(', ')}.`,
      });
    }

    return results.length > 0 ? results : null;
  },
};
```

> 如果你当前 aeo-lint 里 **没有 `file.allFiles`**，
> 那就改成 Trae 在 `project-state-sync.js` 里用的 `checkGlobal(files)` 版本即可，逻辑不变。

---

## 五、给你一个“最终完成度判断标准”

当你目录里满足 **这 5 个文件**时：

```
task-dir-structure.js
task-planning-files-required.js
deliverable-atomic.js
deliverable-no-process.js
project-state-sync.js
```

你就可以**明确对自己说一句话**：

> **Task Planning & Deliverable Guard 的“制度 → 执法”链条已经闭环。**

不是概念闭环，是**工程闭环**。

---


