export interface ValidationError {
  field: string;
  message: string;
}

export interface WorkFormData {
  title: string;
  slug: string;
  description: string;
  content: string;
  category_id: string | number;
  tags: string;
  featured_image: string;
  is_featured: boolean;
  is_published: boolean;
}

export function validateWorkForm(data: WorkFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // 标题验证
  if (!data.title.trim()) {
    errors.push({ field: 'title', message: '请输入作品标题' });
  } else if (data.title.length > 200) {
    errors.push({ field: 'title', message: '标题长度不能超过200个字符' });
  }

  // slug验证
  if (!data.slug.trim()) {
    errors.push({ field: 'slug', message: '请输入URL别名' });
  } else if (!/^[a-z0-9\-]+$/.test(data.slug)) {
    errors.push({ field: 'slug', message: 'URL别名只能包含小写字母、数字和短横线' });
  } else if (data.slug.length > 200) {
    errors.push({ field: 'slug', message: 'URL别名长度不能超过200个字符' });
  }

  // 描述验证
  if (data.description && data.description.length > 500) {
    errors.push({ field: 'description', message: '描述长度不能超过500个字符' });
  }

  // 内容验证
  if (!data.content.trim()) {
    errors.push({ field: 'content', message: '请输入作品内容' });
  } else if (data.content.length > 50000) {
    errors.push({ field: 'content', message: '内容长度不能超过50000个字符' });
  }

  // 标签验证
  if (data.tags) {
    const tagList = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    if (tagList.length > 10) {
      errors.push({ field: 'tags', message: '标签数量不能超过10个' });
    }
    for (const tag of tagList) {
      if (tag.length > 50) {
        errors.push({ field: 'tags', message: '单个标签长度不能超过50个字符' });
        break;
      }
    }
  }

  return errors;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function sanitizeSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格替换为短横线
    .replace(/-+/g, '-') // 多个短横线合并为一个
    .replace(/^-+|-+$/g, ''); // 移除首尾短横线
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
} 