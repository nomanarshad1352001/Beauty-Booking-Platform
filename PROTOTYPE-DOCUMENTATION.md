# Solvé Studio — Prototype Documentation

## SECTION 1: EXECUTIVE SUMMARY

### What is Solvé Studio?

Solvé Studio is a premium white-label booking platform designed specifically for the beauty and aesthetics industry. It provides a seamless, luxury-feeling booking experience for clients while giving business owners powerful administrative tools to manage their operations.

### Who is it for?

- **PMU (Permanent Makeup) Artists**
- **Med Spas & Aesthetic Clinics**
- **Luxury Beauty Salons**
- **Independent Beauty Professionals**
- **Multi-location Beauty Brands**

### Core Value Proposition

1. **Premium Client Experience** — A beautiful, intuitive booking flow that matches the luxury positioning of high-end beauty services
2. **White-Label Architecture** — Fully customizable branding to match each business's identity
3. **Existing Software Integration** — Connects to popular booking platforms (Vagaro, Boulevard, Mangomint, GlossGenius) via APIs, so businesses don't have to switch systems
4. **Mobile-First Design** — Optimized for how clients actually book — on their phones

---

## SECTION 2: FEATURES BUILT

### Public/Client Pages

| Page | Route | Description | Key Interactions |
|------|-------|-------------|------------------|
| Landing Page | `/` | Marketing homepage with services, providers, locations | Browse services, navigate to booking |
| Booking Flow | `/book` | Multi-step appointment booking wizard | 8-step booking process (see below) |

### Booking Flow Steps

1. **Client Type** (`/book` — step 1) — New vs returning client selection
2. **Location** (`/book` — step 2) — Choose from available studio locations
3. **Category** (`/book` — step 3) — Select service category (PMU, Facials, Injectables, etc.)
4. **Service** (`/book` — step 4) — Choose specific service with pricing and duration
5. **Provider** (`/book` — step 5) — Select provider with ratings and bio
6. **Date & Time** (`/book` — step 6) — Calendar with available time slots
7. **Details** (`/book` — step 7) — Client contact information form
8. **Payment** (`/book` — step 8) — Deposit payment (mock Stripe UI)
9. **Confirmation** (`/book` — step 9) — Booking confirmation with details

### Authentication Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | Admin portal sign-in with demo credentials |
| Signup | `/signup` | Admin registration form |

### Admin Dashboard Pages

| Page | Route | Description | Key Interactions |
|------|-------|-------------|------------------|
| Dashboard | `/admin` | Analytics overview with stats and charts | View KPIs, recent bookings, revenue charts |
| Bookings | `/admin/bookings` | Appointment management | Search, filter by status, pagination |
| Locations | `/admin/locations` | Studio location management | Add, edit, delete, toggle active status |
| Services | `/admin/services` | Service offerings management | Add, edit, delete, filter by category |
| Providers | `/admin/providers` | Staff/artist management | Add, edit, delete, filter by location |
| Branding | `/admin/branding` | White-label customization | Edit business name, colors, tagline |
| Integrations | `/admin/integrations` | Third-party connections | Connect/disconnect, sync data |
| Settings | `/admin/settings` | Account preferences | Profile, password, notifications, timezone |

---

## SECTION 3: USER FLOWS

### Flow 1: Client Books an Appointment

1. Client visits landing page (`/`)
2. Clicks "Book Your Appointment" button
3. Selects "I'm New Here" or "Welcome Back"
4. Chooses a location (e.g., "SoHo Studio")
5. Selects a service category (e.g., "Permanent Makeup")
6. Picks a specific service (e.g., "Ombré Powder Brows — $650")
7. Chooses a provider (e.g., "Elena Vasquez")
8. Selects date and available time slot
9. Fills in contact details (name, email, phone)
10. Enters payment information (mock Stripe form)
11. Clicks "Pay $100 Deposit"
12. Views confirmation page with booking summary
13. Receives confirmation number

### Flow 2: Admin Views Dashboard

1. Admin visits `/login`
2. Enters credentials (admin@demo.com / demo1234)
3. Redirected to `/admin` dashboard
4. Views stat cards: Total Bookings, Revenue, New Clients, Avg Rating
5. Reviews revenue trend chart (monthly)
6. Checks revenue breakdown by category (pie chart)
7. Reviews upcoming appointments table

### Flow 3: Admin Manages Services

1. Admin navigates to `/admin/services`
2. Uses search bar to find specific service
3. Filters by category (e.g., "Injectables")
4. Clicks "Add Service" button
5. Fills in service form (name, category, description, price, duration)
6. Clicks "Add Service" to save
7. Toast notification confirms success
8. New service appears in grid

### Flow 4: Admin Configures Branding

