import { Dispatch, SetStateAction } from "react"
import { Pokemon } from "../../data/types/pokemon"
import { Popup } from "../generic-components/popup/Popup"
import { PokemonCard } from "../pokemon-card/PokemonCard"
import { StyledCardView } from "./styles"
import { Button } from "../generic-components/button/Button"

interface CardViewProps {
    pokemons: Pokemon[]
    selectedPokemon: Pokemon | null
    setSelectedPokemon: Dispatch<SetStateAction<Pokemon | null>>
    setRowsPerPage: Dispatch<SetStateAction<number>>
    rowsPerPage: number
    totalRows: number
    userPokemonsIds?: number[]
}

export function CardView({ pokemons, selectedPokemon, setSelectedPokemon, setRowsPerPage, 
    totalRows, rowsPerPage, userPokemonsIds }: CardViewProps) {
    function loadMorePokemons() {
        setRowsPerPage(prevRows => prevRows + 12)
      }

    return <StyledCardView data-cy="cards-view-cmp">
        {pokemons.map((pokemon) => {
            return <PokemonCard pokemon={pokemon} setSelectedPokemon={setSelectedPokemon} userPokemonsIds={userPokemonsIds}></PokemonCard>
        })}
        <Popup selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon}></Popup>
        {totalRows > rowsPerPage && <Button type="primary" size="md" onClick={loadMorePokemons}>Load more</Button>}
    </StyledCardView>
}