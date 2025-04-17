import React from 'react';
import { OrderStatusProps } from '../../models/orderStatusProps';

/**
 * Component for displaying the status of an order.
 *
 * This component displays the order status using different background colors
 * based on the status value. It renders the status text in a styled container with
 * conditional formatting:
 * - Green background for "Completed" status
 * - Orange background for "Created" status
 *
 * @example
 * <OrderStatus status={order.status} />
 */
export const OrderStatusBadge: React.FC<OrderStatusProps> = ({
  status,
  className = '',
  'data-testid': dataTestId = 'order-status',
}: OrderStatusProps) => {
  const getBackgroundClass = () => {
    switch (status) {
      case 'Completed':
        return 'bg-green-800';
      case 'Created':
        return 'bg-orange-500';
      default:
        return '';
    }
  };

  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <div
      className={`${className} rounded-lg px-2 sm:px-4 py-1 sm:py-1.5 max-w-20 sm:max-w-28 text-center text-white border border-slate-300 text-xs ${getBackgroundClass()}`}
      data-testid={dataTestId}>
      {formattedStatus}
    </div>
  );
};
