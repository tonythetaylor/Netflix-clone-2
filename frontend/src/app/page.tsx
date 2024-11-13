'use client';

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";

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
    {/* <h1 className="text-4xl text-green-500"> Netflix Clone</h1>
    <p className="text-white">Logged in as : {user?.name}</p>
    <button className="h-10 w-full bg-white" onClick={() => signOut()}>Logout!</button> */}
    </>
  );
}
