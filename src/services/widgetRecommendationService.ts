export interface WidgetRecommendationRequest {
  userIntent: string;
  context: string;
}

export interface WidgetPage {
  pageId: string;
  pageTitle: string;
  widgetType: string;
  widgetConfig: Record<string, unknown>;
  order: number;
  manifest?: unknown;
}

export interface WidgetRecommendationResponse {
  success: boolean;
  message: string;
  pages: WidgetPage[];
  totalPages: number;
  flowDescription: string;
}

const API_BASE_URL = "http://localhost:3007";

export class WidgetRecommendationService {
  static async getRecommendations(
    request: WidgetRecommendationRequest
  ): Promise<WidgetRecommendationResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/widgets/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: WidgetRecommendationResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching widget recommendations:", error);
      throw new Error(
        "Failed to fetch widget recommendations. Please try again."
      );
    }
  }
}
