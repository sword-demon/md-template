/**
 * Task List Plugin for WeChat Compatibility
 * 
 * Transforms checkbox inputs into styled spans for WeChat
 */

import type { Root, Element } from 'hast'
import { visit } from 'unist-util-visit'

// Checkbox styles
const CHECKBOX_STYLES = {
  unchecked: 'display: inline-block; width: 18px; height: 18px; margin-right: 8px; background-color: #fff; border: 2px solid #000; vertical-align: middle;',
  checked: 'display: inline-block; width: 18px; height: 18px; margin-right: 8px; background-color: #4ECDC4; border: 2px solid #000; text-align: center; line-height: 14px; font-size: 12px; color: #fff; vertical-align: middle;',
  listItem: 'list-style-type: none; margin: 10px 0; padding-left: 0;',
}

/**
 * Rehype plugin to transform task list checkboxes
 */
export function rehypeTaskList() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      // Find input elements with type="checkbox"
      if (
        node.tagName === 'input' &&
        node.properties?.['type'] === 'checkbox'
      ) {
        const isChecked = node.properties['checked'] !== undefined
        
        // Replace input with styled span
        node.tagName = 'span'
        node.properties = {
          style: isChecked ? CHECKBOX_STYLES.checked : CHECKBOX_STYLES.unchecked,
        }
        node.children = isChecked ? [{ type: 'text', value: '✓' }] : []
      }
      
      // Style list items that contain checkboxes (task list items)
      if (node.tagName === 'li' && hasCheckboxChild(node)) {
        node.properties = node.properties ?? {}
        const existingStyle = (node.properties['style'] as string) ?? ''
        node.properties['style'] = existingStyle 
          ? `${existingStyle}; ${CHECKBOX_STYLES.listItem}` 
          : CHECKBOX_STYLES.listItem
      }
    })
  }
}

/**
 * Check if an element has a checkbox child
 */
function hasCheckboxChild(node: Element): boolean {
  if (!node.children) return false
  
  for (const child of node.children) {
    if (child.type === 'element') {
      const element = child as Element
      if (
        element.tagName === 'input' &&
        element.properties?.['type'] === 'checkbox'
      ) {
        return true
      }
      // Also check for our transformed span with checkbox style
      if (
        element.tagName === 'span' &&
        typeof element.properties?.['style'] === 'string' &&
        (element.properties['style'].includes('18px') || 
         element.properties['style'].includes('checkbox'))
      ) {
        return true
      }
    }
  }
  
  return false
}

export default rehypeTaskList
