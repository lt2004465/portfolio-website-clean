import './globals.css';
import { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import Navigation from '@/components/Navigation';
import CursorEffects from '@/components/CursorEffects';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: 'Lennon - 个人作品集',
    template: '%s | Lennon - 个人作品集',
  },
  description: '专业文案策划师个人作品集，展示创意文案、品牌策划、营销推广等优秀作品。',
  keywords: ['文案策划', '品牌策划', '营销推广', '创意文案', '广告文案', '个人作品集'],
  authors: [{ name: 'Lennon' }],
  creator: 'Lennon',
  publisher: 'Lennon',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: '/',
    title: 'Lennon - 个人作品集',
    description: '专业文案策划师个人作品集，展示创意文案、品牌策划、营销推广等优秀作品。',
    siteName: 'Lennon Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lennon - 个人作品集',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lennon - 个人作品集',
    description: '专业文案策划师个人作品集，展示创意文案、品牌策划、营销推广等优秀作品。',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white antialiased',
          inter.variable,
          poppins.variable
        )}
      >
        <div id="root">
          <Navigation />
          {children}
          <CursorEffects />
        </div>
        <div id="modal-root" />
      </body>
    </html>
  );
} 