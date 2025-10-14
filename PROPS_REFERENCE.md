# Halo Widgets - Complete Props Reference Guide

This document contains all available props for each widget with descriptions. All props listed here are verified from the actual TypeScript definitions.

---

## 1. TextInput

### Basic Props
- `id?: string` - HTML id attribute
- `name?: string` - HTML name attribute for forms
- `label?: string` - Label text displayed above input
- `placeholder?: string` - Placeholder text inside input
- `helperText?: string` - Helper text displayed below input

### Value Props
- `value?: string` - Controlled value
- `defaultValue?: string` - Initial value for uncontrolled mode
- `disabled?: boolean` - Disable the input
- `readOnly?: boolean` - Make input read-only
- `required?: boolean` - Mark as required field

### Validation Props
- `minLength?: number` - Minimum character length
- `maxLength?: number` - Maximum character length
- `pattern?: string` - Regex pattern for validation
- `validate?: (value: string) => string | null` - Custom validation function
- `validateOn?: "change" | "blur" | "submit"` - When to trigger validation

### Character Handling
- `allowedCharsRegex?: string` - Regex for allowed characters
- `forbiddenCharsRegex?: string` - Regex for forbidden characters
- `trimOnBlur?: boolean` - Trim whitespace on blur
- `collapseWhitespace?: boolean` - Collapse multiple spaces to one
- `preventLeadingTrailingSpace?: boolean` - Prevent spaces at start/end
- `allowSpaces?: boolean` - Allow spaces in input

### Text Transformation
- `caseTransform?: "none" | "lowercase" | "uppercase" | "title"` - Transform text case
- `slugify?: boolean` - Convert to URL-friendly slug
- `normalizeDiacritics?: boolean` - Remove accents/diacritics

### UI Features
- `clearable?: boolean` - Show clear button
- `counter?: boolean` - Show character counter
- `warnAt?: number` - Character count to show warning
- `errorAt?: number` - Character count to show error
- `prefix?: string` - Text/icon before input
- `suffix?: string` - Text/icon after input
- `autoFocus?: boolean` - Auto-focus on mount
- `selectOnFocus?: boolean` - Select all text on focus

### Suggestions
- `suggestions?: string[]` - Local suggestions array
- `suggestionsSource?: "local" | "api"` - Where suggestions come from
- `suggestionsApi?: string` - API endpoint for suggestions
- `suggestionsMap?: (response: unknown) => string[]` - Map API response
- `minCharsForSuggestions?: number` - Min chars before showing suggestions
- `matchFrom?: "start" | "any"` - How to match suggestions
- `showSuggestionsOnFocus?: boolean` - Show suggestions on focus
- `maxSuggestions?: number` - Maximum suggestions to display

### Styling
- `size?: "sm" | "md" | "lg"` - Input size
- `variant?: "default" | "filled" | "outlined"` - Visual style
- `fullWidth?: boolean` - Take full width of container
- `className?: string` - Custom CSS class

### Other
- `debounceMs?: number` - Debounce delay for onChange (default: 300)
- `spellcheck?: boolean` - Enable browser spellcheck
- `autoComplete?: "on" | "off"` - Browser autocomplete
- `invalid?: boolean` - Mark input as invalid
- `ariaLabel?: string` - Accessibility label
- `ariaDescribedBy?: string` - Accessibility description

### Event Callbacks
- `onChange?: (value: string) => void` - Value changed
- `onBlur?: (value: string) => void` - Input lost focus
- `onFocus?: (value: string) => void` - Input gained focus
- `onValidate?: (isValid: boolean, error?: string) => void` - Validation result
- `onEnter?: (value: string) => void` - Enter key pressed
- `onEscape?: () => void` - Escape key pressed
- `onClear?: () => void` - Clear button clicked

---

## 2. PasswordInput

### Basic Props
- `id?: string` - HTML id attribute
- `name?: string` - HTML name attribute for forms
- `label?: string` - Label text displayed above input
- `placeholder?: string` - Placeholder text inside input
- `helperText?: string` - Helper text displayed below input

