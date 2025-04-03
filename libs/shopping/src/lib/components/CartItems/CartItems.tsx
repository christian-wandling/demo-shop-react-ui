import { Link } from 'react-router';
import { CartItemsProps } from '../../models/cartItemsProps';

/**
 * CartItems displays items in a shopping cart.
 *
 * This component is designed to render cart items and provide functionality
 * to interact with them, such as removing items from the cart.
 *
 * @example
 * <CartItems items={cartItems} onRemoveItem={handleRemoveItem} />
 */
export const CartItems = ({ items, onRemoveItem }: CartItemsProps) => {
  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul className="-my-6 divide-y divide-gray-200">
          {items.map(item => (
            <li key={item.id} className="flex py-6">
              <Link
                to={`/products/${item.productId}`}
                className="relative h-24 w-24 aspect-1 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 group-hover:opacity-75 cursor-pointer">
                <img
                  src={item.productThumbnail}
                  alt={item.productName}
                  title={item.productName}
                  className="object-cover object-center"
                />
              </Link>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a>{item.productName}</a>
                    </h3>
                    <p className="ml-4">${item.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">Qty {item.quantity}</p>

                  <div className="flex">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
