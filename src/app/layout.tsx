import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import NavBar from "../component/navbar/navbar";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Druw Perso",
  description: "Druw perso website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>  
          <NavBar/>
          {children}
          <SpeedInsights />
        </body>
      </html>
    </StoreProvider>
  );
}
