import { SxProps } from '@mui/material';
import { colors, font, textStyle } from '../../../assets/style/setup/constants';
import { SortOption } from '../../../data/types/pokemon';

export const autocompleteStyles = (value: SortOption | null): SxProps => ({
    zIndex: 1,
    '& .MuiOutlinedInput-root': {
        height: '2.375rem',
        minWidth: '13.5rem',
        borderRadius: '8px',
        '& fieldset': {
            borderColor: value ? colors.primary[100] : colors.neutrals[200], // Default border color
            backgroundColor: value ? colors.primary[50] : 'transparent',
            outline: 'none',
            zIndex: '-1',
        },
        '&:hover fieldset': {
            borderColor: value ? colors.neutrals[300] : '',
        },
        '&.Mui-focused fieldset': {
            borderColor: value ? colors.primary[100] : colors.neutrals[200],
            borderWidth: '1px',
        },
        '&.MuiInputBase-sizeSmall': {
            fontSize: '14px',
            lineHeight: '22px',
            padding: '8px 12px 8px 12px',
            '.MuiAutocomplete-input': {
                padding: '0',
            },
        },
    },
    '& .MuiInputBase-input': {
        color: colors.primary[300],
        opacity: 1,
        '&::placeholder': {
            color: colors.neutrals[400],
            opacity: 1,
        },
    },
    '& svg': {
        color: value ? colors.primary[300] : colors.neutrals[400],
    },
})

export const listboxStyles: SxProps = {
    '& .MuiAutocomplete-option': {
        color: colors.neutrals[500], // Text color of the options
        fontFamily: font.primary.regular,
        ...textStyle.body,
        '&.Mui-focused': {
            backgroundColor: colors.neutrals[100], // Background color when focused
        },
    },
}
