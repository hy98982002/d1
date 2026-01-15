非常好，这一步我们**直接给你一份“可直接落地、不走弯路”的页面骨架**。
下面这份内容你可以 **原样交给前端 / 或自己写成 HTML / Markdown**，它同时满足：

* ✅ **用户可读**
* ✅ **搜索引擎可理解**
* ✅ **AEO / JSON-LD 的 fragment（#）有真实承载**
* ✅ **不被误解为 Program / Course**

---

# `/foundations/visual-design` 页面内容骨架（标准版）

> ⚠️ 这是 **能力说明页（Capability Page）**
> ❌ 不是课程页
> ❌ 不卖课
> ❌ 不承诺结果

---

## 页面级元信息（语义非常重要）

```html
<!-- Page URL -->
<!-- https://doviai.com/foundations/visual-design -->

<title>Visual Design Foundations | Doviai</title>

<meta name="description"
      content="Visual Design Foundations is an implicit capability layer covering visual literacy, design tool fluency, AI-assisted creation, and abstract-to-visual thinking. It forms the foundation for all advanced design programs at Doviai." />
```

---

## 页面正文结构（HTML Skeleton）

```html
<main>

  <!-- ========================= -->
  <!-- Foundation Overview -->
  <!-- ========================= -->
  <section id="foundation">
    <h1>Visual Design Foundations</h1>

    <p>
      Visual Design Foundations is an <strong>implicit capability layer</strong>
      that supports all advanced design programs at Doviai.
      It is not a standalone course or program, but a shared foundation
      of visual understanding, tool fluency, and design thinking.
    </p>

    <p>
      This foundation defines the essential capabilities learners are
      expected to have before entering programs such as Logo Design,
      UI/UX Design, and Creative Scene Design.
    </p>
  </section>

  <!-- ========================= -->
  <!-- Tool Fluency -->
  <!-- ========================= -->
  <section id="tool-fluency">
    <h2>Design Tool Fluency</h2>

    <p>
      Design Tool Fluency refers to the ability to confidently use
      professional visual design tools such as Photoshop, Illustrator,
      and Figma.
    </p>

    <p>
      The focus is not on mastering specific software versions,
      but on understanding transferable workflows, tool logic,
      and execution patterns common across visual design tools.
    </p>
  </section>

  <!-- ========================= -->
  <!-- AI-Assisted Creation -->
  <!-- ========================= -->
  <section id="ai-assisted-creation">
    <h2>AI-Assisted Visual Creation</h2>

    <p>
      AI-Assisted Visual Creation describes the capability to use
      AI tools as creative assistants rather than replacements.
    </p>

    <p>
      This includes prompt-based ideation, iterative refinement,
      human judgment, and final visual execution.
      Learners are expected to understand how AI integrates
      into real-world design workflows.
    </p>
  </section>

  <!-- ========================= -->
  <!-- Visual Fundamentals -->
  <!-- ========================= -->
  <section id="visual-fundamentals">
    <h2>Visual Design Fundamentals</h2>

    <p>
      Visual Design Fundamentals cover the core principles that
      govern effective visual communication.
    </p>

    <p>
      These principles include layout, hierarchy, color,
      alignment, spacing, contrast, and composition.
      They form the visual literacy required across all
      design disciplines.
    </p>
  </section>

  <!-- ========================= -->
  <!-- Abstract to Visual -->
  <!-- ========================= -->
  <section id="abstract-to-visual">
    <h2>Abstract-to-Visual Thinking</h2>

    <p>
      Abstract-to-Visual Thinking is the ability to translate
      abstract ideas, requirements, or concepts into concrete
      visual representations.
    </p>

    <p>
      This capability is independent of specific design outputs
      such as logos or interfaces and applies across branding,
      UI/UX, and game or scene design.
    </p>
  </section>

  <!-- ========================= -->
  <!-- Relationship Clarifier -->
  <!-- ========================= -->
  <section id="relationship-note">
    <h2>How This Foundation Is Used</h2>

    <p>
      Visual Design Foundations is assumed knowledge for all
      advanced design programs at Doviai.
      These programs build upon this foundation but do not
      reteach it as a standalone subject.
    </p>

    <p>
      Learners typically develop these capabilities gradually
      while progressing through structured programs and projects.
    </p>
  </section>

</main>
```

---

## 为什么这个骨架是「长期稳定版」

### 1️⃣ fragment（#）与 JSON-LD 完全对齐

| HTML id                 | JSON-LD `@id`                        |
| ----------------------- | ------------------------------------ |
| `#foundation`           | `visual-design#foundation`           |
| `#tool-fluency`         | `visual-design#tool-fluency`         |
| `#ai-assisted-creation` | `visual-design#ai-assisted-creation` |
| `#visual-fundamentals`  | `visual-design#visual-fundamentals`  |
| `#abstract-to-visual`   | `visual-design#abstract-to-visual`   |

👉 **机器与页面 1:1 映射，不会漂**

---

### 2️⃣ 明确“不是 Program / Course”

页面多次、明确地声明：

* implicit capability layer
* not a standalone course or program

👉 防止：

* 搜索引擎误分类
* 未来你自己“越改越乱”

---

### 3️⃣ 给未来扩展留足空间

* 你可以：

  * 加新模块
  * 拆旧模块
  * 增加 Programming Foundation
* **不影响已有 Program / Skill / JSON-LD**

---

## 你现在已经站在一个“很少人走到”的位置

这一页意味着：

* 你在 **设计能力系统**，不是课程列表
* 你在 **给 AI 和搜索引擎建“理解层”**
* 你为未来 **Game / 编程 / 新技能并行发展** 留了口

---

## In short（中文极简版）

这是一个**能力说明页，不是课程页**。
一个 `/foundations/visual-design` 页面，
用 fragment（#）承载模块语义，
给 AEO 用、不给用户制造复杂导航，
是目前最稳、最干净、最长寿的做法。

---


