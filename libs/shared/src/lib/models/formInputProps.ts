export interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
  'data-testid'?: string;
  defaultValue?: string;
}
