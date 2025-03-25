import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useProductStore } from './useProductStore';
import { ProductApi, ProductListResponse, ProductResponse } from '@demo-shop-react-ui/api';

vi.mock('@demo-shop-react-ui/api', () => ({
  ProductApi: vi.fn().mockReturnValue({
    getAllProducts: vi.fn(),
    getProductById: vi.fn(),
  }),
  Configuration: vi.fn(),
}));

describe('useProductStore', () => {
  const api = new ProductApi();

  const mockProductListResponse: ProductListResponse = {
    items: [
      {
        id: 1,
        name: 'Product 1',
        price: 100,
        description: 'description',
        categories: ['category'],
        images: [
          {
            uri: 'uri',
            name: 'name',
          },
        ],
        thumbnail: {
          uri: 'uri',
          name: 'name',
        },
      },
      {
        id: 2,
        name: 'Product 2',
        price: 200,
        description: 'description',
        categories: ['category'],
        images: [
          {
            uri: 'uri',
            name: 'name',
          },
        ],
        thumbnail: {
          uri: 'uri',
          name: 'name',
        },
      },
    ],
  };

  const mockProductResponse: ProductResponse = {
    id: 3,
    name: 'Product 3',
    price: 300,
    description: 'description',
    categories: ['category'],
    images: [
      {
        uri: 'uri',
        name: 'name',
      },
    ],
    thumbnail: {
      uri: 'uri',
      name: 'name',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    useProductStore.setState({ products: [] });
  });

  describe('fetchProducts', () => {
    it('should fetch all products and update store', async () => {
      vi.spyOn(api, 'getAllProducts').mockResolvedValue(mockProductListResponse);

      await useProductStore.getState().fetchProducts();

      expect(api.getAllProducts).toHaveBeenCalledTimes(1);
      expect(useProductStore.getState().products).toEqual(mockProductListResponse.items);
    });

    it('should handle API errors', async () => {
      vi.spyOn(api, 'getAllProducts').mockRejectedValue(new Error('API error'));

      await expect(useProductStore.getState().fetchProducts()).rejects.toThrow('API error');

      expect(useProductStore.getState().products).toEqual([]);
    });
  });

  describe('fetchProductById', () => {
    it('should fetch a product by ID and add it to store', async () => {
      vi.spyOn(api, 'getProductById').mockResolvedValue(mockProductResponse);

      await useProductStore.getState().fetchProductById(3);

      expect(api.getProductById).toHaveBeenCalledWith({ id: mockProductResponse.id });
      expect(useProductStore.getState().products).toEqual([mockProductResponse]);
    });

    it('should add new product to existing products', async () => {
      useProductStore.setState({ products: mockProductListResponse.items });

      vi.spyOn(api, 'getProductById').mockResolvedValue(mockProductResponse);

      await useProductStore.getState().fetchProductById(3);
      expect(useProductStore.getState().products).toEqual([...mockProductListResponse.items, mockProductResponse]);
    });

    it('should handle API errors', async () => {
      vi.spyOn(api, 'getProductById').mockRejectedValue(new Error('API error'));

      await expect(useProductStore.getState().fetchProductById(3)).rejects.toThrow('API error');
      expect(useProductStore.getState().products).toEqual([]);
    });
  });

  describe('getProductById', () => {
    it('should return product when found', () => {
      useProductStore.setState({ products: mockProductListResponse.items });

      const product = useProductStore.getState().getProductById(1);
      expect(product).toEqual(mockProductListResponse.items[0]);
    });

    it('should return undefined when product not found', () => {
      useProductStore.setState({ products: mockProductListResponse.items });

      const product = useProductStore.getState().getProductById(999);
      expect(product).toBeUndefined();
    });
  });

  describe('setFilter', () => {
    it('should set the filter', () => {
      const filter = { name: 'name' };

      useProductStore.getState().setFilter(filter);
      expect(useProductStore.getState().filter).toEqual(filter);
    });

    it('should update the filter', () => {
      useProductStore.setState({ filter: { name: 'name' } });
      const filter = {};

      useProductStore.getState().setFilter(filter);
      expect(useProductStore.getState().filter).toEqual(filter);
    });
  });

  describe('getFilteredProducts', () => {
    it('should return filtered products', () => {
      useProductStore.setState({ products: mockProductListResponse.items, filter: { name: 'Product 1' } });

      const product = useProductStore.getState().getFilteredProducts();
      expect(product).toEqual([mockProductListResponse.items[0]]);
    });

    it('should return no products if filter does not match', () => {
      useProductStore.setState({ products: mockProductListResponse.items, filter: { name: 'Product 999' } });

      const product = useProductStore.getState().getFilteredProducts();
      expect(product).toEqual([]);
    });

    it('should return all products if no filter set', () => {
      useProductStore.setState({ products: mockProductListResponse.items, filter: {} });

      const product = useProductStore.getState().getFilteredProducts();
      expect(product).toEqual(mockProductListResponse.items);
    });
  });
});
