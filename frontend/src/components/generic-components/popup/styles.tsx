import styled from 'styled-components';
import { Dialog } from '@mui/material';
import { colors, font, textStyle } from '../../../assets/style/setup/constants';


export const StyledPopup = styled(Dialog)`
.MuiDialog-paper{
    box-sizing: border-box;
    width: 500px;
    padding: 0.75rem 1.5rem;

    >*{
        padding: 0;
        font-family: ${font.primary.regular};
    }

    .pokemon-id {
        color: ${colors.neutrals[200]};
        ${textStyle.subheading};
        padding-block-end: 0.625rem;
    }

    .MuiDialogTitle-root {
        ${textStyle.largeHeading};
        padding-block-end: 0.75rem;
    }

    .MuiDialogContent-root {
        padding-block: 1rem;
        display: grid;
        justify-items: center;

        img {
            height: 160px;
            padding-block-end: 1.5rem;
        }

        .MuiDialogContentText-root {
            font-family: inherit;
            font-size: 1.125rem;
            line-height: 1.375rem;
            padding: 1.5rem;
            color: ${colors.neutrals[500]};
            background-color: ${colors.primary[60]};

            .pokemon-description {
                margin: 0;
            }

            svg {
                padding-block: 1.5rem;
            }
        }
    }

    .MuiButton-root {
        position: absolute;
        top: 0.75rem;
        right: 1.5rem;
        padding: 0.25rem;
        min-width: fit-content;
    }
}
`
