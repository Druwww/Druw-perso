'use client'
import { Button } from "@mui/material";
import NavBar from "../root/navbar";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { login, logout } from "@/lib/auth/authSlice";
import LoadingAll from "@/component/loaders/loadingAll";

export default function Home() {

    const auth = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    return (
        <main>
            <LoadingAll/>            
        </main>
    );
}
