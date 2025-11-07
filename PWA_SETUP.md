# PWA Setup Guide for ClimateWatch

Your app is now **PWA-ready**! 🎉

## What's Been Added

### 1. Manifest File (`/public/manifest.json`)
- App name: "ClimateWatch - Climate & Public Health Monitoring"
- Short name: "ClimateWatch"
- Theme color: #0d6efd (blue)
- Background color: #ffffff (white)
- Display mode: standalone (looks like a native app)
- Icons configured for 192x192 and 512x512

### 2. Service Worker (`/public/service-worker.js`)
- Caches core files for offline access
- Network-first strategy with cache fallback
- Automatic cache updates when online
- Custom offline page

### 3. HTML Updates (`/index.html`)
- Manifest link added
- Service worker registration script
- Apple mobile web app meta tags
- Theme color meta tag

### 4. Offline Page (`/public/offline.html`)
- Beautiful offline experience
- Retry button for reconnection

## Icon Generation

The app currently uses placeholder icons. For best results with PWABuilder:

### Option 1: Use an Online Tool (Recommended)
1. Visit https://www.pwabuilder.com/imageGenerator
2. Upload your logo/icon (at least 512x512 PNG)
3. Download the generated icons
4. Replace files in `/public/icons/`

### Option 2: Manual Creation
Create PNG files with these exact names:
- `icon-192x192.png` (192x192 pixels)
- `icon-512x512.png` (512x512 pixels)

Place them in `/public/icons/`

## Testing Your PWA

### Chrome DevTools Audit
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Progressive Web App"
4. Click "Generate report"
5. Aim for 100% PWA score

### Install Prompt
1. Visit your deployed site on Chrome/Edge
2. Look for install icon in address bar
3. Click to install as app

### Mobile Testing
1. Open site on mobile browser (Chrome/Safari)
2. Tap "Add to Home Screen"
3. App should open in standalone mode

## Deploying to PWABuilder

### Step 1: Deploy Your App
Deploy to Vercel, Netlify, or your hosting platform.

Your app appears to be set up for Vercel based on `vercel.json`.

### Step 2: Generate App Packages
1. Go to https://www.pwabuilder.com/
2. Enter your deployed URL (e.g., `https://your-app.vercel.app`)
3. Click "Start"
4. Review the PWA score
5. Click "Package For Stores"
6. Download Android (APK/AAB) and iOS packages

### Step 3: Publish
- **Android**: Upload to Google Play Console
- **iOS**: Follow Apple App Store guidelines
- **Windows**: Microsoft Store

## Vercel Deployment

To deploy:
```bash
npm run build
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Troubleshooting

### Service Worker Not Registering
- Check browser console for errors
- Ensure HTTPS (required for service workers)
- Clear cache and hard reload (Ctrl+Shift+R)

### Install Prompt Not Showing
- Must be served over HTTPS
- User must visit site at least twice
- Must wait 5 minutes between visits
- Must engage with the site

### Icons Not Showing
- Verify PNG files exist in `/public/icons/`
- Check file names match manifest exactly
- Clear browser cache

## PWA Checklist

- ✅ Manifest file with required fields
- ✅ Service worker registered
- ✅ HTTPS (required for production)
- ✅ Responsive design
- ✅ Offline fallback page
- ⚠️ High-quality icons (replace placeholders)
- ⚠️ Screenshots for app stores (optional)

## Next Steps

1. **Replace placeholder icons** with your actual app icons
2. **Deploy to production** (Vercel/Netlify)
3. **Test PWA score** with Lighthouse
4. **Generate packages** with PWABuilder
5. **Submit to app stores**

## Resources

- [PWABuilder](https://www.pwabuilder.com/)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)

---

**Need help?** Check the browser console for any PWA-related warnings or errors.
