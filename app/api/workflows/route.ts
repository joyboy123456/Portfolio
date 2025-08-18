import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
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
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch workflows" }, { status: 500 })
    }

    return NextResponse.json({ workflows })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const {
      title,
      description,
      slug,
      cover_image_url,
      workflow_image_url,
      workflow_json_url,
      tags,
      category,
      parameters,
      outputs,
    } = body

    // Insert workflow
    const { data: workflow, error: workflowError } = await supabase
      .from("workflows")
      .insert({
        title,
        description,
        slug,
        cover_image_url,
        workflow_image_url,
        workflow_json_url,
        tags,
        category,
        parameters,
      })
      .select()
      .single()

    if (workflowError) {
      console.error("Workflow insert error:", workflowError)
      return NextResponse.json({ error: "Failed to create workflow" }, { status: 500 })
    }

    // Insert output images if provided
    if (outputs && outputs.length > 0) {
      const outputData = outputs.map((output: any, index: number) => ({
        workflow_id: workflow.id,
        image_url: output.url,
        alt_text: output.alt_text || "",
        sort_order: index,
      }))

      const { error: outputsError } = await supabase.from("workflow_outputs").insert(outputData)

      if (outputsError) {
        console.error("Outputs insert error:", outputsError)
        // Don't fail the whole operation, just log the error
      }
    }

    return NextResponse.json({ workflow })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
