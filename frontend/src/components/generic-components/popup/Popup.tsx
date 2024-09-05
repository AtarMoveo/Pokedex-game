import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Pokemon } from '../../../data/types/pokemon';
import { StyledPopup } from './styles';
import { CloseModalX, SeparatingLine } from '../../../assets/svg/svg';
import { PokemonInfo } from '../../pokemon-info/PokemonInfo';

interface PopupProps {
    selectedPokemon: Pokemon | null
    setSelectedPokemon: Dispatch<SetStateAction<Pokemon | null>>
}
export function Popup({ selectedPokemon, setSelectedPokemon }: PopupProps) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (selectedPokemon) {
            setIsOpen(true)
        }
    }, [selectedPokemon])

    const handleClose = () => {
        setIsOpen(false)
        setSelectedPokemon(null)
    }

    if (!selectedPokemon) return
    return (
        <StyledPopup
            data-cy="pokemon-popup"
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className='pokemon-id'>{selectedPokemon.id}</div>
            <DialogTitle id="alert-dialog-title" data-cy="pokemon-popup-title">{selectedPokemon.name}</DialogTitle>
            <DialogContent>
                <img src={selectedPokemon.image} alt={`${selectedPokemon.name} image`} />
                <DialogContentText id="alert-dialog-description">
                    <p className='pokemon-description'>{selectedPokemon.description}</p>
                    <SeparatingLine />
                    <PokemonInfo pokemon={selectedPokemon} />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button data-cy="pokemon-popup-close" onClick={handleClose} color="primary">
                    <CloseModalX></CloseModalX>
                </Button>
            </DialogActions>
        </StyledPopup>
    )
}