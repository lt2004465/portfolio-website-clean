'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Globe, 
  Mail, 
  Shield, 
  Database, 
  Image as ImageIcon,
  Palette,
  Settings as SettingsIcon,
  AlertCircle
} from 'lucide-react';

interface WebsiteSettings {
  site_title: string;
  site_description: string;
  site_keywords: string;
  contact_email: string;
  author_name: string;
  max_file_size: number;
  allowed_image_types: string;
  maintenance_mode: boolean;
  analytics_code: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<WebsiteSettings>({
    site_title: 'Lennon - 个人作品集',
    site_description: '专业文案策划师个人作品集，展示创意文案、品牌策划、营销推广等优秀作品。',
    site_keywords: '文案策划,品牌策划,营销推广,创意文案,广告文案,个人作品集',
    contact_email: 'lennon@example.com',
    author_name: 'Lennon',
    max_file_size: 10,
    allowed_image_types: 'jpg,jpeg,png,gif,webp',
    maintenance_mode: false,
    analytics_code: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  // 保存设置
  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // 模拟保存设置的API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('设置保存成功！');
      
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      console.error('保存设置失败:', err);
      setError('保存设置失败');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'general', name: '基本设置', icon: Globe },
    { id: 'content', name: '内容设置', icon: SettingsIcon },
    { id: 'upload', name: '上传设置', icon: ImageIcon },
    { id: 'security', name: '安全设置', icon: Shield },
    { id: 'advanced', name: '高级设置', icon: Database }
  ];

  return (
    <div className="p-6">
      {/* 页面头部 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
          系统设置
        </h1>
        <p className="text-secondary-600 dark:text-secondary-300">
          管理网站的基本配置和参数
        </p>
      </div>

      {/* 消息提示 */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
        >
          <p className="text-green-800 dark:text-green-200">{success}</p>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 侧边栏导航 */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700">
            <div className="p-4">
              <h3 className="font-semibold text-secondary-900 dark:text-white mb-3">
                设置分类
              </h3>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                          : 'text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* 设置内容 */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700">
            <div className="p-6">
              {/* 基本设置 */}
              {activeTab === 'general' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                      基本设置
                    </h2>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      网站标题
                    </label>
                    <input
                      type="text"
                      value={settings.site_title}
                      onChange={(e) => setSettings(prev => ({ ...prev, site_title: e.target.value }))}
                      className="w-full px-3 py-2 border border-secondary-200 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      网站描述
                    </label>
                    <textarea
                      value={settings.site_description}
                      onChange={(e) => setSettings(prev => ({ ...prev, site_description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-secondary-200 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      关键词 (用逗号分隔)
                    </label>
                    <input
                      type="text"
                      value={settings.site_keywords}
                      onChange={(e) => setSettings(prev => ({ ...prev, site_keywords: e.target.value }))}
                      className="w-full px-3 py-2 border border-secondary-200 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      联系邮箱
                    </label>
                    <input
                      type="email"
                      value={settings.contact_email}
                      onChange={(e) => setSettings(prev => ({ ...prev, contact_email: e.target.value }))}
                      className="w-full px-3 py-2 border border-secondary-200 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      作者姓名
                    </label>
                    <input
                      type="text"
                      value={settings.author_name}
                      onChange={(e) => setSettings(prev => ({ ...prev, author_name: e.target.value }))}
                      className="w-full px-3 py-2 border border-secondary-200 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white"
                    />
                  </div>
                </motion.div>
              )}

              {/* 内容设置 */}
              {activeTab === 'content' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                      内容设置
                    </h2>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex">
                      <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                          内容管理功能
                        </h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          这里可以配置作品展示、分类管理、富文本编辑器等内容相关的设置。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => {}}
                        className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">
                        允许游客评论
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => {}}
                        className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">
                        启用作品浏览统计
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => {}}
                        className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">
                        启用SEO优化
                      </span>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* 上传设置 */}
              {activeTab === 'upload' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                      文件上传设置
                    </h2>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      最大文件大小 (MB)
                    </label>
                    <input
                      type="number"
                      value={settings.max_file_size}
                      onChange={(e) => setSettings(prev => ({ ...prev, max_file_size: Number(e.target.value) }))}
                      min="1"
                      max="100"
                      className="w-full px-3 py-2 border border-secondary-200 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      允许的图片格式
                    </label>
                    <input
                      type="text"
                      value={settings.allowed_image_types}
                      onChange={(e) => setSettings(prev => ({ ...prev, allowed_image_types: e.target.value }))}
                      placeholder="jpg,jpeg,png,gif,webp"
                      className="w-full px-3 py-2 border border-secondary-200 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white"
                    />
                    <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                      用逗号分隔不同格式
                    </p>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <div className="flex">
                      <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                          上传限制说明
                        </h3>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          文件大小限制和格式限制将影响所有用户的文件上传功能。建议根据服务器性能和存储空间合理设置。
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 安全设置 */}
              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                      安全设置
                    </h2>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.maintenance_mode}
                        onChange={(e) => setSettings(prev => ({ ...prev, maintenance_mode: e.target.checked }))}
                        className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">
                        维护模式
                      </span>
                    </label>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1 ml-6">
                      启用后前台将显示维护页面，只有管理员可以访问
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => {}}
                        className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">
                        启用HTTPS重定向
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => {}}
                        className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">
                        启用CSRF保护
                      </span>
                    </label>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <div className="flex">
                      <Shield className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                          安全提醒
                        </h3>
                        <p className="text-sm text-red-700 dark:text-red-300">
                          定期更新密码，启用双因素认证，监控登录日志，确保系统安全。
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 高级设置 */}
              {activeTab === 'advanced' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                      高级设置
                    </h2>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      统计代码 (Google Analytics 等)
                    </label>
                    <textarea
                      value={settings.analytics_code}
                      onChange={(e) => setSettings(prev => ({ ...prev, analytics_code: e.target.value }))}
                      rows={4}
                      placeholder="<!-- 在这里粘贴您的统计代码 -->"
                      className="w-full px-3 py-2 border border-secondary-200 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white font-mono text-sm"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">
                      缓存设置
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={true}
                          onChange={() => {}}
                          className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">
                          启用页面缓存
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={true}
                          onChange={() => {}}
                          className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">
                          启用API缓存
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      系统信息
                    </h3>
                    <div className="space-y-1 text-sm text-secondary-600 dark:text-secondary-400">
                      <div>前端版本: Next.js 14.2.30</div>
                      <div>后端版本: FastAPI 0.104.1</div>
                      <div>数据库: SQLite</div>
                      <div>Node.js: v18.17.0</div>
                      <div>Python: 3.11.6</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 保存按钮 */}
              <div className="mt-8 pt-6 border-t border-secondary-200 dark:border-secondary-700">
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white rounded-lg font-medium transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    <span>{loading ? '保存中...' : '保存设置'}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 