#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ===== 基础配置 =====
const TARGET_EXTENSIONS = ['.md', '.vue', '.js', '.ts', '.jsx', '.tsx'];
const RULES_DIR = path.join(__dirname, 'rules');

// ===== 加载所有规则 =====
const rules = fs
  .readdirSync(RULES_DIR)
  .filter(f => f.endsWith('.js'))
  .map(f => require(path.join(RULES_DIR, f)));

// ===== 工具函数 =====
function collectFiles(entryPath, collected = []) {
  if (!fs.existsSync(entryPath)) return collected;

  const stat = fs.statSync(entryPath);

  if (stat.isFile()) {
    if (TARGET_EXTENSIONS.includes(path.extname(entryPath))) {
      collected.push(entryPath);
    }
    return collected;
  }

  if (stat.isDirectory()) {
    const children = fs.readdirSync(entryPath);
    for (const child of children) {
      collectFiles(path.join(entryPath, child), collected);
    }
  }

  return collected;
}

// ===== 主执行 =====
const input = process.argv[2];

if (!input) {
  console.error('Usage: aeo-lint <file|directory>');
  process.exit(1);
}

const files = collectFiles(path.resolve(input));
let hasError = false;

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf-8');

  for (const rule of rules) {
    const errors = rule(content, filePath) || [];
    if (errors.length > 0) {
      hasError = true;
      errors.forEach(err => {
        console.error(`\n[AEO-LINT][ERROR] ${filePath}`);
        console.error(`→ ${err}`);
      });
    }
  }
}

if (hasError) {
  process.exit(1);
}

process.exit(0);
