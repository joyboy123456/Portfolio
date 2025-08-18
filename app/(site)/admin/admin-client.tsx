"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { X, LogOut } from "lucide-react"
import { signOut } from "@/lib/actions"

interface UploadedImage {
  url: string
  filename: string
  alt_text?: string
}

interface AdminClientProps {
  user: { id: string; email?: string }
}

export default function AdminClient({ user }: AdminClientProps) {
  const [workForm, setWorkForm] = useState({
    title: "",
    description: "",
    slug: "",
    category: "",
    tags: "",
    cover_image: null as UploadedImage | null,
    images: [] as UploadedImage[],
  })

  const [workflowForm, setWorkflowForm] = useState({
    title: "",
    description: "",
    slug: "",
    category: "",
    tags: "",
    cover_image: null as UploadedImage | null,
    workflow_image: null as UploadedImage | null,
    workflow_json: null as UploadedImage | null,
    outputs: [] as UploadedImage[],
  })

  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const uploadFile = async (file: File, folder = "uploads"): Promise<UploadedImage> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    return await response.json()
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "work-cover" | "work-images" | "workflow-cover" | "workflow-image" | "workflow-json" | "workflow-outputs",
  ) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const uploadPromises = Array.from(files).map((file) =>
        uploadFile(file, type.includes("workflow") ? "workflows" : "works"),
      )

      const uploadedFiles = await Promise.all(uploadPromises)

      if (type === "work-cover") {
        setWorkForm((prev) => ({ ...prev, cover_image: uploadedFiles[0] }))
      } else if (type === "work-images") {
        setWorkForm((prev) => ({ ...prev, images: [...prev.images, ...uploadedFiles] }))
      } else if (type === "workflow-cover") {
        setWorkflowForm((prev) => ({ ...prev, cover_image: uploadedFiles[0] }))
      } else if (type === "workflow-image") {
        setWorkflowForm((prev) => ({ ...prev, workflow_image: uploadedFiles[0] }))
      } else if (type === "workflow-json") {
        setWorkflowForm((prev) => ({ ...prev, workflow_json: uploadedFiles[0] }))
      } else if (type === "workflow-outputs") {
        setWorkflowForm((prev) => ({ ...prev, outputs: [...prev.outputs, ...uploadedFiles] }))
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("上传失败，请重试")
    } finally {
      setUploading(false)
    }
  }

  const submitWork = async () => {
    if (!workForm.title || !workForm.slug) {
      alert("请填写标题和链接")
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch("/api/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: workForm.title,
          description: workForm.description,
          slug: workForm.slug,
          category: workForm.category,
          tags: workForm.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          cover_image_url: workForm.cover_image?.url,
          images: workForm.images,
        }),
      })

      if (response.ok) {
        alert("作品创建成功！")
        setWorkForm({
          title: "",
          description: "",
          slug: "",
          category: "",
          tags: "",
          cover_image: null,
          images: [],
        })
      } else {
        throw new Error("创建失败")
      }
    } catch (error) {
      console.error("Submit error:", error)
      alert("创建失败，请重试")
    } finally {
      setSubmitting(false)
    }
  }

  const submitWorkflow = async () => {
    if (!workflowForm.title || !workflowForm.slug) {
      alert("请填写标题和链接")
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: workflowForm.title,
          description: workflowForm.description,
          slug: workflowForm.slug,
          category: workflowForm.category,
          tags: workflowForm.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          cover_image_url: workflowForm.cover_image?.url,
          workflow_image_url: workflowForm.workflow_image?.url,
          workflow_json_url: workflowForm.workflow_json?.url,
          outputs: workflowForm.outputs,
        }),
      })

      if (response.ok) {
        alert("工作流创建成功！")
        setWorkflowForm({
          title: "",
          description: "",
          slug: "",
          category: "",
          tags: "",
          cover_image: null,
          workflow_image: null,
          workflow_json: null,
          outputs: [],
        })
      } else {
        throw new Error("创建失败")
      }
    } catch (error) {
      console.error("Submit error:", error)
      alert("创建失败，请重试")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 管理员头部 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">内容管理</h1>
          <p className="text-white/60 mt-1">欢迎回来，{user.email}</p>
        </div>
        <form action={signOut}>
          <Button
            type="submit"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            登出
          </Button>
        </form>
      </div>

      <Tabs defaultValue="works" className="w-full">
        <TabsList className="grid w-full grid-cols-2 glass-surface">
          <TabsTrigger value="works" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            成品作品
          </TabsTrigger>
          <TabsTrigger value="workflows" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            工作流案例
          </TabsTrigger>
        </TabsList>

        <TabsContent value="works">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white">创建新作品</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="work-title" className="text-white">
                    标题
                  </Label>
                  <Input
                    id="work-title"
                    value={workForm.title}
                    onChange={(e) => setWorkForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="作品标题"
                    className="bg-white/10 border-white/20 text-white placeholder-white/40"
                  />
                </div>
                <div>
                  <Label htmlFor="work-slug" className="text-white">
                    链接 (slug)
                  </Label>
                  <Input
                    id="work-slug"
                    value={workForm.slug}
                    onChange={(e) => setWorkForm((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="work-slug"
                    className="bg-white/10 border-white/20 text-white placeholder-white/40"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="work-description" className="text-white">
                  描述
                </Label>
                <Textarea
                  id="work-description"
                  value={workForm.description}
                  onChange={(e) => setWorkForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="作品描述"
                  rows={3}
                  className="bg-white/10 border-white/20 text-white placeholder-white/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="work-category" className="text-white">
                    分类
                  </Label>
                  <Input
                    id="work-category"
                    value={workForm.category}
                    onChange={(e) => setWorkForm((prev) => ({ ...prev, category: e.target.value }))}
                    placeholder="如：人像、风景、概念艺术"
                    className="bg-white/10 border-white/20 text-white placeholder-white/40"
                  />
                </div>
                <div>
                  <Label htmlFor="work-tags" className="text-white">
                    标签
                  </Label>
                  <Input
                    id="work-tags"
                    value={workForm.tags}
                    onChange={(e) => setWorkForm((prev) => ({ ...prev, tags: e.target.value }))}
                    placeholder="标签1, 标签2, 标签3"
                    className="bg-white/10 border-white/20 text-white placeholder-white/40"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white">封面图片</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "work-cover")}
                    disabled={uploading}
                    className="bg-white/10 border-white/20 text-white"
                  />
                  {workForm.cover_image && (
                    <img
                      src={workForm.cover_image.url || "/placeholder.svg"}
                      alt="封面"
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                </div>
              </div>

              <div>
                <Label className="text-white">作品图片</Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload(e, "work-images")}
                  disabled={uploading}
                  className="bg-white/10 border-white/20 text-white"
                />
                {workForm.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {workForm.images.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img.url || "/placeholder.svg"}
                          alt={`图片 ${index + 1}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 w-6 h-6 p-0"
                          onClick={() =>
                            setWorkForm((prev) => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== index),
                            }))
                          }
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button onClick={submitWork} disabled={submitting || uploading} className="w-full btn-primary">
                {submitting ? "创建中..." : "创建作品"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows">
          {/* ... existing workflow form code ... */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white">创建新工作流</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Similar form structure for workflows */}
              <Button onClick={submitWorkflow} disabled={submitting || uploading} className="w-full btn-primary">
                {submitting ? "创建中..." : "创建工作流"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
