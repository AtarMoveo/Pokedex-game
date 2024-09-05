import express from 'express'
import { addPokemonToUser, getUserPokemons, getUserPokemonsIds, removePokemonFromUser } from './user-pokemons.controller'

const router = express.Router()

router.get('/:id', getUserPokemons)
router.get('/:id/ids', getUserPokemonsIds)
router.post('/:id', addPokemonToUser)
router.delete('/:id', removePokemonFromUser)

export const userPokemonsRoutes = router