import { Dispatch, SetStateAction } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';

import { Pokemon } from '../../data/types/pokemon';
import { font } from '../../assets/style/setup/constants';
import { StyledImg, textFieldStyles, listboxStyles } from './styles';

interface FightSearchProps {
  options: Pokemon[]
  selectedPokemon: Pokemon
  setSelectedPokemon: Dispatch<SetStateAction<Pokemon>>
  isDisabled?: boolean
}

export function FightSearch({ options, selectedPokemon, setSelectedPokemon, isDisabled }: FightSearchProps) {
  function handlePokemonSelect(pokemon: Pokemon) {
    setSelectedPokemon(pokemon)
  }

  return (
    <Autocomplete
      data-cy="pokemon-dropdown"
      disableClearable
      disabled={isDisabled}
      options={options}
      getOptionLabel={(option) => option.name}
      value={selectedPokemon}
      onChange={(_, newValue) => handlePokemonSelect(newValue!)}
      renderOption={(props, option) => (
        <Box component="li" {...props}
          data-cy="pokemon-option"
          sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <StyledImg src={option.thumbnail} alt={option.name} />
          <span style={{ flexGrow: 1 }}>{option.name}</span>
          <div>
            <span style={{ fontFamily: font.primary.bold }}>{option.powerLevel}</span>
            <span>px</span>
          </div>
        </Box>
      )}
      renderInput={(params) => <TextField {...params} placeholder="Choose a Pokémon" size="small" />}
      sx={textFieldStyles}
      ListboxProps={{
        sx: listboxStyles,
      }}
    />
  )
}