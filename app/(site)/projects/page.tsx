"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, Grid, List, ExternalLink, Github } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const categories = ["前端", "后端", "全栈", "设计"]
const projects = [
  {
    id: 1,
    title: "项目A",
    description: "这是一个前端项目",
    category: "前端",
    year: 2022,
    status: "已完成",
    image: "/projectA.svg",
    tech: ["React", "JavaScript", "CSS"],
  },
  {
    id: 2,
    title: "项目B",
    description: "这是一个后端项目",
    category: "后端",
    year: 2023,
    status: "进行中",
    image: "/projectB.svg",
    tech: ["Node.js", "Express", "MongoDB"],
  },
  // ... 其他项目
]

export default function ProjectsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategory, setSelectedCategory] = useState("")

  const handleProjectClick = (projectId) => {
    router.push(`/projects/${projectId}`)
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "" || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen">
      {/* 固定头部 */}
      <div className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-white/10">
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
              <h1 className="font-display text-2xl font-semibold text-white">项目作品</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  placeholder="搜索项目..."
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

          {/* 项目统计 */}
          <div className="mb-8">
            <p className="text-white/60">
              共找到 <span className="text-white font-medium">{filteredProjects.length}</span> 个项目
            </p>
          </div>

          {/* 项目网格 */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group cursor-pointer animate-fade-in-up hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div className="glass-card rounded-2xl overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            project.status === "已完成"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : project.status === "进行中"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Button
                          size="icon"
                          className="w-8 h-8 rounded-lg glass-surface border border-white/20 hover:border-white/40 hover:bg-white/10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4 text-white" />
                        </Button>
                        <Button
                          size="icon"
                          className="w-8 h-8 rounded-lg glass-surface border border-white/20 hover:border-white/40 hover:bg-white/10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-primary font-medium">{project.category}</span>
                        <span className="text-sm text-white/60">{project.year}</span>
                      </div>

                      <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-200">
                        {project.title}
                      </h3>

                      <p className="text-white/70 text-sm leading-relaxed mb-4">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-md text-white/70 border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-2 py-1 text-xs text-white/50">+{project.tech.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="glass-card rounded-2xl p-6 hover-lift cursor-pointer group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-24 h-24 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-primary font-medium">{project.category}</span>
                          <span className="text-sm text-white/60">{project.year}</span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              project.status === "已完成"
                                ? "bg-green-500/20 text-green-400"
                                : project.status === "进行中"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-orange-500/20 text-orange-400"
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>

                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button
                            size="icon"
                            className="w-8 h-8 rounded-lg glass-surface border border-white/20 hover:border-white/40 hover:bg-white/10"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-4 w-4 text-white" />
                          </Button>
                          <Button
                            size="icon"
                            className="w-8 h-8 rounded-lg glass-surface border border-white/20 hover:border-white/40 hover:bg-white/10"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="h-4 w-4 text-white" />
                          </Button>
                        </div>
                      </div>

                      <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-200">
                        {project.title}
                      </h3>

                      <p className="text-white/70 text-sm leading-relaxed mb-3">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-md text-white/70 border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full glass-surface flex items-center justify-center">
                <Search className="h-8 w-8 text-white/40" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">未找到相关项目</h3>
              <p className="text-white/60">尝试调整搜索条件或选择其他分类</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
