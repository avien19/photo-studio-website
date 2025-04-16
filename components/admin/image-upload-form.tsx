"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { Upload, Loader2 } from "lucide-react"

interface ImageUploadFormProps {
  sections: string[]
}

export default function ImageUploadForm({ sections }: ImageUploadFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [section, setSection] = useState("")
  const [altText, setAltText] = useState("")
  const [displayOrder, setDisplayOrder] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)

      // Auto-fill title if empty
      if (!title) {
        setTitle(selectedFile.name.split(".")[0].replace(/-|_/g, " "))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setError("Please select an image to upload")
      return
    }

    if (!section) {
      setError("Please select a section for this image")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // 1. Upload the file to Supabase Storage
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `${section}/${fileName}`

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("website-images")
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 2. Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("website-images").getPublicUrl(filePath)

      // 3. Insert record into the database
      const { error: dbError } = await supabase.from("website_images").insert({
        title,
        description,
        section,
        image_url: publicUrl,
        alt_text: altText || title,
        display_order: displayOrder,
        is_active: true,
      })

      if (dbError) throw dbError

      // Success
      setSuccess("Image uploaded successfully!")

      // Reset form
      setTitle("")
      setDescription("")
      setAltText("")
      setFile(null)
      setPreview(null)

      // Refresh the page data
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to upload image")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm">{error}</div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-xl text-sm">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="image-upload">Image</Label>
            <div className="mt-1 flex items-center justify-center border-2 border-dashed border-white/20 rounded-2xl p-6 hover:border-red-500/50 transition-colors">
              <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
              {preview ? (
                <div className="relative w-full">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Preview"
                    className="mx-auto max-h-64 rounded-lg object-contain"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFile(null)
                      setPreview(null)
                    }}
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 border-white/20"
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <label htmlFor="image-upload" className="flex flex-col items-center justify-center cursor-pointer py-6">
                  <Upload className="h-12 w-12 text-white/40 mb-2" />
                  <span className="text-white/70">Click to upload an image</span>
                  <span className="text-white/40 text-sm mt-1">PNG, JPG, WEBP up to 10MB</span>
                </label>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="section">Section</Label>
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select a section" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-white/10">
                <SelectItem value="hero">Hero Section</SelectItem>
                <SelectItem value="portfolio">Portfolio</SelectItem>
                <SelectItem value="about">About</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="background">Background</SelectItem>
                {sections.map(
                  (s) =>
                    !["hero", "portfolio", "about", "services", "background"].includes(s) && (
                      <SelectItem key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </SelectItem>
                    ),
                )}
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="display-order">Display Order</Label>
            <Input
              id="display-order"
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(Number.parseInt(e.target.value))}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="alt-text">Alt Text</Label>
            <Input
              id="alt-text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
              placeholder="Describe the image for accessibility"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white/5 border-white/10 text-white min-h-[120px]"
              placeholder="Optional description of the image"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading || !file}
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full px-8"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>Upload Image</>
          )}
        </Button>
      </div>
    </form>
  )
}
