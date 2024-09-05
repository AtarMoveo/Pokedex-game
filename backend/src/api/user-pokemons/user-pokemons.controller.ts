import { Request, Response } from "express";
import { userPokemonsService } from "./user-pokemons.service";

export async function getUserPokemons(req: Request, res: Response) {
    const userId = Number(req.params.id)
    try {
        const pokemons = await userPokemonsService.getUserPokemons(userId)
        res.send(pokemons)
    } catch (err) {
        res.status(400).send({ err: 'Failed to get user pokemons' })
    }
}

export async function getUserPokemonsIds(req: Request, res: Response) {
    const userId = Number(req.params.id)
    try {
        const pokemonIds = await userPokemonsService.getUserPokemonsIds(userId)
        res.send(pokemonIds)
    } catch (err) {
        console.error('Error in getUserPokemonsIds:', err)
        res.status(500).send({ error: `Failed to get Pokemon IDs for user with ID ${userId}` })
    }
}

export async function addPokemonToUser(req: Request, res: Response) {
    const userId = Number(req.params.id)
    const pokemonId = Number(req.body.pokemonId)

    try {
        const addedRow = await userPokemonsService.addPokemonToUser(userId, pokemonId)
        res.send(addedRow)
    } catch (err) {
        console.error('Error in addPokemonToUser:', err)
        res.status(500).send({ error: `Failed to add Pokemon with ID ${pokemonId} to user with ID ${userId}` })
    }
}

export async function removePokemonFromUser(req: Request, res: Response) {
    const userId = Number(req.params.id)
    const pokemonId = Number(req.body.pokemonId)

    try {
        const deletedRow = await userPokemonsService.removePokemonFromUser(userId, pokemonId)
        res.json(deletedRow)
    } catch (err) {
        console.error('Error in removePokemonFromUser:', err)
        res.status(500).send({ error: `Failed to remove Pokemon with ID ${pokemonId} from user with ID ${userId}` })
    }
}