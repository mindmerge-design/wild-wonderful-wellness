# Claude Code Instructions

This document provides guidelines for Claude Code when working with this Astro + Tailwind CSS + Sanity CMS project.

## Project Overview

This is an Astro 5.x project using:

- **Framework**: Astro (SSR mode on Netlify)
- **Styling**: Tailwind CSS v4 (CSS-based configuration)
- **CMS**: Sanity with preview mode support
- **UI Components**: Custom Starwind UI library
- **Icons**: Lucide Astro (primary)
- **Language**: TypeScript (strict mode)

## Critical Guidelines

### Code Style & Patterns

1. **Component Variants**: Use `tailwind-variants` (tv) for component variants, NOT inline conditionals
2. **Component Type**: Prefer `.astro` components over React unless client-side interactivity is required
3. **Imports**: Always use `@/*` path aliases (e.g., `@/components/starwind/button`)
4. **Colors**: Use HSL semantic color variables from `global.css`:
   - `primary`, `secondary`, `accent`, `error`, `success`, `warning`, `info`
   - Always use `bg-primary`, `text-foreground`, etc., NOT hex codes
5. **Image Handling**:
   - Use Astro's `<Image />` component, NEVER raw `<img>` tags
   - For Sanity images, use `urlForImage()` from `@/sanity/lib/urlForImage`
6. **Icons**: Use `lucide-astro` - import like: `import { IconName } from "lucide-astro"`

### Critical Pitfalls to Avoid

1. **Tailwind v4**: This project uses Tailwind v4 with CSS-based config in `src/styles/global.css`
   - DO NOT create `tailwind.config.js` or use v3 syntax
   - DO NOT install Tailwind v3 plugins that aren't v4 compatible

2. **CSS Files**: DO NOT create new CSS files
   - Add styles to `src/styles/global.css` or use Tailwind utilities

3. **Sanity Configuration**:
   - Sanity `projectId`, `dataset`, and `apiVersion` are in `astro.config.mjs`, NOT environment variables
   - Only `SANITY_API_TOKEN` is an environment variable (for preview mode)

4. **React Usage**: DO NOT use `useState`/`useEffect` in `.astro` files
   - Create React components with `client:*` directives for interactivity

5. **Accessibility**: DO NOT delete or modify accessibility features without explicit request

## File Structure

```
src/
├── components/
│   ├── elements/        # Reusable UI elements
│   ├── layout/          # Header, Footer, Navigation
│   └── starwind/        # Starwind UI component library (Button, Accordion, Tabs, Dropdown)
├── layouts/
│   └── Layout.astro     # Base layout with head, meta, scripts
├── pages/
│   ├── index.astro      # Homepage
│   ├── [...slug].astro  # Dynamic routes
│   └── api/             # API endpoints (preview mode)
├── sanity/
│   ├── lib/
│   │   ├── load-query.ts      # Query loader with preview support
│   │   ├── urlForImage.ts     # Image URL builder
│   │   └── utils.ts           # Utility functions
│   └── schemaTypes/     # Content type definitions
├── styles/
│   └── global.css       # Tailwind v4 config + custom styles
└── env.d.ts            # TypeScript environment types
```

## Key Files

| File                            | Purpose                                     |
| ------------------------------- | ------------------------------------------- |
| `astro.config.mjs`              | Astro config, integrations, Sanity setup    |
| `src/styles/global.css`         | Tailwind v4 config, theme colors, utilities |
| `src/layouts/Layout.astro`      | Base layout with SEO, meta tags             |
| `src/sanity/lib/load-query.ts`  | Sanity query loader with preview            |
| `src/pages/api/preview.ts`      | Enable preview mode endpoint                |
| `src/pages/api/exit-preview.ts` | Disable preview mode endpoint               |

## Sanity Content Types

Available in `src/sanity/schemaTypes/`:

- `author` - Blog post authors
- `category` - Post categories
- `post` - Blog posts with Portable Text
- `blockContent` - Rich text content
- `section` - Page sections
- `home` - Homepage content
- `generic` - Generic pages
- `pageBuilder` - Page builder blocks
- `imageAlt`, `imageGallery`, `videoEmbed`, `accordion`, `twoCols` - Content blocks
- `seo` - SEO metadata

## Component Usage Examples

### Button Component

```astro
---
import { Button } from '@/components/starwind/button'
---

<Button variant="primary" size="md">Click me</Button>
<Button variant="outline" size="sm">Outline</Button>
<Button href="/about" variant="ghost">Link Button</Button>
```

