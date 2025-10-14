import type { PageManifest } from "../types/manifest";

export const contactManifest: PageManifest = {
  id: "contact",
  title: "Contact Us",
  description: "Get in touch with our team",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      helperText: "We'll use this to personalize our response",
      required: true,
      validation: {
        minLength: 2,
        maxLength: 100,
      },
      clearable: true,
      caseTransform: "title",
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      placeholder: "your.email@example.com",
      helperText: "We'll respond to this email address",
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
      helperText: "Optional - for urgent matters",
      required: false,
      allowCountrySelect: true,
      country: "US",
      format: "international",
    },
    {
      id: "subject",
      type: "dropdown",
      label: "Subject",
      placeholder: "Select a topic...",
      helperText: "Choose the topic that best describes your inquiry",
      required: true,
      options: [
        { label: "General Inquiry", value: "general" },
        { label: "Technical Support", value: "support" },
        { label: "Sales Question", value: "sales" },
        { label: "Partnership", value: "partnership" },
        { label: "Bug Report", value: "bug" },
        { label: "Feature Request", value: "feature" },
      ],
      searchable: true,
    },
    {
      id: "priority",
      type: "radio",
      label: "Priority Level",
      helperText: "How urgent is your inquiry?",
      required: true,
      options: [
        { label: "Low - General question", value: "low" },
        { label: "Medium - Need response within 24 hours", value: "medium" },
        { label: "High - Urgent issue", value: "high" },
      ],
    },
    {
      id: "message",
      type: "textarea",
      label: "Message",
      placeholder: "Please describe your inquiry in detail...",
      helperText: "Provide as much detail as possible to help us assist you",
      required: true,
      validation: {
        minLength: 10,
        maxLength: 1000,
      },
      rows: 5,
      autoGrow: true,
      counter: true,
      clearable: true,
    },
    {
      id: "newsletter",
      type: "checkbox",
      label: "Newsletter Subscription",
      helperText: "Stay updated with our latest news",
      required: false,
      options: [
        { label: "Subscribe to our monthly newsletter", value: "subscribe" },
      ],
    },
  ],
  layout: {
    type: "form",
    sections: [
      {
        id: "contact-info",
        title: "Contact Information",
        rows: [
          {
            fields: ["name", "email"],
            className: "form-row",
          },
          {
            fields: ["phone"],
          },
        ],
      },
      {
        id: "inquiry-details",
        title: "Inquiry Details",
        rows: [
          {
            fields: ["subject", "priority"],
            className: "form-row",
          },
          {
            fields: ["message"],
          },
        ],
      },
      {
        id: "preferences",
        title: "Preferences",
        rows: [
          {
            fields: ["newsletter"],
          },
        ],
      },
    ],
  },
  actions: {
    submit: {
      label: "Send Message",
      successMessage:
        "Thank you! Your message has been sent successfully. We'll get back to you soon! 📧",
      errorMessage: "Failed to send message. Please try again.",
    },
    cancel: {
      label: "← Back to Home",
      action: "redirect",
      url: "/",
    },
  },
  styling: {
    theme: "light",
    className: "contact-page",
  },
};
