import { z } from 'zod'

// ============================================
// 课程三级体系 - 新版统一标准（仅保留 basic/intermediate/advanced）
// ============================================

// Zod Schema 定义 - 运行时类型校验
export const StageKeySchema = z.enum(['basic', 'intermediate', 'advanced'])
export type StageKey = z.infer<typeof StageKeySchema>

// 类型守卫函数 - 安全检查
export const isStageKey = (value: string): value is StageKey => {
  return StageKeySchema.safeParse(value).success
}

// 断言函数 - 运行时强制校验
export const assertStageKey = (value: string): asserts value is StageKey => {
  StageKeySchema.parse(value)
}

// 课程阶段枚举 - 三级体系
export const STAGES = {
  basic: '入门',
  intermediate: '进阶',
  advanced: '高阶'
} as const

export type StageValue = (typeof STAGES)[StageKey]

// 课程级别（与阶段同义，用于不同上下文）
export type LevelKey = StageKey

// 阶段样式映射 - 三级体系
export const STAGE_STYLES = {
  basic: { textClass: 'text-primary', bgClass: 'bg-primary-subtle', label: '入门' },
  intermediate: { textClass: 'text-info', bgClass: 'bg-info-subtle', label: '进阶' },
  advanced: { textClass: 'text-danger', bgClass: 'bg-danger-subtle', label: '高阶' }
} as const

// ============================================
// Program（学习路径）体系 - 路由动态化支持
// ============================================

// Program Slug 枚举
export const PROGRAM_SLUGS = ['aigc-intermediate', 'ai-designer-advanced'] as const
export type ProgramSlug = (typeof PROGRAM_SLUGS)[number]

// 类型守卫函数 - 安全检查
export const isProgramSlug = (value: string): value is ProgramSlug => {
  return PROGRAM_SLUGS.includes(value as ProgramSlug)
}

// 断言函数 - 运行时强制校验（Fail-Fast）
export const assertProgramSlug = (value: string): asserts value is ProgramSlug => {
  if (!PROGRAM_SLUGS.includes(value as ProgramSlug)) {
    throw new Error(
      `Invalid program slug: "${value}". Expected one of: ${PROGRAM_SLUGS.join(', ')}`
    )
  }
}

// Program权益接口
export interface ProgramBenefit {
  icon: string // Font Awesome类名（如: 'fas fa-crown text-warning'）
  text: string // 权益描述
}

// Program配置接口
export interface Program {
  id: number // 唯一标识
  slug: ProgramSlug // URL标识（如: 'aigc-intermediate'）
  name: string // Program名称（如: '会员进阶路线'）
  subtitle: string // 副标题
  description: string // 详细描述
  stage: StageKey // 对应的课程阶段（basic/intermediate/advanced）
  heroBackground: string // Hero区域背景渐变色
  outcomes: string[] // 学习收获列表
  benefitsTitle: string // 权益卡片标题
  benefits: ProgramBenefit[] // 权益列表
  buttonText: string // CTA按钮文字
  buttonClass: string // CTA按钮样式类名
  courseDescription: string // 课程列表区域描述

  // 可选：SEO相关字段
  meta?: {
    title: string
    description: string
    keywords?: string[]
  }
}

// 课程接口
export interface Course {
  id: number
  title: string
  slug: string // SEO友好的URL标识，如 "beginner-python"
  cover: string
  stage: StageKey
  camp?: 'skill' | 'career' | 'enterprise' // 营区归属
  tags: string[] // 子标签数组，用于过滤
  price?: number
  originalPrice?: number
  learnerCount?: number
  rating?: number
  reviewCount?: number
  duration?: string // 课程时长
  level?: string // 难度级别
  badge?: string // 课程徽章
  description?: string
  instructor?: string
  isHot?: boolean
  isFree?: boolean
  isVip?: boolean // 是否会员专享
  isVipOnly?: boolean // 会员专属（深度进阶课程）
  deepIntermediate?: boolean // 深度进阶标识（UI显示用）
  comingSoon?: boolean // 即将上线（占位卡）
  enrolled?: number // 兼容旧字段，等同于 learnerCount
}

// 教师接口
export interface Teacher {
  id: number
  name: string
  avatar: string
  title: string
  specialty: string
  experience: string
  description?: string
}

// 营区数据接口
export interface CampData {
  title: string
  subtitle: string
  stageOrder: StageKey[] // 该营区显示的阶段顺序
  courses: Course[]
}

// 子标签接口
export interface SubTag {
  id: string
  name: string
  isActive?: boolean
}

// 专区按钮接口
export interface ZoneButton {
  id: string
  name: string
  target: string
  isActive?: boolean
}

// 轮播图接口
export interface CarouselItem {
  id: number
  image: string
  title: string
  subtitle: string
  link?: string
}

// API响应接口
export interface ApiResponse<T = any> {
  status: number
  data: T
  msg: string
}

