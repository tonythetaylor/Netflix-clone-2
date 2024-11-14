import { NextRequest, NextResponse } from "next/server";
import { without } from 'lodash';
import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { auth } from "@/auth";

export async function POST(req: NextRequest, res: NextResponse) {
    try {

        if(req.method === 'POST') {
            const currentUser = await serverAuth()
            const body = await req.json()

            const { movieId } = body;
    
            const existingMovie = await prisma.movie.findUnique({
                where: {
                    id: movieId,
                }
            });
    
            if (!existingMovie) {
                throw new Error('Invalid ID')
            }
    

        const user = await prisma.user.update({
            where: {
                email: currentUser?.email || ''
            },
            data: {
                favoriteIds: {
                    push: movieId
                }
            }
        })

        return NextResponse.json(user)
    }
    
    return NextResponse.json({status: 405})
    } catch (error) {
        return NextResponse.json({error: error} , {status: 400})
    }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
    
    if(req.method === 'DELETE') {
        const currentUser = await serverAuth()
        const body = await req.json()
        const { movieId } = body;

        const existingMovie = await prisma.movie.findUnique({
            where: {
                id: movieId,
            }
        });

        if (!existingMovie) {
            throw new Error('Invalid ID')
        }

        const updateFavoriteIds = without(currentUser?.favoriteIds, movieId)

        const updatedUser = await prisma.user.update({
            where: {
                email: currentUser?.email || '',
            },
            data: {
                favoriteIds: updateFavoriteIds
            }
        })

        return NextResponse.json(updatedUser)
    }
    return NextResponse.json({status: 405})
    } catch (error) {
        return NextResponse.json({error: error} , {status: 400})
    }
}