module.exports = {
  check(file) {
    const results = [];
    const content = file.content;
    const path = file.path;
    
    // 只检测 Skill 相关文件
    if (path.includes('/skills/')) {
      // 1. 检测 Skill 页面 Course 枚举
      // 检查是否包含 /course/ 链接作为学习步骤
      if (/\/course\//.test(content)) {
        // 检查是否是允许的例外情况
        const allowedExceptions = [
          /if you lack .* start with/i,
          /prerequisite.*course/i,
          /foundational.*course/i
        ];
        
        let isException = false;
        for (const exception of allowedExceptions) {
          if (exception.test(content)) {
            // 检查是否形成列表或顺序
            if (!/(\n|\r|\*|\-|\d+\.)\s*\/course\//.test(content)) {
              isException = true;
              break;
            }
          }
        }
        
        if (!isException) {
          results.push({
            level: 'ERROR',
            file: path,
            message: 'Skill ≠ Curriculum 语义越权: Skill 页面不得枚举 Courses 作为学习内容 '
          });
        }
      }
      
      // 检查是否包含 CourseCard / CourseList 等组件引用
      if (/CourseCard|CourseList/.test(content)) {
        results.push({
          level: 'ERROR',
          file: path,
          message: 'Skill ≠ Curriculum 语义越权: Skill 页面不得使用 CourseCard / CourseList 组件 '
        });
      }
      
      // 2. 检测 Skill "包含 Program" 语义
      const programInclusionPatterns = [
        /this skill includes/i,
        /this skill consists of/i,
        /包含以下 program/i
      ];
      
      for (const pattern of programInclusionPatterns) {
        if (pattern.test(content)) {
          results.push({
            level: 'ERROR',
            file: path,
            message: 'Skill ≠ Program 容器: Skill 不得包含或拥有 Programs '
          });
          break;
        }
      }
    }
    
    return results.length > 0 ? results : null;
  }
};
