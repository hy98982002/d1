/**
 * Rule: TASK_DIR_STRUCTURE_REQUIRED
 *
 * Enforces planning-with-files task directory structure.
 *
 * Each directory under:
 *   docs/ai/tasks/<task-name>/
 * MUST contain:
 *   - task_plan.md
 *   - notes.md
 *   - deliverable.md
 *
 * Severity: ERROR (fail-fast)
 */

const path = require('path');
const fs = require('fs');

module.exports = {
  check(file) {
    const results = [];
    const filePath = file.path;
    
    // Normalize to posix-style paths for consistent checking
    const normalizedPath = filePath.replace(/\\/g, '/');
    
    // Check if this file is under docs/ai/tasks/
    if (!normalizedPath.includes('docs/ai/tasks/')) {
      return null;
    }
    
    // Extract task directory path (docs/ai/tasks/<task-name>/)
    const parts = normalizedPath.split('/');
    const tasksIndex = parts.indexOf('tasks');
    
    if (tasksIndex === -1 || parts.length < tasksIndex + 2) {
      return null;
    }
    
    const taskDirParts = parts.slice(0, tasksIndex + 2);
    const taskDir = taskDirParts.join('/');
    
    // Check if all required files exist in the task directory
    const requiredFiles = [
      'task_plan.md',
      'notes.md',
      'deliverable.md'
    ];
    
    const missing = [];
    
    for (const fileName of requiredFiles) {
      const fullPath = path.join(taskDir, fileName);
      if (!fs.existsSync(fullPath)) {
        missing.push(fileName);
      }
    }
    
    if (missing.length > 0) {
      results.push({
        level: 'ERROR',
        file: taskDir,
        message: `Task directory structure violation. Each task directory MUST contain: task_plan.md, notes.md, deliverable.md. Missing in "${taskDir}": ${missing.join(', ')}`
      });
    }
    
    return results.length > 0 ? results : null;
  }
};
