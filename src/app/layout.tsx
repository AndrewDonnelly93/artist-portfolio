import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CssBaseline } from "@mui/material";
import { fetchBio } from '../lib/contentful';
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "David McEwen - Artist Portfolio",
  description: "David McEwen's portfolio showcasing his artwork.",
};

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const fetchedBio = await fetchBio();

  if (!fetchedBio) {
    console.error("Failed to fetch bio data");
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CssBaseline />
        <NavBar bio={fetchedBio} />
        {children}
        <Footer bio={fetchedBio} />
      </body>
    </html>
  );
};

export default RootLayout;