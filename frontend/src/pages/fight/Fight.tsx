import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import 'animate.css'

import { ButtonType, FightBtn } from "../../components/fight-btn/FightBtn";
import { UserMsg } from "../../components/user-msg/UserMsg";
import { GamingCard } from "../../components/gaming-card/GamingCard";
import { FightSearch } from "../../components/fight-search/FightSearch";

import { pokemonService } from "../../services/pokemon.service";
import { utilService } from "../../services/util.service";
import { userService } from "../../services/user.service";

import { StyledFight } from "./styles";
import { Pokemon } from "../../data/types/pokemon";

interface FightProps {
    userId: number | undefined
}

export function Fight({ userId }: FightProps) {
    const [userPokemons, setUserPokemons] = useState<Pokemon[]>([])
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>()
    const [opponentPokemon, setOpponentPokemon] = useState<Pokemon>()
    const [isGameOn, setIsGameOn] = useState(false)
    const [isFirstAttack, setIsFirstAttack] = useState(true)
    const [isUserTurn, setIsUserTurn] = useState<boolean | null>(null)
    const [userMsg, setUserMsg] = useState<React.ReactNode>(null)
    const [isGameOver, setIsGameOver] = useState(false)

    const userCardRef = useRef<HTMLDivElement>(null)
    const opponentCardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (userId) {
            loadUserPokemons()
            loadRandomOpponentPokemon()
        }
    }, [userId])

    useEffect(() => {   // handles opponent's turn
        if (isGameOn && !isUserTurn) {
            const timeoutId = setTimeout(() => {
                if (selectedPokemon!.currHpLevel <= 0) return onUserLose()
                const typeAdvantageFactor = pokemonService.isTypeAdvantage(opponentPokemon!, selectedPokemon!) ? 1.5 : 1
                const attackPower = opponentPokemon!.powerLevel * utilService.getRandomAttackFactor() * typeAdvantageFactor

                const card = userCardRef.current
                if (card) {
                    card.classList.remove('animate__zoomIn')
                    utilService.triggerAnimation(card, 'animate__flash')
                }

                setSelectedPokemon((prevPokemon) => {
                    const pokemon = prevPokemon as Pokemon
                    const updatedHp = pokemon.currHpLevel - attackPower
                    return { ...pokemon, currHpLevel: updatedHp > 0 ? updatedHp : 0 }
                })
                setIsUserTurn(true)
            }, 1500)
            return () => clearTimeout(timeoutId)
        }
    }, [isUserTurn, isGameOn])

    async function loadUserPokemons() {
        try {
            const pokemons = await pokemonService.fetchMyPokemons(userId!)
            setUserPokemons(pokemons)
            setSelectedPokemon(pokemons[0])
        } catch (err) {
            console.error(err)
        }
    }

    async function loadRandomOpponentPokemon() {
        try {
            const pokemon: Pokemon = await pokemonService.fetchRandomPokemon(userId!)
            setOpponentPokemon(pokemon)
        } catch (err) {
            console.error(err)
        }
    }

    function onFight() {
        setIsGameOn(true)
        if (selectedPokemon!.speed >= opponentPokemon!.speed) {   // determines who starts 
            setIsUserTurn(true)
        } else {
            setIsUserTurn(false)
        }
    }

    function onAttack() {
        setIsFirstAttack(false)
        const typeAdvantageFactor = pokemonService.isTypeAdvantage(selectedPokemon!, opponentPokemon!) ? 1.5 : 1
        const attackPower = selectedPokemon!.powerLevel * utilService.getRandomAttackFactor() * typeAdvantageFactor

        const card = opponentCardRef.current
        if (card) {
            card.classList.remove('animate__zoomIn')
            utilService.triggerAnimation(card, 'animate__flash')
        }
        setOpponentPokemon((prevPokemon) => {
            const pokemon = prevPokemon as Pokemon
            const updatedHp = pokemon.currHpLevel - attackPower
            return { ...pokemon, currHpLevel: updatedHp > 0 ? updatedHp : 0 }
        })
        setIsUserTurn(false)
    }

    function onCatch() {
        const catchRate = (opponentPokemon?.currHpLevel! < 0.2 * opponentPokemon?.hpLevel!) ? 0.4 : 0.2
        const isCaught = Math.random() < catchRate
        if (isCaught) {
            const card = opponentCardRef.current
            if (card) {
                utilService.triggerAnimation(card, 'animate__zoomOutLeft')
            }
            onAddPokemonToUser(userId!, opponentPokemon!)
        } else {
            setIsUserTurn(false)
        }
    }

    async function onAddPokemonToUser(userId: number, pokemon: Pokemon) {
        try {
            await userService.addPokemonToUser(userId, pokemon.id)
            setUserPokemons(prevPokemons => [...prevPokemons, pokemon])
            setUserMsg(
                <>
                    <p style={{ margin: 0 }}>Congratulations!</p>
                    <p style={{ marginBlockStart: 0 }}>You caught {pokemon.name}.</p>
                    <img style={{ height: 150 }} src={pokemon.image} alt={pokemon.name} />
                </>
            )
        } catch (err) {
            console.error('Failed to add Pokemon to user')
        }
    }

    function onUserLose() {
        const card = userCardRef.current
        if (card) {
            utilService.triggerAnimation(card, 'animate__zoomOutRight')
        }
        onRemovePokemonFromUser(userId!, selectedPokemon!)
    }

    async function onRemovePokemonFromUser(userId: number, pokemon: Pokemon) {
        try {
            userService.removePokemonFromUser(userId, pokemon.id)
            setUserPokemons(prevPokemons => prevPokemons.filter(p => p.id !== pokemon.id))
            if (userPokemons.length <= 1) {
                await onGameOver(userId)
            } else {
                handlePokemonCatch(pokemon)
            }
        } catch (err) {
            console.error('Failed to remove Pokemon from user')
        }
    }

    function handlePokemonCatch(pokemon: Pokemon) {
        setUserMsg(
            <>
                <p style={{ margin: 0 }}>You lost.</p>
                <p style={{ marginBlockStart: 0 }}>{pokemon.name} was caught.</p>
                <img style={{ height: 150 }} src={pokemon.image} alt={pokemon.name} />
            </>
        )
    }

    async function onGameOver(userId: number) {
        try {
            await userService.handleGameOver(userId, true)
            await loadUserPokemons()
            setIsGameOver(true)
            setUserMsg(
                <>
                    <p style={{ margin: 0 }}>Game Over!</p>
                    <p> You lost all Pokemons. </p>
                </>
            )
        } catch (err) {
            console.error(err)
        }
    }

    function onRestart() {
        setIsGameOn(false)
        setIsFirstAttack(true)
        setUserMsg(null)
        setIsUserTurn(null)
        setSelectedPokemon(userPokemons[0])
        loadRandomOpponentPokemon()
        activateAnimations()
    }

    function activateAnimations() {
        const userCard = userCardRef.current
        const opponentCard = opponentCardRef.current

        if (userCard) {
            userCard.classList.remove('animate__zoomOutRight', 'animate__flash')
            utilService.triggerAnimation(userCard, 'animate__zoomIn')
        }

        if (opponentCard) {
            opponentCard.classList.remove('animate__zoomOutLeft', 'animate__flash')
            utilService.triggerAnimation(opponentCard, 'animate__zoomIn')
        }
    }

    if (!selectedPokemon || !opponentPokemon) return <div>Loading...</div>
    return <StyledFight data-cy="fight-page">
        <div className="fight-main-container">
            <h1 className="fight-title">Fighting arena</h1>
            <h2 className="fight-subtitle">Press fight button until your or your enemy power ends</h2>
            <FightSearch options={userPokemons}
                selectedPokemon={selectedPokemon}
                setSelectedPokemon={setSelectedPokemon as Dispatch<SetStateAction<Pokemon>>}
                isDisabled={isGameOn}>
            </FightSearch>
            <div className="cards-container">
                {selectedPokemon && <GamingCard cardRef={userCardRef} pokemon={selectedPokemon} isUser={true}></GamingCard>}
                <div className="btn-container">
                    {!isGameOn && <FightBtn type={ButtonType.Fight} onClick={onFight}>Fight</FightBtn>}
                    {isGameOn && <FightBtn type={ButtonType.Action} isDisabled={!isUserTurn} onClick={onAttack}>Attack</FightBtn>}
                    {isGameOn && <FightBtn type={ButtonType.Action} isDisabled={isFirstAttack} onClick={onCatch}>Catch</FightBtn>}
                </div>
                {opponentPokemon && <GamingCard cardRef={opponentCardRef} pokemon={opponentPokemon} isUser={false}></GamingCard>}
                {userMsg && <UserMsg msg={userMsg} onRestart={onRestart} isGameOver={isGameOver}></UserMsg>}
            </div>
        </div>
    </StyledFight>
}