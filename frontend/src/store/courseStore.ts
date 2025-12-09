import { defineStore } from 'pinia'
import type { Course, StageKey, Program } from '../types'
import { assertStageKey } from '../types'
import { generateCourseSlug } from '@/utils/slug'

// 导入图片资源（新三级体系命名：basic / intermediate / advanced）
import photoshopBasicCover from '@/assets/images/courses/photoshop-basic-cover-480.webp'
import pythonBasicCover from '@/assets/images/courses/python-basic-cover-480.webp'
import unrealBasicCover from '@/assets/images/courses/unreal-basic-cover-480.webp'
import photoshopIntermediateCover from '@/assets/images/courses/photoshop-intermediate-cover-480.webp'
import pythonIntermediateCover from '@/assets/images/courses/python-intermediate-cover-480.webp'
import unrealIntermediateCover from '@/assets/images/courses/unreal-intermediate-cover-480.webp'

// 高级课程图片资源（Advanced阶段）- 多分辨率支持
import thePowerOfLineAdvancedCover480 from '@/assets/images/courses/ThePowerOfLine-Advanced-cover-480.webp'
import thePowerOfLineAdvancedCover1280 from '@/assets/images/courses/ThePowerOfLine-Advanced-cover-1280.webp'
import thePowerOfLineAdvancedCover1920 from '@/assets/images/courses/ThePowerOfLine-Advanced-cover-1920.webp'

import psychologicalExpressionAdvancedCover480 from '@/assets/images/courses/PsychologicalExpression-Advanced-cover-480.webp'
import psychologicalExpressionAdvancedCover1280 from '@/assets/images/courses/PsychologicalExpression-Advanced-cover-1280.webp'
import psychologicalExpressionAdvancedCover1920 from '@/assets/images/courses/PsychologicalExpression-Advanced-cover-1920.webp'

import creativeFramingAdvancedCover480 from '@/assets/images/courses/CreativeFraming-Advanced-cover-480.webp'
import creativeFramingAdvancedCover1280 from '@/assets/images/courses/CreativeFraming-Advanced-cover-1280.webp'
import creativeFramingAdvancedCover1920 from '@/assets/images/courses/CreativeFraming-Advanced-cover-1920.webp'

