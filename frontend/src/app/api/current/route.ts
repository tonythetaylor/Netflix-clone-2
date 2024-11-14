import { NextRequest, NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        throw new Error('Invalid path')
    }

    try {

        const currentUser = await serverAuth()

        return NextResponse.json(currentUser)

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}