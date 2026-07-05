import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://constructionmarkuptools.com'),
  title: {
    default: 'Construction Markup Tools — Professional Bluebeam Tool Sets',
    template: '%s | Construction Markup Tools',
  },
  description:
    'Download original Bluebeam Revu markup tool sets for electrical, fire alarm, CCTV, security, AV/data, MEP, and estimating workflows. Built for construction professionals.',
  openGraph: {
    siteName: 'Construction Markup Tools',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
