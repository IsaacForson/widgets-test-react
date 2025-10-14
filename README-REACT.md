# Halo Widgets - React Guide

A complete guide for using Halo Widgets in React applications.

---

## 📦 Installation

### Using npm
```bash
npm install halo-widgets
```

### Using yarn
```bash
yarn add halo-widgets
```

### Using pnpm
```bash
pnpm add halo-widgets
```

---

## 🚀 Quick Start

### 1. Import CSS Styles

In your main entry file (`main.tsx` or `index.tsx`), import the widget styles:

```typescript
import 'halo-widgets/css';
```

**Complete example (`main.tsx`):**
```typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "halo-widgets/css";  // ← Import widget styles
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### 2. Import Widgets

Import the widgets you need from `halo-widgets/react`:

```typescript
import { TextInput, PasswordInput, EmailInput } from "halo-widgets/react";
```

### 3. Use in Components

```typescript
import { useState } from "react";
import { TextInput } from "halo-widgets/react";

function MyForm() {
  const [username, setUsername] = useState("");

  return (
    <TextInput
      label="Username"
      placeholder="Enter your username"
      value={username}
      onChange={(val) => setUsername(val)}
      required={true}
    />
  );
}
```

---

## 📚 Available Widgets

All widgets are imported from `halo-widgets/react`:

```typescript
import {
  TextInput,        // Text input with validation & suggestions
  PasswordInput,    // Password with strength meter & generator
  EmailInput,       // Email with domain suggestions
  PhoneInput,       // International phone with country picker
  DateInput,        // Date picker (single, range, month)
  LocationInput,    // Google Places autocomplete
  NumberInput,      // Numeric input with formatting
  SliderInput,      // Range slider
  RadioInput,       // Radio button group
  CheckboxInput,    // Checkbox group (single or multi-select)
  DropdownInput,    // Searchable dropdown
  TextareaInput,    // Multi-line text input
} from "halo-widgets/react";
```

---

## 💡 Complete Examples

### TextInput - Basic Usage

```typescript
import { useState } from "react";
import { TextInput } from "halo-widgets/react";

function UsernameField() {
  const [username, setUsername] = useState("");

  return (
    <TextInput
      label="Username"
      placeholder="Enter your username"
      helperText="3-20 characters, lowercase only"
      value={username}
      onChange={(val) => setUsername(val)}
      required={true}
      minLength={3}
      maxLength={20}
      counter={true}
      clearable={true}
      allowSpaces={false}
      caseTransform="lowercase"
      onValidate={(isValid, error) => {
        console.log("Valid:", isValid, error);
      }}
    />
  );
}
```

### PasswordInput - With Strength Meter

```typescript
import { useState } from "react";
import { PasswordInput } from "halo-widgets/react";

function PasswordField() {
  const [password, setPassword] = useState("");

  return (
    <PasswordInput
      label="Password"
      placeholder="Enter a strong password"
      helperText="At least 8 characters with uppercase, lowercase, number, and symbol"
      value={password}
      onChange={(val) => setPassword(val)}
      required={true}
      minLength={8}
      showToggle={true}
      showStrength={true}
      showRequirements={true}
      showGenerator={true}
      showCopy={false}
      requireLowercase={true}
      requireUppercase={true}
      requireNumber={true}
      requireSymbol={true}
      onStrengthChange={(score, label) => {
        console.log("Password strength:", label, "Score:", score);
      }}
    />
  );
}
```

### EmailInput - With Domain Suggestions

```typescript
import { useState } from "react";
import { EmailInput } from "halo-widgets/react";

function EmailField() {
  const [email, setEmail] = useState("");

  return (
    <EmailInput
      label="Email Address"
      placeholder="you@example.com"
      helperText="We'll never share your email"
      value={email}
      onChange={(val) => {
        if (typeof val === "string") {
          setEmail(val);
        }
      }}
      required={true}
      showDomainSuggestions={true}
      showGravatar={true}
      lowercase={true}
      trim={true}
      clearable={true}
    />
  );
}
```

### PhoneInput - International

```typescript
import { useState } from "react";
import { PhoneInput } from "halo-widgets/react";

function PhoneField() {
  const [phone, setPhone] = useState("");

  return (
    <PhoneInput
      label="Phone Number"
      placeholder="Enter phone number"
      helperText="International format"
      value={phone}
      onChange={(e164) => setPhone(e164)}
      required={true}
      allowCountrySelect={true}
      country="US"
      format="international"
      separateDialCode={true}
      clearable={true}
    />
  );
}
```

### DateInput - Single & Range

```typescript
import { useState } from "react";
import { DateInput } from "halo-widgets/react";

