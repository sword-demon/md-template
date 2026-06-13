/**
 * Task List Plugin for WeChat Compatibility
 *
 * Transforms checkbox inputs into themed styled spans for WeChat.
 * Theme-aware so Kami's checkboxes use ink-blue (single accent) instead of
 * Neobrutalism's teal.
 */

import type { Root, Element } from 'hast'
import { visit } from 'unist-util-visit'
import type { ThemeId } from '@/types/theme'

interface TaskListStyles {
  unchecked: string
  checked: string
  listItem: string
}

/**
 * Resolve checkbox/list-item styles per theme.
 * Neobrutalism keeps its original teal checkbox (unchanged);
 * Kami uses ink-blue to honor its single-accent rule.
 */
function getTaskListStyles(themeId: ThemeId): TaskListStyles {
  if (themeId === 'kami') {
    return {
      unchecked:
        'display: inline-block; width: 16px; height: 16px; margin-right: 10px; background-color: #fff; border: 1px solid #1B365D; vertical-align: middle; border-radius: 2px;',
      checked:
        'display: inline-block; width: 16px; height: 16px; margin-right: 10px; background-color: #1B365D; border: 1px solid #1B365D; text-align: center; line-height: 14px; font-size: 12px; color: #fff; vertical-align: middle; border-radius: 2px;',
      listItem: 'list-style-type: none; margin: 8px 0; padding-left: 4px;',
    }
  }

  // Neobrutalism (original, unchanged)
  return {
    unchecked:
      'display: inline-block; width: 18px; height: 18px; margin-right: 8px; background-color: #fff; border: 2px solid #000; vertical-align: middle;',
    checked:
      'display: inline-block; width: 18px; height: 18px; margin-right: 8px; background-color: #4ECDC4; border: 2px solid #000; text-align: center; line-height: 14px; font-size: 12px; color: #fff; vertical-align: middle;',
    listItem: 'list-style-type: none; margin: 10px 0; padding-left: 0;',
  }
}

/** Marker property used to detect our checkbox spans (theme-independent) */
const TASK_MARK = 'checkbox'

/**
 * Rehype plugin to transform task list checkboxes
 * @param themeId - Active theme ID (controls checkbox palette)
 */
export function rehypeTaskList(themeId: ThemeId = 'neobrutalism') {
  const styles = getTaskListStyles(themeId)

  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      // Find input elements with type="checkbox"
      if (node.tagName === 'input' && node.properties?.['type'] === 'checkbox') {
        const isChecked = node.properties['checked'] !== undefined

        // Replace input with styled span
        node.tagName = 'span'
        node.properties = {
          style: isChecked ? styles.checked : styles.unchecked,
          'data-task': TASK_MARK,
        }
        node.children = isChecked ? [{ type: 'text', value: '✓' }] : []
      }

      // Style list items that contain checkboxes (task list items)
      if (node.tagName === 'li' && hasCheckboxChild(node)) {
        node.properties = node.properties ?? {}
        const existingStyle = (node.properties['style'] as string) ?? ''
        node.properties['style'] = existingStyle
          ? `${existingStyle}; ${styles.listItem}`
          : styles.listItem
      }
    })
  }
}

/**
 * Check if an element has a checkbox child (theme-independent via data-task)
 */
function hasCheckboxChild(node: Element): boolean {
  if (!node.children) return false

  for (const child of node.children) {
    if (child.type === 'element') {
      const element = child as Element
      if (element.tagName === 'input' && element.properties?.['type'] === 'checkbox') {
        return true
      }
      // Detect our transformed span via the data-task marker
      if (element.tagName === 'span' && element.properties?.['data-task'] === TASK_MARK) {
        return true
      }
    }
  }

  return false
}

export default rehypeTaskList
