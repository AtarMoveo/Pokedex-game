import request from 'supertest';
import { app, server } from '../../../server'


afterAll(async () => {
    server.close()
})

describe('GET /api/pokemon', () => {
    test('should return a list of pokemons with filtering, sorting, and pagination', async () => {
        const res = await request(app)
            .get('/api/pokemon')
            .query({ filterBy: 'Pika', sortBy: { name: '-1' }, page: 0, rowsPerPage: 10 })
            .set('authorization', process.env.USER_TOKEN!)
            .expect(200)
        expect(res.body).toHaveProperty('rows')
        expect(res.body).toHaveProperty('total')

        const { rows } = res.body
        expect(rows).toHaveLength(2)
        expect(rows[0].name).toBe('Raichu')
        expect(rows[1].name).toBe('Pikachu')
    })
})

describe('GET /api/pokemon/:id', () => {
    test('should return a specific pokemon by ID', async () => {
        const res = await request(app)
            .get('/api/pokemon/1')
            .set('authorization', process.env.USER_TOKEN!)
            .expect(200)

        const expectedPokemon = {
            id: 1,
            name: "Bulbasaur",
            image: "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/hires/001.png",
            thumbnail: "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/thumbnails/001.png",
            description: "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun’s rays, the seed grows progressively larger.",
            powerLevel: 49,
            hpLevel: 45,
            currHpLevel: 45,
            speed: 45,
            height: "0.7 m",
            weight: "6.9 kg",
            type: ["Grass", "Poison"],
        }

        expect(res.body).toEqual(expectedPokemon)
    })

    test('should return 404 if the pokemon is not found', async () => {
        const res = await request(app)
            .get('/api/pokemon/999999')
            .set('authorization', process.env.USER_TOKEN!)
            .expect(404)
        expect(res.body).toHaveProperty('error', 'Pokemon not found')
    })
})


describe('GET /api/pokemon/random/:id', () => {
    test('should return a random pokemon not owned by the user', async () => {
        const res = await request(app)
            .get('/api/pokemon/random/9')
            .set('authorization', process.env.USER_TOKEN!)
            .expect(200)
        const userPokemonIds = [25, 37, 42]
        const randomPokemon = res.body        
        expect(userPokemonIds).not.toContain(randomPokemon.id)
    })
})