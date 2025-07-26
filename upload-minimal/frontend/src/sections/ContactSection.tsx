'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ContactSectionProps {
  personalInfo?: {
    email?: string;
    phone?: string;
    location?: string;
    social_links?: {
      wechat?: string;
      linkedin?: string;
      twitter?: string;
      github?: string;
    };
  };
}

const ContactSection: React.FC<ContactSectionProps> = ({ personalInfo }) => {
  return (
    <section id="contact" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* 标题区域 - 模仿参考图片的样式 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              GET IN TOUCH WITH ME!
            </h2>
            <p className="text-2xl text-teal-500 font-light mb-12">
              let's make something great together :&gt;
            </p>
          </motion.div>

          {/* 联系信息 - 简洁布局 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8 mb-20"
          >
            {/* LinkedIn */}
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-gray-700">LinkedIn:</h3>
              <a 
                href="https://linkedin.com/in/lennon" 
                className="text-xl text-gray-900 underline hover:text-teal-500 transition-colors"
              >
                Lennon
              </a>
            </div>

            {/* Instagram */}
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-gray-700">Instagram:</h3>
              <p className="text-xl text-gray-900">lennon_copy</p>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-gray-700">Email:</h3>
              <a 
                href={`mailto:${personalInfo?.email || 'lennon@example.com'}`}
                className="text-xl text-gray-900 underline hover:text-teal-500 transition-colors"
              >
                {personalInfo?.email || 'lennon@example.com'}
              </a>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-gray-700">phone number:</h3>
              <a 
                href={`tel:${personalInfo?.phone || '+86 138-0013-8000'}`}
                className="text-xl text-gray-900 hover:text-teal-500 transition-colors"
              >
                {personalInfo?.phone || '+86 138-0013-8000'}
              </a>
            </div>
          </motion.div>

          {/* 装饰性图片区域 - 模仿参考图片中的花朵 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="w-80 h-48 bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl flex items-center justify-center shadow-lg">
              {/* 简化的花朵图案 */}
              <div className="text-center">
                <div className="text-6xl mb-4">🌸</div>
                <p className="text-gray-600 font-medium">
                  创意绽放的地方
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 