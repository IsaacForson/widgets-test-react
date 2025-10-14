import type { PageManifest } from "../types/manifest";

export const comprehensiveTestManifest: PageManifest = {
  id: "comprehensive-test",
  title: "Comprehensive Widget Test",
  description: "Testing all widget types with their complete feature sets",
  fields: [
    // TextInput with all features
    {
      id: "advancedText",
      type: "text",
      label: "Advanced Text Input",
      placeholder: "Type something...",
      helperText: "Demonstrates advanced text features",
      required: true,
      validation: {
        minLength: 3,
        maxLength: 50,
      },
      // Character handling
      allowSpaces: true,
      trimOnBlur: true,
      collapseWhitespace: true,
      // Text transformation
      caseTransform: "title",
      // UI features
      clearable: true,
      counter: true,
      warnAt: 40,
      errorAt: 50,
      prefix: "📝",
      suffix: "✨",
      autoFocus: false,
      selectOnFocus: true,
      // Suggestions
      suggestions: ["Sample text", "Example content", "Test input"],
      suggestionsSource: "local",
      minCharsForSuggestions: 2,
      matchFrom: "start",
      showSuggestionsOnFocus: false,
      maxSuggestions: 5,
      // Styling
      size: "md",
      variant: "outlined",
      fullWidth: true,
      // Other
      debounceMs: 300,
      spellcheck: true,
      autoComplete: "on",
    },

    // PasswordInput with all features
    {
      id: "advancedPassword",
      type: "password",
      label: "Advanced Password",
      placeholder: "Create secure password",
      helperText: "Must meet all security requirements",
      required: true,
      validation: {
        minLength: 8,
      },
      // Password requirements
      requireLowercase: true,
      requireUppercase: true,
      requireNumber: true,
      requireSymbol: true,
      minCategories: 4,
      forbidRepeats: true,
      forbidSequences: true,
      forbidSpaces: true,
      // Strength meter
      showStrength: true,
      strengthLabels: ["Very Weak", "Weak", "Fair", "Good", "Strong"],
      strongThreshold: 4,
      // UI features
      showToggle: true,
      revealOnHold: false,
      showCopy: true,
      showRequirements: true,
      showGenerator: true,
      // Generator options
      generatorOptions: {
        length: 12,
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: true,
        excludeSimilar: true,
      },
      // Breach detection
      checkPwned: false, // Disabled for demo
      // Styling
      size: "md",
      variant: "outlined",
      fullWidth: true,
    },

    // EmailInput with all features
    {
      id: "advancedEmail",
      type: "email",
      label: "Advanced Email",
      placeholder: "user@domain.com",
      helperText: "Supports multiple emails and domain validation",
      required: true,
      // Multiple emails
      allowMultiple: true,
      maxEmails: 3,
      separators: ",;",
      // Domain validation
      allowedDomains: ["gmail.com", "yahoo.com", "company.com"],
      allowedTlds: ["com", "org", "net"],
      forbidPlusAddressing: false,
      // Text transformation
      trim: true,
      lowercase: true,
      lowercaseDomain: true,
      // UI features
      clearable: true,
      counter: true,
      showCopy: true,
      showGravatar: true,
      showDomainSuggestions: true,
      domainSuggestions: ["gmail.com", "yahoo.com", "outlook.com"],
      minCharsForSuggestions: 1,
      // Styling
      size: "md",
      variant: "outlined",
      fullWidth: true,
    },

    // PhoneInput with all features
    {
      id: "advancedPhone",
      type: "phone",
      label: "Advanced Phone",
      placeholder: "Enter phone number",
      helperText: "International phone with country selection",
      required: true,
      // Country selection
      country: "US",
      preferredCountries: ["US", "CA", "GB", "AU"],
      allowCountrySelect: true,
      separateDialCode: true,
      autoDetectCountry: true,
      // Formatting
      format: "international",
      // Validation
      minDigits: 7,
      maxDigits: 15,
      allowExtensions: true,
      // UI features
      clearable: true,
      showCopy: true,
      showExample: true,
      debounceMs: 300,
      // Styling
      size: "md",
      variant: "outlined",
      fullWidth: true,
    },

    // DateInput with all features
    {
      id: "advancedDate",
      type: "date",
      label: "Advanced Date",
      placeholder: "Select date range",
      helperText: "Choose your preferred date range",
      required: true,
      // Mode & formatting
      mode: "range",
      format: "MM/DD/YYYY",
      // Calendar options
      weekStartsOn: 1,
      showTodayShortcut: true,
      clearable: true,
    },

    // NumberInput with all features
    {
      id: "advancedNumber",
      type: "number",
      label: "Advanced Number (Currency)",
      placeholder: "0.00",
      helperText: "Price in USD with formatting",
      required: true,
      validation: {
        min: 0,
        max: 10000,
      },
      // Number constraints
      step: 0.01,
      precision: 2,
      allowNegative: false,
      // Formatting
      thousandSeparator: true,
      locale: "en-US",
      prefix: "$",
      suffix: " USD",
      formatOnBlur: true,
      parseOnFocus: true,
      // UI features
      clearable: true,
      showSteppers: true,
      selectOnFocus: true,
      debounceMs: 300,
      defaultValue: 99.99,
    },

    // SliderInput with all features
    {
      id: "advancedSlider",
      type: "slider",
      label: "Advanced Slider (Range)",
      helperText: "Select price range",
      required: false,
      validation: {
        min: 0,
        max: 1000,
      },
      // Mode & value
      mode: "range",
      // Range configuration
      step: 10,
      precision: 0,
      // Display
      showValueBubble: true,
      prefix: "$",
      suffix: "",
      defaultValue: [100, 500],
    },

    // RadioInput with styling
    {
      id: "advancedRadio",
      type: "radio",
      label: "Advanced Radio",
      helperText: "Choose your subscription plan",
      required: true,
      // Options
      options: [
        { label: "Basic - $9/mo", value: "basic" },
        { label: "Pro - $29/mo", value: "pro" },
        { label: "Enterprise - $99/mo", value: "enterprise" },
        { label: "Custom - Contact us", value: "custom", disabled: true },
      ],
      // Styling
      boxBackground: "#f8f9fa",
      dotColor: "#007bff",
    },

    // CheckboxInput with all features
    {
      id: "advancedCheckbox",
      type: "checkbox",
      label: "Advanced Checkbox",
      helperText: "Select your interests (min 2, max 4)",
      required: true,
      // Options
      options: [
        { label: "Web Development", value: "web" },
        { label: "Mobile Development", value: "mobile" },
        { label: "Data Science", value: "data" },
        { label: "Machine Learning", value: "ml" },
        { label: "DevOps", value: "devops" },
        { label: "UI/UX Design", value: "design" },
      ],
      // Multi-select mode
      selectAll: true,
      minSelected: 2,
      maxSelected: 4,
      // Styling
      boxBackground: "#f8f9fa",
      checkColor: "#28a745",
    },

    // DropdownInput with all features
    {
      id: "advancedDropdown",
      type: "dropdown",
      label: "Advanced Dropdown",
      placeholder: "Search and select...",
      helperText: "Searchable multi-select dropdown",
      required: true,
      // Options (local)
      options: [
        { label: "JavaScript", value: "js" },
        { label: "TypeScript", value: "ts" },
        { label: "Python", value: "py" },
        { label: "Java", value: "java" },
        { label: "C#", value: "csharp" },
        { label: "Go", value: "go" },
        { label: "Rust", value: "rust", disabled: true },
      ],
      // Search
      searchable: true,
      minCharsForSearch: 1,
      // Multi-select
      multiple: true,
      maxSelected: 3,
      // State
      clearable: true,
    },

    // TextareaInput with all features
    {
      id: "advancedTextarea",
      type: "textarea",
      label: "Advanced Textarea",
      placeholder: "Describe your project in detail...",
      helperText: "Detailed description (20-500 characters)",
      required: true,
      validation: {
        minLength: 20,
        maxLength: 500,
      },
      // Size & growth
      rows: 4,
      autoGrow: true,
      maxHeight: 200,
      // Text handling
      trimOnBlur: true,
      collapseWhitespace: true,
      // UI features
      clearable: true,
      counter: true,
      warnAt: 400,
      errorAt: 500,
      // Styling
      size: "md",
      variant: "outlined",
      fullWidth: true,
      // Other
      debounceMs: 300,
      spellcheck: true,
      autoComplete: "on",
    },

    // LocationInput with features (API key needed)
    {
      id: "advancedLocation",
      type: "location",
      label: "Advanced Location",
      placeholder: "Search for address...",
      helperText: "Google Places integration (requires API key)",
      required: false,
      // Required
      apiKey: "AIzaSyBB3OLRQbqH7E_iPrRkkechxkHiuu_5_aQ", // Demo key
      // Search configuration
      countryCodes: ["US", "CA"],
      types: ["address", "establishment"],
      allowCoordinates: true,
      includeQueryPredictions: true,
      // UI features
      clearable: true,
      debounceMs: 300,
      minCharsForSuggestions: 3,
      maxSuggestions: 5,
    },
  ],
  layout: {
    type: "form",
    sections: [
      {
        id: "text-inputs",
        title: "Text-based Inputs",
        description: "Text, password, email, and textarea inputs",
        rows: [
          {
            fields: ["advancedText"],
          },
          {
            fields: ["advancedPassword"],
          },
          {
            fields: ["advancedEmail"],
          },
          {
            fields: ["advancedTextarea"],
          },
        ],
      },
      {
        id: "specialized-inputs",
        title: "Specialized Inputs",
        description: "Phone, date, location, and number inputs",
        rows: [
          {
            fields: ["advancedPhone", "advancedDate"],
            className: "form-row",
          },
          {
            fields: ["advancedNumber"],
          },
          {
            fields: ["advancedLocation"],
          },
        ],
      },
      {
        id: "selection-inputs",
        title: "Selection Inputs",
        description: "Radio, checkbox, dropdown, and slider inputs",
        rows: [
          {
            fields: ["advancedSlider"],
          },
          {
            fields: ["advancedRadio"],
          },
          {
            fields: ["advancedCheckbox"],
          },
          {
            fields: ["advancedDropdown"],
          },
        ],
      },
    ],
  },
  actions: {
    submit: {
      label: "Test All Features",
      successMessage: "All widget features tested successfully! 🎉",
      errorMessage: "Please check all required fields.",
    },
    cancel: {
      label: "← Back to Home",
      action: "redirect",
      url: "/",
    },
  },
  styling: {
    theme: "light",
    className: "comprehensive-test-page",
  },
};
