import { Work, Category, PersonalInfo } from '@/types';

// 模拟个人信息数据
export const mockPersonalInfo: PersonalInfo = {
  id: 1,
  name: 'Lennon',
  title: '文案策划师 · 创意工作者',
  tagline: '创意无限，作品精彩',
  bio: '我是一名专业的文案策划师，专注于创意文案、品牌策划和营销推广。拥有多年的行业经验，为众多品牌提供过优质的文案服务。我相信好的文案不仅要有创意，更要能够打动人心，传达品牌价值。',
  avatar: '/images/avatar.jpg',
  email: 'lennon@example.com',
  phone: '+86 138 0013 8000',
  location: '中国 · 上海',
  website: 'https://lennon-portfolio.com',
  social_links: {
    github: 'https://github.com/lennon',
    linkedin: 'https://linkedin.com/in/lennon',
    twitter: 'https://twitter.com/lennon',
    wechat: 'lennon_wechat'
  },
  skills: [
    '创意文案',
    '品牌策划',
    '营销推广',
    '广告文案',
    '内容营销',
    '社交媒体运营',
    '品牌故事',
    'H5策划',
    '活动策划',
    '视频文案'
  ],
  resume_url: '/files/resume.pdf',
  is_active: true,
  updated_at: '2024-01-01T00:00:00Z'
};

// 模拟分类数据
export const mockCategories: Category[] = [
  {
    id: 1,
    name: '品牌文案',
    slug: 'brand-copy',
    description: '专业的品牌文案创作',
    color: '#3B82F6',
    sort_order: 1,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: '广告文案',
    slug: 'ad-copy',
    description: '创意广告文案设计',
    color: '#EF4444',
    sort_order: 2,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: '活动策划',
    slug: 'event-planning',
    description: '营销活动策划方案',
    color: '#10B981',
    sort_order: 3,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'H5文案',
    slug: 'h5-copy',
    description: 'H5页面文案创作',
    color: '#F59E0B',
    sort_order: 4,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    name: '视频文案',
    slug: 'video-copy',
    description: '视频内容文案策划',
    color: '#8B5CF6',
    sort_order: 5,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z'
  }
];