Variants: `default`, `primary`, `secondary`, `outline`, `ghost`, `info`, `success`, `warning`, `error`
Sizes: `sm`, `md`, `lg`, `icon`

### Icons (Lucide)

```astro
---
import { Menu, X, ChevronDown } from 'lucide-astro'
---

<Menu class="size-6" />
<X class="text-primary size-4" />
```

### Tailwind Variants Pattern

```astro
---
import { tv } from 'tailwind-variants'

const card = tv({
	base: 'rounded-lg p-4 shadow-md',
	variants: {
		color: {
			primary: 'bg-primary text-primary-foreground',
			secondary: 'bg-secondary text-secondary-foreground'
		}
	},
	defaultVariants: { color: 'primary' }
})
---

<div class={card({ color: 'secondary' })}>Content</div>
```

### Sanity Image

```astro
---
import { Image } from 'astro:assets'
import { urlForImage } from '@/sanity/lib/urlForImage'
---

<Image
	src={urlForImage(image).width(800).height(600).url()}
	alt={image.alt}
	width={800}
	height={600}
/>
```

## Environment Variables

Only one environment variable is used:

| Variable           | Purpose                           | Required         |
| ------------------ | --------------------------------- | ---------------- |
| `SANITY_API_TOKEN` | Sanity API token for preview mode | For preview only |

Note: Sanity project config is in `astro.config.mjs`, not env variables.

## Preview Mode

Cookie-based preview system for Sanity draft content:

- Enable: `/api/preview?secret=YOUR_SECRET&slug=/page-path`
- Disable: `/api/exit-preview`
- Token stored in `.env` as `SANITY_API_TOKEN`
- See `SANITY_PREVIEW_SETUP.md` for full documentation

## Scripts

Before starting any dev server, check if one is already running:
- `lsof -i :4321` — Astro dev server
- `lsof -i :3333` — Sanity Studio

If a process is listed on the relevant port, skip starting that server.

```bash
npm run dev      # Development server (localhost:4321)
npm run build    # Production build
npm run preview  # Preview production build
```

## TypeScript Configuration

- Extends `astro/tsconfigs/strict`
- Path alias: `@/*` → `src/*`
- Strict mode enabled

## Deployment

- **Platform**: Netlify
- **Adapter**: `@astrojs/netlify` (SSR mode)
- **Build command**: `npm run build`
- **Output**: Server-side rendered

## Accessibility Requirements

This project maintains WCAG AA compliance:

- Color contrast ratios: 4.5:1 minimum (normal text), 14:1 (dark mode)
- Full keyboard navigation support
- ARIA labels on all interactive elements
- Semantic HTML structure
- Skip navigation link
- Proper heading hierarchy
- Alt text for all images

DO NOT remove or compromise accessibility features without explicit request.

## When Making Changes

1. **Read Before Writing**: Always read existing files before modifying them
2. **Follow Patterns**: Match existing component patterns in `src/components/starwind/`
3. **Use Existing Components**: Check if a component already exists before creating new ones
4. **Semantic Colors**: Use semantic color names, not arbitrary colors
5. **Type Safety**: Ensure TypeScript types are correct
6. **Test Locally**: Verify changes work with `npm run dev`

## Common Tasks

### Adding a New Page

1. Create `.astro` file in `src/pages/`
2. Use `Layout.astro` as base layout
3. Import components from `@/components/`
4. Follow existing page patterns

### Adding a New Component

1. Check if similar component exists in `src/components/*`
2. Use `tailwind-variants` for variants
3. Make it accessible (ARIA, keyboard nav)
4. Export from component file

### Modifying Styles

1. Add to `src/styles/global.css` for global styles
2. Use Tailwind utilities for component styles
3. Use semantic color variables

### Working with Sanity

1. Query data in page/component
2. Use `load-query.ts` for queries with preview support
3. Use `urlForImage()` for image URLs
4. Use `astro-portabletext` for rich text rendering

## Technology Stack

**Core**: Astro 5.x, TypeScript, Tailwind CSS v4
**CMS**: Sanity (with visual editing)
**UI**: Starwind UI, Custom Components, Lucide icons
**Utilities**: tailwind-variants, tailwind-merge, clsx
**Media**: Sharp (image processing), Vimeo embeds
**SEO**: astro-seo, sitemap generation, meta tags
**Deployment**: Netlify (SSR)

---

Last Updated: 2026-01-08
