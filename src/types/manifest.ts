// Manifest types for dynamic page generation
export interface FieldOption {
  label: string;
  value: string;
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
  counter?: boolean;
  clearable?: boolean;
  allowSpaces?: boolean;
  caseTransform?: "lowercase" | "uppercase" | "capitalize";
  minCharsForSuggestions?: number;
}

export interface PasswordFieldConfig extends BaseFieldConfig {
  type: "password";
  showToggle?: boolean;
  showStrength?: boolean;
  showRequirements?: boolean;
  showGenerator?: boolean;
  requireLowercase?: boolean;
  requireUppercase?: boolean;
  requireNumber?: boolean;
  requireSymbol?: boolean;
}

export interface EmailFieldConfig extends BaseFieldConfig {
  type: "email";
  showDomainSuggestions?: boolean;
  lowercase?: boolean;
  trim?: boolean;
}

export interface PhoneFieldConfig extends BaseFieldConfig {
  type: "phone";
  allowCountrySelect?: boolean;
  country?: string;
  separateDialCode?: boolean;
  autoDetectCountry?: boolean;
  format?: "national" | "international";
}

export interface DateFieldConfig extends BaseFieldConfig {
  type: "date";
  mode?: "single" | "range";
  format?: string;
}

export interface NumberFieldConfig extends BaseFieldConfig {
  type: "number";
  precision?: number;
}

export interface SliderFieldConfig extends BaseFieldConfig {
  type: "slider";
  step?: number;
  prefix?: string;
  suffix?: string;
  showValueBubble?: boolean;
}

export interface RadioFieldConfig extends BaseFieldConfig {
  type: "radio";
  options: FieldOption[];
}

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: "checkbox";
  options: FieldOption[];
  minSelected?: number;
  maxSelected?: number;
}

export interface DropdownFieldConfig extends BaseFieldConfig {
  type: "dropdown";
  options: FieldOption[];
  searchable?: boolean;
  multiple?: boolean;
}

export interface TextareaFieldConfig extends BaseFieldConfig {
  type: "textarea";
  rows?: number;
  autoGrow?: boolean;
  counter?: boolean;
  clearable?: boolean;
}

export interface LocationFieldConfig extends BaseFieldConfig {
  type: "location";
  apiKey?: string;
  allowCoordinates?: boolean;
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
