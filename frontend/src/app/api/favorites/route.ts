import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextRequest, res: NextResponse) {
    if(req.method !== 'GET') {
        return NextResponse.json({error: 'Internal Server Error'} , {status: 405})
    }

    try {
        const currentUser = await serverAuth()

        const favoriteMovies = await prisma.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds,
                }
            }
        });


        return NextResponse.json(favoriteMovies)
        
    } catch (error) {
        return NextResponse.json({error: error} , {status: 400})
    }
} 