1. Admin navigates to `/admin/branding`
2. Updates business name and tagline
3. Adjusts brand colors using color pickers
4. Enters logo and hero image URLs
5. Views live preview on right side
6. Clicks "Save Changes"
7. Toast confirms branding updated

### Flow 5: Admin Connects Integration

1. Admin navigates to `/admin/integrations`
2. Views available integrations (Stripe, Mangomint, etc.)
3. Clicks "Connect" on Mangomint
4. Modal appears for API key entry
5. Enters API credentials
6. Clicks "Connect"
7. Integration status changes to "Connected"
8. Can now sync data using "Sync" button

---

## SECTION 4: DEMO GUIDE

### Recommended Demo Flow (10-15 minutes)

#### Part 1: Client Booking Experience (5 min)

1. **Start at landing page** (`/`) — Show the premium design, services, and locations
2. **Click "Book Now"** — Walk through the booking flow:
   - Select "I'm New Here"
   - Choose SoHo Studio
   - Select "Permanent Makeup" → "Ombré Powder Brows"
   - Pick Elena Vasquez as provider
   - Select a date and time
   - Fill in client details (use any test data)
   - Show the payment form (pre-filled with test card)
   - Complete booking and show confirmation

#### Part 2: Admin Dashboard (5 min)

1. **Navigate to `/login`**
2. **Click "Admin Login"** quick fill button → Sign in
3. **Show Dashboard** — Highlight:
   - Stat cards with trends
   - Revenue chart
   - Upcoming bookings
4. **Navigate to Bookings** — Show:
   - Search functionality
   - Status filters
   - Booking details in table

#### Part 3: White-Label Features (3 min)

1. **Navigate to Branding** — Show:
   - Business name customization
   - Color pickers with live preview
   - Explain how this creates unique branded experiences

2. **Navigate to Integrations** — Show:
   - Available booking software connections
   - Stripe payment integration
   - Klaviyo for marketing

#### Part 4: Theme Toggle (1 min)

1. Click the theme toggle in header
2. Show the entire UI adapts to dark/light mode
3. Emphasize this works across all pages

### Key Points to Highlight

- ✅ Mobile-responsive design — resize browser to show
- ✅ Premium aesthetic matching luxury beauty positioning
- ✅ Real form validation — try submitting empty forms
- ✅ Toast notifications for user feedback
- ✅ Smooth animations and transitions
- ✅ White-label capability for multiple businesses

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@demo.com | demo1234 |
| Manager | user@demo.com | demo1234 |

---

## SECTION 5: PROTOTYPE LIMITATIONS & PRODUCTION NOTES

### What's Mocked (Prototype)

| Feature | Prototype Behavior | Production Requirement |
|---------|-------------------|----------------------|
| Authentication | localStorage-based with hardcoded users | Supabase Auth or NextAuth.js |
| Payments | Mock UI, no actual processing | Stripe API integration |
| Booking Software | Static data, no real sync | API integration with Vagaro/Boulevard/etc. |
| Email/SMS | Toast notification only | Klaviyo or SendGrid integration |
| Time Slots | Generated algorithmically | Query provider's availability API |
| Images | Stock photos via URLs | CDN/Cloudinary for uploaded assets |
| Database | In-memory dummy data | PostgreSQL via Supabase |

### Production Implementation Needs

1. **Backend Infrastructure**
   - Supabase project with PostgreSQL database
   - Row-level security policies
   - Edge functions for API abstraction

2. **Authentication**
   - Supabase Auth with email/password
   - Social login options (Google, Apple)
   - Role-based access control

3. **Payment Integration**
   - Stripe Connect for multi-merchant support
   - Webhook handlers for payment events
   - Refund and dispute handling

4. **Booking Software APIs**
   - Abstraction layer for multiple providers
   - OAuth flows for each platform
   - Webhook receivers for real-time sync

5. **Real-time Features**
   - Supabase Realtime for availability updates
   - WebSocket for admin notifications

6. **File Storage**
   - Supabase Storage or Cloudinary
   - Image optimization pipeline

7. **Email/SMS**
   - Transactional emails (booking confirmations)
   - Marketing automation via Klaviyo
   - SMS reminders via Twilio

### Recommended Tech Stack for Production

```
Frontend:     Next.js 14+ (App Router)
Database:     Supabase PostgreSQL
Auth:         Supabase Auth
Payments:     Stripe
File Storage: Supabase Storage
Email:        Resend + Klaviyo
SMS:          Twilio
Hosting:      Vercel
CDN:          Cloudflare
Monitoring:   Sentry
```

---

## SECTION 6: DUMMY DATA REFERENCE

### Entity: Users (Admin accounts)

