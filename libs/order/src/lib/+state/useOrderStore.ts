import { create } from 'zustand';
import { getApi, OrderResponse, OrderStatus } from '@demo-shop-react-ui/api';

interface OrderState {
  orders: OrderResponse[];
  loading: boolean;
  error: string | null;

  getSortedOrders: () => OrderResponse[];
  getOrderById: (id: number) => OrderResponse | undefined;
  fetchOrders: () => Promise<void>;
  fetchOrderById: (id: number) => Promise<void>;
}

export const useOrderStore = create<OrderState>()((set, get) => {
  return {
    orders: [],
    loading: false,
    error: null,

    fetchOrders: async () => {
      try {
        set(state => ({ ...state, loading: true, error: null }));
        const { orderApi } = getApi();
        const res = await orderApi.getAllOrdersOfCurrentUser();
        set({ orders: res.items, loading: false, error: null });
      } catch (err: any) {
        set(state => ({ ...state, loading: false, error: err.message }));
      }
    },

    fetchOrderById: async (id: number) => {
      try {
        set(state => ({ ...state, loading: true, error: null }));
        const { orderApi } = getApi();
        const order = await orderApi.getOrderById({ id });
        set(state => ({ orders: [...state.orders, order], loading: false, error: null }));
      } catch (err: any) {
        set(state => ({ ...state, loading: false, error: err.message }));
      }
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
