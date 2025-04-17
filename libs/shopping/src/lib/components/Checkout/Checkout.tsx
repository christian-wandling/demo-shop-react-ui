import { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { ShippingInformationForm } from './ShippingInformationForm';
import { useShoppingCartStore } from '../../+state/useShoppingCartStore';
import { useUserStore } from '@demo-shop-react-ui/user';
import { OrderSummary } from './OrderSummary';
import { ShippingInformationFormData, shippingInformationFormSchema } from '../../models/shippingInformationFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Checkout() {
  const items = useShoppingCartStore(state => state.items);
  const getTotalPrice = useShoppingCartStore(state => state.getTotalPrice);
  const checkout = useShoppingCartStore(state => state.checkout);
  const removeItem = useShoppingCartStore(state => state.remove);
  const user = useUserStore(state => state.user);
  const updateUserAddress = useUserStore(state => state.updateUserAddress);
  const updateUserPhone = useUserStore(state => state.updateUserPhone);
  const navigate = useNavigate();

  const methods: UseFormReturn<ShippingInformationFormData> = useForm<ShippingInformationFormData>({
    mode: 'onBlur',
    resolver: zodResolver(shippingInformationFormSchema),
    defaultValues: {
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: {
        country: user?.address?.country || '',
        street: user?.address?.street || '',
        apartment: user?.address?.apartment || '',
        city: user?.address?.city || '',
        region: user?.address?.region || '',
        zip: user?.address?.zip || '',
      },
    },
  });

  const checkoutButtonEnabled = items.length > 0 && !!user?.address && !methods.formState.isDirty;

  useEffect(() => {
    if (user) {
      methods.reset({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          country: user.address?.country || '',
          street: user.address?.street || '',
          apartment: user.address?.apartment || '',
          city: user.address?.city || '',
          region: user.address?.region || '',
          zip: user.address?.zip || '',
        },
      });
    }
  }, [methods, user]);

  const updateUser = async () => {
    const formData = methods.getValues();
    const formState = methods.formState;

    if (formState.isDirty) {
      if (formState.dirtyFields.address && formData.address) {
        await updateUserAddress(formData.address);
      }

      if (formState.dirtyFields.phone) {
        await updateUserPhone({ phone: formData.phone });
      }
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout();
      navigate('/products');
    } catch (err) {
      console.error('Checkout failed:', err);
    }
  };

  return (
    <div className="bg-gray-100 sm:m-2 lg:m-6 p-4 sm:p-8 lg:p-10 sm:rounded" data-testid="checkout">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <ShippingInformationForm methods={methods} onUpdateUser={updateUser} />
        <OrderSummary
          items={items}
          totalPrice={getTotalPrice()}
          checkoutButtonEnabled={checkoutButtonEnabled}
          onRemoveItem={removeItem}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}
