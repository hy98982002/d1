> Reference only (non-normative)
> These are example animation patterns used in this project.
> They are NOT mandatory rules.

# 动画效果参考示例

## 核心原则

- 动画仅用于结构引导，而非吸引注意
- 采用逐元素淡入 / 轻微滑入 / 轻度模糊
- 禁止使用 `opacity: 0` 隐藏内容
- 动画使用 `animation-fill-mode: both`
- 位移不超过 12px（Y 轴）/ 16px（X 轴）
- blur 强度不超过 6px
- 动画仅作为状态变化，不应创建或隐藏内容
- 统一使用 `ease-out` 缓动函数，保持动画风格一致性
- 动画时长控制在 0.3s-0.8s 之间，确保流畅不卡顿

## 推荐的动画实现

```css
/* 淡入动画 */
.fade-in {
  animation: fadeIn 0.6s ease-out both;
}

/* 滑入动画 */
.slide-in {
  animation: slideIn 0.5s ease-out both;
}

/* 模糊淡入动画 */
.blur-in {
  animation: blurIn 0.8s ease-out both;
}

/* 淡入动画关键帧 */
@keyframes fadeIn {
  from {
    transform: translateY(12px); /* 不超过12px */
    filter: blur(4px); /* 不超过6px */
  }
  to {
    transform: translateY(0);
    filter: blur(0);
  }
}

/* 滑入动画关键帧 */
@keyframes slideIn {
  from {
    transform: translateX(16px); /* 不超过16px */
    filter: blur(3px); /* 不超过6px */
  }
  to {
    transform: translateX(0);
    filter: blur(0);
  }
}

/* 模糊淡入动画关键帧 */
@keyframes blurIn {
  from {
    filter: blur(6px); /* 不超过6px */
    transform: scale(0.98);
  }
  to {
    filter: blur(0);
    transform: scale(1);
  }
}
```

## 响应式动画考虑

```css
/* 移动端优化 */
@media (max-width: 768px) {
  .fade-in {
    animation-duration: 0.4s; /* 移动端动画更短 */
  }
  
  .slide-in {
    animation-duration: 0.3s;
  }
}
```

## 禁用动画的情况

```css
/* 支持 prefers-reduced-motion 媒体查询 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 最佳实践

1. **渐进增强**：动画应作为增强功能，而非核心功能
2. **性能优先**：避免复杂动画，使用 CSS 动画而非 JavaScript 动画
3. **一致性**：整个应用使用统一的动画风格
4. **可访问性**：支持 `prefers-reduced-motion` 媒体查询
5. **适度使用**：只在必要时使用动画，避免过度动画
6. **测试**：在不同设备和网络条件下测试动画性能