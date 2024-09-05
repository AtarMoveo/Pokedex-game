import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

import { userRoutes } from './src/api/user/user.routes';
import { pokemonRoutes } from './src/api/pokemon/pokemon.routes';
import { userPokemonsRoutes } from './src/api/user-pokemons/user-pokemons.routes';
import { authenticateJWT } from './src/middlewares/auth.middleware';

dotenv.config()

export const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}))

app.use('/api/user', authenticateJWT, userRoutes)
app.use('/api/pokemon', authenticateJWT, pokemonRoutes)
app.use('/api/user-pokemons', authenticateJWT, userPokemonsRoutes)

// app.get('/', async (req: Request, res: Response) => {

// })

const port = 3000

export const server = app.listen(port, () => {
  console.log('Server is running on port: ' + port)
})

// Handle shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
