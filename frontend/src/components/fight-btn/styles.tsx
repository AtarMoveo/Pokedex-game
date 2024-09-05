import styled from "styled-components";
import { colors, font } from "../../assets/style/setup/constants";
import { ButtonType } from "./FightBtn";

interface FightBtnProps {
    type: ButtonType
}

const fightBtn = {
    fight: {
        fontFamily: font.primary.bold,
        fontSize: '3rem',
    
        borderRadius: '50%',
        padding: '5.625rem 3.75rem'
    },
    action: {
        fontSize: '2.5rem',
        borderRadius: '100px',
        height: '90px',
        width: '237px',

        '&:disabled': {
            backgroundColor: colors.primary[50],
            color: colors.neutrals[200],
        }
    }
}

export const StyledButton = styled.button<FightBtnProps>`
    cursor: pointer;
    border: none;
    
    font-family: ${font.primary.regular};
    line-height: 3.25rem;
    color: ${colors.neutrals.white};
    background-color: ${colors.primary[300]};   
    box-shadow: 0px 9px 17.6px 0px #00000040;

    ${(props) => fightBtn[props.type]}
`