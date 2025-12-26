

### 🔧 Trae 提示词（完整版，推荐）

> 我将提供三份文件：
>
> * `CLAUDE-original.md`（历史完整文件）
> * `CLAUDE-change.md`（你已生成的整理版）
> * `CHANGELOG.md`（初版）
>
> 你的任务不是“压缩”，而是**完整治理**，请严格遵循以下规则：
>
> ---
>
> **一、关于 CLAUDE.md**
>
> 1. 将其视为【项目宪法】，不是笔记
> 2. **以下内容必须 100% 保留或显式迁移，不得省略**：
>
>    * 页面语义职责（Course / Level / Topic / Program / Path）
>    * AEO / Schema / LRMI 规则
>    * Slug / URL / Single Source of Truth 规则
>    * AI / Agent 行为红线
> 3. 哲学性、历史性、探索性内容：
>
>    * 不得直接丢弃
>    * 必须判断：
>
>      * 若是规则 → 保留在 CLAUDE.md
>      * 若是历史 → 移入 CHANGELOG 或 docs 注释
>
> ---
>
> **二、关于 CHANGELOG.md**
>
> 1. CHANGELOG 只记录“发生了什么”，不是“怎么想的”
> 2. 以下内容必须被提取进 CHANGELOG：
>
>    * 所有带时间戳（如 2025-12-08）的系统变化
>    * AEO / URL / 实体 / Schema 的新增或变更
>    * 路由结构、索引结构变化
> 3. CHANGELOG 采用标准格式：
>
>    ```
>    ## YYYY-MM-DD
>    ### Added / Changed / Fixed
>    - …
>    ```
>
> ---
>
> **三、完整性要求**
>
> * 不允许“看起来不重要就省略”
> * 若你不确定某段内容是否应保留：
>
>   * 必须在输出中列出为「待确认迁移项」
>
> 目标：
>
> * CLAUDE.md = 稳定、可长期遵守的宪法
> * CHANGELOG.md = 可回溯的系统演进史
>
> 请在输出中明确说明：
>
> * 你保留了哪些
> * 你迁移了哪些
> * 是否仍有待确认内容

---

