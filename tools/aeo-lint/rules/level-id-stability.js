module.exports = {
  check(file) {
    const results = [];
    const content = file.content;
    
    // 1. 检查Level @id是否包含语言代码或区域设置
    if (/"@id"\s*:\s*"[^"]*\/(en|zh|zh-CN|zh-TW|ja|ko|fr|es|de)\/[^"]*\/levels\//i.test(content)) {
      results.push({
        level: 'ERROR',
        file: file.path,
        message: 'Level @id must be language-agnostic and stable across all locales.'
      });
    }
    
    // 2. 检查同一Level是否有不同的@id
    // 这里使用简单的检查：确保每个Level类型只对应一个@id格式
    const levelTypes = ['beginner', 'intermediate', 'advanced'];
    for (const levelType of levelTypes) {
      // 查找所有包含该Level类型的@id
      const idMatches = content.match(new RegExp(`"@id"\s*:\s*"([^"]*${levelType}[^"]*)"`, 'g'));
      if (idMatches && idMatches.length > 1) {
        // 检查这些@id是否都相同
        const uniqueIds = new Set(idMatches.map(match => match.replace(/"@id"\s*:\s*"([^"]*)",?/, '$1')));
        if (uniqueIds.size > 1) {
          results.push({
            level: 'ERROR',
            file: file.path,
            message: `Multiple different @ids found for ${levelType} Level. @id must be stable across all contexts.`
          });
        }
      }
    }
    
    // 3. 检查@id是否使用了不稳定元素（如日期、版本号等）
    if (/"@id"\s*:\s*"[^"]*\/levels\/[^"]*(\d{4}|v\d|version|\d+\.\d+)\s*"/i.test(content)) {
      results.push({
        level: 'ERROR',
        file: file.path,
        message: 'Level @id must be stable and not include unstable elements like dates, versions, or numbers.'
      });
    }
    
    return results.length > 0 ? results : null;
  }
};