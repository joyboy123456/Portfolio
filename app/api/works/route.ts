import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
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
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch works" }, { status: 500 })
    }

    return NextResponse.json({ works })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const { title, description, slug, cover_image_url, tags, category, images } = body

    // Insert work
    const { data: work, error: workError } = await supabase
      .from("works")
      .insert({
        title,
        description,
        slug,
        cover_image_url,
        tags,
        category,
      })
      .select()
      .single()

    if (workError) {
      console.error("Work insert error:", workError)
      return NextResponse.json({ error: "Failed to create work" }, { status: 500 })
    }

    // Insert images if provided
    if (images && images.length > 0) {
      const imageData = images.map((img: any, index: number) => ({
        work_id: work.id,
        image_url: img.url,
        alt_text: img.alt_text || "",
        sort_order: index,
      }))

      const { error: imagesError } = await supabase.from("work_images").insert(imageData)

      if (imagesError) {
        console.error("Images insert error:", imagesError)
        // Don't fail the whole operation, just log the error
      }
    }

    return NextResponse.json({ work })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
