import styled from "styled-components";
import { colors } from "../../assets/style/setup/constants";

export const StyledPokemonInfo = styled.div`
    display: flex;
    justify-content: space-between;

    >*{
        display: grid;
        gap: 0.5rem;
    }

    h4 {
       color: ${colors.neutrals[400]};
       font-size: 0.875rem;
       line-height: 1.125rem;
    }
`