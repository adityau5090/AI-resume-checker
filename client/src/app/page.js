"use client"
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useAuthStore } from "@/store/auth.store";

export default function Home() {
  const {user,loading, setUser, setLoading} = useAuthStore();
  // setUser("tamanna")
  console.log(user,loading)
  return (
    <>
      <div className="dark:bg-black dark:text-amber-50"  >Hello</div>
      <ModeToggle />
      <button onClick={() => setUser("tamanna")}>Click</button>
      <button onClick={() => setLoading(true)}>Click</button>

    </>
  );
}
