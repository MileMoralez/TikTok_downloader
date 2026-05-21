import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ទាញយកវីដេអូ TikTok គ្មាន Watermark | ដោនឡូតរូបភាព TikTok ជា ZIP",
  description: "វេបសាយទាញយកវីដេអូ TikTok គ្មាន Watermark និងរូបភាព Slideshow/Wallpaper ទាំងអស់ចងជា File ZIP ឥតគិតថ្លៃ លឿនរហ័ស លំដាប់ Premium នៅកម្ពុជា។",
  keywords: ["tiktok download", "ដោនឡូតវីដេអូទិកតុក", "tiktok គ្មាន watermark", "download tiktok photo zip", "silent media"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="km">
      <head>
        {/* 💡 ញាត់ Link Fonts ផ្ទាល់នៅក្នុង Head ធានាស្គាល់ទូទាំងវេបសាយ និងបាត់ Error ភ្លាម */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dangrek&family=Kantumruy+Pro:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}