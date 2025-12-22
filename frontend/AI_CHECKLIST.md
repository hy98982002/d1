
下面这份不是建议清单，而是：

> 🚨 **AI 修改前端前必须通过的「强制执行 Checklist」**
> 👉 任何 Claude / Trae / Cursor / Codex
> 👉 **未逐条通过 = 不允许开始改代码**



---

# 🚨 Frontend AI Mandatory Checklist

## （AI 在修改前端前必须通过）

```md
# Frontend AI Mandatory Checklist

This checklist MUST be passed before any AI modifies frontend code.

If any item cannot be answered with a clear YES,
the AI MUST STOP and ask for clarification.

---

## 1. Rule Awareness（规则认知）

- [ ] 我已阅读并理解 **项目根目录 CLAUDE.md**
- [ ] 我已阅读并理解 **frontend/CLAUDE.md**
- [ ] 我清楚本次修改属于：
  - [ ] UI / Component
  - [ ] Routing
  - [ ] State Management
  - [ ] JSON-LD / Meta
- [ ] 本次修改 **不涉及** 新的实体类型、学习阶段或语义规则

---

## 2. Semantic Safety（语义安全）

- [ ] 本次修改 **不会改变** Course / Topic / Program / Path 的职责边界
- [ ] Program 页面仍然只用于“有序学习路径”
- [ ] Topic 页面仍然只用于“无序主题聚合”
- [ ] Course 页面仍然不表达学习顺序

---

## 3. StageKey Compliance（阶段体系合规）

- [ ] 仅使用合法 StageKey：
```

beginner | intermediate | advanced

```
- [ ] 未引入 `basic`、`intro`、`pro` 或任何别名
- [ ] StageKey 仅用于展示与筛选，不承担路径语义

---

## 4. Routing Integrity（路由完整性）

- [ ] 所有路由语义与页面职责一致
- [ ] slug 语义未被改变
- [ ] 不存在 silent fallback
- [ ] 不存在“猜测正确 slug”的逻辑
- [ ] slug 不存在时能 fail-fast 到 404

---

## 5. JSON-LD & AEO Safety（AEO 安全）

- [ ] 每个页面只注入 **与自身语义匹配** 的 Schema
- [ ] Program 页面使用 `EducationalOccupationalProgram`
- [ ] Program ↔ Course 使用 `hasPart / isPartOf`
- [ ] JSON-LD 中的承诺在 UI 中可见
- [ ] 未为了 SEO 伪造结构或夸大能力

---

## 6. State Management Safety（状态安全）

- [ ] 业务状态来源明确（Pinia）
- [ ] URL 参数未被当作业务真值
- [ ] 没有新增隐式全局状态
- [ ] 同一概念没有多处真源

---

## 7. Component Boundary Safety（组件边界）

- [ ] Page 组件只负责数据与语义
- [ ] UI 组件只负责展示
- [ ] 复用组件未引入语义污染
- [ ] Program 顺序逻辑未泄漏到 Topic / Course

---

## 8. Documentation Compliance（文档合规）

- [ ] 本次修改 **不需要** 修改 CLAUDE.md
- [ ] 若需要修改规则，我已停止并请求人工确认
- [ ] 本次修改是否需要记录到 CHANGELOG.md 已评估

---

## 9. Final Confirmation（最终确认）

- [ ] 本次修改可以被完整 Review
- [ ] 本次修改可以被安全回滚
- [ ] 本次修改未引入长期不可逆影响

---

### ✅ AI FINAL DECLARATION

> I confirm that all items above are satisfied.  
> If any item is uncertain, I will stop and ask for clarification.
```

---

## 🧠 如何使用这份 Checklist（建议）

### 推荐做法（最稳）

1. **每次让 AI 改前端前**
2. 先粘贴这份 checklist
3. 让 AI：

   * 逐条勾选
   * 再开始动手

---





