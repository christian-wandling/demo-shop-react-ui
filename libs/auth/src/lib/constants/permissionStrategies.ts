import { PermissionStrategy } from '../enums/permissionStrategy';
import { isAuthenticated } from '../services/keycloakService';

export const PERMISSION_STRATEGIES = {
  [PermissionStrategy.AUTHENTICATED]: () => isAuthenticated(),
  // Add other permission strategies here
};
