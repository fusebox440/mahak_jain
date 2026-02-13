# 🚀 Quick Start Guide

## Setup Instructions

### 1. Install Dependencies
```powershell
npm install
```

If you encounter SWC binary errors on Windows, run:
```powershell
Remove-Item node_modules\@next\swc-win32-x64-msvc -Recurse -Force
npm install @next/swc-win32-x64-msvc --force
```

### 2. Configure Cloudinary (Optional but Recommended)

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

To get Cloudinary credentials:
1. Sign up at [cloudinary.com](https://cloudinary.com) (free tier)
2. Go to **Settings → Upload → Add upload preset**
3. Set signing mode to **"Unsigned"**
4. Copy your **cloud name** and **preset name**

### 3. Run Development Server
```powershell
npm run dev
```

The site will be available at:
- **http://localhost:3000** (or 3001 if 3000 is in use)

### 4. Access the Site

**Password**: `mahakjain15`

## 📸 Photobooth Setup

The photobooth will work immediately for local capture and download. For cloud upload functionality:

1. Configure Cloudinary as shown above
2. The photobooth automatically uploads photos with metadata
3. View uploaded photos in your Cloudinary dashboard

## 🎨 Customization Guide

### Change Password
Edit [app/page.tsx](app/page.tsx), line ~30:
```typescript
if (password === "mahakjain15") {  // Change this
```

### Update Content

- **Letters**: Edit `LETTERS` array in [app/letters/page.tsx](app/letters/page.tsx)
- **Playlist**: Edit `PLAYLIST` array in [app/playlist/page.tsx](app/playlist/page.tsx)  
- **Promises**: Edit `PROMISES` array in [app/promises/page.tsx](app/promises/page.tsx)
- **Travels**: Edit `TRAVELS` and `FUTURE_TRAVELS` in [app/travels/page.tsx](app/travels/page.tsx)
- **Story**: Edit content in [app/story/page.tsx](app/story/page.tsx)

### Add Photos to Gallery
1. Add images to `assets/images/` subfolders  
2. Update `GALLERY_DATA` in [app/memories/page.tsx](app/memories/page.tsx)

### Change Theme Colors
Edit [tailwind.config.ts](tailwind.config.ts):
```typescript
colors: {
  gold: { /* customize gold shades */ },
  dark: { /* customize dark shades */ },
}
```

## 🏗️ Build for Production

```powershell
npm run build
npm start
```

The production build will be optimized and ready for deployment.

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository in [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
- **Netlify**: Works with Next.js
- **Railway**: Supports Node.js apps
- **DigitalOcean App Platform**: Deploy from GitHub

## 🐛 Common Issues

### Port 3000 already in use
- Next.js automatically tries 3001
- Or stop other servers: `taskkill /F /IM node.exe` (Windows)

### Camera not working
- Must use HTTPS in production (localhost is exempt)
- Check browser permissions
- Ensure no other app is using camera

### Uploads failing
- Verify Cloudinary credentials in `.env.local`
- Ensure upload preset is set to "Unsigned"
- Check browser console for detailed errors

### SWC binary errors (Windows)
- Delete and reinstall: `npm install @next/swc-win32-x64-msvc --force`
- Or add to next.config.js: `swcMinify: false`

## 📚 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** -Type safety
- **TailwindCSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **WebRTC** - Camera access
- **Canvas API** - Image filter processing
- **Cloudinary** - Cloud image storage

## 🎯 Features Implemented

✅ Password-protected entry with love verification  
✅ Dark & gold professional theme  
✅ Multi-page navigation structure  
✅ Photo gallery with lightbox  
✅ **Production-ready photobooth**:
  - WebRTC camera with face/back switching
  - Smart auto-capture (face detection + smile detection)
  - Manual capture mode
  - 8 real-time canvas filters
  - Live preview with filters
  - Cloudinary upload with metadata
  - Session gallery with thumbnails
  - Download functionality
  - Countdown animations
  - Error handling & fallbacks
✅ Love letters collection  
✅ Music playlist  
✅ Personal promises  
✅ Travel memories & dreams  
✅ Floating heart animations  
✅ Fully responsive design  
✅ Smooth page transitions  

## 💖 Final Notes

This is a complete, production-ready romantic website with a professional photobooth system. All features are fully functional and optimized for performance.

The photobooth uses real computer vision techniques (frame difference analysis) for auto-capture and implements proper canvas-based image processing for filters - no external APIs or dependencies required.

**Made with love for Mahak** 💝

---

Need help? Check Next.js docs at [nextjs.org/docs](https://nextjs.org/docs)
