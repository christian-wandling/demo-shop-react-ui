import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { NavigationBar } from './NavigationBar';
import { MemoryRouter } from 'react-router';
import { UserNavigationProps } from '../../../models/userNavigationProps';
import { RouteItem } from '../../../models/routeItem';
import { NavigationBarProps } from '../../../models/navigationBarProps';

vi.mock('@demo-shop-react-ui/product', () => ({
  ProductSearch: () => <div data-testid="product-search">Product Search</div>,
}));

vi.mock('../UserNavigation/UserNavigation', () => ({
  UserNavigation: ({ user }: UserNavigationProps) => (
    <div data-testid="navigation-bar-user-section">{user ? 'Logged in' : 'Not logged in'}</div>
  ),
}));

describe('NavigationBar', () => {
  const mockProps: NavigationBarProps = {
    user: {
      email: 'test@example.com',
      id: 0,
      firstname: 'firstname',
      lastname: 'lastname',
      phone: null,
    },
    items: [new RouteItem('products', 101, { route: 'products' }), new RouteItem('orders', 102, { route: 'orders' })],
    selectedItem: 'products',
    onOpenSideNavigation: vi.fn(),
    onSelectedItemChange: vi.fn(),
    onLogin: vi.fn(),
    onRegister: vi.fn(),
    onLogout: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <NavigationBar {...mockProps} />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('displays the correct navigation items', () => {
    render(
      <MemoryRouter>
        <NavigationBar {...mockProps} />
      </MemoryRouter>
    );

    expect(screen.getByText('Products')).toBeTruthy();
    expect(screen.getByText('Orders')).toBeTruthy();
  });

  it('highlights the selected item', () => {
    render(
      <MemoryRouter>
        <NavigationBar {...mockProps} />
      </MemoryRouter>
    );

    const homeLink = screen.getByText('Products');
    const productsLink = screen.getByText('Orders');

    expect(homeLink.className).toContain('text-indigo-600');
    expect(productsLink.className).toContain('text-gray-700');
  });

  it('calls onSelectedItemChange when a navigation item is clicked', () => {
    render(
      <MemoryRouter>
        <NavigationBar {...mockProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Products'));
    expect(mockProps.onSelectedItemChange).toHaveBeenCalledWith('products');
  });

  it('calls onOpenSideNavigation when the hamburger button is clicked', () => {
    render(
      <MemoryRouter>
        <NavigationBar {...mockProps} />
      </MemoryRouter>
    );

    const hamburgerButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(hamburgerButton);
    expect(mockProps.onOpenSideNavigation).toHaveBeenCalled();
  });

  it('renders the logo with correct link', () => {
    render(
      <MemoryRouter>
        <NavigationBar {...mockProps} />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Demo shop logo')).toBeTruthy();
  });

  it('renders ProductSearch component', () => {
    render(
      <MemoryRouter>
        <NavigationBar {...mockProps} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('product-search')).toBeTruthy();
  });

  it('renders NavigationBarUserSection with correct props', () => {
    render(
      <MemoryRouter>
        <NavigationBar {...mockProps} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('navigation-bar-user-section')).toBeTruthy();
  });

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(
        <MemoryRouter>
          <NavigationBar {...mockProps} />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
