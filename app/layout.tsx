import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import ToasterContainer from '@/components/ToasterContainer/ToasterContainer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://traveltrucks-gray.vercel.app'),

  title: {
    default: 'TravelTrucks',
    template: '%s | TravelTrucks',
  },

  description: 'Find and rent your perfect camper.',

  openGraph: {
    title: 'TravelTrucks',
    description: 'Find and rent your perfect camper.',
    url: '/',
    siteName: 'TravelTrucks',
    images: ['/background.png'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <TanStackProvider>
          <ToasterContainer />
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
