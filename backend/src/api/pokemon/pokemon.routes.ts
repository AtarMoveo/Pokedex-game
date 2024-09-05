import express from 'express'
import { getPokemon, getPokemons, getRandomPokemon } from './pokemon.controller'

const router = express.Router()

router.get('/', getPokemons)
router.get('/:id', getPokemon)
router.get('/random/:id', getRandomPokemon); // New route for random Pokémon

export const pokemonRoutes = router