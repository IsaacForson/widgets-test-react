import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage";
import "./index.css";

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
  private mountPoint: HTMLDivElement | null = null;

  constructor() {
    super();
    // Attach shadow DOM for style isolation
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Create mount point for React
    this.mountPoint = document.createElement("div");
    this.mountPoint.style.cssText = "width: 100%; height: 100%;";

    // Create style element to inject CSS
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = this.getAttribute("css-url") || "";

    // Append to shadow DOM
    this.shadowRoot?.appendChild(styleLink);
    this.shadowRoot?.appendChild(this.mountPoint);

    // Mount React app
    this.root = ReactDOM.createRoot(this.mountPoint);
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

const ChatbotWizardWrapper: React.FC<ChatbotWizardWrapperProps> = ({
//   onComplete,
  onClose,
}) => {
  return (
    <div style={{ position: "relative" }}>
      {/* Close button for embedding contexts */}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Close"
        >
          ×
        </button>
      )}
      <HomePage />
    </div>
  );
};

// Define the custom element
if (!customElements.get("chatbot-wizard")) {
  customElements.define("chatbot-wizard", ChatbotWizardElement);
}

export default ChatbotWizardElement;
