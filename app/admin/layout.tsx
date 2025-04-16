import type React from "react"
import { redirect } from "next/navigation"
import { createAdminClient } from "@/lib/supabase"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createAdminClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If no session, redirect to login
  if (!session) {
    // Only redirect if we're not already on the login page
    if (!(children as any).props?.childProp?.segment === "login") {
      redirect("/admin/login")
    }
  }

  return <div className="min-h-screen bg-[#0f0f0f] text-white">{children}</div>
}
