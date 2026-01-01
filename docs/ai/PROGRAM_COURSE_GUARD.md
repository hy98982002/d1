👉 **Program / Course 完整 Guard（≤10 行，可直接嵌入）**。
这是**AI 的“权限边界声明”，不是说明文**。

---

## 🔒 AI 强制执行 Prompt（PROGRAM / COURSE GUARD｜≤10 行）

```
Before any change involving Program or Course, you MUST verify:
1) Course represents a single atomic teaching unit; it must NOT define learning order or paths.
2) Program represents an ordered learning path; ordering (hasPart/isPartOf) is allowed ONLY in Program.
3) Course MUST NOT use position/order unless inside a Program context.
4) Program MUST NOT act as a generic course collection or category.
5) Course may reference Program and Level, but MUST NOT define their meaning.
6) Program may reference Level as target audience, but MUST NOT redefine Level.
7) JSON-LD relations must follow: Program hasPart → Course; Course isPartOf → Program.
8) Topics/Tags MUST NOT use hasPart with Course.
If any rule fails → STOP execution and request human review.
```

---

### 🔁 和 Level Guard 的配合方式（一句话）

> **Level Guard 管“难度实体”，Program / Course Guard 管“路径与原子性”**
> 两者叠加后，AI **在结构上无路可越权**。

---



* AI **不能把 Course 写成 Program**
* AI **不能把 Program 写成分类页**
* AI **不能偷偷在 Course 里塞学习顺序**

---