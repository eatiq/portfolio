# Deployment Guide

This guide covers deploying your portfolio to various platforms.

## Vercel (Recommended)

Vercel is the recommended platform as it's optimized for Next.js.

### Deploy via Git

1. Push your code to GitHub/GitLab/Bitbucket
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will auto-detect Next.js and configure everything
6. Click "Deploy"

### Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Custom Domain

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS records as instructed
5. SSL is automatically provisioned

### Environment Variables

If you need environment variables:

1. Go to project settings in Vercel
2. Navigate to "Environment Variables"
3. Add your variables (e.g., NEXT_PUBLIC_GA_ID)
4. Redeploy for changes to take effect

## Netlify

### Deploy via Git

1. Push code to your Git provider
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Use Next.js Runtime
6. Deploy

### Deploy via CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

## Cloudflare Pages

1. Push code to GitHub/GitLab
2. Visit [pages.cloudflare.com](https://pages.cloudflare.com)
3. Create a new project
4. Connect your repository
5. Configure build settings:
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Build output directory: `.next`
6. Deploy

## AWS Amplify

1. Push code to GitHub/GitLab/Bitbucket
2. Visit [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
3. Click "New app" → "Host web app"
4. Connect your repository
5. Amplify will auto-detect Next.js
6. Deploy

## Railway

1. Visit [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway auto-detects Next.js
5. Deploy

## Self-Hosting (VPS/Docker)

### Using Node.js

```bash
# Build the project
npm run build

# Start the server
npm start
```

### Using Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

### Using PM2 (Process Manager)

```bash
# Install PM2
npm install -g pm2

# Build the project
npm run build

# Start with PM2
pm2 start npm --name "portfolio" -- start

# Save PM2 configuration
pm2 save

# Setup startup script
pm2 startup
```

## Performance Optimization

### Before Deployment Checklist

- [ ] Optimize all images (WebP/AVIF format)
- [ ] Remove console.logs from production code
- [ ] Add analytics (Google Analytics, Vercel Analytics)
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit (aim for 95+ score)
- [ ] Test all links and pages
- [ ] Verify meta tags and SEO
- [ ] Test dark mode

### Post-Deployment

1. Set up monitoring (Vercel Analytics, Google Analytics)
2. Configure custom domain
3. Enable automatic deployments from main branch
4. Set up preview deployments for pull requests
5. Monitor Core Web Vitals

## Continuous Deployment

Most platforms support automatic deployments:

1. Push to `main` branch → Production deployment
2. Push to other branches → Preview deployment
3. Open PR → Preview deployment with unique URL

## Rollback

### Vercel
Visit deployments page and click "Promote to Production" on any previous deployment.

### Netlify
Go to "Deploys" and click "Publish deploy" on any previous build.

### Git Revert
```bash
git revert HEAD
git push
```

## Monitoring

After deployment, monitor:
- Page load times
- Core Web Vitals (LCP, FID, CLS)
- Error rates
- User analytics

Use tools like:
- Vercel Analytics
- Google Analytics
- Google Search Console
- Sentry (for error tracking)

## Support

If you encounter issues:
1. Check build logs for errors
2. Verify environment variables
3. Test build locally: `npm run build && npm start`
4. Check platform-specific documentation
5. Review Next.js deployment docs

