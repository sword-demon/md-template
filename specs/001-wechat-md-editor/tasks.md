# Tasks: 微信公众号 Markdown 编辑器

**Input**: Design documents from `/specs/001-wechat-md-editor/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: 规格说明未明确要求测试，本任务清单不包含测试任务。如需 TDD 方法，请重新生成。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

本项目使用 Next.js App Router 结构：
- `app/` - 页面和布局
- `components/` - React 组件
- `lib/` - 工具函数和业务逻辑
- `types/` - TypeScript 类型定义

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 项目初始化和基础配置

- [x] T001 Initialize Next.js 16 project with pnpm, TypeScript, TailwindCSS, ESLint in project root
- [x] T002 Install core dependencies: unified, remark-parse, remark-gfm, remark-rehype, rehype-stringify, zod
- [x] T003 [P] Configure TypeScript strict mode and Prettier in tsconfig.json and .prettierrc
- [x] T004 [P] Initialize shadcn/ui and install base components (button, select, toast) in components/ui/
- [x] T005 [P] Configure Neobrutalism CSS variables in app/globals.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 所有用户故事依赖的核心基础设施

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 [P] Create TypeScript types for EditorState in types/editor.ts
- [x] T007 [P] Create TypeScript types for Theme, ThemeTokens, ThemeId in types/theme.ts
- [x] T008 [P] Create TypeScript types for MarkdownAST in types/markdown.ts
- [x] T009 Create Neobrutalism theme configuration with design tokens in lib/styles/theme-config.ts
- [x] T010 Create base Markdown parser configuration with unified in lib/markdown/parser.ts
- [x] T011 [P] Create useDebounce hook in lib/hooks/use-debounce.ts
- [x] T012 Create app/layout.tsx with Neobrutalism styled root layout and font imports

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - 实时预览 Markdown 内容 (Priority: P1) 🎯 MVP

**Goal**: 用户在左侧输入 Markdown，右侧实时显示渲染后的富文本预览

**Independent Test**: 在编辑区输入 `# 标题` 并观察右侧是否在 300ms 内显示渲染结果

### Implementation for User Story 1

- [x] T013 [P] [US1] Create SplitPane layout component in components/layout/split-pane.tsx
- [x] T014 [P] [US1] Create MarkdownEditor component with textarea in components/editor/markdown-editor.tsx
- [x] T015 [P] [US1] Create RichTextPreview component in components/preview/rich-text-preview.tsx
- [x] T016 [US1] Create useMarkdown hook for parsing with debounce in lib/hooks/use-markdown.ts
- [x] T017 [US1] Create main page integrating editor and preview in app/page.tsx
- [x] T018 [US1] Implement scroll position sync between editor and preview in app/page.tsx

**Checkpoint**: User Story 1 complete - 用户可以输入 Markdown 并看到实时预览（基础样式）

---

## Phase 4: User Story 2 - 一键复制富文本到微信 (Priority: P1)

**Goal**: 用户点击复制按钮，富文本内容被复制到剪贴板，可直接粘贴到微信公众号

**Independent Test**: 点击复制按钮后粘贴到微信公众号后台，验证样式保留

### Implementation for User Story 2

- [x] T019 [P] [US2] Create copyHtml utility with Clipboard API and fallback in lib/clipboard/copy-html.ts
- [x] T020 [US2] Create CopyButton component with success/error states in components/preview/copy-button.tsx
- [x] T021 [US2] Integrate toast notifications for copy feedback in app/page.tsx
- [x] T022 [US2] Add CopyButton to preview area toolbar in components/preview/rich-text-preview.tsx

**Checkpoint**: User Story 2 complete - 用户可以一键复制富文本并粘贴到微信

---

## Phase 5: User Story 3 - Neobrutalism 风格样式 (Priority: P2)

**Goal**: 渲染的富文本内容采用完整的 Neobrutalism 设计风格（粗边框、偏移阴影、高饱和度配色）

**Independent Test**: 视觉检查预览区标题、代码块、引用块是否符合 Neobrutalism 风格

### Implementation for User Story 3

- [x] T023 [P] [US3] Create inline styles mapping for all Markdown elements in lib/styles/inline-styles.ts
- [x] T024 [US3] Create neobrutalism rehype plugin to inject inline styles in lib/markdown/plugins/neobrutalism.ts
- [x] T025 [US3] Integrate neobrutalism plugin into parser pipeline in lib/markdown/parser.ts
- [x] T026 [US3] Style website UI components with Neobrutalism in app/globals.css

**Checkpoint**: User Story 3 complete - 预览内容和网站 UI 均采用 Neobrutalism 风格

---

## Phase 6: User Story 4 - Markdown 语法全面支持 (Priority: P2)

**Goal**: 支持完整的 CommonMark + GFM 扩展语法（表格、任务列表、删除线）

**Independent Test**: 输入 GFM 表格和任务列表，验证正确渲染

