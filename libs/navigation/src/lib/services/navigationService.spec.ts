import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getFilteredNavigationItems } from './navigationService';
import { NavigationItem } from '../models/navigationItem';
import { NavigationItemType } from '../enums/navigationItemType';
import { hasPermission, PermissionStrategy } from '@demo-shop-react-ui/auth';
import { RouteItem } from '../models/routeItem';

vi.mock('@demo-shop-react-ui/auth', async importOriginal => ({
  ...(await importOriginal()),
  hasPermission: vi.fn(),
}));

describe('getFilteredNavigationItems', () => {
  let mockNavigationItems: NavigationItem[];

  beforeEach(() => {
    vi.resetAllMocks();

    // Set up mock navigation items for testing
    mockNavigationItems = [
      new RouteItem('products', 101, {
        route: 'products',
      }),
      new RouteItem('orders', 102, {
        route: 'orders',
        permissionStrategy: PermissionStrategy.AUTHENTICATED,
      }),
    ];
  });

  it('should filter items by the specified type', () => {
    vi.mocked(hasPermission).mockReturnValue(true);

    const result = getFilteredNavigationItems(mockNavigationItems, NavigationItemType.ROUTE);

    expect(result).toHaveLength(2);
    expect(result.every(item => item.type === NavigationItemType.ROUTE)).toBe(true);
  });

  it('should use ROUTE as the default type when type is not provided', () => {
    vi.mocked(hasPermission).mockReturnValue(true);

    const result = getFilteredNavigationItems(mockNavigationItems);

    expect(result).toHaveLength(2);
    expect(result.every(item => item.type === NavigationItemType.ROUTE)).toBe(true);
  });

  it('should sort items by order in ascending order', () => {
    vi.mocked(hasPermission).mockReturnValue(true);

    const result = getFilteredNavigationItems(mockNavigationItems, NavigationItemType.ROUTE);

    expect(result[0].order).toBe(101);
    expect(result[1].order).toBe(102);
  });

  it('should include items without permission strategy', () => {
    vi.mocked(hasPermission).mockReturnValue(false);

    const result = getFilteredNavigationItems(mockNavigationItems, NavigationItemType.ROUTE);

    expect(result.length).toBe(1);
    expect(result[0].label).toBe('products');
  });

  it('should filter out items where the user lacks permission', () => {
    vi.mocked(hasPermission).mockImplementation((strategy: PermissionStrategy) => {
      return strategy === PermissionStrategy.AUTHENTICATED;
    });

    const result = getFilteredNavigationItems(mockNavigationItems, NavigationItemType.ROUTE);

    expect(result.length).toBe(2);
    expect(result.some(item => item.label === 'products')).toBe(true);
    expect(result.some(item => item.label === 'orders')).toBe(true);
  });

  it('should return an empty array if no items match the criteria', () => {
    vi.mocked(hasPermission).mockReturnValue(false);

    const result = getFilteredNavigationItems(
      mockNavigationItems.filter(item => item.options?.permissionStrategy),
      NavigationItemType.ROUTE
    );

    expect(result).toEqual([]);
  });

  it('should handle empty input array', () => {
    const result = getFilteredNavigationItems([], NavigationItemType.ROUTE);

    expect(result).toEqual([]);
  });

  it('should handle undefined options property', () => {
    const itemsWithUndefinedOptions = [
      {
        label: 'label',
        type: NavigationItemType.ROUTE,
        order: 1,
      },
    ] as NavigationItem[];

    const result = getFilteredNavigationItems(itemsWithUndefinedOptions);

    expect(result.length).toBe(1);
    expect(result[0].label).toBe('label');
  });
});
