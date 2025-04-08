import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import OrderDetail from './OrderDetail';
import { useParams } from 'react-router';
import { generatePdf } from '../../services/printInvoiceService';
import { OrderResponse, OrderStatus, UserResponse } from '@demo-shop-react-ui/api';

vi.mock('react-router', () => ({
  useParams: vi.fn(),
  Link: ({ to, children, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

const fetchOrderByIdSpy = vi.fn();
const getOrderByIdSpy = vi.fn();

vi.mock('../../+state/useOrderStore', () => ({
  useOrderStore: vi.fn().mockImplementation(selector => {
    const store = {
      fetchOrderById: fetchOrderByIdSpy,
      getOrderById: getOrderByIdSpy,
    };
    return selector(store);
  }),
}));

vi.mock('@demo-shop-react-ui/user', () => ({
  useUserStore: vi.fn().mockReturnValue({
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    address: {
      street: '123 Main St',
      apartment: 'Apt 4B',
      zip: '12345',
      city: 'New York',
      region: 'NY',
      country: 'USA',
    },
    email: 'email',
    phone: '1234567890',
  }),
}));

vi.mock('../../services/printInvoiceService', () => ({
  generatePdf: vi.fn(),
}));

vi.mock('@demo-shop-react-ui/shared', async importOriginal => ({
  ...(await importOriginal()),
  DateTime: ({ dateTime }: any) => <span data-testid="date-time">{dateTime.toISOString()}</span>,
}));

vi.mock('../OrderStatusBadge/OrderStatusBadge', () => ({
  OrderStatusBadge: ({ status }: any) => <span data-testid="status-badge">{status}</span>,
}));

describe('OrderDetail', () => {
  const mockOrder: OrderResponse = {
    id: 12345,
    userId: 1,
    status: OrderStatus.Created,
    created: new Date('2023-04-01T12:00:00Z'),
    items: [
      {
        productId: 1,
        productName: 'Test Product',
        productThumbnail: '/test-image.jpg',
        quantity: 2,
        unitPrice: 19.99,
        totalPrice: 39.98,
      },
    ],
    amount: 39.98,
  };

  const mockUser: UserResponse = {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    address: {
      street: '123 Main St',
      apartment: 'Apt 4B',
      zip: '12345',
      city: 'New York',
      region: 'NY',
      country: 'USA',
    },
    email: 'email',
    phone: '1234567890',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useParams).mockReturnValue({ id: '12345' });
    getOrderByIdSpy.mockReturnValue(mockOrder);
  });

  it('fetches order data on mount', () => {
    render(<OrderDetail />);
    expect(fetchOrderByIdSpy).toHaveBeenCalledWith(12345);
  });

  it('matches the snapshot', () => {
    const { baseElement } = render(<OrderDetail />);
    expect(baseElement).toMatchSnapshot();
  });

  it('displays not found page when id is not provided', () => {
    vi.mocked(useParams).mockReturnValue({});
    render(<OrderDetail />);
    expect(screen.getByText('Page not found')).toBeTruthy();
  });

  it('displays page not found when order or user data is not available', () => {
    fetchOrderByIdSpy.mockReturnValue(null);
    getOrderByIdSpy.mockReturnValue(undefined);
    render(<OrderDetail />);
    expect(screen.getByText('Page not found')).toBeTruthy();
  });

  it('displays order details correctly when data is available', () => {
    render(<OrderDetail />);

    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('123 Main St Apt 4B')).toBeTruthy();
    expect(screen.getByText('12345 New York, NY')).toBeTruthy();
    expect(screen.getByText('USA')).toBeTruthy();

    expect(screen.getByText('Order #12345')).toBeTruthy();
    expect(screen.getByTestId('date-time')).toBeTruthy();
    expect(screen.getByTestId('status-badge')).toBeTruthy();

    expect(screen.getByText('#1 Test Product')).toBeTruthy();
    expect(screen.getByText('Qty 2')).toBeTruthy();
    expect((screen.getByAltText('Test Product') as HTMLImageElement).src).toMatch(/test-image.jpg/);

    const priceElements = screen.getAllByText(/\$\d+\.\d+/);
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it('calls generatePdf when "Print" button is clicked', () => {
    render(<OrderDetail />);
    const printButton = screen.getByText('Print');

    fireEvent.click(printButton);

    expect(generatePdf).toHaveBeenCalledWith(mockOrder, mockUser);
  });

  it('links to product detail page correctly', () => {
    render(<OrderDetail />);
    const productLink: HTMLLinkElement = screen.getByRole('link');

    expect(productLink.href).toMatch(/products\/1/);
  });
});