### Implementation for User Story 4

- [x] T027 [P] [US4] Add remark-gfm plugin to parser for tables, task lists, strikethrough in lib/markdown/parser.ts
- [x] T028 [P] [US4] Create sanitize filter for WeChat-incompatible HTML in lib/markdown/sanitize.ts
- [x] T029 [US4] Add Neobrutalism styles for table elements in lib/styles/inline-styles.ts
- [x] T030 [US4] Add Neobrutalism styles for task list elements in lib/styles/inline-styles.ts

**Checkpoint**: User Story 4 complete - 支持完整 Markdown 语法，表格和任务列表正确渲染

---

## Phase 7: User Story 5 - 风格选择器入口 (Priority: P3)

**Goal**: 导航栏提供风格选择器入口，当前仅显示 Neobrutalism 选项

**Independent Test**: 检查导航栏是否显示风格选择器，点击后显示下拉菜单

### Implementation for User Story 5

- [x] T031 [P] [US5] Create Navbar component with Neobrutalism styling in components/layout/navbar.tsx
- [x] T032 [US5] Create ThemeSelector dropdown component in components/layout/theme-selector.tsx
- [x] T033 [US5] Integrate Navbar into app/page.tsx
- [x] T034 [US5] Wire theme state to selector (single option for now) in app/page.tsx

**Checkpoint**: User Story 5 complete - 导航栏显示风格选择器入口，为未来扩展预留

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: 性能优化、错误处理、文档更新

- [x] T035 [P] Add loading state indicator during parsing in components/preview/rich-text-preview.tsx
- [x] T036 [P] Add error boundary for graceful degradation in components/preview/rich-text-preview.tsx
- [x] T037 Optimize large document performance with useMemo in lib/hooks/use-markdown.ts
- [x] T038 [P] Add placeholder text and empty state in components/editor/markdown-editor.tsx
- [x] T039 Run quickstart.md validation checklist
- [x] T040 Final TypeScript type check and lint fix

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1: Setup
    ↓
Phase 2: Foundational
    ↓
┌───────────────────────────────────────┐
│  User Stories can run in parallel:    │
│                                       │
│  Phase 3 (US1) ←─ MVP                │
│       ↓                               │
│  Phase 4 (US2) ←─ depends on US1     │
│       ↓                               │
│  Phase 5 (US3) ←─ can parallel US4   │
│  Phase 6 (US4) ←─ can parallel US3   │
│       ↓                               │
│  Phase 7 (US5)                        │
└───────────────────────────────────────┘
    ↓
Phase 8: Polish
```

### User Story Dependencies

| Story | Depends On | Can Parallel With |
|-------|------------|-------------------|
| US1 (P1) | Foundational | - |
| US2 (P1) | US1 | - |
| US3 (P2) | US1 | US4 |
| US4 (P2) | US1 | US3 |
| US5 (P3) | Foundational | US1-US4 |

### Within Each User Story

- Types/utils before components
- Lower-level components before page integration
- Core implementation before enhancements

### Parallel Opportunities

**Phase 1 (Setup)**:
```bash
# Can run in parallel:
T003: "Configure TypeScript strict mode"
T004: "Initialize shadcn/ui"
T005: "Configure Neobrutalism CSS variables"
```

**Phase 2 (Foundational)**:
```bash
# Can run in parallel:
T006: "Create types/editor.ts"
T007: "Create types/theme.ts"
T008: "Create types/markdown.ts"
T011: "Create use-debounce.ts"
```

**Phase 3 (US1)**:
```bash
# Can run in parallel:
T013: "Create split-pane.tsx"
T014: "Create markdown-editor.tsx"
T015: "Create rich-text-preview.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 + 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (实时预览)
4. Complete Phase 4: User Story 2 (一键复制)
5. **STOP and VALIDATE**: Test complete flow end-to-end
6. Deploy MVP if ready

### Incremental Delivery

| Milestone | Stories | Value Delivered |
|-----------|---------|-----------------|
| MVP | US1 + US2 | 核心编辑+复制功能可用 |
| v1.1 | + US3 | Neobrutalism 风格完善 |
| v1.2 | + US4 | 完整 Markdown 支持 |
| v1.3 | + US5 | 风格扩展入口就绪 |

### Task Count Summary

| Phase | Task Count | Parallel Tasks |
|-------|------------|----------------|
| Setup | 5 | 3 |
| Foundational | 7 | 5 |
| US1 (P1) | 6 | 3 |
| US2 (P1) | 4 | 1 |
| US3 (P2) | 4 | 1 |
| US4 (P2) | 4 | 2 |
| US5 (P3) | 4 | 1 |
| Polish | 6 | 3 |
| **Total** | **40** | **19** |

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [US*] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- MVP scope = Phase 1 + 2 + 3 + 4 (Setup + Foundational + US1 + US2)
