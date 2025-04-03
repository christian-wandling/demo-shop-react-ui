import { fireEvent, render, screen } from '@testing-library/react';
import { OrderSummary } from './OrderSummary';
import { formatCurrency } from '@demo-shop-react-ui/shared';
import { OrderSummaryProps } from '../../models/orderSummaryProps';

// Mock dependencies
vi.mock('@demo-shop-react-ui/shared', () => ({
  formatCurrency: vi.fn(value => `$${value.toFixed(2)}`),
}));

vi.mock('../CartItems/CartItems', () => ({
  CartItems: vi.fn(() => <div data-testid="cart-items-mock" />),
}));

describe('OrderSummary', () => {
  const defaultProps: OrderSummaryProps = {
    items: [
      {
        id: 1,
        quantity: 1,
        productId: 1,
        productName: 'productName',
        productThumbnail: 'productThumbnail',
        unitPrice: 10,
        totalPrice: 10,
      },
    ],
    totalPrice: 10.99,
    onRemoveItem: vi.fn(),
    onCheckout: vi.fn(),
    checkoutButtonEnabled: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with correct title', () => {
    render(<OrderSummary {...defaultProps} />);
    expect(screen.getByText('Order Summary')).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const { baseElement } = render(<OrderSummary {...defaultProps} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('displays the formatted total price', () => {
    render(<OrderSummary {...defaultProps} />);

    expect(screen.getByText('Total')).toBeTruthy();
    expect(formatCurrency).toHaveBeenCalledWith(defaultProps.totalPrice);
    expect(screen.getByText('$10.99')).toBeTruthy();
  });

  it('renders enabled checkout button when checkoutButtonEnabled is true', () => {
    render(<OrderSummary {...defaultProps} />);

    const checkoutButton: HTMLButtonElement = screen.getByText('Checkout');
    expect(checkoutButton).toBeTruthy();
    expect(checkoutButton.disabled).toBeFalsy();
    expect(checkoutButton.classList).toContain('bg-indigo-600');
    expect(checkoutButton.classList).not.toContain('pointer-events-none');
  });

  it('renders disabled checkout button when checkoutButtonEnabled is false', () => {
    render(<OrderSummary {...defaultProps} checkoutButtonEnabled={false} />);

    const checkoutButton: HTMLButtonElement = screen.getByText('Checkout');
    expect(checkoutButton).toBeTruthy();
    expect(checkoutButton.disabled).toBeTruthy();
    expect(checkoutButton.classList).toContain('bg-gray-200');
    expect(checkoutButton.classList).toContain('pointer-events-none');
  });

  it('calls onCheckout when checkout button is clicked', () => {
    render(<OrderSummary {...defaultProps} />);

    const checkoutButton = screen.getByText('Checkout');
    fireEvent.click(checkoutButton);

    expect(defaultProps.onCheckout).toHaveBeenCalledTimes(1);
  });

  it('does not call onCheckout when disabled button is clicked', () => {
    render(<OrderSummary {...defaultProps} checkoutButtonEnabled={false} />);

    const checkoutButton = screen.getByText('Checkout');
    fireEvent.click(checkoutButton);

    expect(defaultProps.onCheckout).not.toHaveBeenCalled();
  });

  it('renders with zero total price', () => {
    render(<OrderSummary {...defaultProps} totalPrice={0} />);

    expect(formatCurrency).toHaveBeenCalledWith(0);
    expect(screen.getByText('$0.00')).toBeTruthy();
  });
});
