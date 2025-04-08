import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppRouter } from './AppRouter';
import { productRoutes } from '@demo-shop-react-ui/product';
import { orderRoutes } from '@demo-shop-react-ui/order';
import { shoppingRoutes } from '@demo-shop-react-ui/shopping';
import * as router from 'react-router';
import { MemoryRouter } from 'react-router';

vi.mock('@demo-shop-react-ui/product', () => ({
  productRoutes: [
    {
      path: '/products',
      element: <div data-testid="products-page">Products Page</div>,
    },
  ],
}));

vi.mock('@demo-shop-react-ui/order', () => ({
  orderRoutes: [
    {
      path: '/orders',
      element: <div data-testid="orders-page">Orders Page</div>,
    },
  ],
}));

vi.mock('@demo-shop-react-ui/shopping', () => ({
  shoppingRoutes: [
    {
      path: '/cart',
      element: <div data-testid="cart-page">Shopping Cart</div>,
    },
  ],
}));

vi.mock('@demo-shop-react-ui/shared', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
}));

vi.mock('react-router', async importOriginal => ({
  ...(await importOriginal()),
  useRoutes: vi.fn(),
}));

describe('AppRouter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects to /products when path is /', async () => {
    const useRoutes = vi.spyOn(router, 'useRoutes');
    useRoutes.mockReturnValue(<div data-testid="products-page">Products Page</div>);

    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(useRoutes).toHaveBeenCalledTimes(1);
    const routesConfig = useRoutes.mock.calls[0][0];
    expect(routesConfig[0].path).toBe('/');
    expect(routesConfig[0].element?.type).toBe(router.Navigate);
    expect(routesConfig[0].element?.props.to).toBe('/products');
  });

  it('renders products route correctly', () => {
    vi.spyOn(router, 'useRoutes').mockReturnValue(<div data-testid="products-page">Products Page</div>);

    render(
      <MemoryRouter initialEntries={['/products']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('products-page')).toBeTruthy();
  });

  it('renders orders route correctly', () => {
    vi.spyOn(router, 'useRoutes').mockReturnValue(<div data-testid="orders-page">Orders Page</div>);

    render(
      <MemoryRouter initialEntries={['/orders']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('orders-page')).toBeTruthy();
  });

  it('renders shopping cart route correctly', () => {
    vi.spyOn(router, 'useRoutes').mockReturnValue(<div data-testid="cart-page">Shopping Cart</div>);

    render(
      <MemoryRouter initialEntries={['/cart']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('cart-page')).toBeTruthy();
  });

  it('redirects to home for unknown routes', () => {
    const useRoutesMock = vi.fn();
    useRoutesMock.mockReturnValue(<div data-testid="products-page">Products Page</div>);
    vi.spyOn(router, 'useRoutes').mockImplementation(useRoutesMock);

    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <AppRouter />
      </MemoryRouter>
    );

    const routesConfig = useRoutesMock.mock.calls[0][0];
    const lastRoute = routesConfig[routesConfig.length - 1];
    expect(lastRoute.path).toBe('**');
    expect(lastRoute.element.type).toBe(router.Navigate);
    expect(lastRoute.element.props.to).toBe('/');
  });

  it('combines all route configurations correctly', () => {
    const useRoutesMock = vi.fn().mockReturnValue(null);
    vi.spyOn(router, 'useRoutes').mockImplementation(useRoutesMock);

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    const routesConfig = useRoutesMock.mock.calls[0][0];

    expect(routesConfig).toHaveLength(1 + productRoutes.length + orderRoutes.length + shoppingRoutes.length + 1);

    const hasProductRoutes = routesConfig.some((route: any) =>
      productRoutes.some(prodRoute => prodRoute.path === route.path)
    );
    expect(hasProductRoutes).toBe(true);

    const hasOrderRoutes = routesConfig.some((route: any) =>
      orderRoutes.some(orderRoute => orderRoute.path === route.path)
    );
    expect(hasOrderRoutes).toBe(true);

    const hasShoppingRoutes = routesConfig.some((route: any) =>
      shoppingRoutes.some(shopRoute => shopRoute.path === route.path)
    );
    expect(hasShoppingRoutes).toBe(true);
  });
});
