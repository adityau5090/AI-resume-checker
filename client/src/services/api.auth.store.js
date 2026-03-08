import { useAuthStore } from "@/store/auth.store";
import { register, login, logout, getMe } from "./auth.api";
import { useEffect } from "react";
// const setUser = useAuthStore((state) => state.setUser);

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
            const data = await logout();
            // console.log(data);
            setUser(null) 
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false);
        }
        
    }

    useEffect(() => {
    const getAndSetUser = async () => {
        const { setUser, setLoading } = useAuthStore.getState();

        try {
            setLoading(true);

            const data = await getMe();
            console.log("Data: ", data);

            setUser(data.data);

        } catch (error) {
            if (error.response?.status === 401) {
        // user not logged in → normal case
        setUser(null);
      } else {
        console.error("Unexpected error:", error);
      }
        } finally {
            setLoading(false);
        }
    };

    getAndSetUser();
}, []);

    return {
        handleLogin,
        handleRegister,
        handleLogout,
    }
}