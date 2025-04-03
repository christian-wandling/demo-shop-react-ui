import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Form } from './Form';

const TestInput = () => <input data-testid="test-input" />;

describe('Form Component', () => {
  const methods = {
    defaultValues: {
      testField: '',
    },
    register: vi.fn().mockImplementation(name => ({
      name,
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    })),
    handleSubmit: vi.fn(fn => (e: any) => {
      e.preventDefault();
      fn({ testField: 'test value' });
    }),
  } as any;

  it('renders children correctly', () => {
    const onSubmit = vi.fn();

    render(
      <Form methods={methods} onSubmit={onSubmit}>
        <TestInput />
      </Form>
    );

    expect(screen.getByTestId('test-input')).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const onSubmit = vi.fn();

    const { baseElement } = render(
      <Form methods={methods} onSubmit={onSubmit}>
        <TestInput />
      </Form>
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('applies className properly', () => {
    const onSubmit = vi.fn();
    const testClassName = 'test-class';

    render(
      <Form methods={methods} onSubmit={onSubmit} className={testClassName}>
        <TestInput />
      </Form>
    );

    const form = screen.getByTestId('form');

    expect(form.classList).toContain(testClassName);
  });

  it('calls onSubmit when the form is submitted', async () => {
    const onSubmit = vi.fn();

    render(
      <Form methods={methods} onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.submit(screen.getByRole('button'));

    expect(onSubmit).toHaveBeenCalled();
  });

  it('integrates with react-hook-form correctly', async () => {
    const onSubmit = vi.fn();

    render(
      <Form methods={methods} onSubmit={onSubmit}>
        <input data-testid="test-field" {...methods.register('testField')} />
        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.change(screen.getByTestId('test-field'), {
      target: { value: 'test value' },
    });

    fireEvent.submit(screen.getByRole('button'));

    expect(onSubmit).toHaveBeenCalledWith({ testField: 'test value' });
  });
});
