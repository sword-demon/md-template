/**
 * Inline Styles for Markdown Elements
 * 
 * WeChat-compatible inline CSS styles for all Markdown elements
 * These styles are injected directly into HTML tags for maximum compatibility
 */

import type { MarkdownElement } from '@/types/theme'

/**
 * Neobrutalism design tokens as CSS values
 */
const tokens = {
  // Colors
  colorPrimary: '#FFE135',
  colorSecondary: '#FF6B6B',
  colorAccent: '#4ECDC4',
  colorBackground: '#FFFFFF',
  colorSurface: '#F5F5F5',
  colorText: '#000000',
  colorTextSecondary: '#4A4A4A',
  colorBorder: '#000000',
  
  // Typography
  fontHeading: "'Space Grotesk', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  fontBody: "'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  fontCode: "'JetBrains Mono', 'Fira Code', 'Source Code Pro', Consolas, monospace",
  
  // Border
  borderWidth: '3px',
  borderStyle: 'solid',
  
  // Shadow (offset, no blur - Neobrutalism style)
  shadowOffset: '4px',
}

/**
 * Get inline style string for a Markdown element
 */
export function getInlineStyle(element: MarkdownElement): string {
  return inlineStyleMap[element] ?? ''
}

/**
 * Complete inline style map for all Markdown elements
 */
