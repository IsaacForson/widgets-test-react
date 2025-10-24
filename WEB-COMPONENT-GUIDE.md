# 🤖 Chatbot Wizard Web Component

A framework-agnostic Web Component that embeds the Chatbot Wizard into any application (Angular, Vue, Svelte, or vanilla HTML).

---

## 📦 What's Included

After building, you'll have:
- `dist/chatbot-wizard.js` - The main JavaScript bundle (~592 KB)
- `dist/chatbot-wizard.css` - Stylesheet (~3 KB)
- `dist/chatbot-wizard.js.map` - Source map for debugging

---

## 🚀 Quick Start

### 1. Build the Web Component

```bash
npm run build:webcomponent
```

This creates the files in the `dist/` folder.

### 2. Host the Files

Upload `chatbot-wizard.js` and `chatbot-wizard.css` to your CDN or static hosting (e.g., Netlify, Vercel, S3).

### 3. Use in Any HTML Page

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Load CSS -->
  <link rel="stylesheet" href="https://your-cdn.com/chatbot-wizard.css">
  <!-- Load JS -->
  <script src="https://your-cdn.com/chatbot-wizard.js"></script>
</head>
<body>
  <!-- Use the Web Component -->
  <chatbot-wizard></chatbot-wizard>
</body>
</html>
```

---

## 🎯 Usage Examples

### Example 1: Inline Embedding

```html
<div style="max-width: 1200px; margin: 0 auto;">
  <h1>Create Your AI Chatbot</h1>
  <chatbot-wizard></chatbot-wizard>
</div>
```

### Example 2: Modal (Click to Open)

```html
<button onclick="openWizard()">Create Chatbot</button>

<div id="modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5);">
  <div style="max-width: 1000px; margin: 50px auto; background: white; border-radius: 12px; padding: 20px;">
    <chatbot-wizard id="wizard"></chatbot-wizard>
  </div>
</div>

<script>
  function openWizard() {
    document.getElementById('modal').style.display = 'block';
    
    // Listen for events
    const wizard = document.getElementById('wizard');
    wizard.addEventListener('chatbot-complete', (e) => {
      console.log('Chatbot created!', e.detail);
      alert('Success! Chat Link: ' + e.detail.chatLink);
      document.getElementById('modal').style.display = 'none';
    });
    
    wizard.addEventListener('chatbot-close', () => {
      document.getElementById('modal').style.display = 'none';
    });
  }
</script>
```

### Example 3: Angular Integration

#### Step 1: Load the Script in `angular.json`

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "scripts": [
              "https://your-cdn.com/chatbot-wizard.js"
            ],
            "styles": [
              "https://your-cdn.com/chatbot-wizard.css"
            ]
          }
        }
      }
    }
  }
}
```

#### Step 2: Enable Custom Elements in `app.module.ts`

```typescript
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ... rest of your module
})
export class AppModule { }
```

#### Step 3: Use in Component Template

```html
<!-- your-component.component.html -->
<div *ngIf="showWizard" class="modal-overlay">
  <div class="modal-content">
    <chatbot-wizard 
      (chatbot-complete)="onChatbotComplete($event)"
      (chatbot-close)="closeWizard()">
    </chatbot-wizard>
  </div>
</div>

<button (click)="openWizard()">Open Chatbot Wizard</button>
```

#### Step 4: Handle Events in Component

```typescript
// your-component.component.ts
export class YourComponent {
  showWizard = false;

  openWizard() {
    this.showWizard = true;
  }

  closeWizard() {
    this.showWizard = false;
  }

  onChatbotComplete(event: any) {
    const { chatLink, phoneNumber } = event.detail;
    console.log('Chatbot created:', chatLink, phoneNumber);
    
    // Do something with the chatbot details
    this.showWizard = false;
  }
}
```

### Example 4: Vue Integration

```vue
<template>
  <div>
    <button @click="showWizard = true">Create Chatbot</button>
    
    <div v-if="showWizard" class="modal">
      <chatbot-wizard 
        @chatbot-complete="handleComplete"
        @chatbot-close="showWizard = false">
      </chatbot-wizard>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showWizard: false
    }
  },
  methods: {
    handleComplete(event) {
      console.log('Chatbot created:', event.detail);
      this.showWizard = false;
    }
  },
  mounted() {
    // Load the script dynamically
    const script = document.createElement('script');
    script.src = 'https://your-cdn.com/chatbot-wizard.js';
    document.head.appendChild(script);
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://your-cdn.com/chatbot-wizard.css';
    document.head.appendChild(link);
  }
}
</script>
```

---

## 📡 Events

The Web Component emits two custom events:

### `chatbot-complete`

Fired when the chatbot is successfully created.

**Event Detail:**
```typescript
{
  chatLink: string;      // URL to the chatbot interface
  phoneNumber: string;   // Phone number for voice access
}
```

**Example:**
```javascript
wizard.addEventListener('chatbot-complete', (event) => {
  const { chatLink, phoneNumber } = event.detail;
  console.log('Chatbot Link:', chatLink);
  console.log('Phone Number:', phoneNumber);
});
```

