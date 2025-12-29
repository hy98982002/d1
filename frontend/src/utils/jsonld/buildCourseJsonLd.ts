/**
 * 课程 JSON-LD 构建工具
 * 符合 Schema.org Course 规范 + LRMI 五维扩展
 *
 * 五维字段：
 * 1. Level（教育层级）- educationalLevel
 * 2. Type（课程类型）- educationalUse
 * 3. Access（访问属性）- offers / audience / courseMode
 * 4. Outcome（学习结果）- learningOutcome
 * 5. Pathway（学习路径）- isPartOf
 */

import { assertStageKey } from '@/types'
import type {
  Course,
  CourseJsonLd,
  EducationalLevelTerm,
  EducationalUse,
  CourseOffer,
  EducationalAudience,
  ProgramReference
} from '@/types'
import { StageMeta } from '@/utils/stageMap'

/**
 * 构建课程的 JSON-LD 结构化数据
 * @param course 课程对象
 * @param options 可选配置
 * @returns CourseJsonLd 对象
 * @throws {Error} 如果 stage 非法
 */
export function buildCourseJsonLd(
  course: Course,
  options?: {
    baseUrl?: string
    programName?: string
    programUrl?: string
  }
): CourseJsonLd {
  // ✅ 运行时校验：fail-fast 策略
  assertStageKey(course.stage)

  const baseUrl = options?.baseUrl || 'https://www.doviai.com'

  // 1️⃣ Level（教育层级）- DefinedTerm 类型
  const educationalLevel: EducationalLevelTerm = {
    '@type': 'DefinedTerm',
    name: StageMeta[course.stage].label, // "入门" / "进阶" / "高阶"
    inDefinedTermSet: `${baseUrl}/levels`,
    description: `${StageMeta[course.stage].label}阶段课程`
  }

  // 2️⃣ Type（课程类型）- 教学用途
  const educationalUse: EducationalUse[] = ['Lesson', 'Practice']
  if (course.stage === 'beginner') {
    educationalUse.push('Introduction')
  } else if (course.stage === 'intermediate') {
    educationalUse.push('Exercise')
  } else if (course.stage === 'advanced') {
    educationalUse.push('Project')
  }

  // 3️⃣ Access（访问属性）
  // 价格信息 + 会员折扣
  const offers: CourseOffer = {
    '@type': 'Offer',
    price: course.price || 0,
    priceCurrency: 'CNY',
    availability: course.isFree
      ? 'https://schema.org/InStock'
      : 'https://schema.org/LimitedAvailability',
    ...(course.isVip && {
      // 会员专享课程标记
      eligibleCustomerType: 'Membership'
    })
  }

  // 会员9折逻辑（如果课程支持会员折扣）
  if (course.stage === 'advanced' && course.price && course.price > 0) {
    // @ts-ignore - 扩展 Schema.org Offer 类型
    offers.priceSpecification = {
      '@type': 'UnitPriceSpecification',
      price: course.price,
      priceCurrency: 'CNY',
      // 会员折扣
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        value: 1
      },
      // 会员9折
      discount: {
        '@type': 'Offer',
        price: course.price * 0.9,
        priceCurrency: 'CNY',
        eligibleCustomerType: 'Membership'
      }
    }
  }

  const audience: EducationalAudience | undefined = course.isVip ? {
    '@type': 'EducationalAudience',
    audienceType: '会员专区'
  } : undefined

  // 4️⃣ Outcome（学习结果）- 从课程描述提取
  const learningOutcome: string[] = course.description
    ? [course.description]
    : [`掌握${course.title}相关知识和技能`]

  // 5️⃣ Pathway（学习路径）- 课程所属体系
  const isPartOf: ProgramReference | undefined = options?.programName ? {
    '@type': 'EducationalOccupationalProgram',
    '@id': options.programUrl || `${baseUrl}/program/${course.stage}`,
    name: options.programName,
    url: options.programUrl || `${baseUrl}/program/${course.stage}`
  } : undefined

  // 构建完整的 JSON-LD 对象
  const jsonLd: CourseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${baseUrl}/course/${course.slug}`,
    name: course.title,
    description: course.description || course.title,

    // 机构信息
    provider: {
      '@type': 'Organization',
      name: '多维AI课堂',
      url: baseUrl
    },

    // 五维字段
    educationalLevel,
    about: course.tags?.[0] || '通用技能', // Type - 主题领域
    educationalUse,
    offers,
    audience,
    courseMode: 'Online',
    learningOutcome,
    isPartOf,

    // 其他标准字段
    inLanguage: 'zh-CN',
    keywords: course.tags?.join(', '),
    image: course.cover
  }

  return jsonLd
}

/**
 * 将 JSON-LD 对象转换为可嵌入的 script 标签内容
 * @param jsonLd CourseJsonLd 对象
 * @returns JSON 字符串
 */
export function serializeJsonLd(jsonLd: CourseJsonLd): string {
  return JSON.stringify(jsonLd, null, 2)
}

/**
 * 生成 JSON-LD script 标签的完整 HTML
 * @param jsonLd CourseJsonLd 对象
 * @returns HTML 字符串
 */
export function generateJsonLdScript(jsonLd: CourseJsonLd): string {
  return `<script type="application/ld+json">\n${serializeJsonLd(jsonLd)}\n</script>`
}
