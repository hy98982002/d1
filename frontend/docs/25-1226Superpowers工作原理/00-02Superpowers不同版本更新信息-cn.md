超级能力发布说明
v4.0.3 (2025-12-26)
改进
增强了“使用超能力”技能以应对明确的技能请求

解决了 Claude 在用户明确以名称请求某个技能（例如：“subagent-driven-development，请”）时仍可能跳过调用该技能的情况。Claude 之前会认为“我知道这是什么意思”，然后直接开始工作，而不会加载相应的技能。

修改内容:

将"The Rule"更新为"调用相关或请求的技能"，而不是"检查技能" - 强调主动调用而非被动检查
添加了"在任何响应或行动之前" - 原始表述仅提到了"响应"，但 Claude 有时会在没有先响应的情况下采取行动
添加了保证，调用错误的技能是可以接受的 - 减少犹豫
新增红色警示标志："我知道那是什么意思" → 了解概念 ≠ 使用技能
新增显式的技能请求测试

在 tests/explicit-skill-requests/ 中新增测试套件，验证 Claude 在用户明确请求技能名称时能正确调用相关技能。包含单轮和多轮测试场景。

v4.0.2 (2025-12-23)
修复
斜杠命令现在仅限用户使用

所有三个斜杠命令（/brainstorm, /execute-plan, /write-plan）都添加了 disable-model-invocation: true 。Claude 现在无法通过技能工具调用这些命令，它们仅限手动由用户调用。

底层技能（superpowers:brainstorming, superpowers:executing-plans, superpowers:writing-plans）仍然可供 Claude 自主调用。此更改可防止当 Claude 调用一个本就指向技能的命令时产生混淆。

v4.0.1 (2025-12-23)
修复
澄清了如何在 Claude Code 中访问技能

修复了一个令人困惑的模式，其中 Claude 会通过 Skill 工具调用技能，然后尝试单独读取技能文件。现在 using-superpowers 技能明确说明 Skill 工具会直接加载技能内容，无需单独读取文件。

添加了“如何访问技能”部分到 using-superpowers
将指令中的“read the skill”更改为“invoke the skill”
更新了斜杠命令以使用完整的技能名称（例如： superpowers:brainstorming）
为 receiving-code-review 添加了 GitHub 线程回复指南 （感谢 @ralphbean）

添加了关于在原始线程中回复内联审查评论而非作为顶级 PR 评论的说明。

在写作技能中添加了自动化优于文档的指导 （致谢 @EthanJStark）

添加了指导，指出机械性约束应通过自动化实现，而非文档说明——保留技能用于判断性决策。

v4.0.0 (2025-12-17)
新功能
子代理驱动开发的两阶段代码评审

子代理工作流程现在在每个任务后使用两个独立的审核阶段：

规范符合性审查 - 怀疑的审查者验证实现是否完全符合规范。能够发现缺失的要求和过度构建的问题。不会信任实施者的报告——会阅读实际代码。

代码质量审查 - 仅在规格符合性通过后运行。审查内容包括代码整洁度、测试覆盖率和可维护性。

这可以捕捉到常见的失败模式，即代码写得不错但不符合需求。审查是循环进行的，而不是一次性：如果审查者发现问题，执行者进行修复，然后审查者再次检查。

其他子代理工作流程改进：

控制器向工作者提供完整的任务文本（而不是文件引用）
工作人员可以在工作前和工作中提出澄清问题
完成报告前的自我检查清单
计划在开始时阅读一次，提取到 TodoWrite
skills/subagent-driven-development/ 中的新提示模板：

implementer-prompt.md - 包括自我审查清单，鼓励提问
spec-reviewer-prompt.md - 对需求的怀疑性验证
code-quality-reviewer-prompt.md - 标准代码审查
调试技术与工具的整合

systematic-debugging 现在包含支持的技术和工具：

root-cause-tracing.md - 通过调用栈回溯错误
defense-in-depth.md - 在多个层级添加验证
condition-based-waiting.md - 用条件轮询替代任意超时
find-polluter.sh - 二分查找脚本，用于找出创建污染的测试
condition-based-waiting-example.ts - 完整实现来自真实调试会话
测试反模式参考

test-driven-development 现在包含 testing-anti-patterns.md，涵盖：

