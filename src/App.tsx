import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/contexts/AuthContext'
import { queryClient } from '@/lib/query-client'
import { Toaster } from '@/components/ui/toast'
import ScrollWatermark from './components/ScrollWatermark'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TopMarquee from './components/TopMarquee'
import ShopByShape from './components/ShopByShape'
import About from './components/About'
import MiddleMarquee from './components/MiddleMarquee'
import ManufacturingProcess from './components/ManufacturingProcess'
import WhyChooseUs from './components/WhyChooseUs'
import GlobalExportCapability from './components/GlobalExportCapability'
import InstagramReels from './components/InstagramReels'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import CustomJewellery from './components/CustomJewellery'
import BottomMarquee from './components/BottomMarquee'
import Footer from './components/Footer'
import CustomizeRing from './components/CustomizeRing'
import BlogSection from './components/BlogSection'
import BlogListingPage from '@/pages/public/BlogListingPage'
import BlogDetailPage from '@/pages/public/BlogDetailPage'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { LoginPage } from '@/pages/admin/LoginPage'
import { ForgotPasswordPage } from '@/pages/admin/ForgotPasswordPage'
import { ResetPasswordPage } from '@/pages/admin/ResetPasswordPage'
import { DashboardPage } from '@/pages/admin/DashboardPage'
import { ProductsPage } from '@/pages/admin/ProductsPage'
import { BlogsPage } from '@/pages/admin/BlogsPage'
import { MediaPage } from '@/pages/admin/MediaPage'
import { DownloadsPage } from '@/pages/admin/DownloadsPage'
import { TestimonialsPage } from '@/pages/admin/TestimonialsPage'
import { InquiriesPage } from '@/pages/admin/InquiriesPage'
import { UsersPage } from '@/pages/admin/UsersPage'
import { ActivityPage } from '@/pages/admin/ActivityPage'
import { SettingsPage } from '@/pages/admin/SettingsPage'
import { SeoPage } from '@/pages/admin/SeoPage'

function PublicLayout() {
  return (
    <div className="min-h-screen relative">
      <ScrollWatermark />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={
              <>
                <Hero />
                <TopMarquee />
                <ShopByShape />
                <About />
                <MiddleMarquee />
                <ManufacturingProcess />
                <CustomJewellery />
                <WhyChooseUs />
                <GlobalExportCapability />
                <InstagramReels />
                <BlogSection />
                <FAQ />
                <Contact />
                <BottomMarquee />
              </>
            } />
            <Route path="customize" element={<CustomizeRing />} />
            <Route path="blog" element={<BlogListingPage />} />
            <Route path="blog/:slug" element={<BlogDetailPage />} />
          </Route>

          {/* Admin auth routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/admin/reset-password" element={<ResetPasswordPage />} />

          {/* Admin protected routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="media" element={<MediaPage />} />
            <Route path="downloads" element={<DownloadsPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="inquiries" element={<InquiriesPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="activity" element={<ActivityPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="seo" element={<SeoPage />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  )
}
