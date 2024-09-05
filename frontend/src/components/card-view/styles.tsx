import styled from "styled-components";

export const StyledCardView = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    justify-content: center;

    button {
        grid-column: 1/-1;
        justify-self: center;
    }
`