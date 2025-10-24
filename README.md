# 🤖 Chatbot Wizard - React App & Web Component

An AI-powered chatbot builder that can run as:
- 🌐 **Standalone React App** (SPA)
- 📦 **Web Component** (embeddable in Angular, Vue, vanilla JS, etc.)

---

## 🚀 Quick Start

### Development Mode (React App)

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

**Option 1: Build React App**
```bash
npm run build
```
Output: `dist/` folder (SPA ready for deployment)

**Option 2: Build Web Component**
```bash
npm run build:webcomponent
```
Output: `dist/chatbot-wizard.js` + `dist/chatbot-wizard.css`

---

## 📦 Web Component Usage

After building the Web Component, you can embed it in **any framework**:

### HTML
```html
<script src="https://your-cdn.com/chatbot-wizard.js"></script>
<link rel="stylesheet" href="https://your-cdn.com/chatbot-wizard.css">

<chatbot-wizard></chatbot-wizard>
```

### Angular
```html
<chatbot-wizard 
  (chatbot-complete)="handleComplete($event)"
  (chatbot-close)="closeWizard()">
</chatbot-wizard>
```

### Vue
```vue
<chatbot-wizard 
  @chatbot-complete="handleComplete"
  @chatbot-close="closeWizard">
</chatbot-wizard>
```

**📖 Full documentation:** See [WEB-COMPONENT-GUIDE.md](./WEB-COMPONENT-GUIDE.md)

---

## 🎯 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/
│   └── HomePage.tsx     # Main chatbot wizard UI
├── services/
│   └── chatbotWizardService.ts  # API integration
├── widgets/             # Pre-built form widgets
├── ChatbotWizardWebComponent.tsx  # Web Component wrapper
└── web-component.tsx    # Web Component entry point
```

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build React app for production |
| `npm run build:webcomponent` | Build as Web Component |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🎨 Features

- ✅ **Voice Input** - Speak your chatbot description
- ✅ **AI-Powered** - Intelligent follow-up questions
- ✅ **Multi-Step Wizard** - Guided chatbot creation
- ✅ **Real-time Publishing** - Instant chatbot deployment
- ✅ **Framework Agnostic** - Use anywhere via Web Component
- ✅ **Responsive** - Works on mobile, tablet, desktop

---

## 🧪 Testing the Web Component

Open `demo-webcomponent.html` in your browser to test:
- Modal integration
- Inline embedding
- Event handling
- Event logging

---

## 🌐 Deployment

### React App
Deploy to Netlify, Vercel, or any static hosting:
```bash
npm run build
# Upload dist/ folder
```

### Web Component
1. Build: `npm run build:webcomponent`
2. Upload `dist/chatbot-wizard.js` and `dist/chatbot-wizard.css` to CDN
3. Use the URLs in your Angular/Vue/HTML app

---

## 📡 API Integration

The app connects to a backend API:

**Endpoints:**
- `POST /api/chatbot-wizard/step1` - Submit initial description
- `POST /api/chatbot-wizard/step2` - Submit answers & generate chatbot

**Configure in:** `src/services/chatbotWizardService.ts`

---

## 🔧 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Halo Widgets** - Form components
- **Web Components API** - Framework-agnostic embedding

---

## 📝 License

MIT

---

## 🎉 Ready to Use!

- 🌐 **React App:** Already deployed at https://wizardbuilder.netlify.app
- 📦 **Web Component:** Build and embed anywhere!

For Angular integration, see [WEB-COMPONENT-GUIDE.md](./WEB-COMPONENT-GUIDE.md) 🚀

