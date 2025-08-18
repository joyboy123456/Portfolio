"use client"

import React from "react"

import { Home, Briefcase, Palette, Mail, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"

const navigation = [
  { name: "首页", icon: Home, href: "/", current: false },
  { name: "成品作品", icon: Briefcase, href: "/works", current: false },
  { name: "工作流案例", icon: Palette, href: "/workflows", current: false },
  { name: "关于我", icon: User, href: "/about", current: false },
  { name: "联系方式", icon: Mail, href: "/contact", current: false },
]

export function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  const handleNavClick = (href: string) => {
    router.push(href)
  }

  const isCurrentPage = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <div className="w-64 sticky top-0 h-[100dvh] z-50 glass-surface border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        <div className="flex h-20 items-center px-6">
          <div className="flex items-center space-apple-md cursor-pointer hover-lift" onClick={() => router.push("/")}>
            <div className="relative w-10 h-10 gradient-primary rounded-xl flex items-center justify-center hover-lift group">
              <div className="w-5 h-5 bg-white rounded-sm transform rotate-45 transition-transform duration-300 group-hover:rotate-[50deg] group-hover:scale-110"></div>
              <div className="absolute inset-0 gradient-primary rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-semibold text-sidebar-foreground tracking-tight">
                Alex Chen
              </span>
              <span className="text-caption text-muted-foreground">ComfyUI Artist</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {navigation.map((item, index) => {
              const isCurrent = isCurrentPage(item.href)
              return (
                <li key={item.name} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={cn(
                      "group relative flex items-center space-apple-md rounded-xl px-4 py-3 text-body font-medium transition-all duration-300 ease-apple w-full text-left",
                      isCurrent
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                    )}
                  >
                    {isCurrent && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 gradient-primary rounded-r-full animate-scale-in"></div>
                    )}

                    {React.createElement(item.icon, {
                      className: cn(
                        "h-5 w-5 shrink-0 transition-all duration-300 ease-apple",
                        hoveredItem === item.name && "scale-110",
                        isCurrent && "text-primary",
                      ),
                    })}

                    <span className="relative">
                      {item.name}
                      {hoveredItem === item.name && !isCurrent && (
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 gradient-primary rounded-full animate-scale-in"></div>
                      )}
                    </span>

                    {hoveredItem === item.name && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl animate-scale-in"></div>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border/50">
          <div className="flex items-center space-apple-md p-3 rounded-xl glass-card hover-lift cursor-pointer group">
            <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-caption font-medium text-sidebar-foreground truncate">Alex Chen</p>
              <p className="text-xs text-muted-foreground truncate">alex@designstudio.com</p>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
