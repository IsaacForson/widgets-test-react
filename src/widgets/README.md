### Pre-Built Widgets (React + daisyUI)

These widgets are composed with halo-widgets/react inputs and styled with daisyUI. Import from `src/widgets` (adjust path as needed) and wire to your flow.

```tsx
import {
  AuthenticationWidget,
  ManagedProfileWidget,
  AddressWidget,
  PlanSelectionWidget,
  ManagedDependentsWidget,
} from "src/widgets"; // adjust path as needed
```

### Widgets

- **AuthenticationWidget**: Email or phone challenge-link sign-in. Sends a secure link (or simulate verification) to verify identity.
- **ManagedProfileWidget**: Employer selection plus personal (first/middle/last, DOB, SSN) and contact info (email, phone) with a Save action.
- **AddressWidget**: Address Line 1/2, City, State dropdown, ZIP with basic validation. Previous/Continue actions for wizard navigation.
- **PlanSelectionWidget**: Displays available plans with checkboxes and a dynamic total monthly premium. Previous/Next actions.
- **ManagedDependentsWidget**: Coverage tier radios (Employee Only, +Spouse, +Family), spouse details when required, add/remove dependents list. Previous/Next actions.

### Props Reference

For supported input props and patterns, see the full reference:

`../../PROPS_REFERENCE.md`


