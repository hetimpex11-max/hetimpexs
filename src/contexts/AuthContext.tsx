import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import type { User, Role } from '@/types'

interface AuthContextType {
  user: User | null
  role: Role | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: Error | null }>
  updatePassword: (password: string) => Promise<{ error: Error | null }>
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface ProfileWithRole {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  role_id: string
  created_at: string
  updated_at: string
  roles: Role
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<Role | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      } else {
        setUser(null)
        setRole(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        email,
        full_name,
        avatar_url,
        role_id,
        created_at,
        updated_at,
        roles (
          id,
          name,
          slug,
          permissions,
          created_at,
          updated_at
        )
      `)
      .eq('id', userId)
      .single<ProfileWithRole>()

    if (error || !data) {
      setUser(null)
      setRole(null)
    } else {
      setUser({
        id: data.id,
        email: data.email,
        full_name: data.full_name,
        avatar_url: data.avatar_url,
        role_id: data.role_id,
        created_at: data.created_at,
        updated_at: data.updated_at,
      })
      setRole(data.roles)
    }
    setLoading(false)
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error: error ? new Error(error.message) : null }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    return { error: error ? new Error(error.message) : null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setRole(null)
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    })
    return { error: error ? new Error(error.message) : null }
  }

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({
      password,
    })
    return { error: error ? new Error(error.message) : null }
  }

  const hasPermission = (permission: string): boolean => {
    if (!role) return false
    return role.permissions.includes(permission as Role['permissions'][number])
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
