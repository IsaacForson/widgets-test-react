/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { TextInput, DropdownInput } from "halo-widgets/react";

export interface AddressData {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface AddressWidgetProps {
  title?: string;
  subtitle?: string;
  initial?: Partial<AddressData>;
  stateOptions?: Array<{ label: string; value: string; disabled?: boolean }>;
  onPrevious?: (data: AddressData) => void;
  onContinue?: (data: AddressData) => void;
  previousLabel?: string;
  continueLabel?: string;
  className?: string;
}

const defaultStates = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "New York", value: "NY" },
  { label: "Texas", value: "TX" },
];

export function AddressWidget({
  title = "Address",
  subtitle = "Enter your mailing address.",
  initial,
  stateOptions,
  onPrevious,
  onContinue,
  previousLabel = "Previous",
  continueLabel = "Continue",
  className,
}: AddressWidgetProps) {
  const [data, setData] = useState<AddressData>({
    address1: initial?.address1 ?? "",
    address2: initial?.address2 ?? "",
    city: initial?.city ?? "",
    state: initial?.state ?? "",
    zip: initial?.zip ?? "",
  });
  const states = useMemo(() => stateOptions || defaultStates, [stateOptions]);
  const update = (k: keyof AddressData, v: any) =>
    setData((p) => ({ ...p, [k]: v }));

  const canContinue =
    data.address1 &&
    data.city &&
    data.state &&
    /^\d{5}(-\d{4})?$/.test(data.zip);

  return (
    <div
      className={`card bg-base-100 shadow-xl border border-base-300/20 ${
        className || ""
      }`}
    >
      <div className="card-body">
        <h2 className="card-title text-2xl mb-2">{title}</h2>
        {subtitle && <p className="text-base-content/70 mb-6">{subtitle}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Address Line 1"
            required={true}
            value={data.address1}
            onChange={(v) => update("address1", v)}
            className="w-full md:col-span-2"
          />
          <TextInput
            label="Address Line 2"
            value={data.address2 || ""}
            onChange={(v) => update("address2", v)}
            className="w-full md:col-span-2"
          />
          <TextInput
            label="City"
            required={true}
            value={data.city}
            onChange={(v) => update("city", v)}
            className="w-full"
          />
          <DropdownInput
            label="State"
            required={true}
            options={states}
            value={data.state}
            onChange={(val) => update("state", val as string)}
            className="w-full"
          />
          <TextInput
            label="ZIP Code"
            placeholder="12345 or 12345-6789"
            required={true}
            pattern="^\\d{5}(-\\d{4})?$"
            value={data.zip}
            onChange={(v) => update("zip", v)}
            className="w-full"
          />
        </div>

        <div className="card-actions justify-between mt-8">
          <button
            type="button"
            className="btn btn-outline gap-2"
            onClick={() => onPrevious?.(data)}
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
            className="btn btn-primary gap-2"
            disabled={!canContinue}
            onClick={() => onContinue?.(data)}
          >
            {continueLabel}
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

export default AddressWidget;
