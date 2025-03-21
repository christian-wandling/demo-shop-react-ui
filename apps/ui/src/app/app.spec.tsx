import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import App from './app';
import { vi } from 'vitest';

vi.mock('@demo-shop-react-ui/product', () => ({
  ProductList: vi.fn(() => <div data-testid="product-list"></div>),
  ProductDetail: vi.fn(() => <div data-testid="product-detail"></div>),
}));

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should redirect from / to /products', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('product-list')).toBeTruthy();
  });

  it('should render ProductList on /products route', () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('product-list')).toBeTruthy();
  });

  it('should render ProductDetail on /products/:id route', () => {
    render(
      <MemoryRouter initialEntries={['/products/123']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('product-detail')).toBeTruthy();
  });
});
