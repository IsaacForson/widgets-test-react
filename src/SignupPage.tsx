import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  EmailInput,
  PhoneInput,
  DateInput,
  NumberInput,
  RadioInput,
  CheckboxInput,
  TextareaInput,
} from "halo-widgets/react";
import "./SignupPage.css";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  birthDate: string;
  age: number;
  gender: string;
  interests: string[];
  bio: string;
  termsAccepted: boolean;
}

function SignupPage() {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthDate: "",
    age: 18,
    gender: "",
    interests: [],
    bio: "",
    termsAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (
    field: keyof SignupFormData,
    value: string | number | string[] | boolean | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitMessage("Account created successfully! Welcome aboard! 🎉");
      setIsSubmitting(false);
    }, 2000);
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword &&
      formData.phone &&
      formData.birthDate &&
      formData.gender &&
      formData.interests.length > 0 &&
      formData.termsAccepted
    );
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <header className="signup-header">
          <h1>Create Your Account</h1>
          <p>Join our community and start your journey with us</p>
        </header>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-section">
            <h2>Personal Information</h2>

            <div className="form-row">
              <div className="form-field">
                <TextInput
                  label="First Name"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(val) => handleInputChange("firstName", val)}
                  required={true}
                  minLength={2}
                  maxLength={50}
                  clearable={true}
                />
              </div>

              <div className="form-field">
                <TextInput
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(val) => handleInputChange("lastName", val)}
                  required={true}
                  minLength={2}
                  maxLength={50}
                  clearable={true}
                />
              </div>
            </div>

            <div className="form-field">
              <EmailInput
                label="Email Address"
                placeholder="you@example.com"
                helperText="We'll use this to send you important updates"
                value={formData.email}
                onChange={(val) => handleInputChange("email", val)}
                required={true}
                showDomainSuggestions={true}
                lowercase={true}
                trim={true}
              />
            </div>

            <div className="form-field">
              <PhoneInput
                label="Phone Number"
                placeholder="Enter your phone number"
                helperText="For account verification and important notifications"
                value={formData.phone}
                onChange={(val) => handleInputChange("phone", val)}
                required={true}
                allowCountrySelect={true}
                country="US"
                separateDialCode={true}
                autoDetectCountry={true}
                format="international"
              />
            </div>

            <div className="form-row">
              <div className="form-field">
                <DateInput
                  label="Birth Date"
                  placeholder="Select your birth date"
                  helperText="You must be at least 13 years old"
                  value={formData.birthDate}
                  onChange={(val) => handleInputChange("birthDate", val || "")}
                  required={true}
                  mode="single"
                  format="MM/DD/YYYY"
                />
              </div>

              <div className="form-field">
                <NumberInput
                  label="Age"
                  placeholder="Your age"
                  helperText="Must be between 13 and 120"
                  value={formData.age}
                  onChange={(val) => handleInputChange("age", val || 18)}
                  min={13}
                  max={120}
                  precision={0}
                  required={true}
                />
              </div>
            </div>

            <div className="form-field">
              <RadioInput
                label="Gender"
                helperText="Select your gender identity"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Non-binary", value: "non-binary" },
                  { label: "Prefer not to say", value: "prefer-not-to-say" },
                ]}
                value={formData.gender}
                onChange={(val) => handleInputChange("gender", val)}
                required={true}
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Account Security</h2>

            <div className="form-field">
              <PasswordInput
                label="Password"
                placeholder="Create a strong password"
                helperText="Must be at least 8 characters with uppercase, lowercase, number, and symbol"
                value={formData.password}
                onChange={(val) => handleInputChange("password", val)}
                required={true}
                minLength={8}
                showToggle={true}
                showStrength={true}
                showRequirements={true}
                showGenerator={true}
                requireLowercase={true}
                requireUppercase={true}
                requireNumber={true}
                requireSymbol={true}
              />
            </div>

            <div className="form-field">
              <PasswordInput
                label="Confirm Password"
                placeholder="Re-enter your password"
                helperText="Must match your password above"
                value={formData.confirmPassword}
                onChange={(val) => handleInputChange("confirmPassword", val)}
                required={true}
                showToggle={true}
              />
            </div>
          </div>

          <div className="form-section">
            <h2>About You</h2>

            <div className="form-field">
              <CheckboxInput
                label="Interests"
                helperText="Select your areas of interest (choose at least one)"
                options={[
                  { label: "Technology", value: "technology" },
                  { label: "Design", value: "design" },
                  { label: "Business", value: "business" },
                  { label: "Science", value: "science" },
                  { label: "Arts", value: "arts" },
                  { label: "Sports", value: "sports" },
                  { label: "Travel", value: "travel" },
                  { label: "Music", value: "music" },
                ]}
                value={formData.interests}
                onChange={(vals) => handleInputChange("interests", vals)}
                required={true}
                minSelected={1}
              />
            </div>

            <div className="form-field">
              <TextareaInput
                label="Bio"
                placeholder="Tell us a bit about yourself..."
                helperText="Optional: Share your story, interests, or what you're looking for"
                value={formData.bio}
                onChange={(val) => handleInputChange("bio", val)}
                maxLength={500}
                rows={4}
                autoGrow={true}
                counter={true}
                clearable={true}
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-field">
              <CheckboxInput
                label="Terms & Conditions"
                helperText="You must accept our terms to create an account"
                options={[
                  {
                    label: "I agree to the Terms of Service and Privacy Policy",
                    value: "terms",
                  },
                ]}
                value={formData.termsAccepted ? ["terms"] : []}
                onChange={(vals) =>
                  handleInputChange("termsAccepted", vals.includes("terms"))
                }
                required={true}
                minSelected={1}
              />
            </div>
          </div>

          {submitMessage && (
            <div className="submit-message success">{submitMessage}</div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        <footer className="signup-footer">
          <p>
            Already have an account?{" "}
            <a href="#" className="login-link">
              Sign in here
            </a>
          </p>
          <p>
            <a href="/" className="back-link">
              ← Back to Widgets Demo
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default SignupPage;
