import { Pokemon, PrismaClient } from "@prisma/client";
import { SortBy } from "../../data/types/pokemon";
import { userPokemonsService } from "../user-pokemons/user-pokemons.service";
import { secureMathRandom } from "../../util/util";

const prisma = new PrismaClient()

export const pokemonService = {
    getPokemons,
    getById,
    fetchRandomPokemon
}

async function getPokemons(filterBy?: string, sortBy?: SortBy | null, page = 0, rowsPerPage = 10, userId?: number) {
    try {
        const where: any = {}
        if (filterBy) {
            where.OR = [
                { name: { contains: filterBy, mode: 'insensitive' } },
                { description: { contains: filterBy, mode: 'insensitive' } },
            ]
        }

        if (userId) {
            const userPokemonIds = await userPokemonsService.getUserPokemonsIds(+userId)
            where.id = { in: userPokemonIds }
        }

        const orderBy: any = {}
        if (sortBy) {
            if (sortBy.name) orderBy.name = +sortBy.name === 1 ? 'asc' : 'desc'
            if (sortBy.power) orderBy.powerLevel = +sortBy.power === 1 ? 'asc' : 'desc'
            if (sortBy.hp) orderBy.hpLevel = +sortBy.hp === 1 ? 'asc' : 'desc'
        }

        const total = await prisma.pokemon.count({ where })

        const pokemons = await prisma.pokemon.findMany({
            where,
            orderBy,
            skip: page * rowsPerPage,
            take: rowsPerPage,
        })

        return { rows: pokemons, total }
    } catch (err) {
        console.error('Error fetching pokemons:', err)
        throw new Error('Failed to fetch Pokemon data')
    }
}

async function getById(pokemonId: number) {
    try {
        const pokemon: Pokemon | null = await prisma.pokemon.findUnique({
            where: {
                id: pokemonId,
            },
        })
        return pokemon
    } catch (err) {
        console.error('Error fetching pokemon by ID:', err)
        throw new Error('Failed to fetch Pokemon by ID')
    }
}

export async function fetchRandomPokemon(userId: number): Promise<Pokemon | null> {  // random & not in user collection
    try {
        const userPokemons = await prisma.userPokemons.findMany({
            where: { userId },
            select: { pokemonId: true }
        })
        const userPokemonIds = userPokemons.map(up => up.pokemonId)

        const availablePokemons = await prisma.pokemon.findMany({
            where: {
                id: {
                    notIn: userPokemonIds
                }
            }
        })

        if (availablePokemons.length === 0) return null

        const randomIndex = Math.floor(secureMathRandom() * availablePokemons.length)
        return availablePokemons[randomIndex]
    } catch (error) {
        console.error('Error fetching random Pokemon:', error)
        throw new Error('Failed to fetch random Pokemon')
    }
}