# HET IMPEX Admin Panel

Production-grade CMS/Admin Panel for HET IMPEX built with React, TypeScript, and Supabase.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4
- **Backend**: Supabase (Auth, Database, Storage, Edge Functions)
- **State Management**: React Query (TanStack Query v5)
- **UI Components**: Radix UI, Lucide Icons, Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Netlify

## Features

### Authentication
- Email/Password login
- Forgot password / Reset password
- Protected routes
- Session management
- Role-based access control

### Admin Modules
- **Dashboard**: Statistics, recent inquiries, recent products, latest blogs, activity timeline
- **Products**: CRUD, multiple images, gallery, specifications, categories, featured, SEO
- **Blogs**: Rich text editor, featured image, categories, draft/published, SEO
- **Media**: Supabase Storage, folders, upload, delete, rename, preview
- **Downloads**: PDF upload, title, description, category, download counter
- **Testimonials**: CRUD, image, company, rating
- **Inquiries**: Read, reply, delete, mark read, email notifications
- **Users**: User management, role assignment
- **Activity Logs**: Track all admin actions
- **Settings**: Company info, logo, contact details, social links, SMTP settings
- **SEO**: Meta title, meta description, OG image, canonical, JSON-LD

### Security
- Row Level Security (RLS)
- Protected API endpoints
- Input validation and sanitization
- Role-based permissions

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd het-impex-admin
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the migrations in order:
   - `supabase/migrations/20240101000000_initial_schema.sql`
   - `supabase/migrations/20240101000001_rls_policies.sql`
3. Create Storage buckets:
   - `media` (public)
   - `downloads` (public)
   - `settings` (public)
4. Create your first admin user in Supabase Auth
5. Assign the user the `super_admin` role in the `profiles` table

### 4. Run Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

### 6. Deploy to Netlify

1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy

## Project Structure

```
src/
├── app/                    # App-level components
├── components/
│   ├── layout/            # Layout components (sidebar, header)
│   ├── auth/              # Authentication components
│   └── ui/                # Reusable UI components
├── pages/
│   └── admin/             # Admin pages
├── hooks/                 # Custom React hooks
├── services/              # API services
├── lib/                   # Library configurations
├── utils/                 # Utility functions
├── types/                 # TypeScript type definitions
├── contexts/              # React contexts
├── styles/                # Global styles
└── assets/                # Static assets
```

## Default Roles

- **Super Admin**: Full access to all features
- **Admin**: Access to most features except user management
- **Editor**: Can manage content (products, blogs, media)
- **Viewer**: Read-only access

## License

Proprietary - HET IMPEX
