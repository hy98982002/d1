module.exports = {
  check(file) {
    const results = [];
    
    // 只检查包含 educationalLevel 的文件
    if (!file.content.includes('educationalLevel')) {
      return null;
    }
    
    // 检查 educationalLevel 是否为字符串
    if (/educationalLevel\s*:\s*"/.test(file.content)) {
      results.push({
        level: 'ERROR',
        file: file.path,
        message: 'educationalLevel must not be a string. Use DefinedTerm with @id.'
      });
    }
    
    // 检查 educationalLevel.@id 是否指向 /levels/*
    if (/educationalLevel/.test(file.content) && 
        !/\/levels\/(beginner|intermediate|advanced)/.test(file.content)) {
      results.push({
        level: 'ERROR',
        file: file.path,
        message: 'educationalLevel.@id must point to /levels/* canonical URL.'
      });
    }
    
    return results.length > 0 ? results : null;
  }
};