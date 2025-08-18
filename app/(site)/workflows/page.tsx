import { createClient } from "@/lib/supabase/server"
import WorkflowsClient from "./workflows-client"

export default async function WorkflowsPage() {
  const supabase = createClient()

  const { data: workflows, error } = await supabase
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
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching workflows:", error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">加载失败</h1>
          <p className="text-white/60">无法加载工作流数据，请稍后重试</p>
        </div>
      </div>
    )
  }

  const transformedWorkflows =
    workflows?.map((workflow) => ({
      ...workflow,
      cover: workflow.cover_image_url,
      summary: workflow.description,
      date: new Date(workflow.created_at).toLocaleDateString("zh-CN"),
      samples: workflow.workflow_outputs?.map((output: any) => output.image_url) || [],
    })) || []

  return <WorkflowsClient workflows={transformedWorkflows} />
}
