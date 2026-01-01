module.exports = {
  check(file) {
    const results = [];
    const content = file.content;
    
    // 1. 检查 Course 是否使用 hasPart
    if (content.includes('"@type"\s*:\s*"Course"') && content.includes('hasPart')) {
      results.push({
        level: 'ERROR',
        file: file.path,
        message: 'Course must not use hasPart. Ordering is Program-only.'
      });
    }
    
    // 2. 检查 Topic/Tag 是否使用 hasPart 与 Course
    if (/(Topic|Tag).*hasPart.*Course|hasPart.*Course.*(Topic|Tag)/i.test(content)) {
      results.push({
        level: 'ERROR',
        file: file.path,
        message: 'Topic/Tag must not use hasPart with Course.'
      });
    }
    
    // 3. 检查 hasPart 和 isPartOf 关系是否正确
    // 这里使用一个更简单的检查：确保 hasPart 出现在 Program 上下文中
    if (content.includes('hasPart') && !content.includes('"@type"\s*:\s*"(Program|EducationalOccupationalProgram)"')) {
      results.push({
        level: 'ERROR',
        file: file.path,
        message: 'hasPart is only allowed in Program context.'
      });
    }
    
    return results.length > 0 ? results : null;
  }
};