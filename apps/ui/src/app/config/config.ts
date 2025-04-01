import { AuthConfig, PermissionStrategy } from '@demo-shop-react-ui/auth';
import { authMiddleware, ConfigurationParameters } from '@demo-shop-react-ui/api';
import { NavigationConfig, RouteItem } from '@demo-shop-react-ui/navigation';

export const authConfig: AuthConfig = {
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'demo_shop',
    clientId: 'demo_shop_ui',
  },
};

export const apiConfig: ConfigurationParameters = {
  basePath: '',
  middleware: [authMiddleware],
};

export const navigationConfig: NavigationConfig = {
  items: [
    new RouteItem('products', 101, {
      route: 'products',
    }),
    new RouteItem('orders', 102, {
      route: 'orders',
      permissionStrategy: PermissionStrategy.AUTHENTICATED,
    }),
  ],
};
