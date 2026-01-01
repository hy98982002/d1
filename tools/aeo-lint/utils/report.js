function report(results) {
  if (!results.length) {
    console.log('✓ aeo-lint passed');
    process.exit(0);
  }

  let hasError = false;
  let errorCount = 0;
  let warnCount = 0;

  // 分离ERROR和WARN结果
  const errors = results.filter(r => r.level === 'ERROR');
  const warnings = results.filter(r => r.level === 'WARN');

  // 先输出ERROR
  if (errors.length > 0) {
    hasError = true;
    errorCount = errors.length;
    console.log(`\nERRORS (${errorCount}):`);
    console.log('================');
    for (const r of errors) {
      console.log(`[${r.level}] ${r.file}`);
      console.log(`  → ${r.message}`);
    }
  }

  // 再输出WARN
  if (warnings.length > 0) {
    warnCount = warnings.length;
    console.log(`\nWARNINGS (${warnCount}):`);
    console.log('==================');
    for (const r of warnings) {
      console.log(`[${r.level}] ${r.file}`);
      console.log(`  → ${r.message}`);
    }
  }

  // 输出summary
  console.log(`\nSUMMARY:`);
  console.log(`========`);
  console.log(`Total issues: ${results.length}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Warnings: ${warnCount}`);

  process.exit(hasError ? 1 : 0);
}

module.exports = { report };