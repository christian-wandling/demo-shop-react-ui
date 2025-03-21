import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import ProductCard from './ProductCard';
import { ProductResponse } from '@demo-shop-react-ui/api';

import { vi } from 'vitest';

vi.mock('../utils/formatters', () => ({
  formatCurrency: vi.fn(price => `$${price.toFixed(2)}`),
}));

describe('ProductCard', () => {
  const mockProduct: ProductResponse = {
    categories: ['category'],
    description: 'description',
    id: 1,
    images: [
      {
        name: 'thumbnail',
        uri: 'https://example.com/thumbnail.jpg',
      },
    ],
    name: 'Test Product',
    price: 19.99,
    thumbnail: {
      name: 'thumbnail',
      uri: 'https://example.com/thumbnail.jpg',
    },
  };

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  it('renders the product card successfully', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeTruthy();
  });

  it('displays the correct product name', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeTruthy();
  });

  it('displays the formatted price correctly', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    expect(screen.getByText('$19.99')).toBeTruthy();
  });

  it('renders the product image with correct src', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    const image: HTMLImageElement = screen.getByAltText('Test Product');
    expect(image).toBeTruthy();
    expect(image.src).toBe('https://example.com/thumbnail.jpg');
  });

  it('links to the correct product detail page', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    const link: HTMLLinkElement = screen.getByRole('link');
    expect(link.href).toContain('/products/1');
  });
});
