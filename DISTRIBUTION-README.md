# Chatbot Wizard Web Component

A fully self-contained AI-powered chatbot creation wizard that works in any framework (Angular, Vue, React, vanilla JS, etc.).

## 🚀 Quick Start

### CDN Usage (Easiest)

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Load CSS -->
  <link rel="stylesheet" href="https://your-domain.netlify.app/chatbot-wizard.css">
</head>
<body>
  <!-- Use the component -->
  <chatbot-wizard></chatbot-wizard>

  <!-- Load JS -->
  <script src="https://your-domain.netlify.app/chatbot-wizard.js"></script>
</body>
</html>
```

### NPM/Download Usage

1. Download `chatbot-wizard.js` and `chatbot-wizard.css`
2. Add them to your project
3. Load them in your HTML

## 📦 Framework Integration

### Angular

**1. Add to `angular.json`:**
```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": ["src/assets/chatbot-wizard.css"],
            "scripts": ["src/assets/chatbot-wizard.js"]
          }
        }
      }
    }
  }
}
```

**2. Add to your module:**
```typescript
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

**3. Use in template:**
```html
<chatbot-wizard 
  (chatbot-complete)="onComplete($event)">
</chatbot-wizard>
```

**4. Handle events:**
```typescript
export class AppComponent {
  onComplete(event: any) {
    const { chatLink, phoneNumber, chatbotConfig } = event.detail;
    console.log('Chatbot created!', chatLink);
  }
}
```

### Vue.js

**In your component:**
```vue
<template>
  <chatbot-wizard @chatbot-complete="onComplete"></chatbot-wizard>
</template>

<script>
export default {
  methods: {
    onComplete(event) {
      console.log('Chatbot created!', event.detail);
    }
  },
  mounted() {
    // Load the Web Component
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/chatbot-wizard.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = '/chatbot-wizard.js';
    document.head.appendChild(script);
  }
}
</script>
```

### React

```jsx
import { useEffect, useRef } from 'react';

function App() {
  const wizardRef = useRef(null);

  useEffect(() => {
    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/chatbot-wizard.css';
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement('script');
    script.src = '/chatbot-wizard.js';
    document.head.appendChild(script);

    // Listen to events
    const handleComplete = (e) => {
      console.log('Chatbot created!', e.detail);
    };

    wizardRef.current?.addEventListener('chatbot-complete', handleComplete);

    return () => {
      wizardRef.current?.removeEventListener('chatbot-complete', handleComplete);
    };
  }, []);

  return <chatbot-wizard ref={wizardRef}></chatbot-wizard>;
}
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/chatbot-wizard.css">
</head>
<body>
  <chatbot-wizard id="wizard"></chatbot-wizard>

  <script src="/chatbot-wizard.js"></script>
  <script>
    const wizard = document.getElementById('wizard');
    
    wizard.addEventListener('chatbot-complete', (event) => {
      const { chatLink, phoneNumber, chatbotConfig } = event.detail;
      console.log('Chatbot created!');
      console.log('Chat Link:', chatLink);
      console.log('Phone:', phoneNumber);
    });
  </script>
</body>
</html>
```

## 🎯 Events

### `chatbot-complete`
Fired when a chatbot is successfully created.

**Event Detail:**
```typescript
{
  chatLink: string;           // URL to the chat interface
  phoneNumber: string;        // Phone number for voice access
  chatbotConfig: {
    name: string;             // Chatbot name
    description: string;      // Chatbot description
    personality: string;      // Personality traits
    capabilities: string[];   // List of capabilities
  }
}
```

**Example:**
```javascript
wizard.addEventListener('chatbot-complete', (event) => {
  const data = event.detail;
  alert(`Chatbot created! Link: ${data.chatLink}`);
});
```

### `chatbot-close`
Fired when the user wants to close the wizard (currently only on completion).

**Example:**
```javascript
wizard.addEventListener('chatbot-close', () => {
  // Hide the wizard or navigate away
  document.getElementById('wizard').style.display = 'none';
});
```

## 🎨 Styling

The Web Component is fully styled and self-contained. It will adapt to the width of its container.

**Control size with CSS:**
```css
chatbot-wizard {
  max-width: 800px;
  margin: 0 auto;
  display: block;
}
```

**Full width:**
```css
chatbot-wizard {
  width: 100%;
}
```

## 🔧 Configuration

### Backend API
The component expects these endpoints:

**Step 1:** `POST /api/chatbot-wizard/step1`
```json
{
  "userDescription": "string"
}
```

**Response:**
```json
{
  "sessionId": "string",
  "questions": [
    {
      "id": "string",
      "question": "string",
      "type": "text" | "radio" | "checkbox"
    }
  ]
}
```

**Step 2:** `POST /api/chatbot-wizard/step2`
```json
{
  "sessionId": "string",
  "answers": "object"
}
```

**Response:**
```json
{
  "chatLink": "string",
  "phoneNumber": "string",
  "chatbotConfig": {
    "name": "string",
    "description": "string",
    "personality": "string",
    "capabilities": ["string"]
  }
}
```

### Change API Base URL
To use a different backend, you'll need to modify the source and rebuild, or use environment variables during build.

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

[Your License Here]

## 🤝 Support

For issues or questions, contact: [your-email@example.com]

