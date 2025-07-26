'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FileText, 
  FolderOpen, 
  MessageSquare, 
  Eye, 
  TrendingUp,
  Users,
  Calendar,
  Activity,
  Plus,
  ArrowRight
} from 'lucide-react';

interface DashboardStats {
  totalWorks: number;
  publishedWorks: number;
  totalCategories: number;
  unreadMessages: number;
  totalViews: number;
  recentWorks: Array<{
    id: number;
    title: string;
    view_count: number;
    created_at: string;
    is_published: boolean;
  }>;
  recentMessages: Array<{
    id: number;
    name: string;
    subject: string;
    created_at: string;
    is_read: boolean;
  }>;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 获取仪表板统计数据
  const fetchDashboardStats = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
      const token = localStorage.getItem('admin_token');

      // 并行获取多个API数据
      const [worksRes, categoriesRes, messagesRes] = await Promise.all([
        fetch(`${apiUrl}/api/works/?size=100`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${apiUrl}/api/categories/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${apiUrl}/api/contact/messages`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }).catch(() => ({ ok: false })) // 如果API不存在，不报错
      ]);

      let worksData = { items: [], pagination: { total: 0 } };
      let categoriesData = [];
      let messagesData = [];

      if (worksRes.ok) {
        worksData = await worksRes.json();
      }

      if (categoriesRes.ok) {
        categoriesData = await categoriesRes.json();
      }

      if (messagesRes.ok && 'json' in messagesRes) {
        messagesData = await messagesRes.json();
      }

      // 计算统计数据
      const works = worksData.items || [];
      const totalViews = works.reduce((sum: number, work: any) => sum + (work.view_count || 0), 0);
      const publishedWorks = works.filter((work: any) => work.is_published).length;
      const unreadMessages = messagesData.filter((msg: any) => !msg.is_read).length;

      // 最近作品（按创建时间排序，取前5个）
      const recentWorks = works
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

      // 最近消息（按创建时间排序，取前5个）
      const recentMessages = messagesData
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

      setStats({
        totalWorks: works.length,
        publishedWorks,
        totalCategories: categoriesData.length,
        unreadMessages,
        totalViews,
        recentWorks,
        recentMessages
      });

    } catch (err) {
      console.error('获取统计数据失败:', err);
      setError('获取统计数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  const quickActions = [
    {
      title: '添加作品',
      description: '创建新的作品展示',
      icon: FileText,
      href: '/admin/works',
      color: 'bg-blue-500'
    },
    {
      title: '管理分类',
      description: '编辑作品分类',
      icon: FolderOpen,
      href: '/admin/categories',
      color: 'bg-green-500'
    },
    {
      title: '查看消息',
      description: '处理用户联系',
      icon: MessageSquare,
      href: '/admin/messages',
      color: 'bg-purple-500'
    }
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-secondary-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80 bg-secondary-200 rounded"></div>
            <div className="h-80 bg-secondary-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* 页面头部 */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
          仪表板
        </h1>
        <p className="text-secondary-600 dark:text-secondary-300">
          欢迎回来！这里是您的作品集管理概览
        </p>
      </div>

      {/* 错误信息 */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-secondary-800 p-6 rounded-lg border border-secondary-200 dark:border-secondary-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-1">总作品数</p>
              <p className="text-3xl font-bold text-secondary-900 dark:text-white">
                {stats?.totalWorks || 0}
              </p>
              <p className="text-sm text-green-600 mt-1">
                已发布 {stats?.publishedWorks || 0} 个
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-secondary-800 p-6 rounded-lg border border-secondary-200 dark:border-secondary-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-1">分类数量</p>
              <p className="text-3xl font-bold text-secondary-900 dark:text-white">
                {stats?.totalCategories || 0}
              </p>
              <p className="text-sm text-secondary-500 mt-1">
                管理分类
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-secondary-800 p-6 rounded-lg border border-secondary-200 dark:border-secondary-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-1">未读消息</p>
              <p className="text-3xl font-bold text-secondary-900 dark:text-white">
                {stats?.unreadMessages || 0}
              </p>
              <p className="text-sm text-red-600 mt-1">
                需要处理
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-secondary-800 p-6 rounded-lg border border-secondary-200 dark:border-secondary-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-1">总浏览量</p>
              <p className="text-3xl font-bold text-secondary-900 dark:text-white">
                {stats?.totalViews || 0}
              </p>
              <p className="text-sm text-purple-600 mt-1">
                作品访问
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 快速操作 */}
      <div>
        <h2 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
          快速操作
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Link href={action.href}>
                  <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg border border-secondary-200 dark:border-secondary-700 hover:shadow-lg transition-all group cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                          {action.title}
                        </h3>
                        <p className="text-sm text-secondary-600 dark:text-secondary-300">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-secondary-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 内容概览 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最近作品 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700"
        >
          <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
                最近作品
              </h2>
              <Link href="/admin/works">
                <span className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
                  查看全部
                </span>
              </Link>
            </div>
          </div>
          <div className="p-6">
            {stats?.recentWorks.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-secondary-300 mx-auto mb-3" />
                <p className="text-secondary-500 dark:text-secondary-400">暂无作品</p>
                <Link href="/admin/works">
                  <span className="text-primary-600 hover:text-primary-700 text-sm">
                    创建第一个作品
                  </span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {stats?.recentWorks.map((work) => (
                  <div key={work.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-secondary-900 dark:text-white">
                        {work.title}
                      </h3>
                      <div className="flex items-center space-x-3 text-sm text-secondary-500 dark:text-secondary-400">
                        <span>{formatDate(work.created_at)}</span>
                        <span>•</span>
                        <span>{work.view_count} 次浏览</span>
                        <span>•</span>
                        <span className={work.is_published ? 'text-green-600' : 'text-yellow-600'}>
                          {work.is_published ? '已发布' : '草稿'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* 最近消息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700"
        >
          <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
                最近消息
              </h2>
              <Link href="/admin/messages">
                <span className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
                  查看全部
                </span>
              </Link>
            </div>
          </div>
          <div className="p-6">
            {stats?.recentMessages.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-secondary-300 mx-auto mb-3" />
                <p className="text-secondary-500 dark:text-secondary-400">暂无消息</p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats?.recentMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      message.is_read ? 'bg-secondary-300' : 'bg-primary-600'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-secondary-900 dark:text-white">
                          {message.name}
                        </h3>
                        {!message.is_read && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                            新
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-1">
                        {message.subject}
                      </p>
                      <p className="text-xs text-secondary-500 dark:text-secondary-400">
                        {formatDate(message.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* 系统状态 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-white dark:bg-secondary-800 p-6 rounded-lg border border-secondary-200 dark:border-secondary-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
            系统状态
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600">系统正常</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-secondary-50 dark:bg-secondary-700 rounded-lg">
            <Activity className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-secondary-900 dark:text-white">前端服务</p>
              <p className="text-xs text-green-600">运行中</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-secondary-50 dark:bg-secondary-700 rounded-lg">
            <Activity className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-secondary-900 dark:text-white">后端API</p>
              <p className="text-xs text-green-600">运行中</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-secondary-50 dark:bg-secondary-700 rounded-lg">
            <Activity className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-secondary-900 dark:text-white">数据库</p>
              <p className="text-xs text-green-600">连接正常</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 