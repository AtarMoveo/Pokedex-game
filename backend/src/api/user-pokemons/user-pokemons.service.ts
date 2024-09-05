import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const userPokemonsService = {
    getUserPokemons,
    getUserPokemonsIds,
    addPokemonToUser,
    removePokemonFromUser
}

async function getUserPokemons(userId: number) {
    if (isNaN(userId) || userId <= 0) {
        throw new Error('Invalid user ID')
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                pokemons: {
                    include: { pokemon: true }
                }
            }
        })
        if (!user) {
            throw new Error(`User with ID ${userId} not found`)
        }
        return user.pokemons.map((userPokemon) => userPokemon.pokemon)
    } catch (err) {
        console.error('Error fetching user Pokemon:', err)
        throw new Error(`Failed to get Pokemon for user with ID ${userId}`)
    }
}

async function getUserPokemonsIds(userId: number) {
    if (isNaN(userId) || userId <= 0) {
        throw new Error('Invalid user ID');
    }
    try {
        const userPokemons = await prisma.userPokemons.findMany({
            where: { userId },
            select: { pokemonId: true }
        })
        const userPokemonIds = userPokemons.map(up => up.pokemonId)
        return userPokemonIds
    } catch (err) {
        console.error('Error fetching user Pokemon IDs:', err)
        throw new Error(`Failed to get Pokemon IDs for user with ID ${userId}`)
    }
}

async function addPokemonToUser(userId: number, pokemonId: number) {
    if (isNaN(userId) || userId <= 0) {
        throw new Error('Invalid user ID')
    }
    if (isNaN(pokemonId) || pokemonId <= 0) {
        throw new Error('Invalid Pokemon ID')
    }
    try {
        const addedRow = await prisma.userPokemons.create({
            data: {
                userId,
                pokemonId,
            }
        })
        return addedRow
    } catch (err) {
        console.error('Error adding Pokemon to user:', err)
        throw new Error(`Failed to add Pokemon with ID ${pokemonId} to user with ID ${userId}`)
    }
}

async function removePokemonFromUser(userId: number, pokemonId: number) {
    if (isNaN(userId) || userId <= 0) {
        throw new Error('Invalid user ID')
    }
    if (isNaN(pokemonId) || pokemonId <= 0) {
        throw new Error('Invalid Pokemon ID')
    }
    try {
        const deletedRow = await prisma.userPokemons.delete({
            where: {
                userId_pokemonId: {
                    userId,
                    pokemonId
                }
            }
        })
        return deletedRow
    } catch (err) {
        console.error('Error removing Pokemon from user:', err)
        throw new Error(`Failed to remove Pokemon with ID ${pokemonId} from user with ID ${userId}`)
    }
}
