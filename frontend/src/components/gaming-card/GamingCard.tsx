import 'animate.css'

import { colors } from "../../assets/style/setup/constants"
import { Pokemon } from "../../data/types/pokemon"
import { StyledGamingCard } from "./styles"


interface GamingCardProps {
    pokemon: Pokemon
    isUser: boolean
    cardRef: React.Ref<HTMLDivElement>
}

export function GamingCard({ pokemon, isUser, cardRef }: GamingCardProps) {
    const hpProgressBar = `linear-gradient(to right, 
    ${colors.secondary.green} ${pokemon.currHpLevel / pokemon.hpLevel * 100}%, 
    ${colors.neutrals[150]} ${1 - pokemon.currHpLevel / pokemon.hpLevel * 100}%)`

    return <StyledGamingCard data-cy={isUser ? "user-pokemon-card" : "opponent-pokemon-card"}
        ref={cardRef} className="animate__animated">
        <h3 className="card-title">{isUser ? 'You' : 'Opponent'}</h3>
        <div className="img-container">
            <img data-cy="pokemon-picture" src={pokemon.image} alt={`${pokemon.name}-image`} />
            <div data-cy="pokemon-power-level" className="pokemon-pwr">{pokemon.powerLevel}<span>pwr</span></div>
        </div>
        <h5 data-cy="pokemon-id" className="pokemon-id">#{pokemon.id}</h5>
        <h3 data-cy="pokemon-name" className="pokemon-name">{pokemon.name}</h3>
        <div className="progress-bar" style={{ background: hpProgressBar, transition: '1s' }}></div>
    </StyledGamingCard>
}