"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, User, Code, Palette, Award, Calendar, MapPin, Mail, Github, Twitter } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()

  const skills = [
    { name: "ComfyUI", level: 95, category: "AI工具" },
    { name: "Stable Diffusion", level: 90, category: "AI模型" },
    { name: "Photoshop", level: 85, category: "图像处理" },
    { name: "Blender", level: 75, category: "3D建模" },
    { name: "Python", level: 80, category: "编程语言" },
    { name: "Node.js", level: 70, category: "后端开发" },
  ]

  const experiences = [
    {
      title: "高级AI艺术师",
      company: "创意工作室",
      period: "2023 - 至今",
      description: "专注于ComfyUI工作流开发，为客户提供高质量的AI生成艺术作品和技术解决方案。",
    },
    {
      title: "数字艺术师",
      company: "设计公司",
      period: "2021 - 2023",
      description: "负责品牌视觉设计和数字艺术创作，积累了丰富的视觉设计经验。",
    },
    {
      title: "UI/UX设计师",
      company: "科技公司",
      period: "2019 - 2021",
      description: "参与多个产品的界面设计和用户体验优化，培养了敏锐的设计直觉。",
    },
  ]

  const achievements = [
    "ComfyUI社区贡献者，开发了多个热门工作流",
    "AI艺术作品在多个平台获得10万+点赞",
    "为50+客户提供专业的AI艺术服务",
    "举办ComfyUI工作坊，培训了200+学员",
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
              <h1 className="font-display text-2xl font-semibold text-white">关于我</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 pb-12">
        {/* Hero区域 */}
        <div className="relative h-[50vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(/placeholder.svg?height=600&width=1200&text=Creative+Workspace)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
              <div className="max-w-4xl space-y-6 animate-fade-in-up">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full glass-surface flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h1 className="font-display text-4xl font-bold text-white">Alex Chen</h1>
                    <p className="text-xl text-white/80">ComfyUI专家 & AI艺术创作者</p>
                  </div>
                </div>

                <p className="text-lg text-white/70 leading-relaxed max-w-3xl">
                  我是一名专注于AI艺术创作的数字艺术家，擅长使用ComfyUI等工具创造令人惊艳的视觉作品。
                  通过深入研究AI模型和工作流优化，我致力于推动AI艺术的边界，为客户提供独特而富有创意的解决方案。
                </p>

                <div className="flex items-center space-x-6 pt-4">
                  <div className="flex items-center text-white/60">
                    <MapPin className="mr-2 h-4 w-4" />
                    上海，中国
                  </div>
                  <div className="flex items-center text-white/60">
                    <Calendar className="mr-2 h-4 w-4" />
                    5年+ 设计经验
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* 主要内容 */}
            <div className="lg:col-span-2 space-y-12">
              {/* 技能专长 */}
              <section className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-white flex items-center">
                  <Code className="mr-3 h-6 w-6 text-primary" />
                  技能专长
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <Card key={skill.name} className="glass-card border-white/10 hover-lift">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium text-white">{skill.name}</h3>
                          <span className="text-sm text-white/60">{skill.category}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${skill.level}%`,
                              animationDelay: `${index * 0.1}s`,
                            }}
                          />
                        </div>
                        <div className="text-right mt-1">
                          <span className="text-xs text-white/60">{skill.level}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* 工作经历 */}
              <section className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-white flex items-center">
                  <Palette className="mr-3 h-6 w-6 text-primary" />
                  工作经历
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <Card key={index} className="glass-card border-white/10 hover-lift">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-white text-lg">{exp.title}</h3>
                            <p className="text-primary font-medium">{exp.company}</p>
                          </div>
                          <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">{exp.period}</span>
                        </div>
                        <p className="text-white/70 leading-relaxed">{exp.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* 主要成就 */}
              <section className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-white flex items-center">
                  <Award className="mr-3 h-6 w-6 text-primary" />
                  主要成就
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 glass-card rounded-xl hover-lift">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-white/80 leading-relaxed">{achievement}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* 侧边栏 */}
            <div className="space-y-8">
              {/* 联系信息 */}
              <Card className="glass-card border-white/10 sticky top-24 hover-lift">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-white mb-6">联系方式</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-white font-medium">alex@designstudio.com</p>
                        <p className="text-white/60 text-sm">工作邮箱</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Github className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-white font-medium">@alexchen</p>
                        <p className="text-white/60 text-sm">开源项目</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Twitter className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-white font-medium">@alexchen_ai</p>
                        <p className="text-white/60 text-sm">AI艺术分享</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button
                      className="w-full btn-primary rounded-xl transition-all duration-200 hover:scale-105"
                      onClick={() => router.push("/contact")}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      联系我
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 服务范围 */}
              <Card className="glass-card border-white/10 hover-lift">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-white mb-4">服务范围</h3>
                  <div className="space-y-3">
                    {["ComfyUI工作流定制", "AI艺术作品创作", "技术咨询与培训", "品牌视觉设计", "产品界面设计"].map(
                      (service, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="text-white/80 text-sm">{service}</span>
                        </div>
                      ),
                    )}
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
