import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';

export interface FormProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  children: ReactNode;
  className?: string;
}
