'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, Eye, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Work } from '@/types';

interface WorkCardProps {
  work: Work;
  index: number;
}

const WorkCard: React.FC<WorkCardProps> = ({ work, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 创建鼠标跟踪动画
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7.5, -7.5]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7.5, 7.5]));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRelative = (e.clientX - rect.left) / width - 0.5;
    const mouseYRelative = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(mouseXRelative);
    mouseY.set(mouseYRelative);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative perspective-1000"
      data-cursor="查看作品"
    >
      <motion.div
        whileHover={{ 
          y: -8,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        className="relative bg-white dark:bg-secondary-800 rounded-2xl shadow-lg hover:shadow-2xl border border-secondary-100 dark:border-secondary-700 overflow-hidden transition-all duration-500"
      >
        {/* 图片容器 */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* 加载状态 */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-700 dark:to-secondary-600 animate-pulse" />
          )}
          
          {/* 主图片 */}
          <Image
            src={work.featured_image || '/placeholder-work.jpg'}
            alt={work.title}
            fill
            className={`object-cover transition-all duration-700 ${
              imageLoaded 
                ? 'opacity-100 scale-100 filter-none' 
                : 'opacity-0 scale-110 blur-lg'
            } ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* 悬停遮罩 */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          />

          {/* 特色标签 */}
          {work.is_featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                精选作品
              </span>
            </div>
          )}

          {/* 分类标签 */}
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 bg-white/90 dark:bg-secondary-800/90 backdrop-blur text-secondary-700 dark:text-secondary-300 text-xs font-medium rounded-full shadow-sm">
              {work.category?.name || '未分类'}
            </span>
          </div>

          {/* 悬停时的操作按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute bottom-4 right-4 z-10"
          >
            <Link
              href={`/works/${work.slug}`}
              className="flex items-center justify-center w-12 h-12 bg-white/90 dark:bg-secondary-800/90 backdrop-blur rounded-full shadow-lg hover:bg-white dark:hover:bg-secondary-700 transition-colors group/btn"
            >
              <ArrowUpRight className="w-5 h-5 text-secondary-700 dark:text-secondary-300 group-hover/btn:text-primary-600 dark:group-hover/btn:text-primary-400 transition-colors" />
            </Link>
          </motion.div>

          {/* 统计信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20
            }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute bottom-4 left-4 z-10 flex items-center space-x-3"
          >
            <div className="flex items-center space-x-1 px-2 py-1 bg-white/90 dark:bg-secondary-800/90 backdrop-blur rounded-full text-xs text-secondary-600 dark:text-secondary-400">
              <Eye className="w-3 h-3" />
              <span>{work.view_count || 0}</span>
            </div>
            {work.project_date && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-white/90 dark:bg-secondary-800/90 backdrop-blur rounded-full text-xs text-secondary-600 dark:text-secondary-400">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(work.project_date)}</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* 内容区域 */}
        <div className="p-6">
          {/* 标题 */}
          <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
            {work.title}
          </h3>

          {/* 描述 */}
          {work.description && (
            <p className="text-secondary-600 dark:text-secondary-300 text-sm leading-relaxed line-clamp-3 mb-4">
              {work.description}
            </p>
          )}

          {/* 标签 */}
          {work.tags && work.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {work.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
              {work.tags.length > 3 && (
                <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 text-xs font-medium rounded-full">
                  +{work.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* 客户信息 */}
          {work.client_name && (
            <div className="flex items-center justify-between text-sm text-secondary-500 dark:text-secondary-400">
              <span>客户: {work.client_name}</span>
              {work.project_url && (
                <Link
                  href={work.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>查看项目</span>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* 3D 边框效果 */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ transform: "translateZ(1px)" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default WorkCard; 