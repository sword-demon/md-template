/**
 * Neobrutalism Theme Configuration
 * 
 * Design tokens and element styles for the Neobrutalism theme
 */

import type { Theme, ThemeTokens, ElementStyleMap, ThemeId, ThemeMeta } from '@/types/theme'

/**
 * Neobrutalism design tokens
 */
export const neobrutalismTokens: ThemeTokens = {
  border: {
    width: '3px',
    style: 'solid',
    color: '#000000',
  },
  shadow: {
    offsetX: '4px',
    offsetY: '4px',
    blur: '0',
    color: '#000000',
  },
  colors: {
    primary: '#FFE135',
    secondary: '#FF6B6B',
    accent: '#4ECDC4',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#000000',
    textSecondary: '#4A4A4A',
    border: '#000000',
    error: '#EF4444',
    success: '#22C55E',
  },
  typography: {
    heading: "'Space Grotesk', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    code: "'JetBrains Mono', 'Fira Code', monospace",
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
  borderRadius: '0',
}

/**
 * Neobrutalism inline styles for Markdown elements
 * These styles are injected directly into the HTML for WeChat compatibility
 */
export const neobrutalismElementStyles: ElementStyleMap = {
  // Headings
  h1: `
    font-family: ${neobrutalismTokens.typography.heading};
    font-size: 2em;
    font-weight: 700;
    color: ${neobrutalismTokens.colors.text};
    margin: 24px 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 3px solid ${neobrutalismTokens.colors.border};
    line-height: 1.3;
  `.replace(/\s+/g, ' ').trim(),

  h2: `
    font-family: ${neobrutalismTokens.typography.heading};
    font-size: 1.5em;
    font-weight: 700;
    color: ${neobrutalismTokens.colors.text};
    background-color: ${neobrutalismTokens.colors.primary};
    margin: 20px 0 12px 0;
    padding: 8px 12px;
    border: 3px solid ${neobrutalismTokens.colors.border};
    line-height: 1.3;
  `.replace(/\s+/g, ' ').trim(),

  h3: `
    font-family: ${neobrutalismTokens.typography.heading};
    font-size: 1.25em;
    font-weight: 700;
    color: ${neobrutalismTokens.colors.text};
    margin: 16px 0 8px 0;
    padding-left: 12px;
    border-left: 4px solid ${neobrutalismTokens.colors.secondary};
    line-height: 1.4;
  `.replace(/\s+/g, ' ').trim(),

  h4: `
    font-family: ${neobrutalismTokens.typography.heading};
    font-size: 1.1em;
    font-weight: 700;
    color: ${neobrutalismTokens.colors.text};
    margin: 14px 0 8px 0;
    line-height: 1.4;
  `.replace(/\s+/g, ' ').trim(),

  h5: `
    font-family: ${neobrutalismTokens.typography.heading};
    font-size: 1em;
    font-weight: 700;
    color: ${neobrutalismTokens.colors.text};
    margin: 12px 0 6px 0;
    line-height: 1.4;
  `.replace(/\s+/g, ' ').trim(),

  h6: `
    font-family: ${neobrutalismTokens.typography.heading};
    font-size: 0.9em;
    font-weight: 700;
    color: ${neobrutalismTokens.colors.textSecondary};
    margin: 10px 0 6px 0;
    line-height: 1.4;
  `.replace(/\s+/g, ' ').trim(),

  // Paragraph
  p: `
    font-family: ${neobrutalismTokens.typography.body};
    font-size: 16px;
    color: ${neobrutalismTokens.colors.text};
    margin: 12px 0;
    line-height: 1.7;
  `.replace(/\s+/g, ' ').trim(),

  // Blockquote
  blockquote: `
    font-family: ${neobrutalismTokens.typography.body};
    margin: 16px 0;
    padding: 12px 16px;
    background-color: ${neobrutalismTokens.colors.surface};
    border-left: 6px solid ${neobrutalismTokens.colors.secondary};
    color: ${neobrutalismTokens.colors.text};
    font-style: italic;
  `.replace(/\s+/g, ' ').trim(),

  // Code blocks
  pre: `
    font-family: ${neobrutalismTokens.typography.code};
    font-size: 14px;
    margin: 16px 0;
    padding: 16px;
    background-color: #1a1a1a;
    color: ${neobrutalismTokens.colors.accent};
    border: 3px solid ${neobrutalismTokens.colors.border};
    overflow-x: auto;
    line-height: 1.5;
  `.replace(/\s+/g, ' ').trim(),

  code: `
    font-family: ${neobrutalismTokens.typography.code};
    font-size: inherit;
    color: inherit;
  `.replace(/\s+/g, ' ').trim(),

  inlineCode: `
    font-family: ${neobrutalismTokens.typography.code};
    font-size: 0.9em;
    background-color: ${neobrutalismTokens.colors.primary};
    color: ${neobrutalismTokens.colors.text};
    padding: 2px 6px;
    border: 2px solid ${neobrutalismTokens.colors.border};
  `.replace(/\s+/g, ' ').trim(),

  // Lists
  ul: `
    font-family: ${neobrutalismTokens.typography.body};
    margin: 12px 0;
    padding-left: 24px;
    list-style-type: disc;
  `.replace(/\s+/g, ' ').trim(),

  ol: `
    font-family: ${neobrutalismTokens.typography.body};
    margin: 12px 0;
    padding-left: 24px;
    list-style-type: decimal;
  `.replace(/\s+/g, ' ').trim(),

  li: `
    font-family: ${neobrutalismTokens.typography.body};
    margin: 6px 0;
    line-height: 1.6;
    color: ${neobrutalismTokens.colors.text};
  `.replace(/\s+/g, ' ').trim(),

  // Links
  a: `
    color: ${neobrutalismTokens.colors.accent};
    text-decoration: underline;
    font-weight: 600;
  `.replace(/\s+/g, ' ').trim(),

  // Images
  img: `
    max-width: 100%;
    height: auto;
    margin: 16px 0;
    border: 3px solid ${neobrutalismTokens.colors.border};
  `.replace(/\s+/g, ' ').trim(),

  // Tables
  table: `
    width: 100%;
    margin: 16px 0;
    border-collapse: collapse;
    border: 3px solid ${neobrutalismTokens.colors.border};
  `.replace(/\s+/g, ' ').trim(),

  thead: `
    background-color: ${neobrutalismTokens.colors.text};
    color: ${neobrutalismTokens.colors.background};
  `.replace(/\s+/g, ' ').trim(),

  tbody: `
    background-color: ${neobrutalismTokens.colors.background};
  `.replace(/\s+/g, ' ').trim(),

  tr: `
    border-bottom: 2px solid ${neobrutalismTokens.colors.border};
  `.replace(/\s+/g, ' ').trim(),

  th: `
    font-family: ${neobrutalismTokens.typography.heading};
    font-weight: 700;
    padding: 12px;
    text-align: left;
    border: 2px solid ${neobrutalismTokens.colors.border};
  `.replace(/\s+/g, ' ').trim(),

  td: `
    font-family: ${neobrutalismTokens.typography.body};
    padding: 10px 12px;
    border: 2px solid ${neobrutalismTokens.colors.border};
  `.replace(/\s+/g, ' ').trim(),

  // Inline styles
  strong: `
    font-weight: 700;
    color: ${neobrutalismTokens.colors.text};
  `.replace(/\s+/g, ' ').trim(),

  em: `
    font-style: italic;
    color: ${neobrutalismTokens.colors.text};
  `.replace(/\s+/g, ' ').trim(),

  del: `
    text-decoration: line-through;
    color: ${neobrutalismTokens.colors.textSecondary};
  `.replace(/\s+/g, ' ').trim(),

  // Horizontal rule
  hr: `
    border: none;
    border-top: 3px solid ${neobrutalismTokens.colors.border};
    margin: 24px 0;
  `.replace(/\s+/g, ' ').trim(),

  // Task list items
  taskListItem: `
    list-style-type: none;
    margin: 8px 0;
    padding-left: 0;
  `.replace(/\s+/g, ' ').trim(),

  taskListCheckbox: `
    margin-right: 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
  `.replace(/\s+/g, ' ').trim(),
}

/**
 * Neobrutalism theme metadata
 */
export const neobrutalismMeta: ThemeMeta = {
  id: 'neobrutalism',
  name: 'Neobrutalism',
  description: '现代、大胆的 Neobrutalism 设计风格，使用粗边框、偏移阴影和高饱和度配色',
  isDefault: true,
}

/**
 * Complete Neobrutalism theme
 */
export const neobrutalismTheme: Theme = {
  meta: neobrutalismMeta,
  tokens: neobrutalismTokens,
  elementStyles: neobrutalismElementStyles,
}

/**
 * All available themes
 */
export const themes: Record<ThemeId, Theme> = {
  neobrutalism: neobrutalismTheme,
}

/**
 * Get theme by ID
 */
export function getTheme(id: ThemeId): Theme {
  return themes[id]
}

/**
 * Get available theme metadata
 */
export function getAvailableThemes(): ThemeMeta[] {
  return Object.values(themes).map((theme) => theme.meta)
}

/**
 * Get element style for a specific element and theme
 */
export function getElementStyle(element: keyof ElementStyleMap, themeId: ThemeId = 'neobrutalism'): string {
  const theme = themes[themeId]
  return theme.elementStyles[element]
}
