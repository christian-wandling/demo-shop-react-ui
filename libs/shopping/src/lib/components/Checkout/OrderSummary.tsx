import { formatCurrency } from '@demo-shop-react-ui/shared';
import { CartItems } from '../CartItems/CartItems';
import { OrderSummaryProps } from '../../models/orderSummaryProps';

export const OrderSummary = ({
  items,
  totalPrice,
  onRemoveItem,
  onCheckout,
  checkoutButtonEnabled,
}: OrderSummaryProps) => {
  return (
    <section>
      <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
        Order Summary
      </h2>

      <CartItems items={items} onRemoveItem={onRemoveItem} />

      <div className="border-t border-gray-900/10 mt-12">
        <div className="mt-8 flex justify-between">
          <span>Total</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
      </div>

      <section>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            onClick={onCheckout}
            disabled={!checkoutButtonEnabled}
            className={`btn-checkout mt-6 lg:max-w-60 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium ${
              !checkoutButtonEnabled
                ? 'bg-gray-200 text-gray-800 pointer-events-none'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            }`}>
            Checkout
          </button>
        </div>
      </section>
    </section>
  );
};
