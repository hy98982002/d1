/**
 * Rule: DELIVERABLE_MUST_BE_ATOMIC
 *
 * A task deliverable MUST be atomic and historically isolated.
 * deliverable.md MUST NOT reference or embed other task deliverables.
 *
 * Severity: ERROR (fail-fast)
 */

module.exports = {
  check(file) {
    const results = [];
    const filePath = file.path;
    const content = file.content;
    
    // Only inspect deliverable.md files under docs/ai/tasks/
    const normalizedPath = filePath.replace(/\\/g, '/');
    if (!(normalizedPath.startsWith('docs/ai/tasks/') && normalizedPath.endsWith('/deliverable.md'))) {
      return null;
    }
    
    const normalizedContent = content.replace(/\\/g, '/');
    
    // ---- Detection Patterns ----
    
    const forbiddenPathPatterns = [
      /docs\/ai\/tasks\/.+\/deliverable\.md/i,
      /\.\.\/.+\/deliverable\.md/i,
    ];
    
    const forbiddenTextPatterns = [
      /previous deliverable/i,
      /see deliverable/i,
      /based on deliverable/i,
      /merged from/i,
      /inherited from/i,
      /continued from/i,
    ];
    
    const violations = [];
    
    for (const pattern of forbiddenPathPatterns) {
      if (pattern.test(normalizedContent)) {
        violations.push(`references another task deliverable (path match)`);
        break;
      }
    }
    
    for (const pattern of forbiddenTextPatterns) {
      if (pattern.test(normalizedContent)) {
        violations.push(`references another task deliverable (semantic match)`);
        break;
      }
    }
    
    // ---- Report ----
    if (violations.length > 0) {
      results.push({
        level: 'ERROR',
        file: filePath,
        message: `Deliverable must be atomic and historically isolated. Violations detected: ${violations.join('; ')}. Deliverables MUST NOT reference or inherit from other task deliverables.`
      });
    }
    
    return results.length > 0 ? results : null;
  }
};
