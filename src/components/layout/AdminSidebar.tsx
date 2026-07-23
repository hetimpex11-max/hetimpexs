import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  FileText,
  Image,
  Download,
  MessageSquare,
  Settings,
  Search,
  Users,
  Activity,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { useAuth } from '@/contexts/AuthContext'
import { usePermissions } from '@/hooks/usePermissions'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, permission: 'dashboard:view' },
  { name: 'Products', href: '/admin/products', icon: Package, permission: 'products:view' },
  { name: 'Blogs', href: '/admin/blogs', icon: FileText, permission: 'blogs:view' },
  { name: 'Media', href: '/admin/media', icon: Image, permission: 'media:view' },
  { name: 'Downloads', href: '/admin/downloads', icon: Download, permission: 'downloads:view' },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare, permission: 'testimonials:view' },
  { name: 'Inquiries', href: '/admin/inquiries', icon: Search, permission: 'inquiries:view' },
  { name: 'Users', href: '/admin/users', icon: Users, permission: 'users:view' },
  { name: 'Activity', href: '/admin/activity', icon: Activity, permission: 'activity:view' },
  { name: 'Settings', href: '/admin/settings', icon: Settings, permission: 'settings:view' },
]

interface AdminSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const { signOut } = useAuth()
  const { can } = usePermissions()

  const filteredNavigation = navigation.filter((item) => can(item.permission as any))

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-gray-200 bg-white transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-14 items-center justify-between border-b border-gray-200 px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gray-900 flex items-center justify-center">
              <span className="text-white font-bold text-sm">HI</span>
            </div>
            <span className="font-semibold text-gray-900">HET IMPEX</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onToggle}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
        {filteredNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                collapsed && 'justify-center px-2'
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-200 p-2">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50',
            collapsed && 'justify-center px-2'
          )}
          onClick={signOut}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  )
}
