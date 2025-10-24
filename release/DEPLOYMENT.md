# Deployment Guide

## Option 1: Netlify (Recommended - Free)

### One-Click Deploy

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - **Build command:** `npm run build:webcomponent`
   - **Publish directory:** `dist`
6. Click "Deploy site"

Your files will be available at:
- `https://your-site.netlify.app/chatbot-wizard.js`
- `https://your-site.netlify.app/chatbot-wizard.css`

### CLI Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build:webcomponent

# Deploy
netlify deploy --prod --dir=dist
```

---

## Option 2: Vercel (Free)

```bash
# Install Vercel CLI
npm install -g vercel

# Build
npm run build:webcomponent

# Deploy
vercel --prod
```

**vercel.json:**
```json
{
  "buildCommand": "npm run build:webcomponent",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

---

## Option 3: AWS S3 + CloudFront (Scalable)

### 1. Build
```bash
npm run build:webcomponent
```

### 2. Upload to S3
```bash
# Create bucket
aws s3 mb s3://chatbot-wizard-cdn

# Upload files
aws s3 cp dist/ s3://chatbot-wizard-cdn/ --recursive --acl public-read

# Enable CORS
aws s3api put-bucket-cors --bucket chatbot-wizard-cdn --cors-configuration '{
  "CORSRules": [{
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET"],
    "AllowedHeaders": ["*"]
  }]
}'
```

### 3. Setup CloudFront (Optional, for CDN)
- Create CloudFront distribution
- Point to S3 bucket
- Enable HTTPS

Your files will be at:
- `https://your-bucket.s3.amazonaws.com/chatbot-wizard.js`
- Or via CloudFront: `https://d123abc.cloudfront.net/chatbot-wizard.js`

---

## Option 4: GitHub Pages (Free)

### 1. Build
```bash
npm run build:webcomponent
```

### 2. Deploy
```bash
# Install gh-pages
npm install -g gh-pages

# Deploy dist folder
gh-pages -d dist
```

Your files will be at:
- `https://username.github.io/repo-name/chatbot-wizard.js`
- `https://username.github.io/repo-name/chatbot-wizard.css`

**package.json** (add):
```json
{
  "scripts": {
    "deploy": "npm run build:webcomponent && gh-pages -d dist"
  },
  "homepage": "https://username.github.io/repo-name"
}
```

---

## Option 5: CDN.js / jsDelivr (For NPM packages)

If you publish to NPM, users can use:

```html
<!-- Via jsDelivr -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@yourscope/chatbot-wizard@latest/dist/chatbot-wizard.css">
<script src="https://cdn.jsdelivr.net/npm/@yourscope/chatbot-wizard@latest/dist/chatbot-wizard.js"></script>

<!-- Via unpkg -->
<link rel="stylesheet" href="https://unpkg.com/@yourscope/chatbot-wizard@latest/dist/chatbot-wizard.css">
<script src="https://unpkg.com/@yourscope/chatbot-wizard@latest/dist/chatbot-wizard.js"></script>
```

---

## Option 6: Self-Hosted

### Using Nginx

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /chatbot-wizard/ {
        root /var/www/chatbot-wizard;
        
        # Enable CORS
        add_header Access-Control-Allow-Origin *;
        add_header Cache-Control "public, max-age=31536000, immutable";
        
        # Gzip compression
        gzip on;
        gzip_types text/css application/javascript;
    }
}
```

### Using Apache

**.htaccess:**
```apache
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Cache-Control "public, max-age=31536000, immutable"
</IfModule>

<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/css application/javascript
</IfModule>
```

---

## Post-Deployment Checklist

- [ ] Test CORS - files load from different domains
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Verify HTTPS is working
- [ ] Check file sizes (should be ~200KB for JS, ~12KB for CSS)
- [ ] Test in Angular/Vue/React/Vanilla JS
- [ ] Update documentation with your CDN URL

---

## Versioning

Consider using version numbers in your URLs:

```
https://your-cdn.com/v1/chatbot-wizard.js
https://your-cdn.com/v1/chatbot-wizard.css
```

This allows you to:
- Roll out updates without breaking existing implementations
- Support multiple versions simultaneously
- Provide stable URLs for production use

---

## Monitoring

After deployment, monitor:
- **Usage:** Track how many times the JS/CSS files are loaded
- **Errors:** Set up error tracking (Sentry, LogRocket, etc.)
- **Performance:** Monitor load times via CDN analytics
- **CORS issues:** Check if any domains are being blocked

---

## Example: Full Netlify Deployment

```bash
# 1. Build
npm run build:webcomponent

# 2. Install Netlify CLI
npm install -g netlify-cli

# 3. Login
netlify login

# 4. Initialize (first time)
netlify init

# 5. Deploy
netlify deploy --prod

# Your URL will be something like:
# https://chatbot-wizard-abc123.netlify.app/chatbot-wizard.js
```

Update your documentation with this URL and you're done! 🎉

