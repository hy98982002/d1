将来我在建立AEo中levels/这个实体页的时候，如果调用CourseCard.vue不希望出现hover卡，只想显示的单纯的课程卡，好实现吗，还是我要为了levels/单独另外设计一个CourseCardLevel.vue
根据对当前CourseCard.vue组件的分析，**你完全可以复用现有组件**，无需单独创建新组件。实现方法非常简单，只需要通过**添加一个props控制**即可。

### 实现方案：通过Props控制Hover卡显示

1. **修改CourseCard.vue组件**，添加一个控制hover卡显示的prop：

   ```vue
   <script setup lang="ts">
   // Props定义
   interface Props {
     course: Course
     stage?: StageKey
     index?: number
     showHoverCard?: boolean // 添加这个prop
   }

   const props = withDefaults(defineProps<Props>(), {
     stage: undefined,
     index: 0,
     showHoverCard: true // 默认显示hover卡
   })
   </script>
   ```

2. **在模板中使用v-if条件渲染hover卡**：

   ```vue
   <!-- hover详情弹窗 -->
   <div v-if="showHoverCard" class="course-pop" data-track="view_card">
     <!-- 弹窗内容保持不变 -->
   </div>
   ```

3. **在levels/页面中使用时，传递:show-hover-card="false"**：

   ```vue
   <CourseCard
     v-for="course in courses"
     :key="course.id"
     :course="course"
     :show-hover-card="false" <!-- 关闭hover卡 -->
   />
   ```

### 为什么这是最佳方案？

1. **符合DRY原则**：避免了代码冗余，复用现有组件
2. **灵活性高**：可以在不同场景下控制hover卡的显示/隐藏
3. **维护成本低**：只需要维护一个组件，而不是两个
4. **实现简单**：只需要添加一个prop和条件渲染，改动很小
5. **语义清晰**：通过props明确表达组件的使用意图

### 备选方案：通过CSS类名控制

如果不想修改组件代码，也可以通过添加特定类名来隐藏hover卡：

1. **在levels/页面中使用时添加类名**：

   ```vue
   <div class="course-card-wrapper no-hover">
     <CourseCard
       v-for="course in courses"
       :key="course.id"
       :course="course"
     />
   </div>
   ```

2. **添加CSS规则**：

   ```css
   .no-hover .course-pop {
     display: none !important;
   }
   ```

但这种方式不如props控制直观和灵活，推荐使用第一种方案。

### 结论

**不需要创建新的CourseCardLevel.vue组件**，只需要对现有CourseCard.vue组件进行简单修改，添加一个控制hover卡显示的prop即可。这种方式既保持了代码的复用性，又提供了足够的灵活性来适应不同的使用场景。