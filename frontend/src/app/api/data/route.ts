import { NextResponse} from 'next/server'

export async function GET() {
  return NextResponse.json({ message: "For Testing api calls" }, { status: 200 });
};