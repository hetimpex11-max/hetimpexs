export * from './database'

export interface User {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  role_id: string
  role?: Role
  created_at: string
  updated_at: string
}

export interface Role {
  id: string
  name: string
  slug: string
  permissions: Permission[]
  created_at: string
  updated_at: string
}

export type Permission =
  | 'dashboard:view'
  | 'products:view'
  | 'products:create'
  | 'products:edit'
  | 'products:delete'
  | 'blogs:view'
  | 'blogs:create'
  | 'blogs:edit'
  | 'blogs:delete'
  | 'media:view'
  | 'media:upload'
  | 'media:delete'
  | 'downloads:view'
  | 'downloads:create'
  | 'downloads:edit'
  | 'downloads:delete'
  | 'testimonials:view'
  | 'testimonials:create'
  | 'testimonials:edit'
  | 'testimonials:delete'
  | 'inquiries:view'
  | 'inquiries:reply'
  | 'inquiries:delete'
  | 'settings:view'
  | 'settings:edit'
  | 'seo:view'
  | 'seo:edit'
  | 'users:view'
  | 'users:create'
  | 'users:edit'
  | 'users:delete'
  | 'activity:view'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description: string
  price: number | null
  compare_at_price: number | null
  category_id: string | null
  category?: ProductCategory
  images: string[]
  specifications: Record<string, string>
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  seo_title: string | null
  seo_description: string | null
  seo_image: string | null
  created_at: string
  updated_at: string
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description: string | null
  parent_id: string | null
  image: string | null
  created_at: string
  updated_at: string
}

export interface Blog {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string | null
  category_id: string | null
  category?: BlogCategory
  author_id: string
  author?: User
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  seo_title: string | null
  seo_description: string | null
  seo_image: string | null
  created_at: string
  updated_at: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface Media {
  id: string
  name: string
  url: string
  path: string
  mime_type: string
  size: number
  folder: string
  created_at: string
  updated_at: string
}

export interface Download {
  id: string
  title: string
  description: string | null
  file_url: string
  file_name: string
  file_size: number | null
  category: string | null
  download_count: number
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  company: string | null
  role: string | null
  content: string
  rating: number
  image: string | null
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'closed'
  replied_at: string | null
  created_at: string
  updated_at: string
}

export interface SeoPage {
  id: string
  path: string
  title: string
  description: string
  og_image: string | null
  canonical: string | null
  json_ld: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

export interface Setting {
  id: string
  key: string
  value: string
  type: 'text' | 'json' | 'image' | 'boolean'
  created_at: string
  updated_at: string
}

export interface ActivityLog {
  id: string
  user_id: string | null
  user?: User
  action: string
  entity_type: string
  entity_id: string | null
  details: Record<string, unknown> | null
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

export interface DashboardStats {
  totalProducts: number
  totalBlogs: number
  totalInquiries: number
  totalDownloads: number
  totalTestimonials: number
  totalUsers: number
  recentInquiries: Inquiry[]
  recentProducts: Product[]
  latestBlogs: Blog[]
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
