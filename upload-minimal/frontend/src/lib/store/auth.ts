import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/types';
import { authApi } from '@/lib/api';
import { storage } from '@/lib/utils';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // 登录
      login: async (username: string, password: string) => {
        try {
          const { user, token } = await authApi.login({ username, password });
          
          // 保存到 localStorage
          storage.set('token', token);
          storage.set('user', user);
          
          set({
            user,
            token,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },

      // 登出
      logout: async () => {
        try {
          await authApi.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // 清除本地存储
          storage.remove('token');
          storage.remove('user');
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },

      // 刷新 token
      refreshToken: async () => {
        try {
          const { token } = await authApi.refreshToken();
          
          storage.set('token', token);
          
          set({ token });
        } catch (error) {
          console.error('Token refresh failed:', error);
          // Token 刷新失败，清除认证状态
          get().logout();
          throw error;
        }
      },

      // 初始化认证状态
      initialize: () => {
        const token = storage.get<string>('token');
        const user = storage.get<User>('user');
        
        if (token && user) {
          set({
            token,
            user,
            isAuthenticated: true,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 