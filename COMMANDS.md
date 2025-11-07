# 📋 Quick Commands Reference

## Local Development & Testing

```bash
# Start development server
npm run dev

# Test PWA locally
# Then open: http://localhost:8080/test-pwa.html
```

## Build & Deploy

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to Vercel (recommended)
vercel --prod

# Or deploy to Netlify
netlify deploy --prod
```

## After Deployment

1. Copy your deployment URL (e.g., `https://your-app.vercel.app`)
2. Go to https://www.pwabuilder.com/
3. Paste your URL and click "Start"
4. Click "Package For Stores"
5. Download your mobile app packages

## Testing Checklist

- [ ] Run `npm run build` - should complete without errors
- [ ] Open `http://localhost:8080/test-pwa.html` - all tests should pass
- [ ] Check Chrome DevTools Console - should see "ServiceWorker registered"
- [ ] Run Lighthouse audit - should score high on PWA metrics
- [ ] Test install prompt on desktop browser
- [ ] Test "Add to Home Screen" on mobile

## Troubleshooting

```bash
# Clear build cache
rm -rf dist node_modules/.vite

# Reinstall dependencies
npm install

# Rebuild
npm run build
```

## Icon Generation (Optional)

If you want custom icons instead of placeholders:

1. Visit: https://www.pwabuilder.com/imageGenerator
2. Upload your logo (512x512 PNG)
3. Download generated icons
4. Replace files in `/public/icons/`:
   - `icon-192x192.png`
   - `icon-512x512.png`

## Deployment URLs

After deploying, you'll get a URL like:

- **Vercel**: `https://climatewatch-[random].vercel.app`
- **Netlify**: `https://climatewatch-[random].netlify.app`

**This is the URL you paste into PWABuilder!**

## Quick Deploy (Copy & Paste)

```bash
# One command to build and deploy
npm run build && vercel --prod
```

That's it! Your app will be live and ready for PWABuilder. 🚀
