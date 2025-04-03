import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ShippingInformationForm } from './ShippingInformationForm';

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

vi.mock('@demo-shop-react-ui/shared', () => ({
  Form: ({ children, onSubmit }: any) => (
    <form
      data-testid="mock-form"
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}>
      {children}
    </form>
  ),
  FormInput: ({ name, label, disabled, required, className }: any) => (
    <div data-testid={`form-input-${name}`} className={className}>
      <label>
        {label}
        {required && '*'}
      </label>
      <input name={name} disabled={disabled} required={required} data-testid={`input-${name}`} />
    </div>
  ),
  FormSelect: ({ name, label, options, required, className }: any) => (
    <div data-testid={`form-select-${name}`} className={className}>
      <label>
        {label}
        {required && '*'}
      </label>
      <select name={name} required={required} data-testid={`select-${name}`}>
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  ),
}));

vi.mock('../../constants/countrySelectOptions', () => ({
  countrySelectOptions: [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
  ],
}));

describe('ShippingInformationForm', () => {
  const mockMethods: any = {
    formState: {
      isValid: false,
      isDirty: false,
    },
    control: {},
    handleSubmit: vi.fn(callback => (data: any) => callback(data)),
  };

  const mockOnUpdateUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('matches the snapshot', () => {
    const { baseElement } = render(<ShippingInformationForm methods={mockMethods} onUpdateUser={mockOnUpdateUser} />);

    expect(baseElement).toMatchSnapshot();
  });

  it('renders the form with correct title', () => {
    render(<ShippingInformationForm methods={mockMethods} onUpdateUser={mockOnUpdateUser} />);

    expect(screen.getByText('Shipping information')).toBeTruthy();
  });

  it('expands on mobile view when header is clicked', () => {
    (window as any).innerWidth = 500;

    render(<ShippingInformationForm methods={mockMethods} onUpdateUser={mockOnUpdateUser} />);

    const formContent = screen.getByTestId('mock-form').parentElement;
    expect(formContent?.querySelector('div[class*="max-h-0"]')).toBeTruthy();

    fireEvent.click(screen.getByText('Shipping information'));

    expect(formContent?.querySelector('div[class*="max-h-[1000px]"]')).toBeTruthy();
  });

  it('renders all form fields with correct attributes', () => {
    render(<ShippingInformationForm methods={mockMethods} onUpdateUser={mockOnUpdateUser} />);

    expect(screen.getByTestId('form-input-firstname')).toBeTruthy();
    expect(screen.getByTestId('form-input-lastname')).toBeTruthy();
    expect(screen.getByTestId('form-input-email')).toBeTruthy();
    expect(screen.getByTestId('form-input-phone')).toBeTruthy();
    expect(screen.getByTestId('form-select-address.country')).toBeTruthy();
    expect(screen.getByTestId('form-input-address.street')).toBeTruthy();
    expect(screen.getByTestId('form-input-address.apartment')).toBeTruthy();
    expect(screen.getByTestId('form-input-address.city')).toBeTruthy();
    expect(screen.getByTestId('form-input-address.region')).toBeTruthy();
    expect(screen.getByTestId('form-input-address.zip')).toBeTruthy();

    expect((screen.getByTestId('input-firstname') as HTMLInputElement).disabled).toBeTruthy();
    expect((screen.getByTestId('input-lastname') as HTMLInputElement).disabled).toBeTruthy();
    expect((screen.getByTestId('input-email') as HTMLInputElement).disabled).toBeTruthy();
  });

  it('disables update button when form is not valid or dirty', () => {
    render(<ShippingInformationForm methods={mockMethods} onUpdateUser={mockOnUpdateUser} />);

    const updateButton: HTMLButtonElement = screen.getByText('Update');
    expect(updateButton.disabled).toBe(true);
    expect(updateButton.classList).toContain('bg-gray-200');
  });

  it('enables update button when form is valid and dirty', () => {
    const validMethods = {
      ...mockMethods,
      formState: {
        isValid: true,
        isDirty: true,
      },
    };

    render(<ShippingInformationForm methods={validMethods} onUpdateUser={mockOnUpdateUser} />);

    const updateButton: HTMLButtonElement = screen.getByText('Update');
    expect(updateButton.disabled).toBe(false);
    expect(updateButton.classList).toContain('bg-indigo-600');
  });

  it('calls onUpdateUser when form is submitted', () => {
    const validMethods = {
      ...mockMethods,
      formState: {
        isValid: true,
        isDirty: true,
      },
    };

    render(<ShippingInformationForm methods={validMethods} onUpdateUser={mockOnUpdateUser} />);

    const form = screen.getByTestId('mock-form');
    fireEvent.submit(form);

    expect(mockOnUpdateUser).toHaveBeenCalled();
  });

  it('is expanded by default on desktop', () => {
    (window as any).innerWidth = 1024;

    render(<ShippingInformationForm methods={mockMethods} onUpdateUser={mockOnUpdateUser} />);

    const formContent = screen.getByTestId('mock-form').parentElement;
    expect(formContent?.querySelector('div[class*="max-h-[1000px]"]')).toBeTruthy();
  });

  it('has correct responsive classes', () => {
    render(<ShippingInformationForm methods={mockMethods} onUpdateUser={mockOnUpdateUser} />);

    expect(screen.getByTestId('form-input-firstname').classList).toContain('md:col-span-4');
    expect(screen.getByTestId('form-input-address.street').classList).toContain('md:col-span-5');
    expect(screen.getByTestId('form-input-address.zip').classList).toContain('md:col-span-2');
  });
});
