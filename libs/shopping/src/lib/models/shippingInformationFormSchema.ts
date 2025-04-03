import { z } from 'zod';

export const shippingInformationFormSchema = z.object({
  firstname: z.string().min(1, 'First name is required').readonly(),
  lastname: z.string().min(1, 'Last name is required').readonly(),
  email: z.string().email('Invalid email address').readonly(),
  phone: z.string().nullable(),
  address: z
    .object({
      street: z.string().min(1, 'Street is required'),
      apartment: z.string().min(1, 'Apartment is required'),
      city: z.string().min(1, 'City is required'),
      region: z.string(),
      zip: z.string().min(1, 'Zip is required'),
      country: z.string().min(1, 'Country is required'),
    })
    .required(),
});

export type ShippingInformationFormData = z.infer<typeof shippingInformationFormSchema>;
