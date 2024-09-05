import { PrismaClient } from "@prisma/client"
import { AuthUser } from "@aws-amplify/auth";

const prisma = new PrismaClient()

export const userService = {
    getById,
    saveUser
}

async function getById(cognitoId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { cognitoId },
            select: { id: true },
        })

        if (!user) {
            throw new Error('User not found')
        }

        return user
    } catch (err) {
        console.error('Error retrieving user by ID:', err)
        throw err
    }
}


async function saveUser(cognitoUser: AuthUser): Promise<{ id: number, email: string }> {
    const { userId, username, signInDetails } = cognitoUser
    if (!userId) {
        throw new Error('Missing userId')
    }
    if (!username) {
        throw new Error('Missing username')
    }
    if (!signInDetails?.loginId) {
        throw new Error('Missing loginId')
    }

    try {
        const upsertedUser = await prisma.user.upsert({
            where: { cognitoId: userId },
            update: { email: signInDetails!.loginId, name: username },
            create: { cognitoId: userId, email: signInDetails!.loginId as string, name: username },
        })

        await insertPokemonsToNewUser(upsertedUser.id)
        const { id, email } = upsertedUser
        return { id, email }

    } catch (err) {
        console.error('Error upserting user:', err)
        throw new Error('User upsert failed')
    }
}

async function insertPokemonsToNewUser(userId: number) {
    const userPokemons = await prisma.userPokemons.findMany({
        where: { userId }
    })

    if (userPokemons.length === 0) {
        await prisma.userPokemons.createMany({
            data: [
                { userId, pokemonId: 25 },
                { userId, pokemonId: 37 },
                { userId, pokemonId: 42 },
            ],
            skipDuplicates: true,
        })
    }
}