// Mock课程数据（新三级体系：basic / intermediate / advanced）
const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Photoshop AI设计技能体验课：从小白到高手',
    slug: 'photoshop-ai-design-basic',
    description: '零基础入门Photoshop编程',
    price: 0,
    stage: 'basic',
    cover: photoshopBasicCover,
    tags: ['PhotoshopAI', 'AIGC', 'AI+logo'],
    rating: 4.5,
    enrolled: 1200,
    duration: '2小时',
    level: '入门',
    instructor: '张老师'
  },
  {
    id: 2,
    title: 'Illustrator设计技能体验课：从小白到高手',
    slug: 'illustrator-design-basic',
    description: '零基础入门Illustrator设计',
    price: 0,
    stage: 'basic',
    cover: unrealBasicCover,
    tags: ['Illustrator', 'AIGC', 'AI+logo'],
    rating: 4.3,
    enrolled: 800,
    duration: '2小时',
    level: '入门',
    instructor: '李老师'
  },
  {
    id: 3,
    title: 'Photoshop体验课',
    slug: 'photoshop-basic',
    description: 'PS图像处理基础入门',
    price: 0,
    stage: 'basic',
    cover: photoshopBasicCover,
    tags: ['Photoshop', '图像处理', '入门', 'AI+logo'],
    rating: 4.7,
    enrolled: 1500,
    duration: '2小时',
    level: '入门',
    instructor: '王老师'
  },
  {
    id: 4,
    title: 'Python入门课程',
    slug: 'python-basic',
    description: 'Python编程基础知识',
    price: 199,
    stage: 'basic',
    cover: pythonBasicCover,
    tags: ['Python', '基础', '入门'],
    rating: 4.6,
    enrolled: 2000,
    duration: '20小时',
    level: '初级',
    instructor: '张老师'
  },
  {
    id: 5,
    title: 'illustrator基础课程',
    slug: 'illustrator-basic',
    description: 'illustrator核心概念',
    price: 299,
    stage: 'basic',
    cover: pythonBasicCover,
    tags: ['illustrator', 'logo设计', 'AIGC', 'AIGC+logo'],
    rating: 4.8,
    enrolled: 1800,
    duration: '30小时',
    level: '初级',
    instructor: '张老师'
  },
  {
    id: 6,
    title: '虚幻引擎入门课程',
    slug: 'unreal-engine-basic',
    description: '虚幻引擎基础开发',
    price: 299,
    stage: 'basic',
    cover: unrealBasicCover,
    tags: ['UE', '基础', '入门'],
    rating: 4.4,
    enrolled: 1200,
    duration: '25小时',
    level: '初级',
    instructor: '李老师'
  },
  {
    id: 7,
    title: 'Photoshop入门课程',
    slug: 'photoshop-intro-basic',
    description: 'PS图像处理基础技巧',
    price: 199,
    stage: 'basic',
    cover: photoshopBasicCover,
    tags: ['Photoshop', 'AIGC', '入门', 'AI+logo'],
    rating: 4.5,
    enrolled: 1600,
    duration: '15小时',
    level: '初级',
    instructor: '王老师'
  },
  {
    id: 8,
    title: 'Python进阶课程',
    slug: 'python-intermediate',
    description: 'Python高级编程技巧',
    price: 599,
    stage: 'intermediate',
    cover: pythonIntermediateCover,
    tags: ['Python', '高级', '进阶'],
    rating: 4.9,
    enrolled: 800,
    duration: '40小时',
    level: '中级',
    instructor: '张老师'
  },
  {
    id: 9,
    title: 'logo分析',
    slug: 'logo-analysis-intermediate',
    description: 'Python数据处理与分析',
    price: 699,
    stage: 'intermediate',
    cover: pythonIntermediateCover,
    tags: ['illustrator', 'logo设计', 'AIGC'],
    rating: 4.7,
    enrolled: 600,
    duration: '35小时',
    level: '中级',
    instructor: '张老师'
  },
  {
    id: 10,
    title: '虚幻引擎进阶课程',
    slug: 'unreal-engine-intermediate',
    description: '虚幻引擎高级开发技巧',
    price: 699,
    stage: 'intermediate',
    cover: unrealIntermediateCover,
    tags: ['UE', '游戏开发', 'AIGC'],
    rating: 4.6,
    enrolled: 500,
    duration: '45小时',
    level: '中级',
    instructor: '李老师'
  },
  {
    id: 11,
    title: 'Photoshop场景环境课程',
    slug: 'photoshop-environment-intermediate',
    description: 'PS高级图像处理技巧',
    price: 499,
    stage: 'intermediate',
    cover: photoshopIntermediateCover,
    tags: ['Photoshop', 'AIGC', '场景设计'],
    rating: 4.8,
    enrolled: 700,
    duration: '30小时',
    level: '中级',
    instructor: '王老师'
  },
  {
    id: 12,
    title: 'Python Web开发',
    slug: 'python-web-intermediate',
    description: 'Python Web应用开发',
    price: 799,
    stage: 'intermediate',
    cover: pythonIntermediateCover,
    tags: ['Python', 'Web', 'Django'],
    rating: 4.5,
    enrolled: 400,
    duration: '50小时',
    level: '中级',
    instructor: '张老师'
  },
  // Advanced阶段课程（高阶专区）
  {
    id: 13,
    title: '线的魔力',
    slug: 'the-power-of-line-advanced',
    description: '深入探索线条在插画设计中的表现力和魅力，掌握线条的节奏、韵律和情感表达',
    price: 1299,
    stage: 'advanced',
    cover: thePowerOfLineAdvancedCover480,
    tags: ['插画', '设计', '线条艺术', 'AIGC'],
    rating: 4.9,
    enrolled: 320,
    duration: '60小时',
    level: '高级',
    instructor: '陈老师'
  },
  {
    id: 14,
    title: '插画的设计心理表达',
    slug: 'psychological-expression-advanced',
    description: '运用心理学原理创作具有情感共鸣的插画作品，掌握色彩心理学和视觉叙事技巧',
    price: 1399,
    stage: 'advanced',
    cover: psychologicalExpressionAdvancedCover480,
    tags: ['插画', '设计心理学', '视觉叙事', 'AIGC'],
    rating: 4.8,
    enrolled: 280,
    duration: '55小时',
    level: '高级',
    instructor: '李老师'
  },
  {
    id: 15,
    title: '画面构图创作',
    slug: 'creative-framing-advanced',
    description: '深入学习构图原理和视觉平衡，创作专业级商业插画作品，掌握空间布局和视觉引导',
    price: 1499,
    stage: 'advanced',
    cover: creativeFramingAdvancedCover480,
    tags: ['插画', '构图设计', '商业插画', 'AIGC'],
    rating: 4.9,
    enrolled: 350,
    duration: '65小时',
    level: '高级',
    instructor: '王老师'
  }
]

