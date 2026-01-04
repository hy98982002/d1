module.exports = {
  check(file) {
    const results = [];
    const content = file.content;
    const path = file.path;
    
    // 检测 store 相关文件
    if (/store|Store/.test(path) || /store|Store/.test(content)) {
      // 检测特定的文本模式
      const forbiddenPatterns = [
        /course belongs to program/i,
        /program owns courses/i,
        /stage is part of course/i,
        /because they are in the same store/i,
        /courseStore manages everything/i
      ];
      
      for (const pattern of forbiddenPatterns) {
        if (pattern.test(content)) {
          results.push({
            level: 'WARN',
            file: path,
            message: 'Store co-location does not imply semantic ownership' 
          });
          break;
        }
      }
    }
    
    return results.length > 0 ? results : null;
  }
};
