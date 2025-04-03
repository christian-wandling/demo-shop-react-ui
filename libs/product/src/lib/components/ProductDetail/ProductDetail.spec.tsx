import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductDetail } from './ProductDetail';
import { ProductResponse } from '@demo-shop-react-ui/api';

vi.mock('react-router', () => ({
  useParams: vi.fn().mockReturnValue({ id: '1' }),
}));

const fetchProductByIdSpy = vi.fn();
const getProductByIdSpy = vi.fn();

vi.mock('../../+state/useProductStore', () => ({
  useProductStore: vi.fn().mockImplementation(selector => {
    const store = {
      fetchProductById: fetchProductByIdSpy,
      getProductById: getProductByIdSpy,
    };
    return selector(store);
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

  beforeEach(() => {
    vi.clearAllMocks();

    getProductByIdSpy.mockReturnValue(mockProduct);
  });

  it('should render successfully', () => {
    const { baseElement } = render(<ProductDetail />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const { baseElement } = render(<ProductDetail />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should display product details when product is available', () => {
    render(<ProductDetail />);

    expect(screen.getByText('Test Product')).toBeTruthy();
    expect(screen.getByText('$99.99')).toBeTruthy();
    expect(screen.getByText('This is a test product description')).toBeTruthy();

    const productImage: HTMLImageElement = screen.getByAltText('Test Product');
    expect(productImage).toBeTruthy();
    expect(productImage.src).toContain('test-image.jpg');
  });

  it('should show loading state when product is not available', () => {
    getProductByIdSpy.mockReturnValue(undefined);

    render(<ProductDetail />);

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('should call fetchProductById with the correct ID', () => {
    render(<ProductDetail />);

    expect(fetchProductByIdSpy).toHaveBeenCalledWith(1);
  });

  it('should disable the "Add to cart" button', () => {
    fetchProductByIdSpy.mockReturnValue(undefined);
    render(<ProductDetail />);

    const addToCartButton: HTMLButtonElement = screen.getByText('Add to cart');
    expect(addToCartButton.disabled).toBe(true);
  });

  it('should display the placeholder image if the product image fails to load', async () => {
    render(<ProductDetail />);

    const productImage: HTMLImageElement = screen.getByAltText('Test Product');
    expect(productImage).toBeTruthy();

    productImage.dispatchEvent(new Event('error'));
    expect(productImage.src).toContain('images/placeholder-image.jpg');
  });
});
