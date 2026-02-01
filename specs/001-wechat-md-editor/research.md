# Research: 微信公众号 Markdown 编辑器

**Date**: 2026-02-01  
**Purpose**: 解决技术选型和实现方案中的关键决策点

## 1. Markdown 解析方案

### Decision: unified/remark/rehype 生态

### Rationale

- **成熟稳定**: unified 是 Markdown 处理的事实标准，社区活跃
- **插件化架构**: 支持自定义 rehype 插件注入内联样式
- **TypeScript 支持**: 完整的类型定义
- **GFM 支持**: remark-gfm 插件提供表格、任务列表等扩展语法

### Alternatives Considered

| 方案 | 优点 | 缺点 | 结论 |
|------|------|------|------|
| marked | 轻量、快速 | 插件系统弱，难以自定义 HTML 输出 | ❌ 不采用 |
| markdown-it | 插件丰富 | TypeScript 支持较弱，AST 操作不便 | ❌ 不采用 |
| unified/remark/rehype | 完整生态、AST 可操作、TS 友好 | 学习曲线稍陡 | ✅ 采用 |

### Implementation Notes

```typescript
// 核心处理流程
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { neobrutalismPlugin } from './plugins/neobrutalism'

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(neobrutalismPlugin)  // 自定义样式注入
  .use(rehypeStringify)
```

## 2. 微信公众号兼容性

### Decision: 纯内联样式 + 白名单 HTML 标签

### Rationale

微信公众号编辑器对 HTML 有严格限制：
- **不支持**: `<style>` 标签、外部 CSS、`class` 属性
- **支持**: 内联 `style` 属性、基础 HTML 标签
- **过滤**: 部分 CSS 属性会被过滤（如 `position`、`float`）

### Supported Elements & Styles

| 元素 | 支持的样式属性 |
|------|---------------|
| `<h1>-<h6>` | color, font-size, font-weight, text-align, margin, padding, border, background-color |
| `<p>` | color, font-size, line-height, text-indent, margin, padding |
| `<span>` | color, font-size, font-weight, background-color |
| `<code>` | color, background-color, font-family, padding |
| `<pre>` | background-color, padding, border, overflow |
| `<ul>/<ol>/<li>` | margin, padding, list-style-type |
| `<blockquote>` | border-left, padding, margin, background-color |
| `<table>/<tr>/<td>/<th>` | border, padding, background-color, text-align |
| `<img>` | width, height, margin（必须使用公开 URL）|
| `<a>` | color, text-decoration |

### Filtered/Blocked

- `<script>`, `<iframe>`, `<form>` - 完全过滤
- `position`, `float`, `z-index` - CSS 属性过滤
- `data-*` 属性 - 移除

## 3. Neobrutalism 样式参数

### Decision: 固定设计令牌配置

### Design Tokens

```typescript
const NEOBRUTALISM_TOKENS = {
  // 边框
  border: {
    width: '3px',
    style: 'solid',
    color: '#000000',
  },
  
  // 阴影（偏移阴影，非模糊）
  shadow: {
    offset: '4px',
    color: '#000000',
  },
  
  // 配色（高饱和度）
  colors: {
    primary: '#FFE135',      // 明黄
    secondary: '#FF6B6B',    // 珊瑚红
    accent: '#4ECDC4',       // 青绿
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#000000',
  },
  
  // 字体
  typography: {
    heading: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
    code: "'JetBrains Mono', monospace",
  },
  
  // 圆角（Neobrutalism 通常无圆角或极小圆角）
  borderRadius: '0px',
}
```

### Element-Specific Styles

| Markdown 元素 | Neobrutalism 样式 |
|--------------|------------------|
| H1 | font-size: 2em; border-bottom: 3px solid #000; padding-bottom: 8px; margin-bottom: 16px |
| H2 | font-size: 1.5em; background: #FFE135; padding: 8px 12px; border: 3px solid #000 |
| Code Block | background: #000; color: #4ECDC4; border: 3px solid #000; padding: 16px |
| Inline Code | background: #FFE135; padding: 2px 6px; border: 2px solid #000 |
| Blockquote | border-left: 6px solid #FF6B6B; background: #F5F5F5; padding: 12px |
| Table | border-collapse: collapse; border: 3px solid #000 |
| Table Header | background: #000; color: #FFF; padding: 8px |

## 4. 剪贴板富文本复制

### Decision: Clipboard API + text/html MIME

### Rationale

- `navigator.clipboard.write()` 支持富文本复制
- 需要 `ClipboardItem` 指定 `text/html` MIME 类型
- 兼容性：Chrome 66+, Firefox 63+, Safari 13.1+

### Implementation

```typescript
async function copyRichText(html: string): Promise<boolean> {
  try {
    const blob = new Blob([html], { type: 'text/html' })
    const item = new ClipboardItem({ 'text/html': blob })
    await navigator.clipboard.write([item])
    return true
  } catch (error) {
    // 降级方案：使用 execCommand
    const container = document.createElement('div')
    container.innerHTML = html
    document.body.appendChild(container)
    
    const range = document.createRange()
    range.selectNodeContents(container)
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
    
    const success = document.execCommand('copy')
    document.body.removeChild(container)
    return success
  }
}
```

## 5. 性能优化策略

### Decision: 防抖 + 增量渲染

### Strategies

| 策略 | 实现 | 目标 |
|------|------|------|
| 输入防抖 | 300ms debounce | 避免频繁解析 |
| 异步解析 | Web Worker (可选) | 不阻塞主线程 |
| 虚拟滚动 | react-window (大文档) | 10000+ 字符性能 |
| 缓存 | useMemo 缓存 AST | 减少重复计算 |

### Performance Budget

- 首次渲染: < 200ms
- 增量更新: < 100ms
- 复制操作: < 50ms

## 6. 代码高亮方案

### Decision: 不使用运行时高亮库

### Rationale

- 微信不支持 `<span class="...">` 语法高亮
- 代码块使用统一的背景色和字体，不做语法着色
- 保持输出 HTML 简洁，避免复杂嵌套

### Alternative (Future)

如需语法高亮，可考虑：
- 使用 `shiki` 生成内联样式的高亮 HTML
- 但会显著增加输出体积，暂不实现

## Summary

| 决策点 | 选择 | 风险 |
|--------|------|------|
| Markdown 解析 | unified/remark/rehype | 低 - 成熟方案 |
| 样式注入 | 自定义 rehype 插件 | 中 - 需微信测试 |
| 剪贴板 | Clipboard API + 降级 | 低 - 浏览器支持好 |
| 性能 | 防抖 + 缓存 | 低 - 标准优化 |
| 代码高亮 | 不实现 | 低 - 明确 scope |
