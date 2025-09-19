import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SupernovaForge - MultiversX dApp Platform',
    template: '%s | SupernovaForge'
  },
  description: 'Advanced MultiversX dApp development platform using Supernova updates. Build DeFi, NFT, Gaming, and DAO applications with ease.',
  keywords: ['MultiversX', 'blockchain', 'dApp', 'DeFi', 'NFT', 'smart contracts', 'Supernova'],
  authors: [{ name: 'George Pricop', url: 'https://github.com/Gzeu' }],
  creator: 'George Pricop',
  publisher: 'SupernovaForge',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://supernova-forge.vercel.app',
    title: 'SupernovaForge - MultiversX dApp Platform',
    description: 'Build next-generation dApps on MultiversX with Supernova updates',
    siteName: 'SupernovaForge',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SupernovaForge - MultiversX dApp Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SupernovaForge - MultiversX dApp Platform',
    description: 'Build next-generation dApps on MultiversX with Supernova updates',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-sans antialiased">
        <div id="portal" />
        {children}
      </body>
    </html>
  );
}