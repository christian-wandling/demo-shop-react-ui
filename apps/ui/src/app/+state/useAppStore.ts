import { create } from 'zustand';
import { useUserStore } from '@demo-shop-react-ui/user';
import { initKeycloak } from '@demo-shop-react-ui/auth';
import { authConfig } from '../config/config';

interface AppState {
  isInitialized: boolean;
  initialize: () => Promise<void>;
}

export const useAppStore = create<AppState>()((set, get) => {
  return {
    isInitialized: false,

    initialize: async () => {
      const { fetchCurrentUser } = useUserStore.getState();
      const hasActiveSession = await initKeycloak(authConfig);

      if (hasActiveSession) {
        await fetchCurrentUser();
      }

      set({ isInitialized: true });
    },
  };
});
