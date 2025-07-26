'use client';

import { useEffect, useRef } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const initLenis = async () => {
      // 动态导入 Lenis 以避免 SSR 问题
      const Lenis = (await import('lenis')).default;
      
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      // 滚动更新函数
      function raf(time: number) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // 处理锚点链接
      const handleAnchorClick = (e: Event) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');
        
        if (link?.hash) {
          e.preventDefault();
          const targetElement = document.querySelector(link.hash);
          if (targetElement) {
            lenisRef.current?.scrollTo(targetElement, {
              offset: -80, // 考虑固定导航栏的高度
              duration: 1.5,
            });
          }
        }
      };

      document.addEventListener('click', handleAnchorClick);

      return () => {
        document.removeEventListener('click', handleAnchorClick);
        lenisRef.current?.destroy();
      };
    };

    initLenis();
  }, []);

  // 暴露滚动方法到全局，供其他组件使用
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).smoothScrollTo = (target: string | HTMLElement, options?: any) => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(target, {
            offset: -80,
            duration: 1.5,
            ...options,
          });
        }
      };
    }
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
