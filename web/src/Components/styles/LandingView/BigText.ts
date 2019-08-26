import styled from "styled-components";
import { mobileMedium, mobileLarge } from "../../../breakpoints"

export default styled.h1`
    margin: 0;
    grid-row-start: 3;
    font-size: 3rem;

    @media only screen and (min-width: ${mobileMedium}) and (orientation: portrait) {
        font-size: 4rem;
    }

    @media only screen and (min-width: ${mobileLarge}) {
        font-size: 18vw;
    }
`