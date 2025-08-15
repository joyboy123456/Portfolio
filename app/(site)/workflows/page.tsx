"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, Grid, List, Download, Calendar, Workflow } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import workflowsData from "@/data/workflows.json"

export default function WorkflowsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategory, setSelectedCategory] = useState("")

  const categories = ["图像生成", "图像处理", "风格转换", "人像处理", "背景替换"]

  const handleWorkflowClick = (slug: string) => {
    router.push(`/workflows/${slug}`)
  }

  const filteredWorkflows = workflowsData.filter((workflow) => {
    const matchesSearch = workflow.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "" || workflow.tags.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen">
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
              <h1 className="font-display text-2xl font-semibold text-white">工作流案例</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  placeholder="搜索工作流..."
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

          <div className="mb-8">
            <p className="text-white/60">
              共找到 <span className="text-white font-medium">{filteredWorkflows.length}</span> 个工作流
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkflows.map((workflow, index) => (
              <div
                key={workflow.slug}
                className="group cursor-pointer animate-fade-in-up hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleWorkflowClick(workflow.slug)}
              >
                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={workflow.cover || "/placeholder.svg?height=300&width=400&text=ComfyUI+Workflow"}
                      alt={workflow.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 text-xs bg-primary/20 text-primary border border-primary/30 rounded-full">
                        工作流
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Button
                        size="icon"
                        className="w-8 h-8 rounded-lg glass-surface border border-white/20 hover:border-white/40 hover:bg-white/10"
                        onClick={(e) => {
                          e.stopPropagation()
                          alert("Coming Soon! 下载功能正在开发中...")
                        }}
                      >
                        <Download className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-primary font-medium flex items-center">
                        <Workflow className="mr-1 h-3 w-3" />
                        ComfyUI
                      </span>
                      <span className="text-sm text-white/60 flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {workflow.date}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-200">
                      {workflow.title}
                    </h3>

                    <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">{workflow.summary}</p>

                    <div className="flex flex-wrap gap-2">
                      {workflow.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-md text-white/70 border border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                      {workflow.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs text-white/50">+{workflow.tags.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredWorkflows.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full glass-surface flex items-center justify-center">
                <Search className="h-8 w-8 text-white/40" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">未找到相关工作流</h3>
              <p className="text-white/60">尝试调整搜索条件或选择其他分类</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
