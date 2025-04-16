import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const section = searchParams.get("section")

  const supabase = createAdminClient()

  let query = supabase.from("website_images").select("*").eq("is_active", true)

  if (section) {
    query = query.eq("section", section)
  }

  const { data, error } = await query.order("display_order", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ images: data })
}
