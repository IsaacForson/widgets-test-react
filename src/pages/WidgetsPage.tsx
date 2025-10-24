import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, TextareaInput } from "halo-widgets/react";
import { WidgetRecommendationService } from "../services/widgetRecommendationService";

const WidgetsPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await WidgetRecommendationService.getRecommendations({
        userIntent: prompt,
        context: title,
      });

      // Navigate to wizard page with the response data
      navigate("/wizard", {
        state: {
          wizardData: response,
          userIntent: prompt,
          context: title,
        },
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-black">Wizard Builder Prompt</h2>

            {error && (
              <div className="alert alert-error mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form className="grid gap-4" onSubmit={handleSubmit}>
              <TextInput
                label="Context"
                placeholder="Enter the context (e.g., Annual benefits enrollment with spouse and children)"
                value={title}
                onChange={(v) => setTitle(v)}
                required={true}
                className="w-full"
              />
              <TextareaInput
                label="User Prompt"
                placeholder="Describe what you want to accomplish (e.g., I want to enroll in health insurance and add my family)"
                value={prompt}
                onChange={(v) => setPrompt(v)}
                rows={6}
                required={true}
                className="w-full"
              />
              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className={`py-3 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-lg border bg-base-100 border-base-300 text-base-content/70 hover:bg-white hover:border-primary/20 hover:text-primary transition-all duration-200 ${
                    isLoading
                      ? "bg-base-200 border-base-300 text-base-content/60 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-base-content/30 border-t-base-content rounded-full animate-spin"></div>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  )}
                  {isLoading ? "Generating Please wait..." : "Generate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetsPage;
