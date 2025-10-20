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
  // title = "Secure Sign In",
  // subtitle = "Enter your email or phone. We'll send you a secure link to continue.",
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
      className={`${
        className || ""
      }`}
    >
      <div className="">

        {canUseEmail && canUsePhone && (
          <div className="mb-6">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-base-content/70 font-medium">
                  Choose your preferred sign-in method
                </span>
              </label>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                className={`flex-1 py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                  selectedChannel === "email"
                    ? "bg-white border-primary/30 text-primary shadow-sm"
                    : "bg-base-100 border-base-300 text-base-content/70 hover:bg-white hover:border-primary/20 hover:text-primary"
                }`}
                onClick={() => setSelectedChannel("email")}
                role="tab"
                aria-selected={selectedChannel === "email"}
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
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                Email Address
              </button>
              <button
                type="button"
                className={`flex-1 py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                  selectedChannel === "phone"
                    ? "bg-white border-primary/30 text-primary shadow-sm"
                    : "bg-base-100 border-base-300 text-base-content/70 hover:bg-white hover:border-primary/20 hover:text-primary"
                }`}
                onClick={() => setSelectedChannel("phone")}
                role="tab"
                aria-selected={selectedChannel === "phone"}
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Phone Number
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {selectedChannel === "email" && (
                <div
                  role="tabpanel"
                  className="animate-in fade-in duration-200"
                >
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-primary"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-base-content">
                          Email Authentication
                        </h3>
                        <p className="text-xs text-base-content/60">
                          We'll send a secure link to your email
                        </p>
                      </div>
                    </div>
                    <EmailInput
                      label="Email Address"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(val) => setEmail((val as string) || "")}
                      required={true}
                      clearable={true}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {selectedChannel === "phone" && (
                <div
                  role="tabpanel"
                  className="animate-in fade-in duration-200"
                >
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-primary"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-base-content">
                          SMS Authentication
                        </h3>
                        <p className="text-xs text-base-content/60">
                          We'll send a verification code via text
                        </p>
                      </div>
                    </div>
                    <PhoneInput
                      label="Phone Number"
                      placeholder="(555) 555-5555"
                      value={phoneE164}
                      onChange={(e164) => setPhoneE164(e164 || "")}
                      format="e164"
                      clearable={true}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {(!canUseEmail || !canUsePhone) && (
          <>
            {selectedChannel === "email" && canUseEmail && (
              <EmailInput
                label="Email Address"
                placeholder="you@example.com"
                value={email}
                onChange={(val) => setEmail((val as string) || "")}
                required={true}
                clearable={true}
                className="w-full mb-4"
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
                className="w-full mb-4"
              />
            )}
          </>
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
            className={`py-3 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
              isSending
                ? "bg-primary/10 border-primary/30 text-primary/60 cursor-not-allowed"
                : "bg-white border-primary/30 text-primary hover:bg-primary/5 shadow-sm"
            }`}
            onClick={handleSend}
            disabled={isSending}
          >
            {isSending ? (
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
            {isSending ? sendingLabel : "Send Link"}
          </button>
          {onSimulateVerified && (
            <button
              type="button"
              className="py-3 px-6 inline-flex items-center gap-2 text-sm font-medium rounded-lg border bg-base-100 border-base-300 text-base-content/70 hover:bg-white hover:border-primary/20 hover:text-primary transition-all duration-200"
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
