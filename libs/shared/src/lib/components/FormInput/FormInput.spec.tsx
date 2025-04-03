import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormInput } from './FormInput';
import { useFormContext } from 'react-hook-form';

vi.mock('react-hook-form', () => ({
  useFormContext: vi.fn(),
  Controller: ({ render, defaultValue, name }: any) => {
    const field = {
      name,
      value: defaultValue,
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    };
    return render({ field });
  },
}));

vi.mock('../FormError/FormError', () => ({
  FormError: ({ error }: any) => (error ? <div data-testid="form-error">Mocked FormError</div> : null),
}));

describe('FormInput component', () => {
  const mockControl = { field: vi.fn() };
  const defaultProps = {
    name: 'testField',
    label: 'Test Field',
    placeholder: 'Enter test data',
  };

  beforeEach(() => {
    (useFormContext as any).mockReturnValue({
      control: mockControl,
      formState: { errors: {} },
    });
  });

  it('renders input field with label correctly', () => {
    render(<FormInput {...defaultProps} />);

    expect(screen.getByLabelText('Test Field')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter test data')).toBeTruthy();
    expect(screen.getByRole('textbox').id).toBe('testField');
  });

  it('matches the snapshot', () => {
    const { baseElement } = render(<FormInput {...defaultProps} />);

    expect(baseElement).toMatchSnapshot();
  });

  it('displays required asterisk when required prop is true', () => {
    render(<FormInput {...defaultProps} required={true} />);

    const requiredIndicator = screen.getByText('*');

    expect(requiredIndicator).toBeTruthy();
  });

  it('applies disabled styling when disabled prop is true', () => {
    render(<FormInput {...defaultProps} disabled={true} />);

    const input: HTMLInputElement = screen.getByRole('textbox');

    expect(input.disabled).toBe(true);
    expect(input.classList).toContain('text-gray-500');
    expect(input.classList).toContain('bg-gray-200');
  });

  it('sets input type correctly', () => {
    render(<FormInput {...defaultProps} type="password" />);

    const input: HTMLInputElement = screen.getByLabelText('Test Field');
    expect(input.type).toBe('password');
  });

  it('displays error message when provided', () => {
    (useFormContext as any).mockReturnValue({
      control: mockControl,
      formState: {
        errors: {
          testField: {
            message: 'This field has an error',
            type: 'required',
          },
        },
      },
    });

    render(<FormInput {...defaultProps} />);

    expect(screen.getByText('This field has an error')).toBeTruthy();
    expect(screen.getByTestId('form-error')).toBeTruthy();
    expect(screen.getByRole('textbox').classList).toContain('error');
  });

  it('applies custom className when provided', () => {
    render(<FormInput {...defaultProps} className="custom-class" />);

    const inputContainer = screen.getByLabelText('Test Field').closest('div');
    expect(inputContainer).toBeTruthy();
    expect(inputContainer?.classList).toContain('custom-class');
  });

  it('sets default value correctly', () => {
    render(<FormInput {...defaultProps} defaultValue="Default Text" />);

    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input.value).toBe('Default Text');
  });

  it('sets autocomplete attribute when provided', () => {
    render(<FormInput {...defaultProps} autoComplete="email" />);

    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input.autocomplete).toBe('email');
  });
});
