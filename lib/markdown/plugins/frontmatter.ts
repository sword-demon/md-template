/**
 * Frontmatter Plugin
 * 
 * Transforms YAML frontmatter into a styled header card
 * compatible with WeChat rich text
 */

import type { Root } from 'mdast'
import { parse as parseYaml } from 'yaml'

// Styles for frontmatter card - WeChat compatible (no gradient, use section)
const STYLES = {
  container: 'margin: 0 0 24px 0; padding: 20px 24px; background-color: #667eea; border: 3px solid #000;',
  title: "font-family: -apple-system, sans-serif; font-size: 24px; font-weight: 700; color: #fff; margin: 0 0 8px 0; line-height: 1.3;",
  description: "font-family: -apple-system, sans-serif; font-size: 15px; color: #e8e8e8; margin: 0; line-height: 1.6;",
  metaContainer: 'margin-top: 16px; padding-top: 12px; border-top: 2px solid #8b9eff;',
  metaItem: "font-family: -apple-system, sans-serif; font-size: 13px; color: #e0e0e0; margin: 4px 0;",
  metaLabel: 'font-weight: 600; color: #FFE135;',
}

interface FrontmatterData {
  title?: string
  description?: string
  date?: string
  author?: string
  tags?: string[] | string
  category?: string
  [key: string]: unknown
}

/**
 * Escape HTML entities
 */
function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Format tags for display
 */
function formatTags(tags: string[] | string | undefined): string {
  if (!tags) return ''
  const tagArray = Array.isArray(tags) ? tags : [tags]
  return tagArray.map(tag => `#${escapeHtml(tag)}`).join(' ')
}

/**
 * Create frontmatter HTML card
 */
function createFrontmatterCard(data: FrontmatterData): string {
  const parts: string[] = []
  
  // Title - use h2 to avoid conflict with article title
  if (data.title) {
    parts.push(`<h2 style="${STYLES.title}">${escapeHtml(data.title)}</h2>`)
  }
  
  // Description
  if (data.description) {
    parts.push(`<p style="${STYLES.description}">${escapeHtml(data.description)}</p>`)
  }
  
  // Additional meta info - use section/p tags for WeChat
  const metaItems: string[] = []
  
  if (data.author) {
    metaItems.push(`<p style="${STYLES.metaItem}"><span style="${STYLES.metaLabel}">作者：</span>${escapeHtml(data.author)}</p>`)
  }
  
  if (data.date) {
    metaItems.push(`<p style="${STYLES.metaItem}"><span style="${STYLES.metaLabel}">日期：</span>${escapeHtml(data.date)}</p>`)
  }
  
  if (data.category) {
    metaItems.push(`<p style="${STYLES.metaItem}"><span style="${STYLES.metaLabel}">分类：</span>${escapeHtml(data.category)}</p>`)
  }
  
  if (data.tags) {
    metaItems.push(`<p style="${STYLES.metaItem}"><span style="${STYLES.metaLabel}">标签：</span>${formatTags(data.tags)}</p>`)
  }
  
  // Add other custom fields
  const knownFields = ['title', 'description', 'author', 'date', 'category', 'tags']
  for (const [key, value] of Object.entries(data)) {
    if (!knownFields.includes(key) && value !== undefined && value !== null) {
      const displayValue = typeof value === 'object' ? JSON.stringify(value) : String(value)
      metaItems.push(`<p style="${STYLES.metaItem}"><span style="${STYLES.metaLabel}">${escapeHtml(key)}：</span>${escapeHtml(displayValue)}</p>`)
    }
  }
  
  if (metaItems.length > 0) {
    parts.push(`<section style="${STYLES.metaContainer}">${metaItems.join('')}</section>`)
  }
  
  return `<section style="${STYLES.container}">${parts.join('')}</section>`
}

/**
 * Store frontmatter for later processing
 */
let extractedFrontmatter: FrontmatterData | null = null

/**
 * Remark plugin to extract and remove frontmatter from AST
 * (we'll render it ourselves with styling)
 */
export function remarkExtractFrontmatter() {
  return (tree: Root) => {
    extractedFrontmatter = null
    
    // Find yaml node (frontmatter)
    const yamlNode = tree.children.find(
      (node): node is typeof node & { type: 'yaml'; value: string } => 
        node.type === 'yaml'
    )
    
    if (yamlNode) {
      try {
        extractedFrontmatter = parseYaml(yamlNode.value) as FrontmatterData
      } catch {
        // Invalid YAML, ignore
        extractedFrontmatter = null
      }
      
      // Remove the yaml node from AST so it doesn't render as text
      tree.children = tree.children.filter(node => node.type !== 'yaml')
    }
  }
}

/**
 * Process HTML to prepend frontmatter card
 */
export function processFrontmatter(html: string): string {
  if (!extractedFrontmatter) {
    return html
  }
  
  const card = createFrontmatterCard(extractedFrontmatter)
  extractedFrontmatter = null
  
  return card + html
}

export default remarkExtractFrontmatter
