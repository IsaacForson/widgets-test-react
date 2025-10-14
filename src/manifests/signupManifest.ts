import type { PageManifest } from "../types/manifest";

export const signupManifest: PageManifest = {
  id: "signup",
  title: "Create Your Account",
  description: "Join our community and start your journey with us",
  fields: [
    {
      id: "firstName",
      type: "text",
      label: "First Name",
      placeholder: "Enter your first name",
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50,
      },
      clearable: false,
    },
    {
      id: "lastName",
      type: "text",
      label: "Last Name",
      placeholder: "Enter your last name",
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50,
      },
      clearable: true,
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      placeholder: "you@example.com",
      helperText: "We'll use this to send you important updates",
      required: true,
      showDomainSuggestions: true,
      lowercase: true,
      trim: true,
    },
    {
      id: "phone",
      type: "phone",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      helperText: "For account verification and important notifications",
      required: true,
      allowCountrySelect: true,
      country: "US",
      separateDialCode: true,
      autoDetectCountry: true,
      format: "international",
    },
    {
      id: "birthDate",
      type: "date",
      label: "Birth Date",
      placeholder: "Select your birth date",
      helperText: "You must be at least 13 years old",
      required: true,
      mode: "single",
      format: "MM/DD/YYYY",
    },
    {
      id: "age",
      type: "number",
      label: "Age",
      placeholder: "Your age",
      helperText: "Must be between 13 and 120",
      required: true,
      clearable: false,
      validation: {
        min: 13,
        max: 120,
      },
      precision: 0,
      defaultValue: 18,
    },
    {
      id: "gender",
      type: "radio",
      label: "Gender",
      helperText: "Select your gender identity",
      required: true,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Non-binary", value: "non-binary" },
        { label: "Prefer not to say", value: "prefer-not-to-say" },
      ],
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      placeholder: "Create a strong password",
      helperText:
        "Must be at least 8 characters with uppercase, lowercase, number, and symbol",
      required: true,
      validation: {
        minLength: 8,
      },
      showToggle: true,
      showStrength: true,
      showRequirements: true,
      showGenerator: true,
      requireLowercase: true,
      requireUppercase: true,
      requireNumber: true,
      requireSymbol: true,
    },
    {
      id: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "Re-enter your password",
      helperText: "Must match your password above",
      required: true,
      showToggle: true,
    },
    {
      id: "interests",
      type: "checkbox",
      label: "Interests",
      helperText: "Select your areas of interest (choose at least one)",
      required: true,
      minSelected: 1,
      options: [
        { label: "Technology", value: "technology" },
        { label: "Design", value: "design" },
        { label: "Business", value: "business" },
        { label: "Science", value: "science" },
        { label: "Arts", value: "arts" },
        { label: "Sports", value: "sports" },
        { label: "Travel", value: "travel" },
        { label: "Music", value: "music" },
      ],
    },
    {
      id: "bio",
      type: "textarea",
      label: "Bio",
      placeholder: "Tell us a bit about yourself...",
      helperText:
        "Optional: Share your story, interests, or what you're looking for",
      validation: {
        maxLength: 500,
      },
      rows: 4,
      autoGrow: true,
      counter: true,
      clearable: true,
    },
    {
      id: "termsAccepted",
      type: "checkbox",
      label: "Terms & Conditions",
      helperText: "You must accept our terms to create an account",
      required: true,
      minSelected: 1,
      options: [
        {
          label: "I agree to the Terms of Service and Privacy Policy",
          value: "terms",
        },
      ],
    },
  ],
  layout: {
    type: "form",
    sections: [
      {
        id: "personal",
        title: "Personal Information",
        rows: [
          {
            fields: ["firstName", "lastName"],
            className: "form-row",
          },
          {
            fields: ["email"],
          },
          {
            fields: ["phone"],
          },
          {
            fields: ["birthDate", "age"],
            className: "form-row",
          },
          {
            fields: ["gender"],
          },
        ],
      },
      {
        id: "security",
        title: "Account Security",
        rows: [
          {
            fields: ["password"],
          },
          {
            fields: ["confirmPassword"],
          },
        ],
      },
      {
        id: "about",
        title: "About You",
        rows: [
          {
            fields: ["interests"],
          },
          {
            fields: ["bio"],
          },
        ],
      },
      {
        id: "terms",
        rows: [
          {
            fields: ["termsAccepted"],
          },
        ],
      },
    ],
  },
  actions: {
    submit: {
      label: "Create Account",
      successMessage: "Account created successfully! Welcome aboard! 🎉",
      errorMessage: "Failed to create account. Please try again.",
    },
    cancel: {
      label: "← Back to Home",
      action: "redirect",
      url: "/",
    },
  },
  styling: {
    theme: "light",
    className: "signup-page",
  },
};
