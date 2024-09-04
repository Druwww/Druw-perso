'use client'
import { Button } from "@mui/material";
import NavBar from "../root/navbar";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { login, logout } from "@/lib/auth/authSlice";

export default function Home() {

    const auth = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    return (
        <main>
        <NavBar/>
        <div>
            Druw Perso website - Home Page !
        </div>
        <div>
            <Button onClick={() => dispatch(login("quentin@gmail.com"))}>
                Login
            </Button>
        </div>
        <div>
            <Button onClick={() => dispatch(logout())}>
                Logout
            </Button>
        </div>
        <div>
            <h3>
                Email : {auth.email} - IsLogin : {auth.isLogin ? "True" : "False"}
            </h3>
        </div>
        </main>
    );
}
