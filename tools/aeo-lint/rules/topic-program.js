module.exports = {
  check(file) {
    const results = [];
    const content = file.content;
    
    // 1. 检查Topic/Tag是否isPartOf Program
    if (/"@type"\s*:\s*"(Topic|Tag)"/i.test(content) && content.includes('isPartOf.*Program|Program.*isPartOf')) {
      results.push({
        level: 'ERROR',
        file: file.path,
        message: 'Topic/Tag must not use isPartOf with Program. They are separate semantic entities.'
      });
    }
    
    // 2. 检查Program是否isPartOf Topic/Tag
    if (/"@type"\s*:\s*"(Program|EducationalOccupationalProgram)"/i.test(content) && content.includes('isPartOf.*(Topic|Tag)|(Topic|Tag).*isPartOf')) {
      results.push({
        level: 'ERROR',
        file: file.path,
        message: 'Program must not use isPartOf with Topic/Tag. They are separate semantic entities.'
      });
    }
    
    // 3. 检查Topic/Tag是否包含Program相关内容
    // 这里使用简单的检查：确保Topic/Tag不包含Program特有的属性
    if (/"@type"\s*:\s*"(Topic|Tag)"/i.test(content) && /(hasPart|educationalLevel|learningOutcome|offers)/i.test(content)) {
      results.push({
        level: 'ERROR',
        file: file.path,
        message: 'Topic/Tag must not contain Program-specific properties like hasPart, educationalLevel, learningOutcome, or offers.'
      });
    }
    
    return results.length > 0 ? results : null;
  }
};