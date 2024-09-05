import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../../../assets/style/setup/constants'

type ButtonType = 'primary' | 'secondary' | 'secondary-grey' | 'tertiary' | 'tertiary-grey'
type Size = 'sm' | 'md' | 'lg'

type ButtonProps = {
    type: ButtonType
    size: Size
    onClick?: () => void
    disabled?: boolean
    children?: ReactNode
    className?: string
}

export const Button = ({ type, size, onClick, disabled = false, children, className }: ButtonProps) => {
    return (
        <StyledButton className={className} type={type} size={size} onClick={onClick} disabled={disabled}>
            {children}
        </StyledButton>
    )
}

const StyledButton = styled.button<ButtonProps>`
  font-family: RobotoRegular ,Arial, sans-serif;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

  ${(props) => {
        const BgColors = getButtonBgColor(props.type)
        const colors = getButtonColor(props.type)
        const sizes = getButtonSize(props.size)

        return css`
      color: ${colors.default};
      background-color: ${BgColors.default};
      font-size: ${sizes.fontSize};
      padding: ${sizes.padding};
      line-height: ${sizes.lineHeight};
      border: ${getButtonBorder(props.type)};

      &:hover {
        background-color: ${BgColors.hover};
        color: ${colors.hover};
      }

      &:active {
        background-color: ${BgColors.pressed};
        box-shadow: 4px 4px 13px 0px #0000000D inset;
      }

      &:disabled {
        background-color: ${BgColors.disabled};
        color: ${colors.disabled};
        cursor: not-allowed;
      }
    `
    }}
`

const getButtonBgColor = (type: ButtonType) => {
    switch (type) {
        case 'primary':
            return {
                default: colors.primary[300],
                hover: colors.primary[400],
                pressed: colors.primary[500],
                disabled: colors.neutrals[150],
            }
        case 'secondary':
        case 'tertiary':
            return {
                default: colors.neutrals.white,
                hover: colors.primary[50],
                pressed: colors.primary[100],
                disabled: colors.neutrals.white,
            }
        default:
            return {
                default: colors.neutrals.white,
                hover: colors.neutrals.white,
                pressed: colors.neutrals.white,
                disabled: colors.neutrals.white,
            }
    }
}

const getButtonColor = (type: ButtonType) => {
    switch (type) {
        case 'primary':
            return {
                default: colors.neutrals.white,
                disabled: colors.neutrals[200]
            }
        case 'secondary':
        case 'tertiary':
            return {
                default: colors.primary[300]
            }
        default:
            return {
                default: colors.neutrals[400],
                hover: colors.neutrals[300]
            }
    }
}

const getButtonSize = (size: Size) => {
    switch (size) {
        case 'sm':
            return {
                fontSize: '0.875rem',
                padding: '0.5625rem 1rem',
                lineHeight: '0.875rem',
            }
        case 'md':
            return {
                fontSize: '1rem',
                padding: '0.625rem 1rem',
                lineHeight: '1.25rem',
            }
        default:
            return {
                fontSize: '1rem',
                padding: '0.75rem 1rem',
                lineHeight: '1.5rem'
            }
    }
}

const getButtonBorder = (type: ButtonType) => {
    switch (type) {
        case 'secondary':
            return `1px solid ${colors.primary[300]}`
        case 'secondary-grey':
            return `1px solid ${colors.neutrals[400]}`
        default:
            return 'none'
    }
}