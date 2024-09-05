import styled from "styled-components";
import { layout } from "../../assets/style/basics/layout";
import { colors, font } from "../../assets/style/setup/constants";
import { bgFightImgs } from "../../data/data";
import { utilService } from "../../services/util.service";

export const StyledFight = styled.main`
    ${layout.main}
    padding-block: 2.5rem;
    
    .fight-main-container {
        position: relative;
        grid-column: 2;
        display: grid;
        justify-content: center;
        text-align: center;

        .fight-title {
            font-family: ${font.primary.bold};
            font-size: 2.5rem;
            line-height: 2.6875rem;
            color: ${colors.neutrals[400]};
            margin-bottom: 0.5rem;
        }

        .fight-subtitle {
            font-family: ${font.primary.regular};
            font-size: 1.125rem;
            line-height: 1.375rem;
            color: ${colors.neutrals[400]};
        }

        .cards-container {
            margin-top: 14px;
            width: 1360px;
            height: 673px;
            background: url(${getRandBgImg()});
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            border-radius: 8px;

            .btn-container {
                display: grid;
                gap: 32px;
            }
        }
    }
`

function getRandBgImg() {
    const randIdx = utilService.getRandomInt(0, bgFightImgs.length)
    return bgFightImgs[randIdx]
}