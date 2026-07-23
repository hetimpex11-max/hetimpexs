import { useAuth } from '@/contexts/AuthContext'
import type { Permission } from '@/types'

export function usePermissions() {
  const { hasPermission, role } = useAuth()

  const can = (permission: Permission): boolean => {
    return hasPermission(permission)
  }

  const canAny = (permissions: Permission[]): boolean => {
    return permissions.some((p) => hasPermission(p))
  }

  const canAll = (permissions: Permission[]): boolean => {
    return permissions.every((p) => hasPermission(p))
  }

  return {
    can,
    canAny,
    canAll,
    permissions: role?.permissions ?? [],
    role: role?.slug ?? null,
  }
}
