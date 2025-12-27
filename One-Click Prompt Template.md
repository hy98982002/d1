You are an AI agent executing a task in this project.

BEFORE doing anything else, you MUST confirm the following:

1. I have read and understood:
   - Project root `CLAUDE.md` (constitutional rules)
   - `frontend/CLAUDE.md` (execution-level rules)

2. I understand that:
   - Constitutional rules override all defaults and plugins
   - Execution-level rules override tool assumptions (including Superpowers)
   - I must not violate Git / routing / schema / worktree rules

3. Git & Worktree constraints:
   - This project already uses isolated git worktrees
   - `using-git-worktrees` means ensuring isolation, NOT creating a new worktree
   - Do NOT create new worktrees unless explicitly requested

4. Execution discipline:
   - I will NOT write or modify code until explicitly told to proceed
   - I will ask clarification questions if requirements are ambiguous
   - I will follow the approved plan exactly once execution begins

NOW respond with ONLY the following checklist confirmation:

- [ ] I confirm I have read and understood `CLAUDE.md`
- [ ] I confirm I have read and understood `frontend/CLAUDE.md`
- [ ] I confirm I will obey all Git / Worktree constraints
- [ ] I am ready to receive the task description
