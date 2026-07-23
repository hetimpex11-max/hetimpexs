import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { formatDate } from '@/lib/utils'
import {
  Package,
  FileText,
  MessageSquare,
  Download,
  Users,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product, Blog, Inquiry } from '@/types'

async function fetchDashboardStats() {
  const [
    productsCount,
    blogsCount,
    inquiriesCount,
    downloadsCount,
    testimonialsCount,
    usersCount,
    recentInquiries,
    recentProducts,
    latestBlogs,
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('blogs').select('*', { count: 'exact', head: true }),
    supabase.from('inquiries').select('*', { count: 'exact', head: true }),
    supabase.from('downloads').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('products').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('blogs').select('*').order('created_at', { ascending: false }).limit(5),
  ])

  return {
    totalProducts: productsCount.count || 0,
    totalBlogs: blogsCount.count || 0,
    totalInquiries: inquiriesCount.count || 0,
    totalDownloads: downloadsCount.count || 0,
    totalTestimonials: testimonialsCount.count || 0,
    totalUsers: usersCount.count || 0,
    recentInquiries: (recentInquiries.data || []) as Inquiry[],
    recentProducts: (recentProducts.data || []) as Product[],
    latestBlogs: (latestBlogs.data || []) as Blog[],
  }
}

const stats = [
  { name: 'Total Products', href: '/admin/products', icon: Package, color: 'bg-blue-500', key: 'totalProducts' as const },
  { name: 'Total Blogs', href: '/admin/blogs', icon: FileText, color: 'bg-green-500', key: 'totalBlogs' as const },
  { name: 'Total Inquiries', href: '/admin/inquiries', icon: MessageSquare, color: 'bg-yellow-500', key: 'totalInquiries' as const },
  { name: 'Total Downloads', href: '/admin/downloads', icon: Download, color: 'bg-purple-500', key: 'totalDownloads' as const },
  { name: 'Total Testimonials', href: '/admin/testimonials', icon: Users, color: 'bg-pink-500', key: 'totalTestimonials' as const },
  { name: 'Total Users', href: '/admin/users', icon: TrendingUp, color: 'bg-indigo-500', key: 'totalUsers' as const },
]

export function DashboardPage() {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening with your store.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.name} to={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`rounded-lg p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statsData?.[stat.key] ?? 0}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Inquiries</CardTitle>
            <Link to="/admin/inquiries">
              <Button variant="ghost" size="sm">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statsData?.recentInquiries?.length === 0 ? (
                <p className="text-sm text-gray-500">No inquiries yet</p>
              ) : (
                statsData?.recentInquiries?.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{inquiry.name}</p>
                      <p className="text-sm text-gray-500">{inquiry.subject}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          inquiry.status === 'new'
                            ? 'default'
                            : inquiry.status === 'read'
                            ? 'secondary'
                            : inquiry.status === 'replied'
                            ? 'outline'
                            : 'destructive'
                        }
                      >
                        {inquiry.status}
                      </Badge>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(inquiry.created_at)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Latest Blogs</CardTitle>
            <Link to="/admin/blogs">
              <Button variant="ghost" size="sm">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statsData?.latestBlogs?.length === 0 ? (
                <p className="text-sm text-gray-500">No blogs yet</p>
              ) : (
                statsData?.latestBlogs?.map((blog) => (
                  <div key={blog.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{blog.title}</p>
                      <p className="text-sm text-gray-500">{blog.excerpt}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          blog.status === 'published'
                            ? 'default'
                            : blog.status === 'draft'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {blog.status}
                      </Badge>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(blog.created_at)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
