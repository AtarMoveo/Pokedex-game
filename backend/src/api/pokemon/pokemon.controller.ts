import { Request, Response } from "express";
import { fetchRandomPokemon, pokemonService } from "./pokemon.service";
import { SortBy } from "../../data/types/pokemon";

interface QueryParams {
    filterBy?: string
    sortBy?: SortBy | null
    page?: number
    rowsPerPage?: number
    userId?: number
}

export async function getPokemons(req: Request<{}, {}, {}, QueryParams>, res: Response) {    
    const { filterBy, sortBy, page = 0, rowsPerPage = 10, userId } = req.query
    try {
        const pokemons = await pokemonService.getPokemons(filterBy, sortBy, +page, +rowsPerPage, userId)
        res.json(pokemons)
    } catch (error) {
        res.status(500).send({ error: 'Failed to get pokemons' })
    }
}

export async function getPokemon(req: Request<{ id: string }>, res: Response) {
    try {
        const pokemon = await pokemonService.getById(+req.params.id)
        if (pokemon) {
            res.json(pokemon)
        } else {
            res.status(404).send({ error: 'Pokemon not found' })
        }
    } catch (err) {
        res.status(400).send({ error: 'Failed to get pokemon' })
    }
}

export async function getRandomPokemon(req: Request, res: Response) {
    const userId = Number(req.params.id)
    try {
        const randomPokemon = await fetchRandomPokemon(userId)
        if (randomPokemon) {
            res.json(randomPokemon)
        } else {
            res.status(404).send({ error: 'No available Pokemon found' })
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch random Pokemon' })
    }
}