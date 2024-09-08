'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingAll from "../component/loaders/loadingAll";
import NavBar from "./root/navbar";

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

  const [user, loading, error] = useAuthState(auth);
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if(!user)
      router.push('/sign-in');
  },[user])

  if(loading){
    return (
      <html lang="en">
        <body className={inter.className}>
          <LoadingAll/>
        </body>
      </html>
    )
  }
    
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>  
          <NavBar/>
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
