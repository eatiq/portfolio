# Ehsan Atiq - Portfolio Website

A high-performance portfolio website built with Next.js 14, showcasing product design and development work.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **Deployment**: Vercel

## Features

- ⚡ **Blazing Fast**: Server Components, Static Site Generation, automatic code splitting
- 🎨 **Rich Animations**: Smooth page transitions and scroll-based animations
- 🎭 **WebGL/Shaders**: Three.js integration for showcasing 3D work
- 📱 **Responsive Design**: Mobile-first, works beautifully on all devices
- 🌗 **Dark Mode**: Automatic dark mode based on system preferences
- 🚀 **Optimized Images**: Automatic WebP/AVIF conversion, lazy loading
- 📊 **SEO Optimized**: Server-side rendering, meta tags, sitemap

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

```
portfolio/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx          # Homepage
│   │   ├── layout.tsx        # Root layout
│   │   ├── work/             # Work pages
│   │   ├── about/            # About page
│   │   └── motion/           # Motion work page
│   ├── components/
│   │   ├── ui/               # UI components
│   │   ├── animations/       # Framer Motion components
│   │   └── three/            # Three.js/WebGL components
│   └── lib/
│       ├── projects.ts       # Project data
│       ├── types.ts          # TypeScript types
│       └── shaders/          # Custom shaders
├── public/                   # Static assets
└── tailwind.config.ts        # Tailwind configuration
```

## Performance

Expected Lighthouse scores:
- Performance: 95-100
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 95-100

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in Vercel
3. Deploy with zero configuration

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Other Platforms

The site works on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Railway

## Customization

### Adding Projects

Edit `src/lib/projects.ts`:

```typescript
{
  id: 'project-slug',
  title: 'Project Title',
  subtitle: 'Client/Company',
  description: 'Project description',
  image: '/images/projects/your-image.jpg',
  tags: ['Tag1', 'Tag2'],
  year: '2024',
  featured: true,
}
```

### Customizing Colors

Edit `src/app/globals.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
}
```

### Adding Custom Animations

Use the `FadeIn` component or create new animation components in `src/components/animations/`.

## License

© 2024 Ehsan Atiq. All rights reserved.
