module.exports = {
  check(file) {
    const results = [];
    const content = file.content;
    
    // 正则表达式匹配所有的页面级元数据元素
    
    // 1. link[rel=canonical]
    const canonicalRegex = /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
    let match;
    
    while ((match = canonicalRegex.exec(content)) !== null) {
      const href = match[1];
      if (href.includes('/_entity/')) {
        results.push({
          level: 'ERROR',
          file: file.path,
          message: 'Entity canonical @id (/_entity/*) MUST NOT appear in page-level metadata. Entity identity and page URLs are separate layers. Found in canonical: ' + href
        });
      }
    }
    
    // 2. link[rel=alternate][hreflang]
    const hreflangRegex = /<link\s+[^>]*rel=["']alternate["'][^>]*hreflang=["'][^"']*["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
    
    while ((match = hreflangRegex.exec(content)) !== null) {
      const href = match[1];
      if (href.includes('/_entity/')) {
        results.push({
          level: 'ERROR',
          file: file.path,
          message: 'Entity canonical @id (/_entity/*) MUST NOT appear in page-level metadata. Entity identity and page URLs are separate layers. Found in hreflang: ' + href
        });
      }
    }
    
    // 3. meta[property=og:url]
    const ogUrlRegex = /<meta\s+[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["'][^>]*>/gi;
    
    while ((match = ogUrlRegex.exec(content)) !== null) {
      const url = match[1];
      if (url.includes('/_entity/')) {
        results.push({
          level: 'ERROR',
          file: file.path,
          message: 'Entity canonical @id (/_entity/*) MUST NOT appear in page-level metadata. Entity identity and page URLs are separate layers. Found in og:url: ' + url
        });
      }
    }
    
    // 4. meta[name=twitter:url]
    const twitterUrlRegex = /<meta\s+[^>]*name=["']twitter:url["'][^>]*content=["']([^"']+)["'][^>]*>/gi;
    
    while ((match = twitterUrlRegex.exec(content)) !== null) {
      const url = match[1];
      if (url.includes('/_entity/')) {
        results.push({
          level: 'ERROR',
          file: file.path,
          message: 'Entity canonical @id (/_entity/*) MUST NOT appear in page-level metadata. Entity identity and page URLs are separate layers. Found in twitter:url: ' + url
        });
      }
    }
    
    return results.length > 0 ? results : null;
  }
};