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
  title = "Plan Selection",
  subtitle = "Choose your desired plans.",
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
    <div className={"card bg-base-100 shadow-md " + (className || "")}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {subtitle ? <p className="text-base-content/70">{subtitle}</p> : null}

        <CheckboxInput
          label="Available Plans"
          options={options}
          value={selected}
          onChange={(vals) => setSelected(vals)}
          className="w-full"
        />

        <div className="divider" />

        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Total Monthly Premium</div>
          <div className="text-lg">${total.toFixed(2)}/mo</div>
        </div>

        <div className="grid grid-cols-1 gap-2 mt-4">
          {availablePlans.map((p) => (
            <div
              key={p.id}
              className={
                "alert " +
                (selected.includes(p.id) ? "alert-info" : "alert-ghost")
              }
            >
              <div>
                <span className="font-medium">{p.name}</span>
                {p.description ? (
                  <span className="opacity-70"> — {p.description}</span>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="card-actions justify-between mt-2">
          <button
            type="button"
            className="btn"
            onClick={() => onPrevious?.(selected)}
          >
            {previousLabel}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNext?.(selected)}
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanSelectionWidget;
