# Performance Optimization Guide

This document outlines the performance optimizations implemented and additional recommendations.

## Built-in Optimizations

### 1. Next.js Server Components (Default)
- Pages and components render on the server by default
- Reduces JavaScript sent to the client
- Faster initial page load
- Better SEO

### 2. Static Site Generation (SSG)
- All pages are pre-rendered at build time
- Instant page loads
- Served from CDN
- No server-side processing needed

### 3. Automatic Code Splitting
- Each route is a separate bundle
- Only load JavaScript needed for current page
- Reduces initial bundle size by ~70%

### 4. Image Optimization
Using `next/image`:
- Automatic WebP/AVIF conversion
- Responsive images with `sizes` attribute
- Lazy loading out of the box
- Blur placeholder for better UX
- On-demand optimization

### 5. Font Optimization
Using `next/font`:
- Self-hosted Google Fonts
- Zero layout shift
- Preloaded for performance
- CSS optimization

### 6. Route Prefetching
- Next.js automatically prefetches linked pages
- Pages load instantly on navigation
- Happens during browser idle time

## Performance Metrics

Expected Lighthouse scores:

```
Performance:    95-100
Accessibility:  95-100
Best Practices: 95-100
SEO:           95-100
```

Expected Core Web Vitals:
- **LCP (Largest Contentful Paint)**: < 1.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## Current Bundle Sizes

Estimated production bundles:
```
Route (app)                     Size
┌ ○ /                          ~120 KB
├ ○ /about                     ~110 KB
├ ○ /motion                    ~115 KB
├ ○ /work                      ~125 KB
└ ○ /work/[slug]               ~122 KB

First Load JS shared by all    ~85 KB
├ chunks/main.js              ~50 KB
└ chunks/react-vendor.js      ~35 KB
```

## Optimization Strategies

### 1. Lazy Load Heavy Components

For Three.js/WebGL components:

```tsx
import dynamic from 'next/dynamic';

const ShaderCanvas = dynamic(() => import('@/components/three/ShaderCanvas'), {
  ssr: false,
  loading: () => <div>Loading 3D scene...</div>
});
```

### 2. Optimize Images

Before adding images:
- Compress with tools like [Squoosh](https://squoosh.app/)
- Use WebP or AVIF format
- Recommended max width: 2400px for hero images, 1200px for others
- Use appropriate quality (75-85 is usually optimal)

### 3. Animation Performance

Framer Motion optimizations:
```tsx
// Use layout animations for smooth position changes
<motion.div layout />

// Use GPU-accelerated properties only
// ✅ Good: transform, opacity
// ❌ Avoid: width, height, top, left

// Use will-change sparingly
<motion.div style={{ willChange: 'transform' }} />
```

### 4. Reduce JavaScript

- Use Server Components by default
- Only use 'use client' when necessary (user interactions, animations)
- Remove unused dependencies
- Consider alternatives to heavy libraries

### 5. Database/API Optimization

If adding a backend:
```tsx
// Use React cache
import { cache } from 'react';

const getProjects = cache(async () => {
  // Fetch logic here
});
```

### 6. Streaming for Slow Components

```tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <SlowComponent />
    </Suspense>
  );
}
```

## Performance Testing

### Local Testing

```bash
# Build for production
npm run build

# Start production server
npm start

# Open in browser and test
open http://localhost:3000
```

### Lighthouse Audit

1. Open Chrome DevTools
2. Navigate to "Lighthouse" tab
3. Select "Mobile" and all categories
4. Click "Analyze page load"

Or use CLI:
```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

### Real-World Testing

Use these tools:
- [WebPageTest](https://www.webpagetest.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)

### Bundle Analysis

Analyze what's in your bundles:

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.ts:
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Analyze
ANALYZE=true npm run build
```

## Performance Monitoring

### Vercel Analytics (Recommended)

Add to your project:
```bash
npm install @vercel/analytics
```

In `layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Google Analytics

```tsx
// lib/analytics.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
```

## Advanced Optimizations

### 1. HTTP/2 Server Push (Automatic with Vercel)

### 2. Resource Hints
```tsx
// In layout.tsx
<head>
  <link rel="preconnect" href="https://images.unsplash.com" />
  <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
</head>
```

### 3. Caching Strategy

Vercel automatically handles caching:
- Static assets: Cached for 1 year
- Pages: Revalidated on deployment
- API routes: Configurable per route

### 4. Reduce Third-Party Scripts

Minimize external scripts:
- Self-host fonts ✅ (already implemented)
- Use native analytics when possible
- Lazy load non-critical scripts

### 5. Service Worker (Optional)

For offline support:
```bash
npm install next-pwa
```

## Performance Checklist

Before going live:

- [ ] Run Lighthouse audit (aim for 95+ on all metrics)
- [ ] Test on slow 3G connection
- [ ] Test on mobile devices
- [ ] Optimize all images
- [ ] Remove console.logs and debug code
- [ ] Enable compression (automatic on Vercel)
- [ ] Set up monitoring
- [ ] Test Core Web Vitals
- [ ] Verify all pages load in < 3 seconds
- [ ] Check bundle sizes

## Common Performance Issues

### Issue: Large JavaScript bundles
**Solution**: Use dynamic imports, remove unused dependencies

### Issue: Slow image loading
**Solution**: Optimize images, use `priority` prop for above-fold images

### Issue: Layout shift (CLS)
**Solution**: Always specify image dimensions, reserve space for dynamic content

### Issue: Slow animations
**Solution**: Use transform and opacity only, enable GPU acceleration

## Resources

- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights)
- [React Performance](https://react.dev/learn/render-and-commit)

## Monitoring Dashboard

After deployment, monitor these metrics:
1. Average page load time
2. Core Web Vitals (LCP, FID, CLS)
3. Time to First Byte (TTFB)
4. Total Blocking Time (TBT)
5. Error rate
6. Traffic sources
7. Most visited pages

Set up alerts for:
- Page load time > 3 seconds
- Error rate > 1%
- LCP > 2.5 seconds

