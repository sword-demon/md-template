/**
 * Code Highlight Plugin with Mac Window Style
 * 
 * Transforms code blocks into Mac-style windows with syntax highlighting
 */

import { codeToHtml, type BundledLanguage } from 'shiki'

// Supported languages
const SUPPORTED_LANGUAGES = new Set([
  'javascript', 'js', 'typescript', 'ts', 'jsx', 'tsx',
  'python', 'py', 'java', 'c', 'cpp', 'csharp', 'cs',
  'go', 'rust', 'ruby', 'php', 'swift', 'kotlin',
  'html', 'css', 'scss', 'sass', 'less',
  'json', 'yaml', 'yml', 'xml', 'markdown', 'md',
  'bash', 'shell', 'sh', 'zsh', 'powershell', 'ps1',
  'sql', 'graphql', 'docker', 'dockerfile',
  'vue', 'svelte', 'astro', 'text', 'plaintext',
])

// Language display names
const LANGUAGE_NAMES: Record<string, string> = {
  javascript: 'JavaScript', js: 'JavaScript',
  typescript: 'TypeScript', ts: 'TypeScript',
  jsx: 'JSX', tsx: 'TSX',
  python: 'Python', py: 'Python',
  java: 'Java', c: 'C', cpp: 'C++',
  csharp: 'C#', cs: 'C#',
  go: 'Go', rust: 'Rust', ruby: 'Ruby',
  php: 'PHP', swift: 'Swift', kotlin: 'Kotlin',
  html: 'HTML', css: 'CSS', scss: 'SCSS',
  json: 'JSON', yaml: 'YAML', yml: 'YAML', xml: 'XML',
  bash: 'Bash', shell: 'Shell', sh: 'Shell', zsh: 'Zsh',
  sql: 'SQL', graphql: 'GraphQL',
  vue: 'Vue', svelte: 'Svelte',
  text: 'Code', plaintext: 'Code',
}

// Inline styles - WeChat compatible (using section, no box-shadow/border-radius)
const STYLES = {
  container: 'margin: 20px 0; border: 3px solid #000; overflow: hidden; background: #1e1e2e;',
  header: 'padding: 10px 14px; background: #2d2d3d; border-bottom: 2px solid #000;',
  dotsWrap: 'display: inline-block;',
  dot: 'display: inline-block; width: 12px; height: 12px; margin-right: 8px; vertical-align: middle;',
  dotRed: 'display: inline-block; width: 12px; height: 12px; margin-right: 8px; background: #ff5f56; vertical-align: middle;',
  dotYellow: 'display: inline-block; width: 12px; height: 12px; margin-right: 8px; background: #ffbd2e; vertical-align: middle;',
  dotGreen: 'display: inline-block; width: 12px; height: 12px; margin-right: 8px; background: #27c93f; vertical-align: middle;',
  langLabel: "float: right; font-family: -apple-system, sans-serif; font-size: 12px; color: #888; text-transform: uppercase; line-height: 24px;",
  codeWrap: 'padding: 16px; overflow-x: auto; background: #1e1e2e;',
  pre: 'margin: 0; padding: 0; background: transparent; border: none; white-space: pre-wrap; word-wrap: break-word;',
  code: "font-family: Menlo, Consolas, monospace; font-size: 14px; line-height: 1.6; color: #cdd6f4; white-space: pre-wrap; word-wrap: break-word;",
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function decodeHtml(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
}

async function highlightCode(code: string, lang: string): Promise<string> {
  const normalizedLang = lang.toLowerCase()
  
  try {
    const shikiLang = SUPPORTED_LANGUAGES.has(normalizedLang) 
      ? (normalizedLang as BundledLanguage)
      : 'text'
    
    const html = await codeToHtml(code, {
      lang: shikiLang,
      theme: 'catppuccin-mocha',
    })
    
    // Replace shiki's pre/code styles with our own
    return html
      .replace(/<pre[^>]*style="[^"]*"[^>]*>/, `<pre style="${STYLES.pre}">`)
      .replace(/<pre>/, `<pre style="${STYLES.pre}">`)
      .replace(/<code[^>]*>/, `<code style="${STYLES.code}">`)
  } catch {
    return `<pre style="${STYLES.pre}"><code style="${STYLES.code}">${escapeHtml(code)}</code></pre>`
  }
}

function createMacWindow(highlightedCode: string, lang: string): string {
  const langName = LANGUAGE_NAMES[lang.toLowerCase()] ?? (lang.toUpperCase() || 'CODE')
  
  // Use section tags for WeChat compatibility, clear float after header
  return `<section style="${STYLES.container}"><section style="${STYLES.header}"><span style="${STYLES.langLabel}">${langName}</span><span style="${STYLES.dotRed}"></span><span style="${STYLES.dotYellow}"></span><span style="${STYLES.dotGreen}"></span><div style="clear:both;"></div></section><section style="${STYLES.codeWrap}">${highlightedCode}</section></section>`
}

/**
 * Empty rehype plugin - we process code blocks in post-processing
 */
export function rehypeCodeHighlight() {
  return () => {}
}

/**
 * Process HTML to transform code blocks into Mac-style windows
 */
export async function processCodeBlocks(html: string): Promise<string> {
  // Find all <pre><code> blocks
  const codeBlockRegex = /<pre[^>]*>\s*<code(?:\s+class="language-([^"]*)")?[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi
  
  const matches: Array<{ full: string; lang: string; code: string }> = []
  let match: RegExpExecArray | null
  
  // Collect all matches first
  const tempHtml = html
  const regex = new RegExp(codeBlockRegex.source, 'gi')
  
  while ((match = regex.exec(tempHtml)) !== null) {
    matches.push({
      full: match[0],
      lang: match[1] ?? 'text',
      code: decodeHtml(match[2] ?? ''),
    })
  }
  
  // Process matches sequentially to avoid race conditions
  let result = html
  
  for (const { full, lang, code } of matches) {
    const highlighted = await highlightCode(code, lang)
    const macWindow = createMacWindow(highlighted, lang)
    result = result.replace(full, macWindow)
  }
  
  return result
}

export default rehypeCodeHighlight
