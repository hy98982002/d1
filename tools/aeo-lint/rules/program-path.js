module.exports = {
  check(file) {
    const results = [];
    const content = file.content;
    const path = file.path;
    
    // Program 页面违规检测
    if (path.includes('/programs/')) {
      // 检查 Program 页面是否包含推荐路径相关关键词
      const programPathKeywords = [
        'recommended order',
        'learning plan',
        'study plan',
        'suggested sequence',
        'skill progression',
        'pathway'
      ];
      
      for (const keyword of programPathKeywords) {
        if (new RegExp(keyword, 'i').test(content)) {
          results.push({
            level: 'ERROR',
            file: path,
            message: 'Program ≠ Path 语义越权: Program 页面不得包含推荐路径相关关键词 '
          });
          break;
        }
      }
    }
    
    // Path 结构违规检测
    if (path.includes('/paths/')) {
      // 检查 Path JSON-LD 是否包含 hasPart/isPartOf 指向 Course 或 Program
      if (content.includes('hasPart') || content.includes('isPartOf')) {
        // 检查是否指向 Course 或 Program
        if (/(Course|Program|EducationalOccupationalProgram)/.test(content)) {
          results.push({
            level: 'ERROR',
            file: path,
            message: 'Program ≠ Path 语义越权: Path 不得通过 hasPart/isPartOf 表达教学顺序 '
          });
        }
      }
    }
    
    return results.length > 0 ? results : null;
  }
};
