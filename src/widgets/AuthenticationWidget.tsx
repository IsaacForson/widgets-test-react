import { useMemo, useState } from "react";
import { EmailInput, PhoneInput } from "halo-widgets/react";

export type AuthChannel = "email" | "phone";

export interface AuthenticationWidgetProps {
  title?: string;
  subtitle?: string;
  defaultChannel?: AuthChannel;
  allowChannels?: AuthChannel[]; // e.g., ["email", "phone"]
  onSendChallenge?: (payload: {
    email?: string;
    phoneE164?: string;
  }) => Promise<void> | void;
  onSimulateVerified?: () => void;
  sendingLabel?: string;
  sentLabel?: string;
  verifyLabel?: string;
  className?: string;
}

export function AuthenticationWidget({
  title = "Secure Sign In",
  subtitle = "Enter your email or phone. We'll send you a secure link to continue.",
  defaultChannel = "email",
  allowChannels = ["email", "phone"],
  onSendChallenge,
  onSimulateVerified,
  sendingLabel = "Sending...",
  sentLabel = "Link sent. Check your inbox/messages.",
  verifyLabel = "Simulate Verified",
  className,
}: AuthenticationWidgetProps) {
  const [selectedChannel, setSelectedChannel] =
    useState<AuthChannel>(defaultChannel);
  const [email, setEmail] = useState<string>("");
  const [phoneE164, setPhoneE164] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  const canUseEmail = useMemo(
    () => allowChannels.includes("email"),
    [allowChannels]
  );
  const canUsePhone = useMemo(
    () => allowChannels.includes("phone"),
    [allowChannels]
  );

  const handleSend = async () => {
    if (isSending) return;
    setIsSending(true);
    try {
      await onSendChallenge?.({
        email: selectedChannel === "email" ? email : undefined,
        phoneE164: selectedChannel === "phone" ? phoneE164 : undefined,
      });
      setSent(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className={`card bg-base-100 shadow-xl border border-base-300/20 ${
        className || ""
      }`}
    >
      <div className="card-body">
        <h2 className="card-title text-2xl mb-2">{title}</h2>
        {subtitle && <p className="text-base-content/70 mb-4">{subtitle}</p>}

        {canUseEmail && canUsePhone && (
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">
                Choose sign-in method
              </span>
            </label>
            <div className="join w-full">
              <button
                type="button"
                className={`btn join-item flex-1 ${
                  selectedChannel === "email" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setSelectedChannel("email")}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                Email
              </button>
              <button
                type="button"
                className={`btn join-item flex-1 ${
                  selectedChannel === "phone" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setSelectedChannel("phone")}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Phone
              </button>
            </div>
          </div>
        )}

        {selectedChannel === "email" && canUseEmail && (
          <EmailInput
            label="Email Address"
            placeholder="you@example.com"
            value={email}
            onChange={(val) => setEmail((val as string) || "")}
            required={true}
            clearable={true}
            className="w-full"
          />
        )}

        {selectedChannel === "phone" && canUsePhone && (
          <PhoneInput
            label="Phone Number"
            placeholder="(555) 555-5555"
            value={phoneE164}
            onChange={(e164) => setPhoneE164(e164 || "")}
            format="e164"
            clearable={true}
            className="w-full"
          />
        )}

        {sent && (
          <div className="alert alert-success mb-4">
            <svg
              className="w-6 h-6 stroke-current shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{sentLabel}</span>
          </div>
        )}

        <div className="card-actions justify-end gap-2 mt-6">
          <button
            type="button"
            className={`btn btn-primary gap-2 ${isSending ? "loading" : ""}`}
            onClick={handleSend}
            disabled={isSending}
          >
            {!isSending && (
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
            {isSending ? sendingLabel : "Send Link"}
          </button>
          {onSimulateVerified && (
            <button
              type="button"
              className="btn btn-outline gap-2"
              onClick={() => onSimulateVerified?.()}
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {verifyLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthenticationWidget;
