/**
 * Theme Configuration Contracts
 * 
 * 定义主题系统的接口契约
 */

/**
 * 主题 ID 类型（可扩展）
 */
export type ThemeId = 'neobrutalism'
// 未来扩展: | 'minimal' | 'elegant' | 'tech'

/**
 * 主题元数据
 */
export interface ThemeMeta {
  /** 主题唯一标识 */
  id: ThemeId
  
  /** 显示名称 */
  name: string
  
  /** 主题描述 */
  description: string
  
  /** 预览图 URL（可选） */
  previewImage?: string
  
  /** 是否为默认主题 */
  isDefault?: boolean
}

/**
 * 边框配置
 */
export interface BorderConfig {
  width: string
  style: 'solid' | 'dashed' | 'dotted' | 'double'
  color: string
}

/**
 * 阴影配置（Neobrutalism 风格使用偏移阴影）
 */
export interface ShadowConfig {
  offsetX: string
  offsetY: string
  blur: string
  spread?: string
  color: string
}

/**
 * 颜色配置
 */
export interface ColorConfig {
  /** 主色调 */
  primary: string
  /** 次要色 */
  secondary: string
  /** 强调色 */
  accent: string
  /** 背景色 */
  background: string
  /** 表面色（卡片等） */
  surface: string
  /** 文本色 */
  text: string
  /** 文本次要色 */
  textSecondary?: string
  /** 边框色 */
  border?: string
  /** 错误色 */
  error?: string
  /** 成功色 */
  success?: string
}

/**
 * 字体配置
 */
export interface TypographyConfig {
  /** 标题字体 */
  heading: string
  /** 正文字体 */
  body: string
  /** 代码字体 */
  code: string
}

/**
 * 间距配置
 */
export interface SpacingConfig {
  xs: string   // 4px
  sm: string   // 8px
  md: string   // 16px
  lg: string   // 24px
  xl: string   // 32px
  '2xl'?: string // 48px
}

/**
 * 主题设计令牌
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
 * Markdown 元素类型
 */
export type MarkdownElement = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'p' | 'blockquote' | 'pre' | 'code' | 'inlineCode'
  | 'ul' | 'ol' | 'li' | 'a' | 'img'
  | 'table' | 'thead' | 'tbody' | 'tr' | 'th' | 'td'
  | 'strong' | 'em' | 'del' | 'hr'

/**
 * 元素样式映射（内联 CSS 字符串）
 */
export type ElementStyleMap = {
  [K in MarkdownElement]: string
}

/**
 * 完整主题定义
 */
export interface Theme {
  /** 主题元数据 */
  meta: ThemeMeta
  
  /** 设计令牌 */
  tokens: ThemeTokens
  
  /** 元素样式映射 */
  elementStyles: ElementStyleMap
}

/**
 * 主题上下文值
 */
export interface ThemeContextValue {
  /** 当前主题 */
  currentTheme: Theme
  
  /** 当前主题 ID */
  currentThemeId: ThemeId
  
  /** 可用主题列表 */
  availableThemes: ThemeMeta[]
  
  /** 切换主题 */
  setTheme: (id: ThemeId) => void
  
  /** 获取元素样式 */
  getElementStyle: (element: MarkdownElement) => string
}

/**
 * 导航栏 Props（包含主题选择器）
 */
export interface NavbarProps {
  /** 当前主题 ID */
  currentTheme: ThemeId
  
  /** 主题切换回调 */
  onThemeChange: (theme: ThemeId) => void
  
  /** 可用主题列表 */
  availableThemes: ThemeMeta[]
  
  /** 自定义类名 */
  className?: string
}

/**
 * 主题选择器 Props
 */
export interface ThemeSelectorProps {
  /** 当前选中的主题 */
  value: ThemeId
  
  /** 选择变化回调 */
  onChange: (theme: ThemeId) => void
  
  /** 可选主题 */
  options: ThemeMeta[]
  
  /** 是否禁用（仅一个主题时） */
  disabled?: boolean
}
