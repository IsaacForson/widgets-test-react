/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  DropdownInput,
  TextInput,
  DateInput,
  EmailInput,
  PhoneInput,
} from "halo-widgets/react";

export interface EmployerOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ProfileData {
  employer?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string; // MM/DD/YYYY
  ssn: string; // XXX-XX-XXXX
  email: string;
  phoneE164: string;
}

export interface ManagedProfileWidgetProps {
  title?: string;
  subtitle?: string;
  employers?: EmployerOption[];
  initial?: Partial<ProfileData>;
  onSave?: (profile: ProfileData) => Promise<void> | void;
  onPrevious?: () => void;
  savingLabel?: string;
  saveLabel?: string;
  className?: string;
}

const defaultEmployers: EmployerOption[] = [
  { label: "Adept HR", value: "adept" },
  { label: "Acme Corp", value: "acme" },
  { label: "Globex", value: "globex" },
];

export function ManagedProfileWidget({
  // title = "Profile Verification",
  // subtitle = "Confirm or update your profile information.",
  employers = defaultEmployers,
  initial,
  onSave,
  onPrevious,
  savingLabel = "Saving...",
  saveLabel = "Save",
  className,
}: ManagedProfileWidgetProps) {
  const [profile, setProfile] = useState<ProfileData>({
    employer: initial?.employer ?? employers[0]?.value,
    firstName: initial?.firstName ?? "",
    middleName: initial?.middleName ?? "",
    lastName: initial?.lastName ?? "",
    dob: initial?.dob ?? "",
    ssn: initial?.ssn ?? "",
    email: initial?.email ?? "",
    phoneE164: initial?.phoneE164 ?? "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const update = (k: keyof ProfileData, v: any) =>
    setProfile((p) => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      await onSave?.(profile);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={` ${className || ""}`}>
      <div className="">
        {/*  <h2 className="card-title text-2xl mb-2">{title}</h2>
        {subtitle && <p className="text-base-content/70 mb-6">{subtitle}</p>} */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <div className="md:col-span-2">
            <DropdownInput
              label="Employer"
              placeholder="Select employer"
              required={true}
              options={employers}
              value={profile.employer || ""}
              onChange={(val) => update("employer", val as string)}
              searchable={true}
              className="w-full"
            />
          </div>

          <TextInput
            label="First Name"
            required={true}
            value={profile.firstName}
            onChange={(v) => update("firstName", v)}
            className="w-full"
          />
          <TextInput
            label="Middle Name"
            value={profile.middleName || ""}
            onChange={(v) => update("middleName", v)}
            className="w-full"
          />
          <TextInput
            label="Last Name"
            required={true}
            value={profile.lastName}
            onChange={(v) => update("lastName", v)}
            className="w-full"
          />
          <DateInput
            label="Date of Birth"
            format="MM/DD/YYYY"
            required={true}
            value={profile.dob}
            onChange={(v) => update("dob", v as string)}
            className="w-full"
          />
          <TextInput
            label="Social Security Number"
            placeholder="XXX-XX-XXXX"
            required={true}
            maxLength={11}
            minLength={11}
            value={profile.ssn}
            onChange={(v) => update("ssn", v)}
            className="w-full"
          />

          <EmailInput
            label="Email Address"
            required={true}
            value={profile.email}
            onChange={(v) => update("email", v as string)}
            className="w-full"
          />
          <PhoneInput
            label="Phone Number"
            required={true}
            value={profile.phoneE164}
            onChange={(e164) => update("phoneE164", e164)}
            format="e164"
            className="w-full"
          />
        </div>

        <div className="card-actions justify-between">
          {onPrevious && (
            <button
              type="button"
              className="py-3 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-lg border bg-base-100 border-base-300 text-base-content hover:bg-white hover:border-primary/20 hover:text-primary transition-all duration-200"
              onClick={() => onPrevious()}
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
              Previous
            </button>
          )}
          <button
            type="button"
            className={`py-3 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-lg border bg-base-100 border-base-300 text-base-content hover:bg-white hover:border-primary/20 hover:text-primary transition-all duration-200 ${
              isSaving
                ? "bg-primary/10 border-primary/30 text-primary/60 cursor-not-allowed"
                : ""
            }`}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            {isSaving ? savingLabel : saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManagedProfileWidget;
