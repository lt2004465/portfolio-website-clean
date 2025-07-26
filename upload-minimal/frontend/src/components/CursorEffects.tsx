'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CursorEffects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const cursorRef = useRef<HTMLDivElement>(null);

  // 使用 framer-motion 的 useMotionValue 和 useSpring 创建平滑动画
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // 检查是否悬停在可点击元素上
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsPointer(true);
        
        // 检查是否有自定义光标文本
        const cursorData = target.getAttribute('data-cursor') || 
                          target.closest('[data-cursor]')?.getAttribute('data-cursor');
        setCursorText(cursorData || '');
      } else {
        setIsPointer(false);
        setCursorText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    // 添加事件监听器
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* 主光标 */}
          <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            style={{
              x: cursorX,
              y: cursorY,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              opacity: { duration: 0.2 },
              scale: { duration: 0.15 }
            }}
          >
            <div className={`
              w-4 h-4 rounded-full border-2 border-white
              transform -translate-x-1/2 -translate-y-1/2
              transition-all duration-150 ease-out
              ${isPointer ? 'bg-white/20' : 'bg-transparent'}
              ${isClicking ? 'scale-75' : ''}
            `} />
          </motion.div>

          {/* 跟随光标 */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            style={{
              x: cursorX,
              y: cursorY,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.6, 
              scale: isClicking ? 2 : isPointer ? 3 : 2,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              opacity: { duration: 0.3 },
              scale: { duration: 0.25, delay: 0.05 }
            }}
          >
            <div className={`
              w-8 h-8 rounded-full transform -translate-x-1/2 -translate-y-1/2
              transition-all duration-300 ease-out
              ${isPointer 
                ? 'bg-gradient-to-r from-primary-400 to-primary-600' 
                : 'bg-gradient-to-r from-secondary-400 to-secondary-600'
              }
              ${isClicking ? 'animate-pulse' : ''}
            `} />
          </motion.div>

          {/* 光标文本 */}
          <AnimatePresence>
            {cursorText && (
              <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9997]"
                style={{
                  x: cursorX,
                  y: cursorY,
                }}
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: -10 }}
                exit={{ opacity: 0, scale: 0.5, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="
                  px-3 py-1 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white
                  rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700
                  text-sm font-medium whitespace-nowrap
                  transform -translate-x-1/2 -translate-y-full
                  mt-4
                ">
                  {cursorText}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 磁性效果圆圈 */}
          {isPointer && (
            <motion.div
              className="fixed top-0 left-0 pointer-events-none z-[9996]"
              style={{
                x: cursorX,
                y: cursorY,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 4 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="
                w-16 h-16 rounded-full border border-primary-400
                transform -translate-x-1/2 -translate-y-1/2
                animate-pulse
              " />
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default CursorEffects; 