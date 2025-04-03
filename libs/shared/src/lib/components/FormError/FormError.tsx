import { FormErrorProps } from '../../models/formErrorProps';

/**
 * Component that displays form validation error messages.
 *
 * This component renders error messages for form fields that fail validation.
 * It accepts the field name and validation error as props and displays
 * appropriate error messages.
 *
 * @example
 * <FormError
 *  fieldName="Email"
 *  error={errors.email}
 * />
 */
export const FormError = ({ fieldName = 'Field', error }: FormErrorProps) => {
  if (!error) return null;

  return (
    <div className="text-xs text-red-600" role="alert">
      {error.type === 'required' && <div>{fieldName} is required</div>}

      {error.type === 'email' && <div>Email invalid</div>}
      {/* Add more validation type checks as needed */}
    </div>
  );
};
