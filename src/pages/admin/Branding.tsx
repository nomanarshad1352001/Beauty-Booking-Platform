import { useState } from 'react';
import { Palette, Type, Image, Save, Eye, Gem } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToastStore } from '@/lib/stores/toastStore';

export function Branding() {
  const { addToast } = useToastStore();
  const [saving, setSaving] = useState(false);

  const [brandSettings, setBrandSettings] = useState({
    businessName: 'Solvé Studio',
    tagline: 'Beauty, Elevated.',
    primaryColor: '#d6336c',
    secondaryColor: '#1a1a2e',
    accentColor: '#f8bbd0',
    logoUrl: '',
    heroImageUrl: '',
    aboutText: 'Experience world-class permanent makeup, skincare, and aesthetic treatments. Book with our curated network of premium artists and medical professionals.',
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      addToast('success', 'Branding updated', 'Your brand settings have been saved.');
    }, 1000);
  };

  return (
    <div>
      <PageHeader
        title="Branding"
        description="Customize your booking experience to match your brand."
        action={
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </span>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Business Information
              </CardTitle>
              <CardDescription>Your business name and tagline shown to customers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Business Name</label>
                <Input
                  value={brandSettings.businessName}
                  onChange={(e) => setBrandSettings({ ...brandSettings, businessName: e.target.value })}
                  placeholder="Your Business Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Tagline</label>
                <Input
                  value={brandSettings.tagline}
                  onChange={(e) => setBrandSettings({ ...brandSettings, tagline: e.target.value })}
                  placeholder="Your catchy tagline"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">About Text</label>
                <Textarea
                  value={brandSettings.aboutText}
                  onChange={(e) => setBrandSettings({ ...brandSettings, aboutText: e.target.value })}
                  placeholder="Describe your business..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Brand Colors
              </CardTitle>
              <CardDescription>Choose colors that represent your brand.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Primary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={brandSettings.primaryColor}
                      onChange={(e) => setBrandSettings({ ...brandSettings, primaryColor: e.target.value })}
                      className="h-10 w-14 rounded border border-[hsl(var(--border))] cursor-pointer"
                    />
                    <Input
                      value={brandSettings.primaryColor}
                      onChange={(e) => setBrandSettings({ ...brandSettings, primaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Secondary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={brandSettings.secondaryColor}
                      onChange={(e) => setBrandSettings({ ...brandSettings, secondaryColor: e.target.value })}
                      className="h-10 w-14 rounded border border-[hsl(var(--border))] cursor-pointer"
                    />
                    <Input
                      value={brandSettings.secondaryColor}
                      onChange={(e) => setBrandSettings({ ...brandSettings, secondaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Accent Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={brandSettings.accentColor}
                      onChange={(e) => setBrandSettings({ ...brandSettings, accentColor: e.target.value })}
                      className="h-10 w-14 rounded border border-[hsl(var(--border))] cursor-pointer"
                    />
                    <Input
                      value={brandSettings.accentColor}
                      onChange={(e) => setBrandSettings({ ...brandSettings, accentColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Visual Assets
              </CardTitle>
              <CardDescription>Upload your logo and hero images.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Logo URL</label>
                <Input
                  value={brandSettings.logoUrl}
                  onChange={(e) => setBrandSettings({ ...brandSettings, logoUrl: e.target.value })}
                  placeholder="https://your-logo-url.com/logo.png"
                />
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                  Recommended: SVG or PNG with transparent background, at least 200x200px
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Hero Image URL</label>
                <Input
                  value={brandSettings.heroImageUrl}
                  onChange={(e) => setBrandSettings({ ...brandSettings, heroImageUrl: e.target.value })}
                  placeholder="https://your-hero-image.com/hero.jpg"
                />
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                  Recommended: JPG or PNG, at least 1920x1080px
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>See how your brand will appear.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-[hsl(var(--border))] overflow-hidden">
                {/* Mini Header Preview */}
                <div className="p-3 border-b border-[hsl(var(--border))] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gem className="h-4 w-4" style={{ color: brandSettings.primaryColor }} />
                    <span className="text-sm font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {brandSettings.businessName}
                    </span>
                  </div>
                  <div
                    className="text-xs font-medium px-2 py-1 rounded"
                    style={{ backgroundColor: brandSettings.primaryColor, color: 'white' }}
                  >
                    Book
                  </div>
                </div>

                {/* Mini Hero Preview */}
                <div
                  className="p-6 text-center"
                  style={{ backgroundColor: brandSettings.accentColor + '20' }}
                >
                  <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {brandSettings.tagline}
                  </h3>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] line-clamp-2">
                    {brandSettings.aboutText}
                  </p>
                </div>

                {/* Mini Button Preview */}
                <div className="p-4 flex justify-center">
                  <div
                    className="text-xs font-medium px-4 py-2 rounded-lg"
                    style={{ backgroundColor: brandSettings.primaryColor, color: 'white' }}
                  >
                    Book Your Appointment
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-[hsl(var(--muted))]">
                <p className="text-xs text-[hsl(var(--muted-foreground))] text-center">
                  This is a simplified preview. The actual booking page will include all your configured content.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
