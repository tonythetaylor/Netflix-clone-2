"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

// THIS WILL WORK

export default function SessionProviders({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
