/**
 * Theme Outer Container
 *
 * Wraps rendered HTML in a theme's outer container when the theme opts in
 * via ThemeMeta.wrapWithContainer (e.g. Kami's parchment section). Must run
 * after all other post-processing so the container wraps the whole output.
 */

import { getThemeMeta } from '@/lib/styles/theme-config'
import type { ThemeId } from '@/types/theme'

/**
 * Wrap HTML in the theme's outer container if the theme requests it.
 * @param html - Final rendered HTML string (after frontmatter + code blocks)
 * @param themeId - Active theme ID
 * @returns HTML wrapped in the container, or unchanged if not requested
 */
export function wrapWithContainer(html: string, themeId: ThemeId = 'neobrutalism'): string {
  const meta = getThemeMeta(themeId)
  if (!meta.wrapWithContainer || !meta.containerStyle) {
    return html
  }
  return `<section style="${meta.containerStyle}">${html}</section>`
}
