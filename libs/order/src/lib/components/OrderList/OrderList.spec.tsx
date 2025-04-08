import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import OrderList from './OrderList';
import { useUserStore } from '@demo-shop-react-ui/user';
import { useOrderStore } from '../../+state/useOrderStore';
import { useNavigate } from 'react-router';

vi.mock('react-router', () => ({
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  useNavigate: vi.fn(),
}));

vi.mock('@demo-shop-react-ui/user', () => ({
  useUserStore: vi.fn(),
}));

vi.mock('../../+state/useOrderStore', () => ({
  useOrderStore: vi.fn(),
}));

vi.mock('@demo-shop-react-ui/shared', async importOriginal => ({
  ...(await importOriginal()),
  DateTime: ({ dateTime, className }: any) => <div className={className}>{dateTime}</div>,
}));

describe('OrderList', () => {
  const mockUser = {
    firstname: 'John',
    lastname: 'Doe',
    address: {
      street: '123 Main St',
      apartment: 'Apt 4B',
      zip: '12345',
      city: 'Springfield',
      region: 'IL',
      country: 'USA',
    },
  };

  const mockOrders = [
    {
      id: '1001',
      status: 'delivered',
      amount: 249.99,
      created: '2023-06-15T10:30:00Z',
      items: [
        {
          productId: 'p101',
          productName: 'Test Product 1',
          productThumbnail: '/test1.jpg',
        },
        {
          productId: 'p102',
          productName: 'Test Product 2',
          productThumbnail: '/test2.jpg',
        },
      ],
    },
    {
      id: '1002',
      status: 'processing',
      amount: 99.5,
      created: '2023-06-20T14:20:00Z',
      items: [
        {
          productId: 'p103',
          productName: 'Test Product 3',
          productThumbnail: '/test3.jpg',
        },
      ],
    },
  ];

  const mockNavigate = vi.fn();
  const mockFetchOrders = vi.fn();
  const mockGetSortedOrders = vi.fn().mockReturnValue(mockOrders);

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useUserStore).mockReturnValue(mockUser);
    vi.mocked(useOrderStore).mockImplementation(selector => {
      if (selector.toString().includes('fetchOrders')) return mockFetchOrders;
      if (selector.toString().includes('getSortedOrders')) return mockGetSortedOrders;
      return mockOrders;
    });
  });

  it('fetches orders on mount', () => {
    render(<OrderList />);
    expect(mockFetchOrders).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { baseElement } = render(<OrderList />);

    expect(baseElement).toMatchSnapshot();
  });

  it('displays user information correctly', () => {
    render(<OrderList />);
    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('123 Main St Apt 4B')).toBeTruthy();
    expect(screen.getByText('12345 Springfield, IL')).toBeTruthy();
    expect(screen.getByText('USA')).toBeTruthy();
  });

  it('displays order list with correct number of orders', () => {
    render(<OrderList />);
    const orderElements = screen.getAllByText(/Order #/);
    expect(orderElements).toHaveLength(2);
    expect(screen.getByText('Order #1001')).toBeTruthy();
    expect(screen.getByText('Order #1002')).toBeTruthy();
  });

  it('displays correct order amount', () => {
    render(<OrderList />);
    expect(screen.getByText('$249.99')).toBeTruthy();
    expect(screen.getByText('$99.50')).toBeTruthy();
  });

  it('navigates to order details when clicking an order', () => {
    render(<OrderList />);
    const firstOrder: HTMLLIElement = screen.getByText('Order #1001').closest('li')!;

    fireEvent.click(firstOrder);

    expect(mockNavigate).toHaveBeenCalledWith('./1001');
  });

  it('limits product thumbnails to MAX_THUMBNAILS', () => {
    const manyItemsOrder = {
      id: '1003',
      status: 'delivered',
      amount: 599.99,
      created: '2023-06-25T09:15:00Z',
      items: Array.from({ length: 8 }).map((_, i) => ({
        productId: `p${200 + i}`,
        productName: `Test Product ${200 + i}`,
        productThumbnail: `/test${200 + i}.jpg`,
      })),
    };

    mockGetSortedOrders.mockReturnValue([manyItemsOrder]);

    render(<OrderList />);

    expect(screen.getByText('+4')).toBeTruthy();
  });
});