测试模拟行为而非真实行为
向生产类添加仅用于测试的方法
无理解依赖的嘲讽
不完整的模拟测试，隐藏了结构假设
技能测试基础设施

三个新的测试框架用于验证技能行为：

tests/skill-triggering/ - 验证技能能否从简单的提示中触发，而无需显式命名。测试 6 个技能，确保仅凭描述即可满足要求。

tests/claude-code/ - 无头测试的集成测试，使用 claude -p。通过会话转录（JSONL）分析验证技能使用情况。包含 analyze-token-usage.py 用于费用追踪。

tests/subagent-driven-dev/ - 两个完整测试项目的端到端工作流验证：

go-fractals/ - 命令行工具，包含谢尔宾斯基/曼德博集合（10 个任务）
svelte-todo/ - 使用 localStorage 和 Playwright 的 CRUD 应用（12 个任务）
主要改动
DOT 流程图作为可执行规范

使用 DOT/GraphViz 流程图重写了关键技能，作为权威的流程定义。文字内容变为辅助说明。

描述陷阱 （在 writing-skills 中有所记录）：发现当描述中包含工作流摘要时，技能描述会覆盖流程图内容。Claude 会遵循简短的描述，而不是阅读详细的流程图。解决方法：描述必须仅作为触发条件（"在 X 情况下使用"），不得包含任何流程细节。

技能优先级在使用超能力时

当多个技能适用时，现在明确地将处理技能（如头脑风暴、调试）排在实现技能之前。"Build X" 会首先触发头脑风暴，然后触发领域技能。

头脑风暴触发增强

描述改为命令式："你 MUST 在任何创造性工作之前使用此技能—创建功能、构建组件、添加功能或修改行为。"

重大变更
技能整合 - 六项独立技能合并：

root-cause-tracing, defense-in-depth, condition-based-waiting → 打包在 systematic-debugging/ 中
testing-skills-with-subagents → 打包在 writing-skills/ 中
testing-anti-patterns → 打包在 test-driven-development/ 中
sharing-skills 已移除（已过时）
其他改进
render-graphs.js - 工具，用于从技能中提取 DOT 图并渲染为 SVG
使用超能力的理性化表 - 可扫描格式，新增条目包括："我需要更多信息"、"让我先探索一下"、"这感觉很有生产力"
docs/testing.md - 技能测试指南，使用 Claude Code 集成测试
v3.6.2 (2025-12-03)
修复
Linux 兼容性 : 修复多语言钩子包装器 (run-hook.cmd) 以使用 POSIX 兼容语法
将第 16 行中的 bash 特定的 ${BASH_SOURCE[0]:-$0} 替换为标准的 $0
解决在 Ubuntu/Debian 系统中使用 /bin/sh 为 dash 时出现的"Bad substitution"错误
修复#141
v3.5.1 (2025-11-24)
修改
OpenCode Bootstrap 重构：从 chat.message 钩子切换到 session.created 事件进行启动注入
Bootstrap 现在通过 session.prompt() 在会话创建时注入，且 noReply: true
明确告知模型已加载使用超能力，以防止重复加载技能
将启动内容生成合并到共享的 getBootstrapContent() 辅助函数中
更简洁的单一实现方式（移除了备用模式）
v3.5.0 (2025-11-23)
新增功能
OpenCode 支持 : OpenCode.ai 的原生 JavaScript 插件
自定义工具：use_skill 和 find_skills
技能在上下文压缩中的持久化消息插入模式
通过 chat.message 钩子自动上下文注入
在 session.compacted 事件中自动重新注入
三级技能优先级：项目 > 个人 > 超能力
项目本地技能支持 (.opencode/skills/)
代码复用的共享核心模块 (lib/skills-core.js) 与 Codex
带适当隔离的自动化测试套件 (tests/opencode/)
平台特定文档 (docs/README.opencode.md, docs/README.codex.md)
已更改
重构了 Codex 实现 ：现在使用共享的 lib/skills-core.js ES 模块

消除了 Codex 与 OpenCode 之间的代码重复
技能发现和解析的单一真实来源
Codex 通过 Node.js 兼容性成功加载 ES 模块
改进的文档 ：重写了 README 以清晰地解释问题/解决方案

