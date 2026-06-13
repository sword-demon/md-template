/**
 * Theme Configuration
 *
 * Design tokens and element styles for all themes.
 * Single source of truth: rehype plugins resolve inline styles via
 * getElementStyleMap(themeId), so adding a theme only requires registering
 * one entry here (plus extending the ThemeId union type).
 */

import type { Theme, ThemeTokens, ElementStyleMap, ThemeId, ThemeMeta } from '@/types/theme'

// ============================================================
// Neobrutalism
// Values migrated verbatim from the former lib/styles/inline-styles.ts so
// the Neobrutalism visual appearance stays exactly the same.
// ============================================================

const neo = {
  colorPrimary: '#FFE135',
  colorSecondary: '#FF6B6B',
  colorAccent: '#4ECDC4',
  colorBackground: '#FFFFFF',
  colorSurface: '#F5F5F5',
  colorText: '#000000',
  colorTextSecondary: '#4A4A4A',
  colorBorder: '#000000',
  fontHeading: "'Space Grotesk', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  fontBody: "'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  fontCode: "'JetBrains Mono', 'Fira Code', 'Source Code Pro', Consolas, monospace",
  borderWidth: '3px',
  borderStyle: 'solid',
  shadowOffset: '4px',
}

export const neobrutalismTokens: ThemeTokens = {
  border: {
    width: neo.borderWidth,
    style: 'solid',
    color: neo.colorBorder,
  },
  shadow: {
    offsetX: neo.shadowOffset,
    offsetY: neo.shadowOffset,
    blur: '0',
    color: neo.colorBorder,
  },
  colors: {
    primary: neo.colorPrimary,
    secondary: neo.colorSecondary,
    accent: neo.colorAccent,
    background: neo.colorBackground,
    surface: neo.colorSurface,
    text: neo.colorText,
    textSecondary: neo.colorTextSecondary,
    border: neo.colorBorder,
    error: '#EF4444',
    success: '#22C55E',
  },
  typography: {
    heading: neo.fontHeading,
    body: neo.fontBody,
    code: neo.fontCode,
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
 * Neobrutalism inline styles for Markdown elements.
 * Injected directly into HTML for WeChat compatibility.
 */
export const neobrutalismElementStyles: ElementStyleMap = {
  h1: `
    font-family: ${neo.fontHeading};
    font-size: 28px;
    font-weight: 700;
    color: ${neo.colorText};
    margin: 24px 0 16px 0;
    padding: 0 0 12px 0;
    border-bottom: ${neo.borderWidth} ${neo.borderStyle} ${neo.colorBorder};
    line-height: 1.3;
  `
    .replace(/\s+/g, ' ')
    .trim(),

  h2: `
    font-family: ${neo.fontHeading};
    font-size: 22px;
    font-weight: 700;
    color: ${neo.colorText};
    background-color: ${neo.colorPrimary};
    margin: 20px 0 14px 0;
    padding: 10px 14px;
    border: ${neo.borderWidth} ${neo.borderStyle} ${neo.colorBorder};
    line-height: 1.3;
    display: inline-block;
  `
    .replace(/\s+/g, ' ')
    .trim(),

  h3: `
    font-family: ${neo.fontHeading};
    font-size: 18px;
    font-weight: 700;
    color: ${neo.colorText};
    margin: 18px 0 10px 0;
    padding: 6px 0 6px 14px;
    border-left: 5px ${neo.borderStyle} ${neo.colorSecondary};
    line-height: 1.4;
  `
    .replace(/\s+/g, ' ')
    .trim(),

  h4: `
    font-family: ${neo.fontHeading};
    font-size: 16px;
    font-weight: 700;
    color: ${neo.colorText};
    margin: 16px 0 8px 0;
    line-height: 1.4;
  `
    .replace(/\s+/g, ' ')
    .trim(),

  h5: `
    font-family: ${neo.fontHeading};
    font-size: 15px;
    font-weight: 700;
    color: ${neo.colorText};
    margin: 14px 0 6px 0;
    line-height: 1.4;
  `
    .replace(/\s+/g, ' ')
    .trim(),

  h6: `
    font-family: ${neo.fontHeading};
    font-size: 14px;
    font-weight: 700;
    color: ${neo.colorTextSecondary};
    margin: 12px 0 6px 0;
    line-height: 1.4;
  `
    .replace(/\s+/g, ' ')
    .trim(),

  p: `
    font-family: ${neo.fontBody};
    font-size: 16px;
    color: ${neo.colorText};
    margin: 14px 0;
    line-height: 1.8;
  `
    .replace(/\s+/g, ' ')
    .trim(),

  blockquote: `
    font-family: ${neo.fontBody};
    font-size: 15px;
    margin: 18px 0;
    padding: 14px 18px;
    background-color: ${neo.colorSurface};
    border-left: 6px ${neo.borderStyle} ${neo.colorSecondary};
    color: ${neo.colorText};
    font-style: italic;
    line-height: 1.7;
  `
    .replace(/\s+/g, ' ')
    .trim(),

  pre: `
    font-family: ${neo.fontCode};
    font-size: 14px;
    margin: 18px 0;
    padding: 16px 18px;
    background-color: #1a1a2e;
    color: ${neo.colorAccent};
    border: ${neo.borderWidth} ${neo.borderStyle} ${neo.colorBorder};
    box-shadow: ${neo.shadowOffset} ${neo.shadowOffset} 0 ${neo.colorBorder};
    overflow-x: auto;
    line-height: 1.6;
    white-space: pre-wrap;
    word-wrap: break-word;
  `
    .replace(/\s+/g, ' ')
    .trim(),

  code: `
    font-family: ${neo.fontCode};
    font-size: inherit;
    color: inherit;
    background: transparent;
    padding: 0;
    border: none;
  `
    .replace(/\s+/g, ' ')
    .trim(),

  inlineCode: `
    font-family: ${neo.fontCode};
    font-size: 0.9em;
    background-color: ${neo.colorPrimary};
    color: ${neo.colorText};
    padding: 3px 6px;
    border: 2px ${neo.borderStyle} ${neo.colorBorder};
    border-radius: 0;
  `
    .replace(/\s+/g, ' ')
    .trim(),

  ul: `
    font-family: ${neo.fontBody};
    margin: 14px 0;
    padding-left: 24px;
    list-style-type: disc;
    line-height: 1.8;
  `
    .replace(/\s+/g, ' ')
    .trim(),

  ol: `
    font-family: ${neo.fontBody};
    margin: 14px 0;
    padding-left: 24px;
    list-style-type: decimal;
    line-height: 1.8;
  `
    .replace(/\s+/g, ' ')
    .trim(),

  li: `
    font-family: ${neo.fontBody};
    margin: 8px 0;
    line-height: 1.7;
    color: ${neo.colorText};
  `
    .replace(/\s+/g, ' ')
    .trim(),

  a: `
    color: ${neo.colorAccent};
    text-decoration: underline;
    font-weight: 600;
  `
    .replace(/\s+/g, ' ')
    .trim(),

  img: `
    max-width: 100%;
    height: auto;
    margin: 18px 0;
    border: ${neo.borderWidth} ${neo.borderStyle} ${neo.colorBorder};
    box-shadow: ${neo.shadowOffset} ${neo.shadowOffset} 0 ${neo.colorBorder};
  `
    .replace(/\s+/g, ' ')
    .trim(),

  table: `
    width: 100%;
    margin: 18px 0;
    border-collapse: collapse;
    border: ${neo.borderWidth} ${neo.borderStyle} ${neo.colorBorder};
  `
    .replace(/\s+/g, ' ')
    .trim(),

  thead: `
    background-color: ${neo.colorText};
    color: ${neo.colorBackground};
  `
    .replace(/\s+/g, ' ')
    .trim(),

  tbody: `
    background-color: ${neo.colorBackground};
  `
    .replace(/\s+/g, ' ')
    .trim(),

  tr: `
    border-bottom: 2px ${neo.borderStyle} ${neo.colorBorder};
  `
    .replace(/\s+/g, ' ')
    .trim(),

  th: `
    font-family: -apple-system, sans-serif;
    font-weight: 700;
    padding: 12px 14px;
    text-align: left;
    border: 2px ${neo.borderStyle} ${neo.colorBorder};
    background-color: ${neo.colorText};
    color: ${neo.colorBackground};
  `
    .replace(/\s+/g, ' ')
    .trim(),

  td: `
    font-family: -apple-system, sans-serif;
    padding: 10px 14px;
    border: 2px ${neo.borderStyle} ${neo.colorBorder};
    background-color: ${neo.colorBackground};
  `
    .replace(/\s+/g, ' ')
    .trim(),

  strong: `
    font-weight: 700;
    color: ${neo.colorText};
  `
    .replace(/\s+/g, ' ')
    .trim(),

  em: `
    font-style: italic;
    color: ${neo.colorText};
  `
    .replace(/\s+/g, ' ')
    .trim(),

  del: `
    text-decoration: line-through;
    color: ${neo.colorTextSecondary};
  `
    .replace(/\s+/g, ' ')
    .trim(),

  hr: `
    border: none;
    border-top: ${neo.borderWidth} ${neo.borderStyle} ${neo.colorBorder};
    margin: 28px 0;
  `
    .replace(/\s+/g, ' ')
    .trim(),

  taskListItem: `
    list-style-type: none;
    margin: 10px 0;
    padding-left: 28px;
    position: relative;
  `
    .replace(/\s+/g, ' ')
    .trim(),

  taskListCheckbox: `
    margin-right: 10px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    border: 2px solid ${neo.colorBorder};
  `
    .replace(/\s+/g, ' ')
    .trim(),
}

export const neobrutalismMeta: ThemeMeta = {
  id: 'neobrutalism',
  name: 'Neobrutalism',
  description: '现代、大胆的 Neobrutalism 设计风格，使用粗边框、偏移阴影和高饱和度配色',
  isDefault: true,
}

export const neobrutalismTheme: Theme = {
  meta: neobrutalismMeta,
  tokens: neobrutalismTokens,
  elementStyles: neobrutalismElementStyles,
}

// ============================================================
// Kami
// Warm paper-feel design system adapted for WeChat.
// Rules: single ink-blue accent (<=5% area), serif hierarchy (titles 500,
// body 400, no synthetic bold), warm-neutral grays (R ≈ G > B, no cool
// blue-gray), dashed warm rule, ivory code, ring/whisper shadow only.
// Wrapped in an outer parchment <section> via ThemeMeta.wrapWithContainer.
// ============================================================

export const kamiTokens: ThemeTokens = {
  border: {
    width: '1px',
    style: 'solid',
    color: '#D8D5C7',
  },
  shadow: {
    offsetX: '0',
    offsetY: '4px',
    blur: '24px',
    color: 'rgba(0,0,0,0.05)',
  },
  colors: {
    primary: '#1B365D',
    secondary: '#2D5A8A',
    accent: '#1B365D',
    background: '#F5F4ED',
    surface: '#E8E6DC',
    text: '#141413',
    textSecondary: '#6B6A5C',
    border: '#D8D5C7',
    error: '#8B2E2E',
    success: '#3F5E3D',
  },
  typography: {
    heading: "'Source Serif 4', 'Noto Serif SC', 'Songti SC', 'STSong', serif",
    body: "'Inter', 'PingFang SC', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif",
    code: "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Consolas, monospace",
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
  borderRadius: '8px',
}

// Local constants for kamiElementStyles (not part of the ThemeTokens type)
const K = {
  parchment: '#F5F4ED',
  warmSand: '#E8E6DC',
  inkBlue: '#1B365D',
  ink: '#141413',
  caption: '#6B6A5C',
  rule: '#C9C5B5',
  ivory: '#FBFAF3',
  ivoryBorder: '#EDE9DC',
  tagTintStrong: '#E4ECF5',
  tagTintSoft: '#EFEDE2',
  serif: kamiTokens.typography.heading,
  sans: kamiTokens.typography.body,
  mono: kamiTokens.typography.code,
  whisperShadow: '0 4px 24px rgba(0,0,0,0.05)',
}

/**
 * Kami inline styles for Markdown elements.
 * Serif titles (500), sans body (400), ink-blue accent only on rules/links/
 * quote-left-line, warm grays, ivory code, dashed warm hr, no hard shadow.
 */
export const kamiElementStyles: ElementStyleMap = {
  h1: `font-family: ${K.serif}; font-size: 32px; font-weight: 500; color: ${K.ink}; margin: 32px 0 16px 0; line-height: 1.20; letter-spacing: -0.01em;`,

  h2: `font-family: ${K.serif}; font-size: 24px; font-weight: 500; color: ${K.ink}; margin: 28px 0 14px 0; padding-left: 12px; border-left: 3px solid ${K.inkBlue}; line-height: 1.25;`,

  h3: `font-family: ${K.serif}; font-size: 19px; font-weight: 500; color: ${K.ink}; margin: 24px 0 12px 0; line-height: 1.30;`,

  h4: `font-family: ${K.serif}; font-size: 16px; font-weight: 500; color: ${K.ink}; margin: 20px 0 10px 0; line-height: 1.30;`,

  h5: `font-family: ${K.serif}; font-size: 15px; font-weight: 500; color: ${K.caption}; margin: 18px 0 8px 0; line-height: 1.30;`,

  h6: `font-family: ${K.sans}; font-size: 13px; font-weight: 500; color: ${K.caption}; margin: 16px 0 8px 0; line-height: 1.30; text-transform: uppercase; letter-spacing: 0.06em;`,

  p: `font-family: ${K.sans}; font-size: 15px; font-weight: 400; color: ${K.ink}; margin: 14px 0; line-height: 1.55;`,

  blockquote: `font-family: ${K.sans}; font-size: 14px; font-weight: 400; color: ${K.caption}; margin: 20px 0; padding: 8px 0 8px 16px; border-left: 3px solid ${K.inkBlue}; line-height: 1.55;`,

  pre: `font-family: ${K.mono}; font-size: 13px; margin: 20px 0; padding: 16px 18px; background-color: ${K.ivory}; color: ${K.ink}; border: 1px solid ${K.ivoryBorder}; border-radius: 8px; overflow-x: auto; line-height: 1.55; white-space: pre-wrap; word-wrap: break-word;`,

  code: `font-family: ${K.mono}; font-size: inherit; color: inherit; background: transparent; padding: 0; border: none;`,

  inlineCode: `font-family: ${K.mono}; font-size: 0.88em; background-color: ${K.ivory}; color: ${K.ink}; padding: 2px 6px; border: 1px solid ${K.ivoryBorder}; border-radius: 4px;`,

  ul: `font-family: ${K.sans}; font-size: 15px; color: ${K.ink}; margin: 14px 0; padding-left: 24px; list-style-type: disc; line-height: 1.55;`,

  ol: `font-family: ${K.sans}; font-size: 15px; color: ${K.ink}; margin: 14px 0; padding-left: 24px; list-style-type: decimal; line-height: 1.55;`,

  li: `font-family: ${K.sans}; font-size: 15px; color: ${K.ink}; margin: 6px 0; line-height: 1.55;`,

  a: `color: ${K.inkBlue}; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 2px; font-weight: 400;`,

  img: `max-width: 100%; height: auto; margin: 20px 0; border: 1px solid ${K.ivoryBorder}; border-radius: 4px; box-shadow: ${K.whisperShadow};`,

  table: `width: 100%; margin: 20px 0; border-collapse: collapse; background-color: ${K.ivory}; border: 1px solid ${K.ivoryBorder}; border-radius: 8px; overflow: hidden; font-size: 14px;`,

  thead: `background-color: ${K.warmSand}; color: ${K.ink};`,

  tbody: `background-color: ${K.ivory};`,

  tr: `border-bottom: 1px solid ${K.ivoryBorder};`,

  th: `font-family: ${K.sans}; font-size: 13px; font-weight: 500; color: ${K.ink}; padding: 10px 14px; text-align: left; border-bottom: 1px solid ${K.ivoryBorder}; letter-spacing: 0.02em;`,

  td: `font-family: ${K.sans}; font-size: 14px; font-weight: 400; color: ${K.ink}; padding: 10px 14px; border-bottom: 1px solid ${K.ivoryBorder}; line-height: 1.50;`,

  strong: `font-weight: 500; color: ${K.ink};`,

  em: `font-style: italic; color: ${K.ink};`,

  del: `text-decoration: line-through; color: ${K.caption};`,

  hr: `border: none; border-top: 1px dashed ${K.rule}; margin: 28px 0;`,

  taskListItem: `list-style-type: none; margin: 8px 0; padding-left: 4px; position: relative;`,

  taskListCheckbox: `margin-right: 10px; width: 14px; height: 14px; vertical-align: middle; border: 1px solid ${K.inkBlue};`,
}

export const kamiMeta: ThemeMeta = {
  id: 'kami',
  name: 'Kami',
  description: '温暖纸质感设计，单一油墨蓝点缀 + serif 层级 + 编辑级留白，面向 AI 文档生成',
  // Neobrutalism is the default; Kami is opt-in.
  wrapWithContainer: true,
  containerStyle:
    "max-width: 720px; margin: 0 auto; padding: 32px 28px; background-color: #F5F4ED; font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif; color: #141413; font-size: 15px; line-height: 1.55;",
}

export const kamiTheme: Theme = {
  meta: kamiMeta,
  tokens: kamiTokens,
  elementStyles: kamiElementStyles,
}

// ============================================================
// Registry & helpers
// ============================================================

/**
 * All available themes
 */
export const themes: Record<ThemeId, Theme> = {
  neobrutalism: neobrutalismTheme,
  kami: kamiTheme,
}

/**
 * Get theme by ID (falls back to neobrutalism for unknown IDs,
 * which is required by noUncheckedIndexedAccess).
 */
export function getTheme(id: ThemeId): Theme {
  return themes[id] ?? themes.neobrutalism
}

/**
 * Get available theme metadata
 */
export function getAvailableThemes(): ThemeMeta[] {
  return Object.values(themes).map((theme) => theme.meta)
}

/**
 * Get the full element style map for a theme
 */
export function getElementStyleMap(themeId: ThemeId = 'neobrutalism'): ElementStyleMap {
  return getTheme(themeId).elementStyles
}

/**
 * Get theme metadata for a theme
 */
export function getThemeMeta(themeId: ThemeId = 'neobrutalism'): ThemeMeta {
  return getTheme(themeId).meta
}

/**
 * Get element style for a specific element and theme
 */
export function getElementStyle(
  element: keyof ElementStyleMap,
  themeId: ThemeId = 'neobrutalism'
): string {
  return getTheme(themeId).elementStyles[element]
}
