import type { Metadata } from 'next';
import './globals.css';
import { MoodboardProvider } from '@/context/MoodboardContext';

export const metadata: Metadata = {
  title: 'Madras Drip — Custom Sneaker Studio',
  description:
    'Design your dream sneakers with Madras Drip. Browse our gallery, build your moodboard, and let us craft something one of a kind.',
  openGraph: {
    title: 'Madras Drip — Custom Sneaker Studio',
    description: 'Browse, like, and build your sneaker moodboard.',
    siteName: 'Madras Drip',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect hints — no ESLint concerns here */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/*
          next/font/google requires outbound network at build time, unavailable in this
          environment, so fonts are loaded via a plain <link> tag instead.
        */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0A0A] text-white antialiased">
        <MoodboardProvider>{children}</MoodboardProvider>
      </body>
    </html>
  );
}
