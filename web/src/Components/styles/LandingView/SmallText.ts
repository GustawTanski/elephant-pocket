import styled from "styled-components";
import { mobileLarge } from "../../../breakpoints";

export default styled.p`
    grid-row-start: 4;
    font-weight: 700;
    font-size: 1.1em;
    padding-right: 20vw;

    @media only screen and (min-width: ${mobileLarge}) {
        font-size: 4.8vw;
    }
`