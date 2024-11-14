import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    
    if (req.method !== 'GET') {
        return NextResponse.json({status: 405})
    }    
    
    try {
        await serverAuth()
        const { id } = params

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

        console.log(movie)
        if(!movie) {
            throw new Error('Invalid ID')
        }

        return NextResponse.json({status: 200, movie})
    } catch (error) {
        return NextResponse.json({error: `DEBUG: ${error}`} , {status: 400})
    }
}