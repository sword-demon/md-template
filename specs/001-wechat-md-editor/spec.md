# Feature Specification: 微信公众号 Markdown 编辑器

**Feature Branch**: `001-wechat-md-editor`  
**Created**: 2026-02-01  
**Status**: Draft  
**Input**: User description: "构建一个左侧输入markdown文章内容,右侧渲染为对应的微信公众号富文本内容,可以直接复制富文本内容到微信公众号进行发布. 暂时富文本的风格定义为: Neobrutalism 风格"

## Clarifications

### Session 2026-02-01

- Q: 网站 UI 本身是否也采用 Neobrutalism 风格？ → A: 是，整个网站风格都是 Neobrutalism 风格
- Q: 是否需要支持多种输出样式？ → A: 导航栏暂时留有风格选项入口，当前仅实现 Neobrutalism，为后续新增风格预留扩展点
- Q: 数学公式支持是否在 v1.0 范围内？ → A: 否，数学公式（LaTeX/KaTeX）标记为 Future，不在 v1.0 范围内

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 实时预览 Markdown 内容 (Priority: P1)

作为一名内容创作者，我希望在左侧输入 Markdown 文章内容时，右侧能够实时显示渲染后的富文本预览，这样我可以即时看到文章的最终排版效果并进行调整。

**Why this priority**: 实时预览是编辑器的核心功能，没有它用户无法验证排版效果。这是产品的基础价值主张。

**Independent Test**: 可以通过在编辑区输入 Markdown 内容并观察预览区是否正确渲染来独立测试。即使没有复制功能，用户也能获得预览价值。

**Acceptance Scenarios**:

1. **Given** 用户打开编辑器页面, **When** 用户在左侧输入 `# 标题` 文本, **Then** 右侧预览区在 300ms 内显示带有 Neobrutalism 风格的一级标题
2. **Given** 用户已输入部分内容, **When** 用户继续输入新的段落, **Then** 预览区自动更新且保持滚动位置同步
3. **Given** 用户输入包含代码块的内容, **When** 预览区渲染完成, **Then** 代码块显示语法高亮并带有 Neobrutalism 风格的边框和背景

---

### User Story 2 - 一键复制富文本到微信 (Priority: P1)

作为一名公众号运营者，我希望能够一键复制渲染后的富文本内容，直接粘贴到微信公众号编辑器中使用，这样我可以节省排版时间。

**Why this priority**: 复制功能是产品的核心价值输出，是用户使用本工具的最终目的。与 P1 并列因为两者缺一不可。

**Independent Test**: 可以通过点击复制按钮并粘贴到微信公众号后台来测试，验证样式是否正确保留。

**Acceptance Scenarios**:

1. **Given** 预览区已渲染文章内容, **When** 用户点击"复制"按钮, **Then** 富文本内容被复制到剪贴板，并显示"复制成功"提示
2. **Given** 用户已复制内容, **When** 用户粘贴到微信公众号后台编辑器, **Then** 文章样式（标题、段落、列表、代码块、引用）与预览区一致
3. **Given** 文章包含图片链接, **When** 用户复制并粘贴到微信, **Then** 图片正确显示（使用公开可访问的 URL）

---

### User Story 3 - Neobrutalism 风格样式 (Priority: P2)

作为一名追求独特视觉风格的创作者，我希望渲染的富文本内容采用 Neobrutalism 设计风格，这样我的公众号文章能够在视觉上脱颖而出。

**Why this priority**: 风格是差异化特性，在基础功能（预览+复制）完成后增强用户体验。

**Independent Test**: 可以通过视觉检查预览区的样式元素（边框、阴影、配色）是否符合 Neobrutalism 风格来测试。

**Acceptance Scenarios**:

1. **Given** 用户输入任意 Markdown 内容, **When** 预览区渲染完成, **Then** 标题使用粗重黑色边框（2-4px）和偏移阴影效果
2. **Given** 用户输入代码块, **When** 预览区渲染完成, **Then** 代码块使用高饱和度背景色和粗边框
3. **Given** 用户输入引用块, **When** 预览区渲染完成, **Then** 引用块使用鲜明的左侧边框和纯色背景

---

### User Story 4 - Markdown 语法全面支持 (Priority: P2)

作为一名技术博客作者，我希望编辑器能够支持完整的 Markdown 语法，包括代码块、表格、图片等，这样我可以创作技术文章。

**Why this priority**: 完整的 Markdown 支持扩展了用户群体，是基础功能的自然延伸。

**Independent Test**: 可以通过输入各种 Markdown 语法元素并验证渲染结果来独立测试。

**Acceptance Scenarios**:

1. **Given** 用户输入 GFM 风格表格, **When** 预览区渲染, **Then** 表格正确显示行列结构且带有 Neobrutalism 边框样式
2. **Given** 用户输入嵌套列表, **When** 预览区渲染, **Then** 列表层级正确缩进

