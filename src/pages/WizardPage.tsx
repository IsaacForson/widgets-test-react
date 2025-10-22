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
  const [originalState, setOriginalState] = useState<{
    userIntent: string;
    context: string;
  } | null>(null);

  useEffect(() => {
    const state = location.state as WizardState;
    if (!state || !state.wizardData) {
      // Redirect back to home if no wizard data
      navigate("/");
      return;
    }
    setWizardData(state.wizardData);
    setOriginalState({
      userIntent: state.userIntent,
      context: state.context,
    });
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
      // Handle final submission - navigate to summary page
      const finalPageData = {
        ...pageData,
        [currentPage.pageId]: data,
      };

      navigate("/wizard/summary", {
        state: {
          wizardData,
          pageData: finalPageData,
          userIntent: originalState?.userIntent || "",
          context: originalState?.context || "",
        },
      });
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
    if (!isFirstPage) {
      handleBack();
    } else {
      navigate("/");
    }
  };

  const renderWidget = (page: WidgetPage) => {
    const savedData = pageData[page.pageId] || {};

    switch (page.widgetType) {
      case "AuthenticationWidget":
        return (
          <AuthenticationWidget
            title={page.pageTitle}
            onSimulateVerified={() => handleNext({})}
            onPrevious={!isFirstPage ? () => handleBack() : undefined}
          />
        );
      case "ManagedProfileWidget":
        return (
          <ManagedProfileWidget
            title={page.pageTitle}
            onSave={(data: ProfileData) =>
              handleNext(data as unknown as Record<string, unknown>)
            }
            onPrevious={!isFirstPage ? () => handleBack() : undefined}
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
            onPrevious={!isFirstPage ? () => handleBack() : undefined}
            initial={savedData as Partial<AddressData>}
          />
        );
      case "ManagedDependentsWidget":
        return (
          <ManagedDependentsWidget
            title={page.pageTitle}
            onNext={(data: Record<string, unknown>) => handleNext(data)}
            onPrevious={!isFirstPage ? () => handleBack() : undefined}
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
            onPrevious={!isFirstPage ? () => handleBack() : undefined}
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
              hideHeader={true}
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
        <div className="card bg-base-100  border border-base-300/20">
          <div className="card-body">
            <div className="flex justify-between items-start mb-4 border-b pb-4">
              <div className="">
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
