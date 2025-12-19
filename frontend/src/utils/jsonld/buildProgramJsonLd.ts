/**
 * 体系课（Program）JSON-LD 构建工具
 * 符合 Schema.org EducationalOccupationalProgram 规范
 *
 * 用于构建完整学习路径的结构化数据，包含多个课程的体系
 */

import { assertStageKey } from '@/types'
import type {
  Course,
  StageKey,
  ProgramJsonLd,
  EducationalLevelTerm,
  EducationalUse,
  CourseOffer,
  CourseReference
} from '@/types'
import { StageMeta } from '@/utils/stageMap'

/**
 * 构建体系课的 JSON-LD 结构化数据
 * @param options 体系课配置
 * @returns ProgramJsonLd 对象
 * @throws {Error} 如果 stage 非法
 */
export function buildProgramJsonLd(options: {
  stage: StageKey
  name: string
  description?: string
  courses: Course[]
  baseUrl?: string
  totalPrice?: number
  timeToComplete?: string
  occupationalCategory?: string
}): ProgramJsonLd {
  // ✅ 运行时校验：fail-fast 策略
  assertStageKey(options.stage)

  const baseUrl = options.baseUrl || 'https://www.doviai.com'
  const programId = `${baseUrl}/program/${options.stage}`

  // 1️⃣ Level（教育层级）
  const educationalLevel: EducationalLevelTerm = {
    '@type': 'DefinedTerm',
    name: StageMeta[options.stage].label,
    inDefinedTermSet: `${baseUrl}/levels`,
    description: `${StageMeta[options.stage].label}阶段完整学习路径`
  }

  // 2️⃣ Type（体系类型）
  const educationalUse: EducationalUse[] = ['Curriculum', 'ProfessionalDevelopment']
  if (options.stage === 'beginner') {
    educationalUse.push('Introduction')
  } else if (options.stage === 'intermediate') {
    educationalUse.push('Practice')
  } else if (options.stage === 'advanced') {
    educationalUse.push('Project', 'CaseStudy')
  }

  // 3️⃣ Access（访问属性）- 体系价格
  const totalPrice = options.totalPrice || options.courses.reduce((sum, c) => sum + (c.price || 0), 0)
  const offers: CourseOffer = {
    '@type': 'Offer',
    price: totalPrice,
    priceCurrency: 'CNY',
    availability: 'https://schema.org/InStock'
  }

  // 会员9折逻辑（高阶体系）
  if (options.stage === 'advanced' && totalPrice > 0) {
    // @ts-ignore - 扩展 Schema.org Offer 类型
    offers.priceSpecification = {
      '@type': 'UnitPriceSpecification',
      price: totalPrice,
      priceCurrency: 'CNY',
      discount: {
        '@type': 'Offer',
        price: totalPrice * 0.9,
        priceCurrency: 'CNY',
        eligibleCustomerType: 'Membership'
      }
    }
  }

  // 5️⃣ Pathway（学习路径）- 包含的课程列表
  const hasCourse: CourseReference[] = options.courses.map(course => {
    assertStageKey(course.stage) // 校验每个课程的 stage
    return {
      '@type': 'Course',
      '@id': `${baseUrl}/course/${course.slug}`,
      name: course.title,
      url: `${baseUrl}/course/${course.slug}`,
      description: course.description
    }
  })

  // 构建完整的 Program JSON-LD 对象
  const jsonLd: ProgramJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    '@id': programId,
    name: options.name,
    description: options.description || `${StageMeta[options.stage].label}阶段完整学习体系`,

    // 机构信息
    provider: {
      '@type': 'Organization',
      name: '多维AI课堂',
      url: baseUrl
    },

    // 五维字段
    educationalLevel,
    educationalUse,
    hasCourse,
    offers,
    timeToComplete: options.timeToComplete || 'P3M', // ISO 8601 格式，默认3个月
    occupationalCategory: options.occupationalCategory || '通用技能培训'
  }

  return jsonLd
}

/**
 * 将 Program JSON-LD 对象转换为可嵌入的 script 标签内容
 * @param jsonLd ProgramJsonLd 对象
 * @returns JSON 字符串
 */
export function serializeProgramJsonLd(jsonLd: ProgramJsonLd): string {
  return JSON.stringify(jsonLd, null, 2)
}

/**
 * 生成 Program JSON-LD script 标签的完整 HTML
 * @param jsonLd ProgramJsonLd 对象
 * @returns HTML 字符串
 */
export function generateProgramJsonLdScript(jsonLd: ProgramJsonLd): string {
  return `<script type="application/ld+json">\n${serializeProgramJsonLd(jsonLd)}\n</script>`
}
