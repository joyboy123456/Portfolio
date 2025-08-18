import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import WorkflowDetailClient from "./workflow-detail-client"

export default async function WorkflowDetail({ params }: { params: { slug: string } }) {
  const supabase = createClient()

  const { data: workflow, error } = await supabase
    .from("workflows")
    .select(`
      *,
      workflow_outputs (
        id,
        image_url,
        alt_text,
        sort_order
      )
    `)
    .eq("slug", params.slug)
    .single()

  if (error || !workflow) {
    notFound()
  }

  const transformedWorkflow = {
    ...workflow,
    cover: workflow.cover_image_url,
    summary: workflow.description,
    date: new Date(workflow.created_at).toLocaleDateString("zh-CN"),
    workflow_image: workflow.workflow_image_url,
    samples:
      workflow.workflow_outputs
        ?.sort((a: any, b: any) => a.sort_order - b.sort_order)
        .map((output: any) => output.image_url) || [],
    prompt: workflow.description || "暂无详细说明",
    notes: workflow.description || "暂无使用说明",
    env: {
      comfyui: "最新版本",
      custom_nodes: ["基础节点包"],
    },
  }

  return <WorkflowDetailClient workflow={transformedWorkflow} />
}
