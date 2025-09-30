import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-jp'
})

export const metadata: Metadata = {
  title: 'COCOMO - あなたの新しい家族｜コンパニオンロボット',
  description: 'COCOMOは、あなたの日常に寄り添う次世代コンパニオンロボットです。温かいふれあいと先進技術で、新しい家族の形を提案します。',
  keywords: 'コンパニオンロボット, AI, 家族, 癒し, 日本, ロボット',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'COCOMO - あなたの新しい家族',
    description: 'COCOMOは、あなたの日常に寄り添う次世代コンパニオンロボットです。',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${notoSansJP.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}