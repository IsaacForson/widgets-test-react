import React from "react";
import "./WizardStepper.css";

export interface StepperStep {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  active?: boolean;
}

interface WizardStepperProps {
  steps: StepperStep[];
  currentStep: number;
  className?: string;
}

const WizardStepper: React.FC<WizardStepperProps> = ({
  steps,
  currentStep,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Mobile stepper - shows only current step info */}
      <div className="block md:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-base-content">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="text-sm text-base-content/70">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-bold">
              {currentStep + 1}
            </div>
            <div>
              <div className="font-medium text-base-content">
                {steps[currentStep]?.title}
              </div>
              {steps[currentStep]?.description && (
                <div className="text-sm text-base-content/70">
                  {steps[currentStep].description}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-base-300 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full stepper-progress"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Desktop stepper - shows all steps */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between mb-6">
          <div className="text-lg font-semibold text-base-content">
            Progress
          </div>
          <div className="text-sm text-base-content/70">
            {currentStep + 1} of {steps.length} completed
          </div>
        </div>

        <div className="relative">
          {/* Connection lines */}
          <div className="absolute top-4 left-4 right-4 h-0.5 bg-base-300">
            <div
              className="h-full bg-primary stepper-progress"
              style={{
                width: `${
                  (currentStep / Math.max(steps.length - 1, 1)) * 100
                }%`,
              }}
            ></div>
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              const isFuture = index > currentStep;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center group stepper-step"
                >
                  {/* Step circle */}
                  <div
                    className={`
                      relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold stepper-step
                      ${
                        isCompleted
                          ? "bg-success text-success-content shadow-lg"
                          : isActive
                          ? "bg-primary text-primary-content shadow-lg ring-4 ring-primary/20 animate-pulse-subtle"
                          : "bg-base-300 text-base-content/50"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  {/* Step label */}
                  <div className="mt-3 text-center max-w-24">
                    <div
                      className={`
                        text-xs font-medium transition-colors duration-300
                        ${
                          isCompleted || isActive
                            ? "text-base-content"
                            : "text-base-content/50"
                        }
                      `}
                    >
                      {step.title}
                    </div>
                    {step.description && (
                      <div
                        className={`
                          text-xs mt-1 transition-colors duration-300
                          ${
                            isCompleted || isActive
                              ? "text-base-content/70"
                              : "text-base-content/40"
                          }
                        `}
                      >
                        {step.description}
                      </div>
                    )}
                  </div>

                  {/* Hover effect */}
                  {!isFuture && (
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 bg-primary transition-opacity duration-200"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress percentage */}
        <div className="mt-6 flex justify-center">
          <div className="text-sm text-base-content/70">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardStepper;
