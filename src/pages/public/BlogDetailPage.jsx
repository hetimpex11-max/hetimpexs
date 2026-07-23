import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { Calendar, ArrowLeft, Loader2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { SeoHead } from '@/components/SeoHead'

export default function BlogDetailPage() {
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const { slug } = useParams()
  const [ref, isInView] = useInView()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (slug) {
      fetchBlogBySlug()
    }
  }, [slug])

  const fetchBlogBySlug = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*, blog_categories(*)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    console.log('Fetched blog by slug:', data, error)

    if (error || !data) {
      setNotFound(true)
    } else {
      setBlog(data)
      // Fetch related blogs from same category
      if (data.category_id) {
        const { data: related } = await supabase
          .from('blogs')
          .select('id, title, slug, excerpt, featured_image, published_at, blog_categories(*)')
          .eq('status', 'published')
          .eq('category_id', data.category_id)
          .neq('id', data.id)
          .order('published_at', { ascending: false })
          .limit(3)

        setRelatedBlogs(related || [])
      }
    }
    setLoading(false)
  }

  // SEO Meta Tags
  useEffect(() => {
    if (blog) {
      document.title = blog.seo_title || blog.title

      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', blog.seo_description || blog.excerpt)
      }

      // Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]')
      const ogDescription = document.querySelector('meta[property="og:description"]')
      const ogImage = document.querySelector('meta[property="og:image"]')
      const ogUrl = document.querySelector('meta[property="og:url"]')

      if (ogTitle) ogTitle.setAttribute('content', blog.seo_title || blog.title)
      if (ogDescription) ogDescription.setAttribute('content', blog.seo_description || blog.excerpt)
      if (ogImage && blog.featured_image) ogImage.setAttribute('content', blog.featured_image)
      if (ogUrl) ogUrl.setAttribute('content', `${window.location.origin}/blog/${blog.slug}`)

      // Twitter Card tags
      const twitterTitle = document.querySelector('meta[name="twitter:title"]')
      const twitterDescription = document.querySelector('meta[name="twitter:description"]')
      const twitterImage = document.querySelector('meta[name="twitter:image"]')

      if (twitterTitle) twitterTitle.setAttribute('content', blog.seo_title || blog.title)
      if (twitterDescription) twitterDescription.setAttribute('content', blog.seo_description || blog.excerpt)
      if (twitterImage && blog.featured_image) twitterImage.setAttribute('content', blog.featured_image)

      // Canonical URL
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) {
        canonical.setAttribute('href', `${window.location.origin}/blog/${blog.slug}`)
      }

      // JSON-LD Structured Data
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        description: blog.seo_description || blog.excerpt,
        image: blog.featured_image || '',
        datePublished: blog.published_at || blog.created_at,
        author: {
          '@type': 'Organization',
          name: 'HET IMPEX'
        },
        publisher: {
          '@type': 'Organization',
          name: 'HET IMPEX',
          logo: {
            '@type': 'ImageObject',
            url: `${window.location.origin}/full-logo.png`
          }
        }
      }

      let scriptTag = document.querySelector('script[type="application/ld+json"]')
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.setAttribute('type', 'application/ld+json')
        document.head.appendChild(scriptTag)
      }
      scriptTag.textContent = JSON.stringify(jsonLd)
    }

    return () => {
      document.title = 'HET IMPEX | Diamond Manufacturing & Sourcing'
    }
  }, [blog])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-charcoal mb-4">404</h1>
          <p className="text-gray-500 mb-8">Blog post not found</p>
          <Link
            to="/blog"
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center text-primary font-medium hover:underline mb-6"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Blog
            </Link>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(blog.published_at || blog.created_at).toLocaleDateString()}
              </span>
              {blog.blog_categories && (
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                  {blog.blog_categories.name}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-charcoal tracking-tight mb-6">
              {blog.title}
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed">
              {blog.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.featured_image && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <img
              src={blog.featured_image}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="prose prose-lg max-w-none"
          >
            <div
              className="text-gray-700 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
            />
          </motion.div>
        </div>
      </section>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-charcoal mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <article
                  key={relatedBlog.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {relatedBlog.featured_image ? (
                    <img
                      src={relatedBlog.featured_image}
                      alt={relatedBlog.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-charcoal mb-2 line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>
                    <Link
                      to={`/blog/${relatedBlog.slug}`}
                      className="inline-flex items-center text-primary font-medium hover:underline"
                    >
                      Read More <ArrowLeft size={16} className="ml-1 rotate-180" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
