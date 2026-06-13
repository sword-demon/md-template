/**
 * Inline Styles Helpers for Markdown Elements
 *
 * Theme-aware inline CSS resolution. The actual style maps live in
 * theme-config.ts (single source of truth); this module exposes the shared
 * tag-to-element mapping plus theme-aware getters used by the rehype
 * inline-styles plugin.
 */

import type { MarkdownElement, ThemeId } from '@/types/theme'
import { getElementStyleMap, getTheme } from './theme-config'

/**
 * Map HTML tag names to our element type (theme-independent, shared)
 */
export const tagToElementMap: Record<string, MarkdownElement> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  blockquote: 'blockquote',
  pre: 'pre',
  code: 'code',
  ul: 'ul',
  ol: 'ol',
  li: 'li',
  a: 'a',
  img: 'img',
  table: 'table',
  thead: 'thead',
  tbody: 'tbody',
  tr: 'tr',
  th: 'th',
  td: 'td',
  strong: 'strong',
  b: 'strong',
  em: 'em',
  i: 'em',
  del: 'del',
  s: 'del',
  hr: 'hr',
}

/**
 * Get inline style string for a Markdown element under a given theme
 */
export function getInlineStyle(
  element: MarkdownElement,
  themeId: ThemeId = 'neobrutalism'
): string {
  return getElementStyleMap(themeId)[element] ?? ''
}

/**
 * Get task list checkbox HTML for WeChat (inline span, theme-aware)
 *
 * Note: currently unused — the task-list plugin renders its own checkbox
 * styling directly. Kept here to document intent and for future reuse.
 */
export function getTaskCheckboxHtml(checked: boolean, themeId: ThemeId = 'neobrutalism'): string {
  const tokens = getTheme(themeId).tokens
  const border = tokens.colors.border ?? tokens.colors.text
  if (checked) {
    return `<span style="display: inline-block; width: 18px; height: 18px; margin-right: 8px; background-color: ${tokens.colors.accent}; border: 2px solid ${border}; text-align: center; line-height: 14px; font-size: 12px; color: #fff; vertical-align: middle;">✓</span>`
  }
  return `<span style="display: inline-block; width: 18px; height: 18px; margin-right: 8px; background-color: #fff; border: 2px solid ${border}; vertical-align: middle;"></span>`
}
