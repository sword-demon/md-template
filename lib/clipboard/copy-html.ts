/**
 * Copy HTML to Clipboard
 * 
 * Clipboard utility for copying rich text HTML
 * Optimized for WeChat compatibility
 */

import type { ClipboardResult } from '@/types/markdown'

/**
 * Transform HTML for WeChat compatibility
 * - Replace div with section
 * - Remove unsupported CSS properties
 * - Simplify complex styles
 */
function transformForWeChat(html: string): string {
  let result = html
  
  // Replace div with section (WeChat prefers section)
  result = result.replace(/<div/g, '<section')
  result = result.replace(/<\/div>/g, '</section>')
  
  // Remove box-shadow (not supported in WeChat)
  result = result.replace(/box-shadow:\s*[^;]+;?/gi, '')
  
  // Remove border-radius (WeChat has limited support)
  result = result.replace(/border-radius:\s*[^;]+;?/gi, '')
  
  // Convert gradient to solid color for fallback
  result = result.replace(
    /background:\s*linear-gradient\([^)]+\)/gi,
    'background: #667eea'
  )
  
  // Clean up multiple semicolons and spaces
  result = result.replace(/;\s*;/g, ';')
  result = result.replace(/style="\s*;/g, 'style="')
  result = result.replace(/;\s*"/g, '"')
  
  return result
}

/**
 * Copy HTML to clipboard using modern Clipboard API
 * Falls back to execCommand for older browsers
 */
export async function copyHtml(html: string): Promise<ClipboardResult> {
  // Validate input
  if (!html || html.trim().length === 0) {
    return {
      success: false,
      method: 'clipboard-api',
      error: '没有内容可复制',
      contentLength: 0,
    }
  }

  // Transform HTML for WeChat compatibility
  const wechatHtml = transformForWeChat(html)

  // Try modern Clipboard API first
  if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
    try {
      const blob = new Blob([wechatHtml], { type: 'text/html' })
      const item = new ClipboardItem({
        'text/html': blob,
        'text/plain': new Blob([stripHtml(html)], { type: 'text/plain' }),
      })
      await navigator.clipboard.write([item])
      
      return {
        success: true,
        method: 'clipboard-api',
        contentLength: wechatHtml.length,
      }
    } catch (error) {
      // If Clipboard API fails, fall through to execCommand
      console.warn('Clipboard API failed, trying execCommand:', error)
    }
  }

  // Fallback: execCommand method
  try {
    const result = copyWithExecCommand(wechatHtml)
    return result
  } catch (error) {
    return {
      success: false,
      method: 'fallback',
      error: error instanceof Error ? error.message : '复制失败',
      contentLength: 0,
    }
  }
}

/**
 * Copy using deprecated execCommand (fallback)
 */
function copyWithExecCommand(html: string): ClipboardResult {
  // Create a temporary container
  const container = document.createElement('div')
  container.innerHTML = html
  
  // Style to make it selectable but invisible
  container.style.cssText = `
    position: fixed;
    left: -9999px;
    top: -9999px;
    opacity: 0;
    pointer-events: none;
  `
  
  document.body.appendChild(container)
  
  try {
    // Select the content
    const range = document.createRange()
    range.selectNodeContents(container)
    
    const selection = window.getSelection()
    if (!selection) {
      throw new Error('无法获取选择对象')
    }
    
    selection.removeAllRanges()
    selection.addRange(range)
    
    // Execute copy command
    const success = document.execCommand('copy')
    
    if (!success) {
      throw new Error('execCommand 复制失败')
    }
    
    // Clear selection
    selection.removeAllRanges()
    
    return {
      success: true,
      method: 'exec-command',
      contentLength: html.length,
    }
  } finally {
    // Clean up
    document.body.removeChild(container)
  }
}

/**
 * Strip HTML tags for plain text fallback
 */
function stripHtml(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent ?? div.innerText ?? ''
}

/**
 * Check if Clipboard API is available
 */
export function isClipboardApiAvailable(): boolean {
  return Boolean(navigator.clipboard && typeof ClipboardItem !== 'undefined')
}