### Value Props
- `value?: string` - Controlled value
- `defaultValue?: string` - Initial value for uncontrolled mode
- `disabled?: boolean` - Disable the input
- `readOnly?: boolean` - Make input read-only
- `required?: boolean` - Mark as required field

### Validation Props
- `minLength?: number` - Minimum character length
- `maxLength?: number` - Maximum character length
- `pattern?: string` - Regex pattern for validation

### Password Requirements
- `requireLowercase?: boolean` - Require lowercase letter
- `requireUppercase?: boolean` - Require uppercase letter
- `requireNumber?: boolean` - Require number
- `requireSymbol?: boolean` - Require symbol
- `minCategories?: number` - Minimum number of character categories (lowercase, uppercase, numbers, symbols)
- `forbidRepeats?: boolean` - Forbid repeated characters
- `forbidSequences?: boolean` - Forbid sequential characters
- `forbidSpaces?: boolean` - Forbid spaces
- `forbiddenCharsRegex?: string` - Regex for forbidden characters
- `commonPasswords?: string[]` - List of common passwords to block

### Strength Meter
- `showStrength?: boolean` - Show password strength indicator
- `strengthLabels?: [string, string, string, string, string]` - Custom strength labels (very-weak, weak, fair, good, strong)
- `strongThreshold?: number` - Minimum score to be "strong"

### UI Features
- `showToggle?: boolean` - Show visibility toggle button (eye icon)
- `revealOnHold?: boolean` - Reveal password while mouse button held
- `showCopy?: boolean` - Show copy to clipboard button
- `showRequirements?: boolean` - Show requirements checklist
- `showGenerator?: boolean` - Show password generator button

### Generator Options
- `generatorOptions?: PasswordGeneratorOptions` - Options for password generator
  - `length?: number` - Generated password length
  - `lowercase?: boolean` - Include lowercase letters
  - `uppercase?: boolean` - Include uppercase letters
  - `numbers?: boolean` - Include numbers
  - `symbols?: boolean` - Include symbols
  - `excludeSimilar?: boolean` - Exclude similar characters (i, l, 1, O, 0)

### Breach Detection
- `checkPwned?: boolean` - Check against HaveIBeenPwned API
- `minLengthForPwned?: number` - Minimum length before checking breach
- `debounceMs?: number` - Debounce delay for breach check

### Styling
- `size?: "sm" | "md" | "lg"` - Input size
- `variant?: "outlined" | "filled"` - Visual style
- `fullWidth?: boolean` - Take full width of container
- `className?: string` - Custom CSS class

### Other
- `autoComplete?: "new-password" | "current-password" | "off"` - Browser autocomplete
- `invalid?: boolean` - Mark input as invalid
- `ariaLabel?: string` - Accessibility label
- `ariaDescribedBy?: string` - Accessibility description

### Event Callbacks
- `onChange?: (value: string) => void` - Value changed
- `onBlur?: (value: string) => void` - Input lost focus
- `onFocus?: (value: string) => void` - Input gained focus
- `onValidate?: (isValid: boolean, message?: string) => void` - Validation result
- `onStrengthChange?: (score: number, label: PasswordStrengthLabel) => void` - Strength changed
- `onToggleVisibility?: (visible: boolean) => void` - Visibility toggled
- `onCopy?: (copied: boolean) => void` - Password copied
- `onGenerate?: (password: string) => void` - Password generated
- `onEnter?: (value: string) => void` - Enter key pressed
- `onEscape?: () => void` - Escape key pressed

---

## 3. EmailInput

### Basic Props
- `id?: string` - HTML id attribute
- `name?: string` - HTML name attribute for forms
- `label?: string` - Label text displayed above input
- `placeholder?: string` - Placeholder text inside input
- `helperText?: string` - Helper text displayed below input

### Value Props
- `value?: string` - Controlled value (single email)
- `values?: string[]` - Controlled values (multiple emails)
- `defaultValue?: string` - Initial value for uncontrolled mode
- `disabled?: boolean` - Disable the input
- `readOnly?: boolean` - Make input read-only
- `required?: boolean` - Mark as required field

