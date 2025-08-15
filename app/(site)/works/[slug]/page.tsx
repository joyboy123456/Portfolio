"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Calendar, Tag, ImageIcon, Palette } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import worksData from "@/data/works.json"

export default function WorkDetail({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [work, setWork] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    setTimeout(() => {
      const workData = worksData.find((w) => w.slug === params.slug)
      if (workData) {
        setWork(workData)
      }
      setLoading(false)
    }, 800)
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full glass-surface flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="animate-pulse text-white/60">加载作品详情中...</div>
        </div>
      </div>
    )
  }

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full glass-surface flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-white/40" />
          </div>
          <h1 className="text-2xl font-bold text-white">作品未找到</h1>
          <p className="text-white/60">抱歉，您访问的作品不存在或已被移除</p>
          <Button onClick={() => router.back()} className="btn-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回上一页
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-white hover:bg-white/10 rounded-xl px-4 py-2 transition-all duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回作品
          </Button>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 rounded-xl px-4 py-2 transition-all duration-200"
              onClick={() => alert("Coming Soon! 下载功能正在开发中...")}
            >
              <Download className="mr-2 h-4 w-4" />
              下载原图
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-20 pb-12">
        <div className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${work.cover})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
              <div className="max-w-4xl space-y-6 animate-fade-in-up">
                <div className="flex items-center space-x-4 text-sm text-white/60">
                  <span className="flex items-center">
                    <Palette className="mr-2 h-4 w-4" />
                    ComfyUI 成品作品
                  </span>
                  <span className="flex items-center">
                    <Tag className="mr-2 h-4 w-4" />
                    {work.category}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {work.date}
                  </span>
                </div>

                <h1 className="font-display text-5xl font-bold text-white leading-tight">{work.title}</h1>

                <p className="text-xl text-white/80 leading-relaxed max-w-3xl">{work.summary}</p>

                <div className="flex flex-wrap gap-2 pt-4">
                  {work.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 border border-white/20 hover:bg-white/20 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-white flex items-center">
                  <ImageIcon className="mr-3 h-6 w-6 text-primary" />
                  作品展示
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {work.outputs.map((output: string, index: number) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-2xl glass-card hover-lift group cursor-pointer"
                      onClick={() => setSelectedImage(output)}
                    >
                      <img
                        src={output || "/placeholder.svg?height=600&width=800&text=ComfyUI+Output"}
                        alt={`${work.title} - 输出 ${index + 1}`}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-sm font-medium">点击查看大图</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-white">创作说明</h2>
                <div className="glass-card p-6 rounded-2xl hover-lift">
                  <p className="text-white/70 leading-relaxed">{work.description}</p>
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <div className="glass-card p-6 rounded-2xl sticky top-24 hover-lift">
                <h3 className="font-display text-lg font-semibold text-white mb-6">作品信息</h3>
                <div className="space-y-4">
                  <div>
                    <dt className="text-sm text-white/60 mb-1">分类</dt>
                    <dd className="text-white">{work.category}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-white/60 mb-1">创作日期</dt>
                    <dd className="text-white">{work.date}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-white/60 mb-1">标签</dt>
                    <dd className="flex flex-wrap gap-2 mt-2">
                      {work.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80 border border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <Button
                    className="w-full btn-primary rounded-xl transition-all duration-200 hover:scale-105"
                    onClick={() => alert("Coming Soon! 下载功能正在开发中...")}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    下载高清原图
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-full">
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="预览图"
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
            <Button
              variant="ghost"
              className="absolute top-4 right-4 text-white hover:bg-white/10 rounded-xl"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
