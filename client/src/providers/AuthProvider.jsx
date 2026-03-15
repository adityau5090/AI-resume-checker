"use client"

import React from 'react'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { getMe } from '@/services/auth.api'

const AuthProvider = ({ children }) => {

    const setUser = useAuthStore((state) => state.setUser)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data =  await getMe()
                // console.log("User ... : ", data.data)
                setUser(data.data)
            } catch (error) {
                setUser(null)
            }
        }
        loadUser()
    }, [])

  return children
}

export default AuthProvider
