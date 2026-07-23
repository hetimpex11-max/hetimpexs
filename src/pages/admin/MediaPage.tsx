import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, storage } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useActivityLog } from '@/hooks/useActivityLog'
import { toast } from 'sonner'
import { Trash2, Search, Upload, FolderOpen } from 'lucide-react'
import { formatDate, formatFileSize } from '@/lib/utils'
import type { Media } from '@/types'

async function fetchMedia() {
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Media[]
}

async function deleteMedia(id: string) {
  const { error } = await supabase
    .from('media')
    .delete()
    .eq('id', id)

  if (error) throw error
}

async function uploadFile(file: File, folder: string): Promise<{ url: string; path: string }> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  const filePath = `${folder}/${fileName}`

  const { error: uploadError } = await storage.from('media').upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (uploadError) throw uploadError

  const { data } = storage.from('media').getPublicUrl(filePath)

  return { url: data.publicUrl, path: filePath }
}

export function MediaPage() {
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [folder, setFolder] = useState('general')

  const queryClient = useQueryClient()
  const { log } = useActivityLog()

  const { data: media, isLoading } = useQuery({
    queryKey: ['media'],
    queryFn: fetchMedia,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] })
      toast.success('Media deleted successfully')
      log('delete', 'media')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!selectedFiles) return
      setUploading(true)

      const uploads = Array.from(selectedFiles).map(async (file) => {
        const { url, path } = await uploadFile(file, folder)
        return {
          name: file.name,
          url,
          path,
          mime_type: file.type,
          size: file.size,
          folder,
        }
      })

      const results = await Promise.all(uploads)

      const { error } = await supabase.from('media').insert(results as never)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] })
      toast.success('Files uploaded successfully')
      log('upload', 'media')
      setDialogOpen(false)
      setSelectedFiles(null)
      setUploading(false)
    },
    onError: (error) => {
      toast.error(error.message)
      setUploading(false)
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files)
  }

  const handleUpload = () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error('Please select files to upload')
      return
    }
    uploadMutation.mutate()
  }

  const filteredMedia = media?.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.folder.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media</h1>
          <p className="text-gray-500">Manage your media files</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" /> Upload Files
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Files</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="folder">Folder</Label>
                <Input
                  id="folder"
                  value={folder}
                  onChange={(e) => setFolder(e.target.value)}
                  placeholder="general"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="files">Files</Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpload} disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search media..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Folder</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedia?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500">
                      No media found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMedia?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <FolderOpen className="h-4 w-4 text-gray-400" />
                          {item.folder}
                        </div>
                      </TableCell>
                      <TableCell>{formatFileSize(item.size)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.mime_type}</Badge>
                      </TableCell>
                      <TableCell>{formatDate(item.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-100 h-9 w-9"
                          >
                            <Search className="h-4 w-4" />
                          </a>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this file?')) {
                                deleteMutation.mutate(item.id)
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