// Single Date
function SingleDatePicker() {
  const [date, setDate] = useState("");

  return (
    <DateInput
      label="Select Date"
      placeholder="Pick a date"
      value={date}
      onChange={(val) => {
        if (typeof val === "string") {
          setDate(val);
        }
      }}
      mode="single"
      format="MM/DD/YYYY"
      clearable={true}
    />
  );
}

// Date Range
function DateRangePicker() {
  const [dateRange, setDateRange] = useState<[string, string]>(["", ""]);

  return (
    <DateInput
      label="Select Date Range"
      placeholder="Pick start and end dates"
      value={dateRange}
      onChange={(val) => {
        if (Array.isArray(val)) {
          setDateRange(val as [string, string]);
        }
      }}
      mode="range"
      format="MM/DD/YYYY"
      clearable={true}
    />
  );
}
```

### LocationInput - Google Places

```typescript
import { useState } from "react";
import { LocationInput } from "halo-widgets/react";

function LocationField() {
  const [location, setLocation] = useState("");

  return (
    <LocationInput
      label="Location"
      placeholder="Search for a location"
      helperText="Start typing to search"
      value={location}
      onChange={(val) => {
        setLocation(val.label);
        console.log("Full location data:", val);
      }}
      apiKey="YOUR_GOOGLE_MAPS_API_KEY"
      allowCoordinates={true}
      countryCodes={["US", "CA"]}
      clearable={true}
    />
  );
}
```

### NumberInput - Currency & Percentage

```typescript
import { useState } from "react";
import { NumberInput } from "halo-widgets/react";

// Currency
function PriceInput() {
  const [price, setPrice] = useState(0);

  return (
    <NumberInput
      label="Price"
      placeholder="0.00"
      value={price}
      onChange={(val) => {
        if (val !== null) {
          setPrice(val);
        }
      }}
      prefix="$"
      precision={2}
      min={0}
      thousandSeparator={true}
    />
  );
}

// Percentage
function PercentageInput() {
  const [percentage, setPercentage] = useState(50);

  return (
    <NumberInput
      label="Discount"
      value={percentage}
      onChange={(val) => {
        if (val !== null) {
          setPercentage(val);
        }
      }}
      suffix="%"
      min={0}
      max={100}
      precision={0}
    />
  );
}
```

### SliderInput - Volume & Range

```typescript
import { useState } from "react";
import { SliderInput } from "halo-widgets/react";

// Single Value
function VolumeSlider() {
  const [volume, setVolume] = useState(50);

  return (
    <SliderInput
      label="Volume"
      value={volume}
      onChange={(val) => setVolume(val as number)}
      min={0}
      max={100}
      suffix="%"
      showValueBubble={true}
    />
  );
}

// Range
function PriceRangeSlider() {
  const [priceRange, setPriceRange] = useState<[number, number]>([20, 80]);

  return (
    <SliderInput
      label="Price Range"
      value={priceRange}
      onChange={(val) => setPriceRange(val as [number, number])}
      mode="range"
      min={0}
      max={100}
      prefix="$"
      showValueBubble={true}
    />
  );
}
```

### RadioInput - Single Selection

```typescript
import { useState } from "react";
import { RadioInput } from "halo-widgets/react";

function PlanSelector() {
  const [plan, setPlan] = useState("basic");

  return (
    <RadioInput
      label="Choose a Plan"
      helperText="Select your subscription tier"
      options={[
        { label: "Basic - $9/mo", value: "basic" },
        { label: "Pro - $29/mo", value: "pro" },
        { label: "Enterprise - $99/mo", value: "enterprise" },
      ]}
      value={plan}
      onChange={(val) => setPlan(val || "basic")}
      required={true}
    />
  );
}
```

### CheckboxInput - Multi-Select

```typescript
import { useState } from "react";
import { CheckboxInput } from "halo-widgets/react";

function InterestsSelector() {
  const [interests, setInterests] = useState<string[]>([]);

  return (
    <CheckboxInput
      label="Select Your Interests"
      helperText="Choose at least one"
      options={[
        { label: "AI & Machine Learning", value: "ai" },
        { label: "Web Development", value: "web" },
        { label: "Mobile Apps", value: "mobile" },
        { label: "Data Science", value: "data" },
        { label: "DevOps", value: "devops" },
      ]}
      value={interests}
      onChange={(vals) => setInterests(vals)}
      required={true}
      minSelected={1}
    />
  );
}
```

### DropdownInput - Searchable

```typescript
import { useState } from "react";
import { DropdownInput } from "halo-widgets/react";

function CountrySelector() {
  const [country, setCountry] = useState("us");

  return (
    <DropdownInput
      label="Select Country"
      placeholder="Choose a country..."
      options={[
        { label: "United States", value: "us" },
        { label: "Canada", value: "ca" },
        { label: "United Kingdom", value: "uk" },
        { label: "Germany", value: "de" },
        { label: "France", value: "fr" },
      ]}
      value={country}
      onChange={(val) => setCountry(val as string)}
      searchable={true}
      clearable={true}
      required={true}
    />
  );
}

