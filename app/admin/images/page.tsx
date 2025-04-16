import { createAdminClient } from "@/lib/supabase"
import AdminHeader from "@/components/admin/header"
import ImageUploadForm from "@/components/admin/image-upload-form"
import ImageGallery from "@/components/admin/image-gallery"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function AdminImages() {
  const supabase = createAdminClient()

  // Fetch all website images
  const { data: images } = await supabase
    .from("website_images")
    .select("*")
    .order("section", { ascending: true })
    .order("display_order", { ascending: true })

  // Get unique sections for filtering
  const sections = [...new Set(images?.map((img) => img.section) || [])]

  return (
    <div>
      <AdminHeader />

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">Image Management</h1>
        <p className="text-white/70 mb-8">Upload, organize, and manage website images</p>

        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="gallery">Image Gallery</TabsTrigger>
            <TabsTrigger value="upload">Upload New Image</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="mt-6">
            <ImageGallery initialImages={images || []} sections={sections} />
          </TabsContent>

          <TabsContent value="upload" className="mt-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-4">Upload New Image</h2>
              <ImageUploadForm sections={sections} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
