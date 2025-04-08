import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useOrderStore } from './useOrderStore';
import { getApi, OrderListResponse, OrderResponse, OrderStatus } from '@demo-shop-react-ui/api';

vi.mock('@demo-shop-react-ui/api', async importOriginal => ({
  ...(await importOriginal()),
  getApi: vi.fn().mockReturnValue({
    orderApi: {
      getAllOrdersOfCurrentUser: vi.fn(),
      getOrderById: vi.fn(),
    },
  }),
  Configuration: vi.fn(),
}));

describe('useOrderStore', () => {
  const api = getApi().orderApi;

  const mockOrderListResponse: OrderListResponse = {
    items: [
      {
        id: 1,
        userId: 1,
        items: [
          {
            productId: 1,
            productName: 'productName1',
            productThumbnail: 'productThumbnail1',
            quantity: 1,
            unitPrice: 10,
            totalPrice: 10,
          },
        ],
        amount: 1,
        status: OrderStatus.Completed,
        created: new Date('2024-01-01T10:00:00Z'),
      },
      {
        id: 2,
        userId: 1,
        items: [
          {
            productId: 2,
            productName: 'productName2',
            productThumbnail: 'productThumbnail2',
            quantity: 2,
            unitPrice: 20,
            totalPrice: 40,
          },
        ],
        amount: 2,
        status: OrderStatus.Completed,
        created: new Date('2024-01-02T10:00:00Z'),
      },
    ],
  };

  const mockOrderResponse: OrderResponse = {
    id: 3,
    userId: 1,
    items: [
      {
        productId: 3,
        productName: 'productName3',
        productThumbnail: 'productThumbnail3',
        quantity: 3,
        unitPrice: 30,
        totalPrice: 60,
      },
    ],
    amount: 3,
    status: OrderStatus.Created,
    created: new Date('2024-01-01T10:00:00Z'),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    useOrderStore.setState({ orders: [] });
  });

  describe('fetchOrders', () => {
    it('should fetch all orders and update store', async () => {
      vi.spyOn(api, 'getAllOrdersOfCurrentUser').mockResolvedValue(mockOrderListResponse);

      await useOrderStore.getState().fetchOrders();

      expect(api.getAllOrdersOfCurrentUser).toHaveBeenCalledTimes(1);
      expect(useOrderStore.getState().orders).toEqual(mockOrderListResponse.items);
    });

    it('should handle API errors', async () => {
      const error = new Error('API error');
      vi.spyOn(api, 'getAllOrdersOfCurrentUser').mockRejectedValue(error);

      await useOrderStore.getState().fetchOrders();

      expect(useOrderStore.getState().orders).toEqual([]);
      expect(useOrderStore.getState().error).toEqual(error.message);
    });
  });

  describe('fetchOrderById', () => {
    it('should fetch a order by ID and add it to store', async () => {
      vi.spyOn(api, 'getOrderById').mockResolvedValue(mockOrderResponse);

      await useOrderStore.getState().fetchOrderById(3);

      expect(api.getOrderById).toHaveBeenCalledWith({ id: mockOrderResponse.id });
      expect(useOrderStore.getState().orders).toEqual([mockOrderResponse]);
    });

    it('should add new order to existing orders', async () => {
      useOrderStore.setState({ orders: mockOrderListResponse.items });

      vi.spyOn(api, 'getOrderById').mockResolvedValue(mockOrderResponse);

      await useOrderStore.getState().fetchOrderById(3);
      expect(useOrderStore.getState().orders).toEqual([...mockOrderListResponse.items, mockOrderResponse]);
    });

    it('should handle API errors', async () => {
      const error = new Error('API error');
      vi.spyOn(api, 'getOrderById').mockRejectedValue(error);

      await useOrderStore.getState().fetchOrderById(3);

      expect(useOrderStore.getState().orders).toEqual([]);
      expect(useOrderStore.getState().error).toEqual(error.message);
    });
  });

  describe('getOrderById', () => {
    it('should return order when found', () => {
      useOrderStore.setState({ orders: mockOrderListResponse.items });

      const order = useOrderStore.getState().getOrderById(1);
      expect(order).toEqual(mockOrderListResponse.items[0]);
    });

    it('should return undefined when order not found', () => {
      useOrderStore.setState({ orders: mockOrderListResponse.items });

      const order = useOrderStore.getState().getOrderById(999);
      expect(order).toBeUndefined();
    });
  });

  describe('getSortedOrders', () => {
    it('should return sorted orders', () => {
      useOrderStore.setState({ orders: [...mockOrderListResponse.items, mockOrderResponse] });

      const order = useOrderStore.getState().getSortedOrders();

      expect(order).toEqual([mockOrderResponse, mockOrderListResponse.items[1], mockOrderListResponse.items[0]]);
    });
  });
});
