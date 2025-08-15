"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="animate-fade-in-up">
      <div className="relative h-[46vh] md:h-[52vh] min-h-[360px] overflow-hidden">
        {/* 激光横幅背景 */}
        <img
          src="/aurora-mountains-cinematic.png"
          className="absolute inset-0 w-full h-full object-cover"
          alt="ComfyUI专业作品集背景"
        />

        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />

        {/* 内容区域 */}
        <div className="absolute left-6 bottom-6 md:left-8 md:bottom-8 text-white">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-2 md:mb-3">专注 ComfyUI 生成与工作流设计</h1>
          <p className="text-sm md:text-base text-white/80 mb-4">展示成品图、节点流程与可复用的 workflow</p>
          <Link href="/works">
            <Button className="bg-white/90 text-black hover:bg-white/100 rounded-full px-6 py-2 font-medium transition-all duration-200">
              查看作品 →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
