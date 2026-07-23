export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          role_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          avatar_url?: string | null
          role_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          role_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      roles: {
        Row: {
          id: string
          name: string
          slug: string
          permissions: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          slug: string
          permissions: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          permissions?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          short_description: string
          price: number | null
          compare_at_price: number | null
          category_id: string | null
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
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          short_description: string
          price?: number | null
          compare_at_price?: number | null
          category_id?: string | null
          images?: string[]
          specifications?: Record<string, string>
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          seo_title?: string | null
          seo_description?: string | null
          seo_image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          short_description?: string
          price?: number | null
          compare_at_price?: number | null
          category_id?: string | null
          images?: string[]
          specifications?: Record<string, string>
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          seo_title?: string | null
          seo_description?: string | null
          seo_image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      product_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          parent_id: string | null
          image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          parent_id?: string | null
          image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          parent_id?: string | null
          image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blogs: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string
          featured_image: string | null
          category_id: string | null
          author_id: string
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          seo_title: string | null
          seo_description: string | null
          seo_image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt: string
          featured_image?: string | null
          category_id?: string | null
          author_id: string
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          seo_title?: string | null
          seo_description?: string | null
          seo_image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          featured_image?: string | null
          category_id?: string | null
          author_id?: string
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          seo_title?: string | null
          seo_description?: string | null
          seo_image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      seo_pages: {
        Row: {
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
        Insert: {
          id?: string
          path: string
          title: string
          description: string
          og_image?: string | null
          canonical?: string | null
          json_ld?: Record<string, unknown> | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          path?: string
          title?: string
          description?: string
          og_image?: string | null
          canonical?: string | null
          json_ld?: Record<string, unknown> | null
          created_at?: string
          updated_at?: string
        }
      }
      downloads: {
        Row: {
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
        Insert: {
          id?: string
          title: string
          description?: string | null
          file_url: string
          file_name: string
          file_size?: number | null
          category?: string | null
          download_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          file_url?: string
          file_name?: string
          file_size?: number | null
          category?: string | null
          download_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      media: {
        Row: {
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
        Insert: {
          id?: string
          name: string
          url: string
          path: string
          mime_type: string
          size: number
          folder: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          url?: string
          path?: string
          mime_type?: string
          size?: number
          folder?: string
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
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
        Insert: {
          id?: string
          name: string
          company?: string | null
          role?: string | null
          content: string
          rating: number
          image?: string | null
          status?: 'draft' | 'published' | 'archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          company?: string | null
          role?: string | null
          content?: string
          rating?: number
          image?: string | null
          status?: 'draft' | 'published' | 'archived'
          created_at?: string
          updated_at?: string
        }
      }
      inquiries: {
        Row: {
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
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          subject: string
          message: string
          status?: 'new' | 'read' | 'replied' | 'closed'
          replied_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          subject?: string
          message?: string
          status?: 'new' | 'read' | 'replied' | 'closed'
          replied_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      settings: {
        Row: {
          id: string
          key: string
          value: string
          type: 'text' | 'json' | 'image' | 'boolean'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: string
          type: 'text' | 'json' | 'image' | 'boolean'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: string
          type?: 'text' | 'json' | 'image' | 'boolean'
          created_at?: string
          updated_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          entity_type: string
          entity_id: string | null
          details: Record<string, unknown> | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          entity_type: string
          entity_id?: string | null
          details?: Record<string, unknown> | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          entity_type?: string
          entity_id?: string | null
          details?: Record<string, unknown> | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      product_status: 'draft' | 'published' | 'archived'
      blog_status: 'draft' | 'published' | 'archived'
      testimonial_status: 'draft' | 'published' | 'archived'
      inquiry_status: 'new' | 'read' | 'replied' | 'closed'
      setting_type: 'text' | 'json' | 'image' | 'boolean'
    }
  }
}
