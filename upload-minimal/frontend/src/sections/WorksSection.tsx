'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, ExternalLink, Calendar, Tag } from 'lucide-react';

interface Work {
  id: number;
  title: string;
  slug: string;
  description: string;
  featured_image: string;
  category: {
    name: string;
    color: string;
  };
  tags: string[];
  view_count?: number;
  created_at?: string;
}

interface WorksResponse {
  items: Work[];
  pagination: {
    page: number;
    size: number;
    total: number;
    pages: number;
  };
}

const WorksSection = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 模拟数据（如果API失败时使用）
  const mockWorks: Work[] = [
    {
      id: 1,
      title: "BRAND CAMPAIGN",
      slug: "brand-campaign",
      description: "CARPE DIEM!\nLULULEMON\nCALVIN KLEIN",
      featured_image: "",
      category: { name: "Brand Campaign", color: "#00ff88" },
      tags: ["品牌活动", "时尚", "生活方式"],
      view_count: 1250,
      created_at: "2024-01-15"
    },
    {
      id: 2,
      title: "PR WRITING",
      slug: "pr-writing",
      description: "专业公关文案写作，为品牌打造有力的公众传播声音。",
      featured_image: "",
      category: { name: "PR Writing", color: "#ff6b35" },
      tags: ["公关文案", "媒体传播", "品牌声誉"],
      view_count: 980,
      created_at: "2024-02-20"
    },
    {
      id: 3,
      title: "Video Creation",
      slug: "video-creation",
      description: "创意视频内容策划与文案，讲述品牌故事的最佳方式。",
      featured_image: "",
      category: { name: "Video Creation", color: "#4a90e2" },
      tags: ["视频文案", "故事叙述", "创意策划"],
      view_count: 750,
      created_at: "2024-03-10"
    },
    {
      id: 4,
      title: "BLOG",
      slug: "blog-writing",
      description: "深度内容创作，用文字构建品牌的思想价值体系。",
      featured_image: "",
      category: { name: "Blog", color: "#1a5490" },
      tags: ["博客写作", "内容营销", "思想领导力"],
      view_count: 1100,
      created_at: "2024-03-25"
    },
    {
      id: 5,
      title: "DESIGN\nPHOTOGRAPHY\nPOSTER\nINFOGRAPHIC",
      slug: "design-portfolio",
      description: "多元化的设计与文案结合，创造视觉与文字的完美融合。",
      featured_image: "",
      category: { name: "Design", color: "#dc143c" },
      tags: ["设计文案", "视觉传达", "信息图表"],
      view_count: 890,
      created_at: "2024-04-01"
    },
    {
      id: 6,
      title: "Public Relations",
      slug: "public-relations",
      description: "构建品牌与公众的桥梁，塑造正面的品牌形象。",
      featured_image: "",
      category: { name: "Public Relations", color: "#50c8a3" },
      tags: ["公共关系", "危机管理", "媒体关系"],
      view_count: 670,
      created_at: "2024-04-15"
    }
  ];

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/works/`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: WorksResponse = await response.json();
        setWorks(data.items.length > 0 ? data.items : mockWorks);
      } catch (err) {
        console.error('Failed to fetch works:', err);
        // 使用模拟数据
        setWorks(mockWorks);
        setError(null); // 不显示错误，因为我们有后备数据
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  // 获取所有类别
  const categories = Array.from(new Set(works.map(work => work.category.name)));

  // 过滤作品
  const filteredWorks = selectedCategory 
    ? works.filter(work => work.category.name === selectedCategory)
    : works;

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="works" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              精选作品
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              每一个项目都是一次创意的探索与挑战
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="works" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 - 简化设计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-light text-gray-900 mb-8">
            A quick overview of my work…
          </h2>
        </motion.div>

        {/* 作品网格 - 不规则布局，模仿Layla网站 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl"
        >
          {/* DESIGN 卡片 - 大卡片，左侧 */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 hover:scale-105 lg:row-span-2"
            style={{ backgroundColor: '#f5f5f5' }}
          >
            <div className="p-12 h-80 lg:h-full flex flex-col justify-between">
              <div>
                <h3 className="text-6xl lg:text-8xl font-bold text-red-600 leading-none mb-4">
                  DESIGN
                </h3>
                <div className="space-y-2 text-red-600 text-xl font-medium">
                  <div>PHOTOGRAPHY</div>
                  <div>POSTER</div>
                  <div>INFOGRAPHIC</div>
                </div>
              </div>
              <div className="text-sm text-teal-500 font-medium">
                DESIGN
              </div>
            </div>
          </motion.div>

          {/* BRAND CAMPAIGN 卡片 - 屏幕效果 */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-400 to-teal-400"
          >
            <div className="p-8 h-80 flex flex-col justify-center items-center text-center">
              {/* 复古屏幕效果 */}
              <div className="w-64 h-40 bg-gray-100 rounded-2xl border-8 border-gray-300 shadow-xl relative overflow-hidden">
                <div className="absolute inset-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-lime-400 leading-tight">
                      BRAND<br/>CAMPAIGN
                    </h3>
                    <div className="mt-2 text-xs text-lime-400 space-y-1">
                      <div>CARPE DIEM!</div>
                      <div>LULULEMON</div>
                      <div>CALVIN KLEIN</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-white font-medium">
                Brand Campaign
              </div>
            </div>
          </motion.div>

          {/* PR WRITING 卡片 - 复古电视 */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#ff8c42' }}
          >
            <div className="p-8 h-80 flex flex-col justify-center items-center">
              {/* 复古电视机 */}
              <div className="w-48 h-32 bg-gradient-to-b from-yellow-400 to-orange-400 rounded-2xl border-4 border-orange-600 shadow-xl relative">
                <div className="absolute inset-4 bg-cyan-300 rounded-lg flex items-center justify-center">
                  <div className="text-center text-black">
                    <h3 className="text-2xl font-black">
                      PR<br/>WRITING
                    </h3>
                  </div>
                </div>
                {/* 电视机底座 */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-orange-600 rounded-b-lg"></div>
              </div>
            </div>
          </motion.div>

          {/* Video Creation 卡片 */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 hover:scale-105 bg-gray-100"
          >
            <div className="p-8 h-80 flex flex-col justify-center">
              <div className="relative">
                <h3 className="text-4xl font-serif italic text-gray-800 mb-4">
                  Video<br/>Creation
                </h3>
                <div className="w-32 h-24 bg-blue-600 rounded-lg opacity-70"></div>
              </div>
            </div>
          </motion.div>

          {/* BLOG 卡片 */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 hover:scale-105 bg-gray-50"
          >
            <div className="p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-5xl font-bold text-blue-800 mb-4">
                  BLOG
                </h3>
                <div className="text-sm text-blue-800 font-medium">
                  WATCH<br/>READ<br/>LISTEN
                </div>
              </div>
              {/* 装饰图片区域 */}
              <div className="absolute bottom-4 right-4 w-20 h-16 bg-gray-300 rounded-lg opacity-60"></div>
            </div>
          </motion.div>

          {/* Public Relations 卡片 */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 hover:scale-105 bg-teal-400"
          >
            <div className="p-8 h-80 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Public<br/>Relations
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                构建品牌与公众的桥梁，塑造正面的品牌形象
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* 查看更多按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all group">
            查看全部作品
            <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WorksSection; 