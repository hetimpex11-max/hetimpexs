import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, storage } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useActivityLog } from '@/hooks/useActivityLog'
import { toast } from 'sonner'
import { Save, Upload } from 'lucide-react'
import type { Setting } from '@/types'

async function fetchSettings() {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .order('key')

  if (error) throw error
  return data as Setting[]
}

async function updateSetting(key: string, value: string, type: string) {
  const { data, error } = await supabase
    .from('settings')
    .upsert({ key, value, type, updated_at: new Date().toISOString() } as never)
    .select()
    .single()

  if (error) throw error
  return data
}

async function uploadLogo(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `logo-${Date.now()}.${fileExt}`
  const filePath = `settings/${fileName}`

  const { error: uploadError } = await storage.from('settings').upload(filePath, file, {
    cacheControl: '3600',
    upsert: true,
  })

  if (uploadError) throw uploadError

  const { data } = storage.from('settings').getPublicUrl(filePath)
  return data.publicUrl
}

export function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const queryClient = useQueryClient()
  const { log } = useActivityLog()

  const { data: settingsData, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
  })

  const updateMutation = useMutation({
    mutationFn: ({ key, value, type }: { key: string; value: string; type: string }) =>
      updateSetting(key, value, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      toast.success('Settings saved successfully')
      log('update', 'settings')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    if (settingsData) {
      const settingsMap: Record<string, string> = {}
      settingsData.forEach((setting) => {
        settingsMap[setting.key] = setting.value
      })
      setSettings(settingsMap)
    }
  }, [settingsData])

  const handleSave = (key: string, type: string) => {
    const value = settings[key] || ''
    updateMutation.mutate({ key, value, type })
  }

  const handleLogoUpload = async () => {
    if (!logoFile) return

    setUploading(true)
    try {
      const url = await uploadLogo(logoFile)
      setSettings({ ...settings, company_logo: url })
      updateMutation.mutate({ key: 'company_logo', value: url, type: 'image' })
    } catch (error) {
      toast.error('Failed to upload logo')
    } finally {
      setUploading(false)
      setLogoFile(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your application settings</p>
      </div>

      <Tabs value="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
          <TabsTrigger value="seo">SEO Defaults</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  value={settings.company_name || ''}
                  onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave('company_name', 'text')}
                >
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_logo">Company Logo</Label>
                {settings.company_logo && (
                  <img
                    src={settings.company_logo}
                    alt="Company Logo"
                    className="h-16 w-auto mb-2"
                  />
                )}
                <Input
                  id="company_logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                />
                {logoFile && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogoUpload}
                    disabled={uploading}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {uploading ? 'Uploading...' : 'Upload Logo'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email">Email</Label>
                <Input
                  id="contact_email"
                  value={settings.contact_email || ''}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave('contact_email', 'text')}
                >
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_phone">Phone</Label>
                <Input
                  id="contact_phone"
                  value={settings.contact_phone || ''}
                  onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave('contact_phone', 'text')}
                >
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_address">Address</Label>
                <Textarea
                  id="contact_address"
                  value={settings.contact_address || ''}
                  onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave('contact_address', 'text')}
                >
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="social_facebook">Facebook</Label>
                <Input
                  id="social_facebook"
                  value={settings.social_facebook || ''}
                  onChange={(e) => setSettings({ ...settings, social_facebook: e.target.value })}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave('social_facebook', 'text')}
                >
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_instagram">Instagram</Label>
                <Input
                  id="social_instagram"
                  value={settings.social_instagram || ''}
                  onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave('social_instagram', 'text')}
                >
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_linkedin">LinkedIn</Label>
                <Input
                  id="social_linkedin"
                  value={settings.social_linkedin || ''}
                  onChange={(e) => setSettings({ ...settings, social_linkedin: e.target.value })}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave('social_linkedin', 'text')}
                >
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Defaults</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seo_default_title">Default Title</Label>
                <Input
                  id="seo_default_title"
                  value={settings.seo_default_title || ''}
                  onChange={(e) => setSettings({ ...settings, seo_default_title: e.target.value })}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave('seo_default_title', 'text')}
                >
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seo_default_description">Default Description</Label>
                <Textarea
                  id="seo_default_description"
                  value={settings.seo_default_description || ''}
                  onChange={(e) => setSettings({ ...settings, seo_default_description: e.target.value })}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave('seo_default_description', 'text')}
                >
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
