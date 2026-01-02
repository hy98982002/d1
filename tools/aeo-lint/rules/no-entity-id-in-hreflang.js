module.exports = {
  check(file) {
    const results = [];
    const content = file.content;
    
    // 正则表达式匹配所有的<link rel="alternate" hreflang="...">元素
    const hreflangRegex = /<link\s+[^>]*rel=["']alternate["'][^>]*hreflang=["'][^"']*["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
    let match;
    
    while ((match = hreflangRegex.exec(content)) !== null) {
      const href = match[1];
      
      // 检查href是否包含/_entity/路径
      if (href.includes('/_entity/')) {
        results.push({
          level: 'ERROR',
          file: file.path,
          message: 'Entity @id MUST NOT be used in hreflang. hreflang MUST reference page URLs only. Found: ' + href
        });
      }
    }
    
    // 也检查xhtml:link rel="alternate" hreflang="...">元素
    const xhtmlHreflangRegex = /<xhtml:link\s+[^>]*rel=["']alternate["'][^>]*hreflang=["'][^"']*["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
    
    while ((match = xhtmlHreflangRegex.exec(content)) !== null) {
      const href = match[1];
      
      // 检查href是否包含/_entity/路径
      if (href.includes('/_entity/')) {
        results.push({
          level: 'ERROR',
          file: file.path,
          message: 'Entity @id MUST NOT be used in hreflang. hreflang MUST reference page URLs only. Found: ' + href
        });
      }
    }
    
    return results.length > 0 ? results : null;
  }
};