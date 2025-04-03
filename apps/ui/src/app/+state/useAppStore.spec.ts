import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useAppStore } from './useAppStore';
import { useUserStore } from '@demo-shop-react-ui/user';
import { initKeycloak } from '@demo-shop-react-ui/auth';
import { authConfig } from '../config/config';
import { useShoppingCartStore } from '@demo-shop-react-ui/shopping';

vi.mock('@demo-shop-react-ui/user', () => ({
  useUserStore: {
    getState: vi.fn(),
  },
}));

vi.mock('@demo-shop-react-ui/shopping', () => ({
  useShoppingCartStore: {
    getState: vi.fn(),
  },
}));

vi.mock('@demo-shop-react-ui/auth', () => ({
  initKeycloak: vi.fn(),
}));

vi.mock('../config/config', () => ({
  authConfig: {
    realm: 'test-realm',
    clientId: 'test-client',
    url: 'https://test-auth-url',
  },
}));

describe('useAppStore', () => {
  const mockFetchCurrentUser = vi.fn();
  const mockFetchCurrentShoppingSession = vi.fn();

  beforeEach(() => {
    useAppStore.setState({ isInitialized: false });

    vi.mocked(useUserStore.getState).mockReturnValue({
      fetchCurrentUser: mockFetchCurrentUser,
    } as any);

    vi.mocked(useShoppingCartStore.getState).mockReturnValue({
      fetchCurrentSession: mockFetchCurrentShoppingSession,
    } as any);

    mockFetchCurrentUser.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const state = useAppStore.getState();
    expect(state.isInitialized).toBe(false);
    expect(typeof state.initialize).toBe('function');
  });

  it('should set isInitialized to true after initialization', async () => {
    vi.mocked(initKeycloak).mockResolvedValue(false);

    await useAppStore.getState().initialize();

    expect(useAppStore.getState().isInitialized).toBe(true);
    expect(initKeycloak).toHaveBeenCalledWith(authConfig);
    expect(mockFetchCurrentUser).not.toHaveBeenCalled();
    expect(mockFetchCurrentShoppingSession).not.toHaveBeenCalled();
  });

  it('should fetch current user if there is an active session', async () => {
    vi.mocked(initKeycloak).mockResolvedValue(true);

    await useAppStore.getState().initialize();

    expect(useAppStore.getState().isInitialized).toBe(true);
    expect(initKeycloak).toHaveBeenCalledWith(authConfig);
    expect(mockFetchCurrentUser).toHaveBeenCalledTimes(1);
    expect(mockFetchCurrentShoppingSession).toHaveBeenCalledTimes(1);
  });

  it('should handle errors during initialization', async () => {
    const error = new Error('Initialization failed');
    vi.mocked(initKeycloak).mockRejectedValue(error);

    await expect(useAppStore.getState().initialize()).rejects.toThrow('Initialization failed');
    expect(useAppStore.getState().isInitialized).toBe(false);
  });

  it('should handle errors during fetchCurrentUser', async () => {
    vi.mocked(initKeycloak).mockResolvedValue(true);
    mockFetchCurrentUser.mockRejectedValue(new Error('User fetch failed'));

    await expect(useAppStore.getState().initialize()).rejects.toThrow('User fetch failed');
    expect(useAppStore.getState().isInitialized).toBe(false);
  });

  it('should handle errors during fetchCurrentShoppingSession', async () => {
    vi.mocked(initKeycloak).mockResolvedValue(true);
    mockFetchCurrentShoppingSession.mockRejectedValue(new Error('Session fetch failed'));

    await expect(useAppStore.getState().initialize()).rejects.toThrow('Session fetch failed');
    expect(useAppStore.getState().isInitialized).toBe(false);
  });

  it('should not change state if already initialized', async () => {
    vi.mocked(initKeycloak).mockResolvedValue(false);
    await useAppStore.getState().initialize();
    expect(useAppStore.getState().isInitialized).toBe(true);

    vi.clearAllMocks();

    await useAppStore.getState().initialize();

    expect(useAppStore.getState().isInitialized).toBe(true);
    expect(initKeycloak).toHaveBeenCalledTimes(1);
  });
});
