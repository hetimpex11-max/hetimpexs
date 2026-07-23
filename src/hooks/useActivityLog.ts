import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

export function useActivityLog() {
  const { user } = useAuth()

  const log = async (
    action: string,
    entityType: string,
    entityId?: string,
    details?: Record<string, unknown>
  ) => {
    if (!user) return

    await supabase.from('activity_logs').insert({
      user_id: user.id,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
      ip_address: null,
      user_agent: navigator.userAgent,
    } as never)
  }

  return { log }
}
