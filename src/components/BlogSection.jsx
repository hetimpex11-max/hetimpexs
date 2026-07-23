import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function BlogSection() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [ref, isInView] = useInView()

  useEffect(() => {
    fetchPublishedBlogs()
  }, [])

  const fetchPublishedBlogs = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*, blog_categories(*)')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(3)

    console.log('Fetched homepage blogs:', data, error)

    if (error) {
      console.error('Error fetching blogs:', error)
    } else {
      setBlogs(data || [])
    }
    setLoading(false)
  }

  if (loading) {
    return null
  }

  if (blogs.length === 0) {
    return null
  }

  return (
    <section id="blog" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
            Latest Insights
          </h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto" />
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest trends, insights, and news from the diamond industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {blog.featured_image && (
                <img
                  src={blog.featured_image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
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

        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded hover:bg-primary-dark transition-colors"
          >
            View All Posts <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
