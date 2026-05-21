import { Dangrek, Kantumruy_Pro } from 'next/font/google';
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
  title: '🚀 SILENT MEDIA - TikTok Downloader',
  description: 'ទាញយកវីដេអូ & រូបភាព TikTok គ្មាន Watermark ឡើយ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 💡 ញាត់អា Variable Font ទាំងពីរចូលទៅក្នុង <body> tag
    <html lang="km">
      <body className={`${dangrek.variable} ${kantumruy.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}