import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useActivityLog } from '@/hooks/useActivityLog'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import type { SeoPage } from '@/types'

async function fetchSeoPages() {
  const { data, error } = await supabase
    .from('seo_pages')
    .select('*')
    .order('path')

  if (error) throw error
  return data as SeoPage[]
}

async function createSeoPage(seoPage: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('seo_pages')
    .insert(seoPage as never)
    .select()
    .single()

  if (error) throw error
  return data
}

async function updateSeoPage(id: string, seoPage: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('seo_pages')
    .update(seoPage as never)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

async function deleteSeoPage(id: string) {
  const { error } = await supabase
    .from('seo_pages')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export function SeoPage() {
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSeoPage, setEditingSeoPage] = useState<SeoPage | null>(null)
  const [formData, setFormData] = useState({
    path: '',
    title: '',
    description: '',
    og_image: '',
    canonical: '',
    json_ld: '',
  })

  const queryClient = useQueryClient()
  const { log } = useActivityLog()

  const { data: seoPages, isLoading } = useQuery({
    queryKey: ['seo-pages'],
    queryFn: fetchSeoPages,
  })

  const createMutation = useMutation({
    mutationFn: createSeoPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seo-pages'] })
      toast.success('SEO page created successfully')
      log('create', 'seo_page')
      setDialogOpen(false)
      resetForm()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => updateSeoPage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seo-pages'] })
      toast.success('SEO page updated successfully')
      log('update', 'seo_page')
      setDialogOpen(false)
      setEditingSeoPage(null)
      resetForm()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteSeoPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seo-pages'] })
      toast.success('SEO page deleted successfully')
      log('delete', 'seo_page')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const resetForm = () => {
    setFormData({
      path: '',
      title: '',
      description: '',
      og_image: '',
      canonical: '',
      json_ld: '',
    })
  }

  const handleEdit = (seoPage: SeoPage) => {
    setEditingSeoPage(seoPage)
    setFormData({
      path: seoPage.path,
      title: seoPage.title,
      description: seoPage.description,
      og_image: seoPage.og_image || '',
      canonical: seoPage.canonical || '',
      json_ld: seoPage.json_ld ? JSON.stringify(seoPage.json_ld) : '',
    })
    setDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let jsonLd = null
    if (formData.json_ld) {
      try {
        jsonLd = JSON.parse(formData.json_ld)
      } catch {
        toast.error('Invalid JSON-LD format')
        return
      }
    }

    const data: Record<string, unknown> = {
      path: formData.path,
      title: formData.title,
      description: formData.description,
      og_image: formData.og_image || null,
      canonical: formData.canonical || null,
      json_ld: jsonLd,
    }

    if (editingSeoPage) {
      updateMutation.mutate({ id: editingSeoPage.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  const filteredSeoPages = seoPages?.filter(
    (seoPage) =>
      seoPage.path.toLowerCase().includes(search.toLowerCase()) ||
      seoPage.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Management</h1>
          <p className="text-gray-500">Manage SEO settings for pages</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingSeoPage(null); resetForm() }}>
              <Plus className="mr-2 h-4 w-4" /> Add SEO Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingSeoPage ? 'Edit SEO Page' : 'Add SEO Page'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="path">Path</Label>
                <Input
                  id="path"
                  value={formData.path}
                  onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                  placeholder="/about"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Meta Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Meta Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="og_image">OG Image URL</Label>
                <Input
                  id="og_image"
                  value={formData.og_image}
                  onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="canonical">Canonical URL</Label>
                <Input
                  id="canonical"
                  value={formData.canonical}
                  onChange={(e) => setFormData({ ...formData, canonical: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="json_ld">JSON-LD</Label>
                <Textarea
                  id="json_ld"
                  value={formData.json_ld}
                  onChange={(e) => setFormData({ ...formData, json_ld: e.target.value })}
                  placeholder='{"@context": "https://schema.org"}'
                  rows={6}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingSeoPage ? 'Update' : 'Create'}
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
                placeholder="Search SEO pages..."
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
                  <TableHead>Path</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Canonical</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSeoPages?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500">
                      No SEO pages found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSeoPages?.map((seoPage) => (
                    <TableRow key={seoPage.id}>
                      <TableCell className="font-medium">{seoPage.path}</TableCell>
                      <TableCell>{seoPage.title}</TableCell>
                      <TableCell className="max-w-xs truncate">{seoPage.description}</TableCell>
                      <TableCell>{seoPage.canonical || '-'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(seoPage)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this SEO page?')) {
                                deleteMutation.mutate(seoPage.id)
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
