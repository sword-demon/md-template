/**
 * Neobrutalism Rehype Plugin
 * 
 * Injects Neobrutalism inline styles into HTML elements
 * for WeChat compatibility (no external CSS)
 */

import type { Root, Element, ElementContent } from 'hast'
import { visit } from 'unist-util-visit'
import { inlineStyleMap, tagToElementMap } from '@/lib/styles/inline-styles'
import type { MarkdownElement } from '@/types/theme'

export interface NeobrutalismPluginOptions {
  /** Whether to apply styles (default: true) */
  enabled?: boolean
}

/**
 * Rehype plugin to inject Neobrutalism inline styles
 */
export function rehypeNeobrutalism(options: NeobrutalismPluginOptions = {}) {
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
          applyStyle(node, 'inlineCode')
        }
        // Skip code inside pre - handled by code-highlight
        return
      }

      // Get element type from tag name
      const elementType = tagToElementMap[tagName]
      if (elementType) {
        applyStyle(node, elementType)
      }
    })
  }
}

/**
 * Apply inline style to an element
 */
function applyStyle(node: Element, elementType: MarkdownElement): void {
  const style = inlineStyleMap[elementType]
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
          child.type === 'element' && 
          child.tagName === 'code' &&
          child === node
      )
      if (hasCodeChild) {
        found = true
      }
    }
  })
  
  return found
}

export default rehypeNeobrutalism
