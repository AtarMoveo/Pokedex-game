import request from 'supertest'
import { app, server } from '../../../server'

afterAll(async () => {
    server.close()
})

describe('GET /api/user/:id', () => {
    test('should return a user by ID', async () => {
        const res = await request(app)
            .get('/api/user/a3740872-8031-7029-afc4-9a66d9531d17') 
            .set('authorization', process.env.USER_TOKEN!)
            .expect(200)
        
        expect(res.body).toHaveProperty('id', 9)
    })

    test('should return 400 if user not found', async () => {
        const res = await request(app)
            .get('/api/user/999')
            .set('authorization', process.env.USER_TOKEN!)
            .expect(400)
        
        expect(res.body).toHaveProperty('err', 'Failed to get user')
    })
})

describe('POST /api/user/login', () => {
    test('should sign up a new user', async () => {
        const cognitoUser = {
            userId: 'new-user-id',
            username: 'newuser@example.com',
            signInDetails: {
                loginId: 'newuser@example.com',
            },
        }

        const res = await request(app)
            .post('/api/user/login')
            .set('authorization', process.env.USER_TOKEN!)
            .send({ cognitoUser })
            .expect(200)
        console.log(res.body)
        const user = res.body
        expect(user.email).toBe('newuser@example.com')
    })

    test('should return 400 if signup fails', async () => {
        const cognitoUser = {
            userId: '',
            username: '',
            signInDetails: {
                loginId: '',
            },
        }

        const res = await request(app)
            .post('/api/user/login')
            .set('authorization', process.env.USER_TOKEN!)
            .send({ cognitoUser })
            .expect(400)

        expect(res.body).toHaveProperty('err', 'Failed to sign up user')
    })
})