> **Out of Scope (v1.0)**: 数学公式（LaTeX/KaTeX）支持标记为 Future，不在当前版本范围内。

---

### User Story 5 - 风格选择器入口 (Priority: P3)

作为产品的未来用户，我希望导航栏提供风格选择入口，这样当新风格上线时我可以切换不同的输出样式。

**Why this priority**: 这是扩展性预留功能，当前版本仅展示入口，不实现切换逻辑。

**Independent Test**: 可以通过检查导航栏是否显示风格选择器入口（当前仅显示 Neobrutalism）来测试。

**Acceptance Scenarios**:

1. **Given** 用户打开网站, **When** 页面加载完成, **Then** 导航栏显示风格选择器入口，当前选中"Neobrutalism"
2. **Given** 用户点击风格选择器, **When** 下拉菜单展开, **Then** 仅显示"Neobrutalism"选项（标记为当前风格）

---

### Edge Cases

- 当用户输入超过 10000 字符的长文章时，系统如何保持性能？
  - **处理方式**: 使用防抖机制（300ms）避免频繁重渲染，大文档使用虚拟滚动
- 当用户输入格式错误的 Markdown 时，系统如何处理？
  - **处理方式**: 优雅降级，显示原始文本而非报错，不阻塞其他内容渲染
- 当用户使用微信不支持的 HTML 标签或样式时，如何处理？
  - **处理方式**: 自动过滤不兼容标签，仅输出微信支持的内联样式
- 当剪贴板访问被浏览器阻止时，如何处理？
  - **处理方式**: 显示友好提示，引导用户手动选择复制或授权剪贴板权限

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系统 MUST 提供左右分栏的编辑器界面，左侧为 Markdown 输入区，右侧为富文本预览区
- **FR-002**: 系统 MUST 在用户输入变化后 300ms 内更新预览区内容
- **FR-003**: 系统 MUST 支持完整的 CommonMark Markdown 语法（标题、段落、粗体、斜体、链接、图片、代码块、列表、引用）
- **FR-004**: 系统 MUST 支持 GFM 扩展语法（表格、任务列表、删除线）
- **FR-005**: 系统 MUST 提供一键复制按钮，将富文本内容复制到系统剪贴板
- **FR-006**: 系统 MUST 在复制操作后显示视觉反馈（成功/失败提示）
- **FR-007**: 系统 MUST 使用内联样式渲染富文本，确保微信公众号编辑器兼容
- **FR-008**: 系统 MUST 应用 Neobrutalism 设计风格于输出富文本（粗边框、偏移阴影、高饱和度配色）
- **FR-009**: 系统 MUST 保持编辑区与预览区的滚动位置同步
- **FR-010**: 系统 MUST 对 Markdown 解析错误进行优雅降级处理，不中断整体渲染
- **FR-011**: 网站 UI 本身 MUST 采用 Neobrutalism 设计风格，与输出内容风格保持一致
- **FR-012**: 系统 MUST 在导航栏提供风格选择器入口，当前仅包含 Neobrutalism 选项，为后续风格扩展预留

### Key Entities

- **Article**: 用户创作的文章内容，包含原始 Markdown 文本和渲染后的 HTML 富文本
- **Style Theme**: 富文本样式配置，定义 Neobrutalism 风格的具体参数（边框宽度、阴影偏移、配色方案）；支持未来扩展新主题
- **Render Output**: 最终可复制的富文本内容，使用内联样式确保跨平台兼容

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 用户从输入 Markdown 到看到预览更新的时间不超过 500ms（含渲染）
- **SC-002**: 用户完成"编写-预览-复制-粘贴到微信"完整流程的时间不超过 2 分钟
- **SC-003**: 复制到微信公众号后，100% 的基础样式（标题、段落、列表、代码块）正确显示
- **SC-004**: 编辑器在处理 10000 字符文档时保持流畅，无明显卡顿
- **SC-005**: 90% 的用户首次使用即可成功完成复制粘贴操作，无需额外指导
- **SC-006**: 界面在主流浏览器（Chrome、Firefox、Safari、Edge 最新版本）上正常运行
- **SC-007**: 网站 UI 与输出内容在视觉风格上保持一致（均为 Neobrutalism）

## Assumptions

本规格说明基于以下合理假设：

1. **目标用户**: 主要面向微信公众号内容创作者和运营人员
2. **浏览器支持**: 仅支持现代浏览器，不考虑 IE 兼容
3. **网络环境**: 用户有稳定的网络连接（图片加载需要）
4. **无账户系统**: 初始版本不需要用户登录，文章内容仅在浏览器本地处理
5. **单一主题（可扩展）**: 初始版本仅实现 Neobrutalism 主题，但架构支持后续新增主题
6. **无后端服务**: 纯前端应用，不需要服务器端处理