### Multiple Emails
- `allowMultiple?: boolean` - Allow multiple email addresses (chips)
- `maxEmails?: number` - Maximum number of emails allowed
- `separators?: string` - Characters that separate emails (default: ",;")

### Validation Props
- `maxLength?: number` - Maximum character length
- `pattern?: string` - Regex pattern for validation
- `validate?: (emailOrEmails: string | string[]) => string | null` - Custom validation
- `validateOn?: "change" | "blur" | "submit"` - When to trigger validation

### Domain Validation
- `allowedDomains?: string[]` - Whitelist of allowed domains (e.g., ["gmail.com", "company.com"])
- `blockedDomains?: string[]` - Blacklist of blocked domains
- `allowedTlds?: string[]` - Whitelist of allowed TLDs (e.g., ["com", "org"])
- `blockedTlds?: string[]` - Blacklist of blocked TLDs
- `forbidPlusAddressing?: boolean` - Forbid plus addressing (email+tag@domain.com)

### Text Transformation
- `trim?: boolean` - Trim whitespace
- `lowercase?: boolean` - Convert to lowercase
- `lowercaseDomain?: boolean` - Convert only domain to lowercase

### UI Features
- `clearable?: boolean` - Show clear button
- `counter?: boolean` - Show character counter
- `showCopy?: boolean` - Show copy to clipboard button
- `showGravatar?: boolean` - Show Gravatar avatar
- `showDomainSuggestions?: boolean` - Show common domain suggestions
- `domainSuggestions?: string[]` - Custom domain suggestions (default: gmail.com, yahoo.com, etc.)
- `minCharsForSuggestions?: number` - Min chars before showing suggestions

### Styling
- `size?: "sm" | "md" | "lg"` - Input size
- `variant?: "outlined" | "filled"` - Visual style
- `fullWidth?: boolean` - Take full width of container
- `className?: string` - Custom CSS class

### Other
- `autoComplete?: "email" | "off"` - Browser autocomplete
- `invalid?: boolean` - Mark input as invalid
- `ariaLabel?: string` - Accessibility label
- `ariaDescribedBy?: string` - Accessibility description

### Event Callbacks
- `onChange?: (value: string | string[]) => void` - Value changed
- `onBlur?: (value: string | string[]) => void` - Input lost focus
- `onFocus?: (value: string | string[]) => void` - Input gained focus
- `onValidate?: (isValid: boolean, message?: string) => void` - Validation result
- `onEnter?: (value: string | string[]) => void` - Enter key pressed
- `onEscape?: () => void` - Escape key pressed
- `onPickSuggestion?: (domain: string) => void` - Domain suggestion picked

---

## 4. PhoneInput

### Basic Props
- `id?: string` - HTML id attribute
- `name?: string` - HTML name attribute for forms
- `label?: string` - Label text displayed above input
- `placeholder?: string` - Placeholder text inside input
- `helperText?: string` - Helper text displayed below input

### Value Props
- `value?: string` - Controlled value
- `defaultValue?: string` - Initial value for uncontrolled mode
- `disabled?: boolean` - Disable the input
- `readOnly?: boolean` - Make input read-only
- `required?: boolean` - Mark as required field

### Country Selection
- `country?: string` - Initial country code (ISO 3166-1 alpha-2, e.g., "US")
- `preferredCountries?: string[]` - Countries shown at top of dropdown
- `allowCountrySelect?: boolean` - Show country picker dropdown
- `separateDialCode?: boolean` - Display dial code separately (+1)
- `autoDetectCountry?: boolean` - Auto-detect country from IP

### Formatting
- `format?: "national" | "international" | "e164"` - Output format
  - "national": (123) 456-7890
  - "international": +1 123 456 7890
  - "e164": +11234567890

### Validation Props
- `maxLength?: number` - Maximum character length
- `pattern?: string` - Regex pattern for validation
- `minDigits?: number` - Minimum number of digits
- `maxDigits?: number` - Maximum number of digits
- `allowExtensions?: boolean` - Allow phone extensions

