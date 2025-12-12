# Advanced课程数据补充计划

## 问题分析
- 当前 `ai-designer-advanced` Program 的 stage 为 'advanced'，但 mockCourses 数组中没有任何课程的 stage 是 'advanced'
- 访问 `/program/ai-designer-advanced` 时会显示空状态提示："该学习路径的课程即将推出，敬请期待！"
- 虽然空状态处理合理，但补充实际课程数据会提升用户体验和SEO效果

## 解决方案
在 `src/store/courseStore.ts` 的 `mockCourses` 数组中添加一些 stage 为 'advanced' 的课程数据

## 实施步骤
1. **添加Advanced课程数据**
   - 在 mockCourses 数组中添加3-5个 stage 为 'advanced' 的课程
   - 确保课程数据结构完整，包括所有必填字段
   - 使用现有的图片资源或添加新的图片资源

2. **验证修改效果**
   - 运行开发服务器，访问 `/program/ai-designer-advanced`
   - 确认页面显示Advanced阶段的课程列表
   - 验证课程卡片正常渲染

## 技术要点
- 保持与现有课程数据结构一致
- 使用正确的stage值：'advanced'
- 确保slug的唯一性
- 课程内容应符合"高阶技能路径"的定位

## 预期效果
- 访问 `/program/ai-designer-advanced` 时显示实际的课程列表
- 提升用户体验，让用户对高阶课程有更清晰的预期
- 改善SEO效果，增加页面内容丰富度
- 不影响SSG迁移，前端逻辑已支持返回空列表