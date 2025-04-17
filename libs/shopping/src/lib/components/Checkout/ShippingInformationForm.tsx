import { Form, FormInput, FormSelect } from '@demo-shop-react-ui/shared';
import { ShippingInformationProps } from '../../models/shippingInformationProps';
import { useEffect, useState } from 'react';
import { countrySelectOptions } from '../../constants/countrySelectOptions';
import { ShippingInformationFormData } from '../../models/shippingInformationFormSchema';

export const ShippingInformationForm = ({ methods, onUpdateUser }: ShippingInformationProps) => {
  const BREAKPOINT_MD = 768;
  const [shippingExtended, setShippingExtended] = useState(false);

  useEffect(() => {
    setShippingExtended(window.innerWidth >= BREAKPOINT_MD);

    const handleResize = () => {
      setShippingExtended(window.innerWidth >= BREAKPOINT_MD);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleShippingExtended = () => {
    setShippingExtended(!shippingExtended);
  };

  const updateButtonEnabled = methods.formState.isValid && methods.formState.isDirty;

  return (
    <Form<ShippingInformationFormData> methods={methods} onSubmit={onUpdateUser} className="user-form">
      <div className="space-y-8">
        <div
          className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer lg:pointer-events-none"
          onClick={toggleShippingExtended}>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Shipping information</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`lg:hidden w-5 h-5 transition-transform duration-300 ${shippingExtended ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div
          className={`mt-4 lg:max-h-[1000px] grid md:grid-cols-8 gap-x-6 gap-y-4 transition-all duration-500 ease-in-out overflow-hidden ${
            shippingExtended ? 'max-h-[1000px]' : 'max-h-0'
          }`}>
          <FormInput
            name="firstname"
            label="Firstname"
            disabled
            required
            className="md:col-span-4"
            data-testid="checkout-form-element-firstname"
          />
          <FormInput
            name="lastname"
            label="Firstname"
            disabled
            required
            className="md:col-span-4"
            data-testid="checkout-form-element-lastname"
          />
          <FormInput
            name="email"
            label="Email"
            disabled
            required
            className="md:col-span-4"
            data-testid="checkout-form-element-email"
          />
          <FormInput name="phone" label="Phone" className="md:col-span-4" data-testid="checkout-form-element-phone" />
          <FormSelect
            name="address.country"
            label="Country"
            options={countrySelectOptions}
            required
            className="md:col-span-4"
            data-testid="checkout-form-element-country"
          />
          <FormInput
            name="address.street"
            label="Street"
            required
            className="md:col-span-5"
            data-testid="checkout-form-element-street"
          />
          <FormInput
            name="address.apartment"
            label="Apartment"
            required
            className="md:col-span-3"
            data-testid="checkout-form-element-apartment"
          />
          <FormInput
            name="address.city"
            label="City"
            required
            className="md:col-span-3"
            data-testid="checkout-form-element-city"
          />
          <FormInput
            name="address.region"
            label="Region"
            className="md:col-span-3"
            data-testid="checkout-form-element-region"
          />
          <FormInput
            name="address.zip"
            label="Zip"
            required
            className="md:col-span-2"
            data-testid="checkout-form-element-zip"
          />

          <button
            disabled={!updateButtonEnabled}
            className={`btn-update md:col-span-full float-right m-2 mt-6 lg:max-w-60 flex flex-1 items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium ${
              !updateButtonEnabled
                ? 'bg-gray-200 text-gray-800 pointer-events-none'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            }`}
            data-testid="checkout-update-shipping-information-button">
            Update
          </button>
        </div>
      </div>
    </Form>
  );
};
