import styled from "styled-components";
import { colors, font, textStyle } from "../../assets/style/setup/constants";

export const StyledPokemonCard = styled.div`
    cursor: pointer;
    padding: 1.5rem;
    display: grid;
    gap: 0.5rem;
    background-color: ${colors.neutrals.white};
    color: ${colors.neutrals[500]};
    font-family: ${font.primary.regular};
    border-radius: 8px;


    .card-title {
        font-family: ${font.primary.bold};
        font-size: 1.5rem;
        color: ${colors.neutrals[400]};
    }

    .img-container {
        position: relative;
        height: 190px;
        display: flex;
        justify-content: center;
        padding: 1.5rem;
        background-color: ${colors.primary[60]};
        border-radius: 2px;

        .pokeball-img {
            position: absolute;
             height: 50px;
             top: -10px;
             left: -10px;
        }

        .pokemon-pwr {
            position: absolute;
            right: 5px;
            top: 6px;
            display: flex;
            align-items: center;
            font-family: ${font.primary.bold};
            ${textStyle.caption}
            
            span {
                font-family: ${font.primary.regular};
                ${textStyle.xSmall}
                margin-inline-end: 4px;
            }
        }

    }

    .pokemon-id {
        font-size: 1rem;
        line-height: 1.625rem;
        color: ${colors.neutrals[200]};
    }

    .pokemon-name {
        font-size: 1.5rem;
        line-height: 2.125rem;
    }
`