export interface User {
    id: string
    name: string
    password: string
    email: string
}

export interface UserPokemons {
    userId: string
    pokemonIds: number[]
}