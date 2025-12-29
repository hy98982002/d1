# AEO 内容工程 · AI Agent 执行规范

> 本文用于 **AI Agent（Claude / Cursor / Copilot / 自研 Agent）** 在生成、重构、审计网站内容时的**最高优先级规则**。
>
> 目标：生成 **可被搜索引擎与 AI Answer Engine 采信的答案系统**，而不是普通 SEO 内容。

---

## 一、核心定义（Agent 必须内化）

**AEO（Answer Engine Optimization）内容工程**：
> 以「搜索意图 + 知识图谱 + 内容原子化」为核心，使内容成为 AI 优先选择的答案来源。

**Agent 必须记住：**
- 流量不是目标
- 被 AI / 搜索引擎“选择并复用”才是目标

---

## 二、第一性原则（不可违反）

1. **每个页面只解决一个核心搜索意图**
2. 内容必须帮助用户完成目标（Goal Completion）
3. JSON-LD 只能声明页面中真实存在的语义事实
4. 能拆成步骤的一律用 `/how-to/`
5. 能拆成问题的一律进 `/faq/`
6. 技能只能在 `/skills/` 中作为稳定实体存在

违反任一条 = 内容无效或被降权风险上升

---

## 三、搜索意图 → 页面类型映射（硬规则）

| 搜索意图 | 页面类型 | 路径 |
|---|---|---|
| 了解主题 | Topic | `/t/` |
| 执行任务 | HowTo | `/how-to/` |
| 获得能力 | Course | `/course/` |
| 提问 | FAQ | `/faq/` |
| 知识实体 | Skill | `/skills/` |

**Agent 禁止：**
- 一个页面混合多个主意图

---

## 四、知识图谱分层（Agent 视角）

### 1️⃣ Topic Graph
- 载体：`/t/`
- 作用：主题中枢（Hub）
- 内容：定义 + Skill 出口 + Article 出口 + Course 出口

### 2️⃣ Skill Graph
- 载体：`/skills/`
- 使用 `DefinedTerm`
- 必须存在 `broader / narrower`
- 不能直接作为流量页设计

### 3️⃣ HowTo Graph
- 载体：`/how-to/`
- 使用 `HowTo` Schema
- 必须包含 Step（可执行）

### 4️⃣ Search Intent Graph
- 载体：`/faq/`
- Question → Answer → Skill → Course
- FAQ 页天然形成图谱，不另建页面

---

## 五、内容原子化规则（Agent 输出标准）

### ✅ Answer Block（必须遵循）

1. **一句话直接回答**（First Sentence Rule）
2. 3–5 行简要解释
3. 列表 / 步骤
4. 总结
5. 下一步行动（内部链接）

> Agent 输出如果不具备“可独立被抽取”的能力，视为不合格。

---

## 六、JSON-LD 使用规范（强制）

### ✅ 可用属性（高频）
- teaches
- learningOutcome
- broader / narrower
- educationalAlignment
- about / mentions

### ❌ 禁止行为
- 杜撰不存在的能力
- JSON-LD 与正文内容不一致
- 用 JSON-LD 补正文缺失信息

**原则：JSON-LD = 声明，不是创造。**

---

## 七、learningOutcome 写作规范（强规则）

- 必须为 **可达成结果**
- 动词开头
- 能对应 teaches 中 Skill
- 不写教学过程，只写“学完能做什么”

❌ 错误：
> 学习 Logo 设计原理

✅ 正确：
> 能独立完成一套品牌 Logo 设计草图

---

## 八、Blog 与 FAQ 的协作规则

- FAQ = 结论层（短答案）
- Blog = 解释层（Why / Thinking）
- 允许观点重复，不允许全文复制
- FAQ 应指向 Blog

---

## 九、用户满意度工程（Agent 必须考虑）

Agent 在生成内容时，必须自问：

> 用户看完后，还需要回到搜索引擎吗？

如果答案是“可能需要” → 内容需重构。

---

## 十、最终执行公式（Agent 内部）

```
合格内容 =
明确意图
+ 单一任务
+ 可抽取答案单元
+ 语义关系清晰
+ 用户目标可完成
```

---

# ✅ SKILL.md（给 AI Agent 作为“能力规则集”）

```yaml
name: AEO Content Engineering
level: Expert

purpose: |
  Enable the agent to design, generate, and refactor content that can be
  trusted, selected, and reused by search engines and AI answer systems.

core_principles:
  - intent_first
  - one_page_one_goal
  - knowledge_graph_thinking
  - content_atomization
  - satisfaction_over_traffic

page_types:
  topic:
    path: /t/
    goal: explain and connect
  how_to:
    path: /how-to/
    goal: complete a task
  skill:
    path: /skills/
    goal: define a stable capability entity
  course:
    path: /course/
    goal: deliver measurable outcomes
  faq:
    path: /faq/
    goal: resolve specific questions

answer_block:
  structure:
    - direct_answer
    - explanation
    - steps_or_points
    - summary
    - next_action

jsonld_policy:
  declare_only_existing_facts: true
  forbid_inventing_entities: true
  must_align_with_content: true

learning_outcome_rules:
  - action_oriented
  - achievable
  - aligned_with_teaches

success_criteria:
  - minimal_pogosticking
  - high_goal_completion
  - reusable_by_ai
```

---

> **如果 AI Agent 面临不确定决策：**
> 永远优先问：
>
> **“搜索引擎是否能确定：这个页面已经帮用户完成了目标？”**

