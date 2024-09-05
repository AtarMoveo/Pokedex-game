import styled from "styled-components";
import { SxProps } from '@mui/material';
import { colors, font, textStyle } from "../../assets/style/setup/constants";

export const StyledImg = styled.img`
    width: 40px;
    height: 40px;
    padding: 0.25rem;
    background-color: ${colors.primary[60]};
    border-radius: 50%;
`

export const textFieldStyles: SxProps = {
    zIndex: 1,
    maxWidth: '250px',
    '& .MuiOutlinedInput-root': {
        height: '2.375rem',
        borderRadius: '8px',
        '& fieldset': {
            borderColor: colors.neutrals[200],
            backgroundColor: 'transparent',
            outline: 'none',
            zIndex: '-1',
        },
        '&.Mui-focused fieldset': {
            borderColor: colors.neutrals[200],
            borderWidth: '1px',
        },
        '&.MuiInputBase-sizeSmall': {
            fontFamily: font.primary.regular,
            fontSize: '14px',
            lineHeight: '22px',
            padding: '8px 12px 8px 12px',
            '.MuiAutocomplete-input': {
                padding: '0',
            },
        },
    },
    '& .MuiInputBase-input': {
        opacity: 1,
        '&::placeholder': {
            color: colors.neutrals[400],
            opacity: 1,
        },
    },
    '& svg': {
        color: colors.neutrals[400],
    },
}


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