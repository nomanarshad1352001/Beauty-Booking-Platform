import { useState, useMemo } from 'react';
import { Plus, Search, Clock, Pencil, Trash2, Star } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { services as serviceData } from '@/lib/data/services';
import { serviceCategories } from '@/lib/data/categories';
import { formatCurrency, formatDuration } from '@/lib/utils/formatters';
import { useToastStore } from '@/lib/stores/toastStore';
import { Service } from '@/lib/types';


export function Services() {
  const [services, setServices] = useState<Service[]>(serviceData);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { addToast } = useToastStore();

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        !search ||
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || service.categoryId === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [services, search, categoryFilter]);

  const handleDelete = () => {
    if (deleteId) {
      setServices((prev) => prev.filter((s) => s.id !== deleteId));
      addToast('success', 'Service deleted', 'The service has been removed.');
    }
  };

  const getCategoryName = (categoryId: string) => {
    return serviceCategories.find((c) => c.id === categoryId)?.name ?? 'Unknown';
  };

  return (
    <div>
      <PageHeader
        title="Services"
        description="Manage your service offerings."
        action={
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
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
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <Button
                variant={categoryFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategoryFilter('all')}
              >
                All
              </Button>
              {serviceCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={categoryFilter === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoryFilter(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredServices.map((service) => (
          <Card key={service.id} className="overflow-hidden group">
            <div className="aspect-video relative">
              <img
                src={service.imageUrl}
                alt={service.name}
                className="h-full w-full object-cover"
              />
              {service.isPopular && (
                <Badge className="absolute top-3 left-3">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Popular
                </Badge>
              )}
              <Badge
                variant={service.isActive ? 'success' : 'secondary'}
                className="absolute top-3 right-3"
              >
                {service.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <p className="text-xs text-[hsl(var(--primary))] font-medium">
                    {getCategoryName(service.categoryId)}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setEditingService(service)}
                    className="p-1.5 rounded hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(service.id)}
                    className="p-1.5 rounded hover:bg-[hsl(var(--muted))] text-[hsl(var(--destructive))]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-2 mb-3">
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-[hsl(var(--primary))]">
                    {formatCurrency(service.price)}
                  </span>
                  <span className="text-xs text-[hsl(var(--muted-foreground))] ml-2">
                    Deposit: {formatCurrency(service.depositAmount)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))]">
                  <Clock className="h-4 w-4" />
                  {formatDuration(service.duration)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-[hsl(var(--muted-foreground))]">No services found matching your filters.</p>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog || !!editingService} onClose={() => { setShowAddDialog(false); setEditingService(null); }}>
        <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
        <DialogDescription>
          {editingService ? 'Update the service details.' : 'Create a new service offering.'}
        </DialogDescription>
        <form
          className="mt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            addToast('success', editingService ? 'Service updated' : 'Service added', 'Changes have been saved.');
            setShowAddDialog(false);
            setEditingService(null);
          }}
        >
          <div>
            <label className="block text-sm font-medium mb-1.5">Name</label>
            <Input placeholder="Ombré Powder Brows" defaultValue={editingService?.name} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Category</label>
            <select
              className="w-full h-10 rounded-[var(--radius)] border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 text-sm"
              defaultValue={editingService?.categoryId}
            >
              {serviceCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Description</label>
            <Textarea placeholder="Service description..." defaultValue={editingService?.description} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">Price ($)</label>
              <Input type="number" placeholder="650" defaultValue={editingService?.price} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Deposit ($)</label>
              <Input type="number" placeholder="100" defaultValue={editingService?.depositAmount} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Duration (min)</label>
              <Input type="number" placeholder="120" defaultValue={editingService?.duration} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => { setShowAddDialog(false); setEditingService(null); }}>
              Cancel
            </Button>
            <Button type="submit">{editingService ? 'Save Changes' : 'Add Service'}</Button>
          </div>
        </form>
      </Dialog>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
        confirmLabel="Delete"
      />
    </div>
  );
}
