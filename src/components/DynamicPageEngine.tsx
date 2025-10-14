import React, { useState, useCallback } from "react";
import {
  TextInput,
  PasswordInput,
  EmailInput,
  PhoneInput,
  DateInput,
  NumberInput,
  RadioInput,
  CheckboxInput,
  TextareaInput,
  DropdownInput,
  LocationInput,
  SliderInput,
} from "halo-widgets/react";
import type { PageManifest, FieldConfig } from "../types/manifest";
import "./DynamicPageEngine.css";

interface DynamicPageEngineProps {
  manifest: PageManifest;
  onSubmit?: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
  className?: string;
}

interface FormState {
  [key: string]: unknown;
}

const DynamicPageEngine: React.FC<DynamicPageEngineProps> = ({
  manifest,
  onSubmit,
  onCancel,
  className = "",
}) => {
  // Initialize form state with default values
  const [formData, setFormData] = useState<FormState>(() => {
    const initialState: FormState = {};
    manifest.fields.forEach((field) => {
      if (field.defaultValue !== undefined) {
        initialState[field.id] = field.defaultValue;
      } else {
        // Set appropriate default values based on field type
        switch (field.type) {
          case "checkbox":
            initialState[field.id] = [];
            break;
          case "number":
            initialState[field.id] = 0;
            break;
          case "slider":
            initialState[field.id] = field.validation?.min || 0;
            break;
          default:
            initialState[field.id] = "";
        }
      }
    });
    return initialState;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = useCallback((fieldId: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  }, []);

  const validateForm = useCallback((): boolean => {
    for (const field of manifest.fields) {
      const value = formData[field.id];

      // Required field validation
      if (field.required) {
        if (field.type === "checkbox") {
          if (!Array.isArray(value) || value.length === 0) {
            return false;
          }
          if (field.minSelected && value.length < field.minSelected) {
            return false;
          }
        } else if (
          !value ||
          (typeof value === "string" && value.trim() === "")
        ) {
          return false;
        }
      }

      // Validation rules
      if (field.validation && value) {
        const { minLength, maxLength, min, max } = field.validation;

        if (typeof value === "string") {
          if (minLength && value.length < minLength) return false;
          if (maxLength && value.length > maxLength) return false;
        }

        if (typeof value === "number") {
          if (min !== undefined && value < min) return false;
          if (max !== undefined && value > max) return false;
        }
      }

      // Special validation for password confirmation
      if (field.id === "confirmPassword") {
        const passwordField = manifest.fields.find((f) => f.id === "password");
        if (passwordField && formData.password !== value) {
          return false;
        }
      }
    }
    return true;
  }, [formData, manifest.fields]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }

      if (manifest.actions?.submit?.successMessage) {
        setSubmitMessage(manifest.actions.submit.successMessage);
      }
    } catch {
      const errorMessage =
        manifest.actions?.submit?.errorMessage || "An error occurred";
      setSubmitMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FieldConfig) => {
    const fieldValue = formData[field.id];
    const commonProps = {
      label: field.label,
      placeholder: field.placeholder,
      helperText: field.helperText,
      required: field.required,
    };

    switch (field.type) {
      case "text":
        return (
          <TextInput
            {...commonProps}
            value={fieldValue as string}
            onChange={(value) => handleInputChange(field.id, value)}
            minLength={field.validation?.minLength}
            maxLength={field.validation?.maxLength}
            counter={field.counter}
            clearable={field.clearable}
            allowSpaces={field.allowSpaces}
            caseTransform={
              field.caseTransform as "lowercase" | "uppercase" | undefined
            }
            minCharsForSuggestions={field.minCharsForSuggestions}
          />
        );

      case "password":
        return (
          <PasswordInput
            {...commonProps}
            value={fieldValue as string}
            onChange={(value) => handleInputChange(field.id, value)}
            minLength={field.validation?.minLength}
            showToggle={field.showToggle}
            showStrength={field.showStrength}
            showRequirements={field.showRequirements}
            showGenerator={field.showGenerator}
            requireLowercase={field.requireLowercase}
            requireUppercase={field.requireUppercase}
            requireNumber={field.requireNumber}
            requireSymbol={field.requireSymbol}
          />
        );

      case "email":
        return (
          <EmailInput
            {...commonProps}
            value={fieldValue as string}
            onChange={(value) => handleInputChange(field.id, value)}
            showDomainSuggestions={field.showDomainSuggestions}
            lowercase={field.lowercase}
            trim={field.trim}
          />
        );

      case "phone":
        return (
          <PhoneInput
            {...commonProps}
            value={fieldValue as string}
            onChange={(value) => handleInputChange(field.id, value)}
            allowCountrySelect={field.allowCountrySelect}
            country={field.country}
            separateDialCode={field.separateDialCode}
            autoDetectCountry={field.autoDetectCountry}
            format={field.format}
          />
        );

      case "date":
        return (
          <DateInput
            {...commonProps}
            value={fieldValue as string}
            onChange={(value) => handleInputChange(field.id, value)}
            mode={field.mode}
            format={
              field.format as
                | "MM/DD/YYYY"
                | "YYYY-MM-DD"
                | "DD/MM/YYYY"
                | undefined
            }
          />
        );

      case "number":
        return (
          <NumberInput
            {...commonProps}
            value={fieldValue as number}
            onChange={(value) => handleInputChange(field.id, value)}
            min={field.validation?.min}
            max={field.validation?.max}
            precision={field.precision}
          />
        );

      case "slider":
        return (
          <SliderInput
            {...commonProps}
            value={fieldValue as number}
            onChange={(value) => handleInputChange(field.id, value)}
            min={field.validation?.min || 0}
            max={field.validation?.max || 100}
            step={field.step}
            prefix={field.prefix}
            suffix={field.suffix}
            showValueBubble={field.showValueBubble}
          />
        );

      case "radio":
        return (
          <RadioInput
            {...commonProps}
            value={fieldValue as string}
            onChange={(value) => handleInputChange(field.id, value)}
            options={field.options.map((opt) => ({
              label: opt.label,
              value: String(opt.value),
              disabled: opt.disabled,
            }))}
            boxBackground={field.boxBackground}
            dotColor={field.dotColor}
          />
        );

      case "checkbox":
        return (
          <CheckboxInput
            {...commonProps}
            value={fieldValue as string[]}
            onChange={(value) => handleInputChange(field.id, value)}
            options={field.options.map((opt) => ({
              label: opt.label,
              value: String(opt.value),
              disabled: opt.disabled,
            }))}
            selectAll={field.selectAll}
            minSelected={field.minSelected}
            maxSelected={field.maxSelected}
            single={field.single}
            boxBackground={field.boxBackground}
            checkColor={field.checkColor}
          />
        );

      case "dropdown":
        return (
          <DropdownInput
            {...commonProps}
            value={fieldValue as string | number | Array<string | number>}
            onChange={(value) => handleInputChange(field.id, value)}
            options={field.options || []}
            optionsApi={field.optionsApi}
            searchable={field.searchable}
            minCharsForSearch={field.minCharsForSearch}
            multiple={field.multiple}
            maxSelected={field.maxSelected}
            clearable={field.clearable}
          />
        );

      case "textarea":
        return (
          <TextareaInput
            {...commonProps}
            value={fieldValue as string}
            onChange={(value) => handleInputChange(field.id, value)}
            maxLength={field.validation?.maxLength}
            rows={field.rows}
            autoGrow={field.autoGrow}
            counter={field.counter}
            clearable={field.clearable}
          />
        );

      case "location":
        return (
          <LocationInput
            {...commonProps}
            value={fieldValue as string}
            onChange={(value) =>
              handleInputChange(field.id, value?.label || "")
            }
            apiKey={field.apiKey || ""}
            allowCoordinates={field.allowCoordinates}
          />
        );

      default:
        console.warn(`Unknown field type: ${(field as { type: string }).type}`);
        return null;
    }
  };

  return (
    <div
      className={`dynamic-page ${
        manifest.styling?.className || ""
      } ${className}`}
    >
      <div className="page-container">
        <header className="page-header">
          <h1>{manifest.title}</h1>
          {manifest.description && <p>{manifest.description}</p>}
        </header>

        <form onSubmit={handleSubmit} className="dynamic-form">
          {manifest.layout.sections.map((section) => (
            <div
              key={section.id}
              className={`form-section ${section.className || ""}`}
            >
              {section.title && <h2>{section.title}</h2>}
              {section.description && <p>{section.description}</p>}

              {section.rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`form-row ${row.className || ""}`}
                >
                  {row.fields.map((fieldId) => {
                    const field = manifest.fields.find((f) => f.id === fieldId);
                    if (!field) {
                      console.warn(`Field not found: ${fieldId}`);
                      return null;
                    }
                    return (
                      <div key={fieldId} className="form-field">
                        {renderField(field)}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}

          {submitMessage && (
            <div
              className={`submit-message ${
                submitMessage.includes("success") ||
                submitMessage.includes("Welcome")
                  ? "success"
                  : "error"
              }`}
            >
              {submitMessage}
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={!validateForm() || isSubmitting}
            >
              {isSubmitting
                ? `${manifest.actions?.submit?.label || "Submit"}...`
                : manifest.actions?.submit?.label || "Submit"}
            </button>
          </div>
        </form>

        {manifest.actions?.cancel && (
          <footer className="page-footer">
            <p>
              <button type="button" onClick={onCancel} className="cancel-link">
                {manifest.actions.cancel.label}
              </button>
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default DynamicPageEngine;
