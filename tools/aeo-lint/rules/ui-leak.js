module.exports = {
  check(file) {
    const results = [];
    const content = file.content;
    
    // 检查JSON-LD中是否包含UI状态
    if (/"(stage|tab|filter)"\s*:/i.test(content) && content.includes('@context')) {
      results.push({
        level: 'ERROR',
        file: file.path,
        message: 'UI state (stage/tab/filter) must not appear inside JSON-LD.'
      });
    }
    
    // 检查canonical是否指向带query的URL
    if (/rel="canonical"[^>]*href="[^"]*\?/i.test(content)) {
      results.push({
        level: 'ERROR',
        file: file.path,
        message: 'canonical URL must not contain query parameters.'
      });
    }
    
    return results.length > 0 ? results : null;
  }
};