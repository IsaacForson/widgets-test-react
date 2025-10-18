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
    <div className={"card bg-base-100 shadow-md " + (className || "")}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {subtitle ? <p className="text-base-content/70">{subtitle}</p> : null}

        {canUseEmail && canUsePhone && (
          <div className="join my-2">
            <button
              type="button"
              className={
                "btn join-item " +
                (selectedChannel === "email" ? "btn-primary" : "btn-ghost")
              }
              onClick={() => setSelectedChannel("email")}
            >
              Email
            </button>
            <button
              type="button"
              className={
                "btn join-item " +
                (selectedChannel === "phone" ? "btn-primary" : "btn-ghost")
              }
              onClick={() => setSelectedChannel("phone")}
            >
              Phone
            </button>
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
          <div className="alert alert-success">
            <span>{sentLabel}</span>
          </div>
        )}

        <div className="card-actions justify-end mt-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSend}
            disabled={isSending}
          >
            {isSending ? sendingLabel : "Send Link"}
          </button>
          {onSimulateVerified && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => onSimulateVerified?.()}
            >
              {verifyLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthenticationWidget;
