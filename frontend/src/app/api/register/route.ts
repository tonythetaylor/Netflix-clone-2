import bcrypt from 'bcrypt';

import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ status: 405 })
    }

    try {

        const { email, name, password } = await req.json();

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        if (existingUser) {
            return NextResponse.json({ status: 422, error: 'Email taken' })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        })

        return NextResponse.json({ status: 200, user })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 400 })
    }
}