### `chatbot-close`

Fired when the user clicks the close button (X) in the top-right corner.

**Example:**
```javascript
wizard.addEventListener('chatbot-close', () => {
  console.log('User closed the wizard');
  // Hide modal, navigate away, etc.
});
```

---

## 🎨 Styling

The Web Component uses **Shadow DOM** for style isolation, which means:
- ✅ Your app's CSS won't affect the wizard
- ✅ The wizard's CSS won't leak into your app
- ❌ You can't directly style internal elements with external CSS

### Styling the Container

You can style the `<chatbot-wizard>` element itself:

```css
chatbot-wizard {
  display: block;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

---

## 📱 Responsive Design

The wizard is fully responsive and works on:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

---

## 🔧 Advanced Configuration

### Custom API Endpoint

The wizard uses the backend endpoint configured in `src/services/chatbotWizardService.ts`.

To change it, edit:
```typescript
const API_BASE_URL = "https://your-api.com";
```

Then rebuild:
```bash
npm run build:webcomponent
```

---

## 🐛 Debugging

### Enable Source Maps

Source maps are included (`chatbot-wizard.js.map`) for debugging. In DevTools:
1. Open **Sources** tab
2. Find `chatbot-wizard.js`
3. Click to view original React source code

### Console Logs

The Web Component logs to console:
```
✅ Chatbot Wizard Web Component loaded successfully!
```

If you don't see this, check:
- Script is loaded correctly
- No JavaScript errors in console
- Browser supports Custom Elements (all modern browsers)

---

## 📦 Bundle Size

- **JS Bundle:** ~592 KB (minified) / ~177 KB (gzipped)
- **CSS Bundle:** ~3 KB (minified) / ~1 KB (gzipped)

**Why so large?**
- Includes React, ReactDOM, and all dependencies
- Self-contained (no external dependencies needed)
- Production-optimized and tree-shaken

---

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | 54+     |
| Firefox | 63+     |
| Safari  | 10.1+   |
| Edge    | 79+     |

All modern browsers support Custom Elements v1.

---

## 🚀 Deployment Checklist

1. ✅ Build the Web Component: `npm run build:webcomponent`
2. ✅ Upload `dist/chatbot-wizard.js` to CDN
3. ✅ Upload `dist/chatbot-wizard.css` to CDN
4. ✅ (Optional) Upload `dist/chatbot-wizard.js.map` for debugging
5. ✅ Update URLs in your app to point to CDN
6. ✅ Test in production environment

---

## 🎯 Angular-Specific Setup (Detailed)

### Option A: Load from CDN (Recommended)

**1. Add to `index.html`:**
```html
<head>
  <link rel="stylesheet" href="https://your-cdn.com/chatbot-wizard.css">
  <script src="https://your-cdn.com/chatbot-wizard.js" defer></script>
</head>
```

**2. Enable Custom Elements Schema:**
```typescript
// app.module.ts or app.config.ts (standalone)
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

**3. Use in Component:**
```html
<chatbot-wizard 
  (chatbot-complete)="handleComplete($event)"
  (chatbot-close)="closeWizard()">
</chatbot-wizard>
```

### Option B: Bundle with Angular Assets

**1. Copy files to `src/assets/`:**
```
src/
  assets/
    chatbot-wizard/
      chatbot-wizard.js
      chatbot-wizard.css
```

**2. Load in component:**
```typescript
export class YourComponent implements OnInit {
  ngOnInit() {
    this.loadChatbotWizard();
  }

  private loadChatbotWizard() {
    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/chatbot-wizard/chatbot-wizard.css';
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement('script');
    script.src = 'assets/chatbot-wizard/chatbot-wizard.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
```

---

## 💡 Tips & Best Practices

1. **Load Once:** Only load the script once per page
2. **Modal Pattern:** Best UX for embedded wizards
3. **Event Handling:** Always remove event listeners when component unmounts
4. **Error Handling:** Listen for network errors if API is unavailable
5. **Testing:** Use the `demo-webcomponent.html` for local testing

---

## 🆘 Troubleshooting

### "Custom element not defined"
- Check if script is loaded before using `<chatbot-wizard>`
- Add `defer` or load script in `<head>`

### "Cannot read property 'addEventListener' of null"
- Wait for DOM ready: `window.addEventListener('DOMContentLoaded', ...)`

### Styles not applying
- Check if CSS file is loaded
- Verify CSS URL is correct

### Events not firing in Angular
- Add `CUSTOM_ELEMENTS_SCHEMA`
- Use parentheses: `(chatbot-complete)="handler($event)"`

---

## 📞 Support

For issues or questions:
1. Check the demo: `demo-webcomponent.html`
2. Review browser console for errors
3. Verify API endpoint is accessible

---

## 🎉 You're Ready!

Your React Chatbot Wizard is now a portable Web Component that can be embedded anywhere. Deploy it once, use it everywhere! 🚀

