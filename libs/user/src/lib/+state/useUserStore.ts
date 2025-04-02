import { create } from 'zustand';
import { getApi, UpdateUserAddressRequest, UpdateUserPhoneRequest, UserResponse } from '@demo-shop-react-ui/api';

interface UserState {
  user: UserResponse | null;

  fetchCurrentUser: () => Promise<void>;
  updateUserAddress: (address: UpdateUserAddressRequest) => Promise<void>;
  updateUserPhone: (address: UpdateUserPhoneRequest) => Promise<void>;
}

export const useUserStore = create<UserState>()((set, get) => {
  return {
    user: null,

    fetchCurrentUser: async () => {
      const { userApi } = getApi();
      const user = await userApi.resolveCurrentUser();
      set({ user });
    },

    updateUserAddress: async (updateUserAddressRequest: UpdateUserAddressRequest) => {
      const { userApi } = getApi();
      const address = await userApi.updateCurrentUserAddress({ updateUserAddressRequest });
      set(state => ({ user: state.user && { ...state.user, address } }));
    },

    updateUserPhone: async (updateUserPhoneRequest: UpdateUserPhoneRequest) => {
      const { userApi } = getApi();
      const user = await userApi.updateCurrentUserPhone({ updateUserPhoneRequest });
      set({ user });
    },
  };
});
