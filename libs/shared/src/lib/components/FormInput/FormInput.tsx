import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { FormInputProps } from '../../models/formInputProps';
import { FormError } from '../FormError/FormError';

export const FormInput = ({
  name,
  label,
  placeholder,
  type = 'text',
  required = false,
  disabled = false,
  autoComplete,
  className,
  'data-testid': dataTestId,
  defaultValue = '',
}: FormInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className={`block text-sm font-medium leading-6 ${disabled ? 'text-gray-500' : 'text-gray-900'}`}>
        {label} {required && <span className="required">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
              disabled ? 'text-gray-500 bg-gray-200' : 'text-gray-900'
            } ${errorMessage ? 'error' : ''} ${className || ''}`}
            data-testid={dataTestId}
            {...field}
          />
        )}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <FormError error={errors[name] as FieldError} />
    </div>
  );
};
