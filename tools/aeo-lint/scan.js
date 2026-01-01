const fs = require('fs');
const path = require('path');

function scanFiles(dir, files = []) {
  const excludeDirs = ['node_modules', 'dist', 'build', '.git'];
  
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    
    // 跳过排除目录
    if (stat.isDirectory() && excludeDirs.includes(entry)) {
      continue;
    }
    
    if (stat.isDirectory()) {
      scanFiles(fullPath, files);
    } else if (/(vue|ts|js|json|md)$/.test(entry)) {
      files.push({
        path: fullPath,
        content: fs.readFileSync(fullPath, 'utf8')
      });
    }
  }
  
  return files;
}

module.exports = { scanFiles };