"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, User, Clock, Award } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState(null)
  const [imageLoading, setImageLoading] = useState({})
  const router = useRouter()

  const handleExternalLinkClick = () => {
    // Handle external link click
  }

  const handleGithubClick = () => {
    // Handle Github click
  }

  const handleImageLoadStart = (key) => {
    setImageLoading((prev) => ({ ...prev, [key]: true }))
  }

  const handleImageLoad = (key) => {
    setImageLoading((prev) => ({ ...prev, [key]: false }))
  }

  useEffect(() => {
    // Fetch project data
    setLoading(false)
    setProject({
      /* project data */
    })
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full glass-surface flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="animate-pulse text-white/60">加载项目详情中...</div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full glass-surface flex items-center justify-center">
            <Tag className="h-8 w-8 text-white/40" />
          </div>
          <h1 className="text-2xl font-bold text-white">项目未找到</h1>
          <p className="text-white/60">抱歉，您访问的项目不存在或已被移除</p>
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
            返回
          </Button>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 rounded-xl p-2 transition-all duration-200"
              onClick={handleExternalLinkClick}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 rounded-xl p-2 transition-all duration-200"
              onClick={handleGithubClick}
            >
              <Github className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-20 pb-12">
        {/* 英雄区域 */}
        <div className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
              <div className="max-w-4xl space-y-6 animate-fade-in-up">
                <div className="flex items-center space-x-4 text-sm text-white/60">
                  <span className="flex items-center">
                    <Tag className="mr-2 h-4 w-4" />
                    {project.category}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {project.year}
                  </span>
                  <span className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {project.client}
                  </span>
                </div>

                <h1 className="font-display text-5xl font-bold text-white leading-tight">{project.title}</h1>

                <p className="text-xl text-white/80 leading-relaxed max-w-3xl">{project.subtitle}</p>

                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tech.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 border border-white/20 hover:bg-white/20 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* 主要内容 */}
            <div className="lg:col-span-2 space-y-12">
              {project.metrics && (
                <section className="space-y-6">
                  <h2 className="font-display text-2xl font-semibold text-white">项目成果</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {project.metrics.map((metric: any, index: number) => (
                      <div key={index} className="glass-card p-6 rounded-2xl text-center hover-lift">
                        <metric.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                        <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                        <div className="text-white/60 text-sm">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-white">项目概述</h2>
                <p className="text-white/70 leading-relaxed text-lg">{project.fullDescription}</p>
              </section>

              <section className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-white">挑战与解决方案</h2>
                <div className="space-y-4">
                  <div className="glass-card p-6 rounded-2xl hover-lift">
                    <h3 className="font-semibold text-white mb-3 flex items-center">
                      <Tag className="mr-2 h-5 w-5 text-primary" />
                      面临的挑战
                    </h3>
                    <p className="text-white/70 leading-relaxed">{project.challenges}</p>
                  </div>
                  <div className="glass-card p-6 rounded-2xl hover-lift">
                    <h3 className="font-semibold text-white mb-3 flex items-center">
                      <Award className="mr-2 h-5 w-5 text-primary" />
                      解决方案
                    </h3>
                    <p className="text-white/70 leading-relaxed">{project.solution}</p>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-white">最终成果</h2>
                <div className="glass-card p-6 rounded-2xl hover-lift">
                  <p className="text-white/70 leading-relaxed">{project.results}</p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-white">项目展示</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.gallery.map((image: string, index: number) => (
                    <div key={index} className="relative overflow-hidden rounded-2xl glass-card hover-lift group">
                      {imageLoading[`gallery-${index}`] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`项目展示 ${index + 1}`}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                        onLoadStart={() => handleImageLoadStart(`gallery-${index}`)}
                        onLoad={() => handleImageLoad(`gallery-${index}`)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <div className="glass-card p-6 rounded-2xl sticky top-24 hover-lift">
                <h3 className="font-display text-lg font-semibold text-white mb-6">项目信息</h3>
                <div className="space-y-4">
                  <div>
                    <dt className="text-sm text-white/60 mb-1 flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      客户
                    </dt>
                    <dd className="text-white">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-white/60 mb-1 flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      项目时长
                    </dt>
                    <dd className="text-white">{project.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-white/60 mb-1 flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      完成时间
                    </dt>
                    <dd className="text-white">{project.year}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-white/60 mb-1 flex items-center">
                      <Tag className="mr-2 h-4 w-4" />
                      技术栈
                    </dt>
                    <dd className="flex flex-wrap gap-2 mt-2">
                      {project.tech.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80 border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <Button
                    className="w-full btn-primary rounded-xl transition-all duration-200 hover:scale-105"
                    onClick={handleExternalLinkClick}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    查看在线演示
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 rounded-xl bg-transparent transition-all duration-200 hover:scale-105"
                    onClick={handleGithubClick}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    查看源代码
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
