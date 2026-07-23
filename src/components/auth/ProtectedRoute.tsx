import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  permission?: string
}

export function ProtectedRoute({ children, permission }: ProtectedRouteProps) {
  const { user, loading, hasPermission } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  if (permission && !hasPermission(permission)) {
    return <Navigate to="/admin" replace />
  }

  return <>{children}</>
}
