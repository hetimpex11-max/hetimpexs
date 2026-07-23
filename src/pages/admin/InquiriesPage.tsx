import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useActivityLog } from '@/hooks/useActivityLog'
import { toast } from 'sonner'
import { Search, Mail, Trash2, Eye } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Inquiry } from '@/types'

async function fetchInquiries() {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Inquiry[]
}

async function updateInquiry(id: string, inquiry: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('inquiries')
    .update(inquiry as never)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

async function deleteInquiry(id: string) {
  const { error } = await supabase
    .from('inquiries')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export function InquiriesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [replyText, setReplyText] = useState('')

  const queryClient = useQueryClient()
  const { log } = useActivityLog()

  const { data: inquiries, isLoading } = useQuery({
    queryKey: ['inquiries'],
    queryFn: fetchInquiries,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => updateInquiry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
      toast.success('Inquiry updated successfully')
      log('update', 'inquiry')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
      toast.success('Inquiry deleted successfully')
      log('delete', 'inquiry')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleView = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry)
    setReplyText('')
    setDialogOpen(true)

    if (inquiry.status === 'new') {
      updateMutation.mutate({ id: inquiry.id, data: { status: 'read' } })
    }
  }

  const handleReply = () => {
    if (!selectedInquiry || !replyText.trim()) {
      toast.error('Please enter a reply')
      return
    }

    updateMutation.mutate({
      id: selectedInquiry.id,
      data: {
        status: 'replied',
        replied_at: new Date().toISOString(),
      },
    })

    toast.success('Reply sent successfully')
    setDialogOpen(false)
    setSelectedInquiry(null)
    setReplyText('')
  }

  const handleStatusChange = (id: string, status: string) => {
    updateMutation.mutate({ id, data: { status } })
  }

  const filteredInquiries = inquiries?.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
        <p className="text-gray-500">Manage customer inquiries</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search inquiries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500">
                      No inquiries found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInquiries?.map((inquiry) => (
                    <TableRow key={inquiry.id}>
                      <TableCell className="font-medium">{inquiry.name}</TableCell>
                      <TableCell>{inquiry.email}</TableCell>
                      <TableCell>{inquiry.subject}</TableCell>
                      <TableCell>
                        <Select
                          value={inquiry.status}
                          onValueChange={(value) => handleStatusChange(inquiry.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="read">Read</SelectItem>
                            <SelectItem value="replied">Replied</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>{formatDate(inquiry.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleView(inquiry)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this inquiry?')) {
                                deleteMutation.mutate(inquiry.id)
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-gray-500">Name</Label>
                  <p className="font-medium">{selectedInquiry.name}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Email</Label>
                  <p className="font-medium">{selectedInquiry.email}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Phone</Label>
                  <p className="font-medium">{selectedInquiry.phone || '-'}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Company</Label>
                  <p className="font-medium">{selectedInquiry.company || '-'}</p>
                </div>
              </div>

              <div>
                <Label className="text-gray-500">Subject</Label>
                <p className="font-medium">{selectedInquiry.subject}</p>
              </div>

              <div>
                <Label className="text-gray-500">Message</Label>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedInquiry.message}</p>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Received on {formatDate(selectedInquiry.created_at)}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reply">Reply</Label>
                <Textarea
                  id="reply"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply here..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={handleReply}>
                  <Mail className="mr-2 h-4 w-4" /> Send Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
