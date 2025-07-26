'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Mail, Download, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';
import { scrollToElement } from '@/lib/utils';

interface HeroSectionProps {
  personalInfo?: {
    name: string;
    title?: string;
    tagline?: string;
    avatar?: string;
    bio?: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ personalInfo }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToWorks = () => {
    scrollToElement('#works');
  };

  const scrollToAbout = () => {
    scrollToElement('#about');
  };

  const scrollToContact = () => {
    scrollToElement('#contact');
  };

  if (!mounted) return null;

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* 海洋渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-cyan-400 to-teal-500">
        {/* 添加纹理效果 */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-blue-600/30 to-transparent"></div>
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white/20 to-transparent"></div>
      </div>

      {/* 主要内容区域 */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* 中心化布局，类似Layla的设计 */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* 主标题 - 模仿"Hi, I'm Layla"的风格 */}
                <div className="space-y-6">
                  <h1 className="text-6xl lg:text-8xl font-light text-white leading-tight">
                    嗨，我是{' '}
                    <span className="font-bold text-purple-300">{personalInfo?.name || 'Lennon'}</span>
                  </h1>
                  
                  {/* 职业描述 */}
                  <div className="space-y-4">
                    <p className="text-xl lg:text-2xl text-white/90 font-light">
                      资深文案策划师与品牌策略专家
                    </p>
                    <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                      专注于创意文案创作和品牌策略规划，用文字的力量为品牌创造价值
                    </p>
                  </div>
                </div>

                {/* About Me 按钮 - 类似Layla的设计 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="pt-8"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={scrollToAbout}
                    className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 px-12 py-4 rounded-2xl font-medium text-lg transition-all duration-300 hover:scale-105"
                  >
                    了解我的故事
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* 个人照片区域 - 放在底部中央 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
            >
              <div className="relative">
                <div className="w-80 h-96 bg-white/10 backdrop-blur-sm border-4 border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/generated/avatar-1.png"
                    alt={personalInfo?.name || 'Lennon'}
                    width={320}
                    height={384}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                
                {/* 装饰性元素 */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-pink-400 rounded-full animate-pulse shadow-lg"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 滚动指示器 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={scrollToWorks}>
          <span className="text-sm text-white/60 group-hover:text-white transition-colors">
            向下滚动探索更多
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60 group-hover:text-white transition-colors"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 