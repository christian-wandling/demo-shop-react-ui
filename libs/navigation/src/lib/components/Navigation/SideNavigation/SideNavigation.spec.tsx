import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SideNavigation } from './SideNavigation';
import { MemoryRouter } from 'react-router';
import { SideNavigationProps } from '../../../models/sideNavigationProps';
import { RouteItem } from '../../../models/routeItem';

vi.mock('framer-motion', () => ({
  motion: {
    dialog: ({ children, onClick, onKeyDown, className }: any) => (
      <dialog onClick={onClick} onKeyDown={onKeyDown} className={className}>
        {children}
      </dialog>
    ),
    div: ({ children, className }: any) => <div className={className}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

vi.mock('../UserNavigation/UserNavigation', () => ({
  UserNavigation: ({ user }: any) => (
    <div data-testid="navigation-slide-over-user-section">{user ? `Logged in as ${user.name}` : 'Not logged in'}</div>
  ),
}));

describe('SideNavigation', () => {
  const mockProps: SideNavigationProps = {
    user: {
      email: 'test@example.com',
      id: 0,
      firstname: 'firstname',
      lastname: 'lastname',
      phone: null,
    },
    items: [new RouteItem('products', 101, { route: 'products' }), new RouteItem('orders', 102, { route: 'orders' })],
    selectedItem: 'products',
    isOpen: true,
    onSetOpen: vi.fn(),
    onSelectedItemChange: vi.fn(),
    onLogin: vi.fn(),
    onRegister: vi.fn(),
    onLogout: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(
      <MemoryRouter>
        <SideNavigation {...mockProps} />
      </MemoryRouter>
    );

    expect(screen.getByText('Products')).toBeTruthy();
    expect(screen.getByText('Orders')).toBeTruthy();
    expect(screen.getByTestId('navigation-slide-over-user-section')).toBeTruthy();
  });

  it('does not render when isOpen is false', () => {
    render(
      <MemoryRouter>
        <SideNavigation {...mockProps} isOpen={false} />
      </MemoryRouter>
    );

    expect(screen.queryByText('Products')).not.toBeTruthy();
    expect(screen.queryByText('Orders')).not.toBeTruthy();
  });

  it('calls onSetOpen with false when close button is clicked', () => {
    render(
      <MemoryRouter>
        <SideNavigation {...mockProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockProps.onSetOpen).toHaveBeenCalledWith(false);
  });

  it('calls onSetOpen with false when backdrop is clicked', () => {
    render(
      <MemoryRouter>
        <SideNavigation {...mockProps} />
      </MemoryRouter>
    );

    const backdrop = screen.getByTestId('dialog');
    fireEvent.click(backdrop);

    expect(mockProps.onSetOpen).toHaveBeenCalledWith(false);
  });

  it('applies active styling to selected item', () => {
    render(
      <MemoryRouter>
        <SideNavigation {...mockProps} />
      </MemoryRouter>
    );

    const homeLink = screen.getByText('Products');
    const aboutLink = screen.getByText('Orders');

    expect(homeLink.className).toContain('text-indigo-600');
    expect(aboutLink.className).not.toContain('text-indigo-600');
  });

  it('calls onSelectedItemChange and onSetOpen when a navigation item is clicked', () => {
    render(
      <MemoryRouter>
        <SideNavigation {...mockProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Orders'));

    expect(mockProps.onSelectedItemChange).toHaveBeenCalledWith('orders');
    expect(mockProps.onSetOpen).toHaveBeenCalledWith(false);
  });

  describe('Snapshots', () => {
    it('matches snapshot when open', () => {
      const { container } = render(
        <MemoryRouter>
          <SideNavigation {...mockProps} />
        </MemoryRouter>
      );
      expect(container).toMatchSnapshot();
    });

    it('matches snapshot when closed', () => {
      const { container } = render(
        <MemoryRouter>
          <SideNavigation {...mockProps} isOpen={false} />
        </MemoryRouter>
      );
      expect(container).toMatchSnapshot();
    });

    it('matches snapshot without a user (logged out state)', () => {
      const propsWithoutUser = { ...mockProps, user: null };

      const { container } = render(
        <MemoryRouter>
          <SideNavigation {...propsWithoutUser} />
        </MemoryRouter>
      );
      expect(container).toMatchSnapshot();
    });
  });
});
