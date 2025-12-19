/**
 * Phase 2 - P1任务测试脚本
 * 测试目标：验证阶段切换时URL参数同步功能
 *
 * 测试场景：
 * 1. 点击"进阶专区"标签 → 验证URL包含?stage=intermediate
 * 2. 点击"高阶专区"标签 → 验证URL包含?stage=advanced
 * 3. 点击"入门专区"标签 → 验证URL包含?stage=beginner
 */

import { chromium } from 'playwright'
import { writeFileSync } from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const BASE_URL = 'http://localhost:5173'
const SCREENSHOT_DIR = `${__dirname}/frontend/docs/1218StageKey体系切换 首页状态保持修复计划/screenshots`

// 测试用例定义
const testCases = [
  {
    id: 'TC1',
    stage: 'intermediate',
    label: '进阶专区',
    description: '点击进阶专区标签，验证URL同步'
  },
  {
    id: 'TC2',
    stage: 'advanced',
    label: '高阶专区',
    description: '点击高阶专区标签，验证URL同步'
  },
  {
    id: 'TC3',
    stage: 'beginner',
    label: '入门专区',
    description: '点击入门专区标签，验证URL同步'
  }
]

async function runTests() {
  console.log('\n========================================')
  console.log('🧪 Phase 2 - P1任务测试开始')
  console.log('测试目标：阶段切换时URL参数同步')
  console.log('========================================\n')

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500 // 放慢操作以便观察
  })

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  })

  const page = await context.newPage()
  const results = []

  // 监听控制台输出
  page.on('console', msg => {
    if (msg.text().includes('[StageTabs]') || msg.text().includes('[Route Guard]')) {
      console.log(`📝 浏览器控制台: ${msg.text()}`)
    }
  })

  try {
    // 访问首页
    console.log(`\n📍 步骤1: 访问首页 ${BASE_URL}`)
    await page.goto(BASE_URL, { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)

    // 执行测试用例
    for (const testCase of testCases) {
      console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
      console.log(`🧪 ${testCase.id}: ${testCase.description}`)
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

      // 点击阶段标签
      const stageButton = page.locator(`button:has-text("${testCase.label}")`).first()
      console.log(`\n📍 步骤2: 点击"${testCase.label}"标签`)
      await stageButton.click()
      await page.waitForTimeout(1000)

      // 验证URL参数
      const currentUrl = page.url()
      const urlParams = new URL(currentUrl).searchParams
      const actualStage = urlParams.get('stage')

      console.log(`\n✅ URL验证:`)
      console.log(`   期望: ?stage=${testCase.stage}`)
      console.log(`   实际: ?stage=${actualStage}`)

      const urlMatch = actualStage === testCase.stage
      console.log(`   结果: ${urlMatch ? '✅ PASS' : '❌ FAIL'}`)

      // 验证阶段标签active状态
      const isActive = await stageButton.evaluate(el => el.classList.contains('active'))
      console.log(`\n✅ 阶段标签active状态:`)
      console.log(`   期望: true`)
      console.log(`   实际: ${isActive}`)
      console.log(`   结果: ${isActive ? '✅ PASS' : '❌ FAIL'}`)

      // 截图
      const screenshotPath = `${SCREENSHOT_DIR}/p1-url-sync-${testCase.stage}.png`
      await page.screenshot({
        path: screenshotPath,
        fullPage: false
      })
      console.log(`\n📸 截图已保存: ${screenshotPath}`)

      // 记录测试结果
      results.push({
        testCase: testCase.id,
        stage: testCase.stage,
        label: testCase.label,
        urlMatch,
        isActive,
        status: urlMatch && isActive ? 'PASS' : 'FAIL',
        screenshot: screenshotPath
      })
    }

    // 生成测试报告
    console.log('\n========================================')
    console.log('📊 测试结果汇总')
    console.log('========================================\n')

    const reportData = {
      testTime: new Date().toISOString(),
      phase: 'Phase 2 - P1',
      task: '阶段切换时URL参数同步',
      results,
      summary: {
        total: results.length,
        passed: results.filter(r => r.status === 'PASS').length,
        failed: results.filter(r => r.status === 'FAIL').length
      }
    }

    results.forEach(result => {
      const statusIcon = result.status === 'PASS' ? '✅' : '❌'
      console.log(`${statusIcon} ${result.testCase}: ${result.label}`)
      console.log(`   URL同步: ${result.urlMatch ? 'PASS' : 'FAIL'}`)
      console.log(`   Active状态: ${result.isActive ? 'PASS' : 'FAIL'}`)
      console.log(`   总体状态: ${result.status}\n`)
    })

    console.log(`总计: ${reportData.summary.total} 个测试`)
    console.log(`通过: ${reportData.summary.passed} 个 ✅`)
    console.log(`失败: ${reportData.summary.failed} 个 ❌\n`)

    // 保存JSON格式报告
    const reportPath = `${__dirname}/frontend/docs/1218StageKey体系切换 首页状态保持修复计划/test-p1-results.json`
    writeFileSync(reportPath, JSON.stringify(reportData, null, 2))
    console.log(`📄 JSON报告已保存: ${reportPath}`)

    return reportData

  } catch (error) {
    console.error('\n❌ 测试执行出错:', error)
    throw error
  } finally {
    await browser.close()
  }
}

// 执行测试
runTests()
  .then(results => {
    console.log('\n✅ 测试执行完成')
    process.exit(results.summary.failed === 0 ? 0 : 1)
  })
  .catch(error => {
    console.error('\n❌ 测试失败:', error)
    process.exit(1)
  })
