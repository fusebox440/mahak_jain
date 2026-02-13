# For You — a sweet personal site

This is a simple, single-page website you can personalize for your girlfriend. It’s fast, responsive, and easy to edit—no build tools needed.

## Customize

Open `index.html` and update these parts:

- Change the hero text: replace `[Her Name]` and `[Your Name]`.
- Update the timeline dates and descriptions under the `#memories` section.
- Set your dates and gallery list in the inline `SITE_CONFIG` script near the bottom:

```html
<script>
  window.SITE_CONFIG = {
    startDate: '2024-06-01',
    nextDate: '2025-12-25',
    gallery: [
      'photo1.jpg',
      'photo2.png'
    ]
  };
</script>
```

- Add images to `assets/images/` and reference them in `SITE_CONFIG.gallery`.
- Update contact links in the `#contact` section.

## New romantic experience additions

- Cinematic intro overlay with auto music + toggle on `index.html`.
- New section: `Our Valentine’s Week` (chapter cards + modal reveal).
- New handwritten reveal block: `Letters I never said out loud`.
- Memories upgraded to floating polaroid wall + cinematic lightbox in `memories.html`.
- New camera page: `photobooth.html` (`Steal a smile 📸`).
- Secret easter egg page: `secret.html` (logo clicked 5 times).

## Cloudinary setup (for photobooth upload)

Edit `js/site-config.js` and set:

```js
cloudinary: {
  cloudName: 'YOUR_CLOUD_NAME',
  uploadPreset: 'YOUR_UNSIGNED_UPLOAD_PRESET'
}
```

The photobooth sends uploads to:

`https://api.cloudinary.com/v1_1/<cloud_name>/image/upload`

## Run locally

Just open `index.html` in your browser. For a better experience (and to avoid some browsers blocking local fonts), use a tiny static server:

```powershell
# Start a simple server in the project folder
# Option 1: PowerShell built-in
Start-Process powershell -ArgumentList "-NoProfile -Command \"cd '$PWD'; Add-Type -AssemblyName System.Net.HttpListener; $h=New-Object System.Net.HttpListener; $h.Prefixes.Add('http://localhost:8080/'); $h.Start(); Write-Host 'Serving http://localhost:8080'; while($h.IsListening){ $ctx=$h.GetContext(); $path=Join-Path $PWD ($ctx.Request.Url.LocalPath.TrimStart('/')); if([string]::IsNullOrWhiteSpace($path) -or -not (Test-Path $path)){ $path='index.html' }; $bytes=[System.IO.File]::ReadAllBytes($path); $ctx.Response.OutputStream.Write($bytes,0,$bytes.Length); $ctx.Response.Close() }\""

# Option 2: If you have Python
python -m http.server 8080
```

Then open http://localhost:8080 in your browser.

## Deploy free

- GitHub Pages
  1. Create a new repository and push these files.
  2. In repo Settings → Pages, set Source to `main` branch, root folder.
  3. Wait a minute; your site will be live at `https://<yourname>.github.io/<repo>/`.

- Netlify
  1. Drag and drop this folder onto app.netlify.com/drop.
  2. Done. You get a URL like `https://your-site.netlify.app`.

## Notes

- No external JS libraries. Fonts are loaded from Google Fonts.
- You can change colors in `css/styles.css` in the `:root` variables.
- Accessibility: semantic headings, focusable links, reduced motion friendly by default.

Enjoy surprising her! 💖
