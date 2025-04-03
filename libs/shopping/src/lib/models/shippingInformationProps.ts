import { UseFormReturn } from 'react-hook-form';
import { ShippingInformationFormData } from './shippingInformationFormSchema';

export interface ShippingInformationProps {
  methods: UseFormReturn<ShippingInformationFormData>;
  onUpdateUser: () => void;
}
