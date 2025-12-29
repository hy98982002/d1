// stageMap.ts
// 课程阶段映射工具 - 新三级体系（beginner / intermediate / advanced）

import { STAGES, assertStageKey, type StageKey } from '@/types'

// ============================================
// StageMeta - 单一数据源（所有 stage 相关元数据）
// ============================================

export const StageMeta = {
  beginner: {
    label: '入门',
    slug: 'beginner',
    textClass: 'text-primary',
    bgClass: 'bg-primary-subtle'
  },
  intermediate: {
    label: '进阶',
    slug: 'intermediate',
    textClass: 'text-info',
    bgClass: 'bg-info-subtle'
  },
  advanced: {
    label: '高阶',
    slug: 'advanced',
    textClass: 'text-danger',
    bgClass: 'bg-danger-subtle'
  }
} as const

/**
 * 获取 stage 的中文显示标签
 * @param stage StageKey
 * @returns 中文标签
 * @throws {Error} 非法的 stage 值
 */
export function getStageLabel(stage: StageKey): string {
  assertStageKey(stage) // 运行时校验
  return StageMeta[stage].label
}

/**
 * 获取 stage 的英文 slug 标识符（用于 URL）
 * @param stage StageKey
 * @returns 英文 slug (beginner / intermediate / advanced)
 * @throws {Error} 非法的 stage 值
 */
export function getStageSlug(stage: StageKey): string {
  assertStageKey(stage) // 运行时校验
  return StageMeta[stage].slug
}

/**
 * 从 slug 还原为 StageKey
 * @param slug URL 中的 slug (beginner / intermediate / advanced)
 * @returns StageKey
 * @throws {Error} 非法的 slug 值
 */
export function slugToStageKey(slug: string): StageKey {
  const normalized = slug.toLowerCase().trim()

  // 使用反向映射查找
  for (const [key, meta] of Object.entries(StageMeta)) {
    if (meta.slug === normalized) {
      return key as StageKey
    }
  }

  // 非法值直接抛错，不再提供 fallback
  throw new Error(`非法的 slug 值: "${slug}". 有效值: beginner, intermediate, advanced`)
}

/**
 * 获取 stage 的样式类名
 * @param stage StageKey
 * @returns Bootstrap 样式对象
 * @throws {Error} 非法的 stage 值
 */
export function getStageStyle(stage: StageKey) {
  assertStageKey(stage) // 运行时校验
  return {
    textClass: StageMeta[stage].textClass,
    bgClass: StageMeta[stage].bgClass
  }
}

// 导出便捷的默认对象
export default {
  getStageLabel,
  getStageSlug,
  slugToStageKey,
  getStageStyle
}
