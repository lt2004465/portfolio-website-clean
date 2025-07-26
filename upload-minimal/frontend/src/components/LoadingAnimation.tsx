'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingAnimationProps {
  isLoading: boolean;
  onComplete?: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  isLoading, 
  onComplete 
}) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('加载中');

  const loadingTexts = [
    '正在初始化',
    '加载中',
    '准备就绪',
    '即将完成'
  ];

  // 模拟加载进度
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    // 切换加载文本
    const textInterval = setInterval(() => {
      setLoadingText(loadingTexts[Math.floor(Math.random() * loadingTexts.length)]);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[10000] bg-gradient-to-br from-white via-primary-50 to-secondary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-primary-900"
        >
          {/* 背景动画粒子 */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary-400/30 rounded-full"
                animate={{
                  x: [0, Math.random() * window.innerWidth],
                  y: [0, Math.random() * window.innerHeight],
                  scale: [0, 1, 0],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                }}
              />
            ))}
          </div>

          {/* 主要内容 */}
          <div className="flex flex-col items-center justify-center h-full px-4">
            {/* Logo动画 */}
            <motion.div
              initial={{ scale: 0, rotateY: 0 }}
              animate={{ 
                scale: 1, 
                rotateY: 360,
              }}
              transition={{ 
                scale: { duration: 0.8, ease: "easeOut" },
                rotateY: { duration: 2, ease: "easeInOut", repeat: Infinity }
              }}
              className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-2xl mb-8"
            >
              <span className="text-white font-bold text-2xl">L</span>
            </motion.div>

            {/* 品牌名称 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl font-bold text-secondary-900 dark:text-white mb-4"
            >
              Lennon Portfolio
            </motion.h1>

            {/* 加载文本 */}
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="text-secondary-600 dark:text-secondary-300 mb-8 text-lg"
            >
              {loadingText}...
            </motion.p>

            {/* 进度条容器 */}
            <div className="w-full max-w-xs mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-secondary-500 dark:text-secondary-400">
                  进度
                </span>
                <span className="text-sm font-mono text-secondary-700 dark:text-secondary-300">
                  {Math.round(progress)}%
                </span>
              </div>
              
              {/* 进度条 */}
              <div className="w-full h-2 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* 加载指示器 */}
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-primary-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* 提示文本 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-xs text-secondary-400 dark:text-secondary-500 mt-8 text-center max-w-sm"
            >
              正在为您准备最佳的浏览体验
            </motion.p>
          </div>

          {/* 完成动画 */}
          {progress >= 100 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
              >
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 页面切换加载动画
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
};

// 骨架屏组件
export const SkeletonLoader: React.FC<{ 
  className?: string;
  count?: number;
}> = ({ className = '', count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-gradient-to-r from-secondary-200 via-secondary-100 to-secondary-200 dark:from-secondary-700 dark:via-secondary-600 dark:to-secondary-700 ${className}`}
        />
      ))}
    </>
  );
};

export default LoadingAnimation; 