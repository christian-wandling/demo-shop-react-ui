import { describe, it, expect } from 'vitest';
import { formatCurrency } from './FormatCurrency';

describe('formatCurrency', () => {
  it('formats USD correctly with default parameters', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(-1000)).toBe('-$1,000.00');
  });

  it('handles different currencies correctly', () => {
    expect(formatCurrency(1000, 'en-US', 'EUR')).toBe('€1,000.00');
  });

  it('handles large numbers correctly', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    expect(formatCurrency(1000000000)).toBe('$1,000,000,000.00');
  });

  it('handles small decimal values correctly', () => {
    expect(formatCurrency(0.01)).toBe('$0.01');
    expect(formatCurrency(0.1)).toBe('$0.10');
    expect(formatCurrency(0.001)).toBe('$0.00'); // Rounds to 2 decimal places
  });

  it('handles invalid inputs gracefully', () => {
    expect(() => formatCurrency(NaN)).not.toThrow();
    expect(formatCurrency(NaN)).toBe('$NaN');

    expect(() => formatCurrency(Infinity)).not.toThrow();
    expect(formatCurrency(Infinity)).toBe('$∞');
  });
});
