import { auth } from "@/auth";
import { type NextRequest, NextResponse} from 'next/server'

export async function GET(req: Request) {
  const data = await req.body
// console.log(req)
  // if (req.auth) return NextResponse.json(req.auth.user);
  return NextResponse.json({ message: "For Testing api calls" }, { status: 200 });
};