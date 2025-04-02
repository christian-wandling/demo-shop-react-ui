import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductSearch } from './ProductSearch';
import { useProductStore } from '../../+state/useProductStore';
import { useNavigate } from 'react-router';

vi.mock('react-router', () => ({
  useNavigate: vi.fn().mockReturnValue(vi.fn()),
}));

const mockState = {
  filter: {},
  setFilter: vi.fn(),
};

vi.mock('../../+state/useProductStore', () => ({
  useProductStore: vi.fn(selectorOrState => {
    if (typeof selectorOrState === 'function') {
      return selectorOrState(mockState);
    }
    return mockState;
  }),
}));

describe('ProductSearch', () => {
  const store = useProductStore();
  const navigate = useNavigate();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<ProductSearch />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const { baseElement } = render(<ProductSearch />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should display the search icon', () => {
    render(<ProductSearch />);
    const searchIcon = screen.getByAltText('search');
    expect(searchIcon).toBeTruthy();
  });

  it('should render an input field with correct placeholder', () => {
    render(<ProductSearch />);
    const inputElement = screen.getByPlaceholderText('Search products');
    expect(inputElement).toBeTruthy();
  });

  it('should update filter when text is entered', () => {
    const setFilter = vi.spyOn(store, 'setFilter');

    render(<ProductSearch />);
    const inputElement = screen.getByPlaceholderText('Search products');

    fireEvent.change(inputElement, { target: { value: 'test product' } });

    expect(setFilter).toHaveBeenCalledWith({ name: 'test product' });
  });

  it('should navigate to products page when Enter key is pressed', () => {
    render(<ProductSearch />);
    const inputElement = screen.getByPlaceholderText('Search products');

    fireEvent.keyDown(inputElement, { key: 'Enter' });

    expect(navigate).toHaveBeenCalledWith('/products');
  });

  it('should not navigate when a key other than Enter is pressed', () => {
    render(<ProductSearch />);
    const inputElement = screen.getByPlaceholderText('Search products');

    fireEvent.keyDown(inputElement, { key: 'a' });

    expect(navigate).not.toHaveBeenCalled();
  });

  it('should display the enter icon when filter name is set', () => {
    mockState.filter = { name: 'test product' };

    render(<ProductSearch />);
    const enterIcon = screen.getByAltText('enter');
    expect(enterIcon).toBeTruthy();
  });

  it('should not display the enter icon when filter name is empty', () => {
    mockState.filter = { name: '' };

    render(<ProductSearch />);
    const enterIcon = screen.queryByAltText('enter');
    expect(enterIcon).not.toBeTruthy();
  });

  it('should navigate to products page when enter icon is clicked', () => {
    mockState.filter = { name: 'test product' };

    render(<ProductSearch />);
    const enterIcon = screen.getByAltText('enter');

    fireEvent.click(enterIcon);

    expect(navigate).toHaveBeenCalledWith('/products');
  });

  it('should apply "extended" class when filter name is set', () => {
    mockState.filter = { name: 'test product' };
    render(<ProductSearch />);
    const searchInput = document.querySelector('.search-input');
    expect(searchInput?.classList).toContain('extended');
  });

  it('should not apply "extended" class when filter name is empty', () => {
    mockState.filter = { name: '' };

    render(<ProductSearch />);
    const searchInput = document.querySelector('.search-input');
    expect(searchInput?.classList).not.toContain('extended');
  });
});
