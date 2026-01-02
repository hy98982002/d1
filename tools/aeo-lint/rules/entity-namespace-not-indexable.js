module.exports = {
  check(file) {
    const results = [];
    const content = file.content;
    
    // 1. 检查HTML页面在/_entity/下是否包含title/description/h1
    // 只禁止HTML内容页面，允许机器可读的实体描述文件
    if (file.path.includes('/_entity/') && /\.(html|vue)$/.test(file.path)) {
      // 检查是否包含title标签
      if (/<title[^>]*>[^<]+<\/title>/i.test(content)) {
        results.push({
          level: 'ERROR',
          file: file.path,
          message: 'The "/_entity/" namespace is semantic identity only. It MUST NOT be treated as an indexable or navigable content page. Found title tag in entity namespace.'
        });
      }
      
      // 检查是否包含description meta标签
      if (/<meta[^>]*name=["']description["'][^>]*content=["'][^"']+["'][^>]*>/i.test(content)) {
        results.push({
          level: 'ERROR',
          file: file.path,
          message: 'The "/_entity/" namespace is semantic identity only. It MUST NOT be treated as an indexable or navigable content page. Found description meta tag in entity namespace.'
        });
      }
      
      // 检查是否包含h1标签
      if (/<h1[^>]*>[^<]+<\/h1>/i.test(content)) {
        results.push({
          level: 'ERROR',
          file: file.path,
          message: 'The "/_entity/" namespace is semantic identity only. It MUST NOT be treated as an indexable or navigable content page. Found h1 tag in entity namespace.'
        });
      }
    }
    
    // 2. 检查/_entity/ URLs是否用作canonical / og:url / sitemap entries
    
    // 检查canonical
    const canonicalRegex = /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
    let match;
    
    while ((match = canonicalRegex.exec(content)) !== null) {
      const href = match[1];
      if (href.includes('/_entity/')) {
        results.push({
          level: 'ERROR',
          file: file.path,
          message: 'The "/_entity/" namespace is semantic identity only. It MUST NOT be treated as an indexable or navigable content page. Found /_entity/ URL in canonical: ' + href
        });
      }
    }
    
    // 检查og:url
    const ogUrlRegex = /<meta\s+[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["'][^>]*>/gi;
    
    while ((match = ogUrlRegex.exec(content)) !== null) {
      const url = match[1];
      if (url.includes('/_entity/')) {
        results.push({
          level: 'ERROR',
          file: file.path,
          message: 'The "/_entity/" namespace is semantic identity only. It MUST NOT be treated as an indexable or navigable content page. Found /_entity/ URL in og:url: ' + url
        });
      }
    }
    
    // 检查sitemap entries
    const sitemapRegex = /<loc[^>]*>[^<]*\/_entity\/[^<]*<\/loc>/i;
    if (sitemapRegex.test(content)) {
      results.push({
        level: 'ERROR',
        file: file.path,
        message: 'The "/_entity/" namespace is semantic identity only. It MUST NOT be treated as an indexable or navigable content page. Found /_entity/ URL in sitemap entry.'
      });
    }
    
    return results.length > 0 ? results : null;
  }
}; // /_entity/ is for semantic identity, not content pages.