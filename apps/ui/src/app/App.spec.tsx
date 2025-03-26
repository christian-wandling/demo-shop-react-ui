import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { App } from './App';
import { vi } from 'vitest';

const mockInitialize = vi.fn();
const mockStore = {
  isInitialized: false,
  initialize: mockInitialize,
};

vi.mock('./+state/useAppStore', () => ({
  useAppStore: (selector: any) => selector(mockStore),
}));

vi.mock('@demo-shop-react-ui/product', () => ({
  ProductList: vi.fn(() => <div data-testid="product-list"></div>),
  ProductDetail: vi.fn(() => <div data-testid="product-detail"></div>),
}));

vi.mock('@demo-shop-react-ui/navigation', async importOriginal => {
  return {
    ...(await importOriginal()),
    Navigation: vi.fn(() => <div data-testid="navigation"></div>),
  };
});

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading spinner when not initialized', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeTruthy();
    expect(screen.getByText('Loading...')).toBeTruthy();
    expect(mockInitialize).toHaveBeenCalledTimes(1);
  });

  it('should render app content when initialized', () => {
    mockStore.isInitialized = true;

    const { baseElement } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(baseElement).toBeTruthy();
    expect(screen.queryByRole('status')).not.toBeTruthy();
    expect(screen.getByTestId('navigation')).toBeTruthy();
    expect(mockInitialize).toHaveBeenCalledTimes(1);
  });

  it('should redirect from / to /products', () => {
    mockStore.isInitialized = true;

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('product-list')).toBeTruthy();
  });

  it('should render ProductList on /products route', () => {
    mockStore.isInitialized = true;

    render(
      <MemoryRouter initialEntries={['/products']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('product-list')).toBeTruthy();
  });

  it('should render ProductDetail on /products/:id route', () => {
    mockStore.isInitialized = true;

    render(
      <MemoryRouter initialEntries={['/products/123']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('product-detail')).toBeTruthy();
  });

  it('should call initialize only once when mounted', () => {
    mockStore.isInitialized = true;

    const { rerender } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(mockInitialize).toHaveBeenCalledTimes(1);

    // Rerender should not call initialize again
    rerender(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(mockInitialize).toHaveBeenCalledTimes(1);
  });
});
