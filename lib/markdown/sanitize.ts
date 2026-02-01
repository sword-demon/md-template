/**
 * HTML Sanitizer for WeChat Compatibility
 * 
 * Filters out WeChat-incompatible HTML tags and attributes
 */

/**
 * Tags allowed by WeChat rich text editor
 */
const ALLOWED_TAGS = new Set([
  // Structural
  'section', 'div', 'span', 'p', 'br', 'hr',
  // Headings
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  // Text formatting
  'strong', 'b', 'em', 'i', 'u', 's', 'del', 'mark', 'sub', 'sup',
  // Lists
  'ul', 'ol', 'li',
  // Links and media
  'a', 'img',
  // Tables
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
  // Code
  'pre', 'code',
  // Quotes
  'blockquote',
  // Input (for task lists)
  'input',
])

/**
 * Attributes allowed by WeChat
 */
const ALLOWED_ATTRIBUTES = new Set([
  'style',
  'class',
  'href',
  'src',
  'alt',
  'title',
  'width',
  'height',
  'colspan',
  'rowspan',
  'type',
  'checked',
  'disabled',
])

/**
 * CSS properties that WeChat supports
 */
const ALLOWED_CSS_PROPERTIES = new Set([
  // Box model
  'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
  'border-width', 'border-style', 'border-color',
  'width', 'height', 'max-width', 'min-width',
  // Typography
  'font-family', 'font-size', 'font-weight', 'font-style',
  'line-height', 'letter-spacing', 'text-align', 'text-decoration',
  'text-transform', 'text-indent', 'white-space', 'word-wrap', 'word-break',
  'color', 'background', 'background-color',
  // Layout
  'display', 'float', 'clear', 'overflow', 'overflow-x', 'overflow-y',
  'vertical-align',
  // Table
  'border-collapse', 'border-spacing', 'table-layout',
  // List
  'list-style', 'list-style-type', 'list-style-position',
])

/**
 * CSS properties that WeChat does NOT support well
 * These will be removed during sanitization
 */
const UNSUPPORTED_CSS_PROPERTIES = [
  'box-shadow',
  'text-shadow',
  'border-radius',
  'transform',
  'transition',
  'animation',
  'filter',
  'opacity',
  'position',
  'z-index',
  'top', 'right', 'bottom', 'left',
  'flex', 'flex-direction', 'flex-wrap', 'justify-content', 'align-items',
  'grid', 'grid-template',
]

/**
 * Sanitize HTML for WeChat compatibility
 */
export function sanitizeForWeChat(html: string): string {
  let result = html
  
  // Replace div with section (WeChat prefers section)
  result = result.replace(/<div/gi, '<section')
  result = result.replace(/<\/div>/gi, '</section>')
  
  // Remove unsupported CSS properties
  for (const prop of UNSUPPORTED_CSS_PROPERTIES) {
    // Match property with various value formats
    const regex = new RegExp(`${prop}\\s*:\\s*[^;]+;?`, 'gi')
    result = result.replace(regex, '')
  }
  
  // Convert gradients to solid colors
  result = result.replace(
    /background\s*:\s*linear-gradient\([^)]+\)/gi,
    'background-color: #667eea'
  )
  result = result.replace(
    /background\s*:\s*radial-gradient\([^)]+\)/gi,
    'background-color: #667eea'
  )
  
  // Clean up empty style attributes
  result = result.replace(/style="\s*"/gi, '')
  result = result.replace(/style='\\s*'/gi, '')
  
  // Clean up multiple semicolons
  result = result.replace(/;\s*;+/g, ';')
  result = result.replace(/style="\s*;/gi, 'style="')
  result = result.replace(/;\s*"/g, '"')
  
  // Remove data-* attributes (not needed for WeChat)
  result = result.replace(/\s+data-[a-z-]+="[^"]*"/gi, '')
  
  return result
}

/**
 * Check if a tag is allowed
 */
export function isAllowedTag(tag: string): boolean {
  return ALLOWED_TAGS.has(tag.toLowerCase())
}

/**
 * Check if an attribute is allowed
 */
export function isAllowedAttribute(attr: string): boolean {
  return ALLOWED_ATTRIBUTES.has(attr.toLowerCase())
}

/**
 * Filter CSS properties to only allowed ones
 */
export function filterCssProperties(styleString: string): string {
  const properties = styleString.split(';').filter(Boolean)
  const filtered = properties.filter(prop => {
    const [name] = prop.split(':').map(s => s.trim())
    if (!name) return false
    return ALLOWED_CSS_PROPERTIES.has(name.toLowerCase())
  })
  return filtered.join('; ')
}

export default sanitizeForWeChat
