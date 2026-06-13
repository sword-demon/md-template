/**
 * Theme Configuration Types
 *
 * Type definitions for the theming system
 */

/**
 * Available theme identifiers
 * Extensible for future themes
 */
export type ThemeId = 'neobrutalism' | 'kami'

/**
 * Theme metadata
 */
export interface ThemeMeta {
  /** Unique theme identifier */
  id: ThemeId

  /** Display name */
  name: string

  /** Theme description */
  description: string

  /** Preview image URL (optional) */
  previewImage?: string

  /** Whether this is the default theme */
  isDefault?: boolean

  /** Whether to wrap output in an outer container (e.g. Kami's parchment section) */
  wrapWithContainer?: boolean

  /** Outer container inline style (used when wrapWithContainer is true) */
  containerStyle?: string
}

/**
 * Border configuration
 */
export interface BorderConfig {
  width: string
  style: 'solid' | 'dashed' | 'dotted' | 'double'
  color: string
}

/**
 * Shadow configuration (Neobrutalism uses offset shadows)
 */
export interface ShadowConfig {
  offsetX: string
  offsetY: string
  blur: string
  spread?: string
  color: string
}

/**
 * Color configuration
 */
export interface ColorConfig {
  /** Primary color */
  primary: string
  /** Secondary color */
  secondary: string
  /** Accent color */
  accent: string
  /** Background color */
  background: string
  /** Surface color (cards, etc.) */
  surface: string
  /** Text color */
  text: string
  /** Secondary text color */
  textSecondary?: string
  /** Border color */
  border?: string
  /** Error color */
  error?: string
  /** Success color */
  success?: string
}

/**
 * Typography configuration
 */
export interface TypographyConfig {
  /** Heading font family */
  heading: string
  /** Body font family */
  body: string
  /** Code font family */
  code: string
}

/**
 * Spacing configuration
 */
export interface SpacingConfig {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl'?: string
}

/**
 * Theme design tokens
 */
export interface ThemeTokens {
  border: BorderConfig
  shadow: ShadowConfig
  colors: ColorConfig
  typography: TypographyConfig
  spacing: SpacingConfig
  borderRadius: string
}

/**
 * Markdown element types for styling
 */
export type MarkdownElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'blockquote'
  | 'pre'
  | 'code'
  | 'inlineCode'
  | 'ul'
  | 'ol'
  | 'li'
  | 'a'
  | 'img'
  | 'table'
  | 'thead'
  | 'tbody'
  | 'tr'
  | 'th'
  | 'td'
  | 'strong'
  | 'em'
  | 'del'
  | 'hr'
  | 'taskListItem'
  | 'taskListCheckbox'

/**
 * Element style mapping (inline CSS strings)
 */
export type ElementStyleMap = {
  [K in MarkdownElement]: string
}

/**
 * Complete theme definition
 */
export interface Theme {
  /** Theme metadata */
  meta: ThemeMeta

  /** Design tokens */
  tokens: ThemeTokens

  /** Element style mappings */
  elementStyles: ElementStyleMap
}

/**
 * Theme context value
 */
export interface ThemeContextValue {
  /** Current theme */
  currentTheme: Theme

  /** Current theme ID */
  currentThemeId: ThemeId

  /** Available themes */
  availableThemes: ThemeMeta[]

  /** Set theme by ID */
  setTheme: (id: ThemeId) => void

  /** Get element style by element type */
  getElementStyle: (element: MarkdownElement) => string
}
