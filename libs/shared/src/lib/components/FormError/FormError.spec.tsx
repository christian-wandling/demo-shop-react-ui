import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormError } from './FormError';
import { FieldError } from 'react-hook-form';

describe('FormError component', () => {
  it('renders nothing when no error is provided', () => {
    const { container } = render(<FormError fieldName="Email" error={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders required error message with the provided field name', () => {
    const error = { type: 'required' } as FieldError;
    render(<FormError fieldName="Email" error={error} />);

    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByText('Email is required')).toBeTruthy();
  });

  it('renders email error message for email type errors', () => {
    const error = { type: 'email' } as FieldError;
    render(<FormError fieldName="Email" error={error} />);

    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByText('Email invalid')).toBeTruthy();
  });

  it('uses default field name when none is provided', () => {
    const error = { type: 'required' } as FieldError;
    render(<FormError error={error} />);

    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByText('Field is required')).toBeTruthy();
  });

  it('applies the correct CSS classes for styling', () => {
    const error = { type: 'required' } as FieldError;
    render(<FormError fieldName="Email" error={error} />);

    const errorElement = screen.getByRole('alert');
    expect(errorElement.classList).toContain('text-xs');
    expect(errorElement.classList).toContain('text-red-600');
  });

  describe('Snapshots', () => {
    it('matches the snapshot for no errors', () => {
      const { baseElement } = render(<FormError fieldName="Email" error={undefined} />);
      expect(baseElement).toMatchSnapshot();
    });

    it('matches the snapshot for errors', () => {
      const error = { type: 'required' } as FieldError;
      const { baseElement } = render(<FormError fieldName="Email" error={error} />);
      expect(baseElement).toMatchSnapshot();
    });
  });
});
