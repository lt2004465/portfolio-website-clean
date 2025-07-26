import { create } from 'zustand';
import { WorksState, Work, Category, PaginationParams, WorkFormData } from '@/types';
import { worksApi, categoriesApi } from '@/lib/api';

export const useWorksStore = create<WorksState>((set, get) => ({
  works: [],
  categories: [],
  currentWork: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
  },
  filters: {
    search: '',
    category_id: undefined,
    is_featured: undefined,
  },

  // 获取作品列表
  fetchWorks: async (params?: PaginationParams) => {
    set({ loading: true, error: null });
    
    try {
      const queryParams = {
        ...get().pagination,
        ...get().filters,
        ...params,
      };
      
      const response = await worksApi.getWorks(queryParams);
      
      set({
        works: response.data || [],
        pagination: {
          page: response.page || 1,
          limit: response.limit || 12,
          total: response.total || 0,
        },
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || '获取作品列表失败',
        loading: false,
      });
    }
  },

  // 获取单个作品
  fetchWork: async (id: number) => {
    set({ loading: true, error: null });
    
    try {
      const work = await worksApi.getWork(id);
      set({
        currentWork: work,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || '获取作品详情失败',
        loading: false,
      });
    }
  },

  // 根据 slug 获取作品
  fetchWorkBySlug: async (slug: string) => {
    set({ loading: true, error: null });
    
    try {
      const work = await worksApi.getWorkBySlug(slug);
      set({
        currentWork: work,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || '获取作品详情失败',
        loading: false,
      });
    }
  },

  // 创建作品
  createWork: async (data: WorkFormData) => {
    set({ loading: true, error: null });
    
    try {
      const newWork = await worksApi.createWork(data);
      const { works } = get();
      
      set({
        works: [newWork, ...works],
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || '创建作品失败',
        loading: false,
      });
      throw error;
    }
  },

  // 更新作品
  updateWork: async (id: number, data: Partial<WorkFormData>) => {
    set({ loading: true, error: null });
    
    try {
      const updatedWork = await worksApi.updateWork(id, data);
      const { works, currentWork } = get();
      
      set({
        works: works.map(work => work.id === id ? updatedWork : work),
        currentWork: currentWork?.id === id ? updatedWork : currentWork,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || '更新作品失败',
        loading: false,
      });
      throw error;
    }
  },

  // 删除作品
  deleteWork: async (id: number) => {
    set({ loading: true, error: null });
    
    try {
      await worksApi.deleteWork(id);
      const { works, currentWork } = get();
      
      set({
        works: works.filter(work => work.id !== id),
        currentWork: currentWork?.id === id ? null : currentWork,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || '删除作品失败',
        loading: false,
      });
      throw error;
    }
  },

  // 设置筛选条件
  setFilters: (filters: Partial<WorksState['filters']>) => {
    set({
      filters: {
        ...get().filters,
        ...filters,
      },
      pagination: {
        ...get().pagination,
        page: 1, // 重置页码
      },
    });
  },

  // 获取分类列表
  fetchCategories: async () => {
    try {
      const categories = await categoriesApi.getCategories();
      set({ categories });
    } catch (error: any) {
      console.error('获取分类列表失败:', error);
    }
  },

  // 增加浏览量
  incrementViewCount: async (id: number) => {
    try {
      await worksApi.incrementViewCount(id);
      const { works, currentWork } = get();
      
      // 更新本地状态中的浏览量
      set({
        works: works.map(work => 
          work.id === id 
            ? { ...work, view_count: work.view_count + 1 }
            : work
        ),
        currentWork: currentWork?.id === id 
          ? { ...currentWork, view_count: currentWork.view_count + 1 }
          : currentWork,
      });
    } catch (error: any) {
      console.error('增加浏览量失败:', error);
    }
  },

  // 重置状态
  reset: () => {
    set({
      works: [],
      currentWork: null,
      loading: false,
      error: null,
      pagination: {
        page: 1,
        limit: 12,
        total: 0,
      },
      filters: {
        search: '',
        category_id: undefined,
        is_featured: undefined,
      },
    });
  },
})); 