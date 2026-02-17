import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aunopack.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AunoPack – AI-Powered Packaging Decision Engine',
    template: '%s | AunoPack',
  },
  description:
    'AunoPack delivers an AI-powered packaging decision engine and sustainable sleeve packaging systems. Data-driven packaging choices for shelf impact, sustainability, and cost.',
  keywords: [
    'AunoPack',
    'packaging',
    'AI packaging',
    'sustainable packaging',
    'sleeve packaging',
    'packaging decision engine',
    'carton sleeve',
  ],
  authors: [{ name: 'AunoPack', url: siteUrl }],
  creator: 'AunoPack',
  publisher: 'AunoPack',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'AunoPack',
    title: 'AunoPack – AI-Powered Packaging Decision Engine',
    description:
      'AI-powered packaging decision engine and sustainable sleeve packaging systems. Data-driven packaging for shelf impact, sustainability, and cost.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AunoPack – AI-Powered Packaging',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AunoPack – AI-Powered Packaging Decision Engine',
    description:
      'AI-powered packaging decision engine and sustainable sleeve packaging systems.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
