import { create } from 'zustand';
import { randomUserApi } from '@/lib/axios';
import { generateUserToken, saveUserToken, getUserToken, saveUserData, getUserData, clearUserData as clearCookies } from '@/lib/cookies';
import { UserType } from '@/types/user';

interface UserState {
  user: UserType | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
  refetchUser: () => Promise<void>;
  init: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  loading: true,
  error: null,

  fetchUser: async () => {
    set({ loading: true, error: null });
    
    try {
      const response = await randomUserApi.get('/?nat=br&results=1');
      const userData = response.data.results[0];
      
      const token = generateUserToken(userData);
      saveUserToken(token);
      saveUserData(userData);
      
      set({ user: userData, loading: false, error: null });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      set({ 
        error: 'Não foi possível carregar os dados do usuário', 
        loading: false 
      });
    }
  },

  clearUser: () => {
    clearCookies();
    set({ user: null, loading: false, error: null });
    window.location.reload();
  },

  refetchUser: async () => {
    await get().fetchUser();
  },

  init: () => {
    const existingToken = getUserToken();
    const existingUser = getUserData() as UserType | null;

    if (existingToken && existingUser) {
      set({ user: existingUser, loading: false, error: null });
    } else {
      get().fetchUser();
    }
  }
})); 