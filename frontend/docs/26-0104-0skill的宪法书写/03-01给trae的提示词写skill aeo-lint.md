很好，这一步我会**完全站在 Trae 的执行视角**，把事情**压缩成一份“可直接干活、不需要再理解背景”的提示词**，并且**严格对齐你现在的 `/tools/aeo-lint` 目录结构与风格**。

下面内容你可以 **整段原样复制给 Trae**。

---

# ✅ Trae 专用提示词：扩展 /tools/aeo-lint（新增 3 条语义 Guard 规则）

```
目标：
在现有 /tools/aeo-lint CLI 工具中，新增 3 条「语义边界类」检测规则，
用于在 CI / 本地扫描阶段自动阻断 Skill / Program / Path 的语义越权行为。

⚠️ 背景约束（必须遵守）：
- 不修改现有规则的语义、不重构已有规则
- 不调整 scan.js / report.js 的架构
- 新规则必须与现有规则风格、输出格式、严重级别体系一致
- 新规则仅做“结构性必错”的检测，不做业务判断，不自动修复

---

## 一、现有结构（已存在）

/tools/aeo-lint/
├─ index.js              # CLI 入口，注册规则
├─ scan.js               # 扫描器
├─ rules/
│  ├─ program-course.js
│  ├─ topic-program.js
│  ├─ level-url.js
│  ├─ jsonld-level.js
│  ├─ ui-leak.js
│  └─ ...
└─ utils/report.js       # 统一错误 / 警告输出

请严格仿照 rules/ 下现有规则的代码风格。

---

## 二、新增规则总览（必须全部实现）

请在 `rules/` 目录下新增 **3 个规则文件**，并在 `index.js` 中完成注册。

| Rule ID | 文件名 | 严重级别 |
|-------|-------|--------|
| AEO-PROGRAM-PATH-001 | program-path.js | ERROR |
| AEO-SKILL-BOUNDARY-002 | skill-boundary.js | ERROR |
| AEO-STORE-SEMANTIC-003 | store-semantic.js | WARN |

---

## 三、规则 1：Program / Path 语义越权检测

### 文件
```

rules/program-path.js

```

### 规则意图
- 阻止 Program 页面 / JSON-LD 被写成“推荐路径 / 学习规划”
- 阻止 Path 页面在结构层表达教学顺序

### 检测要求（命中任一即 ERROR）

#### A. Program 页面违规
- 路径包含 `/programs/`
- 页面内容或 JSON-LD 中出现以下关键词（大小写不敏感）：
  - recommended order
  - learning plan
  - study plan
  - suggested sequence
  - skill progression
  - pathway

#### B. Path 结构违规
- 路径包含 `/paths/`
- JSON-LD 中出现：
  - hasPart / isPartOf 指向 Course 或 Program
  - 明显的教学顺序字段（非纯文本推荐）

### 输出
- 使用 report.js 输出 ERROR
- message 中明确指出：Program ≠ Path 的语义越权

---

## 四、规则 2：Skill 边界 / Curriculum 越权检测

### 文件
```

rules/skill-boundary.js

```

### 规则意图
- 防止 Skill 页面被当成课程目录或 Program 容器

### 检测要求（ERROR）

#### A. Skill 页面 Course 枚举（硬违规）
- 路径包含 `/skills/`
- 页面中出现：
  - `/course/` 链接作为学习步骤
  - CourseCard / CourseList 等组件引用
  - 连续多个 course slug

#### B. Skill “包含 Program”语义
- 文案中出现：
  - this skill includes
  - this skill consists of
  - 包含以下 program

#### C. 允许的唯一例外（不得误报）
- 允许出现以下模式之一（单条、非列表）：
  - if you lack X, start with
  - prerequisite / foundational course
- 但若形成列表或顺序 → 仍报 ERROR

---

## 五、规则 3：Store ≠ 语义主权误推断检测

### 文件
```

rules/store-semantic.js

```

### 严重级别
```

WARN

```

### 规则意图
- 防止从 store 实现结构中推断语义关系

### 检测要求（WARN）

- 扫描 stores/ 目录或 PR diff 内容
- 命中以下文本模式之一：
  - course belongs to program
  - program owns courses
  - stage is part of course
  - because they are in the same store
  - courseStore manages everything so …

### 输出
- 使用 report.js 输出 WARN
- message 中提示：
  “Store co-location does not imply semantic ownership”

---

## 六、注册与输出要求（必须完成）

1. 在 `index.js` 中注册 3 条新规则
2. 输出格式必须与现有规则一致（ERROR / WARN 分类）
3. 不允许 auto-fix
4. README.md 中追加一小节，列出新增规则 ID 与用途（简述即可）

---

## 七、完成标准

- `node index.js <target>` 可正常运行
- 新规则不影响现有规则
- 命中示例可被正确拦截
- 未命中场景不误报

这是一次 **规则扩展任务，不是架构设计任务**。
请严格按上述说明实现。
```

---


