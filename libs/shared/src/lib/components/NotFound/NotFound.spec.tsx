import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotFound } from './NotFound';

describe('NotFound', () => {
  it('renders the component', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const { baseElement } = render(<NotFound />);
    expect(baseElement).toMatchSnapshot();
  });

  it('renders the "Page not found" heading', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeTruthy();
  });

  it('renders a link to go back home', () => {
    render(<NotFound />);
    const homeLink: HTMLAnchorElement = screen.getByRole('link', { name: /go back home/i });

    expect(homeLink).toBeTruthy();
    expect(homeLink.href).toMatch(/\//);
  });
});
