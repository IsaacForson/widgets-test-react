// Step 1 Request/Response
export interface ChatbotStep1Request {
  userDescription: string;
}

export interface ChatbotStep1Response {
  success: boolean;
  sessionId: string;
  message: string;
  needsMoreInfo: boolean;
  questions?: string[];
}

// Step 2 Request/Response
export interface ChatbotStep2Request {
  sessionId: string;
  answers: string;
}

export interface ChatbotStep2Response {
  success: boolean;
  message: string;
  chatLink: string;
  phoneNumber: string;
}

const API_BASE_URL = "https://enhanced-experience-platform.onrender.com";
// const API_BASE_URL = "http://localhost:3007";

export class ChatbotWizardService {
  /**
   * Step 1: Submit initial user description
   * Returns sessionId and potentially follow-up questions
   */
  static async submitStep1(
    userDescription: string
  ): Promise<ChatbotStep1Response> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chatbot-wizard/step1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userDescription }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatbotStep1Response = await response.json();
      return data;
    } catch (error) {
      console.error("Error in Step 1:", error);
      throw new Error(
        "Failed to process your request. Please try again."
      );
    }
  }

  /**
   * Step 2: Submit answers and generate chatbot
   * Returns chatLink and phoneNumber
   */
  static async submitStep2(
    sessionId: string,
    answers: string
  ): Promise<ChatbotStep2Response> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chatbot-wizard/step2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, answers }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatbotStep2Response = await response.json();
      return data;
    } catch (error) {
      console.error("Error in Step 2:", error);
      throw new Error(
        "Failed to generate chatbot. Please try again."
      );
    }
  }
}

