export interface User {
    id: number
    email: string
}

export interface UserPokemons {
    userId: number
    pokemonIds: number[]
}