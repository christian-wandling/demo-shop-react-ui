import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CartIcon } from './CartIcon';
import { useShoppingCartStore } from '../../+state/useShoppingCartStore';

describe('CartIcon', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with the cart item count', () => {
    vi.spyOn(useShoppingCartStore.getState(), 'getItemCount').mockReturnValue(5);

    render(<CartIcon />);

    expect(screen.getByTestId('cartIcon')).toBeTruthy();

    expect(screen.getByText('5')).toBeTruthy();

    expect(screen.getByText('items in cart, view bag')).toBeTruthy();
  });

  it('should match snaphot', () => {
    const { baseElement } = render(<CartIcon />);

    expect(baseElement).toMatchSnapshot();
  });

  it('calls setShowCart when clicked', () => {
    const spy = vi.spyOn(useShoppingCartStore.getState(), 'setShowCart');

    render(<CartIcon />);

    const cartButton = screen.getByText('items in cart, view bag');
    fireEvent.click(cartButton);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('displays the correct number of items from the store', () => {
    const spy = vi.spyOn(useShoppingCartStore.getState(), 'getItemCount').mockReturnValue(5);

    render(<CartIcon />);

    expect(screen.getByText('5')).toBeTruthy();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
