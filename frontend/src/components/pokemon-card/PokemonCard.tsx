import { Dispatch, SetStateAction } from "react";
import { PowerIcon } from "../../assets/svg/svg";
import { Pokemon } from "../../data/types/pokemon";
import { StyledPokemonCard } from "./styles";
import pokeBallImg from '../../assets/img/pokeball.webp'

interface PokemonCardProps {
    pokemon: Pokemon
    setSelectedPokemon: Dispatch<SetStateAction<Pokemon | null>>
    userPokemonsIds?: number[]
}

export function PokemonCard({ pokemon, setSelectedPokemon, userPokemonsIds }: PokemonCardProps) {
    return <StyledPokemonCard onClick={() => setSelectedPokemon(pokemon)}>
        <div className="img-container">
            <img className="pokemon-img" src={pokemon.image} alt={`${pokemon.name}-image`} />
            {userPokemonsIds && userPokemonsIds.includes(pokemon.id) &&
                <img className="pokeball-img"
                    src={pokeBallImg} />}
            <div className="pokemon-pwr">{pokemon.powerLevel}<span>pwr</span>
                <PowerIcon />
            </div>
        </div>
        <h5 className="pokemon-id">#{pokemon.id.toString().padStart(4, '0')}</h5>
        <h3 className="pokemon-name">{pokemon.name}</h3>
    </StyledPokemonCard>
}