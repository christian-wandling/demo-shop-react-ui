import { CartItemResponse } from '@demo-shop-react-ui/api';

export interface CartItemsProps {
  /**
   * The list of items in the cart to be displayed.
   */
  items: CartItemResponse[];

  /**
   * Callback fired when a user requests to remove an item from the cart.
   * The callback receives the ID of the item to be removed.
   */
  onRemoveItem: (itemId: number) => void;

  onThumbnailClick?: () => void;
}
