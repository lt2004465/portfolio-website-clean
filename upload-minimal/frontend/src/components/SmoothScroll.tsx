import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '个人作品集网站',
  description: '我的个人作品集网站',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
