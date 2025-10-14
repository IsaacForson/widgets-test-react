import type { PageManifest } from "../types/manifest";

export const signinManifest: PageManifest = {
  id: "signin",
  title: "Welcome Back",
  description: "Sign in to your account to continue",
  fields: [
    {
      id: "email",
      type: "email",
      label: "Email Address",
      placeholder: "you@example.com",
      helperText: "Enter the email address associated with your account",
      required: true,
      showDomainSuggestions: false,
      lowercase: true,
      trim: true,
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      helperText: "Enter your account password",
      required: true,
      validation: {
        minLength: 1,
      },
      showToggle: true,
      showStrength: false,
      showRequirements: false,
      showGenerator: false,
    },
    {
      id: "rememberMe",
      type: "checkbox",
      label: "Remember Me",
      helperText: "Keep me signed in on this device",
      options: [
        {
          label: "Remember me for 30 days",
          value: "remember",
        },
      ],
    },
  ],
  layout: {
    type: "form",
    sections: [
      {
        id: "credentials",
        rows: [
          {
            fields: ["email"],
          },
          {
            fields: ["password"],
          },
          {
            fields: ["rememberMe"],
          },
        ],
      },
    ],
  },
  actions: {
    submit: {
      label: "Sign In",
      successMessage: "Welcome back! You have been signed in successfully.",
      errorMessage:
        "Invalid credentials. Please check your email and password.",
    },
    cancel: {
      label: "← Back to Home",
      action: "redirect",
      url: "/",
    },
  },
  styling: {
    theme: "light",
    className: "signin-page",
  },
};
