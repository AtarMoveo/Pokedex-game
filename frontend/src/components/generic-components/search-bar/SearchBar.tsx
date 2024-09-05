import { useState } from "react"

import { SearchIcon, XIcon } from "../../../assets/svg/svg"
import { StyledInputWrapper } from "./styles"

interface SearchBarProps {
    onChange: (value: string) => void,
    placeholder?: string
    isFiltered?: boolean
}

export const SearchBar = ({ onChange, placeholder = 'Search', isFiltered = false }: SearchBarProps) => {
    const [value, setValue] = useState<string>('');

    function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
        const newValue = ev.target.value
        setValue(newValue)
        onChange(newValue)
    }

    return <StyledInputWrapper value={value} $isFiltered={isFiltered}>
        <SearchIcon></SearchIcon>
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            data-cy="search-pokemon-input"
        />
        {isFiltered && <button className="clean-btn" onClick={() => {
            (setValue('')); onChange('')
        }}>
            <XIcon></XIcon>
        </button>
        }
    </StyledInputWrapper>
}