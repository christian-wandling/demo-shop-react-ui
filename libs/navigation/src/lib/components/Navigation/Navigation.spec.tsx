import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { Navigation } from './Navigation';
import { NavigationItemType } from '../../enums/navigationItemType';
import { RouteItem } from '../../models/routeItem';
import { PermissionStrategy } from '@demo-shop-react-ui/auth';
import { NavigationConfig } from '../../models/navigationConfig';
import { NavigationContext } from '../../NavigationContext';
import { NavigationBar } from './NavigationBar/NavigationBar';
import { getFilteredNavigationItems } from '../../services/navigationService';

vi.mock('../../services/navigationService', () => ({
  getFilteredNavigationItems: vi.fn().mockImplementation((items, type) => [
    { id: 'products', label: 'Products', type: NavigationItemType.ROUTE },
    { id: 'categories', label: 'Categories', type: NavigationItemType.ROUTE },
  ]),
}));

const mockShoppingCartState = {
  fetchCurrentSession: vi.fn(),
};

vi.mock('@demo-shop-react-ui/shopping', () => ({
  useShoppingCartStore: vi.fn(selectorOrState => {
    if (typeof selectorOrState === 'function') {
      return selectorOrState(mockShoppingCartState);
    }
    return mockShoppingCartState;
  }),
}));

const login = vi.fn().mockResolvedValue(undefined);
const register = vi.fn().mockResolvedValue(undefined);
const logout = vi.fn().mockResolvedValue(undefined);

vi.mock('@demo-shop-react-ui/auth', async importOriginal => ({
  ...(await importOriginal()),
  login: () => login(),
  register: () => register(),
  logout: () => logout(),
}));

vi.mock('./NavigationBar/NavigationBar', () => ({
  NavigationBar: vi.fn(() => <div data-testid="navigation-bar"></div>),
}));

vi.mock('./SideNavigation/SideNavigation', () => ({
  SideNavigation: vi.fn(() => <div data-testid="side-navigation"></div>),
}));

const navigationConfig: NavigationConfig = {
  items: [
    new RouteItem('products', 101, { route: 'products' }),
    new RouteItem('orders', 102, { route: 'orders', permissionStrategy: PermissionStrategy.AUTHENTICATED }),
  ],
};

describe('Navigation Component', () => {
  const fetchCurrentSessionSpy = vi.spyOn(mockShoppingCartState, 'fetchCurrentSession');

  beforeEach(() => {
    vi.clearAllMocks();
    global.window.resizeTo = vi.fn();
    global.window.addEventListener = vi.fn();
    global.window.removeEventListener = vi.fn();
  });

  it('renders navigation bar', () => {
    render(
      <NavigationContext.Provider value={navigationConfig}>
        <Navigation />
      </NavigationContext.Provider>
    );

    expect(screen.getByTestId('navigation-bar')).toBeTruthy();
    expect(screen.queryByTestId('side-navigation')).not.toBeTruthy();
  });

  it('matches the snapshot', () => {
    const { baseElement } = render(
      <NavigationContext.Provider value={navigationConfig}>
        <Navigation />
      </NavigationContext.Provider>
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('calls getFilteredNavigationItems with correct parameters', () => {
    render(
      <NavigationContext.Provider value={navigationConfig}>
        <Navigation />
      </NavigationContext.Provider>
    );

    expect(getFilteredNavigationItems).toHaveBeenCalledWith(navigationConfig.items, NavigationItemType.ROUTE);
  });

  it('adds and removes resize event listener', () => {
    const { unmount } = render(
      <NavigationContext.Provider value={navigationConfig}>
        <Navigation />
      </NavigationContext.Provider>
    );

    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('opens side navigation when triggered', async () => {
    render(
      <NavigationContext.Provider value={navigationConfig}>
        <Navigation />
      </NavigationContext.Provider>
    );

    const navigationBarProps = NavigationBar.mock.calls[0][0];

    await act(async () => {
      navigationBarProps.onOpenSideNavigation();
    });

    expect(screen.getByTestId('side-navigation')).toBeTruthy();
  });

  it('changes selected navigation item', async () => {
    render(
      <NavigationContext.Provider value={navigationConfig}>
        <Navigation />
      </NavigationContext.Provider>
    );

    const navigationBarProps = NavigationBar.mock.calls[0][0];
    expect(navigationBarProps.selectedItem).toBe('products');

    await act(async () => {
      navigationBarProps.onSelectedItemChange('about');
    });

    const updatedProps = NavigationBar.mock.calls[NavigationBar.mock.calls.length - 1][0];
    expect(updatedProps.selectedItem).toBe('about');
  });

  it('calls login function when triggered', async () => {
    render(
      <NavigationContext.Provider value={navigationConfig}>
        <Navigation />
      </NavigationContext.Provider>
    );

    const navigationBarProps = NavigationBar.mock.calls[0][0];

    await act(async () => {
      await navigationBarProps.onLogin();
    });

    expect(login).toHaveBeenCalledTimes(1);
    expect(fetchCurrentSessionSpy).toHaveBeenCalledTimes(1);
  });

  it('calls register function when triggered', async () => {
    render(
      <NavigationContext.Provider value={navigationConfig}>
        <Navigation />
      </NavigationContext.Provider>
    );

    const navigationBarProps = NavigationBar.mock.calls[0][0];

    await act(async () => {
      await navigationBarProps.onRegister();
    });

    expect(register).toHaveBeenCalledTimes(1);
    expect(fetchCurrentSessionSpy).toHaveBeenCalledTimes(1);
  });

  it('calls logout function when triggered', async () => {
    render(
      <NavigationContext.Provider value={navigationConfig}>
        <Navigation />
      </NavigationContext.Provider>
    );

    const navigationBarProps = NavigationBar.mock.calls[0][0];

    await act(async () => {
      await navigationBarProps.onLogout();
    });

    expect(logout).toHaveBeenCalledTimes(1);
  });

  it('closes side navigation when window resizes', async () => {
    render(
      <NavigationContext.Provider value={navigationConfig}>
        <Navigation />
      </NavigationContext.Provider>
    );

    const resizeHandler = window.addEventListener.mock.calls.find(call => call[0] === 'resize')[1];

    const navigationBarProps = NavigationBar.mock.calls[0][0];

    await act(async () => {
      navigationBarProps.onOpenSideNavigation();
      resizeHandler();
    });

    expect(screen.queryByTestId('side-navigation')).not.toBeTruthy();
  });
});
