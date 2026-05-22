import { Dangrek, Kantumruy_Pro } from 'next/font/google';
import Script from 'next/script'; // 💡 ទី១៖ ថែមជួរនេះនៅខាងលើគេ
import './globals.css';

// 💡 បង្កើត Variable សម្រាប់ Font នីមួយៗ
const dangrek = Dangrek({
  weight: '400',
  subsets: ['khmer'],
  variable: '--font-dangrek',
  display: 'swap',
});

const kantumruy = Kantumruy_Pro({
  subsets: ['khmer'],
  variable: '--font-kantumruy',
  display: 'swap',
});

export const metadata = {
  title: 'TikTok Downloader - Download Video TikTok Without Watermark | SILENT MEDIA',
  description: 'ទាញយកវីដេអូ TikTok និងរូបភាព Slideshow គ្មាន Watermark ឡើយ ល្បឿនលឿនស្លេវ ហ្វ្រី ១០០% ងាយស្រួលបំផុតនៅលើទូរស័ព្ទដៃរបស់អ្នក។',
  keywords: ['tiktok download', 'download video tiktok', 'tiktok downloader khmer', 'គ្មាន watermark'],
  // 💡 កូដសម្ងាត់បញ្ជាក់កម្មសិទ្ធិរបស់មេធំ គីមហេង
  verification: {
    google: 'eyM_kORHByvovd7E6D8MT6mTKuhudWF7imBzaRZ7zMc', 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="km">
      <head>
        {/* 💰 ទី២៖ កូដតភ្ជាប់ AdSense ផ្លូវការរបស់មេ */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9969263791405305"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${dangrek.variable} ${kantumruy.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}