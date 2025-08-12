import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import ThemeContextProvider from '@/context/ThemeContextProvider';
import '../styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'David McEwen International - Artist Portfolio',
  description: "David McEwen's portfolio showcasing his artwork.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="PJCiFwS3setyCfAvUlR-v718I-HgrJzbkxoANGPTkvg"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeContextProvider>
          <NavBar />
          {children}
          <Footer />
        </ThemeContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
