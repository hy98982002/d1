


## `docs/ai/snippets/a11y-reference-snippets.md`

下面是**可直接落盘的完整版本**：

* 不教学
* 不啰嗦
* 不升级为规范
* 只覆盖 **80% 会真实出问题的 a11y 场景**

---


# A11y Reference Snippets (Non-Normative)

⚠️ This document is **REFERENCE ONLY**.  
It provides **common implementation patterns** for accessibility and keyboard interaction.

- This file is **NOT a specification**
- This file is **NOT normative**
- All authoritative rules live in:
  - `/CLAUDE.md`
  - `/frontend/CLAUDE.md`
  - `/AI_EXECUTION_CONTEXT.md`

Use these snippets **only when implementing UI behavior** that involves interaction, focus, or motion.

---

## 1. Buttons & Interactive Elements

### ✅ Correct: Native button

```html
<button type="button" @click="onSubmit">
  Submit
</button>
````

### ❌ Forbidden: Div or span as button

```html
<div @click="onSubmit">Submit</div>
<span @click="onSubmit">Submit</span>
```

---

## 2. Links vs Buttons

### ✅ Correct: Navigation uses `<a>`

```html
<a href="/course/ai-design-beginner">
  View Course
</a>
```

### ✅ Correct: Action uses `<button>`

```html
<button type="button" @click="openModal">
  Open Modal
</button>
```

---

## 3. Modal Focus Management (Vue 3)

```ts
import { ref, nextTick } from 'vue'

const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const modalRef = ref<HTMLElement | null>(null)

const openModal = async () => {
  isOpen.value = true
  await nextTick()
  modalRef.value?.focus()
}

const closeModal = () => {
  isOpen.value = false
  triggerRef.value?.focus()
}
```

**Key points**:

* Focus moves into modal on open
* Focus returns to trigger on close
* Modal root must be focusable (`tabindex="-1"`)

---

## 4. Keyboard Activation

### ✅ Correct: Native behavior (preferred)

```html
<button @click="toggle">Toggle</button>
<a href="/path">Go</a>
```

### ⚠️ Edge case: Custom focusable element (discouraged)

```html
<div
  tabindex="0"
  role="button"
  @click="toggle"
  @keydown.enter.prevent="toggle"
  @keydown.space.prevent="toggle"
>
  Toggle
</div>
```

Use only when native elements are impossible.

---

## 5. Focus Visibility

### ❌ Forbidden

```css
:focus {
  outline: none;
}
```

### ✅ Correct

```css
:focus-visible {
  outline: 2px solid #0d6efd;
  outline-offset: 2px;
}
```

---

## 6. Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 7. Images

### ✅ Informative image

```html
<img src="/images/course-cover.webp" alt="AI Design Beginner course cover">
```

### ✅ Decorative image

```html
<img src="/images/bg-pattern.svg" alt="">
```

---

## 8. Forms

### ✅ Label association

```html
<label for="email">Email</label>
<input id="email" type="email">
```

### ✅ Additional instructions

```html
<input
  id="password"
  type="password"
  aria-describedby="password-hint"
/>
<p id="password-hint">
  Minimum 8 characters
</p>
```

---

## 9. Escape Key Handling

```ts
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}
```

Attach only when the modal or dropdown is active.

---

## 10. Common Anti-Patterns (Do Not Copy)

* Relying on hover only
* Removing focus outline
* Using `div` for buttons
* Hard-coding tabindex order
* Animations without reduced-motion fallback

---

## Final Reminder

This file exists to **reduce implementation mistakes**,
not to define rules.

If a snippet conflicts with:

* `/CLAUDE.md`
* `/frontend/CLAUDE.md`
* `/AI_EXECUTION_CONTEXT.md`

👉 **The snippet is wrong.**

```


