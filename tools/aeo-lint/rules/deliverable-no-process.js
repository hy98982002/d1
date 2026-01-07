/**
 * Rule: DELIVERABLE_NO_PROCESS_CONTENT
 *
 * A deliverable MUST describe final outcomes only.
 * It MUST NOT contain execution process, steps, logs, or reasoning.
 *
 * Severity: WARN (default)
 * (Can be promoted to ERROR later if desired)
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
    
    const text = content.toLowerCase();
    
    // ---- Process / execution indicators ----
    const processIndicators = [
      // step-by-step language
      /step\s+\d+/,
      /first[, ]|second[, ]|third[, ]|then[, ]|finally[, ]/,
      /步骤/,
      /流程/,
      /执行过程/,
      /实现过程/,

      // reasoning / logs
      /we decided/,
      /i decided/,
      /reasoning/,
      /thought process/,
      /analysis/,
      /debug/,
      /log/,
      /trace/,
      /尝试/,
      /调试/,
      /失败/,
      /修改了/,

      // temporal narration
      /initially/,
      /at first/,
      /later/,
      /eventually/,
      /随后/,
      /接着/,
      /最后/,

      // tooling narration
      /ran command/,
      /executed/,
      /npm install/,
      /git commit/,
      /git push/,
    ];
    
    let violationDetected = false;
    
    for (const pattern of processIndicators) {
      if (pattern.test(text)) {
        violationDetected = true;
        break;
      }
    }
    
    if (violationDetected) {
      results.push({
        level: 'WARN',
        file: filePath,
        message: `Deliverable should contain final outcomes only. Process / execution language detected. Move process details to notes.md.`
      });
    }
    
    return results.length > 0 ? results : null;
  }
};
