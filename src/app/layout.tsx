import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import NavBar from "../component/navbar/navbar";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/constants";

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

  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;

  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>  
          <NavBar session={session}/>
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
