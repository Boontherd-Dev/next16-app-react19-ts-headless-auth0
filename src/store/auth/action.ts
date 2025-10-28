import { deleteCookie } from 'cookies-next';
import { create } from 'zustand';

import { getMe, logoutAction } from '@/actions/user';
import { AuthActions, AuthStates, MeType } from '@/store/auth/type';

export const useAuthStore = create<AuthStates & AuthActions>(set => ({
  me: null,
  setMe: (me: MeType | null) => set(() => ({ me: me })),
  fetchMe: async () => {
    try {
      const userData: any = await getMe();
      if (userData.status) {
        set(() => ({ me: userData.data }));
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      set(() => ({ me: null }));
    }
  },

  logout: async () => {
    try {
      // Call server action to delete cookie on server side
      await logoutAction();
    } catch (error) {
      console.error('Server logout failed:', error);
    } finally {
      // Always delete client-side cookie and clear state
      deleteCookie('access_token');
      set(() => ({ me: null }));
      // Redirect to signin page
      window.location.href = '/signin';
    }
  },
}));
