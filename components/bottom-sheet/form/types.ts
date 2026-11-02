import type { ReactNode } from "react";

export interface BaseField<T = any> {
  key: string;
  label?: string;
  required?: boolean;
  defaultValue?: T;
}

export interface TextField extends BaseField<string> {
  type: "text" | "textarea";
  placeholder?: string;
  multiline?: boolean;
}

export interface NumberField extends BaseField<number> {
  type: "number";
  min?: number;
  max?: number;
}

export interface SwitchField extends BaseField<boolean> {
  type: "switch";
}

export interface SelectField extends BaseField<string> {
  type: "select";
  options: { label: string; value: string }[];
  placeholder?: string;
  searchable?: boolean;
}

export interface DateTimeField extends BaseField<Date> {
  type: "datetime";
}

export interface CustomField<T = any> extends BaseField<T> {
  type: "custom";
  render: (props: {
    value: T;
    onChange: (value: T) => void;
    field: CustomField<T>;
  }) => ReactNode;
}

export type FieldConfig =
  | TextField
  | NumberField
  | SwitchField
  | CustomField
  | SelectField
  | DateTimeField;

export interface FormSheetOptions {
  title?: string;
  fields: FieldConfig[];
  mode?: "add" | "edit";
  initialValues?: Record<string, any>;
  onSubmit?: (values: Record<string, any>) => Promise<any> | any;
  submitLabel?: string;
  cancelLabel?: string;
  closeOnSubmit?: boolean;
}
