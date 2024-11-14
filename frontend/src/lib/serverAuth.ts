import { NextApiRequest } from "next";
import { getSession } from "next-auth/react"; 
import { auth } from "@/auth";

import prisma from "./prismadb";

const serverAuth = async () => {
    const session = await auth();

    if(!session?.user?.email) {
        throw new Error('Not signed in')
    
    
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session?.user?.email,
        }
    });

    if(!currentUser) {
       throw new Error('Nog signed in') 
    }

    return currentUser;
}

export default serverAuth;