import request from 'supertest';
import { app, server } from '../../../server'

afterAll(async () => {
    server.close()
})
describe('User Pokémon Routes', () => {
    const userId = 9
    const pokemonIds = [25, 37, 42]

    test('GET /api/user-pokemons/:id should return a user\'s Pokemons', async () => {
        const res = await request(app)
            .get(`/api/user-pokemons/${userId}`)
            .set('authorization', process.env.USER_TOKEN!)
            .expect(200)

        expect(res.body).toBeInstanceOf(Array)
        expect(res.body[0]).toHaveProperty('id', pokemonIds[0])
        expect(res.body[1]).toHaveProperty('id', pokemonIds[1])
        expect(res.body[2]).toHaveProperty('id', pokemonIds[2])
    })

    test('GET /api/user-pokemons/:id/ids should return a user\'s Pokemons IDs', async () => {
        const res = await request(app)
            .get(`/api/user-pokemons/${userId}/ids`)
            .set('authorization', process.env.USER_TOKEN!)
            .expect(200)

        expect(res.body).toEqual(pokemonIds)
    })

    test('POST /api/user-pokemons/:id should add a Pokemon to the user', async () => {
        const res = await request(app)
            .post(`/api/user-pokemons/${userId}`)
            .set('authorization', process.env.USER_TOKEN!)
            .send({ pokemonId: 1 })
            .expect(200)

        expect(res.body).toHaveProperty('userId', userId)
        expect(res.body).toHaveProperty('pokemonId', 1)
    })

    test('DELETE /api/user-pokemons/:id should remove a Pokemon from the user', async () => {
        const res = await request(app)
            .delete(`/api/user-pokemons/${userId}`)
            .set('authorization', process.env.USER_TOKEN!)
            .send({ pokemonId: 1 })
            .expect(200)

        expect(res.body).toHaveProperty('userId', userId)
        expect(res.body).toHaveProperty('pokemonId', 1)
    })

    test('GET /api/user-pokemons/:id should return 400 if user not found', async () => {
        const res = await request(app)
            .get(`/api/user-pokemons/999`)
            .set('authorization', process.env.USER_TOKEN!)
            .expect(400)

        expect(res.body).toHaveProperty('err', 'Failed to get user pokemons')
    })

    test('POST /api/user-pokemons/:id should return 500 if adding Pokemon fails', async () => {
        const res = await request(app)
            .post(`/api/user-pokemons/${userId}`)
            .set('authorization', process.env.USER_TOKEN!)
            .send({ pokemonId: 'invalid' })
            .expect(500)

        expect(res.body).toHaveProperty('error', `Failed to add Pokemon with ID NaN to user with ID ${userId}`)
    })
})
