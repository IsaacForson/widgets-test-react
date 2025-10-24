import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage";

/**
 * Web Component wrapper for the Chatbot Wizard
 *
 * Usage in any framework:
 * <chatbot-wizard></chatbot-wizard>
 *
 * Events:
 * - chatbot-complete: Fired when chatbot is successfully created
 *   detail: { chatLink: string, phoneNumber: string }
 * - chatbot-close: Fired when user wants to close the wizard
 */
class ChatbotWizardElement extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  connectedCallback() {
    // Set DaisyUI theme attribute
    this.setAttribute("data-theme", "light");

    // Mount React app directly to this element
    this.root = ReactDOM.createRoot(this);
    this.renderReactApp();
  }

  disconnectedCallback() {
    // Cleanup React when element is removed
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }

  private renderReactApp() {
    if (!this.root) return;

    // Dispatch custom events for Angular to listen to
    const handleComplete = (details: {
      chatLink: string;
      phoneNumber: string;
    }) => {
      this.dispatchEvent(
        new CustomEvent("chatbot-complete", {
          detail: details,
          bubbles: true,
          composed: true,
        })
      );
    };

    const handleClose = () => {
      this.dispatchEvent(
        new CustomEvent("chatbot-close", {
          bubbles: true,
          composed: true,
        })
      );
    };

    // Render HomePage with event handlers
    this.root.render(
      <React.StrictMode>
        <ChatbotWizardWrapper
          onComplete={handleComplete}
          onClose={handleClose}
        />
      </React.StrictMode>
    );
  }
}

// Wrapper component to inject event handlers
interface ChatbotWizardWrapperProps {
  onComplete?: (details: { chatLink: string; phoneNumber: string }) => void;
  onClose?: () => void;
}

const ChatbotWizardWrapper: React.FC<ChatbotWizardWrapperProps> = () => {
  return <HomePage />;
};

// Define the custom element
if (!customElements.get("chatbot-wizard")) {
  customElements.define("chatbot-wizard", ChatbotWizardElement);
}

export default ChatbotWizardElement;
