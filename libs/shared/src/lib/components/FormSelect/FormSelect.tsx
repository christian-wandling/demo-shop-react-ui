import { Controller, useFormContext } from 'react-hook-form';
import { FormSelectProps } from '../../models/formSelectProps';

export const FormSelect = ({
  name,
  label,
  options,
  required = false,
  disabled = false,
  className,
  'data-testid': dataTestId,
  defaultValue = '',
}: FormSelectProps) => {
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
          <select
            id={name}
            disabled={disabled}
            className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${
              disabled ? 'text-gray-500 bg-gray-200' : 'text-gray-900'
            } ${errorMessage ? 'error' : ''} ${className || ''}`}
            data-testid={dataTestId}
            {...field}>
            <option disabled selected value="">
              Select {label}
            </option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};
