# 🚀 Quick Start - Web Component

## ✅ Everything Is Ready!

Your React Chatbot Wizard is now a **self-contained Web Component** with:
- ✅ All CSS bundled (4.44 KB)
- ✅ All JavaScript bundled (202 KB)
- ✅ Tailwind CSS auto-loads from CDN
- ✅ DaisyUI auto-loads from CDN
- ✅ Works in any framework (Angular, Vue, vanilla HTML)

---

## 📦 Files to Deploy

Upload these 2 files to your CDN or hosting:

```
dist/
├── chatbot-wizard.js     # 202 KB (63 KB gzipped)
└── chatbot-wizard.css    # 4.44 KB (1.49 KB gzipped)
```

---

## 🎯 Usage (Any HTML Page)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://your-cdn.com/chatbot-wizard.css">
</head>
<body>
  <chatbot-wizard></chatbot-wizard>
  
  <script src="https://your-cdn.com/chatbot-wizard.js"></script>
</body>
</html>
```

**That's it!** Tailwind and DaisyUI load automatically.

---

## 🅰️ Usage in Angular

### Step 1: Enable Custom Elements

```typescript
// app.module.ts or app.config.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

### Step 2: Load Files in `index.html`

```html
<head>
  <link rel="stylesheet" href="https://your-cdn.com/chatbot-wizard.css">
  <script src="https://your-cdn.com/chatbot-wizard.js" defer></script>
</head>
```

### Step 3: Use in Component

```html
<!-- your.component.html -->
<button (click)="showWizard = true">Open Wizard</button>

<div *ngIf="showWizard" class="modal-overlay" (click)="closeWizard()">
  <div class="modal-content" (click)="$event.stopPropagation()">
    <chatbot-wizard 
      (chatbot-complete)="onComplete($event)"
      (chatbot-close)="closeWizard()">
    </chatbot-wizard>
  </div>
</div>
```

```typescript
// your.component.ts
export class YourComponent {
  showWizard = false;

  closeWizard() {
    this.showWizard = false;
  }

  onComplete(event: any) {
    const { chatLink, phoneNumber } = event.detail;
    console.log('Chatbot created!', chatLink, phoneNumber);
    this.showWizard = false;
  }
}
```

```css
/* your.component.css */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
}

.modal-content {
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  background: white;
  border-radius: 16px;
}
```

---

## 🧪 Test Locally

```bash
# Test in browser
open test-webcomponent.html

# Or serve with local server
npx http-server . -p 8080
```

Then visit: `http://localhost:8080/test-webcomponent.html`

---

## 📡 Events

### `chatbot-complete`
```typescript
{
  chatLink: string;      // e.g. "https://chat.example.com/bot-abc"
  phoneNumber: string;   // e.g. "+1 (555) 123-4567"
}
```

### `chatbot-close`
User clicked the close button (X)

---

## 📚 Full Documentation

- **`WEBCOMPONENT-SUMMARY.md`** - Complete guide
- **`TAILWIND-DAISY-INFO.md`** - CSS framework details
- **`WEB-COMPONENT-GUIDE.md`** - Full API reference
- **`README.md`** - Project overview

---

## ⚡ That's It!

Your Web Component is production-ready. Just upload the 2 files and use `<chatbot-wizard>` anywhere! 🎉

