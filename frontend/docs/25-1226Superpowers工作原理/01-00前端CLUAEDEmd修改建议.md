

---

## ❌ 问题 1：frontend/CLAUDE.md 里的 Full 版仍然有结构错误

你现在这个片段里 **依然存在致命解析问题**：

### 当前错误结构（我直接点名）

````md
```bash
git checkout -b <feature-branch>
Override Rule (Critical)
Git worktree creation is ONLY allowed when the user explicitly asks for:
````

### 问题点（非常明确）：

1. **bash 代码块没有关闭**
2. `Override Rule (Critical)` 没有用 `###` 作为标题
3. 后面的列表因此被“吞进代码块”

👉 **结果是什么？**

> AI 有极大概率 **完全读不到 Override Rule**
> 在冲突场景下仍可能擅自创建 worktree

⚠️ 这是“规则失效级别”的问题。

---

## ✅ 正确修复方式（请直接替换 Full 版那一段）

### 🔧 修正后的标准版本（你应该用这一份）

````md
### Allowed Actions

- Creating a **new branch within the current worktree** is allowed and preferred:
  ```bash
  git checkout -b <feature-branch>
````

### Override Rule (Critical)

Git worktree creation is ONLY allowed when the user explicitly asks for:

* parallel editors
* simultaneous branch comparison
* multi-branch runtime execution

This declaration **overrides any default Superpowers assumptions** about repository state.

````

👉 **这是硬性修复，不是风格问题**

---


