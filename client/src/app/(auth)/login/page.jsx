"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { useApiAuthStore } from '@/services/api.auth.store'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'

const LoginPage = () => {

    const router = useRouter();

    const { loading, user } = useAuthStore();
    const { handleLogin } = useApiAuthStore();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(()=> {
        if(user) {
            router.push("/")
        }
    },[user, router])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin({email, password})
    }

  return (
    <main className='h-screen dark:bg-zinc-950 bg-zinc-100 text-zinc-200 flex justify-center items-center'>
        <ModeToggle />
        <Card className={"max-w-3xl min-w-lg dark:bg-zinc-900 bg-zinc-800 text-zinc-200 border-r-3 border-r-green-500 border-b-green-500 "}>
            <CardHeader>
                <CardTitle className={"font-bold text-xl text-green-500"}>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <Label htmlFor="email" className={"mb-2 pl-1"}>Email</Label>
                    <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className={"border-zinc-200  border-r-green-400 border-r-4 shadow-md shadow-green-300/30 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"}
                    />

                    <Label htmlFor="password" className={"mb-2 pl-1"}>Password</Label>
                    <Input 
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className={"border-zinc-200  border-r-green-400 border-r-4 shadow-md shadow-green-300/30  focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"}
                    />

                        <Button
                        variant="outline"
                        size='lg'
                        disabled={loading}
                        className={"bg-zinc-800 text-zinc-100  dark:hover:bg-green-500  hover:bg-green-500 hover:cursor-pointer font-bold border-green-400 dark:border-green-400 transition-all duration-500 ease-in-out w-full" }
                        >
                        {loading ? <> Loading <Spinner /> </> : <> Login <ArrowRightIcon /> </>}</Button>
                
                </form>
            </CardContent>
            <CardFooter>
                <p>Create new Account? <span className='text-green-400'><Link href={"/register"}> Register</Link></span> </p> 
                </CardFooter>
        </Card>
    </main>
  )
}

export default LoginPage
