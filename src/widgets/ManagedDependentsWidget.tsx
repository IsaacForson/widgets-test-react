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
  title = "Dependents",
  subtitle = "Select coverage tier and manage dependents.",
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
    <div className={"card bg-base-100 shadow-md " + (className || "")}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {subtitle ? <p className="text-base-content/70">{subtitle}</p> : null}

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
          <div className="mt-4">
            <div className="font-semibold mb-2">Spouse Details</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">Dependents</div>
              <button
                type="button"
                className="btn btn-sm"
                onClick={addDependent}
              >
                Add Dependent
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {dependents.map((d, idx) => (
                <div key={idx} className="border rounded-box p-4">
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
                      onChange={(v) => updateDependent(idx, "dob", v as string)}
                    />
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => removeDependent(idx)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="card-actions justify-between mt-4">
          <button
            type="button"
            className="btn"
            onClick={() => onPrevious?.(payload)}
          >
            {previousLabel}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!canProceed}
            onClick={() => onNext?.(payload)}
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManagedDependentsWidget;
