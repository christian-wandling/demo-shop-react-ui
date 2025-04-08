import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { OrderStatusBadge } from '../OrderStatusBadge/OrderStatusBadge';
import { DateTime, LoadingSpinner, NotFound } from '@demo-shop-react-ui/shared';
import { useOrderStore } from '../../+state/useOrderStore';
import { useUserStore } from '@demo-shop-react-ui/user';
import { OrderResponse, UserResponse } from '@demo-shop-react-ui/api';
import { generatePdf } from '../../services/printInvoiceService';

/**
 * Component that displays detailed information about a specific order.
 * Fetches order data based on the ID from the route parameters.
 */
export default function OrderDetail() {
  const { id } = useParams();
  const error = useOrderStore(state => state.error);
  const loading = useOrderStore(state => state.loading);
  useOrderStore(state => state.orders);
  const user = useUserStore(state => state.user);
  const getOrderById = useOrderStore(state => state.getOrderById);
  const fetchOrderById = useOrderStore(state => state.fetchOrderById);

  useEffect(() => {
    if (id) {
      fetchOrderById(+id);
    }
  }, [id, fetchOrderById]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!id || error) {
    return <NotFound />;
  }

  const order = getOrderById(+id);

  if (!order || !user) {
    return <NotFound />;
  }

  /**
   * Generates and prints a PDF invoice for the specified order
   *
   * @param order - The order data used to generate the invoice
   * @param user - The user data needed for billing information
   */
  const printPdf = (order: OrderResponse, user: UserResponse) => {
    generatePdf(order, user);
  };

  return (
    <div className="mx-auto mb-8 px-8 max-w-5xl" id="invoice">
      <section className="py-8 top-16 sticky z-10 border-b-2 border-gray-100 bg-white flex justify-between">
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-s leading-tight font-bold text-gray-700">
              {user.firstname} {user.lastname}
            </h1>
            <div className="text-xs text-gray-500">
              <p>
                {user.address?.street} {user.address?.apartment}
              </p>
              <p>
                {user.address?.zip} {user.address?.city}, {user.address?.region}
              </p>
              <p>{user.address?.country}</p>
            </div>
          </div>
          <button
            onClick={() => printPdf(order, user)}
            className="btn-print w-36 flex items-center justify-center rounded-md border border-transparent px-8 py-2 text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Print
          </button>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col items-end">
            <div className="text-s leading-tight font-semibold">Order #{order.id}</div>
            <DateTime dateTime={order.created} className="text-xs text-gray-500" />
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      </section>
      <section>
        <ul className="divide-y divide-gray-100">
          {order.items.map(item => (
            <li key={item.productId} className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-5">
              <Link
                key={item.productId}
                to={`/products/${item.productId}`}
                className="relative w-12 h-12 sm:w-24 sm:h-24 aspect-1 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  src={item.productThumbnail}
                  alt={item.productName}
                  className="w-full h-full object-cover hover:opacity-75"
                />
              </Link>
              <div className="flex flex-col min-w-0 grow">
                <p className="text-sm sm:leading-6 text-gray-900">
                  #{item.productId} {item.productName}
                </p>
                <p className="sm:mt-1 truncate text-xs sm:leading-5 text-gray-500">Qty {item.quantity}</p>
              </div>
              <div className="flex flex-row sm:flex-col-reverse grow sm:grow-0 justify-between sm:justify-end sm:items-end">
                <p className="sm:mt-1 text-xs leading-5 text-gray-500">
                  <span>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(item.unitPrice)}
                  </span>
                </p>
                <p className="text-sm leading-6 text-gray-900">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.totalPrice)}
                </p>
              </div>
            </li>
          ))}
          <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">total</p>
              </div>
            </div>
            <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.amount)}
              </p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}
