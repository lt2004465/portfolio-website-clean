'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Sun, Moon } from 'lucide-react';
import { scrollToElement } from '@/lib/utils';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  // 监听滚动事件，改变导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 检查当前主题
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  // 切换主题
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const navItems = [
    { name: '首页', href: '/', section: '#hero' },
    { name: '作品', href: '/', section: '#works' },
    { name: '关于', href: '/', section: '#about' },
    { name: '联系', href: '/', section: '#contact' },
    { name: 'AI素材', href: '/gallery', section: null },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (pathname === '/' && item.section) {
      // 在首页，使用锚点滚动
      scrollToElement(item.section);
    } else {
      // 不在首页，跳转到首页再滚动
      window.location.href = item.href + item.section;
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-secondary-900/90 backdrop-blur-lg shadow-lg border-b border-secondary-100 dark:border-secondary-800'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                {/* 小装饰点 */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  Lennon
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  文案策划师
                </div>
              </div>
            </Link>

            {/* 桌面端导航 */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-6 transition-all duration-300 rounded-full"></span>
                </button>
              ))}
            </div>

            {/* 右侧按钮组 */}
            <div className="hidden md:flex items-center space-x-4">
              {/* 主题切换 */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="切换主题"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* 后台管理 */}
              <Link
                href="/admin/login"
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                <User className="w-4 h-4" />
                <span>管理后台</span>
              </Link>
            </div>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300"
              aria-label="打开菜单"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-secondary-900 border-t border-secondary-100 dark:border-secondary-800 shadow-lg"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className="block w-full text-left px-4 py-3 text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800 rounded-lg font-medium transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
                
                <div className="flex items-center justify-between pt-4 border-t border-secondary-100 dark:border-secondary-800">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center space-x-2 px-4 py-2 text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    <span>{isDark ? '浅色模式' : '深色模式'}</span>
                  </button>
                  
                  <Link
                    href="/admin/login"
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>管理后台</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* 为固定导航栏添加顶部间距 */}
      <div className="h-16"></div>
    </>
  );
};

export default Navigation; 