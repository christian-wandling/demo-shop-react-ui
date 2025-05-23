import { SelectOption } from './selectOption';

export interface FormSelectProps {
  name: string;
  label: string;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
  defaultValue?: string;
}
