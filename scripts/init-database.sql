-- Create works table for storing ComfyUI artwork
CREATE TABLE IF NOT EXISTS public.works (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_image TEXT,
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  category TEXT DEFAULT 'digital-art',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workflows table for storing ComfyUI workflows
CREATE TABLE IF NOT EXISTS public.workflows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_image TEXT,
  workflow_image TEXT,
  workflow_json TEXT,
  output_images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  category TEXT DEFAULT 'image-generation',
  difficulty TEXT DEFAULT 'intermediate',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_works_slug ON public.works(slug);
CREATE INDEX IF NOT EXISTS idx_works_featured ON public.works(featured);
CREATE INDEX IF NOT EXISTS idx_works_category ON public.works(category);
CREATE INDEX IF NOT EXISTS idx_works_created_at ON public.works(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_workflows_slug ON public.workflows(slug);
CREATE INDEX IF NOT EXISTS idx_workflows_featured ON public.workflows(featured);
CREATE INDEX IF NOT EXISTS idx_workflows_category ON public.workflows(category);
CREATE INDEX IF NOT EXISTS idx_workflows_difficulty ON public.workflows(difficulty);
CREATE INDEX IF NOT EXISTS idx_workflows_created_at ON public.workflows(created_at DESC);

-- Insert sample data for testing
INSERT INTO public.works (title, slug, description, cover_image, tags, category, featured) VALUES
('AI Portrait Series', 'ai-portrait-series', 'A collection of AI-generated portraits showcasing different artistic styles and techniques.', '/placeholders/cover.png', ARRAY['portrait', 'ai-art', 'digital'], 'digital-art', true),
('Cyberpunk Cityscape', 'cyberpunk-cityscape', 'Futuristic city scenes with neon lights and cyberpunk aesthetics.', '/placeholders/cover.png', ARRAY['cyberpunk', 'cityscape', 'neon'], 'digital-art', false),
('Abstract Compositions', 'abstract-compositions', 'Experimental abstract art created using various AI models and techniques.', '/placeholders/cover.png', ARRAY['abstract', 'experimental', 'composition'], 'abstract', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.workflows (title, slug, description, cover_image, workflow_image, tags, category, difficulty, featured) VALUES
('Basic Text-to-Image', 'basic-text-to-image', 'A simple workflow for generating images from text prompts using Stable Diffusion.', '/placeholders/flow-thumb.png', '/placeholders/flow.png', ARRAY['text-to-image', 'stable-diffusion', 'basic'], 'image-generation', 'beginner', true),
('Advanced Inpainting', 'advanced-inpainting', 'Complex inpainting workflow with multiple conditioning and refinement steps.', '/placeholders/flow-thumb.png', '/placeholders/flow.png', ARRAY['inpainting', 'advanced', 'conditioning'], 'image-editing', 'advanced', false),
('Style Transfer Pipeline', 'style-transfer-pipeline', 'Multi-stage style transfer workflow combining different models and techniques.', '/placeholders/flow-thumb.png', '/placeholders/flow.png', ARRAY['style-transfer', 'pipeline', 'multi-stage'], 'style-transfer', 'intermediate', true)
ON CONFLICT (slug) DO NOTHING;
