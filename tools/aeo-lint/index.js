#!/usr/bin/env node
const { scanFiles } = require('./scan');
const { report } = require('./utils/report');

// 获取目标目录
const targetDir = process.argv[2] || 'src';

// 加载所有规则
const rules = [
  require('./rules/level-name-translation'),
  require('./rules/level-url'),
  require('./rules/jsonld-level'),
  require('./rules/level-centrality'),
  require('./rules/program-course'),
  require('./rules/course-atomic'),
  require('./rules/ui-leak'),
  require('./rules/level-id-stability'),
  require('./rules/topic-program'),
  require('./rules/no-entity-id-in-hreflang'),
  require('./rules/no-entity-id-in-page-metadata'),
  require('./rules/entity-namespace-not-indexable')
];

// 执行扫描
const files = scanFiles(targetDir);

// 检查文件
const results = [];

for (const file of files) {
  for (const rule of rules) {
    const result = rule.check(file);
    if (result) {
      // 支持返回单个结果或结果数组
      if (Array.isArray(result)) {
        results.push(...result);
      } else {
        results.push(result);
      }
    }
  }
}

// 输出结果
report(results);