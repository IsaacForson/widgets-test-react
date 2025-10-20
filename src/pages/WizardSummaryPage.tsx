/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface WizardSummaryState {
  wizardData: any;
  pageData: Record<string, Record<string, unknown>>;
  userIntent: string;
  context: string;
}

const WizardSummaryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as WizardSummaryState;

  if (!state || !state.wizardData || !state.pageData) {
    // Redirect back to home if no data
    navigate("/");
    return null;
  }

  const { wizardData, pageData, userIntent, context } = state;

  const handleStartOver = () => {
    navigate("/");
  };

  const renderValue = (value: unknown): string => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    return String(value || "");
  };

  const formatFieldName = (key: string): string => {
    return key
      .split(/(?=[A-Z])|_|-/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            🎉 Wizard Complete!
          </h1>
          <p className="text-base-content/70 text-lg">
            Here's a summary of all the information you provided
          </p>
        </div>

        {/* Original Intent */}
        <div className="card bg-base-100 mb-6">
          <div className="card-body">
            <h2
              className="card-title text-xl mb-4"
              style={{ color: "#7e8aa0" }}
            >
              Original Request
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-base-content mb-2">
                  Context:
                </h3>
                <p className="text-base-content/80 bg-base-200 p-3 rounded-lg">
                  {context}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-base-content mb-2">
                  User Intent:
                </h3>
                <p className="text-base-content/80 bg-base-200 p-3 rounded-lg">
                  {userIntent}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wizard Flow Summary */}
        <div className="card bg-base-100 mb-6">
          <div className="card-body">
            <h2
              className="card-title text-xl mb-4"
              style={{ color: "#7e8aa0" }}
            >
              Wizard Flow Summary
            </h2>
            <div className="stats stats-vertical lg:stats-horizontal shadow">
              <div className="stat">
                <div className="stat-title">Total Pages</div>
                <div className="stat-value text-primary">
                  {wizardData.totalPages}
                </div>
                <div className="stat-desc">Steps completed</div>
              </div>
              <div className="stat">
                <div className="stat-title">Flow Type</div>
                <div className="stat-value text-2xl text-[#7e8aa0]">
                  {wizardData.message?.includes("Fallback")
                    ? "Dynamic"
                    : "Standard"}
                </div>
                <div className="stat-desc">Wizard configuration</div>
              </div>
              <div className="stat">
                <div className="stat-title">Data Collected</div>
                <div className="stat-value text-secondary">
                  {Object.keys(pageData).length}
                </div>
                <div className="stat-desc">Page responses</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Data by Page */}
        <div className="space-y-6">
          {wizardData.pages.map((page: any, index: number) => {
            const data = pageData[page.pageId] || {};
            const hasData = Object.keys(data).length > 0;

            return (
              <div key={page.pageId} className="card bg-base-100">
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="badge badge-primary badge-lg">
                      Step {page.order || index + 1}
                    </div>
                    <h3
                      className="card-title text-lg"
                      style={{ color: "#7e8aa0" }}
                    >
                      {page.pageTitle}
                    </h3>
                    <div className="badge badge-outline">
                      {page.widgetType === "custom"
                        ? "Dynamic Form"
                        : page.widgetType}
                    </div>
                  </div>

                  {hasData ? (
                    <div className="space-y-3">
                      {Object.entries(data).map(([key, value]) => (
                        <div
                          key={key}
                          className="border-l-4 border-primary/20 pl-4"
                        >
                          <h4 className="font-medium text-base-content mb-1">
                            {formatFieldName(key)}:
                          </h4>
                          <div className="text-base-content/80 bg-base-200 p-3 rounded">
                            {key === "selectedPlanIds" &&
                            Array.isArray(value) ? (
                              <div className="space-y-1">
                                {(value as string[]).map((planId, idx) => (
                                  <div
                                    key={idx}
                                    className="badge badge-primary badge-outline"
                                  >
                                    Plan: {planId}
                                  </div>
                                ))}
                              </div>
                            ) : key === "dependents" && Array.isArray(value) ? (
                              <div className="space-y-2">
                                {(value as any[]).map((dependent, idx) => (
                                  <div
                                    key={idx}
                                    className="bg-base-300 p-2 rounded"
                                  >
                                    <strong>Dependent {idx + 1}:</strong>{" "}
                                    {dependent.firstName} {dependent.lastName}
                                    {dependent.dob && (
                                      <span className="text-sm">
                                        {" "}
                                        (DOB: {dependent.dob})
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : key === "spouse" &&
                              typeof value === "object" &&
                              value !== null ? (
                              <div className="bg-base-300 p-2 rounded">
                                <strong>Spouse:</strong>{" "}
                                {(value as any).firstName}{" "}
                                {(value as any).lastName}
                                {(value as any).dob && (
                                  <span className="text-sm">
                                    {" "}
                                    (DOB: {(value as any).dob})
                                  </span>
                                )}
                              </div>
                            ) : (
                              <pre className="whitespace-pre-wrap font-sans">
                                {renderValue(value)}
                              </pre>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="text-base-content/50">
                        No data collected for this step
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="card bg-base-100 mt-8">
          <div className="card-body">
            <h2
              className="card-title text-xl mb-4"
              style={{ color: "#7e8aa0" }}
            >
              What's Next?
            </h2>
            <p className="text-base-content/70 mb-6">
              Your information has been collected successfully. You can start a
              new wizard or export this data.
            </p>
            <div className="card-actions justify-center gap-4">
              <button
                onClick={handleStartOver}
                className="py-3 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-lg border bg-base-100 border-base-300 text-base-content hover:bg-white hover:border-primary/20 hover:text-primary transition-all duration-200"
              >
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
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                Start New Wizard
              </button>
              <button
                onClick={() => {
                  const dataStr = JSON.stringify(
                    { wizardData, pageData, userIntent, context },
                    null,
                    2
                  );
                  const dataUri =
                    "data:application/json;charset=utf-8," +
                    encodeURIComponent(dataStr);
                  const exportFileDefaultName = "wizard-data.json";
                  const linkElement = document.createElement("a");
                  linkElement.setAttribute("href", dataUri);
                  linkElement.setAttribute("download", exportFileDefaultName);
                  linkElement.click();
                }}
                className="py-3 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-lg border bg-white border-primary/30 text-primary hover:bg-primary/5 shadow-sm transition-all duration-200"
              >
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardSummaryPage;