// 模拟作品数据
export const mockWorks: Work[] = [
  {
    id: 1,
    title: '某知名运动品牌春季营销文案',
    slug: 'sports-brand-spring-campaign',
    description: '为知名运动品牌打造的春季营销活动文案，主题围绕"春暖花开，运动正当时"展开，通过情感化的表达激发用户的运动热情。',
    content: `# 春暖花开，运动正当时\n\n## 项目背景\n这是一个针对春季市场的营销活动文案项目...\n\n## 创作理念\n通过季节性的情感共鸣，将品牌价值与用户生活方式深度绑定...`,
    category_id: 1,
    category: mockCategories[0],
    featured_image: '/images/works/work-1.jpg',
    gallery_images: ['/images/works/work-1-1.jpg', '/images/works/work-1-2.jpg'],
    tags: ['运动品牌', '营销文案', '情感营销', '春季活动'],
    client_name: '某知名运动品牌',
    project_date: '2024-03-15',
    project_url: 'https://example.com/campaign',
    is_featured: true,
    is_published: true,
    view_count: 1250,
    sort_order: 1,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 2,
    title: '高端美妆品牌产品发布会文案策划',
    slug: 'luxury-cosmetics-launch-event',
    description: '为高端美妆品牌新品发布会策划的系列文案，包括邀请函、现场互动、媒体稿件等全套文案内容。',
    content: `# 美丽新境界 - 产品发布会文案策划\n\n## 活动概述\n本次发布会旨在展示品牌最新产品线...`,
    category_id: 3,
    category: mockCategories[2],
    featured_image: '/images/works/work-2.jpg',
    gallery_images: ['/images/works/work-2-1.jpg'],
    tags: ['美妆品牌', '发布会', '活动策划', '媒体传播'],
    client_name: '高端美妆品牌',
    project_date: '2024-02-20',
    is_featured: true,
    is_published: true,
    view_count: 890,
    sort_order: 2,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z'
  },
  {
    id: 3,
    title: '互联网金融APP推广H5文案',
    slug: 'fintech-app-h5-promotion',
    description: '为互联网金融APP设计的推广H5页面文案，通过场景化的故事讲述，提升用户对产品的信任度和使用意愿。',
    content: `# 理财新选择 - H5推广文案\n\n## 设计理念\n通过用户真实的理财场景...`,
    category_id: 4,
    category: mockCategories[3],
    featured_image: '/images/works/work-3.jpg',
    gallery_images: [],
    tags: ['金融科技', 'H5文案', 'APP推广', '用户转化'],
    client_name: '某互联网金融公司',
    project_date: '2024-01-10',
    is_featured: false,
    is_published: true,
    view_count: 654,
    sort_order: 3,
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z'
  },
  {
    id: 4,
    title: '餐饮连锁品牌电视广告文案',
    slug: 'restaurant-chain-tv-commercial',
    description: '为知名餐饮连锁品牌创作的电视广告文案，30秒版本，主打"家的味道"情感牌，获得了良好的市场反响。',
    content: `# 家的味道 - 电视广告文案\n\n## 广告脚本\n画面：温馨的家庭聚餐场景...`,
    category_id: 2,
    category: mockCategories[1],
    featured_image: '/images/works/work-4.jpg',
    gallery_images: ['/images/works/work-4-1.jpg', '/images/works/work-4-2.jpg', '/images/works/work-4-3.jpg'],
    tags: ['餐饮品牌', '电视广告', '情感营销', '家庭情感'],
    client_name: '知名餐饮连锁',
    project_date: '2023-12-15',
    project_url: 'https://example.com/tv-ad',
    is_featured: false,
    is_published: true,
    view_count: 2100,
    sort_order: 4,
    created_at: '2023-12-20T00:00:00Z',
    updated_at: '2023-12-20T00:00:00Z'
  },
  {
    id: 5,
    title: '教育科技公司品牌宣传视频文案',
    slug: 'edtech-brand-video-script',
    description: '为教育科技公司制作的品牌宣传视频文案，时长3分钟，展现了公司的教育理念和技术优势，用于公司官网和社交媒体推广。',
    content: `# 智慧教育，点亮未来 - 品牌视频文案\n\n## 视频概念\n展现科技与教育的完美结合...`,
    category_id: 5,
    category: mockCategories[4],
    featured_image: '/images/works/work-5.jpg',
    gallery_images: ['/images/works/work-5-1.jpg'],
    tags: ['教育科技', '品牌视频', '企业宣传', '技术展示'],
    client_name: '某教育科技公司',
    project_date: '2023-11-30',
    is_featured: true,
    is_published: true,
    view_count: 1456,
    sort_order: 5,
    created_at: '2023-11-25T00:00:00Z',
    updated_at: '2023-11-25T00:00:00Z'
  },
  {
    id: 6,
    title: '时尚品牌双十一营销活动文案',
    slug: 'fashion-brand-1111-campaign',
    description: '为时尚品牌策划的双十一购物节营销活动全套文案，包括预热、正式活动、售后等各个阶段的传播内容。',
    content: `# 时尚狂欢节 - 双十一营销文案\n\n## 活动策略\n分阶段的营销传播策略...`,
    category_id: 1,
    category: mockCategories[0],
    featured_image: '/images/works/work-6.jpg',
    gallery_images: [],
    tags: ['时尚品牌', '双十一', '电商营销', '购物节'],
    client_name: '某时尚品牌',
    project_date: '2023-10-25',
    is_featured: false,
    is_published: true,
    view_count: 987,
    sort_order: 6,
    created_at: '2023-10-20T00:00:00Z',
    updated_at: '2023-10-20T00:00:00Z'
  }
];

// 模拟API响应数据
export const mockWorksResponse = {
  data: mockWorks,
  total: mockWorks.length,
  page: 1,
  limit: 12,
  success: true
}; 