import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useUserStore } from '@demo-shop-react-ui/user';
import { DateTime, formatCurrency } from '@demo-shop-react-ui/shared';
import { useOrderStore } from '../../+state/useOrderStore';
import { OrderStatusBadge } from '../OrderStatusBadge/OrderStatusBadge';

/**
 * Component that displays a list of orders for the current user.
 * The orders are sorted by status and date.
 */
export default function OrderList() {
  const MAX_THUMBNAILS = 5;

  useOrderStore(state => state.orders);
  const user = useUserStore(state => state.user);
  const getSortedOrders = useOrderStore(state => state.getSortedOrders);
  const fetchOrders = useOrderStore(state => state.fetchOrders);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="mx-auto px-8 max-w-7xl" data-testid="order-list">
      <section className="py-8 top-16 sticky z-10 bg-white border-b-2 border-gray-100">
        {user && (
          <>
            <h1 className="font-bold text-gray-700" data-testid="order-list-username">
              {`${user.firstname} ${user.lastname}`}
            </h1>
            <div className="text-xs text-gray-500">
              <p data-testid="order-list-address1">{`${user.address?.street} ${user.address?.apartment}`}</p>
              <p data-testid="order-list-address2">{`${user.address?.zip} ${user.address?.city}, ${user.address?.region}`}</p>
              <p data-testid="order-list-address3">{user.address?.country}</p>
            </div>
          </>
        )}
      </section>
      <section>
        <ul className="divide-y divide-gray-100">
          {getSortedOrders().map(order => (
            <li
              key={order.id}
              onClick={() => navigate(`./${order.id}`)}
              className="relative flex flex-col md:flex-row justify-between gap-x-3 sm:gap-x-6 py-2 sm:py-5 sm:px-5 cursor-pointer hover:bg-slate-50"
              data-testid={`order-list-item-link${order.id}`}>
              <div className="flex min-w-0 gap-x-3 mb-4">
                <div className="min-w-0 flex-auto">
                  <p
                    className="text-xl mb-4 font-semibold hover:underline"
                    data-testid={`order-list-item-id${order.id}`}>
                    Order #{order.id}
                  </p>
                  <div className="flex gap-1 sm:gap-4">
                    {order.items.slice(0, MAX_THUMBNAILS).map((item, index) => {
                      if (index === MAX_THUMBNAILS - 1 && order.items.length > MAX_THUMBNAILS) {
                        return (
                          <div
                            key={item.productId}
                            className="w-12 h-12 sm:w-24 sm:h-24 aspect-1 flex-shrink-0 bg-gray-800 text-xl sm:text-5xl text-white flex items-center justify-center rounded-lg"
                            data-testid={`order-list-item-thumbnails-more${order.id}`}>
                            +{order.items.length - MAX_THUMBNAILS + 1}
                          </div>
                        );
                      } else {
                        return (
                          <Link
                            key={item.productId}
                            to={`/products/${item.productId}`}
                            onClick={e => e.stopPropagation()}
                            className="relative w-12 h-12 sm:w-24 sm:h-24 aspect-1 flex-shrink-0 rounded-lg overflow-hidden"
                            data-testid={`order-list-item-product-link${order.id}-${item.productId}`}>
                            <img
                              src={item.productThumbnail}
                              alt={item.productName}
                              title={item.productName}
                              className="w-full h-full object-cover hover:opacity-75"
                              data-testid={`order-list-item-thumbnails${order.id}-${item.productId}`}
                            />
                          </Link>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              <OrderStatusBadge
                status={order.status}
                className="sm:absolute sm:right-5 sm:top-5 mb-4"
                data-testid={`order-list-item-status${order.id}`}
              />
              <div className="flex flex-col md:items-end sm:justify-end gap-1">
                <p className="text-sm leading-none text-gray-900" data-testid={`order-list-item-amount${order.id}`}>
                  {formatCurrency(order.amount)}
                </p>
                <DateTime
                  dateTime={order.created}
                  className="text-xs leading-none text-gray-500"
                  data-testid={`order-list-item-date${order.id}`}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
