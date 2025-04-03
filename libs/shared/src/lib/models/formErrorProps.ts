import { FieldError } from 'react-hook-form';

/**
 * Props for the FormError component
 */
export interface FormErrorProps {
  /**
   * Name of the form field associated with the error.
   * This is used to identify which field the error belongs to.
   * Defaults to 'Field' if not provided.
   */
  fieldName?: string;

  /**
   * Validation errors object containing error information.
   * This is typically obtained from react-hook-form's errors object.
   *
   * @required
   */
  error: FieldError | undefined;
}
