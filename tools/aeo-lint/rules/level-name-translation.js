const path = require('path');

// 中文 Level 翻译（禁止作为实体）
const CHINESE_LEVELS = [
  '入门',
  '初级',
  '进阶',
  '中级',
  '高级',
  '高阶'
];

// Level 实体锚点（必须同时出现，才算 AEO 语境）
const ENTITY_ANCHOR = /(Beginner|Intermediate|Advanced|\/levels\/|educationalLevel)/;

// 紧邻语境（不跨行、不跨段）
const LEVEL_CONTEXT_REGEX = new RegExp(
  `(${CHINESE_LEVELS.join('|')})\\s*(阶段|级别|等级)|` +
  `(阶段|级别|等级)\\s*(${CHINESE_LEVELS.join('|')})`
);

// 允许的非实体描述（白名单）
const ALLOWED_DESCRIPTIVE = [
  '能力进阶',
  '进阶能力',
  '高级功能',
  '高级特性'
];

module.exports = function levelNameTranslationRule(content, filePath) {
  const errors = [];

  // 只检查可读文本文件
  const ext = path.extname(filePath);
  if (!['.md', '.vue', '.js', '.ts', '.jsx', '.tsx'].includes(ext)) {
    return errors;
  }

  // 必须先出现实体锚点，否则不认为是 AEO 违规
  if (!ENTITY_ANCHOR.test(content)) {
    return errors;
  }

  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // 白名单跳过
    if (ALLOWED_DESCRIPTIVE.some(p => line.includes(p))) return;

    if (LEVEL_CONTEXT_REGEX.test(line)) {
      errors.push(
        `Line ${index + 1}: Level 实体名不可翻译。` +
        `请使用英文 Beginner / Intermediate / Advanced 作为实体引用。`
      );
    }
  });

  return errors;
};
