import styled from "styled-components";
import { colors, font, textStyle } from "../../assets/style/setup/constants";

export const StyledGamingCard = styled.div`
    width: 400px;
    padding: 2rem;
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
        padding: 0.7rem;
        margin: 1rem 1rem 0 1rem;
        background-color: ${colors.primary[60]};

        .pokemon-pwr {
            position: absolute;
            right: 5px;
            font-family: ${font.primary.bold};
            ${textStyle.caption}
            
            span {
                font-family: ${font.primary.regular};
                ${textStyle.xSmall}
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

    .progress-bar {
        height: 10px;
        width: 255px;
        background-color: #87C877;        ;
        border-radius: 10px;
        margin: auto;
    }
`