| Field | Type | Description |
|-------|------|-------------|
| id | string | Primary key (usr_XXX) |
| email | string | Unique email address |
| name | string | Full name |
| role | UserRole | 'admin' or 'manager' |
| isActive | boolean | Account status |
| createdAt | string | ISO timestamp |
| updatedAt | string | ISO timestamp |

### Entity: Locations

| Field | Type | Description |
|-------|------|-------------|
| id | string | Primary key (loc_XXX) |
| name | string | Location display name |
| address | string | Street address |
| city | string | City name |
| state | string | State abbreviation |
| zip | string | ZIP code |
| phone | string | Contact phone |
| email | string | Contact email |
| imageUrl | string | Location photo URL |
| isActive | boolean | Active status |
| hours | BusinessHours | Operating hours object |

### Entity: ServiceCategories

| Field | Type | Description |
|-------|------|-------------|
| id | string | Primary key (cat_XXX) |
| name | string | Category name |
| slug | string | URL-friendly slug |
| description | string | Category description |
| icon | string | Lucide icon name |
| sortOrder | number | Display order |

### Entity: Services

| Field | Type | Description |
|-------|------|-------------|
| id | string | Primary key (svc_XXX) |
| categoryId | string | FK to ServiceCategories |
| locationIds | string[] | Available at these locations |
| name | string | Service name |
| description | string | Service description |
| duration | number | Duration in minutes |
| price | number | Full price in cents |
| depositAmount | number | Deposit amount |
| imageUrl | string | Service photo URL |
| isActive | boolean | Active status |
| isPopular | boolean | Featured flag |

### Entity: Providers

| Field | Type | Description |
|-------|------|-------------|
| id | string | Primary key (prv_XXX) |
| locationId | string | FK to Locations |
| name | string | Provider name |
| title | string | Professional title |
| bio | string | Biography text |
| avatarUrl | string | Profile photo URL |
| serviceIds | string[] | Services offered |
| rating | number | Average rating (1-5) |
| reviewCount | number | Total reviews |
| isActive | boolean | Active status |

### Entity: Clients

| Field | Type | Description |
|-------|------|-------------|
| id | string | Primary key (cli_XXX) |
| firstName | string | First name |
| lastName | string | Last name |
| email | string | Email address |
| phone | string | Phone number |
| isNewClient | boolean | First-time client flag |
| totalBookings | number | Lifetime bookings |
| totalSpent | number | Lifetime spend |
| notes | string? | Internal notes |

### Entity: Bookings

| Field | Type | Description |
|-------|------|-------------|
| id | string | Primary key (bkg_XXX) |
| clientId | string | FK to Clients |
| providerId | string | FK to Providers |
| serviceId | string | FK to Services |
| locationId | string | FK to Locations |
| date | string | Booking date (YYYY-MM-DD) |
| startTime | string | Start time (HH:MM) |
| endTime | string | End time (HH:MM) |
| status | BookingStatus | confirmed/pending/completed/cancelled/no-show |
| totalPrice | number | Full service price |
| depositPaid | number | Deposit collected |
| notes | string? | Booking notes |
| source | string | website/admin/api |

### Entity: Integrations

| Field | Type | Description |
|-------|------|-------------|
| id | string | Primary key (int_XXX) |
| provider | IntegrationProvider | stripe/mangomint/etc. |
| name | string | Display name |
| description | string | Integration description |
| status | IntegrationStatus | connected/disconnected/error |
| icon | string | Lucide icon name |
| apiKeySet | boolean | Has API key configured |
| lastSyncAt | string? | Last sync timestamp |

### Entity Relationships

```
Locations
  └── Providers (1:many)
  └── Services via locationIds (many:many)

ServiceCategories
  └── Services (1:many)

Providers
  └── Services via serviceIds (many:many)
  └── Bookings (1:many)

Clients
  └── Bookings (1:many)

Services
  └── Bookings (1:many)
```

---

## Appendix: File Locations

| Entity | Data File | Types File |
|--------|-----------|------------|
| Users | `src/lib/data/users.ts` | `src/lib/types/index.ts` |
| Locations | `src/lib/data/locations.ts` | `src/lib/types/index.ts` |
| Categories | `src/lib/data/categories.ts` | `src/lib/types/index.ts` |
| Services | `src/lib/data/services.ts` | `src/lib/types/index.ts` |
| Providers | `src/lib/data/providers.ts` | `src/lib/types/index.ts` |
| Clients | `src/lib/data/clients.ts` | `src/lib/types/index.ts` |
| Bookings | `src/lib/data/bookings.ts` | `src/lib/types/index.ts` |
| Integrations | `src/lib/data/integrations.ts` | `src/lib/types/index.ts` |
| Analytics | `src/lib/data/analytics.ts` | `src/lib/types/index.ts` |
