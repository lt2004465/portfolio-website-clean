'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Heart, Target, Zap, Users, Star } from 'lucide-react';

const ValuesSection: React.FC = () => {
  const values = [
    {
      icon: Lightbulb,
      title: '创意思维',
      description: '每个项目都是一次创意的探索，我相信独特的视角能够创造意想不到的价值。',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Heart,
      title: '用心创作',
      description: '文案不仅仅是文字，更是情感的传递。我用心对待每一个字，每一句话。',
      color: 'from-pink-400 to-red-500'
    },
    {
      icon: Target,
      title: '目标导向',
      description: '清晰的目标指引方向，我始终关注如何让文案为品牌带来实际的商业价值。',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Zap,
      title: '高效执行',
      description: '快速理解需求，高效输出方案。在保证品质的前提下，时间就是竞争力。',
      color: 'from-purple-400 to-indigo-500'
    },
    {
      icon: Users,
      title: '深度合作',
      description: '相信团队的力量，善于倾听不同声音，在协作中碰撞出更好的创意火花。',
      color: 'from-green-400 to-teal-500'
    },
    {
      icon: Star,
      title: '持续学习',
      description: '保持好奇心，关注行业趋势，不断学习新的方法和工具来提升专业能力。',
      color: 'from-amber-400 to-yellow-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 bg-secondary-50 dark:bg-secondary-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* 标题区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
              我的核心价值
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto leading-relaxed">
              这些价值观指引着我的每一次创作，也是我与客户建立信任关系的基础
            </p>
          </motion.div>

          {/* 特质网格 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative p-8 bg-white dark:bg-secondary-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-secondary-100 dark:border-secondary-700"
                >
                  {/* 背景渐变装饰 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                  
                  {/* 图标 */}
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* 标题 */}
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {value.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                    {value.description}
                  </p>

                  {/* 装饰线条 */}
                  <div className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300`}></div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* 底部引用 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-2xl md:text-3xl font-medium text-secondary-700 dark:text-secondary-300 italic leading-relaxed">
                "创意不是天马行空，而是在约束中找到突破的可能。"
              </blockquote>
              <p className="text-lg text-secondary-500 dark:text-secondary-400 mt-4">
                — 我的创作理念
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection; 