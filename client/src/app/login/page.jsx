import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ModeToggle } from '@/components/ui/mode-toggle'
import React from 'react'

const LoginPage = () => {
  return (
    <main className='h-screen dark:bg-zinc-950 bg-zinc-200 text-zinc-200 flex justify-center items-center'>
        <ModeToggle />
        <Card className={"max-w-3xl min-w-lg dark:bg-zinc-300 bg-zinc-800 text-zinc-800 border-none"}>
            <CardHeader>
                <CardTitle className={"font-bold text-xl text-green-500"}>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form action="">
                    <Label htmlFor="email" className={"mb-2 pl-1"}>Email</Label>
                    <Input 
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={"border-zinc-200  border-r-green-400 border-r-4 shadow-md shadow-zinc-600 focus:ring-green-400 focus:ring-2 "}
                    />

                    
                </form>
            </CardContent>
        </Card>
    </main>
  )
}

export default LoginPage
