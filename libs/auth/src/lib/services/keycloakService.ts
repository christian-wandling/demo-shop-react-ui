import Keycloak from 'keycloak-js';
import { AuthConfig } from '../models/authConfig';
import { PermissionStrategy } from '../enums/permissionStrategy';
import { PERMISSION_STRATEGIES } from '../constants/permissionStrategies';

let keycloak: Keycloak | null = null;

/**
 * Initializes Keycloak instance (singleton)
 */
export function initKeycloak(authConfig: AuthConfig): Promise<boolean> {
  if (keycloak) {
    return Promise.resolve(true);
  }

  keycloak = new Keycloak(authConfig.keycloak);

  return keycloak.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  });
}

/**
 * Returns the Keycloak token
 */
export function getToken(): string | undefined {
  return keycloak?.token;
}

/**
 * Checks if user is authenticated
 */
export function isAuthenticated(): boolean {
  return keycloak?.authenticated === true;
}

/**
 * Logs in the user
 */
export function login(): Promise<void> {
  return keycloak?.login() ?? Promise.resolve();
}

/**
 * Logs out the user
 */
export function logout(): Promise<void> {
  return keycloak?.logout({ redirectUri: window.location.origin }) ?? Promise.resolve();
}

/**
 * Registers a new user
 */
export function register(): Promise<void> {
  return keycloak?.register() ?? Promise.resolve();
}

/**
 * Utility function to check for permissions
 */
export function hasPermission(permissionStrategy: PermissionStrategy, ...args: unknown[]): boolean {
  const permissionStrategyFn = PERMISSION_STRATEGIES[permissionStrategy];

  if (!permissionStrategyFn) {
    return false;
  }

  return permissionStrategyFn();
}
