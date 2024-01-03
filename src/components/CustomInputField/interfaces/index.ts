import { Margin, Variant } from '../enums';

export interface ICustomInputFieldProps {
  fields: IFields;
  onChange: (key: string, value: string, isError: boolean) => void;
}

export interface IFields {
  [key: string]: IField;
}

export interface IField {
  type: string;
  required?: boolean;
  isDisplay?: boolean;
  placeholder?: string;
  value: string;
  label: string;
  style?: Record<string, unknown>;
  options?: IOption[];
  format?: string;
  past?: boolean;
  future?: boolean;
  views?: ['day' | 'month' | 'year'];
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  variant?: Variant;
  fullWidth?: boolean;
  margin?: Margin;
}

interface IOption {
  value: string;
  label: string;
}
