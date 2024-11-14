import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";
import prisma from "@/lib/prismadb";
import { auth } from "@/auth";

export async function GET(req: Request, res: Response) {
    const session = await auth()

    // console.log(req)
    if(req.method !== 'GET') {
        return Response.error()
    }


    try {

        const currentUser = await serverAuth()

        return NextResponse.json(currentUser)
        
    } catch (error) {
        return NextResponse.json({error: error}, {status: 400})
    }
}