import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { useAppStore } from '../../+state/useAppStore';
import { ContextComposer } from '../../utils/ContextComposer';
import { ApiProvider } from '@demo-shop-react-ui/api';
import { NavigationProvider } from '@demo-shop-react-ui/navigation';

vi.mock('../../+state/useAppStore');
vi.mock('../../utils/ContextComposer', () => ({
  ContextComposer: vi.fn(({ children }) => <div data-testid="context-composer">{children}</div>),
}));
vi.mock('@demo-shop-react-ui/api', () => ({
  ApiProvider: vi.fn(({ children }) => <div data-testid="api-provider">{children}</div>),
}));
vi.mock('@demo-shop-react-ui/navigation', () => ({
  Navigation: vi.fn(() => <div data-testid="navigation">Navigation</div>),
  NavigationProvider: vi.fn(({ children }) => <div data-testid="navigation-provider">{children}</div>),
}));
vi.mock('@demo-shop-react-ui/shopping', () => ({
  ShoppingCart: vi.fn(() => <div data-testid="shopping-cart">Shopping Cart</div>),
}));
vi.mock('@demo-shop-react-ui/shared', () => ({
  LoadingSpinner: vi.fn(() => <div data-testid="loading-spinner">Loading...</div>),
}));
vi.mock('../AppRouter/AppRouter', () => ({
  AppRouter: vi.fn(() => <div data-testid="app-router">App Router</div>),
}));
vi.mock('../../config/config', () => ({
  apiConfig: { baseUrl: 'http://test-api.com' },
  navigationConfig: { routes: [] },
}));

describe('App Component', () => {
  const mockInitialize = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render loading spinner when not initialized', () => {
    vi.mocked(useAppStore).mockImplementation(selector => {
      if (typeof selector === 'function') {
        const mockState = { isInitialized: false, initialize: mockInitialize };
        return selector(mockState);
      }
      return undefined;
    });

    render(<App />);

    expect(screen.getByTestId('loading-spinner')).toBeTruthy();
    expect(mockInitialize).toHaveBeenCalledTimes(1);
  });

  it('should render app content when initialized', () => {
    vi.mocked(useAppStore).mockImplementation(selector => {
      if (typeof selector === 'function') {
        const mockState = { isInitialized: true, initialize: mockInitialize };
        return selector(mockState);
      }
      return undefined;
    });

    render(<App />);

    expect(mockInitialize).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('context-composer')).toBeTruthy();
    expect(screen.getByTestId('shopping-cart')).toBeTruthy();
    expect(screen.getByTestId('navigation')).toBeTruthy();
    expect(screen.getByTestId('app-router')).toBeTruthy();
  });

  it('should initialize app state only once', async () => {
    vi.mocked(useAppStore).mockImplementation(selector => {
      if (typeof selector === 'function') {
        const mockState = { isInitialized: true, initialize: mockInitialize };
        return selector(mockState);
      }
      return undefined;
    });

    const { rerender } = render(<App />);

    expect(mockInitialize).toHaveBeenCalledTimes(1);

    rerender(<App />);

    expect(mockInitialize).toHaveBeenCalledTimes(1);
  });

  it('should pass correct props to context providers', () => {
    vi.mocked(useAppStore).mockImplementation(selector => {
      if (typeof selector === 'function') {
        const mockState = { isInitialized: true, initialize: mockInitialize };
        return selector(mockState);
      }
      return undefined;
    });

    render(<App />);

    const contextComposer = vi.mocked(ContextComposer);
    const lastCallArgs = contextComposer.mock.calls[0][0];

    // Check that contextProviders array has the expected structure
    expect(lastCallArgs).toHaveProperty('contextProviders');
    expect(lastCallArgs.contextProviders).toHaveLength(2);

    // Check first provider (ApiProvider)
    expect(lastCallArgs.contextProviders[0].Provider).toBe(ApiProvider);
    expect(lastCallArgs.contextProviders[0].props).toHaveProperty('apiConfig');
    expect(lastCallArgs.contextProviders[0].props?.apiConfig).toEqual({ baseUrl: 'http://test-api.com' });

    // Check second provider (NavigationProvider)
    expect(lastCallArgs.contextProviders[1].Provider).toBe(NavigationProvider);
    expect(lastCallArgs.contextProviders[1].props).toHaveProperty('navigationConfig');
    expect(lastCallArgs.contextProviders[1].props?.navigationConfig).toEqual({ routes: [] });
  });
});
