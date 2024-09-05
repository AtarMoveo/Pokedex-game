import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { colors, font, textStyle } from '../../assets/style/setup/constants'
import { layout } from "../../assets/style/basics/layout";

export const StyledAppHeader = styled.header`
    ${layout.main}
    padding-block: 0.75rem;
    background-color: ${colors.neutrals.white};

    .header-content {
        grid-column: 2;
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 1rem;
        align-items: center;

    .logo-and-nav-container {
        display: flex;
        align-items: center;
        gap: 2.5rem;

        nav {
            display: flex;
            gap: 1rem;
        }
    }
}
`

export const StyledNavLink = styled(NavLink)`
    position: relative;
    font-family: ${font.secondary.regular};
    ${textStyle.body}
    line-height: 0.875rem;
    color: ${colors.primary[300]};
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s;

    &.active {
        font-family: ${font.secondary.bold};
        background-color: ${colors.primary[50]};
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`

export const StyledUserMenu = styled.div`
    position: relative;
    justify-self: end;

    .user-profile {
        display: grid;
        place-items: center;
        width: 44px;
        height: 44px;
    
        background-color: ${colors.primary[50]};
        color: ${colors.primary[300]};
    
        border-radius: 50%;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }

    .sign-out-btn {
        position: absolute;
        top: 100%;
        left: -50%;
        width: 87px;
    }
`