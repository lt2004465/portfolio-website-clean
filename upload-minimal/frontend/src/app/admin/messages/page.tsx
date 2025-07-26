'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MailOpen, 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  Calendar,
  User,
  MessageSquare
} from 'lucide-react';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
  ip_address?: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // 获取联系消息列表
  const fetchMessages = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch(`${apiUrl}/api/contact/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('获取消息失败');
      }

      const data = await response.json();
      setMessages(data || []);
    } catch (err) {
      console.error('获取消息失败:', err);
      setError('获取消息失败');
    } finally {
      setLoading(false);
    }
  };

  // 标记消息为已读
  const markAsRead = async (messageId: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch(`${apiUrl}/api/contact/messages/${messageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ is_read: true }),
      });

      if (!response.ok) {
        throw new Error('标记失败');
      }

      await fetchMessages(); // 重新获取消息列表
    } catch (err) {
      console.error('标记失败:', err);
      setError('标记失败');
    }
  };

  // 删除消息
  const handleDelete = async (messageId: number) => {
    if (!confirm('确定要删除这条消息吗？')) {
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch(`${apiUrl}/api/contact/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('删除失败');
      }

      await fetchMessages(); // 重新获取消息列表
    } catch (err) {
      console.error('删除失败:', err);
      setError('删除失败');
    }
  };

  // 查看消息详情
  const viewMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    
    // 如果消息未读，标记为已读
    if (!message.is_read) {
      await markAsRead(message.id);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // 过滤消息
  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' ||
      (filterStatus === 'read' && message.is_read) ||
      (filterStatus === 'unread' && !message.is_read);

    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-secondary-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* 页面头部 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
              联系消息
            </h1>
            <p className="text-secondary-600 dark:text-secondary-300 mt-2">
              查看和管理用户联系消息
            </p>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
            <input
              type="text"
              placeholder="搜索消息..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-secondary-200 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'unread' | 'read')}
              className="pl-10 pr-8 py-2 border border-secondary-200 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white appearance-none cursor-pointer"
            >
              <option value="all">所有消息</option>
              <option value="unread">未读消息</option>
              <option value="read">已读消息</option>
            </select>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg border border-secondary-200 dark:border-secondary-700">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-primary-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-primary-600">{messages.length}</div>
                <div className="text-sm text-secondary-600 dark:text-secondary-300">总消息数</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg border border-secondary-200 dark:border-secondary-700">
            <div className="flex items-center">
              <Mail className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
                <div className="text-sm text-secondary-600 dark:text-secondary-300">未读消息</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg border border-secondary-200 dark:border-secondary-700">
            <div className="flex items-center">
              <MailOpen className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-green-600">{messages.length - unreadCount}</div>
                <div className="text-sm text-secondary-600 dark:text-secondary-300">已读消息</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 错误信息 */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* 消息列表 */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="p-8 text-center text-secondary-500 dark:text-secondary-400">
            {searchTerm || filterStatus !== 'all' ? '没有找到匹配的消息' : '暂无消息'}
          </div>
        ) : (
          <div className="divide-y divide-secondary-200 dark:divide-secondary-700">
            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors cursor-pointer ${
                  !message.is_read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                onClick={() => viewMessage(message)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-2">
                        {message.is_read ? (
                          <MailOpen className="w-5 h-5 text-secondary-400" />
                        ) : (
                          <Mail className="w-5 h-5 text-primary-600" />
                        )}
                        <span className={`font-medium ${
                          !message.is_read 
                            ? 'text-secondary-900 dark:text-white' 
                            : 'text-secondary-600 dark:text-secondary-300'
                        }`}>
                          {message.name}
                        </span>
                      </div>
                      <span className="text-sm text-secondary-500 dark:text-secondary-400">
                        {message.email}
                      </span>
                      {!message.is_read && (
                        <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                          新消息
                        </span>
                      )}
                    </div>
                    
                    <h3 className={`text-lg mb-2 ${
                      !message.is_read 
                        ? 'font-semibold text-secondary-900 dark:text-white' 
                        : 'font-medium text-secondary-700 dark:text-secondary-200'
                    }`}>
                      {message.subject}
                    </h3>
                    
                    <p className="text-secondary-600 dark:text-secondary-300 line-clamp-2 mb-3">
                      {message.message}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-secondary-500 dark:text-secondary-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(message.created_at)}</span>
                      </div>
                      {message.ip_address && (
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{message.ip_address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        viewMessage(message);
                      }}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      title="查看详情"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="删除消息"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* 消息详情模态框 */}
      {selectedMessage && (
        <MessageDetailModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  );
}

// 消息详情模态框组件
function MessageDetailModal({ 
  message, 
  onClose 
}: { 
  message: ContactMessage;
  onClose: () => void;
}) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-secondary-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
            消息详情
          </h2>
          <button
            onClick={onClose}
            className="text-secondary-400 hover:text-secondary-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* 发件人信息 */}
          <div className="bg-secondary-50 dark:bg-secondary-700 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  姓名
                </label>
                <p className="text-secondary-900 dark:text-white">{message.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  邮箱
                </label>
                <p className="text-secondary-900 dark:text-white">{message.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  发送时间
                </label>
                <p className="text-secondary-900 dark:text-white">{formatDate(message.created_at)}</p>
              </div>
              {message.ip_address && (
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                    IP地址
                  </label>
                  <p className="text-secondary-900 dark:text-white">{message.ip_address}</p>
                </div>
              )}
            </div>
          </div>

          {/* 消息主题 */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              主题
            </label>
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
              {message.subject}
            </h3>
          </div>

          {/* 消息内容 */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              消息内容
            </label>
            <div className="bg-white dark:bg-secondary-900 p-4 rounded-lg border border-secondary-200 dark:border-secondary-600">
              <p className="text-secondary-900 dark:text-white whitespace-pre-wrap">
                {message.message}
              </p>
            </div>
          </div>

          {/* 快速回复 */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              快速回复
            </label>
            <div className="flex space-x-2">
              <a
                href={`mailto:${message.email}?subject=Re: ${message.subject}&body=感谢您的来信！%0D%0A%0D%0A原始消息：%0D%0A${encodeURIComponent(message.message)}`}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>邮件回复</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-colors"
          >
            关闭
          </button>
        </div>
      </motion.div>
    </div>
  );
} 