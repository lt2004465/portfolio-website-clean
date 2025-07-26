'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn, formatDate, truncateText } from '@/lib/utils';
import { WorkCardProps } from '@/types';

const WorkCard: React.FC<WorkCardProps> = ({
  work,
  onView,
  className,
}) => {
  const handleClick = () => {
    if (onView) {
      onView(work);
    }
  };

  return (
    <div
      className={cn(
        'group bg-white dark:bg-secondary-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-secondary-200 dark:border-secondary-700',
        className
      )}
      onClick={handleClick}
    >
      {/* 图片区域 */}
      <div className="relative aspect-video overflow-hidden">
        {work.featured_image ? (
          <Image
            src={work.featured_image}
            alt={work.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-secondary-100 dark:bg-secondary-700 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-secondary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        
        {/* 特色标签 */}
        {work.is_featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              精选
            </span>
          </div>
        )}
        
        {/* 分类标签 */}
        {work.category && (
          <div className="absolute top-3 right-3">
            <span
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: work.category.color || '#6B7280',
                color: '#fff',
              }}
            >
              {work.category.name}
            </span>
          </div>
        )}
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
          {work.title}
        </h3>
        
        {work.description && (
          <p className="text-secondary-600 dark:text-secondary-300 text-sm mb-3 line-clamp-2">
            {truncateText(work.description, 100)}
          </p>
        )}
        
        {/* 标签 */}
        {work.tags && work.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {work.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300 text-xs rounded"
              >
                {tag}
              </span>
            ))}
            {work.tags.length > 3 && (
              <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300 text-xs rounded">
                +{work.tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* 底部信息 */}
        <div className="flex items-center justify-between text-xs text-secondary-500 dark:text-secondary-400">
          <span>{formatDate(work.created_at)}</span>
          <div className="flex items-center gap-4">
            {work.view_count > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {work.view_count}
              </span>
            )}
            {work.client_name && (
              <span>客户: {work.client_name}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkCard; 