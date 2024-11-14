'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb'

const register = async (formData: FormData) => {
    if (!formData) {
        throw new Error ('Try again!');
    }

    const formDataRaw = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };
        const name =  formData.get('lastName') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string

    try {
        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        });

        if (existingUser) {
            throw new Error('Email taken')
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prismadb.user.create({
            data: {
                name: formDataRaw.name,
                email: formDataRaw.email,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
              },
        });

        // return res.status(200).json(user);
    } catch (error) {
        console.log(error)
    }
    redirect('/auth')

}

export { register }