### UI Features
- `clearable?: boolean` - Show clear button
- `showCopy?: boolean` - Show copy to clipboard button
- `showExample?: boolean` - Show example phone number for selected country
- `debounceMs?: number` - Debounce delay for onChange

### Styling
- `size?: "sm" | "md" | "lg"` - Input size
- `variant?: "outlined" | "filled"` - Visual style
- `fullWidth?: boolean` - Take full width of container
- `className?: string` - Custom CSS class

### Other
- `autoComplete?: string` - Browser autocomplete
- `invalid?: boolean` - Mark input as invalid
- `ariaLabel?: string` - Accessibility label
- `ariaDescribedBy?: string` - Accessibility description

### Event Callbacks
- `onChange?: (e164: string, meta: PhoneMeta) => void` - Value changed
- `onBlur?: (e164: string, meta: PhoneMeta) => void` - Input lost focus
- `onFocus?: (e164: string, meta: PhoneMeta) => void` - Input gained focus
- `onValidate?: (isValid: boolean, message?: string) => void` - Validation result
- `onCountryChange?: (iso2: string) => void` - Country changed
- `onEnter?: (e164: string, meta: PhoneMeta) => void` - Enter key pressed
- `onEscape?: () => void` - Escape key pressed

**PhoneMeta Object:**
```typescript
{
  iso2: string;        // Country code (e.g., "US")
  dialCode: string;    // Dial code (e.g., "+1")
  national: string;    // National format
  international: string; // International format
  e164: string;        // E.164 format
  digits: string;      // Only digits
}
```

---

## 5. DateInput

### Basic Props
- `id?: string` - HTML id attribute
- `name?: string` - HTML name attribute for forms
- `label?: string` - Label text displayed above input
- `placeholder?: string` - Placeholder text inside input
- `helperText?: string` - Helper text displayed below input

### Mode & Value
- `mode?: "single" | "range" | "month"` - Selection mode
- `value?: string | [string, string]` - Controlled value
  - Single: "2024-01-15"
  - Range: ["2024-01-01", "2024-01-31"]
- `defaultValue?: string | [string, string]` - Initial value for uncontrolled mode

### Date Constraints
- `min?: string` - Minimum selectable date (YYYY-MM-DD)
- `max?: string` - Maximum selectable date (YYYY-MM-DD)
- `disabled?: boolean` - Disable the input
- `required?: boolean` - Mark as required field

### Formatting
- `format?: "YYYY-MM-DD" | "MM/DD/YYYY" | "DD/MM/YYYY"` - Display format for single/range
- `monthFormat?: "YYYY-MM" | "MMM YYYY"` - Display format for month mode

### Calendar Options
- `weekStartsOn?: 0 | 1` - First day of week (0=Sunday, 1=Monday)
- `showTodayShortcut?: boolean` - Show "Today" button
- `clearable?: boolean` - Show clear button

### Event Callbacks
- `onChange?: (value: string | [string, string]) => void` - Date selected
- `onOpen?: () => void` - Calendar opened
- `onClose?: () => void` - Calendar closed

---

## 6. LocationInput

**Note:** Requires Google Maps API key to function

### Basic Props
- `apiKey: string` - **REQUIRED** Google Maps API key
- `id?: string` - HTML id attribute
- `name?: string` - HTML name attribute for forms
- `label?: string` - Label text displayed above input
- `placeholder?: string` - Placeholder text inside input
- `helperText?: string` - Helper text displayed below input

### Value Props
- `value?: string` - Controlled value (location text)
- `defaultValue?: string` - Initial value for uncontrolled mode
- `disabled?: boolean` - Disable the input
- `required?: boolean` - Mark as required field

### Search Configuration
- `countryCodes?: string[]` - Restrict to specific countries (ISO 3166-1 alpha-2, e.g., ["US", "GB"])
- `types?: Array<"address" | "establishment" | "geocode">` - Place types to search
- `allowCoordinates?: boolean` - Allow direct coordinate input (e.g., "40.7128, -74.0060")
- `includeQueryPredictions?: boolean` - Include text-based predictions

