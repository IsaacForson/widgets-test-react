# Dynamic Page Generation Engine

This project implements a powerful manifest-driven page generation engine that creates dynamic forms and pages using the Halo Widgets library. Instead of writing static pages, you define page structures using JSON manifests.

## 🚀 Features

- **Manifest-Driven**: Define pages using JSON configuration instead of hardcoded components
- **All Halo Widgets Supported**: Text, Password, Email, Phone, Date, Number, Slider, Radio, Checkbox, Dropdown, Textarea, Location inputs
- **Flexible Layouts**: Support for sections, rows, and responsive layouts
- **Dynamic Validation**: Built-in form validation based on manifest rules
- **External API Ready**: Can fetch manifests from external APIs
- **Local Fallback**: Uses local manifests when API is unavailable
- **Type-Safe**: Full TypeScript support with comprehensive type definitions

## 📁 Project Structure

```
src/
├── types/
│   └── manifest.ts          # Type definitions for manifests
├── manifests/
│   ├── signupManifest.ts    # Sample signup page manifest
│   └── signinManifest.ts    # Sample signin page manifest
├── components/
│   ├── DynamicPageEngine.tsx # Main engine component
│   └── DynamicPageEngine.css # Styling
├── pages/
│   ├── DynamicSignupPage.tsx # Dynamic signup page
│   ├── DynamicSigninPage.tsx # Dynamic signin page
│   └── GenericDynamicPage.tsx # Generic page that loads any manifest
├── services/
│   └── manifestService.ts    # Service for fetching manifests
```

## 🔧 How It Works

### 1. Define a Manifest

Create a JSON structure that defines your page:

```typescript
const signupManifest: PageManifest = {
  id: 'signup',
  title: 'Create Your Account',
  description: 'Join our community',
  fields: [
    {
      id: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter your first name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50,
      },
      clearable: true,
    },
    // ... more fields
  ],
  layout: {
    type: 'form',
    sections: [
      {
        id: 'personal',
        title: 'Personal Information',
        rows: [
          {
            fields: ['firstName', 'lastName'],
            className: 'form-row',
          },
        ],
      },
    ],
  },
  actions: {
    submit: {
      label: 'Create Account',
      successMessage: 'Account created successfully!',
    },
  },
};
```

### 2. Use the Engine

```typescript
import DynamicPageEngine from '../components/DynamicPageEngine';
import { signupManifest } from '../manifests/signupManifest';

const MyPage = () => {
  const handleSubmit = async (data: Record<string, unknown>) => {
    // Handle form submission
    console.log('Form data:', data);
  };

  return (
    <DynamicPageEngine
      manifest={signupManifest}
      onSubmit={handleSubmit}
      onCancel={() => navigate('/')}
    />
  );
};
```

### 3. Or Use Generic Pages

For maximum flexibility, use the generic page with URL-based manifest loading:

```typescript
// Route: /page/:manifestId
// URL: /page/signup will load the 'signup' manifest
```

## 🛠 Supported Field Types

| Type | Description | Special Properties |
|------|-------------|-------------------|
| `text` | Text input | `counter`, `clearable`, `caseTransform` |
| `password` | Password input | `showToggle`, `showStrength`, `showRequirements` |
| `email` | Email input | `showDomainSuggestions`, `lowercase` |
| `phone` | Phone input | `allowCountrySelect`, `format` |
| `date` | Date picker | `mode`, `format` |
| `number` | Number input | `precision`, `min`, `max` |
| `slider` | Slider input | `step`, `prefix`, `suffix` |
| `radio` | Radio buttons | `options` |
| `checkbox` | Checkboxes | `options`, `minSelected`, `maxSelected` |
| `dropdown` | Dropdown select | `options`, `searchable` |
| `textarea` | Multi-line text | `rows`, `autoGrow`, `counter` |
| `location` | Location picker | `apiKey`, `allowCoordinates` |

## 🎨 Layout System

### Sections
Group related fields into logical sections with optional titles and descriptions.

### Rows
Control field layout within sections. Fields in the same row are displayed horizontally.

### CSS Classes
Add custom CSS classes at the page, section, or row level for styling.

## 🔄 External API Integration

The manifest service can fetch manifests from external APIs:

```typescript
import { ManifestService } from '../services/manifestService';

const manifestService = new ManifestService({
  baseUrl: 'https://your-api.com/api',
  apiKey: 'your-api-key',
  timeout: 5000,
});

// Fetch manifest from API
const manifest = await manifestService.getManifest('signup');
```

## 🚦 Validation

Built-in validation includes:

- **Required fields**: Mark fields as required
- **Length limits**: `minLength`, `maxLength` for text fields
- **Numeric ranges**: `min`, `max` for number fields
- **Selection limits**: `minSelected`, `maxSelected` for multi-select fields
- **Custom patterns**: Regular expression validation
- **Cross-field validation**: Like password confirmation

## 🎯 Benefits

1. **No Code Duplication**: Reuse the same engine for all forms
2. **Easy Maintenance**: Update forms by changing manifests, not code
3. **Dynamic Content**: Load different forms based on user roles, A/B tests, etc.
4. **Consistent UX**: All forms follow the same patterns and styling
5. **API-Driven**: Forms can be managed by non-developers via APIs
6. **Type Safety**: Full TypeScript support prevents runtime errors

## 🔗 Available Routes

- `/` - Home page explaining the manifest system
- `/:manifestId` - Dynamic page that loads any manifest by ID (e.g., `/signup`, `/signin`, `/contact`, etc.)

## 🚀 Getting Started

1. **Start the dev server**: `npm run dev`
2. **Visit dynamic pages** by going to `/:manifestId` (e.g., `/signup`, `/signin`)
3. **Modify manifests** in `src/manifests/` to see changes instantly
4. **Create new manifests** and access them via `/:manifestId`
5. **Set up external API** by configuring the manifest service to fetch from your AI

## 🎨 Styling

The engine uses DaisyUI classes and custom CSS. Styling can be controlled at multiple levels:

- **Global**: Modify `DynamicPageEngine.css`
- **Per-manifest**: Set `styling.className` in manifests
- **Per-section**: Set `className` on sections
- **Per-row**: Set `className` on rows

This system provides the perfect balance between flexibility and consistency for building dynamic, data-driven forms and pages.
