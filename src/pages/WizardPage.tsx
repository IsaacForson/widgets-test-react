import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type {
  WidgetRecommendationResponse,
  WidgetPage,
} from "../services/widgetRecommendationService";
import type { PageManifest } from "../types/manifest";
import DynamicPageEngine from "../components/DynamicPageEngine";
import WizardStepper from "../components/WizardStepper";
import { AuthenticationWidget } from "../widgets/AuthenticationWidget";
import {
  ManagedProfileWidget,
  type ProfileData,
} from "../widgets/ManagedProfileWidget";
import { AddressWidget, type AddressData } from "../widgets/AddressWidget";
import { ManagedDependentsWidget } from "../widgets/ManagedDependentsWidget";
import { PlanSelectionWidget } from "../widgets/PlanSelectionWidget";

interface WizardState {
  wizardData: WidgetRecommendationResponse;
  userIntent: string;
  context: string;
}

// Helper function to validate if an object is a valid PageManifest
const isValidPageManifest = (obj: unknown): obj is PageManifest => {
  if (!obj || typeof obj !== "object") return false;
  const manifest = obj as Record<string, unknown>;
  return (
    typeof manifest.id === "string" &&
    typeof manifest.title === "string" &&
    Array.isArray(manifest.fields) &&
    typeof manifest.layout === "object"
  );
};

const WizardPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [wizardData, setWizardData] =
    useState<WidgetRecommendationResponse | null>(null);
  const [pageData, setPageData] = useState<
    Record<string, Record<string, unknown>>
  >({});

  useEffect(() => {
    const state = location.state as WizardState;
    if (!state || !state.wizardData) {
      // Redirect back to home if no wizard data
      navigate("/");
      return;
    }
    setWizardData(state.wizardData);
  }, [location.state, navigate]);

  if (!wizardData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  const currentPage = wizardData.pages[currentPageIndex];
  const isLastPage = currentPageIndex === wizardData.pages.length - 1;
  const isFirstPage = currentPageIndex === 0;

  const handleNext = (data: Record<string, unknown>) => {
    // Save current page data
    setPageData((prev) => ({
      ...prev,
      [currentPage.pageId]: data,
    }));

    if (isLastPage) {
      // Handle final submission
      console.log("Final wizard data:", {
        ...pageData,
        [currentPage.pageId]: data,
      });
      // You can add final submission logic here
      alert("Wizard completed successfully!");
      navigate("/");
    } else {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstPage) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const renderWidget = (page: WidgetPage) => {
    const savedData = pageData[page.pageId] || {};

    switch (page.widgetType) {
      case "AuthenticationWidget":
        return (
          <AuthenticationWidget
            title={page.pageTitle}
            onSimulateVerified={() => handleNext({})}
          />
        );
      case "ManagedProfileWidget":
        return (
          <ManagedProfileWidget
            title={page.pageTitle}
            onSave={(data: ProfileData) =>
              handleNext(data as unknown as Record<string, unknown>)
            }
            initial={savedData as Partial<ProfileData>}
          />
        );
      case "AddressWidget":
        return (
          <AddressWidget
            title={page.pageTitle}
            onContinue={(data: AddressData) =>
              handleNext(data as unknown as Record<string, unknown>)
            }
            onPrevious={() => handleBack()}
            initial={savedData as Partial<AddressData>}
          />
        );
      case "ManagedDependentsWidget":
        return (
          <ManagedDependentsWidget
            title={page.pageTitle}
            onNext={(data: Record<string, unknown>) => handleNext(data)}
            onPrevious={() => handleBack()}
            initialTier={
              savedData.tier as
                | "employee"
                | "employee_spouse"
                | "employee_family"
            }
            initialSpouse={
              savedData.spouse as {
                firstName: string;
                middleName?: string;
                lastName: string;
                dob: string;
              }
            }
            initialDependents={
              savedData.dependents as {
                firstName: string;
                middleName?: string;
                lastName: string;
                dob: string;
              }[]
            }
          />
        );
      case "PlanSelectionWidget":
        return (
          <PlanSelectionWidget
            title={page.pageTitle}
            onNext={(selectedPlanIds: string[]) =>
              handleNext({ selectedPlanIds })
            }
            onPrevious={() => handleBack()}
            initiallySelected={savedData.selectedPlanIds as string[]}
          />
        );
      case "custom":
        // Use DynamicPageEngine for custom manifests
        if (page.manifest && isValidPageManifest(page.manifest)) {
          return (
            <DynamicPageEngine
              manifest={page.manifest as PageManifest}
              onSubmit={handleNext}
              onCancel={handleCancel}
            />
          );
        }
        return (
          <div className="alert alert-error">
            Invalid custom widget configuration
          </div>
        );
      default:
        return (
          <div className="alert alert-warning">
            Unknown widget type: {page.widgetType}
          </div>
        );
    }
  };

  // Convert wizard pages to stepper steps
  const stepperSteps = wizardData.pages.map((page, index) => ({
    id: page.pageId,
    title: page.pageTitle,
    description: index < currentPageIndex ? "Completed" : undefined,
    completed: index < currentPageIndex,
    active: index === currentPageIndex,
  }));

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h5 className="text-xl font-bold text-base-content mb-2">
            {wizardData.message}
          </h5>
          <p className="text-base-content/70">
            Complete the following steps to finish your application
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <WizardStepper steps={stepperSteps} currentStep={currentPageIndex} />
        </div>

        {/* Current page content */}
        <div className="card bg-base-100 shadow-xl border border-base-300/20">
          <div className="card-body p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="card-title text-2xl text-base-content mb-2">
                  {currentPage.pageTitle}
                </h2>
                <div className="flex items-center gap-2 text-sm text-base-content/60">
                  <div className="badge badge-primary badge-sm">
                    Step {currentPageIndex + 1}
                  </div>
                  <span>•</span>
                  <span>
                    {isLastPage ? "Final step" : "Continue when ready"}
                  </span>
                </div>
              </div>
              {!isFirstPage && (
                <button
                  onClick={handleBack}
                  className="py-2 px-4 inline-flex items-center gap-2 text-sm font-medium rounded-lg border bg-base-100 border-base-300 text-base-content hover:bg-white hover:border-primary/20 hover:text-primary transition-all duration-200"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>
              )}
            </div>

            <div className="animate-in fade-in duration-300">
              {renderWidget(currentPage)}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center">
          <div className="text-sm text-base-content/70 mb-2">
            {isLastPage
              ? "🎉 Almost done! Complete the form to finish your application."
              : "📝 Fill out the form above and click continue to proceed."}
          </div>
          <div className="text-xs text-base-content/50">
            Your progress is automatically saved as you go
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardPage;
