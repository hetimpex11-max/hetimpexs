-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  permissions TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role_id UUID NOT NULL REFERENCES roles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create product_categories table
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES product_categories(id),
  image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  price DECIMAL(10, 2),
  compare_at_price DECIMAL(10, 2),
  category_id UUID REFERENCES product_categories(id),
  images TEXT[] NOT NULL DEFAULT '{}',
  specifications JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  seo_title TEXT,
  seo_description TEXT,
  seo_image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  featured_image TEXT,
  category_id UUID REFERENCES blog_categories(id),
  author_id UUID NOT NULL REFERENCES profiles(id),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  seo_image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create seo_pages table
CREATE TABLE IF NOT EXISTS seo_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  path TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  og_image TEXT,
  canonical TEXT,
  json_ld JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create downloads table
CREATE TABLE IF NOT EXISTS downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size BIGINT,
  category TEXT,
  download_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create media table
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  path TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size BIGINT NOT NULL,
  folder TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT,
  role TEXT,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'text' CHECK (type IN ('text', 'json', 'image', 'boolean')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_media_folder ON media(folder);

-- Insert default roles
INSERT INTO roles (name, slug, permissions) VALUES
  ('Super Admin', 'super-admin', ARRAY[
    'dashboard:view', 'products:view', 'products:create', 'products:edit', 'products:delete',
    'blogs:view', 'blogs:create', 'blogs:edit', 'blogs:delete',
    'media:view', 'media:upload', 'media:delete',
    'downloads:view', 'downloads:create', 'downloads:edit', 'downloads:delete',
    'testimonials:view', 'testimonials:create', 'testimonials:edit', 'testimonials:delete',
    'inquiries:view', 'inquiries:reply', 'inquiries:delete',
    'settings:view', 'settings:edit',
    'seo:view', 'seo:edit',
    'users:view', 'users:create', 'users:edit', 'users:delete',
    'activity:view'
  ]),
  ('Admin', 'admin', ARRAY[
    'dashboard:view', 'products:view', 'products:create', 'products:edit', 'products:delete',
    'blogs:view', 'blogs:create', 'blogs:edit', 'blogs:delete',
    'media:view', 'media:upload', 'media:delete',
    'downloads:view', 'downloads:create', 'downloads:edit', 'downloads:delete',
    'testimonials:view', 'testimonials:create', 'testimonials:edit', 'testimonials:delete',
    'inquiries:view', 'inquiries:reply', 'inquiries:delete',
    'settings:view', 'settings:edit',
    'seo:view', 'seo:edit',
    'users:view', 'users:create', 'users:edit',
    'activity:view'
  ]),
  ('Editor', 'editor', ARRAY[
    'dashboard:view', 'products:view', 'products:create', 'products:edit',
    'blogs:view', 'blogs:create', 'blogs:edit',
    'media:view', 'media:upload',
    'downloads:view', 'downloads:create', 'downloads:edit',
    'testimonials:view', 'testimonials:create', 'testimonials:edit',
    'inquiries:view', 'inquiries:reply',
    'settings:view',
    'seo:view', 'seo:edit'
  ]),
  ('Viewer', 'viewer', ARRAY[
    'dashboard:view', 'products:view', 'blogs:view', 'media:view',
    'downloads:view', 'testimonials:view', 'inquiries:view',
    'settings:view', 'seo:view', 'activity:view'
  ])
ON CONFLICT (slug) DO NOTHING;

-- Insert default settings
INSERT INTO settings (key, value, type) VALUES
  ('company_name', 'HET IMPEX', 'text'),
  ('company_logo', '', 'image'),
  ('contact_email', 'info@hetimpex.in', 'text'),
  ('contact_phone', '+91 98765 43210', 'text'),
  ('contact_address', 'Mumbai, India', 'text'),
  ('social_facebook', '', 'text'),
  ('social_instagram', '', 'text'),
  ('social_linkedin', '', 'text'),
  ('seo_default_title', 'HET IMPEX | Diamond Manufacturing & Sourcing', 'text'),
  ('seo_default_description', 'Leading diamond manufacturer and exporter based in India.', 'text')
ON CONFLICT (key) DO NOTHING;
