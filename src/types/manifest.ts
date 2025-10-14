// Manifest types for dynamic page generation
export interface FieldOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface BaseFieldConfig {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  defaultValue?: unknown;
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    custom?: string; // Custom validation function name
  };
}

// Specific field configurations
export interface TextFieldConfig extends BaseFieldConfig {
  type: "text";
  // Character handling
  allowedCharsRegex?: string;
  forbiddenCharsRegex?: string;
  trimOnBlur?: boolean;
  collapseWhitespace?: boolean;
  preventLeadingTrailingSpace?: boolean;
  allowSpaces?: boolean;
  // Text transformation
  caseTransform?: "none" | "lowercase" | "uppercase" | "title";
  slugify?: boolean;
  normalizeDiacritics?: boolean;
  // UI features
  clearable?: boolean;
  counter?: boolean;
  warnAt?: number;
  errorAt?: number;
  prefix?: string;
  suffix?: string;
  autoFocus?: boolean;
  selectOnFocus?: boolean;
  // Suggestions
  suggestions?: string[];
  suggestionsSource?: "local" | "api";
  suggestionsApi?: string;
  suggestionsMap?: string; // Function name as string
  minCharsForSuggestions?: number;
  matchFrom?: "start" | "any";
  showSuggestionsOnFocus?: boolean;
  maxSuggestions?: number;
  // Styling
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "outlined";
  fullWidth?: boolean;
  // Other
  debounceMs?: number;
  spellcheck?: boolean;
  autoComplete?: "on" | "off";
  invalid?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export interface PasswordFieldConfig extends BaseFieldConfig {
  type: "password";
  // Password requirements
  requireLowercase?: boolean;
  requireUppercase?: boolean;
  requireNumber?: boolean;
  requireSymbol?: boolean;
  minCategories?: number;
  forbidRepeats?: boolean;
  forbidSequences?: boolean;
  forbidSpaces?: boolean;
  forbiddenCharsRegex?: string;
  commonPasswords?: string[];
  // Strength meter
  showStrength?: boolean;
  strengthLabels?: [string, string, string, string, string];
  strongThreshold?: number;
  // UI features
  showToggle?: boolean;
  revealOnHold?: boolean;
  showCopy?: boolean;
  showRequirements?: boolean;
  showGenerator?: boolean;
  // Generator options
  generatorOptions?: {
    length?: number;
    lowercase?: boolean;
    uppercase?: boolean;
    numbers?: boolean;
    symbols?: boolean;
    excludeSimilar?: boolean;
  };
  // Breach detection
  checkPwned?: boolean;
  minLengthForPwned?: number;
  debounceMs?: number;
  // Styling
  size?: "sm" | "md" | "lg";
  variant?: "outlined" | "filled";
  fullWidth?: boolean;
  // Other
  autoComplete?: "new-password" | "current-password" | "off";
  invalid?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export interface EmailFieldConfig extends BaseFieldConfig {
  type: "email";
  // Multiple emails
  allowMultiple?: boolean;
  maxEmails?: number;
  separators?: string;
  // Domain validation
  allowedDomains?: string[];
  blockedDomains?: string[];
  allowedTlds?: string[];
  blockedTlds?: string[];
  forbidPlusAddressing?: boolean;
  // Text transformation
  trim?: boolean;
  lowercase?: boolean;
  lowercaseDomain?: boolean;
  // UI features
  clearable?: boolean;
  counter?: boolean;
  showCopy?: boolean;
  showGravatar?: boolean;
  showDomainSuggestions?: boolean;
  domainSuggestions?: string[];
  minCharsForSuggestions?: number;
  // Styling
  size?: "sm" | "md" | "lg";
  variant?: "outlined" | "filled";
  fullWidth?: boolean;
  // Other
  autoComplete?: "email" | "off";
  invalid?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export interface PhoneFieldConfig extends BaseFieldConfig {
  type: "phone";
  // Country selection
  country?: string;
  preferredCountries?: string[];
  allowCountrySelect?: boolean;
  separateDialCode?: boolean;
  autoDetectCountry?: boolean;
  // Formatting
  format?: "national" | "international" | "e164";
  // Validation
  minDigits?: number;
  maxDigits?: number;
  allowExtensions?: boolean;
  // UI features
  clearable?: boolean;
  showCopy?: boolean;
  showExample?: boolean;
  debounceMs?: number;
  // Styling
  size?: "sm" | "md" | "lg";
  variant?: "outlined" | "filled";
  fullWidth?: boolean;
  // Other
  autoComplete?: string;
  invalid?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export interface DateFieldConfig extends BaseFieldConfig {
  type: "date";
  // Mode & formatting
  mode?: "single" | "range" | "month";
  format?: "YYYY-MM-DD" | "MM/DD/YYYY" | "DD/MM/YYYY";
  monthFormat?: "YYYY-MM" | "MMM YYYY";
  // Calendar options
  weekStartsOn?: 0 | 1;
  showTodayShortcut?: boolean;
  clearable?: boolean;
}

export interface NumberFieldConfig extends BaseFieldConfig {
  type: "number";
  // Number constraints
  step?: number;
  precision?: number;
  allowNegative?: boolean;
  // Formatting
  thousandSeparator?: boolean;
  locale?: string;
  prefix?: string;
  suffix?: string;
  formatOnBlur?: boolean;
  parseOnFocus?: boolean;
  // UI features
  clearable?: boolean;
  showSteppers?: boolean;
  selectOnFocus?: boolean;
  debounceMs?: number;
}

export interface SliderFieldConfig extends BaseFieldConfig {
  type: "slider";
  // Mode & value
  mode?: "single" | "range";
  // Range configuration
  step?: number;
  precision?: number;
  // Display
  showValueBubble?: boolean;
  prefix?: string;
  suffix?: string;
}

export interface RadioFieldConfig extends BaseFieldConfig {
  type: "radio";
  // Options
  options: FieldOption[];
  // Styling
  boxBackground?: string;
  dotColor?: string;
}

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: "checkbox";
  // Options
  options: FieldOption[];
  // Multi-select mode (default)
  selectAll?: boolean;
  minSelected?: number;
  maxSelected?: number;
  // Single-select mode (radio-like)
  single?: boolean;
  // Styling
  boxBackground?: string;
  checkColor?: string;
}

export interface DropdownFieldConfig extends BaseFieldConfig {
  type: "dropdown";
  // Options (local)
  options?: FieldOption[];
  // Options (API)
  optionsApi?: string;
  optionsMap?: string; // Function name as string
  // Search
  searchable?: boolean;
  minCharsForSearch?: number;
  // Multi-select
  multiple?: boolean;
  maxSelected?: number;
  // State
  clearable?: boolean;
}

export interface TextareaFieldConfig extends BaseFieldConfig {
  type: "textarea";
  // Size & growth
  rows?: number;
  autoGrow?: boolean;
  maxHeight?: number;
  // Text handling
  trimOnBlur?: boolean;
  collapseWhitespace?: boolean;
  // UI features
  clearable?: boolean;
  counter?: boolean;
  warnAt?: number;
  errorAt?: number;
  // Styling
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "outlined";
  fullWidth?: boolean;
  // Other
  debounceMs?: number;
  spellcheck?: boolean;
  autoComplete?: "on" | "off";
  invalid?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export interface LocationFieldConfig extends BaseFieldConfig {
  type: "location";
  // Required
  apiKey: string;
  // Search configuration
  countryCodes?: string[];
  types?: Array<"address" | "establishment" | "geocode">;
  allowCoordinates?: boolean;
  includeQueryPredictions?: boolean;
  // UI features
  clearable?: boolean;
  debounceMs?: number;
  minCharsForSuggestions?: number;
  maxSuggestions?: number;
}

export type FieldConfig =
  | TextFieldConfig
  | PasswordFieldConfig
  | EmailFieldConfig
  | PhoneFieldConfig
  | DateFieldConfig
  | NumberFieldConfig
  | SliderFieldConfig
  | RadioFieldConfig
  | CheckboxFieldConfig
  | DropdownFieldConfig
  | TextareaFieldConfig
  | LocationFieldConfig;

// Layout configurations
export interface LayoutRow {
  fields: string[]; // Field IDs
  className?: string;
}

export interface FormSection {
  id: string;
  title?: string;
  description?: string;
  rows: LayoutRow[];
  className?: string;
}

export interface PageLayout {
  type: "form" | "grid" | "flex";
  sections: FormSection[];
  className?: string;
}

// Page manifest structure
export interface PageManifest {
  id: string;
  title: string;
  description?: string;
  fields: FieldConfig[];
  layout: PageLayout;
  styling?: {
    theme?: "light" | "dark" | "auto";
    primaryColor?: string;
    className?: string;
  };
  actions?: {
    submit?: {
      label: string;
      endpoint?: string;
      method?: "POST" | "PUT" | "PATCH";
      successMessage?: string;
      errorMessage?: string;
    };
    cancel?: {
      label: string;
      action: "back" | "redirect";
      url?: string;
    };
  };
  validation?: {
    onSubmit?: string[]; // Custom validation function names
  };
}
