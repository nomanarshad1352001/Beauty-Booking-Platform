import { useState } from 'react';
import { Plus, MapPin, Phone, Mail, Clock, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { locations as locationData } from '@/lib/data/locations';
import { useToastStore } from '@/lib/stores/toastStore';
import { Location } from '@/lib/types';

export function Locations() {
  const [locations, setLocations] = useState<Location[]>(locationData);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { addToast } = useToastStore();

  const handleDelete = () => {
    if (deleteId) {
      setLocations((prev) => prev.filter((l) => l.id !== deleteId));
      addToast('success', 'Location deleted', 'The location has been removed.');
    }
  };

  const handleToggleActive = (id: string) => {
    setLocations((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isActive: !l.isActive } : l))
    );
    addToast('success', 'Status updated', 'Location status has been changed.');
  };

  return (
    <div>
      <PageHeader
        title="Locations"
        description="Manage your studio locations."
        action={
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {locations.map((location) => (
          <Card key={location.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={location.imageUrl}
                alt={location.name}
                className="h-full w-full object-cover"
              />
              <Badge
                variant={location.isActive ? 'success' : 'secondary'}
                className="absolute top-3 right-3"
              >
                {location.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg">{location.name}</h3>
                <div className="relative group">
                  <button className="p-1 rounded hover:bg-[hsl(var(--muted))]">
                    <MoreVertical className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-36 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                    <button
                      onClick={() => setEditingLocation(location)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-[hsl(var(--muted))] rounded-t-lg"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleActive(location.id)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-[hsl(var(--muted))]"
                    >
                      {location.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => setDeleteId(location.id)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[hsl(var(--destructive))] hover:bg-[hsl(var(--muted))] rounded-b-lg"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2 text-[hsl(var(--muted-foreground))]">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{location.address}, {location.city}, {location.state} {location.zip}</span>
                </div>
                <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{location.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>{location.email}</span>
                </div>
                <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>Mon–Fri: {location.hours.monday.open}–{location.hours.monday.close}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog || !!editingLocation} onClose={() => { setShowAddDialog(false); setEditingLocation(null); }}>
        <DialogTitle>{editingLocation ? 'Edit Location' : 'Add New Location'}</DialogTitle>
        <DialogDescription>
          {editingLocation ? 'Update the location details.' : 'Add a new studio location.'}
        </DialogDescription>
        <form
          className="mt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            addToast('success', editingLocation ? 'Location updated' : 'Location added', 'Changes have been saved.');
            setShowAddDialog(false);
            setEditingLocation(null);
          }}
        >
          <div>
            <label className="block text-sm font-medium mb-1.5">Name</label>
            <Input placeholder="SoHo Studio" defaultValue={editingLocation?.name} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Address</label>
            <Input placeholder="123 Main St" defaultValue={editingLocation?.address} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">City</label>
              <Input placeholder="New York" defaultValue={editingLocation?.city} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">State</label>
              <Input placeholder="NY" defaultValue={editingLocation?.state} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">ZIP</label>
              <Input placeholder="10012" defaultValue={editingLocation?.zip} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">Phone</label>
              <Input placeholder="(212) 555-0134" defaultValue={editingLocation?.phone} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <Input placeholder="studio@solve.com" defaultValue={editingLocation?.email} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => { setShowAddDialog(false); setEditingLocation(null); }}>
              Cancel
            </Button>
            <Button type="submit">{editingLocation ? 'Save Changes' : 'Add Location'}</Button>
          </div>
        </form>
      </Dialog>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Location"
        description="Are you sure you want to delete this location? This action cannot be undone."
        confirmLabel="Delete"
      />
    </div>
  );
}
