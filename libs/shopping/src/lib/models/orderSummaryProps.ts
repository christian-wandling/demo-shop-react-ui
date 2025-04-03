import { CartItemResponse } from '@demo-shop-react-ui/api';

export interface OrderSummaryProps {
  items: Array<CartItemResponse>;
  totalPrice: number;
  checkoutButtonEnabled: boolean;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}
