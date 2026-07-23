import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { Calendar, ArrowRight, Search, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SeoHead } from '@/components/SeoHead'

export default function BlogListingPage() {
  const seoTitle = 'Blog & Insights | HET IMPEX'
  const seoDescription = 'Stay updated with the latest trends, insights, and news from the diamond industry.'
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [ref, isInView] = useInView()

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchPublishedBlogs()
  }, [])

  const fetchPublishedBlogs = async () => {
    // EXACT same query as homepage
    const { data, error } = await supabase
      .from('blogs')
      .select('*, blog_categories(*)')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    console.log('Blog page fetched blogs:', data, error)

    if (error) {
      console.error('Error fetching blogs:', error)
    } else {
      setBlogs(data || [])
    }
    setLoading(false)
  }

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        url={`${window.location.origin}/blog`}
        type="website"
      />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal tracking-tight">
                Blog & Insights
              </h1>
              <div className="mt-4 w-16 h-1 bg-primary mx-auto" />
              <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Stay updated with the latest trends, insights, and news from the diamond industry.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Listing */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Search */}
            <div className="max-w-xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No blog posts found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog, index) => (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                  >
                    {blog.featured_image ? (
                      <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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
                      <h3 className="text-xl font-bold text-charcoal mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="inline-flex items-center text-primary font-medium hover:underline"
                      >
                        Read More <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
