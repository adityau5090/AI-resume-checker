import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="dark:bg-black dark:text-amber-50"  >Hello</div>
      <ModeToggle />
    </>
  );
}
