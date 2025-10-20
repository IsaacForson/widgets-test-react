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
  // title = "Address",
  // subtitle = "Enter your mailing address.",
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
      className={` ${
        className || ""
      }`}
    >
      <div className="">
      {/*   <h2 className="card-title text-2xl mb-2">{title}</h2>
        {subtitle && <p className="text-base-content/70 mb-6">{subtitle}</p>} */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <TextInput
            label="Address Line 1"
            required={true}
            value={data.address1}
            onChange={(v) => update("address1", v)}
            className="w-full md:col-span-2"
            clearable={false}
          />
          <TextInput
            label="Address Line 2"
            value={data.address2 || ""}
            onChange={(v) => update("address2", v)}
            className="w-full md:col-span-2"
            clearable={false}
          />
          <TextInput
            label="City"
            required={true}
            value={data.city}
            onChange={(v) => update("city", v)}
            className="w-full"
            clearable={false}
          />
          <DropdownInput
            label="State"
            required={true}
            options={states}
            value={data.state}
            onChange={(val) => update("state", val as string)}
            className="w-full"
            clearable={false}
          />
          <TextInput
            label="ZIP Code"
            placeholder="12345 or 12345-6789"
            required={true}
            maxLength={10}
            minLength={3}
            value={data.zip}
            onChange={(v) => update("zip", v)}
            className="w-full"
            clearable={false}
          />
        </div>

        <div className="card-actions justify-between">
          <button
            type="button"
            className="py-3 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-lg border bg-base-100 border-base-300 text-base-content hover:bg-white hover:border-primary/20 hover:text-primary transition-all duration-200"
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
            className={`py-3 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-lg border bg-base-100 border-base-300 text-base-content hover:bg-white hover:border-primary/20 hover:text-primary transition-all duration-200 ${
              !canContinue
                ? "bg-base-200 border-base-300 text-base-content/40 cursor-not-allowed"
                : ""
            }`}
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
