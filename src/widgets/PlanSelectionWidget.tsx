import { useMemo, useState } from "react";
import { CheckboxInput } from "halo-widgets/react";

export interface PlanItem {
  id: string;
  name: string;
  priceMonthly: number; // e.g., 125.5
  description?: string;
}

export interface PlanSelectionWidgetProps {
  title?: string;
  subtitle?: string;
  availablePlans?: PlanItem[];
  initiallySelected?: string[];
  onPrevious?: (selectedPlanIds: string[]) => void;
  onNext?: (selectedPlanIds: string[]) => void;
  previousLabel?: string;
  nextLabel?: string;
  className?: string;
}

const defaultPlans: PlanItem[] = [
  {
    id: "basic",
    name: "Basic Health Plan",
    priceMonthly: 125.5,
    description:
      "Essential coverage with lower premiums and higher deductibles",
  },
  {
    id: "premium",
    name: "Premium Health Plan",
    priceMonthly: 275.8,
    description: "Comprehensive coverage with lower deductibles and copays",
  },
  {
    id: "dental",
    name: "Dental Plan",
    priceMonthly: 45.2,
    description:
      "Complete dental coverage including cleanings, fillings, crowns",
  },
  {
    id: "vision",
    name: "Vision Plan",
    priceMonthly: 18.9,
    description: "Eye care coverage including exams, glasses, contact lenses",
  },
];

export function PlanSelectionWidget({
  // title = "Plan Selection",
  // subtitle = "Choose your desired plans.",
  availablePlans = defaultPlans,
  initiallySelected = [],
  onPrevious,
  onNext,
  previousLabel = "Previous",
  nextLabel = "Next",
  className,
}: PlanSelectionWidgetProps) {
  const [selected, setSelected] = useState<string[]>(initiallySelected);

  const options = useMemo(
    () =>
      availablePlans.map((p) => ({
        label: `${p.name} - $${p.priceMonthly.toFixed(2)}/mo`,
        value: p.id,
      })),
    [availablePlans]
  );

  const total = useMemo(
    () =>
      selected.reduce(
        (sum, id) =>
          sum + (availablePlans.find((p) => p.id === id)?.priceMonthly || 0),
        0
      ),
    [selected, availablePlans]
  );

  return (
    <div
      className={` ${
        className || ""
      }`}
    >
      <div className="">
       {/*  <h2 className="card-title text-2xl mb-2">{title}</h2>
        {subtitle && <p className="text-base-content/70 mb-6">{subtitle}</p>} */}

        <CheckboxInput
          label="Available Plans"
          options={options}
          value={selected}
          onChange={(vals) => setSelected(vals)}
          className="w-full text-base-content"
        />

        <div className="divider mb-6" />

        <div className="card bg-primary/10 border border-primary/20">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-primary">
                Total Monthly Premium
              </div>
              <div className="text-2xl font-bold text-primary">
                ${total.toFixed(2)}/mo
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-[#7e8aa0]">Plan Details</h3>
          <div className="grid grid-cols-1 gap-3">
            {availablePlans.map((p) => (
              <div
                key={p.id}
                className={`card transition-all duration-200 ${
                  selected.includes(p.id)
                    ? "bg-primary/10 border-2 border-primary/50 shadow-md"
                    : "bg-base-200 border border-base-300/50 hover:bg-base-300/50"
                }`}
              >
                <div className="card-body p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-base-content">
                        {p.name}
                      </h4>
                      {p.description && (
                        <p className="text-sm text-base-content/70 mt-1">
                          {p.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <div className="font-bold text-lg text-[#7e8aa0]">
                        ${p.priceMonthly.toFixed(2)}
                      </div>
                      <div className="text-xs text-base-content/60">
                        per month
                      </div>
                    </div>
                  </div>
                  {selected.includes(p.id) && (
                    <div className="flex items-center mt-2 text-primary">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-medium">Selected</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-actions justify-between mt-6">
          <button
            type="button"
            className="py-3 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-lg border bg-base-100 border-base-300 text-base-content hover:bg-white hover:border-primary/20 hover:text-primary transition-all duration-200"
            onClick={() => onPrevious?.(selected)}
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
            {previousLabel}
          </button>
          <button
            type="button"
            className="py-3 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-lg border bg-base-100 border-base-300 text-base-content hover:bg-white hover:border-primary/20 hover:text-primary transition-all duration-200"
            onClick={() => onNext?.(selected)}
          >
            {nextLabel}
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanSelectionWidget;
