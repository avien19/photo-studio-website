-- Create a table for website images
CREATE TABLE website_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  section TEXT NOT NULL, -- e.g., 'hero', 'portfolio', 'about'
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- Create a table for admin users
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up storage
INSERT INTO storage.buckets (id, name, public) VALUES ('website-images', 'website-images', true);

-- Create policy to allow authenticated uploads
CREATE POLICY "Authenticated users can upload images" 
  ON storage.objects 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (bucket_id = 'website-images');

-- Create policy to allow public viewing of images
CREATE POLICY "Public can view images" 
  ON storage.objects 
  FOR SELECT 
  TO public 
  USING (bucket_id = 'website-images');

-- Create policy to allow authenticated users to update and delete their images
CREATE POLICY "Authenticated users can update and delete images" 
  ON storage.objects 
  FOR DELETE 
  TO authenticated 
  USING (bucket_id = 'website-images');
