module.exports = {
  check(file) {
    const results = [];
    
    // 检查 ?stage= 或 #stage
    if (/stage=|#stage/.test(file.content)) {
      results.push({
        level: 'ERROR',
        file: file.path,
        message: 'Level must not be represented by query/hash (?stage= / #stage).'
      });
    }
    
    // 检查无效 Level URL
    if (/\/levels\/(?!beginner|intermediate|advanced)\w+/.test(file.content)) {
      results.push({
        level: 'ERROR',
        file: file.path,
        message: 'Invalid Level URL. Only /levels/{beginner|intermediate|advanced} allowed.'
      });
    }
    
    return results.length > 0 ? results : null;
  }
};