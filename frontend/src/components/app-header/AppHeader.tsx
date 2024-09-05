import { NavLink } from "react-router-dom";
import { Button } from "../generic-components/button/Button";
import { StyledAppHeader, StyledNavLink, StyledUserMenu } from "./styles";
import { User } from "../../data/types/user";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import pokeBallImg from '../../assets/img/pokeball.webp'

interface AppHeaderProps {
    user: User | null
}

export function AppHeader({ user }: AppHeaderProps) {
    const { signOut } = useAuthenticator()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return <StyledAppHeader>
        <section className="header-content">
            <div className="logo-and-nav-container">
                <img src="/logo.png" alt="Pokemon-logo" />
                <nav>
                    <StyledNavLink to="/">
                        All Pokemons
                    </StyledNavLink>
                    <StyledNavLink to="/myPokemons" style={{ paddingInlineEnd: '2.3rem' }}>
                        My Pokemons
                        <img style={{ position: 'absolute', height: 15, right: 16 }}
                            src={pokeBallImg} />
                    </StyledNavLink>
                </nav>
            </div>
            {user && <StyledUserMenu>
                <div className="user-profile" data-cy="user-profile" onClick={() => setIsMenuOpen((prev) => !prev)}>
                    {user.email.substring(0, 1).toUpperCase()}
                </div>
                {isMenuOpen && <Button className="sign-out-btn" type="secondary" size="sm" onClick={signOut}>Sign out</Button>}
            </StyledUserMenu>}
            <NavLink to="/fight" data-cy="start-fight-button"> <Button type="primary" size="md">Start a Fight</Button></NavLink>
        </section>
    </StyledAppHeader>
}