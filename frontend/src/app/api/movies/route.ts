import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function GET(req: NextRequest) {
    if(req.method !== 'GET') {
        return NextResponse.json({error: 'Internal Server Error'} , {status: 405})
    }

    try {

        const movies = await prisma.movie.findMany();

        return NextResponse.json({body: movies})
        
    } catch (error) {
        return NextResponse.json({error: error} , {status: 400})
    }
}