export const inlineStyleMap: Record<MarkdownElement, string> = {
  // Headings - H1 with bottom border
  h1: `
    font-family: ${tokens.fontHeading};
    font-size: 28px;
    font-weight: 700;
    color: ${tokens.colorText};
    margin: 24px 0 16px 0;
    padding: 0 0 12px 0;
    border-bottom: ${tokens.borderWidth} ${tokens.borderStyle} ${tokens.colorBorder};
    line-height: 1.3;
  `.replace(/\s+/g, ' ').trim(),

  // H2 with yellow background highlight - Neobrutalism signature
  h2: `
    font-family: ${tokens.fontHeading};
    font-size: 22px;
    font-weight: 700;
    color: ${tokens.colorText};
    background-color: ${tokens.colorPrimary};
    margin: 20px 0 14px 0;
    padding: 10px 14px;
    border: ${tokens.borderWidth} ${tokens.borderStyle} ${tokens.colorBorder};
    line-height: 1.3;
    display: inline-block;
  `.replace(/\s+/g, ' ').trim(),

  // H3 with left accent border
  h3: `
    font-family: ${tokens.fontHeading};
    font-size: 18px;
    font-weight: 700;
    color: ${tokens.colorText};
    margin: 18px 0 10px 0;
    padding: 6px 0 6px 14px;
    border-left: 5px ${tokens.borderStyle} ${tokens.colorSecondary};
    line-height: 1.4;
  `.replace(/\s+/g, ' ').trim(),

  h4: `
    font-family: ${tokens.fontHeading};
    font-size: 16px;
    font-weight: 700;
    color: ${tokens.colorText};
    margin: 16px 0 8px 0;
    line-height: 1.4;
  `.replace(/\s+/g, ' ').trim(),

  h5: `
    font-family: ${tokens.fontHeading};
    font-size: 15px;
    font-weight: 700;
    color: ${tokens.colorText};
    margin: 14px 0 6px 0;
    line-height: 1.4;
  `.replace(/\s+/g, ' ').trim(),

  h6: `
    font-family: ${tokens.fontHeading};
    font-size: 14px;
    font-weight: 700;
    color: ${tokens.colorTextSecondary};
    margin: 12px 0 6px 0;
    line-height: 1.4;
  `.replace(/\s+/g, ' ').trim(),

  // Paragraph
  p: `
    font-family: ${tokens.fontBody};
    font-size: 16px;
    color: ${tokens.colorText};
    margin: 14px 0;
    line-height: 1.8;
  `.replace(/\s+/g, ' ').trim(),

  // Blockquote - Neobrutalism style with thick left border
  blockquote: `
    font-family: ${tokens.fontBody};
    font-size: 15px;
    margin: 18px 0;
    padding: 14px 18px;
    background-color: ${tokens.colorSurface};
    border-left: 6px ${tokens.borderStyle} ${tokens.colorSecondary};
    color: ${tokens.colorText};
    font-style: italic;
    line-height: 1.7;
  `.replace(/\s+/g, ' ').trim(),

  // Code block (pre) - Dark background with accent text
  pre: `
    font-family: ${tokens.fontCode};
    font-size: 14px;
    margin: 18px 0;
    padding: 16px 18px;
    background-color: #1a1a2e;
    color: ${tokens.colorAccent};
    border: ${tokens.borderWidth} ${tokens.borderStyle} ${tokens.colorBorder};
    box-shadow: ${tokens.shadowOffset} ${tokens.shadowOffset} 0 ${tokens.colorBorder};
    overflow-x: auto;
    line-height: 1.6;
    white-space: pre-wrap;
    word-wrap: break-word;
  `.replace(/\s+/g, ' ').trim(),

  // Code inside pre
  code: `
    font-family: ${tokens.fontCode};
    font-size: inherit;
    color: inherit;
    background: transparent;
    padding: 0;
    border: none;
  `.replace(/\s+/g, ' ').trim(),

  // Inline code - Yellow highlight
  inlineCode: `
    font-family: ${tokens.fontCode};
    font-size: 0.9em;
    background-color: ${tokens.colorPrimary};
    color: ${tokens.colorText};
    padding: 3px 6px;
    border: 2px ${tokens.borderStyle} ${tokens.colorBorder};
    border-radius: 0;
  `.replace(/\s+/g, ' ').trim(),

  // Lists
  ul: `
    font-family: ${tokens.fontBody};
    margin: 14px 0;
    padding-left: 24px;
    list-style-type: disc;
    line-height: 1.8;
  `.replace(/\s+/g, ' ').trim(),

  ol: `
    font-family: ${tokens.fontBody};
    margin: 14px 0;
    padding-left: 24px;
    list-style-type: decimal;
    line-height: 1.8;
  `.replace(/\s+/g, ' ').trim(),

  li: `
    font-family: ${tokens.fontBody};
    margin: 8px 0;
    line-height: 1.7;
    color: ${tokens.colorText};
  `.replace(/\s+/g, ' ').trim(),

  // Links - Accent color with underline
  a: `
    color: ${tokens.colorAccent};
    text-decoration: underline;
    font-weight: 600;
  `.replace(/\s+/g, ' ').trim(),

  // Images - With border
  img: `
    max-width: 100%;
    height: auto;
    margin: 18px 0;
    border: ${tokens.borderWidth} ${tokens.borderStyle} ${tokens.colorBorder};
    box-shadow: ${tokens.shadowOffset} ${tokens.shadowOffset} 0 ${tokens.colorBorder};
  `.replace(/\s+/g, ' ').trim(),

  // Tables - Bold borders (WeChat compatible - no box-shadow)
  table: `
    width: 100%;
    margin: 18px 0;
    border-collapse: collapse;
    border: ${tokens.borderWidth} ${tokens.borderStyle} ${tokens.colorBorder};
  `.replace(/\s+/g, ' ').trim(),

  thead: `
    background-color: ${tokens.colorText};
    color: ${tokens.colorBackground};
  `.replace(/\s+/g, ' ').trim(),

  tbody: `
    background-color: ${tokens.colorBackground};
  `.replace(/\s+/g, ' ').trim(),

  tr: `
    border-bottom: 2px ${tokens.borderStyle} ${tokens.colorBorder};
  `.replace(/\s+/g, ' ').trim(),

  th: `
    font-family: -apple-system, sans-serif;
    font-weight: 700;
    padding: 12px 14px;
    text-align: left;
    border: 2px ${tokens.borderStyle} ${tokens.colorBorder};
    background-color: ${tokens.colorText};
    color: ${tokens.colorBackground};
  `.replace(/\s+/g, ' ').trim(),

  td: `
    font-family: -apple-system, sans-serif;
    padding: 10px 14px;
    border: 2px ${tokens.borderStyle} ${tokens.colorBorder};
    background-color: ${tokens.colorBackground};
  `.replace(/\s+/g, ' ').trim(),

  // Inline emphasis
  strong: `
    font-weight: 700;
    color: ${tokens.colorText};
  `.replace(/\s+/g, ' ').trim(),

  em: `
    font-style: italic;
    color: ${tokens.colorText};
  `.replace(/\s+/g, ' ').trim(),

  del: `
    text-decoration: line-through;
    color: ${tokens.colorTextSecondary};
  `.replace(/\s+/g, ' ').trim(),

  // Horizontal rule
  hr: `
    border: none;
    border-top: ${tokens.borderWidth} ${tokens.borderStyle} ${tokens.colorBorder};
    margin: 28px 0;
  `.replace(/\s+/g, ' ').trim(),

  // Task list items (WeChat compatible)
  taskListItem: `
    list-style-type: none;
    margin: 10px 0;
    padding-left: 28px;
    position: relative;
  `.replace(/\s+/g, ' ').trim(),

  taskListCheckbox: `
    margin-right: 10px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    border: 2px solid ${tokens.colorBorder};
  `.replace(/\s+/g, ' ').trim(),
}

/**
 * Get task list checkbox HTML for WeChat (inline SVG/text)
 */
export function getTaskCheckboxHtml(checked: boolean): string {
  if (checked) {
    return `<span style="display: inline-block; width: 18px; height: 18px; margin-right: 8px; background-color: ${tokens.colorAccent}; border: 2px solid ${tokens.colorBorder}; text-align: center; line-height: 14px; font-size: 12px; color: #fff; vertical-align: middle;">✓</span>`
  }
  return `<span style="display: inline-block; width: 18px; height: 18px; margin-right: 8px; background-color: #fff; border: 2px solid ${tokens.colorBorder}; vertical-align: middle;"></span>`
}

/**
 * Map HTML tag names to our element type
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
