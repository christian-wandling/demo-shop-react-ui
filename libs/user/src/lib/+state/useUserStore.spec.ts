import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act } from '@testing-library/react';
import { useUserStore } from './useUserStore';
import { AddressResponse, getApi, UserResponse } from '@demo-shop-react-ui/api';

const mockUserApi = {
  resolveCurrentUser: vi.fn(),
  updateCurrentUserAddress: vi.fn(),
  updateCurrentUserPhone: vi.fn(),
};

vi.mock('@demo-shop-react-ui/api', () => {
  return {
    getApi: vi.fn(() => ({ userApi: mockUserApi })),
  };
});

describe('useUserStore', () => {
  const mockUser: UserResponse = {
    id: 123,
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'test@example.com',
    address: {
      street: '123 Main St',
      city: 'Test City',
      zip: '12345',
      country: 'Test Country',
      apartment: '123',
    },
    phone: '123-456-7890',
  };

  const mockUserApi = getApi().userApi;

  beforeEach(() => {
    useUserStore.setState({ user: null });

    vi.clearAllMocks();
  });

  describe('fetchCurrentUser', () => {
    it('should fetch current user and update store', async () => {
      vi.spyOn(mockUserApi, 'resolveCurrentUser').mockResolvedValueOnce(mockUser);

      await act(async () => {
        await useUserStore.getState().fetchCurrentUser();
      });

      expect(mockUserApi.resolveCurrentUser).toHaveBeenCalledTimes(1);
      expect(useUserStore.getState().user).toEqual(mockUser);
    });

    it('should handle API errors', async () => {
      vi.spyOn(mockUserApi, 'resolveCurrentUser').mockRejectedValueOnce(new Error('API error'));

      await expect(useUserStore.getState().fetchCurrentUser()).rejects.toThrow('API error');
      expect(useUserStore.getState().user).toBeNull();
    });
  });

  describe('updateUserAddress', () => {
    beforeEach(async () => {
      useUserStore.setState({ user: mockUser });
    });

    it('should update user address and update store', async () => {
      const newAddress: AddressResponse = {
        apartment: '123',
        street: '456 New St',
        city: 'New City',
        zip: '67890',
        country: 'New Country',
      };

      vi.spyOn(mockUserApi, 'updateCurrentUserAddress').mockResolvedValueOnce(newAddress);

      await act(async () => {
        await useUserStore.getState().updateUserAddress(newAddress);
      });

      expect(mockUserApi.updateCurrentUserAddress).toHaveBeenCalledTimes(1);
      expect(mockUserApi.updateCurrentUserAddress).toHaveBeenCalledWith({
        updateUserAddressRequest: newAddress,
      });

      expect(useUserStore.getState().user?.address).toEqual(newAddress);
      expect(useUserStore.getState().user?.id).toEqual(mockUser.id);
      expect(useUserStore.getState().user?.firstname).toEqual(mockUser.firstname);
      expect(useUserStore.getState().user?.lastname).toEqual(mockUser.lastname);
    });

    it('should handle null user state', async () => {
      useUserStore.setState({ user: null });

      const newAddress: AddressResponse = {
        apartment: '123',
        street: '456 New St',
        city: 'New City',
        zip: '67890',
        country: 'New Country',
      };

      vi.spyOn(mockUserApi, 'updateCurrentUserAddress').mockResolvedValueOnce(newAddress);

      await act(async () => {
        await useUserStore.getState().updateUserAddress(newAddress);
      });

      expect(useUserStore.getState().user).toBeNull();
    });
  });

  describe('updateUserPhone', () => {
    beforeEach(() => {
      useUserStore.setState({ user: mockUser });
    });

    it('should update user phone and update store with entire user object', async () => {
      const newPhone = { phone: '555-123-4567' };
      const updatedUser = { ...mockUser, phone: '555-123-4567' };

      vi.spyOn(mockUserApi, 'updateCurrentUserPhone').mockResolvedValueOnce(updatedUser);

      await act(async () => {
        await useUserStore.getState().updateUserPhone(newPhone);
      });

      expect(mockUserApi.updateCurrentUserPhone).toHaveBeenCalledTimes(1);
      expect(mockUserApi.updateCurrentUserPhone).toHaveBeenCalledWith({
        updateUserPhoneRequest: newPhone,
      });

      expect(useUserStore.getState().user).toEqual(updatedUser);
    });

    it('should handle API errors', async () => {
      const newPhone = { phone: '555-123-4567' };

      vi.spyOn(mockUserApi, 'updateCurrentUserPhone').mockRejectedValueOnce(new Error('API error'));

      await expect(useUserStore.getState().updateUserPhone(newPhone)).rejects.toThrow('API error');
      expect(useUserStore.getState().user).toEqual(mockUser);
    });
  });
});