### UI Features
- `clearable?: boolean` - Show clear button
- `debounceMs?: number` - Debounce delay for API requests
- `minCharsForSuggestions?: number` - Min chars before searching
- `maxSuggestions?: number` - Maximum suggestions to display

### Event Callbacks
- `onChange?: (value: LocationComponents) => void` - Location changed
- `onPickPlace?: (value: LocationComponents) => void` - Place selected from dropdown
- `onBlur?: (value: LocationComponents) => void` - Input lost focus
- `onFocus?: (value: LocationComponents) => void` - Input gained focus
- `onEnter?: (value: LocationComponents) => void` - Enter key pressed
- `onEscape?: () => void` - Escape key pressed

**LocationComponents Object:**
```typescript
{
  label: string;       // Full address
  placeId?: string;    // Google Place ID
  lat?: number;        // Latitude
  lng?: number;        // Longitude
  street?: string;     // Street name
  houseNumber?: string;// House number
  city?: string;       // City
  state?: string;      // State/Province
  postalCode?: string; // Postal/ZIP code
  country?: string;    // Country name
  countryCode?: string;// Country code
}
```

---

## 7. NumberInput

### Basic Props
- `id?: string` - HTML id attribute
- `name?: string` - HTML name attribute for forms
- `label?: string` - Label text displayed above input
- `placeholder?: string` - Placeholder text inside input
- `helperText?: string` - Helper text displayed below input

### Value Props
- `value?: number | string` - Controlled value
- `defaultValue?: number | string` - Initial value for uncontrolled mode
- `disabled?: boolean` - Disable the input
- `readOnly?: boolean` - Make input read-only
- `required?: boolean` - Mark as required field

### Number Constraints
- `min?: number` - Minimum value
- `max?: number` - Maximum value
- `step?: number` - Increment/decrement step
- `precision?: number` - Decimal places (0 for integers)
- `allowNegative?: boolean` - Allow negative numbers

### Formatting
- `thousandSeparator?: boolean` - Show thousands separator (1,000)
- `locale?: string` - Locale for number formatting (e.g., "en-US")
- `prefix?: string` - Text before number (e.g., "$")
- `suffix?: string` - Text after number (e.g., "%", "kg")
- `formatOnBlur?: boolean` - Format number when input loses focus
- `parseOnFocus?: boolean` - Remove formatting when input gains focus

### UI Features
- `clearable?: boolean` - Show clear button
- `showSteppers?: boolean` - Show increment/decrement buttons
- `selectOnFocus?: boolean` - Select all on focus
- `debounceMs?: number` - Debounce delay for onChange

### Validation
- `validate?: (value: number | null) => string | null` - Custom validation function

### Event Callbacks
- `onChange?: (value: number | null, raw: string) => void` - Value changed
- `onBlur?: (value: number | null, raw: string) => void` - Input lost focus
- `onFocus?: (value: number | null, raw: string) => void` - Input gained focus
- `onValidate?: (isValid: boolean, error?: string) => void` - Validation result
- `onEnter?: (value: number | null) => void` - Enter key pressed
- `onEscape?: () => void` - Escape key pressed

**Common Use Cases:**
```typescript
// Currency
<NumberInput prefix="$" precision={2} min={0} />

// Percentage
<NumberInput suffix="%" min={0} max={100} />

// Age
<NumberInput min={0} max={120} precision={0} />

// Temperature
<NumberInput suffix="°C" step={0.5} precision={1} />
```

---

## 8. SliderInput

### Basic Props
- `id?: string` - HTML id attribute
- `name?: string` - HTML name attribute for forms
- `label?: string` - Label text displayed above input
- `helperText?: string` - Helper text displayed below input
- `className?: string` - Custom CSS class

### Mode & Value
- `mode?: "single" | "range"` - Slider mode
  - "single": One handle
  - "range": Two handles (min/max)
