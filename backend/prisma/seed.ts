import { Pokemon as PrismaPokemon, PrismaClient } from '@prisma/client';
import fs from 'fs/promises';

const prisma = new PrismaClient()

const defaultImg = 'public/assets/img/Poke_Ball.webp'

createPokemons()
// createUserPokemons()

async function createPokemons() {
    try {
        const data = await fs.readFile('src/data/pokemon.json', 'utf-8')
        const pokemons = JSON.parse(data)
        const pokemonsToSave = convertToBasicPokemons(pokemons)
        await savePokemons(pokemonsToSave)
    } catch (error) {
        console.error('Error fetching Pokemons:', error)
    }
}

function convertToBasicPokemons(pokemons: any[]): Omit<PrismaPokemon, 'id'>[] {
    return pokemons.map((pokemon) => {
        return {
            image: pokemon.image?.hires || defaultImg,
            thumbnail: pokemon.image?.thumbnail || defaultImg,
            name: pokemon.name.english,
            description: pokemon.description,
            powerLevel: pokemon.base?.Attack || 30,
            hpLevel: pokemon.base?.HP || 30,
            currHpLevel: pokemon.base?.HP || 30,
            height: pokemon.profile.height,
            weight: pokemon.profile.weight,
            type: pokemon.type,
            speed: pokemon.base?.Speed || 30
        }
    })
}


async function savePokemons(pokemons: Omit<PrismaPokemon, 'id'>[]) {
    try {
        const result = await prisma.pokemon.createMany({
            data: pokemons,
        })
        console.log('Pokemons saved')
    } catch (error) {
        console.error('Error saving Pokemons:', error)
    } finally {
        await prisma.$disconnect()
    }
}

async function createUserPokemons() {
    try {
        await prisma.userPokemons.createMany({
            data: [
                {
                    userId: 1,
                    pokemonId: 25,
                },
                {
                    userId: 1,
                    pokemonId: 22,
                },
                {
                    userId: 1,
                    pokemonId: 30,
                },
            ]
        })
        console.log('User Pokemons created successfully')
    } catch (error) {
        console.error('Error creating user Pokemons', error)
    }
}