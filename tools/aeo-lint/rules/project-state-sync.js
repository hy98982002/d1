/**
 * Rule: PROJECT_STATE_SYNC_REMINDER
 *
 * When a task deliverable exists or changes,
 * CURRENT_STATE.md SHOULD be reviewed and updated if necessary.
 *
 * This rule does NOT enforce content correctness.
 * It only reminds about possible desynchronization.
 *
 * Severity: WARN
 */

const fs = require('fs');
const path = require('path');

module.exports = {
  check(file) {
    // This rule needs to check all files, not just one
    // So we'll return null for individual file checks
    // and handle it at the global level in a separate function
    // Note: This is a special case because this rule needs to compare files
    return null;
  },
  
  // This is a special global rule that runs after all files are scanned
  // We'll implement it differently since the current architecture doesn't support global rules
  // For now, we'll create a simplified version that checks the CURRENT_STATE.md file
  // when it encounters a deliverable.md file
  checkGlobal(files) {
    const results = [];
    
    // 1. Collect all deliverables
    const deliverables = files.filter(file => {
      const normalizedPath = file.path.replace(/\\/g, '/');
      return normalizedPath.startsWith('docs/ai/tasks/') && normalizedPath.endsWith('/deliverable.md');
    });
    
    if (deliverables.length === 0) {
      return results;
    }
    
    // 2. Check if CURRENT_STATE.md exists
    const projectStatePath = path.join(files[0].path.split('/').slice(0, -1).join('/'), 'docs/ai/project_state/CURRENT_STATE.md');
    const projectStateExists = files.some(file => {
      const normalizedPath = file.path.replace(/\\/g, '/');
      return normalizedPath.endsWith('docs/ai/project_state/CURRENT_STATE.md');
    });
    
    if (!projectStateExists) {
      results.push({
        level: 'WARN',
        file: 'docs/ai/tasks/',
        message: `Task deliverables detected, but CURRENT_STATE.md was not found. Ensure project state is explicitly tracked.`
      });
      return results;
    }
    
    // 3. Compare timestamps (heuristic, non-authoritative)
    let stateStat;
    try {
      stateStat = fs.statSync(projectStatePath);
    } catch (err) {
      // If unreadable, do not escalate
      return results;
    }
    
    const stateMtime = stateStat.mtimeMs;
    
    for (const deliverable of deliverables) {
      let deliverableStat;
      try {
        deliverableStat = fs.statSync(deliverable.path);
      } catch (err) {
        continue;
      }
      
      if (deliverableStat.mtimeMs > stateMtime) {
        results.push({
          level: 'WARN',
          file: deliverable.path,
          message: `Deliverable appears newer than CURRENT_STATE.md. Review whether project state needs to be updated.`
        });
        
        // One warning is enough — avoid noise
        break;
      }
    }
    
    return results;
  }
};
