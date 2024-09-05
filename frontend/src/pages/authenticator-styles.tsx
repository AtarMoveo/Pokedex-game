import styled from "styled-components";
import { colors, font } from "../assets/style/setup/constants";
import LoginImg from '../assets/img/login-bg.png'

export const StyledAuthenticator = styled.main`    
    main {
        background-color: ${colors.neutrals[100]};
    }
    
    [data-amplify-authenticator] {
        height: 100vh;
        
        [data-amplify-container] {
            display: grid;
            grid-template-columns: minmax(200px, 1fr) 2fr;
            justify-content: start;
            align-items: center;
            width: 100%;
            height: 100vh;
            background-color: ${colors.primary[300]};

            .pokemon-logo {
                display: grid;
                place-items: center;
                padding: 1rem;
            }

            [data-amplify-router] {
                background: url(${LoginImg});
                height: 100%;
                display: grid;
                place-items: center;
                background-color: ${colors.neutrals.white};

                >*{
                    background-color: ${colors.neutrals.white};
                }
                .amplify-tabs {
                    background-color: ${colors.neutrals.white};
                    min-width: 425px;
                    border: 1px solid ${colors.neutrals[150]};
                    border-radius: 12px;

                    .amplify-tabs__panel {
                        padding: 0;
                    }

                    .amplify-tabs__list {
                        border-top: none;
                    }

                    .amplify-tabs__item {
                        border: none;
                        text-align: start;
                        padding-inline: 1.5rem;
                        padding-block-start: 1.5rem;
                        font-size: 1.2rem;
                        &:hover {
                            color: ${colors.primary[300]};
                        }
                    }

                    .amplify-tabs__item--active {
                        color: ${colors.primary[300]};
                        border: none;
                    }
                }

                [data-amplify-form] {
                    padding: 1.5rem;
                    max-width: 500px;
                    border-radius: 12px;

                    .amplify-label {
                        font-family: ${font.secondary.regular};
                        font-size: 0.875rem;
                        line-height: 1.375rem;
                        color: ${colors.neutrals[400]};
                    }

                    .amplify-input {
                        outline: none; 
                        box-shadow: none;
                        &:focus {
                            border-style: none;
                            outline-style: none;
                            outline-offset: none;
                            border: 1px solid ${colors.neutrals[400]};
                        }
                    }

                    .amplify-button--primary {
                        background-color: ${colors.primary[300]};
                        font-weight: 400;
                    }

                    .amplify-button--small {
                        color: ${colors.primary[300]};
                        font-weight: 400;
                        font-size: 1rem;
                        &:hover {
                            background-color: ${colors.primary[60]};
                        }
                    }

                    .amplify-field__show-password {
                        &:hover {
                            background-color: ${colors.primary[60]};
                            border-color: ${colors.primary[300]};
                            border-inline-start-color: transparent;
                        }
                    }

                    [data-amplify-footer]{
                        padding-bottom: 0;
                    }
                }

                [data-amplify-authenticator-confirmsignup] {
                    .amplify-field-group__control:not(.amplify-button--primary) {
                        &:hover {
                            background-color: ${colors.primary[60]};
                            border-color: ${colors.primary[300]};
                        }
                    }
                }
            }
        }
    }
`
