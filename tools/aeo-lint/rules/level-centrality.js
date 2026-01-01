module.exports = {
  check(file) {
    const results = [];
    const content = file.content;
    
    // 1. 检查Level页面是否被其他重要页面链接
    // 对于Level页面文件，检查是否有被首页、program或guide页面链接的证据
    if (file.path.includes('/levels/') && /(beginner|intermediate|advanced)/.test(file.path)) {
      // 检查文件内容是否包含被其他页面链接的证据
      // 这里使用简化检查：确保Level页面中包含足够的内部链接或被引用
      const levelType = file.path.match(/levels\/(beginner|intermediate|advanced)/)[1];
      
      // 检查是否有从其他页面链接到该Level的证据
      // 由于我们是静态扫描单个文件，这里采用简化方法：检查是否有指向该Level的链接
      const levelLinkPattern = new RegExp(`href="[^"]*levels/${levelType}[^"]*"|src="[^"]*levels/${levelType}[^"]*"`, 'g');
      const linkMatches = content.match(levelLinkPattern);
      
      // 检查是否有足够的内部链接
      if (!linkMatches || linkMatches.length < 1) {
        results.push({
          level: 'WARN',
          file: file.path,
          message: `Level page ${levelType} may have low centrality. Ensure it is linked from at least one non-course page (home/program/guide).`
        });
      }
    }
    
    // 2. 检查重要页面是否链接到Level页面
    // 检查首页、program或guide页面是否链接到所有Level
    if (file.path.includes('/home/') || file.path.includes('/program/') || file.path.includes('/guide/')) {
      const levelTypes = ['beginner', 'intermediate', 'advanced'];
      for (const levelType of levelTypes) {
        if (!new RegExp(`levels/${levelType}`, 'i').test(content)) {
          results.push({
            level: 'WARN',
            file: file.path,
            message: `Important page should link to ${levelType} Level page to maintain Level centrality.`
          });
        }
      }
    }
    
    return results.length > 0 ? results : null;
  }
};