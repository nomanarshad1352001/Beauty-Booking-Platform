import { useState, useMemo } from 'react';
import { Plus, Search, Star, Pencil, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { providers as providerData } from '@/lib/data/providers';
import { locations } from '@/lib/data/locations';
import { useToastStore } from '@/lib/stores/toastStore';
import { Provider } from '@/lib/types';

export function Providers() {
  const [providers, setProviders] = useState<Provider[]>(providerData);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { addToast } = useToastStore();

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      const matchesSearch =
        !search ||
        provider.name.toLowerCase().includes(search.toLowerCase()) ||
        provider.title.toLowerCase().includes(search.toLowerCase()) ||
        provider.bio.toLowerCase().includes(search.toLowerCase());
      const matchesLocation = locationFilter === 'all' || provider.locationId === locationFilter;
      return matchesSearch && matchesLocation;
    });
  }, [providers, search, locationFilter]);

  const handleDelete = () => {
    if (deleteId) {
      setProviders((prev) => prev.filter((p) => p.id !== deleteId));
      addToast('success', 'Provider deleted', 'The provider has been removed.');
    }
  };

  const getLocationName = (locationId: string) => {
    return locations.find((l) => l.id === locationId)?.name ?? 'Unknown';
  };

  return (
    <div>
      <PageHeader
        title="Providers"
        description="Manage your artists and professionals."
        action={
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Provider
          </Button>
        }
      />

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              <Input
                placeholder="Search providers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <Button
                variant={locationFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLocationFilter('all')}
              >
                All Locations
              </Button>
              {locations.map((location) => (
                <Button
                  key={location.id}
                  variant={locationFilter === location.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLocationFilter(location.id)}
                  className="whitespace-nowrap"
                >
                  {location.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProviders.map((provider) => (
          <Card key={provider.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full">
                  <img
                    src={provider.avatarUrl}
                    alt={provider.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{provider.name}</h3>
                      <p className="text-sm text-[hsl(var(--primary))] font-medium">{provider.title}</p>
                    </div>
                    <Badge variant={provider.isActive ? 'success' : 'secondary'}>
                      {provider.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{provider.rating}</span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">
                      ({provider.reviewCount} reviews)
                    </span>
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                    {getLocationName(provider.locationId)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-4 line-clamp-2">
                {provider.bio}
              </p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[hsl(var(--border))]">
                <span className="text-xs text-[hsl(var(--muted-foreground))]">
                  {provider.serviceIds.length} services
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setEditingProvider(provider)}
                    className="p-1.5 rounded hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(provider.id)}
                    className="p-1.5 rounded hover:bg-[hsl(var(--muted))] text-[hsl(var(--destructive))]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-[hsl(var(--muted-foreground))]">No providers found matching your filters.</p>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog || !!editingProvider} onClose={() => { setShowAddDialog(false); setEditingProvider(null); }}>
        <DialogTitle>{editingProvider ? 'Edit Provider' : 'Add New Provider'}</DialogTitle>
        <DialogDescription>
          {editingProvider ? 'Update provider details.' : 'Add a new artist or professional.'}
        </DialogDescription>
        <form
          className="mt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            addToast('success', editingProvider ? 'Provider updated' : 'Provider added', 'Changes have been saved.');
            setShowAddDialog(false);
            setEditingProvider(null);
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">Name</label>
              <Input placeholder="Elena Vasquez" defaultValue={editingProvider?.name} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Title</label>
              <Input placeholder="Senior PMU Artist" defaultValue={editingProvider?.title} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Location</label>
            <select
              className="w-full h-10 rounded-[var(--radius)] border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 text-sm"
              defaultValue={editingProvider?.locationId}
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Bio</label>
            <Textarea placeholder="Professional bio..." defaultValue={editingProvider?.bio} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Avatar URL</label>
            <Input placeholder="https://..." defaultValue={editingProvider?.avatarUrl} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => { setShowAddDialog(false); setEditingProvider(null); }}>
              Cancel
            </Button>
            <Button type="submit">{editingProvider ? 'Save Changes' : 'Add Provider'}</Button>
          </div>
        </form>
      </Dialog>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Provider"
        description="Are you sure you want to delete this provider? This action cannot be undone."
        confirmLabel="Delete"
      />
    </div>
  );
}
