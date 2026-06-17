import { useState } from 'react';
import {
  CreditCard,
  Leaf,
  Building2,
  Calendar,
  Gem,
  Mail,
  ExternalLink,
  Settings,
  RefreshCw,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { IntegrationStatusBadge } from '@/components/shared/StatusBadge';
import { integrations as integrationsData } from '@/lib/data/integrations';
import { useToastStore } from '@/lib/stores/toastStore';
import { Integration, IntegrationProvider } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils/formatters';
import { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  CreditCard,
  Leaf,
  Building2,
  Calendar,
  Gem,
  Mail,
};

const integrationDocs: Record<IntegrationProvider, string> = {
  stripe: 'https://stripe.com/docs/api',
  mangomint: 'https://www.mangomint.com/api',
  boulevard: 'https://developers.joinblvd.com/',
  vagaro: 'https://www.vagaro.com/pro/apidocs',
  glossgenius: 'https://www.glossgenius.com/',
  klaviyo: 'https://developers.klaviyo.com/',
};

export function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>(integrationsData);
  const [configuring, setConfiguring] = useState<Integration | null>(null);
  const [syncing, setSyncing] = useState<string | null>(null);
  const { addToast } = useToastStore();

  const handleConnect = (integration: Integration) => {
    setConfiguring(integration);
  };

  const handleDisconnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: 'disconnected', apiKeySet: false, lastSyncAt: undefined } : i
      )
    );
    addToast('success', 'Disconnected', 'Integration has been disconnected.');
  };

  const handleSaveConfig = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: 'connected', apiKeySet: true, lastSyncAt: new Date().toISOString() } : i
      )
    );
    setConfiguring(null);
    addToast('success', 'Connected', 'Integration has been configured and connected.');
  };

  const handleSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((i) => (i.id === id ? { ...i, lastSyncAt: new Date().toISOString() } : i))
      );
      setSyncing(null);
      addToast('success', 'Sync complete', 'Data has been synced successfully.');
    }, 2000);
  };

  // Group integrations by type
  const paymentIntegrations = integrations.filter((i) => i.provider === 'stripe');
  const bookingIntegrations = integrations.filter((i) =>
    ['mangomint', 'boulevard', 'vagaro', 'glossgenius'].includes(i.provider)
  );
  const marketingIntegrations = integrations.filter((i) => i.provider === 'klaviyo');

  const renderIntegrationCard = (integration: Integration) => {
    const Icon = iconMap[integration.icon] || Gem;
    return (
      <Card key={integration.id}>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/10">
              <Icon className="h-6 w-6 text-[hsl(var(--primary))]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{integration.name}</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-2 mt-0.5">
                    {integration.description}
                  </p>
                </div>
                <IntegrationStatusBadge status={integration.status} />
              </div>

              {integration.lastSyncAt && integration.status === 'connected' && (
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
                  Last synced: {formatRelativeTime(integration.lastSyncAt)}
                </p>
              )}

              <div className="flex items-center gap-2 mt-4">
                {integration.status === 'connected' ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSync(integration.id)}
                      disabled={syncing === integration.id}
                    >
                      {syncing === integration.id ? (
                        <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                      ) : (
                        <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                      )}
                      Sync
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleConnect(integration)}>
                      <Settings className="h-3.5 w-3.5 mr-1.5" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[hsl(var(--destructive))]"
                      onClick={() => handleDisconnect(integration.id)}
                    >
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" onClick={() => handleConnect(integration)}>
                      Connect
                    </Button>
                    <a
                      href={integrationDocs[integration.provider]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                        Docs
                      </Button>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
      <PageHeader
        title="Integrations"
        description="Connect your booking software, payment processor, and marketing tools."
      />

      <div className="space-y-8">
        {/* Payment */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Payment Processing</h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {paymentIntegrations.map(renderIntegrationCard)}
          </div>
        </section>

        {/* Booking Software */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Booking Software</h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
            Connect your existing booking platform to sync appointments, services, and availability.
          </p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {bookingIntegrations.map(renderIntegrationCard)}
          </div>
        </section>

        {/* Marketing */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Marketing & Communications</h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {marketingIntegrations.map(renderIntegrationCard)}
          </div>
        </section>
      </div>

      {/* Configuration Dialog */}
      <Dialog open={!!configuring} onClose={() => setConfiguring(null)}>
        {configuring && (
          <>
            <DialogTitle>Configure {configuring.name}</DialogTitle>
            <DialogDescription>
              Enter your API credentials to connect {configuring.name}.
            </DialogDescription>
            <form
              className="mt-4 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveConfig(configuring.id);
              }}
            >
              <div>
                <label className="block text-sm font-medium mb-1.5">API Key</label>
                <Input
                  type="password"
                  placeholder="sk_live_..."
                  defaultValue={configuring.apiKeySet ? '••••••••••••••••' : ''}
                />
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                  Find your API key in your {configuring.name} dashboard.
                </p>
              </div>

              {configuring.provider === 'stripe' && (
                <div>
                  <label className="block text-sm font-medium mb-1.5">Webhook Secret</label>
                  <Input
                    type="password"
                    placeholder="whsec_..."
                  />
                </div>
              )}

              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                <p className="text-xs text-amber-800 dark:text-amber-200">
                  <strong>Prototype Note:</strong> In production, API keys are encrypted and stored securely. This is a demo interface.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setConfiguring(null)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {configuring.status === 'connected' ? 'Save Changes' : 'Connect'}
                </Button>
              </div>
            </form>
          </>
        )}
      </Dialog>
    </div>
  );
}
