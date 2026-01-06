为什么要学习这项技能？
2025 年 12 月 29 日， Meta 以 20 亿美元收购了 Manus 。短短 8 个月内，Manus 的营收就从上线增长到超过 1 亿美元。他们的秘诀是什么？ 情境工程 。

这项技能实现了 Manus 的核心工作流程模式：

“Markdown 是我磁盘上的‘工作记忆’。由于我以迭代的方式处理信息，而且我的工作空间有限，Markdown 文件就成了我记录笔记的草稿本、进度检查点和最终交付成果的构建模块。”——Manus AI

问题
Claude Code（以及大多数人工智能代理）存在以下问题：

易失性内存 ——TodoWrite 工具在上下文重置时消失
目标偏移 ——调用工具超过 50 次后，最初的目标就被遗忘了。
隐藏的错误 ——故障未被追踪，因此同样的错误会重复发生。
上下文填充 ——所有内容都被塞进上下文中，而不是单独存储。
解决方案：三文件模式
对于每一项复杂任务，创建三个文件：

task_plan.md      → Track phases and progress
notes.md          → Store research and findings
[deliverable].md  → Final output
环线
1. Create task_plan.md with goal and phases
2. Research → save to notes.md → update task_plan.md
3. Read notes.md → create deliverable → update task_plan.md
4. Deliver final output
关键发现： 通过在每次决策前读取 task_plan.md ，目标始终保持在注意力窗口中。这就是 Manus 能够处理约 50 次工具调用而不丢失跟踪的原因。

安装
方案一：直接克隆（推荐）
# Navigate to your Claude Code skills directory
cd ~/.claude/skills  # or your custom skills path

# Clone this skill
git clone https://github.com/OthmanAdi/planning-with-files.git
方案二：手动安装
下载或复制 planning-with-files 文件夹
将其放入您的 Claude Code 技能目录中：
macOS/Linux： ~/.claude/skills/
Windows： %USERPROFILE%\.claude\skills\
验证安装
在《克劳德密码》中，当你执行以下操作时，该技能将自动激活：

开始复杂任务
提及“计划”、“组织”或“跟踪进度”
要求安排结构化的工作
用法
安装完成后，Claude 将自动执行以下操作：

在开始复杂任务之前创建 task_plan.md
每个阶段结束后，通过复选框更新进度。
将研究结果存储在 notes.md 中，而不是填充上下文。
记录错误以供将来参考
在做出重大决定前， 请重新阅读计划。
例子
你： “研究 TypeScript 的优势并写一份总结”

克劳德创作了：

# Task Plan: TypeScript Benefits Research

## Goal
Create a research summary on TypeScript benefits.

## Phases
- [x] Phase 1: Create plan ✓
- [ ] Phase 2: Research and gather sources (CURRENT)
- [ ] Phase 3: Synthesize findings
- [ ] Phase 4: Deliver summary

## Status
**Currently in Phase 2** - Searching for sources
然后继续执行每个阶段，并随着执行过程更新文件。

《马努斯原则》
这项技能运用了以下关键的上下文工程原理：

原则	执行
文件系统作为内存	存储在文件中，而不是上下文中
注意力操纵	做决定前请重新阅读计划。
错误持续性	记录计划文件中的故障
目标追踪	复选框显示进度
仅追加上下文	永远不要篡改历史
文件结构
planning-with-files/
├── SKILL.md        # Core instructions (what Claude reads)
├── reference.md    # Manus principles deep dive
├── examples.md     # Real usage examples
└── README.md       # This file
何时使用
使用此模式：

多步骤任务（3 个以上步骤）
研究任务
建设/创建项目
涉及多个工具调用的任务
任何需要组织的事情
运送至：

简单问题
单文件编辑
快速查找
致谢
Manus AI—— 感谢他们开创性的上下文工程模式，使这一切成为可能。
人格化 ——致克劳德·科德和智能体技能框架
基于情境工程的人工智能代理
贡献
欢迎投稿！请：

fork 该仓库
创建特性分支
提交拉取请求
执照
MIT 许可证——您可以随意使用、修改和分发。

谢谢
感谢所有点赞、fork 和分享这项技能的朋友们！这个项目在不到 24 小时内就迅速走红，社区的支持令人难以置信。

如果这项技能能帮助你更高效地工作，那我就心满意足了。

---------
#### 这个 Skill 很有意思，用持续更新的 Markdown 来规划、跟进和沉淀知识，参考了 Manus 的实现。

看了这个 skill 之后很受启发：先做规划，但规划不是一次性的，而是在执行过程中持续更新和修正。
这种“持续思考、持续回写”的模式非常符合复杂任务，不过也意味着一次任务会经历很多轮理解和更新，对 token 的消耗会被进一步放大。