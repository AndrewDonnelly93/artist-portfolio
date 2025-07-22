import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import AppThemeProvider from './ThemeProvider';
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppThemeProvider>
          <NavBar />
          {children}
          <Footer />
        </AppThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
