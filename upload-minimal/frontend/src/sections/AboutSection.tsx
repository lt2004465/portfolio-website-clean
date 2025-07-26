'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AboutSectionProps {
  personalInfo?: {
    name?: string;
    bio?: string;
    experience?: string;
    education?: string;
  };
}

const AboutSection: React.FC<AboutSectionProps> = ({ personalInfo }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const aboutCards = [
    {
      title: "教育背景",
      content: "广告学学士学位，专注于品牌传播与创意策略研究。在校期间参与多个校园品牌推广项目，为日后的专业发展奠定了坚实基础。",
      icon: "🎓"
    },
    {
      title: "职业起点", 
      content: "从广告公司文案实习生开始，在导师的指导下学习文案创作的基本功，逐步掌握了品牌定位、消费者洞察等核心技能。",
      icon: "🌱"
    },
    {
      title: "成长历程",
      content: "在5年的职业生涯中，从初级文案成长为资深策划师，服务过50+品牌客户，积累了丰富的跨行业文案创作经验。",
      icon: "📈"
    },
    {
      title: "专业理念",
      content: "相信每个品牌都有独特的故事值得被讲述。通过深入的市场洞察和创意表达，用文字的力量为品牌注入灵魂，创造真正的价值。",
      icon: "💡"
    },
    {
      title: "未来愿景",
      content: "致力于成为品牌文案领域的专家，不断探索文案与新媒体、AI技术的结合，为更多品牌创造有影响力的内容。",
      icon: "🚀"
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-blue-400 via-blue-500 to-teal-400 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* 标题区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-light text-white mb-8 leading-tight">
              A passion for creating
              <br />
              <span className="font-bold">differences</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              每一次创作都是一场关于可能性的探索，用文字的力量为品牌和用户之间架起沟通的桥梁
            </p>
          </motion.div>

          {/* 关于内容卡片 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {aboutCards.map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                {/* 图标 */}
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                
                {/* 标题 */}
                <h3 className="text-xl font-bold text-white mb-4">
                  {card.title}
                </h3>
                
                {/* 内容 */}
                <p className="text-white/80 leading-relaxed">
                  {card.content}
                </p>

                {/* 装饰性元素 */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full group-hover:bg-white/50 transition-colors duration-300"></div>
              </motion.div>
            ))}
          </motion.div>

          {/* 个人简介区域 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* 头像区域 */}
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-5xl font-bold text-white">
                    {personalInfo?.name?.[0] || 'L'}
                  </span>
                </div>
                
                {/* 简介文字 */}
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {personalInfo?.name || 'Lennon'}
                  </h3>
                  <p className="text-white/90 leading-relaxed mb-6">
                    {personalInfo?.bio || '资深文案策划师，拥有5年行业经验，专注于品牌策略和创意文案。相信文字的力量能够触动人心，为品牌创造真正的价值。'}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="bg-white/20 px-4 py-2 rounded-full text-white">
                      <span className="font-medium">经验：</span>
                      {personalInfo?.experience || '5年+'}
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-full text-white">
                      <span className="font-medium">专长：</span>
                      品牌文案
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-full text-white">
                      <span className="font-medium">服务：</span>
                      50+ 品牌
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 