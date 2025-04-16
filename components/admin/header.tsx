"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { LogOut, Menu, X } from "lucide-react"

export default function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Images", href: "/admin/images" },
    { name: "Sections", href: "/admin/sections" },
    { name: "Users", href: "/admin/users" },
    { name: "Settings", href: "/admin/settings" },
  ]

  return (
    <header className="bg-black/30 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="relative h-8 w-8 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700"></div>
            <div className="absolute inset-[2px] bg-black rounded-md flex items-center justify-center">
              <span className="font-bold text-white text-xs">TL</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tighter">thinkLab</span>
            <span className="text-xs tracking-wider text-red-500">ADMIN</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm text-white/70 hover:text-white transition-colors">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="text-white/70 hover:text-white hidden md:flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex flex-col">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="relative h-8 w-8 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700"></div>
                <div className="absolute inset-[2px] bg-black rounded-md flex items-center justify-center">
                  <span className="font-bold text-white text-xs">TL</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tighter">thinkLab</span>
                <span className="text-xs tracking-wider text-red-500">ADMIN</span>
              </div>
            </Link>
            <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xl font-medium hover:text-red-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="mt-8 text-white/70 hover:text-white flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
