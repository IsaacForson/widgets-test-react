/**
 * Entry point for Web Component build
 * This file is used to build the chatbot wizard as a standalone Web Component
 * that can be embedded in any framework (Angular, Vue, plain HTML, etc.)
 */

// Import ALL CSS files to ensure they're bundled
// All Tailwind and DaisyUI classes are pre-compiled in DaisyUICompiled.css
import "./components/DaisyUICompiled.css"; // Compiled DaisyUI + Tailwind classes FIRST
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
