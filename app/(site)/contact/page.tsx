"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageCircle, Github, Twitter, Linkedin } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ContactPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 模拟表单提交
    setTimeout(() => {
      alert("感谢您的留言！我会尽快回复您。")
      setFormData({ name: "", email: "", subject: "", message: "" })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "邮箱地址",
      content: "alex@designstudio.com",
      description: "工作咨询与合作",
    },
    {
      icon: Phone,
      title: "电话号码",
      content: "+86 138 0000 0000",
      description: "紧急项目联系",
    },
    {
      icon: MapPin,
      title: "工作地点",
      content: "上海市浦东新区",
      description: "可安排线下会面",
    },
    {
      icon: Clock,
      title: "工作时间",
      content: "周一至周五 9:00-18:00",
      description: "通常24小时内回复",
    },
  ]

  const socialLinks = [
    { icon: Github, name: "GitHub", url: "#", username: "@alexchen" },
    { icon: Twitter, name: "Twitter", url: "#", username: "@alexchen_ai" },
    { icon: Linkedin, name: "LinkedIn", url: "#", username: "Alex Chen" },
  ]

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
              <h1 className="font-display text-2xl font-semibold text-white">联系方式</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 pb-12">
        {/* Hero区域 */}
        <div className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <div className="space-y-6 animate-fade-in-up">
              <div className="w-16 h-16 mx-auto rounded-full glass-surface flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-display text-4xl font-bold text-white">让我们开始对话</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                无论是项目合作、技术咨询还是简单的问候，我都很乐意听到您的声音。 让我们一起创造令人惊艳的AI艺术作品。
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* 联系表单 */}
            <div className="lg:col-span-2">
              <Card className="glass-card border-white/10 hover-lift">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Send className="mr-3 h-6 w-6 text-primary" />
                    发送消息
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">
                          姓名 *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="请输入您的姓名"
                          required
                          className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-primary focus:bg-white/15"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          邮箱 *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="请输入您的邮箱"
                          required
                          className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-primary focus:bg-white/15"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white">
                        主题 *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="请简要描述您的需求"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-primary focus:bg-white/15"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">
                        详细信息 *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="请详细描述您的项目需求、预算范围、时间要求等..."
                        required
                        rows={6}
                        className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-primary focus:bg-white/15 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary rounded-xl transition-all duration-200 hover:scale-105"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          发送中...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          发送消息
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* 联系信息 */}
            <div className="space-y-8">
              {/* 联系方式 */}
              <Card className="glass-card border-white/10 hover-lift">
                <CardHeader>
                  <CardTitle className="text-white">联系信息</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-lg glass-surface flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{info.title}</h3>
                        <p className="text-white/80 font-medium">{info.content}</p>
                        <p className="text-white/60 text-sm">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 社交媒体 */}
              <Card className="glass-card border-white/10 hover-lift">
                <CardHeader>
                  <CardTitle className="text-white">社交媒体</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="flex items-center space-x-3 p-3 rounded-lg glass-surface hover:bg-white/10 transition-all duration-200 group"
                    >
                      <social.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" />
                      <div>
                        <p className="text-white font-medium">{social.name}</p>
                        <p className="text-white/60 text-sm">{social.username}</p>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* 响应时间 */}
              <Card className="glass-card border-white/10 hover-lift">
                <CardContent className="p-6">
                  <h3 className="font-medium text-white mb-4">响应承诺</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-white/80 text-sm">邮件：24小时内回复</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <span className="text-white/80 text-sm">电话：工作时间内接听</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="text-white/80 text-sm">项目咨询：48小时内详细回复</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
