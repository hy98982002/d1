## 一、现有状态分析

1. **当前aeo-lint实现**：
   - 基础结构已存在：`tools/aeo-lint/index.js`
   - 仅有一条规则：`level-name-translation.js`
   - 缺少完整的文件扫描、规则管理和报告生成功能

2. **07-00aeo-lint.md要求**：
   - 提供了完整的aeo-lint框架设计
   - 包含6条核心规则：L1-L3、P1、C1、UI1
   - 明确的实现方案：Node.js CLI + 无第三方依赖
   - 支持ERROR/WARN/INFO三级输出
   - 可直接集成CI

3. **关系判断**：
   - 现有实现与07*无重叠，仅包含其中一个规则的部分功能
   - 07*提供的是完整框架，现有实现只是其中的一个规则片段
   - 需要扩展现有工具，实现07*中定义的完整功能

## 二、扩展方案

### 1. 核心文件结构（保留现有文件，添加缺失文件）

```
tools/aeo-lint/
├─ index.js                # CLI 入口（已有，需重构）
├─ scan.js                 # 文件扫描（新增）
├─ rules/
│  ├─ level-name-translation.js  # 已有规则，需保留
│  ├─ level-url.js         # L1: Level canonical / query（新增）
│  ├─ jsonld-level.js      # L2: educationalLevel / DefinedTerm（新增）
│  ├─ program-course.js    # P1: Program / Course 关系（新增）
│  └─ ui-leak.js           # UI1: UI 状态渗透（新增）
└─ utils/
   └─ report.js            # 统一输出与退出码（新增）
```

### 2. 实现步骤

#### 步骤1：重构现有index.js
- 移除现有简单实现
- 实现完整CLI入口，支持目录参数
- 集成文件扫描和规则管理

#### 步骤2：添加scan.js
- 实现递归文件扫描
- 支持.vue/.ts/.js/.json/.md文件
- 返回文件路径和内容对象

#### 步骤3：添加新规则文件
- 实现level-url.js：检查Level URL格式和query/hash
- 实现jsonld-level.js：检查JSON-LD educationalLevel结构
- 实现program-course.js：检查Program/Course关系
- 实现ui-leak.js：检查UI状态是否渗入JSON-LD

#### 步骤4：添加utils/report.js
- 实现统一的结果报告
- 支持ERROR/WARN/INFO三级输出
- 正确设置退出码

#### 步骤5：集成现有规则
- 保留level-name-translation.js
- 调整其接口以适配新框架
- 确保与其他规则协同工作

## 三、规则实现要点

1. **Level URL规则（L1）**：
   - 禁止使用?stage=或#stage表达Level
   - 检查Level URL格式是否正确

2. **JSON-LD Level规则（L2）**：
   - 禁止educationalLevel为字符串或枚举
   - 确保@id指向正确的Level canonical URL

3. **Program/Course关系规则（P1）**：
   - 禁止Course使用hasPart
   - 禁止Topic/Tag使用hasPart
   - 确保Program使用hasPart，Course使用isPartOf

4. **UI状态规则（UI1）**：
   - 禁止JSON-LD中出现stage/tab/filter
   - 禁止canonical指向带query的URL

## 四、运行与集成

1. **本地运行**：
   ```bash
   node tools/aeo-lint/index.js src
   ```

2. **CI集成**：
   ```yaml
   - name: AEO Structure Lint
     run: node tools/aeo-lint/index.js src
   ```

3. **输出示例**：
   ```
   [ERROR] src/components/Course.vue
     → Level must not be represented by query/hash (?stage= / #stage).
   ✓ aeo-lint passed
   ```

## 五、设计原则

- ✅ 只检查结构、路径、字段、关系
- ✅ 不依赖LLM或NLP
- ✅ 误杀可接受，但漏检不可接受
- ✅ 支持增量扩展
- ✅ 易于集成到现有开发流程

## 六、预期效果

- 自动阻断70%以上的AEO结构错误
- 提供清晰的错误信息和修复建议
- 支持CI/CD流程，确保代码质量
- 可扩展，支持未来添加更多规则

通过实现完整的aeo-lint工具，可以确保项目AEO结构的完整性和一致性，避免因结构错误导致的SEO问题和语义混淆。