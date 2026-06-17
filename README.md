# Solvé Studio — Premium Beauty Booking Platform

A white-label booking platform for beauty professionals, PMU artists, med spas, aesthetic clinics, and luxury beauty brands. Built as a production-ready prototype for client demonstrations.

![Solvé Studio](https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80)

## 🚀 Tech Stack

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand
- **Routing:** React Router DOM 6
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts
- **Icons:** Lucide React
- **Animations:** Framer Motion (minimal usage)
- **Date Utilities:** date-fns

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Local Setup

1. **Clone/Download the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🔐 Demo Credentials

Use these credentials to access the admin dashboard:

| Role    | Email            | Password   |
|---------|------------------|------------|
| Admin   | admin@demo.com   | demo1234   |
| Manager | user@demo.com    | demo1234   |

## 📁 Project Structure

```
src/
├── components/
│   ├── booking/       # Multi-step booking flow components
│   ├── layout/        # Header, Sidebar, Layout components
│   ├── shared/        # Reusable components (Toast, StatCard, etc.)
│   └── ui/            # Base UI components (Button, Card, Input, etc.)
├── lib/
│   ├── data/          # Mock data files (users, services, etc.)
│   ├── stores/        # Zustand stores (auth, booking, theme, toast)
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions (formatters, time-slots)
│   └── validations/   # Zod validation schemas
├── pages/
│   ├── admin/         # Admin dashboard pages
│   └── *.tsx          # Public pages (Landing, Login, Booking, etc.)
└── App.tsx            # Root component with routing
```

## 🎨 Features

### Client-Facing Booking
- New vs Returning client flow
- Location selection
- Service category and service selection
- Provider selection with ratings
- Calendar with time slot availability
- Client details form with validation
- Mock payment flow (Stripe-like UI)
- Booking confirmation

### Admin Dashboard
- Analytics overview with charts
- Bookings management (list, filter, search)
- Locations CRUD
- Services CRUD with categories
- Providers management
- White-label branding customization
- Third-party integrations panel
- Account settings

### UX Features
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive (mobile-first)
- 🔔 Toast notifications
- ⏳ Loading states
- ✅ Form validation
- 🗑️ Confirmation dialogs
- 🔍 Search & filtering

## 🔌 Integrations (Mock UI)

The prototype includes UI for these integrations:

- **Stripe** — Payment processing
- **Mangomint** — Salon management
- **Boulevard** — Client experience platform
- **Vagaro** — Booking management
- **GlossGenius** — Beauty business tools
- **Klaviyo** — Email marketing

> Note: These are UI mockups only. Production implementation requires actual API integration.

## 🏗️ Building for Production

```bash
npm run build
```

The build output is a single HTML file in `dist/` (using vite-plugin-singlefile).

## 🚀 Deployment

This project is configured for easy deployment to:

- **Vercel** — Connect repo and deploy
- **Netlify** — Connect repo and deploy
- **Any static hosting** — Upload the `dist/` folder

## 📄 License

Proprietary — Solvé Studio. For demonstration purposes only.
