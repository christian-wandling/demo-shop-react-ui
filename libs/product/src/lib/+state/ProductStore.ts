import { create } from 'zustand';
import { Configuration, ProductApi, ProductResponse } from '@demo-shop-react-ui/api';
import { AllowedProductFilterTypes, ProductFilter } from '../models/product-filter';

interface ProductState {
  products: ProductResponse[];
  filter: ProductFilter;

  setFilter: (filter: ProductFilter) => void;
  getFilteredProducts: () => ProductResponse[];
  getProductById: (id: number) => ProductResponse | undefined;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
}

const api = new ProductApi(new Configuration({ basePath: '' }));

export const useProductStore = create<ProductState>()((set, get) => ({
  products: [],
  filter: {},

  fetchProducts: async () => {
    const res = await api.getAllProducts();
    set({ products: res.items });
  },

  fetchProductById: async (id: number) => {
    const product = await api.getProductById({ id });
    set(state => ({ products: [...state.products, product] }));
  },

  getFilteredProducts: () => {
    const { filter, products } = get();
    const filterValues = Object.entries(filter);

    if (filterValues.length === 0) {
      return products;
    }

    return products.filter(entity =>
      filterValues.every(([key, filterValue]) => {
        const value = entity[key as AllowedProductFilterTypes];

        if (Array.isArray(value)) {
          return value.some(item => item.toLowerCase().includes(filterValue.toLowerCase()));
        }

        return value.toLowerCase().includes(filterValue.toLowerCase());
      })
    );
  },

  getProductById: id => {
    return get().products.find(product => product.id === id);
  },

  setFilter: (filter: ProductFilter) => {
    set(state => ({ ...state, filter }));
  },
}));
