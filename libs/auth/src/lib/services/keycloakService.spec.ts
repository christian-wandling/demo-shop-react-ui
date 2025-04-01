import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getToken, hasPermission, initKeycloak, isAuthenticated, login, logout, register } from './keycloakService';
import { PermissionStrategy } from '../enums/permissionStrategy';
import { AuthConfig } from '../models/authConfig';
import Keycloak from 'keycloak-js';

vi.mock('keycloak-js', () => {
  const mockKeycloak = {
    init: vi.fn().mockResolvedValue(true),
    login: vi.fn().mockResolvedValue(undefined),
    logout: vi.fn().mockResolvedValue(undefined),
    register: vi.fn().mockResolvedValue(undefined),
    token: 'mock-token',
    authenticated: false,
  };

  return {
    default: vi.fn(() => mockKeycloak),
  };
});

describe('AuthService', () => {
  let mockKeycloakInstance: any;
  let mockAuthConfig: AuthConfig;

  beforeEach(() => {
    vi.resetModules();

    vi.clearAllMocks();

    mockAuthConfig = {
      keycloak: {
        url: 'https://keycloak-server.example.com/auth',
        realm: 'test-realm',
        clientId: 'test-client',
      },
    };

    mockKeycloakInstance = new Keycloak(mockAuthConfig.keycloak);
  });

  describe('initAuth', () => {
    it('should initialize a new Keycloak instance when none exists', async () => {
      mockKeycloakInstance = null;
      const result = await initKeycloak(mockAuthConfig);

      expect(Keycloak).toHaveBeenCalledWith(mockAuthConfig.keycloak);
      expect(result).toBe(true);
    });

    it('should return existing instance if already initialized', async () => {
      mockKeycloakInstance = null;
      await initKeycloak(mockAuthConfig);

      vi.clearAllMocks();

      const result = await initKeycloak(mockAuthConfig);

      expect(result).toBe(true);
      expect(Keycloak).not.toHaveBeenCalled();
    });
  });

  describe('getToken', () => {
    it('should return token when keycloak is initialized', async () => {
      mockKeycloakInstance.token = 'valid-jwt-token';
      await initKeycloak(mockAuthConfig);

      const token = getToken();
      expect(token).toBe('valid-jwt-token');
    });
  });

  describe('isAuthenticated', () => {
    it('should return false when keycloak is not initialized', () => {
      const authenticated = isAuthenticated();
      expect(authenticated).toBe(false);
    });

    it('should return false when user is not authenticated', async () => {
      mockKeycloakInstance.authenticated = false;
      await initKeycloak(mockAuthConfig);

      const authenticated = isAuthenticated();
      expect(authenticated).toBe(false);
    });

    it('should return true when user is authenticated', async () => {
      await initKeycloak(mockAuthConfig);
      mockKeycloakInstance.authenticated = true;

      const authenticated = isAuthenticated();
      expect(authenticated).toBe(true);
    });
  });

  describe('login', () => {
    it('should resolve immediately if keycloak is not initialized', async () => {
      mockKeycloakInstance = null;
      await expect(login()).resolves.toBeUndefined();
    });

    it('should call keycloak login when initialized', async () => {
      await initKeycloak(mockAuthConfig);
      await login();

      expect(mockKeycloakInstance.login).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should resolve immediately if keycloak is not initialized', async () => {
      mockKeycloakInstance = null;
      await expect(logout()).resolves.toBeUndefined();
    });

    it('should call keycloak logout with redirectUri when initialized', async () => {
      await initKeycloak(mockAuthConfig);
      await logout();

      expect(mockKeycloakInstance.logout).toHaveBeenCalledWith({
        redirectUri: window.location.origin,
      });
    });
  });

  describe('register', () => {
    it('should resolve immediately if keycloak is not initialized', async () => {
      mockKeycloakInstance = null;
      await expect(register()).resolves.toBeUndefined();
    });

    it('should call keycloak register when initialized', async () => {
      await initKeycloak(mockAuthConfig);
      await register();

      expect(mockKeycloakInstance.register).toHaveBeenCalled();
    });
  });

  describe('hasPermission', () => {
    it('should return false for unknown permission strategy', () => {
      const result = hasPermission('UNKNOWN_STRATEGY' as PermissionStrategy);
      expect(result).toBe(false);
    });

    it('should check authentication for AUTHENTICATED strategy', async () => {
      await initKeycloak(mockAuthConfig);

      mockKeycloakInstance.authenticated = false;
      expect(hasPermission(PermissionStrategy.AUTHENTICATED)).toBe(false);

      mockKeycloakInstance.authenticated = true;
      expect(hasPermission(PermissionStrategy.AUTHENTICATED)).toBe(true);
    });
  });
});
