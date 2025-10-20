import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, TextareaInput } from "halo-widgets/react";
import { WidgetRecommendationService } from "../services/widgetRecommendationService";

const HomePage: React.FC = () => {
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
      {/**
       * Original homepage content commented out (do not delete)
       */}
      {/**
      <div className="dynamic-page">
        <div className="page-container">
          <header className="page-header">
            <h1>🎨 Manifest-Driven Pages</h1>
            <p>Dynamic page generation using Halo Widgets and JSON manifests</p>
          </header>

          <div className="dynamic-form">
            <div className="form-section">
              <h2>Available Pages</h2>
              <p>
                All pages below are generated dynamically from manifest
                configurations:
              </p>

              <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
                <Link
                  to="/signup"
                  className="submit-button"
                  style={{
                    textDecoration: "none",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  📝 Signup Page
                </Link>

                <Link
                  to="/signin"
                  className="submit-button"
                  style={{
                    textDecoration: "none",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  🔐 Signin Page
                </Link>

                <Link
                  to="/contact"
                  className="submit-button"
                  style={{
                    textDecoration: "none",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  📧 Contact Form
                </Link>

                <Link
                  to="/survey"
                  className="submit-button"
                  style={{
                    textDecoration: "none",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  📊 User Survey
                </Link>
              </div>
            </div>

            <div className="form-section">
              <h2>How It Works</h2>
              <div
                style={{ textAlign: "left", color: "#4a5568", lineHeight: "1.6" }}
              >
                <p>
                  <strong>1. Pure Dynamic:</strong> No static pages exist. All
                  pages are generated dynamically from manifest configurations at
                  runtime.
                </p>

                <p>
                  <strong>2. URL-Based Loading:</strong> Simply visit /
                  {`{manifestId}`} to load any manifest. The system automatically
                  fetches and renders the page.
                </p>

                <p>
                  <strong>3. AI-Ready:</strong> External AI can generate manifests
                  and instantly create new pages without any code deployment.
                </p>

                <p>
                  <strong>4. Complete Widget Support:</strong> All Halo widgets
                  supported - text, email, phone, date, number, slider, radio,
                  checkbox, dropdown, textarea, and location inputs.
                </p>
              </div>
            </div>

            <div className="form-section">
              <h2>Benefits</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    padding: "1rem",
                    background: "#f7fafc",
                    borderRadius: "8px",
                  }}
                >
                  <h3 style={{ margin: "0 0 0.5rem", color: "#2d3748" }}>
                    🚀 No Code Duplication
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "#718096" }}>
                    One engine handles all forms
                  </p>
                </div>

                <div
                  style={{
                    padding: "1rem",
                    background: "#f7fafc",
                    borderRadius: "8px",
                  }}
                >
                  <h3 style={{ margin: "0 0 0.5rem", color: "#2d3748" }}>
                    ⚡ Dynamic Content
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "#718096" }}>
                    AI-generated pages on demand
                  </p>
                </div>

                <div
                  style={{
                    padding: "1rem",
                    background: "#f7fafc",
                    borderRadius: "8px",
                  }}
                >
                  <h3 style={{ margin: "0 0 0.5rem", color: "#2d3748" }}>
                    🎯 Type Safe
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "#718096" }}>
                    Full TypeScript support
                  </p>
                </div>

                <div
                  style={{
                    padding: "1rem",
                    background: "#f7fafc",
                    borderRadius: "8px",
                  }}
                >
                  <h3 style={{ margin: "0 0 0.5rem", color: "#2d3748" }}>
                    🎨 Consistent UX
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "#718096" }}>
                    Unified design system
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      */}

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
                  className={`py-3 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-lg border transition-all duration-200 focus:outline-none focus:ring-0 ${
                    isLoading
                      ? "bg-primary/10 border-primary/30 text-primary/60 cursor-not-allowed"
                      : "bg-white border-primary/30 text-primary hover:bg-primary/5 shadow-sm"
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Generating Please wait...
                    </>
                  ) : (
                    <>
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
                      Generate
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
