# Aynaa Admin Console

A modern admin dashboard for managing the Aynaa content filtering system. Built with React, TypeScript, and Tailwind CSS.

## Features

### Core Management
- **Categories** - Manage content categories (PORN, GAMBLING, DRUGS, VIOLENCE, OTHER)
- **Keywords** - Manage blocked keywords with toggle functionality
- **Sites** - Manage blocked sites with URL validation
- **Whitelist** - Manage approved applications

### Review System
- **Suggestions** - Review and approve/reject user suggestions
- **Customization Requests** - Review device customization requests
- **Uninstall Requests** - Review app uninstall requests with image previews

### Architecture
- **Component-based** - Reusable UI components (DataPageLayout, StatusFilterPanel, IconInput, etc.)
- **Hook-driven** - Business logic encapsulated in custom hooks
- **Type-safe** - Full TypeScript coverage with Zod validation
- **Dialog system** - Centralized modal management
- **Responsive** - Mobile-friendly design with Tailwind CSS

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui components
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **HTTP Client**: Custom API client with fetch

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── DataPageLayout.tsx
│   ├── CreatePage.tsx
│   ├── StatusFilterPanel.tsx
│   ├── IconInput.tsx
│   ├── PasswordInput.tsx
│   └── AuthLayout.tsx
├── pages/              # Route components (thin shells)
│   ├── CategoriesPage.tsx
│   ├── KeywordsPage.tsx
│   ├── SitesPage.tsx
│   ├── WhitelistPage.tsx
│   ├── SuggestionsPage.tsx
│   ├── CustomizationPage.tsx
│   ├── UninstallPage.tsx
│   └── LoginPage.tsx
├── hooks/              # Business logic
│   ├── use-filters.ts
│   ├── use-crud-manager.ts
│   ├── useAuth.ts
│   ├── useCategories.ts
│   ├── useKeywords.ts
│   ├── useSites.ts
│   ├── useWhitelist.ts
│   ├── useSuggestions.ts
│   ├── useCustomization.ts
│   └── useUninstall.ts
├── services/           # API layer
│   ├── api.ts
│   ├── categories.ts
│   ├── keywords.ts
│   ├── sites.ts
│   ├── whitelist.ts
│   ├── suggestions.ts
│   ├── customization.ts
│   └── uninstall.ts
├── config/             # Configuration
│   ├── forms/          # Form schemas
│   ├── columns/        # Table column definitions
│   └── common/         # Shared configs
├── dialogs/            # Modal components
├── lib/                # Utilities
│   ├── utils.ts
│   ├── column-builders.tsx
│   └── dialog-types.ts
└── App.tsx             # App root with routing
```

## Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aynaa-admin-console
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your API URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

### Type Checking

```bash
npm run type-check  # or npx tsc --noEmit
```

## Configuration

### Environment Variables

```env
VITE_API_URL=https://api.wekayaa.com/api/v1
```

### API Integration

The app expects the following API structure:

- Authentication: `POST /auth/login?role=admin`
- Categories: `/admin/categories`
- Keywords: `/keywords`
- Sites: `/sites`
- Whitelist: `/whitelist`
- Suggestions: `/suggestions`
- Customization: `/customization`
- Uninstall: `/uninstall`

## Component Patterns

### Page Components
Pages are thin shells that compose:
- `CreatePage` for CRUD pages
- `DataPageLayout` for review pages
- Custom hooks for business logic

### Configuration-Driven
Pages use `PageConfig` objects that define:
- Query hooks and data transformation
- Mutation hooks
- Column generators
- Form configurations
- Messages and defaults

### Reusable Components
- **DataPageLayout** - Table page with header, search, pagination
- **CreatePage** - Full CRUD page with dialogs
- **StatusFilterPanel** - Status dropdown filter
- **IconInput** - Input with icon support
- **PasswordInput** - Password field with show/hide

## Authentication

Login uses JWT tokens stored in localStorage:
- Token key: `wekayaa_admin_token`
- Auto-logout on 401 responses
- Protected routes via `useAuth` hook

## Styling

- **Design System**: shadcn/ui components
- **Colors**: Tailwind CSS color palette
- **Icons**: Lucide React
- **Responsive**: Mobile-first approach
- **Dark Mode**: Configurable via CSS variables

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/name`
3. Make changes and commit: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature/name`
5. Open a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow existing component patterns
- Add proper error handling
- Include loading states
- Write meaningful commit messages

## Deployment

### Vercel
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview"]
```

### Environment Variables for Production
- `VITE_API_URL` - Production API endpoint
- Any other required environment variables

## License

[Add your license information]

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

Built with ❤️ for the Aynaa content filtering system