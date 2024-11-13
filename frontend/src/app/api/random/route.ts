import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function GET(req: NextRequest, res: NextResponse) {
    if(req.method !== 'GET') {
        return NextResponse.json({error: 'Internal Server Error'} , {status: 405})
    }

    try {
        const movieCount = await prisma.movie.count();
        const randomIndex = Math.floor(Math.random() * movieCount);

        const randomMovies = await prisma.movie.findMany({
            take: 1,
            skip: randomIndex
        });

        console.log(randomMovies[0])

        return NextResponse.json({body: randomMovies[0]})
        
    } catch (error) {
        return NextResponse.json({error: error} , {status: 400})
    }
}