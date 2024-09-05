'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Druw Perso",
//   description: "Druw perso website",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [user] = useAuthState(auth);
  const router = useRouter()

  if(!user)
    router.push('/sign-in')
      
    
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </StoreProvider>
  );
}
