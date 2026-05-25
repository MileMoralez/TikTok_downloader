import { Dangrek, Kantumruy_Pro } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react'; // 💡 ថែម Vercel Analytics នៅទីនេះ
import './globals.css';

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
 verification: {
    google: "9v7zdfk_6s-yNHDxXlnN9xWG9hNLeWIgMERlzxVdGqI",
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
        {/* 💡 ក្បាច់បង្ខំឱ្យ Google ស្គាល់ ១០០% (ប្រើ HTML tag ធម្មតា) */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9969263791405305" 
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${dangrek.variable} ${kantumruy.variable} font-sans`}>
        {children}
        <Analytics /> {/* 💡 ញាត់ភ្នែកទិព្វចូលត្រង់នេះ */}
      </body>
    </html>
  );
}