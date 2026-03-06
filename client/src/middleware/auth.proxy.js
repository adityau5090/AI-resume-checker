"use client"
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthMiddleware = ({children}) => {
    const router = useRouter();
    const { user } = useAuthStore.getState();

    useEffect(() => {
        if(!user){
        router.push("/login");
    }
    },[user,router])

    return children
}

export { AuthMiddleware }