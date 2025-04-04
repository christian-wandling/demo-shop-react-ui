import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OrderStatusBadge } from './OrderStatusBadge';

describe('OrderStatusBadge', () => {
  it('renders with Completed status and correct styling', () => {
    render(<OrderStatusBadge status="Completed" />);

    const el = screen.getByTestId('orderStatus');

    expect(el).toBeTruthy();
    expect(el.classList).toContain('bg-green-800');
    expect(el.classList).toContain('rounded-lg');
    expect(el.classList).toContain('text-white');
  });

  it('should match snapshot', () => {
    const { baseElement } = render(<OrderStatusBadge status="Completed" />);

    expect(baseElement).toMatchSnapshot();
  });

  it('renders with Created status and correct styling', () => {
    render(<OrderStatusBadge status="Created" />);

    const el = screen.getByTestId('orderStatus');

    expect(el).toBeTruthy();
    expect(el.classList).toContain('bg-orange-500');
    expect(el.classList).toContain('rounded-lg');
    expect(el.classList).toContain('text-white');
  });

  it('properly formats status text with first letter capitalized', () => {
    render(<OrderStatusBadge status="Created" />);

    const el = screen.getByTestId('orderStatus');

    expect(el).toBeTruthy();
    expect(el.textContent).toMatch(/^[A-Z][a-z]*(\s[A-Z][a-z]*)*/);
  });

  it('applies responsive classes for padding and width', () => {
    render(<OrderStatusBadge status="Completed" />);

    const el = screen.getByTestId('orderStatus');

    expect(el.classList).toContain('px-2');
    expect(el.classList).toContain('sm:px-4');
    expect(el.classList).toContain('py-1');
    expect(el.classList).toContain('sm:py-1.5');
    expect(el.classList).toContain('max-w-20');
    expect(el.classList).toContain('sm:max-w-28');
  });
});
