"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye, Play } from "lucide-react"

type MediaItem = {
  id: string
  type: "image" | "video" | "hero"
  src: string
  srcWebm?: string
  poster?: string
  alt?: string
  href?: string
  badge?: string
  title: string
  subtitle?: string
  description?: string
  category?: string
  tech?: string[]
  year?: string
  cta?: string
  isWorkflow?: boolean
}

interface MasonryGalleryProps {
  items: MediaItem[]
}

export function MasonryGallery({ items }: MasonryGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const videos = Array.from(node.querySelectorAll("video")) as HTMLVideoElement[]

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement
          if (e.isIntersecting) {
            v.play().catch(() => {
              /* 静默处理 */
            })
          } else {
            v.pause()
          }
        })
      },
      { rootMargin: "200px 0px", threshold: 0.1 },
    )

    videos.forEach((v) => io.observe(v))
    return () => io.disconnect()
  }, [])

  const handleItemClick = (item: MediaItem) => {
    if (item.href) {
      router.push(item.href)
    } else if (item.isWorkflow) {
      router.push("/workflows")
    } else {
      router.push("/works")
    }
  }

  return (
    <div ref={containerRef} className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {items.map((item, index) => {
        // Hero项目特殊处理
        if (item.type === "hero") {
          return (
            <div
              key={item.id}
              className="mb-4 break-inside-avoid col-span-2 relative overflow-hidden bg-neutral-900/30 group cursor-pointer animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.1}s`,
                height: "400px", // Hero固定高度
              }}
              onClick={() => handleItemClick(item)}
            >
              <div className="absolute inset-0">
                <img
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt ?? ""}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover select-none transition-transform duration-700 ease-apple group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {item.badge && (
                <span className="absolute left-4 top-4 text-xs px-3 py-1 bg-primary/90 backdrop-blur-sm text-white rounded-full border border-primary/30 z-20">
                  {item.badge}
                </span>
              )}

              <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                <div className="space-y-4">
                  <h1 className="font-display text-2xl lg:text-3xl font-bold text-white leading-tight">{item.title}</h1>
                  {item.subtitle && <p className="text-white/90 leading-relaxed">{item.subtitle}</p>}
                  {item.description && (
                    <p className="text-sm text-white/70 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  )}
                  {item.cta && (
                    <Button
                      className="btn-primary text-white border-0 px-6 py-3 rounded-xl font-medium"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push("/works")
                      }}
                    >
                      {item.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        }

        // 普通项目的媒体内容
        const content =
          item.type === "image" ? (
            <img
              src={item.src || "/placeholder.svg"}
              alt={item.alt ?? ""}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover select-none"
            />
          ) : (
            <div className="relative">
              <video
                muted
                loop
                playsInline
                preload="metadata"
                poster={item.poster}
                aria-label={item.alt ?? "ComfyUI workflow video"}
                className="w-full h-auto object-cover"
              >
                {item.srcWebm && <source src={item.srcWebm} type="video/webm" />}
                <source src={item.src} type="video/mp4" />
              </video>
              {/* 视频播放指示器 */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </div>
              </div>
            </div>
          )

        return (
          <div
            key={item.id}
            className="mb-4 break-inside-avoid group relative animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* 直角矩形 + 轻微悬浮 */}
            <div
              className="overflow-hidden bg-neutral-900/30 group-hover:scale-[1.01] transition-transform duration-300 cursor-pointer relative"
              onClick={() => handleItemClick(item)}
            >
              {content}

              {/* 悬浮遮罩和交互按钮 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="icon"
                    className="w-12 h-12 rounded-full glass-surface border border-white/20 hover:border-white/40 hover:bg-white/10"
                  >
                    <Eye className="h-5 w-5 text-white" />
                  </Button>
                </div>
              </div>

              {/* 左下角信息 */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm font-semibold text-white line-clamp-1">{item.title}</h3>
                    {item.year && (
                      <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-md">{item.year}</span>
                    )}
                  </div>
                  {item.category && <p className="text-xs text-white/70 line-clamp-1">{item.category}</p>}
                  {item.tech && (
                    <div className="flex flex-wrap gap-1">
                      {item.tech.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs bg-white/10 backdrop-blur-sm text-white/70 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.tech.length > 2 && (
                        <span className="px-2 py-0.5 text-xs text-white/50">+{item.tech.length - 2}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 左上角标签 */}
            {item.badge && (
              <span className="absolute left-2 top-2 text-xs px-2 py-1 bg-white/90 text-black tracking-wide z-20">
                {item.badge}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
