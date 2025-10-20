import { useState } from "react";
import { RadioInput, TextInput, DateInput } from "halo-widgets/react";

type CoverageTier = "employee" | "employee_spouse" | "employee_family";

interface PersonNameDob {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string; // MM/DD/YYYY
}

export interface ManagedDependentsWidgetProps {
  title?: string;
  subtitle?: string;
  initialTier?: CoverageTier;
  initialSpouse?: Partial<PersonNameDob>;
  initialDependents?: Partial<PersonNameDob>[];
  onPrevious?: (data: {
    tier: CoverageTier;
    spouse?: PersonNameDob | null;
    dependents: PersonNameDob[];
  }) => void;
  onNext?: (data: {
    tier: CoverageTier;
    spouse?: PersonNameDob | null;
    dependents: PersonNameDob[];
  }) => void;
  previousLabel?: string;
  nextLabel?: string;
  className?: string;
}

export function ManagedDependentsWidget({
  // title = "Dependents",
  // subtitle = "Select coverage tier and manage dependents.",
  initialTier = "employee",
  initialSpouse,
  initialDependents,
  onPrevious,
  onNext,
  previousLabel = "Previous",
  nextLabel = "Next",
  className,
}: ManagedDependentsWidgetProps) {
  const [tier, setTier] = useState<CoverageTier>(initialTier);
  const [spouse, setSpouse] = useState<PersonNameDob>({
    firstName: initialSpouse?.firstName ?? "",
    middleName: initialSpouse?.middleName ?? "",
    lastName: initialSpouse?.lastName ?? "",
    dob: initialSpouse?.dob ?? "",
  });
  const [dependents, setDependents] = useState<PersonNameDob[]>(
    (initialDependents || []).map((d) => ({
      firstName: d.firstName ?? "",
      middleName: d.middleName ?? "",
      lastName: d.lastName ?? "",
      dob: d.dob ?? "",
    }))
  );

  const spouseRequired =
    tier === "employee_spouse" || tier === "employee_family";
  const familyAllowsDependents = tier === "employee_family";

  const addDependent = () =>
    setDependents((arr) => [
      ...arr,
      { firstName: "", middleName: "", lastName: "", dob: "" },
    ]);
  const updateDependent = (
    idx: number,
    key: keyof PersonNameDob,
    value: string
  ) =>
    setDependents((arr) =>
      arr.map((d, i) => (i === idx ? { ...d, [key]: value } : d))
    );
  const removeDependent = (idx: number) =>
    setDependents((arr) => arr.filter((_, i) => i !== idx));

  const canProceed = (() => {
    if (spouseRequired) {
      if (!spouse.firstName || !spouse.lastName || !spouse.dob) return false;
    }
    return true;
  })();

  const payload = {
    tier,
    spouse: spouseRequired ? spouse : null,
    dependents: familyAllowsDependents ? dependents : [],
  };

  return (
    <div className={`${className || ""}`}>
      <div className="">
        {/*  <h2 className="card-title text-2xl mb-2">{title}</h2>
        {subtitle && <p className="text-base-content/70 mb-6">{subtitle}</p>} */}

        <RadioInput
          label="Coverage Tier"
          options={[
            { label: "Employee Only", value: "employee" },
            { label: "Employee + Spouse", value: "employee_spouse" },
            { label: "Employee + Family", value: "employee_family" },
          ]}
          value={tier}
          onChange={(val) => setTier(val as string as CoverageTier)}
        />

        {spouseRequired && (
          <div className="mt-6">
            <div className="divider">
              <span className="text-lg font-semibold text-[#7e8aa0]">
                Spouse Details
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <TextInput
                label="First Name"
                required={true}
                value={spouse.firstName}
                onChange={(v) => setSpouse((s) => ({ ...s, firstName: v }))}
                className="w-full"
              />
              <TextInput
                label="Middle Name"
                value={spouse.middleName || ""}
                onChange={(v) => setSpouse((s) => ({ ...s, middleName: v }))}
                className="w-full"
              />
              <TextInput
                label="Last Name"
                required={true}
                value={spouse.lastName}
                onChange={(v) => setSpouse((s) => ({ ...s, lastName: v }))}
                className="w-full"
              />
              <DateInput
                label="Date of Birth"
                format="MM/DD/YYYY"
                required={true}
                value={spouse.dob}
                onChange={(v) => setSpouse((s) => ({ ...s, dob: v as string }))}
                className="w-full"
              />
            </div>
          </div>
        )}

        {familyAllowsDependents && (
          <div className="mt-8">
            <div className="divider">
              <span className="text-lg font-semibold text-[#7e8aa0]">
                Dependents
              </span>
            </div>
            <div className="flex justify-end mb-4">
              <button
                type="button"
                className="py-2 px-4 inline-flex items-center gap-2 text-sm font-medium rounded-lg border bg-base-100 border-base-300 text-base-content hover:bg-white hover:border-primary/20 hover:text-primary transition-all duration-200 focus:outline-none focus:ring-0"
                onClick={addDependent}
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Dependent
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {dependents.map((d, idx) => (
                <div
                  key={idx}
                  className="card bg-base-200 border border-base-300/50"
                >
                  <div className="card-body p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-base-content">
                        Dependent #{idx + 1}
                      </h4>
                      <button
                        type="button"
                        className="py-1 px-2 inline-flex items-center gap-1 text-xs font-medium rounded border bg-base-100 border-base-300 text-base-content hover:bg-white hover:border-primary/20 hover:text-primary transition-all duration-200 focus:outline-none"
                        onClick={() => removeDependent(idx)}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextInput
                        label="First Name"
                        required={true}
                        value={d.firstName}
                        onChange={(v) => updateDependent(idx, "firstName", v)}
                      />
                      <TextInput
                        label="Middle Name"
                        value={d.middleName || ""}
                        onChange={(v) => updateDependent(idx, "middleName", v)}
                      />
                      <TextInput
                        label="Last Name"
                        required={true}
                        value={d.lastName}
                        onChange={(v) => updateDependent(idx, "lastName", v)}
                      />
                      <DateInput
                        label="Date of Birth"
                        format="MM/DD/YYYY"
                        required={true}
                        value={d.dob}
                        onChange={(v) =>
                          updateDependent(idx, "dob", v as string)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="card-actions justify-between mt-8">
          <button
            type="button"
            className="py-3 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-lg border bg-base-100 border-base-300 text-base-content hover:bg-white hover:border-primary/20 hover:text-primary transition-all duration-200"
            onClick={() => onPrevious?.(payload)}
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
            className={`py-3 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
              !canProceed
                ? "bg-base-200 border-base-300 text-base-content/40 cursor-not-allowed"
                : "bg-white border-primary/30 text-primary hover:bg-primary/5 shadow-sm"
            }`}
            disabled={!canProceed}
            onClick={() => onNext?.(payload)}
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

export default ManagedDependentsWidget;
