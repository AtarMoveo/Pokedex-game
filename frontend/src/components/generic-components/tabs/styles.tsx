import { SxProps } from "@mui/material";
import { colors, font, textStyle } from "../../../assets/style/setup/constants";

export const tabsStyles: SxProps = {
    borderBottom: 0,
    '.MuiTabs-flexContainer': { gap: '0.5rem' },
    '.MuiTab-root': { minHeight: 'auto' },
    '& .MuiTabs-indicator': {
        backgroundColor: colors.neutrals.black
    },
    '.MuiTabs-scroller': {
        height: 'fit-content'
    }
}

export const tabStyles: SxProps = {
    gap: '0.5rem',
    fontFamily: font.primary.regular,
    ...textStyle.body,
    textTransform: 'none',
    color: colors.neutrals.black,
    '&.Mui-selected': {
        fontFamily: font.primary.bold,
        color: colors.neutrals.black,
    },
    '&:hover': {
        backgroundColor: colors.primary[50],
    },
    '&:disabled': {
        svg: {
            color: '#9fa1a2a1'
        }
    }
}