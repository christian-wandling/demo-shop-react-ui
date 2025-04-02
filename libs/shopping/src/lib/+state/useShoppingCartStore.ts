import { create } from 'zustand';
import { AddCartItemRequest, CartItemResponse, getApi, UpdateCartItemQuantityRequest } from '@demo-shop-react-ui/api';

interface ShoppingCartState {
  items: CartItemResponse[];
  sessionId: number | null;
  showCart: boolean;
  fetchCurrentSession: () => Promise<void>;
  add: (addCartItemRequest: AddCartItemRequest) => Promise<void>;
  remove: (id: number) => Promise<void>;
  updateItemQuantity: (id: number, updateCartItemQuantityRequest: UpdateCartItemQuantityRequest) => Promise<void>;
  getItemById: (id: number) => CartItemResponse | undefined;
  getItemByProductId: (productId: number) => CartItemResponse | undefined;
  setShowCart: (showCart: boolean) => void;

  getTotalPrice: () => number;

  getItemCount: () => number;

  hasActiveSession: () => boolean;
}

export const useShoppingCartStore = create<ShoppingCartState>()((set, get) => {
  return {
    items: [],
    sessionId: null,
    showCart: false,

    getTotalPrice(): number {
      return get().items.reduce((sum, item) => sum + item.totalPrice, 0);
    },

    getItemCount(): number {
      return get().items.reduce((sum, item) => sum + item.quantity, 0);
    },

    hasActiveSession(): boolean {
      return get().sessionId !== null;
    },

    fetchCurrentSession: async () => {
      const { shoppingSessionApi } = getApi();
      const session = await shoppingSessionApi.resolveCurrentShoppingSession();
      set({ sessionId: session.id, items: session.items });
    },

    add: async (addCartItemRequest: AddCartItemRequest) => {
      if (!get().hasActiveSession()) {
        throw new Error('No active shopping session');
      }

      const itemInCart = get().getItemByProductId(addCartItemRequest.productId);

      if (itemInCart) {
        get().updateItemQuantity(itemInCart.id, { quantity: itemInCart.quantity + 1 });
        return;
      }

      const { shoppingSessionApi } = getApi();
      await shoppingSessionApi.addCartItem({ addCartItemRequest });
      get().fetchCurrentSession();
    },

    remove: async (id: number) => {
      if (!get().hasActiveSession()) {
        throw new Error('No active shopping session');
      }

      const itemInCart = get().getItemById(id);

      if (!itemInCart) {
        throw new Error('Item not found');
      }

      if (itemInCart.quantity > 1) {
        get().updateItemQuantity(itemInCart.id, { quantity: itemInCart.quantity - 1 });
        return;
      }

      const { shoppingSessionApi } = getApi();
      await shoppingSessionApi.removeCartItem({ id });
      get().fetchCurrentSession();
    },

    updateItemQuantity: async (id: number, updateCartItemQuantityRequest: UpdateCartItemQuantityRequest) => {
      if (!get().hasActiveSession()) {
        throw new Error('No active shopping session');
      }

      const { shoppingSessionApi } = getApi();
      await shoppingSessionApi.updateCartItemQuantity({ id, updateCartItemQuantityRequest });
      get().fetchCurrentSession();
    },

    getItemById: id => {
      return get().items.find(item => item.id === id);
    },

    getItemByProductId: productId => {
      return get().items.find(item => item.productId === productId);
    },

    setShowCart: (showCart: boolean) => {
      set(state => ({ ...state, showCart }));
    },
  };
});
