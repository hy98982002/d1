超能力
Superpowers 是一个完整的软件开发流程，专为你的编码代理设计，它建立在一组可组合的“技能”之上，并结合一些初始指令，确保你的代理能够正确使用这些技能。

它是如何运作的
它从你启动编码代理的那一刻开始。一旦它发现你正在构建某物，它不会立即跳入尝试编写代码的阶段。相反，它会后退一步，询问你真正想要完成什么。

一旦它从对话中提取出一个规范，它会分块展示给你，这些块足够短，可以真正阅读和理解。

在你确认设计后，你的代理会制定一个实施计划，即使是缺乏品味、没有判断力、不了解项目背景且讨厌测试的热衷初级工程师也能轻松跟随。它强调真正的红/绿 TDD，YAGNI（你不会需要它）和 DRY。

接下来，一旦你说“开始”，它就会启动一个 subagent-driven-development 过程，让代理们依次处理每个工程任务，检查并评审他们的工作，然后继续前进。Claude 有时能够连续自主工作几个小时而不会偏离你制定的计划。

还有更多内容，但这就是系统的精髓。而且因为技能会自动触发，你不需要做任何特别的事情。你的编码代理本身就拥有超能力。

赞助
如果 Superpowers 帮助你完成了能赚钱的事情，并且你愿意，我非常感谢你考虑 赞助我的开源工作 。

谢谢！

杰西
安装
注意： 安装方式因平台而异。Claude Code 内置了插件系统。Codex 和 OpenCode 需要手动设置。

Claude Code（通过插件市场）
在 Claude Code 中，首先注册市场：

/plugin marketplace add obra/superpowers-marketplace
然后从这个市场安装插件：

/plugin install superpowers@superpowers-marketplace
验证安装
检查命令是否显示：

/help
# Should see:
# /superpowers:brainstorm - Interactive design refinement
# /superpowers:write-plan - Create implementation plan
# /superpowers:execute-plan - Execute plan in batches
Codex
告诉 Codex:

Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.codex/INSTALL.md
详细文档:docs/README.codex.md

OpenCode
告诉 OpenCode:

Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
详细文档：docs/README.opencode.md

基本工作流程
头脑风暴 - 在编写代码前激活。通过提问完善初步想法，探索替代方案，分部分呈现设计以进行验证。保存设计文档。

使用 git worktrees - 在设计批准后激活。在新分支上创建隔离的工作空间，运行项目设置，验证干净的测试基准。

写作计划 - 在设计获得批准后激活。将工作分解为小任务（每个任务 2-5 分钟）。每个任务都有确切的文件路径、完整代码和验证步骤。

子代理驱动开发 或 执行计划 - 通过计划激活。每个任务派发新的子代理进行两阶段审核（规格符合性，然后代码质量），或批量执行并设置人工检查点。

test-driven-development - 在实现过程中激活。强制执行 RED-GREEN-REFACTOR：编写失败的测试，观察其失败，编写最小化代码，观察其通过，提交。删除测试之前的代码。

requesting-code-review - 在任务之间激活。根据计划进行审查，按严重程度报告问题。严重问题会阻塞进度。

finishing-a-development-branch - 在任务完成时激活。验证测试，提供选项（合并/PR/保留/丢弃），清理工作树。

代理在执行任何任务前会检查相关技能。强制性工作流程，而非建议。

里面有什么
技能库
测试

测试驱动开发 - RED-GREEN-REFACTOR 循环（包含测试反模式参考）
调试

系统化调试 - 4 阶段根本原因分析流程（包括根本原因追踪、纵深防御、基于条件的等待技术）
verification-before-completion - 确保问题确实已解决
协作

头脑风暴 - 苏格拉底式设计优化
写作计划 - 详细实施计划
执行计划 - 批量执行带检查点
dispatching-parallel-agents - 并行子代理工作流程
requesting-code-review - 预审检查清单
receiving-code-review - 回应反馈
使用 Git 工作树 - 平行开发分支
finishing-a-development-branch - 合并/PR 决策工作流程
subagent-driven-development - 快速迭代，采用两阶段评审（规格符合性，然后代码质量）
元数据

写作技能 - 按照最佳实践创建新技能（包括测试方法）
使用超能力 - 技能系统简介
哲学
测试驱动开发 - 先写测试，始终
系统化胜过临时应对 - 过程胜过猜测
复杂度降低 - 简单性为首要目标
以证据为准 - 在宣称成功前先进行验证
查看更多： Superpowers for Claude Code

贡献
技能直接存储在此仓库中。贡献方式：

克隆仓库
为你技能创建一个分支
关注 writing-skills 技能以创建和测试新技能
提交一个 PR
见 skills/writing-skills/SKILL.md 获取完整指南。

更新中
技能会在你更新插件时自动更新：

/plugin update superpowers
许可协议
MIT 许可证 - 详情请参见 LICENSE 文件

支持
Issues： https://github.com/obra/superpowers/issues
Marketplace： https://github.com/obra/superpowers-marketplace