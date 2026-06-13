import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono, Source_Serif_4 } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

// Serif font for the Kami theme (titles). Latin subset only; CJK falls back
// to system serif (Songti SC / SimSun) to avoid bundling a multi-MB font.
const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-source-serif-4',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '微信公众号 Markdown 编辑器',
  description: '将 Markdown 转换为微信公众号兼容的 Neobrutalism 风格富文本',
  keywords: ['Markdown', '微信公众号', 'Neobrutalism', '编辑器', '富文本'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${sourceSerif4.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
