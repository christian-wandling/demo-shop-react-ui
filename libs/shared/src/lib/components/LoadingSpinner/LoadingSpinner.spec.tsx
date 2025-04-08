import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders the spinner component', () => {
    render(<LoadingSpinner />);

    const spinnerContainer = screen.getByRole('status');
    expect(spinnerContainer).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const { baseElement } = render(<LoadingSpinner />);

    expect(baseElement).toMatchSnapshot();
  });
});