- `value?: number | [number, number]` - Controlled value
  - Single: `50`
  - Range: `[20, 80]`
- `defaultValue?: number | [number, number]` - Initial value for uncontrolled mode

### Range Configuration
- `min?: number` - Minimum value
- `max?: number` - Maximum value
- `step?: number` - Increment step
- `precision?: number` - Decimal places for value

### State
- `disabled?: boolean` - Disable the slider
- `readOnly?: boolean` - Make slider read-only

### Display
- `showValueBubble?: boolean` - Show value bubble above handle(s)
- `prefix?: string` - Text before value (e.g., "$")
- `suffix?: string` - Text after value (e.g., "%", "kg")

### Event Callbacks
- `onChange?: (value: number | [number, number]) => void` - Value changed

**Common Use Cases:**
```typescript
// Volume
<SliderInput min={0} max={100} suffix="%" />

// Price Range
<SliderInput mode="range" min={0} max={1000} prefix="$" />

// Temperature
<SliderInput min={-20} max={40} suffix="°C" step={0.5} precision={1} />
```

---

## 9. RadioInput

### Basic Props
- `id?: string` - HTML id attribute
- `name?: string` - HTML name attribute for forms
- `label?: string` - Label text displayed above input
- `helperText?: string` - Helper text displayed below input
- `className?: string` - Custom CSS class

### Options
- `options: RadioOption[]` - **REQUIRED** Array of radio options
  ```typescript
  interface RadioOption {
    label: string;    // Display text
    value: string;    // Value when selected
    disabled?: boolean; // Disable this option
  }
  ```

