import { useMemo } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { CartItems } from '../CartItems/CartItems';
import { useShoppingCartStore } from '../../+state/useShoppingCartStore';
import { formatCurrency } from '@demo-shop-react-ui/shared';

/**
 * Component that displays the shopping cart with animation effects.
 * Shows cart items, total price, and provides checkout functionality.
 *
 * @example
 * <ShoppingCart />
 */
export const ShoppingCart = () => {
  const items = useShoppingCartStore(state => state.items);
  const showCart = useShoppingCartStore(state => state.showCart);
  const getTotalPrice = useShoppingCartStore(state => state.getTotalPrice);
  const remove = useShoppingCartStore(state => state.remove);
  const setShowCart = useShoppingCartStore(state => state.setShowCart);

  /**
   * Determines if the checkout button should be enabled
   * Button is enabled only when there are items in the cart
   */
  const checkoutButtonEnabled = useMemo(() => items.length > 0, [items]);

  /**
   * Closes the cart slide-over panel
   * Updates the showCart state to hide the cart UI
   */
  const closeCart = () => {
    setShowCart(false);
  };

  if (!showCart) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={closeCart}
        onKeyDown={e => e.key === 'Escape' && closeCart()}
        className="relative z-50"
        role="dialog"
        aria-labelledby="slide-over-title"
        aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden"></div>
        </div>
      </motion.div>

      <motion.div
        key="slideover"
        initial={{ transform: 'translateX(100%)' }}
        animate={{ transform: 'translateX(0)' }}
        exit={{ transform: 'translateX(100%)' }}
        transition={{ duration: 0.7 }}
        className="z-50 pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-md">
          <div className="flex h-full flex-col bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto sm:px-6">
              <div className="flex items-start justify-between sticky top-0 py-6 px-4 z-10 border-b-2 border-gray-100 bg-white">
                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                  Shopping cart
                </h2>
                <div className="ml-3 flex h-7 items-center">
                  <button
                    onClick={closeCart}
                    type="button"
                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Close panel</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <CartItems items={items} onRemoveItem={remove} />
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>{formatCurrency(getTotalPrice())}</p>
              </div>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  data-testid="checkout"
                  className={`flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium shadow-sm ${
                    checkoutButtonEnabled
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-800 pointer-events-none'
                  }`}>
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <button
                    onClick={closeCart}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
