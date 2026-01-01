module.exports = {
  check(file) {
    const results = [];
    const content = file.content;
    
    // 1. 检查Course是否包含顺序相关词汇
    if (content.includes('"@type"\s*:\s*"Course"')) {
      const orderTerms = ['position', 'step', 'phase', '第.*阶段', '学习顺序', '路径', 'sequence', 'order'];
      for (const term of orderTerms) {
        if (new RegExp(term, 'i').test(content)) {
          // 检查这些词汇是否在Program上下文中使用
          const isInProgramContext = /Program.*(position|step|phase|顺序|路径|sequence|order)|(position|step|phase|顺序|路径|sequence|order).*Program/i.test(content);
          
          if (!isInProgramContext) {
            results.push({
              level: 'WARN',
              file: file.path,
              message: `Course should remain atomic. Avoid using order-related terms (${term}) unless inside a Program context.`
            });
            break;
          }
        }
      }
    }
    
    // 2. 检查Course是否越权定义学习顺序
    if (content.includes('"@type"\s*:\s*"Course"') && /(hasPart|isPartOf).*Course|Course.*(hasPart|isPartOf)/i.test(content)) {
      // 检查是否在Program上下文中使用
      if (!content.includes('Program')) {
        results.push({
          level: 'WARN',
          file: file.path,
          message: 'Course should remain atomic. Avoid defining relationships with other Courses unless in a Program context.'
        });
      }
    }
    
    // 3. 检查Course是否定义了路径或学习顺序
    if (content.includes('"@type"\s*:\s*"Course"') && /(路径|学习顺序|sequence|curriculum|syllabus)/i.test(content)) {
      results.push({
        level: 'WARN',
        file: file.path,
        message: 'Course should remain atomic and focus on its own content, not define learning paths or sequences.'
      });
    }
    
    return results.length > 0 ? results : null;
  }
};