// 分页接口
export interface PaginationData<T = any> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 筛选条件接口
export interface CourseFilter {
  stage?: StageKey
  camp?: string
  tags?: string[]
  search?: string
  minPrice?: number
  maxPrice?: number
  isFree?: boolean
}

// 导航菜单项接口
export interface NavMenuItem {
  id: string
  label: string
  href?: string
  children?: NavMenuItem[]
}

// 课程详情页相关类型定义
export interface Lesson {
  id: string
  title: string
  duration: string
  isFree?: boolean
  isCompleted?: boolean
}

export interface Chapter {
  id: string
  title: string
  lessonCount: number
  lessons: Lesson[]
  isExpanded?: boolean
}

export interface CourseInfo {
  title: string
  subtitle?: string // 副标题
  coverImage: string
  studyHeat?: number // 学习热度
  duration?: string // 课程时长（如：191分钟）
  discountPrice?: number // 折扣价
  originalPrice?: number // 原价
  discount?: number // 折扣百分比
  promotionEndTime?: Date // 促销结束时间
  difficulty?: string // 难度级别（向下兼容）
  updatedLessons?: number // 已更新课时数（向下兼容）
  isFree: boolean
  price?: number // 基础价格（向下兼容）
}

export interface Review {
  id: string
  userName: string
  userAvatar: string
  rating: number
  content: string
  date: string
}

export interface BreadcrumbItem {
  title: string
  href?: string
  path?: string
}

// ============================================
// JSON-LD 五维 Schema 类型定义
// ============================================

// 1. Level（教育层级）- DefinedTerm 类型
export interface EducationalLevelTerm {
  '@type': 'DefinedTerm'
  name: string // 如："Beginner" / "Intermediate" / "Advanced"
  inDefinedTermSet: string // 如："https://www.doviai.com/levels"
  description?: string
}

// 2. Type（课程类型）- LRMI教学用途
export type EducationalUse =
  | 'Lecture' // 讲授
  | 'Demonstration' // 演示
  | 'Exercise' // 练习
  | 'Introduction' // 导入
  | 'Lesson' // 课时
  | 'Practice' // 技能练习
  | 'Project' // 综合项目
  | 'CaseStudy' // 商业案例
  | 'Simulation' // 模拟场景
  | 'Curriculum' // 课程路径
  | 'Unit' // 子模块
  | 'ProfessionalDevelopment' // 职业发展

// 3. Access（访问属性）
export interface CourseAccess {
  offers: CourseOffer
  audience?: EducationalAudience
  courseMode: 'Online' | 'Offline' | 'Hybrid'
}

export interface CourseOffer {
  '@type': 'Offer'
  price: string | number
  priceCurrency: 'CNY' | 'USD'
  availability: string // Schema.org 库存状态 URL
  validFrom?: string
  validThrough?: string
}

export interface EducationalAudience {
  '@type': 'EducationalAudience'
  audienceType: string // 如："会员专区" / "公开课程"
}

// 4. Outcome（学习结果）
export type LearningOutcome = string[] // 学习成果列表

// 5. Pathway（学习路径）
export interface CoursePathway {
  isPartOf?: ProgramReference // 课程所属的体系
  hasPart?: CourseReference[] // 体系包含的课程列表（用于Program页面）
}

export interface ProgramReference {
  '@type': 'EducationalOccupationalProgram'
  '@id'?: string
  name: string
  url?: string
  description?: string
}

export interface CourseReference {
  '@type': 'Course'
  '@id'?: string
  name: string
  url: string
  description?: string
}

// 完整的课程 JSON-LD 结构
export interface CourseJsonLd {
  '@context': 'https://schema.org'
  '@type': 'Course'
  '@id'?: string
  name: string
  description?: string
  provider: {
    '@type': 'Organization'
    name: string
    url: string
  }
  // 五维字段
  educationalLevel?: EducationalLevelTerm // Level
  about?: string // Type - 主题领域
  educationalUse?: EducationalUse[] // Type - 教学用途
  offers?: CourseOffer // Access
  audience?: EducationalAudience // Access
  courseMode?: string // Access
  learningOutcome?: LearningOutcome // Outcome
  isPartOf?: ProgramReference // Pathway
  // 其他标准字段
  inLanguage?: string
  keywords?: string
  image?: string
  hasCourseSection?: any[]
}

// Program（体系课）JSON-LD 结构
export interface ProgramJsonLd {
  '@context': 'https://schema.org'
  '@type': 'EducationalOccupationalProgram'
  '@id'?: string
  name: string
  description?: string
  provider: {
    '@type': 'Organization'
    name: string
    url: string
  }
  educationalLevel?: EducationalLevelTerm
  educationalUse?: EducationalUse[]
  hasCourse?: CourseReference[] // Pathway - 包含的课程列表
  offers?: CourseOffer
  timeToComplete?: string
  occupationalCategory?: string
}
