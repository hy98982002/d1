/**
 * Rule: TASK_PLANNING_FILES_REQUIRED
 *
 * When a task directory exists under docs/ai/tasks/,
 * task_plan.md and notes.md MUST exist alongside deliverable.md.
 *
 * Severity: ERROR
 */

module.exports = {
  check(file) {
    // This rule requires access to all files, so we'll handle it in checkGlobal
    return null;
  },
  
  checkGlobal(files) {
    const results = [];
    
    // Create a map of task directories to their files
    const taskDirMap = new Map();
    
    // First pass: collect all task files
    for (const file of files) {
      const normalizedPath = file.path.replace(/\\/g, '/');
      
      if (normalizedPath.startsWith('docs/ai/tasks/')) {
        const parts = normalizedPath.split('/');
        const taskDir = parts.slice(0, -1).join('/');
        
        if (!taskDirMap.has(taskDir)) {
          taskDirMap.set(taskDir, []);
        }
        
        taskDirMap.get(taskDir).push(normalizedPath);
      }
    }
    
    // Second pass: check each task directory for required files
    for (const [taskDir, dirFiles] of taskDirMap.entries()) {
      // Check if this directory has a deliverable.md
      const hasDeliverable = dirFiles.some(file => file.endsWith('/deliverable.md'));
      
      if (hasDeliverable) {
        const requiredFiles = [
          `${taskDir}/task_plan.md`,
          `${taskDir}/notes.md`
        ];
        
        const missing = [];
        
        for (const requiredFile of requiredFiles) {
          if (!dirFiles.includes(requiredFile)) {
            missing.push(requiredFile.split('/').pop());
          }
        }
        
        if (missing.length > 0) {
          // Find the deliverable.md path to use in the error message
          const deliverablePath = dirFiles.find(file => file.endsWith('/deliverable.md'));
          
          results.push({
            level: 'ERROR',
            file: deliverablePath,
            message: `Task planning files missing. A task deliverable MUST be accompanied by task_plan.md and notes.md. Missing: ${missing.join(', ')}.`
          });
        }
      }
    }
    
    return results;
  }
};
