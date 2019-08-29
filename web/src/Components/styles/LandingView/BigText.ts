import styled from "styled-components";
import { mobileMedium, mobileLarge, tablet } from "../../../breakpoints"

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

    /* @media only screen and (min-width: ${tablet}) and (orientation: landscape) {
        grid-row: 1 / -1;
        font-size: 25vh
    } */
`