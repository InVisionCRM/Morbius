# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application using the App Router architecture with React 19, TypeScript, and Tailwind CSS 4.

## Development Commands

### Running the development server
```bash
npm run dev
```
Opens at http://localhost:3000 with hot reload enabled.

### Building for production
```bash
npm run build
```

### Starting production server
```bash
npm start
```

### Linting
```bash
npm run lint
```

## Architecture

### Framework & Routing
- **Next.js 16** with App Router (app directory)
- Server Components by default (use `"use client"` directive only when needed)
- File-based routing in `app/` directory
- Root layout in `app/layout.tsx` with Geist font configuration

### Styling
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- CSS variables defined in `app/globals.css` with dark mode support
- Theme configuration using inline `@theme` directive
- Custom CSS variables: `--background`, `--foreground`, `--font-geist-sans`, `--font-geist-mono`

### TypeScript Configuration
- Strict mode enabled
- Path alias `@/*` maps to project root
- ES2017 target with ESNext modules
- JSX configured for React 19 (`react-jsx`)

### Key Files
- `app/layout.tsx` - Root layout with metadata and font setup
- `app/page.tsx` - Home page component
- `app/globals.css` - Global styles and Tailwind imports
- `next.config.ts` - Next.js configuration
- `eslint.config.mjs` - ESLint configuration with Next.js presets

## Development Guidelines

### Component Development
- Use Server Components by default for better performance
- Add `"use client"` only when using hooks, event handlers, or browser APIs
- Prefer `async` Server Components for data fetching
- Use Next.js `Image` component for optimized images

### Styling Approach
- Use Tailwind utility classes as primary styling method
- Dark mode handled via `prefers-color-scheme` media query
- Custom theme values defined in `globals.css` using `@theme inline`
- Background and foreground colors automatically adapt to dark mode
