import { NavigationItemType } from '../enums/navigationItemType';
import { NavigationItem } from './navigationItem';
import { PermissionStrategy } from '@demo-shop-react-ui/auth';

/**
 * Represents a navigation item that links to an Angular route
 */
export class RouteItem extends NavigationItem {
  /**
   * The type of navigation item, always set to ROUTE for RouteItem
   */
  override readonly type: NavigationItemType = NavigationItemType.ROUTE;

  constructor(
    label: string,
    order: number,
    public override options: {
      route: string;
      permissionStrategy?: PermissionStrategy;
      query?: string;
    },
    subItems?: RouteItem[]
  ) {
    super(label, order, options, subItems);
  }
}
