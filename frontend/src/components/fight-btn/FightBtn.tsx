import { StyledButton } from "./styles";

export enum ButtonType {
    Fight = 'fight',
    Action = 'action',
}

interface FightBtnProps {
    onClick: any
    type: ButtonType
    isDisabled?: boolean
    children: string
}

export function FightBtn({ onClick, type, isDisabled = false, children }: FightBtnProps) {
    return <StyledButton
        type={type}
        disabled={isDisabled}
        onClick={onClick}>
        {children}
    </StyledButton>
}