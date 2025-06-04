import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Button className="bg-primary text-white" asChild>
        <Link href="/admin-login">Admin Login</Link>
      </Button>
    </>
  );
}
