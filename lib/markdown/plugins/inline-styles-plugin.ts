/**
 * Rehype Inline Styles Plugin
 *
 * Injects theme-aware inline styles into HTML elements for WeChat
 * compatibility (no external CSS). Styles are resolved per-theme via
 * getInlineStyle(element, themeId), so this plugin is theme-agnostic.
 */

import type { Root, Element } from 'hast'
import { visit } from 'unist-util-visit'
import { tagToElementMap, getInlineStyle } from '@/lib/styles/inline-styles'
import type { MarkdownElement, ThemeId } from '@/types/theme'

export interface RehypeInlineStylesOptions {
  /** Theme ID used to resolve element styles (default: 'neobrutalism') */
  themeId?: ThemeId
  /** Whether to apply styles (default: true) */
  enabled?: boolean
}

/**
 * Rehype plugin to inject theme-aware inline styles
 */
export function rehypeInlineStyles(options: RehypeInlineStylesOptions = {}) {
  const themeId: ThemeId = options.themeId ?? 'neobrutalism'
  const { enabled = true } = options

  return (tree: Root) => {
    if (!enabled) return

    visit(tree, 'element', (node: Element) => {
      const tagName = node.tagName.toLowerCase()

      // Skip pre elements - they're handled by code-highlight plugin
      if (tagName === 'pre') {
        return
      }

      // Handle inline code (code not inside pre)
      if (tagName === 'code') {
        const isInlineCode = !isInsidePre(node, tree)
        if (isInlineCode) {
          applyStyle(node, 'inlineCode', themeId)
        }
        // Skip code inside pre - handled by code-highlight
        return
      }

      // Get element type from tag name
      const elementType = tagToElementMap[tagName]
      if (elementType) {
        applyStyle(node, elementType, themeId)
      }
    })
  }
}

/**
 * Apply inline style to an element
 */
function applyStyle(node: Element, elementType: MarkdownElement, themeId: ThemeId): void {
  const style = getInlineStyle(elementType, themeId)
  if (!style) return

  // Initialize properties if needed
  if (!node.properties) {
    node.properties = {}
  }

  // Merge with existing style if present
  const existingStyle = (node.properties['style'] as string) ?? ''
  node.properties['style'] = existingStyle ? `${existingStyle}; ${style}` : style
}

/**
 * Check if a code element is inside a pre element
 */
function isInsidePre(node: Element, tree: Root): boolean {
  let found = false

  visit(tree, 'element', (parent: Element) => {
    if (parent.tagName === 'pre' && parent.children) {
      const hasCodeChild = parent.children.some(
        (child): child is Element =>
          child.type === 'element' && child.tagName === 'code' && child === node
      )
      if (hasCodeChild) {
        found = true
      }
    }
  })

  return found
}

export default rehypeInlineStyles
