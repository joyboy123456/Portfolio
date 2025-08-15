import type React from "react"
import type { Metadata } from "next"
import { Inter, Manrope } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sf-pro-display",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "绘想 - AI视觉创作平台",
  description: "专业的AI视觉内容创作与展示平台，电影级视觉体验",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${manrope.variable} dark`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
