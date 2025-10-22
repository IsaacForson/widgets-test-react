import type { PageManifest } from "../types/manifest";

export const surveyManifest: PageManifest = {
  id: "survey",
  title: "User Experience Survey",
  description: "Help us improve our platform with your feedback",
  fields: [
    {
      id: "overallSatisfaction",
      type: "slider",
      label: "Overall Satisfaction",
      helperText: "How satisfied are you with our platform overall?",
      required: true,
      validation: {
        min: 1,
        max: 10,
      },
      showValueBubble: true,
      suffix: "/10",
      defaultValue: 5,
    },
    {
      id: "features",
      type: "checkbox",
      label: "Which features do you use most?",
      helperText: "Select all that apply",
      required: true,
      minSelected: 1,
      options: [
        { label: "Dashboard", value: "dashboard" },
        { label: "Analytics", value: "analytics" },
        { label: "Reports", value: "reports" },
        { label: "User Management", value: "users" },
        { label: "Settings", value: "settings" },
        { label: "API Integration", value: "api" },
      ],
    },
    {
      id: "usageFrequency",
      type: "radio",
      label: "How often do you use our platform?",
      helperText: "Select the option that best describes your usage",
      required: true,
      options: [
        { label: "Daily", value: "daily" },
        { label: "Weekly", value: "weekly" },
        { label: "Monthly", value: "monthly" },
        { label: "Rarely", value: "rarely" },
      ],
    },
    {
      id: "improvements",
      type: "dropdown",
      label: "What area needs the most improvement?",
      placeholder: "Select an area...",
      helperText: "Choose the top priority for improvement",
      required: true,
      options: [
        { label: "User Interface", value: "ui" },
        { label: "Performance", value: "performance" },
        { label: "Documentation", value: "docs" },
        { label: "Customer Support", value: "support" },
        { label: "New Features", value: "features" },
        { label: "Mobile Experience", value: "mobile" },
      ],
      searchable: true,
    },
    {
      id: "budget",
      type: "number",
      label: "Monthly Budget",
      placeholder: "0",
      helperText:
        "What's your monthly budget for this type of service? (Optional)",
      required: false,
      validation: {
        min: 0,
        max: 10000,
      },
      prefix: "$",
      thousandSeparator: true,
      precision: 0,
    },
    {
      id: "startDate",
      type: "date",
      label: "When did you start using our platform?",
      helperText: "Approximate date is fine",
      required: false,
      mode: "range",
      format: "MM/DD/YYYY",
    },
    {
      id: "feedback",
      type: "textarea",
      label: "Additional Feedback",
      placeholder: "Share any additional thoughts, suggestions, or concerns...",
      helperText: "Your detailed feedback helps us improve (optional)",
      required: false,
      validation: {
        maxLength: 500,
      },
      rows: 4,
      autoGrow: true,
      counter: true,
    },
    {
      id: "recommend",
      type: "radio",
      label: "Would you recommend us to others?",
      helperText: "Based on your experience so far",
      required: true,
      options: [
        { label: "Definitely", value: "definitely" },
        { label: "Probably", value: "probably" },
        { label: "Not sure", value: "unsure" },
        { label: "Probably not", value: "probably_not" },
        { label: "Definitely not", value: "definitely_not" },
      ],
    },
    {
      id: "followUp",
      type: "checkbox",
      label: "Follow-up Options",
      helperText: "How would you like us to follow up? (Optional)",
      required: false,
      options: [
        { label: "Email me about platform updates", value: "updates" },
        { label: "Contact me for user interviews", value: "interviews" },
        { label: "Send me beta feature previews", value: "beta" },
      ],
    },
  ],
  layout: {
    type: "form",
    sections: [
      {
        id: "satisfaction",
        title: "Satisfaction & Usage",
        description: "Tell us about your experience",
        rows: [
          {
            fields: ["overallSatisfaction"],
          },
          {
            fields: ["usageFrequency"],
          },
          {
            fields: ["features"],
          },
        ],
      },
      {
        id: "improvements",
        title: "Improvement Areas",
        description: "Help us prioritize our roadmap",
        rows: [
          {
            fields: ["improvements"],
          },
          {
            fields: ["budget", "startDate"],
            className: "form-row",
          },
        ],
      },
      {
        id: "feedback",
        title: "Your Feedback",
        description: "Share your thoughts and recommendations",
        rows: [
          {
            fields: ["feedback"],
          },
          {
            fields: ["recommend"],
          },
          {
            fields: ["followUp"],
          },
        ],
      },
    ],
  },
  actions: {
    submit: {
      label: "Submit Survey",
      successMessage:
        "Thank you for your valuable feedback! 🙏 Your responses help us improve.",
      errorMessage: "Failed to submit survey. Please try again.",
    },
    cancel: {
      label: "← Back to Home",
      action: "redirect",
      url: "/",
    },
  },
  styling: {
    theme: "light",
    className: "survey-page",
  },
};
