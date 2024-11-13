import { redirect } from 'next/navigation';
import { getAuth } from "@/lib/cookie";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getAuth();

  console.log('USER', user)
  if (!user) {
    redirect('/auth');
  }

  return <>{children}</>;
}