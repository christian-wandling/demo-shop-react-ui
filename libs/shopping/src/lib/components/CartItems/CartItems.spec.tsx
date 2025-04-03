import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CartItems } from './CartItems';
import { BrowserRouter } from 'react-router';
import { CartItemResponse } from '@demo-shop-react-ui/api';

const mockCartItems: CartItemResponse[] = [
  {
    id: 1,
    productId: 101,
    productName: 'Test Product 1',
    productThumbnail: 'https://example.com/image1.jpg',
    quantity: 2,
    totalPrice: 19.99,
    unitPrice: 0,
  },
  {
    id: 2,
    productId: 102,
    productName: 'Test Product 2',
    productThumbnail: 'https://example.com/image2.jpg',
    quantity: 1,
    totalPrice: 29.99,
    unitPrice: 0,
  },
];

const renderWithRouter = (component: any) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('CartItems Component', () => {
  it('renders successfully', () => {
    const onRemoveItem = vi.fn();
    renderWithRouter(<CartItems items={mockCartItems} onRemoveItem={onRemoveItem} />);
    expect(screen.getByText('Test Product 1')).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const onRemoveItem = vi.fn();
    const { baseElement } = renderWithRouter(<CartItems items={mockCartItems} onRemoveItem={onRemoveItem} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('renders all items in the cart', () => {
    const onRemoveItem = vi.fn();
    renderWithRouter(<CartItems items={mockCartItems} onRemoveItem={onRemoveItem} />);

    expect(screen.getByText('Test Product 1')).toBeTruthy();
    expect(screen.getByText('Test Product 2')).toBeTruthy();

    expect(screen.getByText('Qty 2')).toBeTruthy();
    expect(screen.getByText('Qty 1')).toBeTruthy();

    expect(screen.getByText('$19.99')).toBeTruthy();
    expect(screen.getByText('$29.99')).toBeTruthy();
  });

  it('calls onRemoveItem with correct item id when Remove button is clicked', () => {
    const onRemoveItem = vi.fn();
    renderWithRouter(<CartItems items={mockCartItems} onRemoveItem={onRemoveItem} />);

    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);

    expect(onRemoveItem).toHaveBeenCalledTimes(1);
    expect(onRemoveItem).toHaveBeenCalledWith(1);

    fireEvent.click(removeButtons[1]);
    expect(onRemoveItem).toHaveBeenCalledTimes(2);
    expect(onRemoveItem).toHaveBeenLastCalledWith(2);
  });

  it('renders product images with correct attributes', () => {
    const onRemoveItem = vi.fn();
    renderWithRouter(<CartItems items={mockCartItems} onRemoveItem={onRemoveItem} />);

    const images: HTMLImageElement[] = screen.getAllByRole('img');
    expect(images).toHaveLength(2);

    expect(images[0].src).toBe('https://example.com/image1.jpg');
    expect(images[0].alt).toBe('Test Product 1');
    expect(images[0].title).toBe('Test Product 1');

    expect(images[1].src).toBe('https://example.com/image2.jpg');
    expect(images[1].alt).toBe('Test Product 2');
    expect(images[1].title).toBe('Test Product 2');
  });

  it('renders product links with correct routes', () => {
    const onRemoveItem = vi.fn();
    renderWithRouter(<CartItems items={mockCartItems} onRemoveItem={onRemoveItem} />);

    const productLinks: NodeListOf<HTMLLinkElement> = document.querySelectorAll('a[href^="/products/"]');
    expect(productLinks).toHaveLength(2);

    expect(productLinks[0].href).toContain('/products/101');
    expect(productLinks[1].href).toContain('/products/102');
  });

  it('renders empty list when no items are provided', () => {
    const onRemoveItem = vi.fn();
    renderWithRouter(<CartItems items={[]} onRemoveItem={onRemoveItem} />);

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });
});
