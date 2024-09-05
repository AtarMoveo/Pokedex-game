import { Location, useLocation } from "react-router";
import { PokemonsTable } from "../pokemons-table/PokemonsTable";

import '@aws-amplify/ui-react/styles.css';

interface MyPokemonsProps {
    userId: number | undefined
}

export function MyPokemons({userId}: MyPokemonsProps) {
    const location: Location = useLocation()

  
    return (
        <PokemonsTable
            title='My Pokemons'
            userId={userId}
            refresh={location}
        >
        </PokemonsTable>
    )
}