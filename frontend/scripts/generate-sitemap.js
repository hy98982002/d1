/**
 * sitemap.xml 自动生成脚本
 *
 * 功能:
 * - 扫描所有Course和Program URL
 * - 生成符合SEO标准的sitemap.xml
 * - 设置URL优先级和更新频率
 *
 * 使用: node scripts/generate-sitemap.js
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 配置
const DOMAIN = 'https://www.doviai.com'
const OUTPUT_PATH = join(__dirname, '../public/sitemap.xml')

// 固定的Program slugs(与courseStore中的mockPrograms对应)
const PROGRAM_SLUGS = ['aigc-intermediate', 'ai-designer-advanced']

// 提取Course slugs(从courseStore.ts中读取)
function extractCourseSlugs() {
  const courseStorePath = join(__dirname, '../src/store/courseStore.ts')
  const content = readFileSync(courseStorePath, 'utf-8')

  // 提取所有 slug: 'xxx' 的值
  const slugRegex = /slug:\s*['"]([^'"]+)['"]/g
  const slugs = []
  let match

  while ((match = slugRegex.exec(content)) !== null) {
    const slug = match[1]
    // 过滤掉Program的slug(它们有专门的路由)
    if (!PROGRAM_SLUGS.includes(slug)) {
      slugs.push(slug)
    }
  }

  return [...new Set(slugs)] // 去重
}

// 生成sitemap XML内容
function generateSitemapXml() {
  const courseSlugs = extractCourseSlugs()
  const currentDate = new Date().toISOString().split('T')[0]

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- 首页 -->
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- About页面 -->
  <url>
    <loc>${DOMAIN}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

  <!-- Program学习路径页面 -->
`

  PROGRAM_SLUGS.forEach(slug => {
    xml += `  <url>
    <loc>${DOMAIN}/program/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

`
  })

  xml += `  <!-- 课程详情页面 -->
`

  courseSlugs.forEach(slug => {
    xml += `  <url>
    <loc>${DOMAIN}/course/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

`
  })

  xml += `</urlset>`

  return xml
}

// 主函数
function main() {
  try {
    console.log('🚀 开始生成 sitemap.xml...')

    const xml = generateSitemapXml()
    writeFileSync(OUTPUT_PATH, xml, 'utf-8')

    const courseSlugs = extractCourseSlugs()
    console.log(`✅ sitemap.xml 生成成功!`)
    console.log(`   - 首页: 1个`)
    console.log(`   - 静态页面: 1个 (About)`)
    console.log(`   - Program页面: ${PROGRAM_SLUGS.length}个`)
    console.log(`   - 课程页面: ${courseSlugs.length}个`)
    console.log(`   - 总计: ${1 + 1 + PROGRAM_SLUGS.length + courseSlugs.length}个 URL`)
    console.log(`   - 输出路径: ${OUTPUT_PATH}`)
  } catch (error) {
    console.error('❌ 生成 sitemap.xml 失败:', error.message)
    process.exit(1)
  }
}

main()