### Value Props
- `value?: string` - Controlled value (selected option's value)
- `defaultValue?: string` - Initial value for uncontrolled mode
- `required?: boolean` - Mark as required field
- `disabled?: boolean` - Disable all options
- `readOnly?: boolean` - Make read-only

### Styling
- `boxBackground?: string` - Radio circle background color
- `dotColor?: string` - Selected dot color

### Event Callbacks
- `onChange?: (value: string | null) => void` - Selection changed
- `onValidate?: (isValid: boolean, error?: string) => void` - Validation result

**Example:**
```typescript
<RadioInput
  label="Choose a Plan"
  options={[
    { label: "Basic - $9/mo", value: "basic" },
    { label: "Pro - $29/mo", value: "pro" },
    { label: "Enterprise - $99/mo", value: "enterprise", disabled: true }
  ]}
  value={selectedPlan}
  onChange={(val) => setSelectedPlan(val || "basic")}
/>
```

---

## 10. CheckboxInput

### Basic Props
- `id?: string` - HTML id attribute
- `name?: string` - HTML name attribute for forms
- `label?: string` - Label text displayed above input
- `helperText?: string` - Helper text displayed below input
- `className?: string` - Custom CSS class

### Options
- `options: CheckboxOption[]` - **REQUIRED** Array of checkbox options
  ```typescript
  interface CheckboxOption {
    label: string;    // Display text
    value: string;    // Value identifier
    disabled?: boolean; // Disable this option
  }
  ```

### Multi-Select Mode (Default)
- `value?: string[]` - Controlled values (array of selected values)
- `defaultValue?: string[]` - Initial values for uncontrolled mode
- `selectAll?: boolean` - Show "Select All" checkbox at top
- `minSelected?: number` - Minimum number of selections required
- `maxSelected?: number` - Maximum number of selections allowed
- `onChange?: (values: string[]) => void` - Selection changed

### Single-Select Mode (Radio-like)
- `single?: boolean` - Enable single-select mode (behaves like radio)
- `singleValue?: string` - Controlled value in single mode
- `onChangeSingle?: (value: string | null) => void` - Single value changed

### Validation
- `required?: boolean` - Mark as required field (at least one must be selected)
- `disabled?: boolean` - Disable all checkboxes
- `readOnly?: boolean` - Make read-only

### Styling
- `boxBackground?: string` - Checkbox box background color
- `checkColor?: string` - Checkmark color

### Event Callbacks
- `onValidate?: (isValid: boolean, error?: string) => void` - Validation result

**Example (Multi-Select):**
```typescript
<CheckboxInput
  label="Select Your Interests"
  options={[
    { label: "AI & Machine Learning", value: "ai" },
    { label: "Web Development", value: "web" },
    { label: "Mobile Apps", value: "mobile" }
  ]}
  value={selectedInterests}
  onChange={(vals) => setSelectedInterests(vals)}
  minSelected={1}
/>
```

**Example (Single-Select):**
```typescript
<CheckboxInput
  single={true}
  label="Accept Terms"
  options={[
    { label: "I accept the terms and conditions", value: "accepted" }
  ]}
  singleValue={accepted}
  onChangeSingle={(val) => setAccepted(val || "")}
/>
```

---

## 11. DropdownInput

### Basic Props
- `id?: string` - HTML id attribute
- `name?: string` - HTML name attribute for forms
- `label?: string` - Label text displayed above input
- `placeholder?: string` - Placeholder text when nothing selected
- `helperText?: string` - Helper text displayed below input
- `className?: string` - Custom CSS class

### Options (Local)
- `options?: DropdownOption[]` - Array of dropdown options
  ```typescript
  interface DropdownOption {
    label: string;         // Display text
    value: string | number; // Value identifier
    disabled?: boolean;     // Disable this option
  }
  ```

### Options (API)
- `optionsApi?: string` - API endpoint for dynamic options (query appended to URL)
- `optionsMap?: (response: unknown) => DropdownOption[]` - Map API response to options

### Search
- `searchable?: boolean` - Enable search/filter functionality
- `minCharsForSearch?: number` - Min characters before triggering API search

### Multi-Select
- `multiple?: boolean` - Allow multiple selections (creates chips)
- `maxSelected?: number` - Maximum selections in multi-select mode

### Value Props
- `value?: string | number | Array<string | number>` - Controlled value
  - Single: `"us"`
  - Multiple: `["us", "ca", "uk"]`
- `defaultValue?: string | number | Array<string | number>` - Initial value

### State
- `clearable?: boolean` - Show clear button
- `required?: boolean` - Mark as required field
- `disabled?: boolean` - Disable the dropdown
- `readOnly?: boolean` - Make read-only

### Event Callbacks
- `onChange?: (value: string | number | Array<string | number>) => void` - Selection changed
- `onOpen?: () => void` - Dropdown opened
- `onClose?: () => void` - Dropdown closed

**Example (Local Options):**
```typescript
<DropdownInput
  label="Select Country"
  placeholder="Choose..."
  options={[
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
    { label: "United Kingdom", value: "uk" }
  ]}
  searchable={true}
  value={country}
  onChange={(val) => setCountry(val as string)}
/>
```

**Example (API Options):**
```typescript
<DropdownInput
  label="Search Users"
  placeholder="Type to search..."
  optionsApi="https://api.example.com/users?q="
  optionsMap={(response: any) => response.users.map(u => ({
    label: u.name,
    value: u.id
  }))}
  searchable={true}
  minCharsForSearch={2}
/>
```

---

## 12. TextareaInput

### Basic Props
- `id?: string` - HTML id attribute
- `name?: string` - HTML name attribute for forms
- `label?: string` - Label text displayed above input
- `placeholder?: string` - Placeholder text inside textarea
- `helperText?: string` - Helper text displayed below input

### Value Props
- `value?: string` - Controlled value
- `defaultValue?: string` - Initial value for uncontrolled mode
- `disabled?: boolean` - Disable the textarea
- `readOnly?: boolean` - Make textarea read-only
- `required?: boolean` - Mark as required field

### Size & Growth
- `rows?: number` - Initial number of visible rows
- `autoGrow?: boolean` - Automatically expand height as content grows
- `maxHeight?: number` - Maximum height in pixels (when autoGrow enabled)

### Validation Props
- `minLength?: number` - Minimum character length
- `maxLength?: number` - Maximum character length
- `pattern?: string` - Regex pattern for validation
- `validate?: (value: string) => string | null` - Custom validation function
- `validateOn?: "change" | "blur" | "submit"` - When to trigger validation

### Text Handling
- `trimOnBlur?: boolean` - Trim whitespace on blur
- `collapseWhitespace?: boolean` - Collapse multiple spaces to one

### UI Features
- `clearable?: boolean` - Show clear button
- `counter?: boolean` - Show character counter
- `warnAt?: number` - Character count to show warning
- `errorAt?: number` - Character count to show error

### Styling
- `size?: "sm" | "md" | "lg"` - Textarea size
- `variant?: "default" | "filled" | "outlined"` - Visual style
- `fullWidth?: boolean` - Take full width of container
- `className?: string` - Custom CSS class

### Other
- `debounceMs?: number` - Debounce delay for onChange
- `spellcheck?: boolean` - Enable browser spellcheck
- `autoComplete?: "on" | "off"` - Browser autocomplete
- `invalid?: boolean` - Mark input as invalid
- `ariaLabel?: string` - Accessibility label
- `ariaDescribedBy?: string` - Accessibility description

### Event Callbacks
- `onChange?: (value: string) => void` - Value changed
- `onBlur?: (value: string) => void` - Textarea lost focus
- `onFocus?: (value: string) => void` - Textarea gained focus
- `onValidate?: (isValid: boolean, error?: string) => void` - Validation result
- `onEnter?: (value: string) => void` - Enter key pressed
- `onEscape?: () => void` - Escape key pressed

**Example:**
```typescript
<TextareaInput
  label="Description"
  placeholder="Tell us about your project..."
  helperText="Min 20 characters"
  value={description}
  onChange={(val) => setDescription(val)}
  rows={4}
  autoGrow={true}
  maxHeight={300}
  minLength={20}
  maxLength={500}
  counter={true}
  clearable={true}
/>
```

---

## Common Patterns Across All Widgets

### Standard Form Props (Most Widgets)
- `id` - HTML id
- `name` - Form field name
- `label` - Field label
- `placeholder` - Placeholder text
- `helperText` - Helper/description text
- `disabled` - Disable interaction
- `readOnly` - Read-only mode
- `required` - Required field
- `className` - Custom CSS class

### Standard Callbacks (Most Widgets)
- `onChange` - Value changed
- `onBlur` - Lost focus
- `onFocus` - Gained focus
- `onValidate` - Validation result
- `onEnter` - Enter key pressed
- `onEscape` - Escape key pressed

### Accessibility Props (Most Widgets)
- `ariaLabel` - ARIA label
- `ariaDescribedBy` - ARIA description
- `invalid` - Mark as invalid

### Common UI Features
- `clearable` - Add clear button
- `counter` - Show character counter
- `debounceMs` - Debounce onChange calls
- `size` - "sm" | "md" | "lg"
- `variant` - Visual style variant
- `fullWidth` - Full width container

---

## Notes

1. **All props are optional unless marked as REQUIRED**
2. **Prop names are case-sensitive**
3. **Event callbacks receive appropriate typed parameters**
4. **Use `counter` not `showCounter`**
5. **Use `showCopy` not `showCopyButton`**
6. **Use `showToggle` not `showVisibilityToggle`**
7. **Use `caseTransform` for text transformation, not separate `lowercase`/`uppercase` booleans**
8. **LocationInput requires a valid Google Maps API key to function**

---

## Quick Reference: Most Changed/Corrected Props

| ❌ Old/Wrong Name | ✅ Correct Name |
|------------------|----------------|
| `showCounter` | `counter` |
| `showCopyButton` | `showCopy` |
| `showVisibilityToggle` | `showToggle` |
| `defaultCountry` | `country` |
| `lowercase={true}` | `caseTransform="lowercase"` |
| `uppercase={true}` | `caseTransform="uppercase"` |
| `validateFormat` | (built-in, not a prop) |
| `validateDomain` | (built-in, not a prop) |
| `strengthConfig` | Use individual props like `requireLowercase`, etc. |

---

**Last Updated:** Based on halo-widgets v1.0.5

