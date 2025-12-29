# 无障碍设计示例

## 1. 图像无障碍

```vue
<!-- ✅ 正确 - 为所有图像提供有意义的 alt 属性 -->
<img :src="courseCover" alt="Python 基础课程封面" />

<!-- ✅ 装饰性图像使用空 alt 属性 -->
<img :src="decorativeImg" alt="" />

<!-- ✅ 复杂图像使用 longdesc 属性 -->
<img :src="complexChart" alt="课程完成率统计图表" longdesc="#chart-description" />
<div id="chart-description" class="sr-only">
  该图表显示了我们平台上不同课程的完成率，其中 Python 基础课程完成率最高，达到 85%。
</div>

<!-- ❌ 避免缺少 alt 属性 -->
<!-- <img :src="courseCover" /> -->
```

## 2. 表单无障碍

```vue
<!-- ✅ 正确 - 使用 label 与表单控件关联 -->
<label for="username">用户名</label>
<input type="text" id="username" name="username" />

<!-- ✅ 使用 aria-label 当没有可见标签时 -->
<input type="search" aria-label="搜索课程" />

<!-- ✅ 使用 aria-describedby 提供额外说明 -->
<input type="password" aria-describedby="password-hint" />
<p id="password-hint">密码至少包含8个字符</p>

<!-- ✅ 为必填字段添加 aria-required 属性 -->
<label for="email">邮箱 <span class="text-danger">*</span></label>
<input type="email" id="email" name="email" aria-required="true" />

<!-- ✅ 使用 fieldset 和 legend 对相关表单控件进行分组 -->
<fieldset>
  <legend>性别</legend>
  <div class="form-check">
    <input class="form-check-input" type="radio" name="gender" id="male" value="male">
    <label class="form-check-label" for="male">男</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="radio" name="gender" id="female" value="female">
    <label class="form-check-label" for="female">女</label>
  </div>
</fieldset>
```

## 3. 键盘可访问性

```vue
<!-- ✅ 正确 - 可聚焦元素 -->
<button @click="submitForm">提交</button>
<a href="/course">课程列表</a>
<input type="text" />

<!-- ✅ 添加 tabindex 使非默认可聚焦元素可聚焦 -->
<div tabindex="0" @keydown.enter="toggleMenu" @click="toggleMenu">
  点击或按 Enter 切换菜单
</div>

<!-- ✅ 管理模态框焦点 -->
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const modalVisible = ref(false)
const modalRef = ref(null)
const triggerRef = ref(null)

const openModal = () => {
  modalVisible.value = true
  nextTick(() => {
    modalRef.value?.focus()
  })
}

const closeModal = () => {
  modalVisible.value = false
  triggerRef.value?.focus()
}
</script>

<template>
  <button ref="triggerRef" @click="openModal">打开模态框</button>
  
  <div v-if="modalVisible" class="modal" tabindex="-1" ref="modalRef" @keydown.esc="closeModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">模态框标题</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="关闭"></button>
        </div>
        <div class="modal-body">
          <p>模态框内容</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">关闭</button>
          <button type="button" class="btn btn-primary">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>
```

## 4. 焦点可见性

```css
/* ✅ 使用 :focus-visible 为键盘焦点提供清晰的视觉反馈 */
button:focus-visible,
input:focus-visible,
a:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* ✅ 确保自定义组件也有焦点样式 */
.custom-button:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* ❌ 禁止完全移除焦点指示器 */
/* button:focus {
  outline: none;
} */
```

## 5. ARIA 角色和属性

```vue
<!-- ✅ 使用正确的 ARIA 角色 -->
<nav aria-label="主导航">
  <ul>
    <li><a href="/">首页</a></li>
    <li><a href="/courses">课程</a></li>
    <li><a href="/about">关于我们</a></li>
  </ul>
</nav>

<!-- ✅ 使用 aria-expanded 表示折叠面板状态 -->
<button 
  @click="togglePanel" 
  :aria-expanded="isExpanded"
  aria-controls="panel-content"
>
  展开/折叠面板
</button>
<div id="panel-content" v-show="isExpanded">
  面板内容
</div>

<!-- ✅ 使用 aria-live 通知动态内容变化 -->
<div aria-live="polite" class="toast-container">
  <!-- 动态添加的通知会被屏幕阅读器读取 -->
</div>
```

## 最佳实践

1. **遵循 WCAG 2.1 AA 标准**：确保所有内容都符合 WCAG 2.1 AA 级标准
2. **使用语义化 HTML**：优先使用正确的 HTML 标签，而不是 ARIA 属性
3. **测试键盘导航**：确保所有功能都可以通过键盘访问
4. **提供清晰的焦点指示**：使用 `:focus-visible` 为键盘焦点提供视觉反馈
5. **考虑颜色对比度**：确保文本与背景的对比度至少为 4.5:1
6. **支持辅助技术**：测试屏幕阅读器和其他辅助技术
7. **使用 ARIA 适当**：只在必要时使用 ARIA 属性，避免过度使用
8. **提供文本替代方案**：为所有非文本内容提供文本替代方案