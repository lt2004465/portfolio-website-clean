'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface AIAsset {
  id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
}

const AIGalleryPage: React.FC = () => {
  const aiAssets: AIAsset[] = [
    {
      id: 'avatar',
      name: 'Q版个人头像设计',
      description: 'AI生成的专业Q版3D头像，海洋渐变背景，现代简约风格',
      images: ['/images/generated/avatar-1.png', '/images/generated/avatar-2.png'],
      category: '个人形象'
    },
    {
      id: 'workspace',
      name: '创意文案工作场景',
      description: '现代化工作环境展示，展现专业的创作氛围',
      images: ['/images/generated/workspace-1.png', '/images/generated/workspace-2.png'],
      category: '工作场景'
    },
    {
      id: 'process',
      name: '品牌策略流程图示',
      description: '专业的品牌策略流程可视化，展示工作方法论',
      images: ['/images/generated/process-1.png', '/images/generated/process-2.png'],
      category: '流程图示'
    },
    {
      id: 'creation',
      name: '文案创作过程展示',
      description: '从灵感到成品的创作过程可视化展示',
      images: ['/images/generated/creation-1.png', '/images/generated/creation-2.png'],
      category: '创作过程'
    },
    {
      id: 'clients',
      name: '客户成功案例展示背景',
      description: '多行业客户合作成果的专业展示背景',
      images: ['/images/generated/clients-1.png', '/images/generated/clients-2.png'],
      category: '客户案例'
    },
    {
      id: 'mindmap',
      name: '创意思维导图',
      description: '文案策划核心能力的思维导图可视化',
      images: ['/images/generated/mindmap-1.png', '/images/generated/mindmap-2.png'],
      category: '思维导图'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* 返回按钮 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              返回首页
            </Link>
          </motion.div>

          {/* 页面标题 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              AI生成素材展示
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              使用GPT-4o生成的专业展示素材，为个人作品集网站提供高质量的视觉内容
            </p>
          </motion.div>

          {/* 素材网格 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {aiAssets.map((asset) => (
              <motion.div
                key={asset.id}
                variants={itemVariants}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* 图片轮播区域 */}
                <div className="relative h-64 bg-gray-100">
                  <div className="grid grid-cols-2 h-full">
                    {asset.images.map((image, index) => (
                      <div key={index} className="relative overflow-hidden">
                        <Image
                          src={image}
                          alt={`${asset.name} - 版本 ${index + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* 分类标签 */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                      {asset.category}
                    </span>
                  </div>
                </div>

                {/* 内容区域 */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {asset.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {asset.description}
                  </p>
                  
                  {/* 图片数量指示 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {asset.images.length} 个版本
                    </span>
                    <div className="flex space-x-1">
                      {asset.images.map((_, index) => (
                        <div
                          key={index}
                          className="w-2 h-2 bg-blue-200 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 技术说明 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 text-center bg-white rounded-3xl p-12 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              AI素材生成技术
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3">
                  GPT-4o模型
                </h3>
                <p className="text-gray-600">
                  使用最先进的GPT-4o-image-vip模型，支持高质量图像生成和多模态理解
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3">
                  批量处理
                </h3>
                <p className="text-gray-600">
                  通过并发处理技术，快速生成多个专业素材，提高工作效率
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3">
                  品牌一致性
                </h3>
                <p className="text-gray-600">
                  所有素材都遵循统一的设计风格和品牌色彩，确保视觉一致性
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default AIGalleryPage; 