import { FieldValues, FormProvider } from 'react-hook-form';
import { FormProps } from '../../models/formProps';

export const Form = <T extends FieldValues>({ methods, onSubmit, children, className }: FormProps<T>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className} data-testid="form">
        {children}
      </form>
    </FormProvider>
  );
};
