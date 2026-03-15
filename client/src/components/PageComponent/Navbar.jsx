"use client"

import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import UserButton from './UserButton'

const Navbar = () => {

    const { user } = useAuthStore()
    // console.log("User : ",user)
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        
    })

//   if (!mounted) return null

    return (
        <div className={` flex justify-between items-center px-10 mt-2 sticky top-0`}>
            <div>
                <div className='p-[2vw] text-xl'><span className='text-green-400'>&lt;</span> Core<span className='text-green-400'>Typing /<span className='text-white'>&gt;</span></span></div>
            </div>

            <div className="sm:block hidden">
                <ul className="relative flex gap-[2vw] w-fit px-6 py-3 rounded-full text-sm bg-gradient-to-b from-[#1a1a1a] to-[#030305]  border-b border-green-500 dark:border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] before:absolute before:inset-0 before:rounded-full before:content-[''] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"

                >
                    <li className='cursor-pointer text-zinc-100 hover:text-green-400'>Home</li>
                    <li className='cursor-pointer text-zinc-100 hover:text-green-400'>About</li>
                    <li className='cursor-pointer text-zinc-100 hover:text-green-400'>Contact</li>
                </ul>
            </div>
            <div className="relative flex gap-[2vw] w-fit px-6 py-3 rounded-full text-sm 
            text-zinc-100 cursor-pointer hover:text-green-400 bg-gradient-to-b from-[#1a1a1a] to-[#030305]  border-b border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] before:absolute before:inset-0 before:rounded-full before:content-[''] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
            >
                Lessons
            </div>
            <UserButton user={user} />
        </div>
    )
}

export default Navbar