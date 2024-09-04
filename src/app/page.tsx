'use client'

import Home from "./(home)/page";
import NavBar from "./root/navbar";

import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from '@/lib/firebase/config'
import { useRouter } from "next/navigation";

export default function Page() {

  const [user] = useAuthState(auth);
  const router = useRouter()

  if(!user) 
    router.push('/sign-in')

  return (
    <main>
      <NavBar/>
      <Home/>
    </main>
  );
}
