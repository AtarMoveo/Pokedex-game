import { Dispatch, SetStateAction, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { ArrowDown } from "../../../assets/svg/svg";
import { SortOption, SortBy } from '../../../data/types/pokemon';
import { autocompleteStyles, listboxStyles } from './styles';

interface SortProps {
  options: SortOption[]
  setSortBy: Dispatch<SetStateAction<SortBy | null>>
}

export function Sort({ options, setSortBy }: SortProps) {
  const [value, setValue] = useState<SortOption | null>(null);

  function handleSortBy(option: SortOption) {
    setValue(option)
    setSortBy(option?.sortBy)
  }

  return (
    <Autocomplete
      data-cy="sort-by-dropdown"
      disablePortal
      options={options}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.sortBy === value.sortBy}
      value={value}
      onChange={(_, newValue) => handleSortBy(newValue!)}
      renderInput={(params) => <TextField {...params} placeholder="Sort by" size="small" />}
      renderOption={(props, option) => (
        <li {...props} data-cy={`sort-by-option-${option.label}`}>
          {option.label}
        </li>
      )}
      popupIcon={<ArrowDown />}
      sx={autocompleteStyles(value)}
      ListboxProps={{
        sx: listboxStyles
      }}
    />
  )
}