import { AuthUser } from "@aws-amplify/auth";
import { Pokemon } from "../data/types/pokemon";
import { httpService } from "./http.service";

async function addPokemonToUser(userId: number, pokemonId: number) {
    try {
        await httpService.post<Pokemon>(`user-pokemons/${userId}`, { pokemonId })
    } catch (error) {
        console.error('Error adding Pokemon to user:', error)
        throw new Error('Failed to add Pokemon to user')
    }
}

async function removePokemonFromUser(userId: number, pokemonId: number) {
    try {
        const result = await httpService.delete(`user-pokemons/${userId}`, { pokemonId })
        return result
    } catch (error) {
        console.error('Error removing Pokemon from user:', error)
        throw new Error('Failed to remove Pokemon from user')
    }
}

async function saveUser(cognitoUser: AuthUser) {
    try {
        const user = await httpService.post(`user/login`, { cognitoUser })
        return user
    } catch (error) {
        console.error('Error saving a user', error)
        throw new Error('Failed to save user')
    }
}

async function handleGameOver(userId: number, gameOver: boolean = false) {    
    try {
        const newPokemons = await httpService.post('user/gameOver', { userId, gameOver })
        return newPokemons
    } catch (error) {
        console.error('Error in handling game over', error)
        throw new Error('Failed to insert new pokemons after game over')
    }
}

export const userService = {
    addPokemonToUser,
    removePokemonFromUser,
    saveUser,
    handleGameOver
}