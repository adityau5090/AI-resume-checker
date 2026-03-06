"use client"
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useAuthStore } from "@/store/auth.store";
import { AuthMiddleware } from "@/middleware/auth.proxy"

export default function Home() {
  
  return (
    <>
      <AuthMiddleware>
        <div className="dark:bg-black dark:text-amber-50"  >Hello</div>
      <ModeToggle />
      </AuthMiddleware>
      

    </>
  );
}
