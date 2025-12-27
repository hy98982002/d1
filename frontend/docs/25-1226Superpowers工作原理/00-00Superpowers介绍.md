您提供的GitHub仓库地址是 [GitHub - obra/superpowers: Claude Code superpowers: core skills library](https://github.com/obra/superpowers)。这个仓库是关于一个名为Superpowers的软件开发工作流，它基于一系列可组合的“技能”和一些初始指令，以确保您的编码代理能够使用它们。
/plugin update superpowers##升级插件
Superpowers的核心工作流程包括：
1. **brainstorming**：在编写代码之前激活，通过提问细化粗略想法，探索替代方案，并分部分展示设计以供验证。
2. **using-git-worktrees**：在设计批准后激活，创建隔离的工作空间，在新分支上运行项目设置，并验证干净的测试基线。
3. **writing-plans**：在设计批准后激活，将工作分解为小任务（每个任务2-5分钟），每个任务都有确切的文件路径、完整代码和验证步骤。
4. **subagent-driven-development** 或 **executing-plans**：在计划批准后激活，为每个任务分派新的子代理，并进行两阶段审查（规格符合性，然后是代码质量），或者以批量执行并有人为检查点。
5. **test-driven-development**：在实施过程中激活，执行RED-GREEN-REFACTOR：编写失败的测试，观察它失败，编写最小代码，观察它通过，提交。删除在编写测试之前编写的代码。
6. **requesting-code-review**：在任务之间激活，根据计划进行审查，按严重程度报告问题。关键问题会阻止进度。
7. **finishing-a-development-branch**：在任务完成后激活，验证测试，提供选项（合并/PR/保留/丢弃），清理工作树。

此外，该仓库还包含了一个技能库，涵盖了测试、调试、协作和元技能等方面。

如果您对这个项目感兴趣，可以访问上述链接以获取更多详细信息，包括安装指南、如何贡献以及更新技能等。