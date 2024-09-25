import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../component/navbar/navbar";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AuthProvider } from "@/lib/auth/auth-provider";

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
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NavBar/>
          <main className="flex flex-col items-center h-screen w-screen bg-slate-800 pt-40">
            {children}
          </main>
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
