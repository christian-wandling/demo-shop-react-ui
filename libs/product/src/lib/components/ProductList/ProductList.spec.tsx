import { render, screen } from '@testing-library/react';

import ProductList from './ProductList';
import { beforeEach, expect, it, vi } from 'vitest';
import { ProductResponse } from '@demo-shop-react-ui/api';
import { act } from 'react';

vi.mock('react-router', () => ({
  useParams: vi.fn().mockReturnValue({ id: '1' }),
}));

vi.mock('./ProductCard', () => ({
  ProductCard: vi.fn(({ product }) => <div data-testid="product-card">{product.name}</div>),
}));

const fetchProductsSpy = vi.fn();
const getFilteredProductsSpy = vi.fn();

vi.mock('../../+state/useProductStore', () => ({
  useProductStore: vi.fn().mockImplementation(selector => {
    const store = {
      fetchProducts: fetchProductsSpy,
      getFilteredProducts: getFilteredProductsSpy,
    };
    return selector(store);
  }),
}));

vi.mock('@demo-shop-react-ui/shared', () => ({
  formatCurrency: vi.fn(price => `$${price.toFixed(2)}`),
}));

describe('ProductList', () => {
  const mockProducts: ProductResponse[] = [
    {
      categories: ['category'],
      thumbnail: { name: 'name', uri: 'test-image.jpg' },
      id: 1,
      name: 'Test Product 1',
      price: 99.99,
      description: 'This is a test product description',
      images: [{ name: 'name', uri: 'test-image.jpg' }],
    },
    {
      categories: ['category'],
      thumbnail: { name: 'name', uri: 'test-image.jpg' },
      id: 2,
      name: 'Test Product 2',
      price: 99.99,
      description: 'This is a test product description',
      images: [{ name: 'name', uri: 'test-image.jpg' }],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    getFilteredProductsSpy.mockReturnValue(mockProducts);
  });

  it('should render successfully', () => {
    const { baseElement } = render(<ProductList />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const { baseElement } = render(<ProductList />);
    expect(baseElement).toMatchSnapshot();
  });

  it('calls fetchProducts on mount', async () => {
    await act(async () => {
      render(<ProductList />);
    });
    expect(fetchProductsSpy).toHaveBeenCalled();
  });

  it('renders product cards when products are available', () => {
    render(<ProductList />);
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(mockProducts.length);

    expect(productCards.length).toBe(mockProducts.length);
  });

  it('renders no products when the product list is empty', () => {
    getFilteredProductsSpy.mockReturnValue([]);

    render(<ProductList />);
    expect(screen.queryByTestId('product-card')).toBeNull();
  });
});
