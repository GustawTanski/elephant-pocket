import styled from "styled-components";
import { mobileLarge, laptop } from "../../../breakpoints";

export default styled.p`
    grid-row-start: 4;
    font-weight: 700;
    font-size: 1.1em;
    padding-right: 20vw;

    @media only screen and (min-width: ${mobileLarge}) {
        font-size: 4.8vw;
    }

    @media only screen and (min-width: ${laptop}) and (orientation: landscape) {
        font-size: 2vw;
        word-wrap: break-word;
        padding-right: 0;
        grid-column-start: 3;
        grid-row-start: 1;
        align-self: end;
        justify-self: center;
    }
`;
