import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import WorkDetailClient from "./work-detail-client"

export default async function WorkDetail({ params }: { params: { slug: string } }) {
  const supabase = createClient()

  const { data: work, error } = await supabase
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
    .eq("slug", params.slug)
    .single()

  if (error || !work) {
    notFound()
  }

  const transformedWork = {
    ...work,
    cover: work.cover_image_url,
    summary: work.description,
    date: new Date(work.created_at).toLocaleDateString("zh-CN"),
    outputs:
      work.work_images?.sort((a: any, b: any) => a.sort_order - b.sort_order).map((img: any) => img.image_url) || [],
  }

  return <WorkDetailClient work={transformedWork} />
}
