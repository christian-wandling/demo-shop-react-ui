import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useShoppingCartStore } from './useShoppingCartStore';
import { getApi, ShoppingSessionResponse } from '@demo-shop-react-ui/api';

vi.mock('@demo-shop-react-ui/api', () => {
  const mockShoppingSessionApi = {
    resolveCurrentShoppingSession: vi.fn().mockResolvedValue({
      id: 123,
      items: [
        {
          id: 1,
          productId: 101,
          quantity: 2,
          totalPrice: 40,
          productName: '',
          productThumbnail: '',
          unitPrice: 0,
        },
        {
          id: 2,
          productId: 102,
          quantity: 1,
          totalPrice: 30,
          productName: '',
          productThumbnail: '',
          unitPrice: 0,
        },
      ],
      userId: 0,
    }),
    addCartItem: vi.fn(),
    removeCartItem: vi.fn(),
    updateCartItemQuantity: vi.fn(),
  };

  return {
    getApi: vi.fn(() => ({
      shoppingSessionApi: mockShoppingSessionApi,
    })),
  };
});

describe('useShoppingCartStore', () => {
  beforeEach(() => {
    useShoppingCartStore.setState({
      items: [],
      sessionId: null,
      showCart: false,
    });

    vi.clearAllMocks();
  });

  describe('computed properties', () => {
    it('should calculate totalPrice correctly', () => {
      useShoppingCartStore.setState({
        items: [
          {
            id: 1,
            productId: 101,
            quantity: 2,
            totalPrice: 40,
            productName: '',
            productThumbnail: '',
            unitPrice: 0,
          },
          {
            id: 2,
            productId: 102,
            quantity: 1,
            totalPrice: 30,
            productName: '',
            productThumbnail: '',
            unitPrice: 0,
          },
        ],
      });

      expect(useShoppingCartStore.getState().getTotalPrice()).toBe(70);
    });

    it('should calculate itemCount correctly', () => {
      useShoppingCartStore.setState({
        items: [
          {
            id: 1,
            productId: 101,
            quantity: 2,
            totalPrice: 40,
            productName: '',
            productThumbnail: '',
            unitPrice: 0,
          },
          {
            id: 2,
            productId: 102,
            quantity: 1,
            totalPrice: 30,
            productName: '',
            productThumbnail: '',
            unitPrice: 0,
          },
        ],
      });

      expect(useShoppingCartStore.getState().getItemCount()).toBe(3);
    });

    it('should determine hasActiveSession correctly', () => {
      expect(useShoppingCartStore.getState().hasActiveSession()).toBe(false);

      useShoppingCartStore.setState({ sessionId: 123 });

      expect(useShoppingCartStore.getState().hasActiveSession()).toBe(true);
    });
  });

  describe('fetchCurrentSession', () => {
    const mockSession: ShoppingSessionResponse = {
      id: 123,
      items: [
        {
          id: 1,
          productId: 101,
          quantity: 2,
          totalPrice: 40,
          productName: '',
          productThumbnail: '',
          unitPrice: 0,
        },
        {
          id: 2,
          productId: 102,
          quantity: 1,
          totalPrice: 30,
          productName: '',
          productThumbnail: '',
          unitPrice: 0,
        },
      ],
      userId: 0,
    };

    it('should fetch and set session data', async () => {
      const api = getApi();

      await useShoppingCartStore.getState().fetchCurrentSession();

      expect(api.shoppingSessionApi.resolveCurrentShoppingSession).toHaveBeenCalledTimes(1);
      expect(useShoppingCartStore.getState().sessionId).toBe(123);
      expect(useShoppingCartStore.getState().items).toEqual(mockSession.items);
    });
  });

  describe('add', () => {
    it('should throw error when no active session', async () => {
      console.log(useShoppingCartStore.getState());
      await expect(useShoppingCartStore.getState().add({ productId: 101 })).rejects.toThrow(
        'No active shopping session'
      );
    });

    it('should update quantity when item already exists in cart', async () => {
      useShoppingCartStore.setState({
        sessionId: 123,
        items: [
          {
            id: 1,
            productId: 101,
            quantity: 2,
            totalPrice: 40,
            productName: '',
            productThumbnail: '',
            unitPrice: 0,
          },
        ],
      });

      const updateSpy = vi.spyOn(useShoppingCartStore.getState(), 'updateItemQuantity');

      await useShoppingCartStore.getState().add({ productId: 101 });

      expect(updateSpy).toHaveBeenCalledWith(1, { quantity: 3 });
    });

    it('should add new item when not in cart', async () => {
      useShoppingCartStore.setState({ sessionId: 123, items: [] });

      const api = getApi();
      vi.spyOn(api.shoppingSessionApi, 'addCartItem');
      const fetchSpy = vi.spyOn(useShoppingCartStore.getState(), 'fetchCurrentSession');

      await useShoppingCartStore.getState().add({ productId: 101 });

      expect(api.shoppingSessionApi.addCartItem).toHaveBeenCalledWith({
        addCartItemRequest: { productId: 101 },
      });
      expect(fetchSpy).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should throw error when no active session', async () => {
      await expect(useShoppingCartStore.getState().remove(1)).rejects.toThrow('No active shopping session');
    });

    it('should throw error when item not found', async () => {
      useShoppingCartStore.setState({
        sessionId: 123,
        items: [
          {
            id: 1,
            productId: 101,
            quantity: 2,
            totalPrice: 40,
            productName: '',
            productThumbnail: '',
            unitPrice: 0,
          },
        ],
      });

      await expect(useShoppingCartStore.getState().remove(999)).rejects.toThrow('Item not found');
    });

    it('should decrease quantity when item quantity > 1', async () => {
      useShoppingCartStore.setState({
        sessionId: 123,
        items: [
          {
            id: 1,
            productId: 101,
            quantity: 2,
            totalPrice: 40,
            productName: '',
            productThumbnail: '',
            unitPrice: 0,
          },
        ],
      });

      const updateSpy = vi.spyOn(useShoppingCartStore.getState(), 'updateItemQuantity');

      await useShoppingCartStore.getState().remove(1);

      expect(updateSpy).toHaveBeenCalledWith(1, { quantity: 1 });
    });

    it('should remove item when quantity = 1', async () => {
      useShoppingCartStore.setState({
        sessionId: 123,
        items: [
          {
            id: 1,
            productId: 101,
            quantity: 1,
            totalPrice: 20,
            productName: '',
            productThumbnail: '',
            unitPrice: 0,
          },
        ],
      });

      const api = getApi();
      vi.spyOn(api.shoppingSessionApi, 'removeCartItem');

      const fetchSpy = vi.spyOn(useShoppingCartStore.getState(), 'fetchCurrentSession');

      await useShoppingCartStore.getState().remove(1);

      expect(api.shoppingSessionApi.removeCartItem).toHaveBeenCalledWith({ id: 1 });
      expect(fetchSpy).toHaveBeenCalled();
    });
  });

  describe('updateItemQuantity', () => {
    it('should throw error when no active session', async () => {
      await expect(useShoppingCartStore.getState().updateItemQuantity(1, { quantity: 5 })).rejects.toThrow(
        'No active shopping session'
      );
    });

    it('should update item quantity', async () => {
      useShoppingCartStore.setState({ sessionId: 123 });

      const api = getApi();
      vi.spyOn(api.shoppingSessionApi, 'updateCartItemQuantity');

      const fetchSpy = vi.spyOn(useShoppingCartStore.getState(), 'fetchCurrentSession');

      await useShoppingCartStore.getState().updateItemQuantity(1, { quantity: 5 });

      expect(api.shoppingSessionApi.updateCartItemQuantity).toHaveBeenCalledWith({
        id: 1,
        updateCartItemQuantityRequest: { quantity: 5 },
      });
      expect(fetchSpy).toHaveBeenCalled();
    });
  });

  describe('getters', () => {
    beforeEach(() => {
      useShoppingCartStore.setState({
        items: [
          {
            id: 1,
            productId: 101,
            quantity: 2,
            totalPrice: 40,
            productName: '',
            productThumbnail: '',
            unitPrice: 0,
          },
          {
            id: 2,
            productId: 102,
            quantity: 1,
            totalPrice: 30,
            productName: '',
            productThumbnail: '',
            unitPrice: 0,
          },
        ],
      });
    });

    it('should find item by id', () => {
      expect(useShoppingCartStore.getState().getItemById(1)).toEqual({
        id: 1,
        productId: 101,
        quantity: 2,
        totalPrice: 40,
        productName: '',
        productThumbnail: '',
        unitPrice: 0,
      });
      expect(useShoppingCartStore.getState().getItemById(999)).toBeUndefined();
    });

    it('should find item by product id', () => {
      expect(useShoppingCartStore.getState().getItemByProductId(101)).toEqual({
        id: 1,
        productId: 101,
        quantity: 2,
        totalPrice: 40,
        productName: '',
        productThumbnail: '',
        unitPrice: 0,
      });
      expect(useShoppingCartStore.getState().getItemByProductId(999)).toBeUndefined();
    });
  });

  describe('setShowCart', () => {
    it('should update showCart state', () => {
      expect(useShoppingCartStore.getState().showCart).toBe(false);

      useShoppingCartStore.getState().setShowCart(true);

      expect(useShoppingCartStore.getState().showCart).toBe(true);
    });
  });
});
