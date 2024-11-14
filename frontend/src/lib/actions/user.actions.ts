import bcrypt from 'bcrypt';
import prismadb from '@/lib/prismadb'

export const register = async (email: string, name:string, password: string) => {
    try {
        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        });

        if (existingUser) {
            return console.log({error: 'Email taken'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        });

        return user;
    } catch (error) {
        console.log(error)
    }
}

