我需要找出首页中当鼠标hover到课程卡时弹出的更详细的hover卡是通过哪个组件实现的。首先查看首页组件HomeView.vue，了解它使用了哪些课程相关的组件。
        
            
toolName: view_files
            
status: success
          
            
filePath: /Users/dongqingzhai/Desktop/Projects/UAI_project--frontend-4/frontend/src/views/HomeView.vue
          
从HomeView.vue中可以看到，课程专区是通过CampSection组件实现的。我需要查看CampSection组件的代码，了解它内部是如何实现课程卡和hover效果的。
        
            
toolName: view_files
            
status: success
          
            
filePath: /Users/dongqingzhai/Desktop/Projects/UAI_project--frontend-4/frontend/src/components/CampSection.vue
          
从CampSection组件中可以看到，课程是通过CourseGrid组件展示的。我需要查看CourseGrid组件的代码，了解它内部是如何实现课程卡和hover效果的。
        
            
toolName: view_files
            
status: success
          
            
filePath: /Users/dongqingzhai/Desktop/Projects/UAI_project--frontend-4/frontend/src/components/CourseGrid.vue
          
从CourseGrid组件中可以看到，课程卡是通过CourseCard组件实现的。我需要查看CourseCard组件的代码，了解它内部是如何实现hover效果和弹出详细卡片的。
        
            
toolName: view_files
            
status: success
          
            
filePath: /Users/dongqingzhai/Desktop/Projects/UAI_project--frontend-4/frontend/src/components/CourseCard.vue
          
我已经找到了首页课程卡 hover 效果的实现组件。通过分析代码结构，发现：

1. **首页课程区域**由 `CampSection` 组件实现，它位于 `frontend/src/components/CampSection.vue`
2. `CampSection` 内部使用 `CourseGrid` 组件展示课程列表，位于 `frontend/src/components/CourseGrid.vue`
3. `CourseGrid` 内部使用 `CourseCard` 组件展示单个课程卡片，位于 `frontend/src/components/CourseCard.vue`
4. **hover 详情弹窗**在 `CourseCard.vue` 组件的第 77-107 行实现，通过 `.course-pop` 类的元素创建
5. **hover 效果触发**：当鼠标悬停在课程卡片上时，通过 CSS 选择器 `.card:hover .course-pop` 控制弹窗的显示与隐藏，实现了平滑的 hover 动画效果

这个 hover 弹窗设计包含了课程的详细信息、讲师信息以及"立即观看"和"添加到购物车"按钮，为用户提供了丰富的交互体验。