# Test Level Lint Rules

## Valid Usage

This is a valid usage: Beginner level course
This is also valid: Intermediate level course
This is allowed: 能力进阶
This is allowed: 进阶学习
This is allowed: 高级功能

## Invalid Usage (should be flagged)

This should be flagged: 初级阶段课程 Beginner
This should be flagged: 入门级别课程 Advanced
This should be flagged: Level 初级课程
This should be flagged: 高级等级课程 /levels/
This should be flagged: 进阶阶段课程 educationalLevel

## Normal Chinese Text (should not be flagged)

学习过程分为三个阶段：
- 入门阶段
- 进阶阶段
- 深度实践阶段

这是一段普通中文文案，包含进阶和高级等词汇，不应该被标记为错误。
能力进阶是一个正常的中文词汇，应该被允许。
高级功能是一个正常的中文词汇，应该被允许。