// Mock Program数据（学习路径配置）
const mockPrograms: Program[] = [
  {
    id: 1,
    slug: 'aigc-intermediate',
    name: '会员进阶路线',
    subtitle: 'AIGC技能提升的系统化学习路径',
    description:
      '会员进阶路线专为已掌握基础技能、希望系统提升AIGC实战能力的学员设计。通过精心编排的课程体系，你将深入学习AI设计工具的高级应用，掌握从设计构思到作品落地的完整流程。',
    stage: 'intermediate',
    heroBackground: 'linear-gradient(135deg, rgba(30, 127, 152, 0.05) 0%, rgba(42, 155, 184, 0.08) 100%)',
    outcomes: [
      '掌握Photoshop、Illustrator等工具的高级AI功能',
      '具备独立完成商业级设计项目的能力',
      '理解AIGC在不同设计场景的应用策略',
      '建立系统化的AI设计工作流程'
    ],
    benefitsTitle: '会员专享权益',
    benefits: [
      { icon: 'fas fa-crown text-warning', text: '访问所有进阶课程' },
      { icon: 'fas fa-download text-primary', text: '下载课程配套素材' },
      { icon: 'fas fa-users text-info', text: '加入专属学习社群' },
      { icon: 'fas fa-headset text-success', text: '享受优先技术支持' }
    ],
    buttonText: '立即加入会员',
    buttonClass: 'btn-tech-blue',
    courseDescription: '精心挑选的进阶课程，助你快速提升'
  },
  {
    id: 2,
    slug: 'ai-designer-advanced',
    name: '高阶技能路径',
    subtitle: '专业级AI设计师的实战与项目落地之路',
    description:
      '高阶技能路径面向希望达到专业级AI设计师水平、能够独立承接大型商业项目的学员。通过深度实战训练和真实项目演练，你将掌握从需求分析到作品交付的完整项目流程，具备进入设计行业工作或接单创业的能力。',
    stage: 'advanced',
    heroBackground: 'linear-gradient(135deg, rgba(139, 69, 19, 0.05) 0%, rgba(184, 134, 11, 0.08) 100%)',
    outcomes: [
      '掌握多款专业AI设计工具的综合应用',
      '具备承接大型商业项目的能力和经验',
      '建立完整的项目管理和交付流程',
      '获得真实商业项目作品集'
    ],
    benefitsTitle: '高阶会员权益',
    benefits: [
      { icon: 'fas fa-crown text-warning', text: '访问所有高阶课程' },
      { icon: 'fas fa-project-diagram text-primary', text: '参与真实项目实战' },
      { icon: 'fas fa-briefcase text-info', text: '获得就业指导服务' },
      { icon: 'fas fa-certificate text-success', text: '颁发专业技能证书' }
    ],
    buttonText: '立即升级高阶会员',
    buttonClass: 'btn-premium-brown',
    courseDescription: '高阶实战课程，助你成为专业AI设计师'
  }
]

export const useCourseStore = defineStore('course', {
  state: () => ({
    courses: mockCourses, // 直接使用新三级体系的课程数据
    programs: mockPrograms, // Program学习路径配置
    currentStage: 'basic' as StageKey, // 默认阶段：basic（入门基础）
    selectedTags: [] as string[],
    showVipOnly: false,
    searchKeyword: ''
  }),
  getters: {
    // 运行时校验：确保 stage 参数合法，fail-fast 策略
    getCoursesByStage: (state) => (stage: string): Course[] => {
      assertStageKey(stage)
      return state.courses.filter((c) => c.stage === stage)
    },
    getCourseBySlug: state => (slug: string) => state.courses.find(c => c.slug === slug),

    // ============================================
    // Program 相关 Getters
    // ============================================

    // 根据slug获取Program配置
    getProgramBySlug: state => (slug: string) => {
      return state.programs.find(p => p.slug === slug)
    },

    // 验证Program slug是否存在
    programExists: state => (slug: string) => {
      return state.programs.some(p => p.slug === slug)
    },

    // 获取Program对应的课程列表
    getProgramCourses: (state) => (programSlug: string): Course[] => {
      const program = state.programs.find(p => p.slug === programSlug)
      if (!program) return []

      // 使用assertStageKey确保stage合法
      const stage: string = program.stage
      assertStageKey(stage)
      return state.courses.filter(c => c.stage === stage)
      // 注意：advanced阶段当前返回[]，将来添加数据后自动显示
    },
    filteredCourses: state => {
      let result = state.courses
      if (state.showVipOnly) {
        result = result.filter(c => c.isVip)
      } else if (state.currentStage) {
        result = result.filter(c => c.stage === state.currentStage)
      }
      if (state.selectedTags.length) {
        result = result.filter(c => c.tags && c.tags.some(t => state.selectedTags.includes(t)))
      }
      if (state.searchKeyword) {
        const k = state.searchKeyword.toLowerCase()
        result = result.filter(c => c.title.toLowerCase().includes(k))
      }
      return result
    },
    popularTags: state => {
      // 手动指定热门技术标签列表，可以根据需要添加、删除或修改
      return ['AIGC', 'PhotoshopAI', 'AI+logo', 'UE', '项目', '设计', '插画', 'Web', 'Django']
    }
  },
  actions: {
    setCurrentStageOnly(stage: StageKey) {
      this.currentStage = stage
    },
    toggleTag(tag: string) {
      // 单选模式：如果点击的是已选中的标签，则取消选择；否则选择新标签
      if (this.selectedTags.includes(tag)) {
        this.selectedTags = []
      } else {
        this.selectedTags = [tag]
      }
    },
    setShowVipOnly(vip: boolean) {
      this.showVipOnly = vip
    }
  }
})
