import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import AdminLink from "@/components/admin-link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ThinkLab Studios - Photography Excellence",
  description: "Professional photography studio specializing in portrait, commercial, and event photography.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <AdminLink />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'