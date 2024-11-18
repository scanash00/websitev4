import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from './providers';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { Background } from '@/components/background';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Scan',
    default: 'Scan - Portfolio',
  },
  description: "Scan's portfolio website!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <Providers>
          <Background />
          <div className="relative flex min-h-screen flex-col">
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
