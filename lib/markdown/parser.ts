/**
 * Markdown Parser
 * 
 * Unified-based Markdown parser with Neobrutalism styling
 * and Mac-style code blocks with syntax highlighting
 */

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { rehypeNeobrutalism } from './plugins/neobrutalism'
import { rehypeCodeHighlight, processCodeBlocks } from './plugins/code-highlight'
import { remarkExtractFrontmatter, processFrontmatter } from './plugins/frontmatter'
import { rehypeTaskList } from './plugins/task-list'
import type { ParseResult, ParserOptions } from '@/types/markdown'

/**
 * Create a Markdown parser with Neobrutalism styling
 */
export function createParser(options: ParserOptions = {}) {
  const { gfm = true } = options

  // Build processor chain
  const baseProcessor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])  // Parse frontmatter
    .use(remarkExtractFrontmatter)      // Extract and remove frontmatter for custom rendering
  
  // Add GFM plugin if enabled
  const withGfm = gfm ? baseProcessor.use(remarkGfm) : baseProcessor
  
  // Add HTML conversion, code highlighting markers, and Neobrutalism styling
  const processor = withGfm
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeCodeHighlight)  // Mark code blocks for highlighting
    .use(rehypeTaskList)       // Transform task list checkboxes for WeChat
    .use(rehypeNeobrutalism)   // Inject inline styles
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
    const processor = createParser(options)
    const result = await processor.process(markdown)
    let html = String(result)
    
    // Process frontmatter (prepend styled card)
    html = processFrontmatter(html)
    
    // Process code blocks with syntax highlighting (async)
    html = await processCodeBlocks(html)

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
export function parseMarkdownSync(
  markdown: string,
  options: ParserOptions = {}
): ParseResult {
  const startTime = performance.now()

  try {
    const processor = createParser(options)
    const result = processor.processSync(markdown)
    const html = String(result)

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
