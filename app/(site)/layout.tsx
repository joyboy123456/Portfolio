import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
