import { Pokemon } from "../../data/types/pokemon"
import { StyledPokemonInfo } from "./styles"

interface PokemonInfoProps {
    pokemon: Pokemon
}

export function PokemonInfo({ pokemon }: PokemonInfoProps) {
    return <StyledPokemonInfo>
        <div><h4>Height</h4><span>{pokemon.height}</span></div>
        <div><h4>Weight</h4><span>{pokemon.weight}</span></div>
        <div><h4>Type</h4><span>{pokemon.type.join(', ')}</span></div>
        <div><h4>HP</h4><span>{pokemon.hpLevel}</span></div>
    </StyledPokemonInfo>
}