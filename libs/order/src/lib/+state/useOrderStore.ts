import { create } from 'zustand';
import { getApi, OrderResponse, OrderStatus } from '@demo-shop-react-ui/api';

interface OrderState {
  orders: OrderResponse[];

  getSortedOrders: () => OrderResponse[];
  getOrderById: (id: number) => OrderResponse | undefined;
  fetchOrders: () => Promise<void>;
  fetchOrderById: (id: number) => Promise<void>;
}

export const useOrderStore = create<OrderState>()((set, get) => {
  return {
    orders: [],

    fetchOrders: async () => {
      const { orderApi } = getApi();
      const res = await orderApi.getAllOrdersOfCurrentUser();
      set({ orders: res.items });
    },

    fetchOrderById: async (id: number) => {
      const { orderApi } = getApi();
      const order = await orderApi.getOrderById({ id });
      set(state => ({ orders: [...state.orders, order] }));
    },

    getSortedOrders: () => {
      const { orders } = get();

      return orders.sort((a, b) => {
        if (a.status === b.status) {
          return a.created > b.created ? -1 : 1;
        }

        return a.status === OrderStatus.Created ? -1 : 1;
      });
    },

    getOrderById: id => {
      return get().orders.find(order => order.id === id);
    },
  };
});
