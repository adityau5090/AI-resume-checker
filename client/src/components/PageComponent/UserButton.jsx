import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { User2 } from 'lucide-react'
import { useApiAuthStore } from '@/services/api.auth.store'
import { useRouter } from 'next/navigation'


const UserButton = ({user}) => {

    const { handleLogout } = useApiAuthStore()
    const router = useRouter()

    const logoutUser =  async () => {
        await handleLogout()
        router.push("/login")
    }
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant='outline'>{user?.name}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={"w-40"} align="start">
            <DropdownMenuGroup>
                <DropdownMenuLabel>User Details</DropdownMenuLabel>
                <DropdownMenuItem>
                    {user?.name}
                    <DropdownMenuShortcut> <User2 /> </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Email
                    <DropdownMenuShortcut>{user?.email}</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutUser}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
