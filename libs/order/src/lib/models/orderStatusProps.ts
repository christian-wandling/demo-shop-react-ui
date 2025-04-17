/**
 * Props for the OrderStatus component
 */
export type OrderStatusProps = {
  /**
   * Required property representing the order status.
   * This determines both the displayed text and styling of the component.
   *
   * @required
   */
  status: 'Created' | 'Completed';

  className?: string;
  'data-testid'?: string;
};
