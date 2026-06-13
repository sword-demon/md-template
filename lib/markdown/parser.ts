/**
 * Markdown Parser
 *
 * Unified-based Markdown parser with theme-aware inline styling
 * and Mac-style code blocks with syntax highlighting.
 */

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { rehypeInlineStyles } from './plugins/inline-styles-plugin'
import { rehypeCodeHighlight, processCodeBlocks } from './plugins/code-highlight'
import { remarkExtractFrontmatter, processFrontmatter } from './plugins/frontmatter'
import { rehypeTaskList } from './plugins/task-list'
import { wrapWithContainer } from './wrap-container'
import type { ParseResult, ParserOptions } from '@/types/markdown'

/**
 * Create a Markdown parser with theme-aware inline styling
 */
export function createParser(options: ParserOptions = {}) {
  const { gfm = true, themeId = 'neobrutalism' } = options

  // Build processor chain
  const baseProcessor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml']) // Parse frontmatter
    .use(remarkExtractFrontmatter) // Extract and remove frontmatter for custom rendering

  // Add GFM plugin if enabled
  const withGfm = gfm ? baseProcessor.use(remarkGfm) : baseProcessor

  // Add HTML conversion, code highlighting markers, and theme-aware styling
  const processor = withGfm
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeCodeHighlight) // Mark code blocks for highlighting
    .use(rehypeTaskList, themeId) // Transform task list checkboxes for WeChat (theme-aware)
    .use(rehypeInlineStyles, { themeId }) // Inject theme-aware inline styles
    .use(rehypeStringify, { allowDangerousHtml: true })

  return processor
}

/**
 * Parse Markdown to HTML with syntax highlighting
 * @param markdown - Raw Markdown string
 * @param options - Parser options
 * @returns ParseResult with HTML and status
 */
export async function parseMarkdown(
  markdown: string,
  options: ParserOptions = {}
): Promise<ParseResult> {
  const startTime = performance.now()

  try {
    const themeId = options.themeId ?? 'neobrutalism'
    const processor = createParser(options)
    const result = await processor.process(markdown)
    let html = String(result)

    // Process frontmatter (prepend themed card)
    html = processFrontmatter(html, themeId)

    // Process code blocks with syntax highlighting (async)
    html = await processCodeBlocks(html)

    // Wrap in theme's outer container (e.g. Kami parchment section)
    html = wrapWithContainer(html, themeId)

    return {
      html,
      success: true,
      processingTime: performance.now() - startTime,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown parsing error'

    return {
      html: '',
      success: false,
      error: errorMessage,
      processingTime: performance.now() - startTime,
    }
  }
}

/**
 * Parse Markdown to HTML without syntax highlighting (sync, faster)
 * Use this for quick previews where highlighting is not needed
 */
export function parseMarkdownSync(markdown: string, options: ParserOptions = {}): ParseResult {
  const startTime = performance.now()

  try {
    const themeId = options.themeId ?? 'neobrutalism'
    const processor = createParser(options)
    const result = processor.processSync(markdown)
    let html = String(result)

    // Note: code block highlighting is async and skipped in sync mode.
    // Still apply the theme's outer container so previews are consistent.
    html = wrapWithContainer(html, themeId)

    return {
      html,
      success: true,
      processingTime: performance.now() - startTime,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown parsing error'

    return {
      html: '',
      success: false,
      error: errorMessage,
      processingTime: performance.now() - startTime,
    }
  }
}

/**
 * Default parser instance with GFM enabled
 */
export const defaultParser = createParser({ gfm: true })