// Multi-Select Dropdown
function MultiCountrySelector() {
  const [countries, setCountries] = useState<string[]>([]);

  return (
    <DropdownInput
      label="Select Countries"
      placeholder="Choose multiple countries..."
      options={[
        { label: "United States", value: "us" },
        { label: "Canada", value: "ca" },
        { label: "United Kingdom", value: "uk" },
      ]}
      value={countries}
      onChange={(val) => setCountries(val as string[])}
      multiple={true}
      searchable={true}
      maxSelected={3}
    />
  );
}
```

### TextareaInput - Multi-Line

```typescript
import { useState } from "react";
import { TextareaInput } from "halo-widgets/react";

function DescriptionField() {
  const [description, setDescription] = useState("");

  return (
    <TextareaInput
      label="Description"
      placeholder="Tell us about your project..."
      helperText="Minimum 20 characters"
      value={description}
      onChange={(val) => setDescription(val)}
      required={true}
      minLength={20}
      maxLength={500}
      rows={4}
      autoGrow={true}
      counter={true}
      clearable={true}
    />
  );
}
```

---

## 🎨 Styling & Theming

### Using CSS Variables

Customize widget appearance with CSS variables:

```css
:root {
  --halo-color-primary: #6366f1;
  --halo-color-accent: #8b5cf6;
  --halo-color-surface: #ffffff;
  --halo-color-bg: #f9fafb;
  --halo-color-text: #111827;
  --halo-color-muted: #6b7280;
  --halo-color-border: #e5e7eb;
  --halo-color-error: #ef4444;
  --halo-color-success: #10b981;
  --halo-color-warning: #f59e0b;
  --halo-font-family: system-ui, -apple-system, sans-serif;
  --halo-radius: 8px;
  --halo-border: 1px solid var(--halo-color-border);
}
```

### Using className Prop

Add custom styles to any widget:

```typescript
<TextInput
  className="my-custom-input"
  label="Username"
  value={username}
  onChange={setUsername}
/>
```

```css
.my-custom-input {
  max-width: 400px;
  margin-bottom: 1rem;
}
```

### Size Variants

Most widgets support size variants:

```typescript
<TextInput size="sm" label="Small" />
<TextInput size="md" label="Medium (default)" />
<TextInput size="lg" label="Large" />
```

### Style Variants

Some widgets support style variants:

```typescript
<TextInput variant="outlined" label="Outlined (default)" />
<TextInput variant="filled" label="Filled" />
```

---

## 🎯 TypeScript Support

All widgets are fully typed. Import types for better IDE support:

```typescript
import { 
  TextInput, 
  type TextInputProps 
} from "halo-widgets/react";

// Use in your component props
interface MyFormProps {
  textInputProps?: Partial<TextInputProps>;
}

function MyForm({ textInputProps }: MyFormProps) {
  return <TextInput {...textInputProps} />;
}
```

### Available Types

```typescript
import type {
  TextInputProps,
  PasswordInputProps,
  EmailInputProps,
  PhoneInputProps,
  DateInputProps,
  LocationInputProps,
  NumberInputProps,
  SliderInputProps,
  RadioInputProps,
  CheckboxInputProps,
  DropdownInputProps,
  TextareaInputProps,
} from "halo-widgets/react";
```

---

## 🔧 Common Patterns

### Form with Multiple Widgets

```typescript
import { useState } from "react";
import { 
  TextInput, 
  EmailInput, 
  PasswordInput, 
  CheckboxInput 
} from "halo-widgets/react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    interests: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Username"
        value={formData.username}
        onChange={(val) => setFormData({ ...formData, username: val })}
        required={true}
      />

      <EmailInput
        label="Email"
        value={formData.email}
        onChange={(val) => {
          if (typeof val === "string") {
            setFormData({ ...formData, email: val });
          }
        }}
        required={true}
      />

      <PasswordInput
        label="Password"
        value={formData.password}
        onChange={(val) => setFormData({ ...formData, password: val })}
        required={true}
        showStrength={true}
      />

      <CheckboxInput
        label="Interests"
        options={[
          { label: "Web Dev", value: "web" },
          { label: "Mobile", value: "mobile" },
        ]}
        value={formData.interests}
        onChange={(vals) => setFormData({ ...formData, interests: vals })}
      />

      <button type="submit">Register</button>
    </form>
  );
}
```

### Validation Handling

```typescript
import { useState } from "react";
import { TextInput } from "halo-widgets/react";

