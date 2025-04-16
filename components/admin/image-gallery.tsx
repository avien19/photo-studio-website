"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { supabase } from "@/lib/supabase"
import { Edit, Trash2, Search, Eye, X } from "lucide-react"

interface WebsiteImage {
  id: string
  title: string
  description: string | null
  section: string
  image_url: string
  alt_text: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

interface ImageGalleryProps {
  initialImages: WebsiteImage[]
  sections: string[]
}

export default function ImageGallery({ initialImages, sections }: ImageGalleryProps) {
  const [images, setImages] = useState<WebsiteImage[]>(initialImages)
  const [filteredImages, setFilteredImages] = useState<WebsiteImage[]>(initialImages)
  const [searchTerm, setSearchTerm] = useState("")
  const [sectionFilter, setSectionFilter] = useState<string>("all")
  const [selectedImage, setSelectedImage] = useState<WebsiteImage | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Filter images based on search term and section
  const filterImages = () => {
    let filtered = [...images]

    if (sectionFilter !== "all") {
      filtered = filtered.filter((img) => img.section === sectionFilter)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (img) =>
          img.title.toLowerCase().includes(term) ||
          (img.description && img.description.toLowerCase().includes(term)) ||
          img.alt_text.toLowerCase().includes(term),
      )
    }

    setFilteredImages(filtered)
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setTimeout(() => filterImages(), 300)
  }

  // Handle section filter change
  const handleSectionChange = (value: string) => {
    setSectionFilter(value)
    setTimeout(() => filterImages(), 300)
  }

  // Handle image deletion
  const handleDeleteImage = async () => {
    if (!selectedImage) return

    setIsLoading(true)

    try {
      // 1. Delete the image from storage
      // Extract the path from the URL
      const urlParts = selectedImage.image_url.split("/")
      const filePath = urlParts[urlParts.length - 2] + "/" + urlParts[urlParts.length - 1]

      await supabase.storage.from("website-images").remove([filePath])

      // 2. Delete the database record
      await supabase.from("website_images").delete().eq("id", selectedImage.id)

      // 3. Update the local state
      const updatedImages = images.filter((img) => img.id !== selectedImage.id)
      setImages(updatedImages)
      setFilteredImages(updatedImages.filter((img) => sectionFilter === "all" || img.section === sectionFilter))

      // 4. Close the dialog
      setIsDeleteDialogOpen(false)
      setSelectedImage(null)

      // 5. Refresh the page data
      router.refresh()
    } catch (error) {
      console.error("Error deleting image:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
          <Input
            placeholder="Search images..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 bg-white/5 border-white/10 text-white"
          />
        </div>
        <Select value={sectionFilter} onValueChange={handleSectionChange}>
          <SelectTrigger className="w-full md:w-[180px] bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Filter by section" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-white/10">
            <SelectItem value="all">All Sections</SelectItem>
            {sections.map((section) => (
              <SelectItem key={section} value={section}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredImages.length === 0 ? (
        <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
          <p className="text-white/70">No images found. Try adjusting your filters or upload new images.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-red-500/50 transition-all duration-300"
            >
              <div className="relative aspect-square">
                <Image src={image.image_url || "/placeholder.svg"} alt={image.alt_text} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="w-full">
                    <h3 className="font-medium text-lg truncate">{image.title}</h3>
                    <p className="text-white/70 text-sm">{image.section}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <span className="text-xs text-white/50">Order: {image.display_order}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                    onClick={() => {
                      setSelectedImage(image)
                      setIsPreviewDialogOpen(true)
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white/70 hover:text-red-500 hover:bg-red-500/10"
                    onClick={() => {
                      setSelectedImage(image)
                      setIsDeleteDialogOpen(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-white/10 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-white/70 hover:text-white"
              onClick={() => setIsPreviewDialogOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="mt-4">
            {selectedImage && (
              <div className="space-y-6">
                <div className="relative h-[60vh] w-full">
                  <Image
                    src={selectedImage.image_url || "/placeholder.svg"}
                    alt={selectedImage.alt_text}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-white/70">Details</h3>
                    <p className="text-white mt-1">{selectedImage.description || "No description provided."}</p>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-sm font-medium text-white/70">Section</h3>
                      <p className="text-white">{selectedImage.section}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white/70">Alt Text</h3>
                      <p className="text-white">{selectedImage.alt_text}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white/70">Display Order</h3>
                      <p className="text-white">{selectedImage.display_order}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this image? This action cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="border-white/10 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteImage}
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
