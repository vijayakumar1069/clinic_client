# 🏥 Clinic Client Management System

A modern, full-stack clinic management application built with Next.js 14(React.js), featuring comprehensive patient and doctor management(Future), appointment scheduling, and administrative controls.

## 🚀 Live Demo

**Production URL:** https://clinic-client-pied.vercel.app

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Authentication & Authorization](#authentication--authorization)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🔐 Authentication & Authorization
- Secure user authentication with role-based access control
- Admin, Doctor(future), and Patient(future) role management
- Session management with proper token handling
- 
### 🏥 Admin Dashboard
- Comprehensive clinic oversight
- admin can add,edite,detele the doctors and filter the doctors based name,sepecilization
- full access to view all appointments with filtering option
- Configuration management

### 📱 Responsive Design
- Mobile-first responsive design
- Progressive Web App (PWA) capabilities
- Optimized for all device sizes
- Modern UI with Tailwind CSS and shadcn/ui

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)/React.js
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Server Components + Server Actions + Zustand
- **Forms:** React Hook Form with Zod validation
- **Icons:** Lucide React



### DevOps & Deployment
- **CI/CD:** GitHub Actions

## 📁 Project Structure

```
clinic_client/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (admin)/       # Admin layout group
│   │   │   ├── admin-appointments/
│   │   │   ├── admin-doctors/
│   │   │   └── admin-login/
│   │   ├── (public)/      # Public pages
│   │   ├── actions/       # Server Actions
│   │   ├── api/           # API Routes
│   │   │   └── auth/
│   │   │       └── token/
│   │   └── globals.css    # Global styles
│   ├── components/        # Reusable components
│   │   ├── AdminComponents/
│   │   ├── Forms/
│   │   ├── StaticSiteComponents/
│   │   └── ui/           # shadcn/ui components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   │   ├── consts/       # Constants
│   │   └── schema/       # Zod schemas
│   └── store/            # Zustand Store
├── .env                  # Environment variables
├── .gitignore
├── components.json       # shadcn/ui config
├── eslint.config.mjs    # ESLint configuration
├── jsconfig.json        # JavaScript config
├── next.config.mjs      # Next.js configuration
├── package.json
├── postcss.config.mjs   # PostCSS config
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm
  
### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vijayakumar1069/clinic_client.git
   cd clinic_client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your environment variables (see [Environment Variables](#environment-variables))
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_NODE_DEV=development
NEXT_PUBLIC_CLIENT_PROD_URL="frontend production url"
NEXT_PUBLIC_CLIENT_DEV_URL=http://localhost:3000
NEXT_PUBLIC_PRODUCTION_BACKEND_URL="backend production url"
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```
## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/production.yml
name: clinic Production Deployment

# Trigger on main branch push
on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      # Checkout repository
      - uses: actions/checkout@v4

      # Setup Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.12.0 # Stable Node.js version

      # Install Vercel CLI globally
      - name: Install Vercel CLI
        run: npm install -g vercel@latest

      # Clear cache and install dependencies
      - name: Install Dependencies
        run: |
          npm cache clean --force
          npm install --legacy-peer-deps

      # Pull Vercel environment
      - name: Vercel Environment Pull
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      # Build project
      - name: Build Project
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      # Deploy to Vercel
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```
### Pipeline Features

- **Automated Testing**: Unit tests, integration tests, E2E tests
- **Code Quality**: ESLint, Prettier, TypeScript checks
- **Security Scanning**: Dependency vulnerability checks
- **Automated Deployment**: Production deployment on merge to main
- **Environment Management**: Separate staging and production environments

## 📦 Deployment

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```
## 📊 Performance Optimization

- **Server-Side Rendering**: Optimized page load times
- **Static Generation**: Pre-rendered pages where possible
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting and lazy loading
- **Caching Strategy**: Redis caching for frequently accessed data

## 🔒 Security Features

- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content Security Policy
- **CSRF Protection**: Built-in Next.js protection
- **Rate Limiting**: API rate limiting implementation
- **Secure Headers**: Helmet.js integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all CI checks pass

## 📞 Support

For support and questions:
- Email: vijay.r20799@gmail.com  

---

**Built with ❤️ using Next.js, Tailwind CSS, and shadcn/ui**