删除了重复部分和冲突信息
添加了完整的流程描述（头脑风暴 → 计划 → 执行 → 完成）
简化了平台安装说明
强调技能检查协议而非自动激活的主张
v3.4.1 (2025-10-31)
改进
优化了超能力的启动过程，以消除重复的技能执行。现在 using-superpowers 技能内容直接提供在会话上下文中，明确指导仅在需要其他技能时使用技能工具。这减少了开销，并防止了代理在会话开始后已获得内容的情况下，仍然手动执行 using-superpowers 所导致的混淆循环。
v3.4.0 (2025-10-30)
改进
简化 brainstorming 技能，回归原始的对话式愿景。移除了包含正式检查清单的六阶段流程，改用自然对话方式：逐一提问，然后以 200-300 字的段落呈现设计方案并进行验证。保留了文档和实现交接的功能。
v3.3.1 (2025-10-28)
改进
更新 brainstorming 技能，要求在提问前进行自主调研，鼓励以推荐为导向的决策，并防止代理将优先级判断交还给人类。
对 brainstorming 技能应用了写作清晰度改进，遵循 Strunk 的"Elements of Style"原则（省略不必要的词语，将否定形式转换为肯定形式，改进平行结构）。
Bug Fixes
澄清了 writing-skills 指导，使其指向正确的代理特定个人技能目录（Claude Code 为 ~/.claude/skills，Codex 为 ~/.codex/skills）。
v3.3.0 (2025-10-28)
新功能
实验性 Codex 支持

新增统一的 superpowers-codex 脚本，包含 bootstrap/use-skill/find-skills 命令
跨平台 Node.js 实现（适用于 Windows、macOS、Linux）
命名空间技能：superpowers:skill-name 用于超级能力技能，skill-name 用于个人技能
个人技能覆盖超能力技能当名称匹配时
清晰的技能展示：显示名称/描述，不包含原始前缀内容
有帮助的上下文：显示每个技能的支持文件目录
Codex 工具映射：TodoWrite→update_plan，子代理→手动回退，等等。
Bootstrap 集成，使用最小化的 AGENTS.md 实现自动启动
完整的安装指南和针对 Codex 的引导说明
与 Claude Code 集成的主要区别：

单一统一脚本，而非独立工具
Codex 专用等效工具替换系统
简化子代理处理（手动工作而非委派）
术语更新："超能力技能" 代替 "核心技能"
新增文件
.codex/INSTALL.md - Codex 用户安装指南
.codex/superpowers-bootstrap.md - 启动说明，包含 Codex 适配
.codex/superpowers-codex - 包含所有功能的统一 Node.js 可执行文件
注意: Codex 支持是实验性的。该集成提供了核心超能力功能，但可能需要根据用户反馈进行调整。

v3.2.3 (2025-10-23)
改进
使用 using-superpowers 技能更新为使用 Skill 工具代替 Read 工具

将技能调用说明从 Read 工具更改为 Skill 工具
更新描述："using Read tool" → "using Skill tool"
更新步骤 3："Use the Read tool" → "Use the Skill tool to read and run"
更新后的理性化列表："Read the current version" → "Run the current version"
Skill 工具是调用 Claude Code 技能的正确机制。此更新修正了引导说明，以指导代理使用正确的工具。

文件更改
更新： skills/using-superpowers/SKILL.md - 将工具引用从 Read 改为 Skill
v3.2.2 (2025-10-21)
改进
使用“使用超能力”技能对抗代理合理化

新增了包含绝对语言的“极其重要”区块，强调技能检查的强制性
"如果即使有1%的可能性技能适用，你也必须阅读它"
你没有选择。你无法用理性来摆脱困境。
新增强制性首次响应协议检查清单
代理在任何响应前必须完成的5步流程
明确“未完成此步骤即为失败”的后果
新增了常见借口部分，包含8种具体的逃避模式
"这只是一个简单的问题" → 错误
"我可以快速查看文件" → 错误
"让我先收集一些信息" → 错误
更多5种在代理行为中观察到的常见模式
这些更改针对了代理在明确指示下仍围绕技能使用进行合理化的现象。使用强硬的语言和预先的反驳论点旨在使不遵守变得更加困难。

修改的文件
更新时间： skills/using-superpowers/SKILL.md - 增加了三层执行机制以防止跳过技能的理性化
v3.2.1 (2025-10-20)
新功能
代码评审代理现已包含在插件中

