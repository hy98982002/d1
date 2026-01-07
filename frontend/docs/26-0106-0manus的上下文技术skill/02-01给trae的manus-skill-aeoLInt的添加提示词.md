直接给 task-dir-structure.js 的参考实现（对齐你现有 lint 架构）

好，下面我给你的是 **`task-dir-structure.js` 的“可直接落地的参考实现”**，
**严格对齐你现有的 aeo-lint 架构假设**（`scan.js` 扫文件、`report.js` 统一输出、规则模块只做检测逻辑）。

> ⚠️ 这是 **参考实现（reference implementation）**
> Trae 可以 **按这个直接写**，或在此基础上微调以完全贴合你仓库里的 util 函数名。

---

## `/tools/aeo-lint/rules/task-dir-structure.js`

```js
/**
 * Rule: TASK_DIR_STRUCTURE_REQUIRED
 *
 * Enforces planning-with-files task directory structure.
 *
 * Each directory under:
 *   docs/ai/tasks/<task-name>/
 * MUST contain:
 *   - task_plan.md
 *   - notes.md
 *   - deliverable.md
 *
 * Severity: ERROR (fail-fast)
 */

const path = require('path');
const fs = require('fs');

module.exports = {
  id: 'TASK_DIR_STRUCTURE_REQUIRED',
  level: 'ERROR',

  /**
   * @param {Object} context
   * @param {string[]} context.files   // all scanned file paths
   * @param {Function} context.report  // unified reporter
   */
  run(context) {
    const { files, report } = context;

    // 1. Collect all task directories under docs/ai/tasks/*
    const taskDirSet = new Set();

    for (const file of files) {
      // Normalize to posix-style paths
      const normalized = file.replace(/\\/g, '/');

      if (!normalized.startsWith('docs/ai/tasks/')) continue;

      const parts = normalized.split('/');
      // Expected: docs/ai/tasks/<task-name>/...
      if (parts.length < 4) continue;

      const taskDir = parts.slice(0, 4).join('/');
      taskDirSet.add(taskDir);
    }

    // 2. Validate required files in each task directory
    for (const taskDir of taskDirSet) {
      const requiredFiles = [
        'task_plan.md',
        'notes.md',
        'deliverable.md',
      ];

      const missing = [];

      for (const fileName of requiredFiles) {
        const fullPath = path.join(taskDir, fileName);
        if (!fs.existsSync(fullPath)) {
          missing.push(fileName);
        }
      }

      if (missing.length > 0) {
        report({
          ruleId: 'TASK_DIR_STRUCTURE_REQUIRED',
          level: 'ERROR',
          message: [
            `Task directory structure violation.`,
            `Each task directory MUST contain: task_plan.md, notes.md, deliverable.md.`,
            `Missing in "${taskDir}": ${missing.join(', ')}`,
          ].join(' '),
          file: taskDir,
        });
      }
    }
  },
};
```

---

## 为什么这个实现**对齐你现有 lint 架构**

我解释下关键设计点，方便你快速判断“是不是你要的那种”。

### 1️⃣ **规则模块是“纯检测”**

* 不创建文件
* 不修改文件
* 不推断意图
  👉 **只判断“是否违规”**

这和你现在的 `jsonld-level.js / level-url.js` 这一类规则是同一哲学。

---

### 2️⃣ **以 `files` 为输入源**

* 假设 `scan.js` 已经把仓库文件列表传进来
* 不自己递归扫目录（避免重复 IO）

👉 和你现有 aeo-lint 扫描方式一致

---

### 3️⃣ **fail-fast ERROR 语义**

* 一旦发现 task 目录缺文件
* 直接 `report({ level: 'ERROR' })`

👉 完全符合你前面定的：
**Task Planning Guard = 结构级 ERROR**

---

### 4️⃣ **不依赖 Guard md**

* 不读 `/CLAUDE.md`
* 不读 `docs/ai/guards/*.md`

👉 **JS = 执法层，只认事实，不认解释**

---

## 你接下来可以怎么用（两种安全路径）

### ✅ 路径 A（推荐）

直接把这份代码交给 Trae：

> “按这个参考实现写 `task-dir-structure.js`，
> 变量名 / report 接口可按项目实际微调，但逻辑保持一致。”

### ✅ 路径 B（你自己快速接）

* 对照你现有规则文件
* 调整：

  * `context.report` 参数结构
  * 是否需要 `context.options`

---

## 下一步顺序建议（别乱）

**正确的推进顺序是：**

1. ✅ `task-dir-structure.js`（你现在这一步）
2. `task-planning-files-required.js`（可以合并，也可以更细）
3. `deliverable-atomic.js`
4. `deliverable-no-process.js`
5. `project-state-sync.js`（WARN）

---

## 一句工程级确认

> 你现在已经完成了
> **“宪法 → 释法 → 第一条可执行执法规则”**
> 这是体系真正“上线”的起点。

如果你愿意，下一步我可以 **直接给你 `deliverable-atomic.js` 的参考实现**（那一条是最狠、也最容易出事故的）。
