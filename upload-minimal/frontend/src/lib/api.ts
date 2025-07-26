import axios from 'axios';
import {
  User,
  Work,
  Category,
  PersonalInfo,
  ContactMessage,
  Setting,
  ApiResponse,
  PaginationParams,
  ContactFormData,
  LoginFormData,
  WorkFormData,
  CategoryFormData,
  UploadResponse,
} from '@/types';

// API 基础配置
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加 token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 处理错误
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token 过期，清除本地存储并跳转到登录页
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// 认证相关 API
export const authApi = {
  // 登录
  async login(credentials: LoginFormData): Promise<{ user: User; token: string }> {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  // 登出
  async logout(): Promise<void> {
    await api.post('/api/auth/logout');
  },

  // 刷新 token
  async refreshToken(): Promise<{ token: string }> {
    const response = await api.post('/api/auth/refresh');
    return response.data;
  },

  // 获取当前用户信息
  async getCurrentUser(): Promise<User> {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};

// 作品相关 API
export const worksApi = {
  // 获取作品列表
  async getWorks(params?: PaginationParams): Promise<ApiResponse<Work[]>> {
    const response = await api.get('/api/works', { params });
    return response.data;
  },

  // 获取单个作品
  async getWork(id: number): Promise<Work> {
    const response = await api.get(`/api/works/${id}`);
    return response.data;
  },

  // 根据 slug 获取作品
  async getWorkBySlug(slug: string): Promise<Work> {
    const response = await api.get(`/api/works/slug/${slug}`);
    return response.data;
  },

  // 创建作品
  async createWork(data: WorkFormData): Promise<Work> {
    const response = await api.post('/api/works', data);
    return response.data;
  },

  // 更新作品
  async updateWork(id: number, data: Partial<WorkFormData>): Promise<Work> {
    const response = await api.put(`/api/works/${id}`, data);
    return response.data;
  },

  // 删除作品
  async deleteWork(id: number): Promise<void> {
    await api.delete(`/api/works/${id}`);
  },

  // 增加浏览量
  async incrementViewCount(id: number): Promise<void> {
    await api.post(`/api/works/${id}/view`);
  },
};

// 分类相关 API
export const categoriesApi = {
  // 获取分类列表
  async getCategories(): Promise<Category[]> {
    const response = await api.get('/api/categories');
    return response.data;
  },

  // 创建分类
  async createCategory(data: CategoryFormData): Promise<Category> {
    const response = await api.post('/api/categories', data);
    return response.data;
  },

  // 更新分类
  async updateCategory(id: number, data: Partial<CategoryFormData>): Promise<Category> {
    const response = await api.put(`/api/categories/${id}`, data);
    return response.data;
  },

  // 删除分类
  async deleteCategory(id: number): Promise<void> {
    await api.delete(`/api/categories/${id}`);
  },
};

// 个人信息相关 API
export const profileApi = {
  // 获取个人信息
  async getProfile(): Promise<PersonalInfo> {
    const response = await api.get('/api/profile');
    return response.data;
  },

  // 更新个人信息
  async updateProfile(data: Partial<PersonalInfo>): Promise<PersonalInfo> {
    const response = await api.put('/api/profile', data);
    return response.data;
  },
};

// 联系相关 API
export const contactApi = {
  // 发送联系消息
  async sendMessage(data: ContactFormData): Promise<void> {
    await api.post('/api/contact', data);
  },

  // 获取联系消息列表
  async getMessages(params?: PaginationParams): Promise<ApiResponse<ContactMessage[]>> {
    const response = await api.get('/api/contact/messages', { params });
    return response.data;
  },

  // 标记消息为已读
  async markAsRead(id: number): Promise<void> {
    await api.put(`/api/contact/messages/${id}`, { is_read: true });
  },

  // 删除消息
  async deleteMessage(id: number): Promise<void> {
    await api.delete(`/api/contact/messages/${id}`);
  },
};

// 文件上传相关 API
export const uploadApi = {
  // 上传图片
  async uploadImage(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/api/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 上传文件
  async uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/api/upload/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 删除文件
  async deleteFile(filename: string): Promise<void> {
    await api.delete(`/api/upload/${filename}`);
  },
};

// 网站设置相关 API
export const settingsApi = {
  // 获取公开设置
  async getPublicSettings(): Promise<Record<string, any>> {
    const response = await api.get('/api/settings/public');
    return response.data;
  },

  // 获取所有设置
  async getSettings(): Promise<Setting[]> {
    const response = await api.get('/api/settings');
    return response.data;
  },

  // 更新设置
  async updateSetting(key: string, value: any): Promise<Setting> {
    const response = await api.put(`/api/settings/${key}`, { value });
    return response.data;
  },
};

// 统计相关 API
export const statsApi = {
  // 获取仪表板统计数据
  async getDashboardStats(): Promise<{
    totalWorks: number;
    totalCategories: number;
    totalViews: number;
    unreadMessages: number;
  }> {
    const response = await api.get('/api/stats/dashboard');
    return response.data;
  },
};

export default api; 