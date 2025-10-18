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
  title = "Profile Verification",
  subtitle = "Confirm or update your profile information.",
  employers = defaultEmployers,
  initial,
  onSave,
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
    <div className={"card bg-base-100 shadow-md " + (className || "")}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {subtitle ? <p className="text-base-content/70">{subtitle}</p> : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            pattern="^\\d{3}-\\d{2}-\\d{4}$"
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

        <div className="card-actions justify-end mt-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? savingLabel : saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManagedProfileWidget;