在插件的 agents/ 目录中添加了 superpowers:code-reviewer 代理
Agent 提供系统化的代码审查，依据计划和编码规范
之前要求用户拥有个人 Agent 配置
所有技能引用已更新为使用命名空间 superpowers:code-reviewer
修复 #55
文件更改
新增: agents/code-reviewer.md - 代理定义，包含审查清单和输出格式
更新: skills/requesting-code-review/SKILL.md - 对 superpowers:code-reviewer 的引用
更新: skills/subagent-driven-development/SKILL.md - 对 superpowers:code-reviewer 的引用
v3.2.0 (2025-10-18)
新功能
设计文档在头脑风暴流程中的文档设计

新增阶段4：设计文档到头脑风暴技能
设计文档现在写入 docs/plans/YYYY-MM-DD-<topic>-design.md 之后实施
恢复了在技能转换过程中丢失的原始头脑风暴命令的功能
在工作树设置和实施计划之前编写的文档
通过子代理测试以验证在时间压力下的合规性
重大变更
技能参考命名空间标准化

所有内部技能引用现在都使用 superpowers: 命名空间前缀
更新格式： superpowers:test-driven-development （之前仅为 test-driven-development）
影响所有 REQUIRED SUB-SKILL、RECOMMENDED SUB-SKILL 和 REQUIRED BACKGROUND 引用
与使用技能工具调用技能的方式保持一致
已更新文件：brainstorming, executing-plans, subagent-driven-development, systematic-debugging, testing-skills-with-subagents, writing-plans, writing-skills
改进
设计与实现计划的命名

