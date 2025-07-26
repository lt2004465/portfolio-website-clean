import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UIState, Notification } from '@/types';
import { generateRandomString } from '@/lib/utils';

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      sidebarOpen: false,
      theme: 'light',
      loading: false,
      notifications: [],

      // 设置侧边栏状态
      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open });
      },

      // 切换侧边栏
      toggleSidebar: () => {
        set(state => ({ sidebarOpen: !state.sidebarOpen }));
      },

      // 设置主题
      setTheme: (theme: 'light' | 'dark') => {
        set({ theme });
        
        // 更新 HTML 类名
        if (typeof window !== 'undefined') {
          const html = document.documentElement;
          if (theme === 'dark') {
            html.classList.add('dark');
          } else {
            html.classList.remove('dark');
          }
        }
      },

      // 切换主题
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },

      // 设置加载状态
      setLoading: (loading: boolean) => {
        set({ loading });
      },

      // 添加通知
      addNotification: (notification: Omit<Notification, 'id'>) => {
        const id = generateRandomString(8);
        const newNotification: Notification = {
          id,
          ...notification,
          duration: notification.duration || 5000,
        };

        set(state => ({
          notifications: [...state.notifications, newNotification]
        }));

        // 自动移除通知
        if (newNotification.duration && newNotification.duration > 0) {
          setTimeout(() => {
            get().removeNotification(id);
          }, newNotification.duration);
        }
      },

      // 移除通知
      removeNotification: (id: string) => {
        set(state => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }));
      },

      // 清空所有通知
      clearNotifications: () => {
        set({ notifications: [] });
      },

      // 显示成功消息
      showSuccess: (title: string, message?: string) => {
        get().addNotification({
          type: 'success',
          title,
          message,
        });
      },

      // 显示错误消息
      showError: (title: string, message?: string) => {
        get().addNotification({
          type: 'error',
          title,
          message,
          duration: 0, // 错误消息不自动消失
        });
      },

      // 显示警告消息
      showWarning: (title: string, message?: string) => {
        get().addNotification({
          type: 'warning',
          title,
          message,
        });
      },

      // 显示信息消息
      showInfo: (title: string, message?: string) => {
        get().addNotification({
          type: 'info',
          title,
          message,
        });
      },

      // 初始化主题
      initializeTheme: () => {
        const { theme } = get();
        
        if (typeof window !== 'undefined') {
          // 如果没有保存的主题，检查系统偏好
          if (!localStorage.getItem('ui-storage')) {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            get().setTheme(systemTheme);
          } else {
            get().setTheme(theme);
          }
        }
      },
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
); 