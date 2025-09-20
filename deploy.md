# GitHub Pages Deployment Guide

## Current Status
- ✅ GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- ✅ Vite config updated for GitHub Pages base path
- ✅ All changes committed locally

## Next Steps to Deploy

### Option 1: Push to Original Repository (if you have access)
```bash
git push origin main
```

### Option 2: Fork and Deploy (Recommended)
1. Go to https://github.com/pnsenthil/grand-zawiyah-connect
2. Click "Fork" to create your own copy
3. Update the remote URL:
   ```bash
   git remote set-url origin https://github.com/YOUR_USERNAME/grand-zawiyah-connect.git
   git push origin main
   ```

### Option 3: Create New Repository
1. Create a new repository on GitHub
2. Update the remote URL:
   ```bash
   git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push origin main
   ```

## Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "GitHub Actions"
5. The site will be available at: `https://YOUR_USERNAME.github.io/grand-zawiyah-connect/`

## Manual Deployment (Alternative)
If GitHub Actions doesn't work, you can deploy manually:
```bash
npm run build
# Then upload the 'dist' folder contents to GitHub Pages
```

## Troubleshooting
- Make sure the repository name matches the base path in `vite.config.ts`
- Check that GitHub Pages is enabled in repository settings
- Verify the workflow runs successfully in the "Actions" tab
