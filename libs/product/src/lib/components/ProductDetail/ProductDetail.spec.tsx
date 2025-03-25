import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductDetail from './ProductDetail';
import { useProductStore } from '../../+state/useProductStore';
import { ProductResponse } from '@demo-shop-react-ui/api';

vi.mock('react-router', () => ({
  useParams: vi.fn().mockReturnValue({ id: '1' }),
}));

vi.mock('../../+state/ProductStore', () => ({
  useProductStore: vi.fn().mockReturnValue({
    fetchProductById: vi.fn(),
    getProductById: vi.fn(),
  }),
}));

vi.mock('@demo-shop-react-ui/shared', () => ({
  formatCurrency: vi.fn(price => `$${price.toFixed(2)}`),
}));

describe('ProductDetail', () => {
  const mockProduct: ProductResponse = {
    categories: ['category'],
    thumbnail: { name: 'name', uri: 'test-image.jpg' },
    id: 1,
    name: 'Test Product',
    price: 99.99,
    description: 'This is a test product description',
    images: [{ name: 'name', uri: 'test-image.jpg' }],
  };

  const store = useProductStore();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display product details when product is available', () => {
    const getProductById = vi.spyOn(store, 'getProductById');
    getProductById.mockReturnValue(mockProduct);

    render(<ProductDetail />);

    // Check product details are displayed
    expect(screen.getByText('Test Product')).toBeTruthy();
    expect(screen.getByText('$99.99')).toBeTruthy();
    expect(screen.getByText('This is a test product description')).toBeTruthy();

    // Check image is displayed
    const productImage: HTMLImageElement = screen.getByAltText('Test Product');
    expect(productImage).toBeTruthy();
    expect(productImage.src).toContain('test-image.jpg');
  });

  it('should show loading state when product is not available', () => {
    vi.spyOn(store, 'getProductById').mockReturnValue(undefined);

    render(<ProductDetail />);

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('should call fetchProductById with the correct ID', () => {
    const fetchProductById = vi.spyOn(store, 'fetchProductById');

    render(<ProductDetail />);

    expect(fetchProductById).toHaveBeenCalledWith(1);
  });

  it('should disable the "Add to cart" button', () => {
    vi.spyOn(store, 'getProductById').mockReturnValue(mockProduct);

    render(<ProductDetail />);

    const addToCartButton: HTMLButtonElement = screen.getByText('Add to cart');
    expect(addToCartButton.disabled).toBe(true);
  });

  it('should display the placeholder image if the product image fails to load', async () => {
    vi.spyOn(store, 'getProductById').mockReturnValue(mockProduct);

    render(<ProductDetail />);

    const productImage: HTMLImageElement = screen.getByAltText('Test Product');
    expect(productImage).toBeTruthy();

    productImage.dispatchEvent(new Event('error'));
    expect(productImage.src).toContain('images/placeholder-image.jpg');
  });
});
