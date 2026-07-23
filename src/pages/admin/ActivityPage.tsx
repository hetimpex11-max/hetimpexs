import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Search } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import type { ActivityLog } from '@/types'

async function fetchActivityLogs() {
  const { data, error } = await supabase
    .from('activity_logs')
    .select(`
      *,
      profiles (
        id,
        full_name,
        email
      )
    `)
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) throw error
  return data as (ActivityLog & { profiles: { full_name: string; email: string } | null })[]
}

export function ActivityPage() {
  const [search, setSearch] = useState('')

  const { data: logs, isLoading } = useQuery({
    queryKey: ['activity-logs'],
    queryFn: fetchActivityLogs,
  })

  const filteredLogs = logs?.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.entity_type.toLowerCase().includes(search.toLowerCase()) ||
      log.profiles?.full_name?.toLowerCase().includes(search.toLowerCase())
  )

  const getActionColor = (action: string) => {
    if (action.includes('create')) return 'bg-green-100 text-green-800'
    if (action.includes('update')) return 'bg-blue-100 text-blue-800'
    if (action.includes('delete')) return 'bg-red-100 text-red-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
        <p className="text-gray-500">Track all admin activities</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search activity logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500">
                      No activity logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs?.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">
                            {log.profiles?.full_name || 'Unknown'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {log.profiles?.email || '-'}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getActionColor(log.action)}>
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="capitalize">{log.entity_type}</TableCell>
                      <TableCell>
                        {log.details ? (
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {JSON.stringify(log.details).slice(0, 50)}...
                          </code>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>{formatDateTime(log.created_at)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
