import { redirect } from "next/navigation"
import Link from "next/link"
import { createAdminClient } from "@/lib/supabase"
import AdminHeader from "@/components/admin/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, UsersIcon, SettingsIcon, LayoutIcon } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = createAdminClient()

  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  // Get counts for dashboard stats
  const { count: imageCount } = await supabase.from("website_images").select("*", { count: "exact", head: true })

  const adminMenuItems = [
    {
      title: "Manage Images",
      description: "Upload, edit, and organize website images",
      icon: <ImageIcon className="h-8 w-8 text-red-500" />,
      href: "/admin/images",
      count: imageCount || 0,
    },
    {
      title: "Website Sections",
      description: "Configure website sections and content",
      icon: <LayoutIcon className="h-8 w-8 text-red-500" />,
      href: "/admin/sections",
    },
    {
      title: "User Management",
      description: "Manage admin users and permissions",
      icon: <UsersIcon className="h-8 w-8 text-red-500" />,
      href: "/admin/users",
    },
    {
      title: "Settings",
      description: "Configure website settings and preferences",
      icon: <SettingsIcon className="h-8 w-8 text-red-500" />,
      href: "/admin/settings",
    },
  ]

  return (
    <div>
      <AdminHeader />

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminMenuItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-red-500/50 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    {item.icon}
                    {typeof item.count === "number" && (
                      <span className="bg-red-500/20 text-red-500 text-sm px-3 py-1 rounded-full">{item.count}</span>
                    )}
                  </div>
                  <CardTitle className="text-white">{item.title}</CardTitle>
                  <CardDescription className="text-white/70">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="text-white/70 hover:text-white p-0">
                    Manage &rarr;
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
