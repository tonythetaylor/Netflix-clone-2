'use client';

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";
import Billboard from "@/components/billboard";

export default function Home() {
  const { data: session } = useSession();

  console.log(session)
  if (!session) {
    redirect("/auth")
  }

  const { user} = session

  return (
    <>
    <Navbar />
    <Billboard />
    </>
  );
}
