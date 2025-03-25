// Assuming this exists in React form
import { NavigationItem } from '../models/navigationItem';
import { hasPermission, PermissionStrategy } from '@demo-shop-react-ui/auth';
import { NavigationItemType } from '../enums/navigationItemType';

/**
 * Returns navigation items filtered by type and user permissions
 *
 * This method filters the navigation items based on:
 * 1. The specified navigation type
 * 2. The user's permissions (if a permission strategy is defined)
 * The resulting items are sorted by their order property in ascending order.
 */
export function getFilteredNavigationItems(
  items: NavigationItem[],
  type: NavigationItemType = NavigationItemType.ROUTE
): NavigationItem[] {
  const isType = (itemType: NavigationItemType) => itemType === type;
  const allowDisplay = (strategy?: PermissionStrategy) => !strategy || hasPermission(strategy);

  return items
    .filter(item => isType(item.type) && allowDisplay(item.options?.['permissionStrategy']))
    .sort((a, b) => a.order - b.order);
}
