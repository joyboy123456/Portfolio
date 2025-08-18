import { createClient } from "@/lib/supabase/server"
import WorksClient from "./works-client"

export default async function WorksPage() {
  const supabase = createClient()

  const { data: works, error } = await supabase
    .from("works")
    .select(`
      *,
      work_images (
        id,
        image_url,
        alt_text,
        sort_order
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching works:", error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">加载失败</h1>
          <p className="text-white/60">无法加载作品数据，请稍后重试</p>
        </div>
      </div>
    )
  }

  const transformedWorks =
    works?.map((work) => ({
      ...work,
      cover: work.cover_image_url,
      summary: work.description,
      date: new Date(work.created_at).toLocaleDateString("zh-CN"),
      outputs: work.work_images?.map((img: any) => img.image_url) || [],
    })) || []

  return <WorksClient works={transformedWorks} />
}
