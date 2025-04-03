import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Checkout } from './Checkout';
import { useShoppingCartStore } from '../../+state/useShoppingCartStore';
import { CartItemResponse, UserResponse } from '@demo-shop-react-ui/api';
import { useUserStore } from '@demo-shop-react-ui/user';
import { useForm } from 'react-hook-form';

const navigateMock = vi.fn();

vi.mock('react-router', () => ({
  useNavigate: () => navigateMock,
}));

vi.mock('react-hook-form', () => ({
  useForm: vi.fn().mockReturnValue({
    reset: vi.fn(),
    getValues: vi.fn().mockReturnValue({
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
      address: {
        country: 'USA',
        street: 'Main St',
        apartment: 'Apt 1',
        city: 'New York',
        region: 'NY',
        zip: '10001',
      },
    }),
    formState: {
      isDirty: false,
      dirtyFields: {},
    },
  } as any),
}));

const mockItems: CartItemResponse[] = [
  {
    id: 1,
    productName: 'Product 1',
    productThumbnail: 'productThumbnail1',
    unitPrice: 10,
    quantity: 1,
    totalPrice: 10,
    productId: 1,
  },
  {
    id: 2,
    productName: 'Product 2',
    productThumbnail: 'productThumbnail2',
    unitPrice: 20,
    quantity: 2,
    totalPrice: 40,
    productId: 2,
  },
];

const checkout = vi.fn();
const remove = vi.fn();

const mockShoppingCartState = {
  items: mockItems,
  getTotalPrice: vi.fn(),
  checkout,
  remove,
};

vi.mock('../../+state/useShoppingCartStore', () => ({
  useShoppingCartStore: vi.fn(selectorOrState => {
    if (typeof selectorOrState === 'function') {
      return selectorOrState(mockShoppingCartState);
    }
    return mockShoppingCartState;
  }),
}));

const updateUserAddress = vi.fn();
const updateUserPhone = vi.fn();

const mockUser: UserResponse = {
  id: 1,
  firstname: 'John',
  lastname: 'Doe',
  email: 'john.doe@example.com',
  phone: '123456789',
  address: {
    country: 'USA',
    street: 'Main St',
    apartment: 'Apt 1',
    city: 'New York',
    region: 'NY',
    zip: '10001',
  },
};

const mockUserState = {
  user: mockUser,
  updateUserAddress,
  updateUserPhone,
};

vi.mock('@demo-shop-react-ui/user', () => ({
  useUserStore: vi.fn(selectorOrState => {
    if (typeof selectorOrState === 'function') {
      return selectorOrState(mockUserState);
    }
    return mockUserState;
  }),
}));

vi.mock('./ShippingInformationForm', () => ({
  ShippingInformationForm: ({ methods, onUpdateUser }: any) => (
    <div data-testid="shipping-form">
      <button data-testid="update-user-button" onClick={onUpdateUser}>
        Update User
      </button>
      <span>Is Form Dirty: {methods.formState.isDirty.toString()}</span>
      <span>Is Form Valid: {!methods.formState.isInvalid}</span>
    </div>
  ),
}));

vi.mock('./OrderSummary', () => ({
  OrderSummary: ({ items, totalPrice, checkoutButtonEnabled, onRemoveItem, onCheckout }: any) => (
    <div data-testid="order-summary">
      <span>Total Items: {items.length}</span>
      <span>Total Price: {totalPrice}</span>
      <button data-testid="checkout-button" disabled={!checkoutButtonEnabled} onClick={onCheckout}>
        Checkout
      </button>
      <button data-testid="remove-item-button" onClick={() => onRemoveItem(1)}>
        Remove Item
      </button>
    </div>
  ),
}));

describe('Checkout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with shipping form and order summary', () => {
    render(<Checkout />);

    expect(screen.getByTestId('shipping-form')).toBeTruthy();
    expect(screen.getByTestId('order-summary')).toBeTruthy();
  });

  it('matches the snapshot', () => {
    useShoppingCartStore().items = mockItems;
    useUserStore().user = mockUser;

    const { baseElement } = render(<Checkout />);

    expect(baseElement).toMatchSnapshot();
  });

  it('enables checkout button when conditions are met', () => {
    render(<Checkout />);

    const checkoutButton: HTMLButtonElement = screen.getByTestId('checkout-button');
    expect(checkoutButton.disabled).toBeFalsy();
  });

  it('updates user address when form is dirty', () => {
    const mockMethods = {
      reset: vi.fn(),
      getValues: vi.fn().mockReturnValue(mockUser),
      formState: {
        isDirty: true,
        dirtyFields: {
          address: {
            country: true,
            street: true,
            city: true,
            apartment: true,
            region: true,
            zip: true,
          },
        },
      },
    } as any;

    vi.mocked(useForm).mockReturnValueOnce(mockMethods);

    render(<Checkout />);

    const updateUserButton = screen.getByTestId('update-user-button');
    fireEvent.click(updateUserButton);

    expect(updateUserAddress).toHaveBeenCalledWith(mockUser.address);
    expect(updateUserPhone).not.toHaveBeenCalled();
  });

  it('updates user phone when form is dirty', () => {
    const mockMethods = {
      reset: vi.fn(),
      getValues: vi.fn().mockReturnValue(mockUser),
      formState: {
        isDirty: true,
        dirtyFields: {
          phone: true,
        },
      },
    } as any;

    vi.mocked(useForm).mockReturnValueOnce(mockMethods);

    render(<Checkout />);

    const updateUserButton = screen.getByTestId('update-user-button');
    fireEvent.click(updateUserButton);

    expect(updateUserPhone).toHaveBeenCalledWith({ phone: mockUser.phone });
    expect(updateUserAddress).not.toHaveBeenCalled();
  });

  it('calls checkout and navigates on successful checkout', async () => {
    render(<Checkout />);

    const checkoutButton = screen.getByTestId('checkout-button');
    fireEvent.click(checkoutButton);

    expect(checkout).toHaveBeenCalled();
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/products');
    });
  });

  it('handles checkout errors gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      return;
    });
    checkout.mockRejectedValue(new Error('Checkout failed'));

    render(<Checkout />);

    const checkoutButton = screen.getByTestId('checkout-button');
    fireEvent.click(checkoutButton);

    expect(checkout).toHaveBeenCalled();
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Checkout failed:', expect.any(Error));
      expect(navigateMock).not.toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  it('calls remove item when remove button is clicked', () => {
    render(<Checkout />);

    const removeItemButton = screen.getByTestId('remove-item-button');
    fireEvent.click(removeItemButton);

    expect(remove).toHaveBeenCalledWith(1);
  });

  it('resets form when user data changes', async () => {
    const spy = vi.spyOn(useForm(), 'reset');
    const updatedUser = { ...mockUser, phone: '555-444-333' };

    useUserStore().user = updatedUser;

    render(<Checkout />);

    expect(spy).toHaveBeenCalledWith({ ...updatedUser, id: undefined });
  });
});
