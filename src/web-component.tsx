/**
 * Entry point for Web Component build
 * This file is used to build the chatbot wizard as a standalone Web Component
 * that can be embedded in any framework (Angular, Vue, plain HTML, etc.)
 */

// Load Tailwind CSS with DaisyUI from CDN
// Using Tailwind Play CDN for proper JIT compilation
const loadExternalStyles = () => {
  // Load Tailwind Play CDN
  if (!document.querySelector('script[src*="cdn.tailwindcss.com"]')) {
    const tailwindScript = document.createElement("script");
    tailwindScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwindScript);
  }

  // Load DaisyUI
  if (!document.querySelector('link[href*="daisyui"]')) {
    const daisyUILink = document.createElement("link");
    daisyUILink.href =
      "https://cdn.jsdelivr.net/npm/daisyui@5/dist/full.min.css";
    daisyUILink.rel = "stylesheet";
    daisyUILink.type = "text/css";
    document.head.appendChild(daisyUILink);
  }
};

// Load external styles immediately
loadExternalStyles();

// Import ALL CSS files to ensure they're bundled
import "./index.css";
import "./MainApp.css";
import "./components/Button.css";
import "./components/WizardStepper.css";
import "./components/DynamicPageEngine.css";

// Import the Web Component
import "./ChatbotWizardWebComponent";

// The Web Component is now registered and ready to use
// Usage: <chatbot-wizard></chatbot-wizard>

console.log("✅ Chatbot Wizard Web Component loaded successfully!");
