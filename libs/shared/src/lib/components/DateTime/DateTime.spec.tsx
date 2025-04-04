import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DateTime } from './DateTime';

describe('DateTime', () => {
  it('should render with default formatting for a Date object', () => {
    const date = new Date('2023-05-15T12:30:00Z');
    render(<DateTime dateTime={date} />);

    const element: HTMLTimeElement = screen.getByTestId('time');

    expect(element.textContent).toBe('May 15, 2023');
    expect(element.dateTime).toBe('2023-05-15T12:30:00.000Z');
  });

  it('should render with default formatting for a string date', () => {
    const dateString = '2023-05-15T12:30:00Z';
    render(<DateTime dateTime={dateString} />);

    const element: HTMLTimeElement = screen.getByTestId('time');

    expect(element.textContent).toBe('May 15, 2023');
    expect(element.dateTime).toBe('2023-05-15T12:30:00.000Z');
  });

  it('should format date according to custom pattern', () => {
    const date = new Date('2023-05-15T12:30:00Z');
    const pattern = 'yyyy-MM-dd HH:mm';
    render(<DateTime dateTime={date} pattern={pattern} />);

    const element: HTMLTimeElement = screen.getByTestId('time');

    expect(element.textContent).toBe('2023-05-15 12:30');
  });

  it('should format date according to custom timezone', () => {
    const date = new Date('2023-05-15T12:30:00Z');
    render(<DateTime dateTime={date} timezone="America/New_York" />);

    const element: HTMLTimeElement = screen.getByTestId('time');

    expect(element.textContent).toBe('May 15, 2023');
  });

  it('should format date with custom pattern and timezone', () => {
    const date = new Date('2023-05-15T12:30:00Z');
    render(<DateTime dateTime={date} pattern="yyyy-MM-dd HH:mm zzz" timezone="Asia/Tokyo" />);

    const element: HTMLTimeElement = screen.getByTestId('time');

    expect(element.textContent).toMatch(/2023-05-15 21:30/);
  });

  it('matches snapshot with default props', () => {
    const date = new Date('2023-05-15T12:30:00+00:00');
    const { baseElement } = render(<DateTime dateTime={date} />);

    expect(baseElement).toMatchSnapshot();
  });

  it('matches snapshot with custom pattern', () => {
    const date = new Date('2023-05-15T12:30:00+00:00');
    const { container } = render(<DateTime dateTime={date} pattern="EEEE, MMMM do, yyyy" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot with custom timezone', () => {
    const date = new Date('2023-05-15T12:30:00+00:00');
    const { container } = render(<DateTime dateTime={date} timezone="Europe/Paris" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