function ValidatedInput() {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");

  return (
    <TextInput
      label="Username"
      value={value}
      onChange={(val) => setValue(val)}
      minLength={3}
      maxLength={20}
      pattern="^[a-zA-Z0-9_]+$"
      onValidate={(valid, errorMsg) => {
        setIsValid(valid);
        setError(errorMsg || "");
      }}
      invalid={!isValid}
    />
  );
}
```

### Controlled vs Uncontrolled

```typescript
// Controlled (recommended)
function ControlledInput() {
  const [value, setValue] = useState("");
  
  return (
    <TextInput
      value={value}
      onChange={(val) => setValue(val)}
    />
  );
}

// Uncontrolled
function UncontrolledInput() {
  return (
    <TextInput
      defaultValue="initial value"
      onChange={(val) => console.log("Value:", val)}
    />
  );
}
```

### Debounced API Calls

```typescript
import { useState } from "react";
import { TextInput } from "halo-widgets/react";

function SearchInput() {
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    setQuery(value);
    // This will be debounced automatically
    console.log("Searching for:", value);
  };

  return (
    <TextInput
      label="Search"
      placeholder="Type to search..."
      value={query}
      onChange={handleSearch}
      debounceMs={500}
    />
  );
}
```

---

## ⚙️ Advanced Usage

### API-Based Suggestions

```typescript
import { TextInput } from "halo-widgets/react";

function ApiSuggestionsInput() {
  return (
    <TextInput
      label="Search Words"
      placeholder="Type to get suggestions..."
      suggestionsSource="api"
      suggestionsApi="https://api.datamuse.com/sug?s="
      minCharsForSuggestions={2}
      debounceMs={300}
    />
  );
}
```

### Custom Validation

```typescript
import { TextInput } from "halo-widgets/react";

function CustomValidationInput() {
  const validateUsername = (value: string): string | null => {
    if (value.includes("admin")) {
      return "Username cannot contain 'admin'";
    }
    if (value.length < 3) {
      return "Username must be at least 3 characters";
    }
    return null; // null means valid
  };

  return (
    <TextInput
      label="Username"
      validate={validateUsername}
      validateOn="change"
    />
  );
}
```

### Password with Breach Check

```typescript
import { PasswordInput } from "halo-widgets/react";

function SecurePasswordInput() {
  return (
    <PasswordInput
      label="Password"
      checkPwned={true}
      minLengthForPwned={8}
      showRequirements={true}
      requireLowercase={true}
      requireUppercase={true}
      requireNumber={true}
      requireSymbol={true}
    />
  );
}
```

---

## 🐛 Troubleshooting

### Styles Not Applied

**Problem:** Widgets appear unstyled

**Solution:** Make sure you imported the CSS:
```typescript
import "halo-widgets/css";
```

### TypeScript Errors

**Problem:** Type errors on props

**Solution:** Check the prop names in `PROPS_REFERENCE.md`. Common mistakes:
- ❌ `showCounter` → ✅ `counter`
- ❌ `showCopyButton` → ✅ `showCopy`
- ❌ `showVisibilityToggle` → ✅ `showToggle`

### Widget Losing Focus

**Problem:** Input loses focus after each keystroke

**Solution:** This was a bug in v1.0.5 and earlier. Make sure you're using the latest version or the fixed local package.

### LocationInput Not Working

**Problem:** LocationInput doesn't show suggestions

**Solution:** You need a valid Google Maps API key:
```typescript
<LocationInput apiKey="YOUR_ACTUAL_API_KEY" />
```

---

## 📋 Requirements

- React 18.0.0 or higher
- TypeScript 5.0+ (optional, but recommended)

---

## 🔗 Additional Resources

- **Props Reference:** See `PROPS_REFERENCE.md` for complete prop documentation
- **Examples:** Check `src/App.tsx` for working examples
- **Package Version:** v1.0.5

---

## 💪 Best Practices

1. **Always import CSS** in your main entry file
2. **Use controlled components** with useState
3. **Validate user input** using built-in validation props
4. **Handle null values** for NumberInput onChange
5. **Type check arrays** for EmailInput with multiple emails
6. **Use TypeScript types** for better IDE support
7. **Debounce API calls** to reduce server load
8. **Provide helper text** to guide users
9. **Mark required fields** with `required={true}`
10. **Test validation** with `onValidate` callback

---

## 🎉 Quick Start Template

Copy this template to get started quickly:

```typescript
import { useState } from "react";
import { TextInput, EmailInput, PasswordInput } from "halo-widgets/react";

function MyForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Username"
        placeholder="Enter username"
        value={username}
        onChange={setUsername}
        required={true}
        minLength={3}
        maxLength={20}
        counter={true}
      />

      <EmailInput
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChange={(val) => {
          if (typeof val === "string") setEmail(val);
        }}
        required={true}
        showDomainSuggestions={true}
      />

      <PasswordInput
        label="Password"
        placeholder="Enter password"
        value={password}
        onChange={setPassword}
        required={true}
        minLength={8}
        showStrength={true}
        showToggle={true}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
```

---

**Happy coding with Halo Widgets! 🚀**

