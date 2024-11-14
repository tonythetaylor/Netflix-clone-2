import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
    ) {
    
    if (req.method !== 'GET') {
        return NextResponse.json({status: 405})
    }    
    
    try {
        await serverAuth()
        const id = (await params).id 

        if (typeof id !== 'string') {
            throw new Error('Invalid ID')
        }

        if (!id) {
            throw new Error('Invalid ID')
        }

        const movie = await prisma.movie.findUnique({
            where: {
                id: id
            }
        })

        if(!movie) {
            throw new Error('Invalid ID')
        }

        return NextResponse.json({status: 200, movie})
    } catch (error) {
        return NextResponse.json({error: `DEBUG: ${error}`} , {status: 400})
    }
}