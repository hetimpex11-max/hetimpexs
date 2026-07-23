-- Blog enhancements for Shopify-style CMS

-- Add new columns to blogs table
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS hero_image TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES profiles(id);
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS focus_keyword TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS secondary_keywords TEXT[];
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS canonical_url TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS og_title TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS og_description TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS og_image TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS twitter_image TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS robots_index BOOLEAN DEFAULT TRUE;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS robots_follow BOOLEAN DEFAULT TRUE;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS reading_time INTEGER;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS table_of_contents JSONB;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS revision_history JSONB DEFAULT '[]'::jsonb;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS seo_score INTEGER;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS social_sharing JSONB DEFAULT '{}'::jsonb;

-- Create blog_revisions table for revision history
CREATE TABLE IF NOT EXISTS blog_revisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blog_id UUID NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  focus_keyword TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

-- Create blog_tags table for tag management
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_blogs_author ON blogs(author_id);
CREATE INDEX IF NOT EXISTS idx_blogs_scheduled ON blogs(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_blog_revisions_blog ON blog_revisions(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_tags_slug ON blog_tags(slug);

-- RLS policies for blog_revisions
ALTER TABLE blog_revisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read blog_revisions" ON blog_revisions FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage blog_revisions" ON blog_revisions FOR ALL USING (auth.role() = 'authenticated');

-- RLS policies for blog_tags
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read blog_tags" ON blog_tags FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage blog_tags" ON blog_tags FOR ALL USING (auth.role() = 'authenticated');
