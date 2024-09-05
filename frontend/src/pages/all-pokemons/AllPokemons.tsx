import { useEffect, useState } from "react";
import { PokemonsTable } from "../pokemons-table/PokemonsTable";
import { pokemonService } from "../../services/pokemon.service";

interface AllPokemonsProps {
    userId: number | undefined
}

export function AllPokemons({ userId }: AllPokemonsProps) {
    const [userPokemonsIds, setUserPokemonsIds] = useState<number[]>([])

    useEffect(() => {
        if (userId) loadUserPokemons()
    }, [userId])

    async function loadUserPokemons() {
        try {
            const pokemonsIds = await pokemonService.fetchUserPokemonsIds(userId!)
            setUserPokemonsIds(pokemonsIds)
        } catch (err) {
            console.error('Failed to get user Pokemons ids')
        }
    }
    
    return <PokemonsTable
        title='All Pokemons'
        userPokemonsIds={userPokemonsIds}
    >
    </PokemonsTable>
}