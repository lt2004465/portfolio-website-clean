// 用户相关类型
export interface User {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

// 分类相关类型
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

// 作品相关类型
export interface Work {
  id: number;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  category_id?: number;
  category?: Category;
  featured_image?: string;
  gallery_images: string[];
  tags: string[];
  client_name?: string;
  project_date?: string;
  project_url?: string;
  is_featured: boolean;
  is_published: boolean;
  view_count: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// 个人信息类型
export interface PersonalInfo {
  id: number;
  name: string;
  title?: string;
  tagline?: string;
  bio?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  social_links: Record<string, string>;
  skills: string[];
  resume_url?: string;
  is_active: boolean;
  updated_at: string;
}

// 联系消息类型
export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: boolean;
  replied_at?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// 网站设置类型
export interface Setting {
  id: number;
  key: string;
  value?: string;
  description?: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  is_public: boolean;
  updated_at: string;
}

// API 响应类型
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
  total?: number;
  page?: number;
  limit?: number;
}

// 分页参数类型
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  category_id?: number;
  is_featured?: boolean;
  is_published?: boolean;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// 表单数据类型
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface LoginFormData {
  username: string;
  password: string;
  remember_me?: boolean;
}

export interface WorkFormData {
  title: string;
  slug: string;
  description?: string;
  content?: string;
  category_id?: number;
  featured_image?: string;
  gallery_images: string[];
  tags: string[];
  client_name?: string;
  project_date?: string;
  project_url?: string;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  color?: string;
  sort_order: number;
  is_active: boolean;
}

// 组件Props类型
export interface WorkCardProps {
  work: Work;
  onView?: (work: Work) => void;
  className?: string;
}

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: number;
  onCategoryChange: (categoryId?: number) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: any;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: any;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

// 状态管理类型
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export interface WorksState {
  works: Work[];
  categories: Category[];
  currentWork: Work | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  filters: {
    search: string;
    category_id?: number;
    is_featured?: boolean;
  };
  fetchWorks: (params?: PaginationParams) => Promise<void>;
  fetchWork: (id: number) => Promise<void>;
  createWork: (data: WorkFormData) => Promise<void>;
  updateWork: (id: number, data: Partial<WorkFormData>) => Promise<void>;
  deleteWork: (id: number) => Promise<void>;
  setFilters: (filters: Partial<WorksState['filters']>) => void;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
  notifications: Notification[];
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLoading: (loading: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

// 环境变量类型
export interface Env {
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_SITE_URL: string;
}

// 文件上传类型
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  type: string;
}

export interface FileUploadOptions {
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
}

// 错误类型
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
} 