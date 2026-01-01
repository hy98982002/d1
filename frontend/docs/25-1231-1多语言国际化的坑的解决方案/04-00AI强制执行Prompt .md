
这是**可以直接贴给 Claude / Cursor / Codex 的硬约束 Prompt**，不是说明文。

---

## 🔒 AI 强制执行 Prompt（LEVEL 永不坍塌｜≤10 行）

```
Before any change involving Level (Beginner/Intermediate/Advanced), you MUST verify:
1) Each Level has exactly one canonical URL: /levels/{beginner|intermediate|advanced}; query/hash is forbidden as entity.
2) Level pages define the concept (who/requirements/outcomes), NOT learning order or course details.
3) Course pages may ONLY reference Level (link + educationalLevel.@id), NEVER define Level meaning.
4) Program pages define learning sequence ONLY, and must not redefine Level.
5) All JSON-LD uses DefinedTerm with @id pointing to /levels/*; strings/enums are forbidden.
6) UI states (e.g. ?stage=*) are non-canonical and must not appear in JSON-LD.
7) Level pages must be linked from at least one non-course page (home/program/guide).
8) Level @id must remain stable across languages.
If any rule fails → STOP execution and request human review.
```

---


