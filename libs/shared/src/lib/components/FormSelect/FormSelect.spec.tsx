import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormSelect } from './FormSelect';
import { useFormContext } from 'react-hook-form';

vi.mock('react-hook-form', () => ({
  useFormContext: vi.fn(),
  Controller: vi.fn(({ render }) => render({ field: { onChange: vi.fn(), value: '' } })),
}));

describe('FormSelect', () => {
  const mockControl = { control: 'mock-control' };
  const mockErrors = {};

  const defaultProps = {
    name: 'testSelect',
    label: 'Test Select',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useFormContext as any).mockReturnValue({
      control: mockControl,
      formState: { errors: mockErrors },
    });
  });

  it('renders with basic props', () => {
    render(<FormSelect {...defaultProps} />);

    expect(screen.getByLabelText(/Test Select/)).toBeTruthy();
    expect(screen.getByText('Select Test Select')).toBeTruthy();
    expect(screen.getByText('Option 1')).toBeTruthy();
    expect(screen.getByText('Option 2')).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const { baseElement } = render(<FormSelect {...defaultProps} />);

    expect(baseElement).toMatchSnapshot();
  });

  it('shows required asterisk when required is true', () => {
    render(<FormSelect {...defaultProps} required={true} />);

    const label = screen.getByText('*');
    expect(label).toBeTruthy();
  });

  it('applies disabled styling when disabled is true', () => {
    render(<FormSelect {...defaultProps} disabled={true} />);

    const select: HTMLSelectElement = screen.getByRole('combobox');
    expect(select.disabled).toBe(true);

    const label = screen.getByText('Test Select');
    expect(label.className).toContain('text-gray-500');
  });

  it('applies additional className when provided', () => {
    render(<FormSelect {...defaultProps} className="custom-class" />);

    const selectContainer = screen.getByRole('combobox').parentElement;
    expect(selectContainer?.classList).toContain('custom-class');
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'This field is required';
    (useFormContext as any).mockReturnValue({
      control: mockControl,
      formState: { errors: { testSelect: { message: errorMessage } } },
    });

    render(<FormSelect {...defaultProps} />);

    expect(screen.getByText(errorMessage)).toBeTruthy();
    const select = screen.getByRole('combobox');
    expect(select.className).toContain('error');
  });

  it('renders all provided options', () => {
    const manyOptions = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' },
    ];

    render(<FormSelect {...defaultProps} options={manyOptions} />);

    manyOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeTruthy();
    });
  });
});
