"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, Grid, List } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Work {
  id: string
  title: string
  description: string
  slug: string
  cover: string
  summary: string
  category: string
  tags: string[]
  date: string
  outputs: string[]
}

interface WorksClientProps {
  works: Work[]
}

export default function WorksClient({ works }: WorksClientProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategory, setSelectedCategory] = useState("")

  const categories = Array.from(new Set(works.map((work) => work.category).filter(Boolean)))

  const handleWorkClick = (slug: string) => {
    router.push(`/works/${slug}`)
  }

  const filteredWorks = works.filter((work) => {
    const matchesSearch = work.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "" || work.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen">
      {/* 固定头部 */}
      <div className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="text-white hover:bg-white/10 rounded-xl px-4 py-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回
              </Button>
              <h1 className="font-display text-2xl font-semibold text-white">成品作品</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  placeholder="搜索作品..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
                />
              </div>

              <div className="flex items-center bg-white/10 rounded-xl p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "grid" ? "bg-white/20 text-white" : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "list" ? "bg-white/20 text-white" : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* 分类过滤器 */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              <Button
                variant="ghost"
                onClick={() => setSelectedCategory("")}
                className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                  selectedCategory === ""
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-white/70 hover:text-white hover:bg-white/10 border border-white/20"
                }`}
              >
                全部
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-white/70 hover:text-white hover:bg-white/10 border border-white/20"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* 作品统计 */}
          <div className="mb-8">
            <p className="text-white/60">
              共找到 <span className="text-white font-medium">{filteredWorks.length}</span> 个作品
            </p>
          </div>

          {/* 作品网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorks.map((work, index) => (
              <div
                key={work.slug}
                className="group cursor-pointer animate-fade-in-up hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleWorkClick(work.slug)}
              >
                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={work.cover || "/placeholder.svg?height=400&width=400&text=ComfyUI+Work"}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 text-xs bg-primary/20 text-primary border border-primary/30 rounded-full">
                        {work.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <h3 className="font-display text-lg font-semibold text-white mb-1 line-clamp-1">{work.title}</h3>
                      <p className="text-white/80 text-sm line-clamp-2">{work.summary}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredWorks.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full glass-surface flex items-center justify-center">
                <Search className="h-8 w-8 text-white/40" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">未找到相关作品</h3>
              <p className="text-white/60">尝试调整搜索条件或选择其他分类</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
