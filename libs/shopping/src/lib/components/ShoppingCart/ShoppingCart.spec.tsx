import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ShoppingCart } from './ShoppingCart';
import { useShoppingCartStore } from '../../+state/useShoppingCartStore';
import { CartItemsProps } from '../../models/cartItemsProps';

vi.mock('react-router', () => ({
  Link: ({ children, onClick }: any) => (
    <a href="#" onClick={onClick}>
      {children}
    </a>
  ),
}));

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: any) => <div data-testid="animate-presence">{children}</div>,
  motion: {
    div: ({ children, ...props }: any) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

vi.mock('../CartItems/CartItems', () => ({
  CartItems: ({ items, onRemoveItem }: CartItemsProps) => <div data-testid="cart-items"></div>,
}));

vi.mock('@demo-shop-react-ui/shopping', () => ({
  useShoppingCartStore: vi.fn(),
}));

vi.mock('@demo-shop-react-ui/shared', () => ({
  formatCurrency: (amount: number) => `$${amount.toFixed(2)}`,
}));

describe('ShoppingCart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when showCart is false', () => {
    useShoppingCartStore.setState({ showCart: false });

    const { container } = render(<ShoppingCart />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the shopping cart when showCart is true', () => {
    useShoppingCartStore.setState({ showCart: true });

    render(<ShoppingCart />);
    expect(screen.getByText('Shopping cart')).toBeTruthy();
  });

  it('displays the correct total price', () => {
    useShoppingCartStore.setState({ showCart: true, getTotalPrice: vi.fn().mockReturnValue(99.99) });

    render(<ShoppingCart />);
    expect(screen.getByText('$99.99')).toBeTruthy();
  });

  it('closes cart when close button is clicked', () => {
    const spy = vi.spyOn(useShoppingCartStore.getState(), 'setShowCart');
    useShoppingCartStore.setState({ showCart: true });

    render(<ShoppingCart />);
    fireEvent.click(screen.getByText('Close panel').nextElementSibling!);
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('closes cart when "Continue Shopping" is clicked', () => {
    const spy = vi.spyOn(useShoppingCartStore.getState(), 'setShowCart');
    useShoppingCartStore.setState({ showCart: true });

    render(<ShoppingCart />);
    fireEvent.click(screen.getByText('Continue Shopping'));
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('closes cart when Escape key is pressed', () => {
    const spy = vi.spyOn(useShoppingCartStore.getState(), 'setShowCart');
    useShoppingCartStore.setState({ showCart: true });

    render(<ShoppingCart />);
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(spy).toHaveBeenCalledWith(false);
  });

  describe('SnapShots', () => {
    it('should match the snapshot when cart is hidden', () => {
      useShoppingCartStore.setState({ showCart: false });

      const { baseElement } = render(<ShoppingCart />);
      expect(baseElement).toMatchSnapshot();
    });

    it('should match the snapshot when cart is in view', () => {
      useShoppingCartStore.setState({ showCart: true });

      const { baseElement } = render(<ShoppingCart />);
      expect(baseElement).toMatchSnapshot();
    });
  });
});
