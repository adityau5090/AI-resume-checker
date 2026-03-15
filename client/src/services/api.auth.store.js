import { useAuthStore } from "@/store/auth.store";
import { register, login, logout, getMe } from "./auth.api";
import { useEffect } from "react";

export const useApiAuthStore = () => {
    
    const handleLogin = async ({ email, password }) => {
        const { setUser, setLoading } = useAuthStore.getState();
        try {
        setLoading(true);
        const data = await login({ email, password });
        // console.log(data)
        setUser(data.data);
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
    }

    const handleRegister = async ({ name, email, password }) => {
        const { setUser, setLoading } = useAuthStore.getState();
        try {
            setLoading(true);
            const data = await register({ name, email, password });
            // console.log("Register data :",data.data);
            setUser(data.data)
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false);
        }
        
    }

    const handleLogout = async () => {
        const { setUser,setLoading } = useAuthStore.getState();

        try {
            setLoading(true);
            await logout();
            // console.log(data);
            setUser(null) 
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false);
        }
        
    }

    return {
        handleLogin,
        handleRegister,
        handleLogout,
    }
}