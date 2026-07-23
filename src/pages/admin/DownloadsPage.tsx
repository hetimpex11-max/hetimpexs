import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, storage } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useActivityLog } from '@/hooks/useActivityLog'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, Search, DownloadIcon } from 'lucide-react'
import { formatDate, formatFileSize } from '@/lib/utils'
import type { Download as DownloadType } from '@/types'

async function fetchDownloads() {
  const { data, error } = await supabase
    .from('downloads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as DownloadType[]
}

async function createDownload(download: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('downloads')
    .insert(download as never)
    .select()
    .single()

  if (error) throw error
  return data
}

async function updateDownload(id: string, download: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('downloads')
    .update(download as never)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

async function deleteDownload(id: string) {
  const { error } = await supabase
    .from('downloads')
    .delete()
    .eq('id', id)

  if (error) throw error
}

async function uploadFile(file: File): Promise<{ url: string; path: string }> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  const filePath = `downloads/${fileName}`

  const { error: uploadError } = await storage.from('downloads').upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (uploadError) throw uploadError

  const { data } = storage.from('downloads').getPublicUrl(filePath)

  return { url: data.publicUrl, path: filePath }
}

export function DownloadsPage() {
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingDownload, setEditingDownload] = useState<DownloadType | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    file_url: '',
    file_name: '',
    file_size: '',
  })

  const queryClient = useQueryClient()
  const { log } = useActivityLog()

  const { data: downloads, isLoading } = useQuery({
    queryKey: ['downloads'],
    queryFn: fetchDownloads,
  })

  const createMutation = useMutation({
    mutationFn: createDownload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['downloads'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
      toast.success('Download created successfully')
      log('create', 'download')
      setDialogOpen(false)
      resetForm()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => updateDownload(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['downloads'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
      toast.success('Download updated successfully')
      log('update', 'download')
      setDialogOpen(false)
      setEditingDownload(null)
      resetForm()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteDownload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['downloads'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
      toast.success('Download deleted successfully')
      log('delete', 'download')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      file_url: '',
      file_name: '',
      file_size: '',
    })
    // setSelectedFile(null)
  }

  const handleEdit = (download: DownloadType) => {
    setEditingDownload(download)
    setFormData({
      title: download.title,
      description: download.description || '',
      category: download.category || '',
      file_url: download.file_url,
      file_name: download.file_name,
      file_size: download.file_size?.toString() || '',
    })
    setDialogOpen(true)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const { url } = await uploadFile(file)
      setFormData({
        ...formData,
        file_url: url,
        file_name: file.name,
        file_size: file.size.toString(),
      })
      // setSelectedFile(file)
      toast.success('File uploaded successfully')
    } catch (error) {
      toast.error('Failed to upload file')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const data: Record<string, unknown> = {
      title: formData.title,
      description: formData.description || null,
      category: formData.category || null,
      file_url: formData.file_url,
      file_name: formData.file_name,
      file_size: formData.file_size ? parseInt(formData.file_size) : null,
      download_count: 0,
    }

    if (editingDownload) {
      updateMutation.mutate({ id: editingDownload.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  const filteredDownloads = downloads?.filter(
    (download) =>
      download.title.toLowerCase().includes(search.toLowerCase()) ||
      download.category?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Downloads</h1>
          <p className="text-gray-500">Manage downloadable files</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingDownload(null); resetForm() }}>
              <Plus className="mr-2 h-4 w-4" /> Add Download
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingDownload ? 'Edit Download' : 'Add Download'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
                {formData.file_name && (
                  <p className="text-sm text-gray-500">
                    Selected: {formData.file_name} ({formatFileSize(parseInt(formData.file_size))})
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending || uploading}>
                  {editingDownload ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search downloads..."
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
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDownloads?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500">
                      No downloads found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDownloads?.map((download) => (
                    <TableRow key={download.id}>
                      <TableCell className="font-medium">{download.title}</TableCell>
                      <TableCell>{download.category || '-'}</TableCell>
                      <TableCell>
                        <a
                          href={download.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <DownloadIcon className="h-4 w-4" />
                          {download.file_name}
                        </a>
                      </TableCell>
                      <TableCell>{download.download_count}</TableCell>
                      <TableCell>{formatDate(download.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(download)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this download?')) {
                                deleteMutation.mutate(download.id)
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
    </div>
  )
}
