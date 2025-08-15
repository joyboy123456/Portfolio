"use client"

import { useRouter } from "next/navigation"
import { useState, useRef, useEffect, useCallback } from "react"

interface MediaItem {
  id: string
  type: "image" | "video"
  src: string
  poster?: string
  alt: string
  title: string
  category: string
  tech: string[]
  year: string
  href: string
  badge: string
  isWorkflow?: boolean
}

const waterfallItems: MediaItem[] = [
  {
    id: "work-1",
    type: "image",
    src: "/medical-dashboard-blue.png",
    alt: "人像风格化作品",
    title: "人像风格化作品",
    category: "ComfyUI 成品",
    tech: ["LoRA", "ControlNet", "SDXL"],
    year: "2025",
    href: "/works/portrait-stylization",
    badge: "成品",
  },
  {
    id: "workflow-1",
    type: "video",
    src: "/placeholders/flow-demo.mp4",
    poster: "/glowing-astronaut.png",
    alt: "多ControlNet构图工作流演示",
    title: "多ControlNet构图工作流",
    category: "ComfyUI 工作流",
    tech: ["ControlNet", "OpenPose", "Canny", "Depth"],
    year: "2025",
    href: "/workflows/multi-controlnet",
    badge: "工作流",
    isWorkflow: true,
  },
  {
    id: "work-2",
    type: "image",
    src: "/mobile-shopping-app.png",
    alt: "商业产品摄影",
    title: "商业产品摄影",
    category: "ComfyUI 成品",
    tech: ["产品摄影", "Depth", "专业光影"],
    year: "2025",
    href: "/works/product-photography",
    badge: "成品",
  },
  {
    id: "workflow-2",
    type: "image",
    src: "/financial-dashboard-dark.png",
    alt: "批量处理工作流",
    title: "批量处理工作流",
    category: "ComfyUI 工作流",
    tech: ["批量处理", "自动化", "效率"],
    year: "2025",
    href: "/workflows/batch-processing",
    badge: "工作流",
    isWorkflow: true,
  },
  {
    id: "work-3",
    type: "image",
    src: "/luxury-restaurant-branding.png",
    alt: "奇幻风景创作",
    title: "奇幻风景创作",
    category: "ComfyUI 成品",
    tech: ["奇幻", "概念艺术", "风景"],
    year: "2025",
    href: "/works/fantasy-landscape",
    badge: "成品",
  },
  {
    id: "workflow-3",
    type: "video",
    src: "/placeholders/inpaint-demo.mp4",
    poster: "/educational-platform-interface.png",
    alt: "智能修复工作流演示",
    title: "智能修复工作流",
    category: "ComfyUI 工作流",
    tech: ["Inpainting", "修复", "编辑"],
    year: "2025",
    href: "/workflows/inpainting",
    badge: "工作流",
    isWorkflow: true,
  },
  {
    id: "work-4",
    type: "image",
    src: "/ai-writing-assistant-interface.png",
    alt: "角色设计作品",
    title: "角色设计作品",
    category: "ComfyUI 成品",
    tech: ["角色设计", "Reference", "一致性"],
    year: "2025",
    href: "/works/character-design",
    badge: "成品",
  },
  {
    id: "workflow-4",
    type: "image",
    src: "/music-streaming-app.png",
    alt: "风格迁移工作流",
    title: "风格迁移工作流",
    category: "ComfyUI 工作流",
    tech: ["风格迁移", "艺术化", "创意"],
    year: "2025",
    href: "/workflows/style-transfer",
    badge: "工作流",
    isWorkflow: true,
  },
  {
    id: "work-5",
    type: "image",
    src: "/real-estate-crm-dashboard.png",
    alt: "电影级场景生成",
    title: "电影级场景生成",
    category: "ComfyUI 成品",
    tech: ["电影级", "场景", "渲染"],
    year: "2024",
    href: "/works/cinematic-scenes",
    badge: "成品",
  },
]

function WaterfallItem({ item }: { item: MediaItem }) {
  const router = useRouter()
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playTimeoutRef = useRef<NodeJS.Timeout>()

  const handleVideoPlay = useCallback(async () => {
    if (!videoRef.current) return

    const video = videoRef.current

    // 清除之前的超时
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current)
    }

    try {
      // 检查视频是否已经在播放
      if (!video.paused) return

      // 确保视频已加载足够的数据
      if (video.readyState >= 2) {
        await video.play()
        setIsVideoPlaying(true)
      } else {
        // 如果数据未加载完成，等待一下再尝试
        playTimeoutRef.current = setTimeout(async () => {
          try {
            await video.play()
            setIsVideoPlaying(true)
          } catch (error) {
            // 静默处理播放错误
            console.debug("Video play failed:", error)
          }
        }, 100)
      }
    } catch (error) {
      // 静默处理播放错误，避免控制台报错
      console.debug("Video play failed:", error)
    }
  }, [])

  const handleVideoPause = useCallback(() => {
    if (!videoRef.current) return

    const video = videoRef.current

    // 清除播放超时
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current)
    }

    try {
      // 检查视频是否已经暂停
      if (video.paused) return

      video.pause()
      setIsVideoPlaying(false)
    } catch (error) {
      // 静默处理暂停错误
      console.debug("Video pause failed:", error)
    }
  }, [])

  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleVideoPlay()
          } else {
            handleVideoPause()
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current)
      }
    }
  }, [handleVideoPlay, handleVideoPause])

  return (
    <a href={item.href} className="masonry-item cursor-pointer group">
      <div className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-primary/10">
        {/* 媒体内容 */}
        <div className="relative">
          {item.type === "image" ? (
            <img
              src={item.src || "/placeholder.svg"}
              alt={item.alt}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster={item.poster}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              aria-label={item.alt}
            >
              <source src={item.src} type="video/mp4" />
            </video>
          )}

          {/* 悬浮信息 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    item.isWorkflow ? "bg-purple-500/80 text-white" : "bg-blue-500/80 text-white"
                  }`}
                >
                  {item.badge}
                </span>
                <span className="text-xs text-white/60">{item.year}</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <div className="flex flex-wrap gap-1">
                {item.tech.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-xs text-white/80 bg-white/10 px-2 py-0.5 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export function MasonryWaterfall() {
  return (
    <section className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      <div className="masonry">
        {waterfallItems.map((item) => (
          <WaterfallItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