设计文档使用 -design.md 后缀以避免文件名冲突
实施计划继续使用现有的 YYYY-MM-DD-<feature-name>.md 格式
均存储在 docs/plans/ 目录下，并有清晰的命名区分
v3.1.1 (2025-10-17)
Bug Fixes
修复了 README 中的命令语法 (#44) - 更新了所有命令引用，使用正确的命名空间语法 (/superpowers:brainstorm 而不是 /brainstorm)。Claude Code 会自动为插件提供的命令添加命名空间，以避免插件之间的冲突。
v3.1.0 (2025-10-17)
重大变更
技能名称统一为小写

所有技能的前言 name: 字段现在都使用小写连字符命名法，与目录名匹配
示例：brainstorming，test-driven-development，using-git-worktrees
所有技能的公告和交叉引用已更新为小写格式
这确保了目录名、前言和文档之间命名的一致性
新功能
增强的头脑风暴技能

新增快速参考表，展示各个阶段、活动和工具使用情况
新增可复制的工作流程检查表以跟踪进度
新增决策流程图，用于确定何时返回到之前的阶段
添加了全面的 AskUserQuestion 工具指导并包含具体示例
添加了“问题模式”部分，解释何时使用结构化问题与开放式问题
将关键原则重构为可快速浏览的表格
整合了 Anthropic 的最佳实践

添加了 skills/writing-skills/anthropic-best-practices.md - 官方 Anthropic 技能编写指南
在写作技能的 SKILL.md 中被引用以获得全面指导
提供渐进披露模式、工作流程和评估方法
改进
技能交叉引用清晰度

所有技能参考现在都使用显式的条件标记：
**REQUIRED BACKGROUND:** - 必须掌握的基础知识
**REQUIRED SUB-SKILL:** - 在工作流中必须使用的技能
**Complementary skills:** - 可选但有帮助的相关技能
移除了旧的路径格式（skills/collaboration/X → 只保留 X）
更新了集成部分，按关系类别进行了分类（必需 vs 互补）
更新了交叉引用文档中的最佳实践
与 Anthropic 最佳实践保持一致

修正了描述的语法和语气（完全使用第三人称）
添加了快速参考表格以便扫描
添加了 Claude 可复制和跟踪的工作流程检查表
在不明显的决策点适当使用流程图
改进了可扫描的表格格式
所有技能均在500行以内推荐
错误修复
重新添加了缺失的命令重定向 - 恢复了在 v3.0 迁移中意外删除的 commands/brainstorm.md 和 commands/write-plan.md
修复了 defense-in-depth 名称不匹配的问题（原为 Defense-in-Depth-Validation）
修复了 receiving-code-review 名称不匹配问题（原为 Code-Review-Reception）
修复了 commands/brainstorm.md 中对正确技能名称的引用
删除了对不存在的相关技能的引用
文档说明
写作技能提升

更新了交叉引用指南，加入了明确的要求数标
新增了对 Anthropic 官方最佳实践的引用
改进了示例，展示了正确的技能引用格式
v3.0.1 (2025-10-16)
更改
我们现在使用 Anthropic 的自有技能系统！

v2.0.2 (2025-10-12)
Bug Fixes
修复当本地技能仓库领先于上游仓库时的错误警告 - 当本地仓库有提交领先于上游仓库时，初始化脚本错误地警告 "上游有新的技能可用"。现在逻辑正确地区分了三种 git 状态：本地落后（应更新）、本地领先（不警告）、以及分支分离（应警告）。
v2.0.1 (2025-10-12)
Bug Fixes
修复了插件上下文中会话启动钩子的执行 (#8, PR #9) - 该钩子之前在出现 "Plugin hook error" 错误时会静默失败，导致技能上下文无法加载。修复方式：
使用 ${BASH_SOURCE[0]:-$0} 作为回退方案，当 Claude Code 的执行上下文中 BASH_SOURCE 未绑定时
添加 || true 以在过滤状态标志时优雅地处理空的 grep 结果
超级能力 v2.0.0 发布说明
概述
Superpowers v2.0 通过一次重大的架构调整，使技能更加易于访问、维护和社区驱动。

主要的变更包括 技能仓库分离 ：所有技能、脚本和文档都已从插件迁移到一个专用仓库 (obra/superpowers-skills)。这将 superpowers 从一个单体插件转变为一个轻量级的 shim，用于管理技能仓库的本地克隆。技能会在会话启动时自动更新。用户可以通过标准的 git 工作流程进行分支和贡献改进。技能库的版本与插件独立。

除了基础设施的改进，此次发布还新增了九个专注于问题解决、研究和架构的技能。我们以命令式语气并采用更清晰的结构重写了核心 使用技能 的文档，使 Claude 更容易理解何时以及如何使用技能。 查找技能 现在会输出可以直接粘贴到 Read 工具中的路径，从而消除技能发现流程中的摩擦。

用户享受无缝操作体验：插件会自动处理克隆、分叉和更新。贡献者发现新的架构使改进和分享技能变得非常简单。此次发布为技能作为社区资源快速演进奠定了基础。

重大变更
技能仓库分离
最大的变化： 技能不再位于插件中，已被移至独立的仓库 obra/superpowers-skills。

这对你意味着：

首次安装： 插件会自动将技能克隆到 ~/.config/superpowers/skills/
分叉： 在设置过程中，如果你安装了 gh，将提供分叉技能仓库的选项
更新： 技能在会话启动时自动更新（尽可能快进）
贡献： 在分支上工作，本地提交，向上游提交 PR
不再需要影子分支： 旧的双层系统（个人/核心）被替换为单仓库分支工作流
迁移:

如果你已有现有安装：

你旧的 ~/.config/superpowers/.git 将会被备份到 ~/.config/superpowers/.git.bak
旧的技能将被备份到 ~/.config/superpowers/skills.bak
将会在 ~/.config/superpowers/skills/ 处创建 obra/superpowers-skills 的新鲜克隆
移除的功能
个人超能力叠加系统 - 替换为 git 分支工作流程
setup-personal-superpowers hook - 已被 initialize-skills.sh 替代
新功能
技能仓库基础设施
自动克隆 & 设置 (lib/initialize-skills.sh)

首次运行时克隆 obra/superpowers-skills
提供创建分支的功能，如果已安装 GitHub CLI
正确设置 upstream/origin 远程仓库
处理从旧安装的迁移
自动更新

每次会话启动时从跟踪远程获取
在可能的情况下自动快进合并
当需要手动同步（分支已分离）时通知
使用从技能仓库拉取更新的技能进行手动同步
新技能
问题解决技能 (skills/problem-solving/)

碰撞区思考 - 将不相关的概念强行结合以产生新的洞见
反向练习 - 反转假设以揭示隐藏的限制
meta-pattern-recognition - 发现跨领域的普遍原则
scale-game - 在极端情况下测试以揭示基本真理
simplification-cascades - 寻找能消除多个组件的洞察
when-stuck - 调用合适的解决问题技巧
研究技能 (skills/research/)

tracing-knowledge-lineages - 理解想法随时间的演变过程
架构技能 (skills/architecture/)

preserving-productive-tensions - 保持多种有效的途径，而不是过早地强行解决
技能改进
使用技能（原为入门指南）

从入门指南更名为使用技能
以命令式语气进行全面重写（v4.0.0）
前置关键规则
为所有工作流添加了“为什么”解释
在引用中始终包含 /SKILL.md 后缀
更清晰地区分刚性规则和灵活模式
writing-skills

交叉引用指导从使用技能部分移除
新增了令牌效率章节（字数目标）
改进的 CSO（Claude 搜索优化）指南
sharing-skills

更新以适应新的分支和 PR 工作流程（v2.0.0）
移除了个人/核心拆分的引用
pulling-updates-from-skills-repository (新)

与上游同步的完整工作流程
替代旧的 "updating-skills" 技能
工具改进
find-skills

现在输出带有 /SKILL.md 后缀的完整路径
使路径可以直接用于 Read 工具
更新了帮助文本
技能-运行

从 scripts/移动到 skills/using-skills/
改进了文档
插件架构
会话开始钩子

现在从技能仓库位置加载
在会话开始时显示完整的技能列表
打印技能位置信息
显示更新状态（更新成功 / 落后于上游）
将“skills behind”警告信息移到输出末尾
环境变量

SUPERPOWERS_SKILLS_ROOT 设置为 ~/.config/superpowers/skills
始终如一地应用于所有路径
错误修复
修复在分叉时重复添加上游远程仓库的问题
修复 find-skills 输出中双"skills/"前缀的问题
从 session-start 中移除了过时的 setup-personal-superpowers 调用
固定了钩子和命令中的路径引用
文档
README
已更新以适应新的技能仓库架构
链接到超能力-技能仓库
更新了自动更新描述
修复了技能名称和引用
更新了元技能列表
测试文档
新增全面的测试检查清单 (docs/TESTING-CHECKLIST.md)
创建了用于测试的本地市场配置
文档了手动测试场景
技术细节
文件更改
新增：

lib/initialize-skills.sh - 技能仓库初始化和自动更新
docs/TESTING-CHECKLIST.md - 手动测试场景
.claude-plugin/marketplace.json - 本地测试配置
已移除：

skills/ 目录（82 个文件） - 现在在 obra/superpowers-skills 中
scripts/ 目录 - 现在在 obra/superpowers-skills/skills/using-skills/
hooks/setup-personal-superpowers.sh - 废弃
修改：

hooks/session-start.sh - 使用 ~/.config/superpowers/skills 中的技能
commands/brainstorm.md - 更新路径至 SUPERPOWERS_SKILLS_ROOT
commands/write-plan.md - 更新路径至 SUPERPOWERS_SKILLS_ROOT
commands/execute-plan.md - 更新路径至 SUPERPOWERS_SKILLS_ROOT
README.md - 为新架构进行完整重写
提交历史
本次发布包括:

20+ 次提交用于技能仓库的分离
PR #1: 受放大器启发的问题解决与研究技能
PR #2: 个人超能力叠加系统（后被替换）
多项技能优化和文档改进
升级说明
全新安装
# In Claude Code
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
插件会自动处理所有操作。

从 v1.x 升级
备份您的个人技能 （如有）：

cp -r ~/.config/superpowers/skills ~/superpowers-skills-backup
更新插件：

/plugin update superpowers
下次会话启动时：

旧安装将会自动备份
新的技能仓库将被克隆
如果你有 GitHub CLI，你将被提供一个分叉选项
迁移个人技能 （如果你之前有任何）：

在你本地的技能仓库中创建一个分支
从备份中复制你的个人技能
提交并推送到你的 fork
考虑通过 PR 回馈贡献
下一步
对于用户
探索新的问题解决技能
尝试基于分支的工作流程来提升技能
贡献技能回馈社区
致贡献者
技能仓库现已位于 https://github.com/obra/superpowers-skills
Fork → Branch → PR 工作流程
参见 skills/meta/writing-skills/SKILL.md 了解文档的 TDD 方法
已知问题
目前没有。

致谢
问题解决技能灵感来源于 Amplifier 模式
社区贡献和反馈
对技能效果进行广泛测试和迭代
