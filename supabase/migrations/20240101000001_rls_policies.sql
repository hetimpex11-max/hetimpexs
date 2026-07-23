-- Enable RLS on all tables
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Roles policies
CREATE POLICY "Allow public read roles" ON roles FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage roles" ON roles FOR ALL USING (auth.role() = 'authenticated');

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Allow authenticated users to view all profiles" ON profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage profiles" ON profiles FOR ALL USING (auth.role() = 'authenticated');

-- Product categories policies
CREATE POLICY "Allow public read product_categories" ON product_categories FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage product_categories" ON product_categories FOR ALL USING (auth.role() = 'authenticated');

-- Products policies
CREATE POLICY "Allow public read published products" ON products FOR SELECT USING (status = 'published');
CREATE POLICY "Allow authenticated users to manage products" ON products FOR ALL USING (auth.role() = 'authenticated');

-- Blog categories policies
CREATE POLICY "Allow public read blog_categories" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage blog_categories" ON blog_categories FOR ALL USING (auth.role() = 'authenticated');

-- Blogs policies
CREATE POLICY "Allow public read published blogs" ON blogs FOR SELECT USING (status = 'published');
CREATE POLICY "Allow authenticated users to manage blogs" ON blogs FOR ALL USING (auth.role() = 'authenticated');

-- SEO pages policies
CREATE POLICY "Allow public read seo_pages" ON seo_pages FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage seo_pages" ON seo_pages FOR ALL USING (auth.role() = 'authenticated');

-- Downloads policies
CREATE POLICY "Allow public read downloads" ON downloads FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage downloads" ON downloads FOR ALL USING (auth.role() = 'authenticated');

-- Media policies
CREATE POLICY "Allow public read media" ON media FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage media" ON media FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials policies
CREATE POLICY "Allow public read published testimonials" ON testimonials FOR SELECT USING (status = 'published');
CREATE POLICY "Allow authenticated users to manage testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

-- Inquiries policies
CREATE POLICY "Allow public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to manage inquiries" ON inquiries FOR ALL USING (auth.role() = 'authenticated');

-- Settings policies
CREATE POLICY "Allow public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage settings" ON settings FOR ALL USING (auth.role() = 'authenticated');

-- Activity logs policies
CREATE POLICY "Allow authenticated users to read activity_logs" ON activity_logs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to insert activity_logs" ON activity_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
