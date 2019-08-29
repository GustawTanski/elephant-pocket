import styled from "styled-components";

import LinkContainer from "../LinkContainer";
import LinkContent from "../LinkContent";
import { laptop } from "../../../breakpoints";

export default styled(LinkContainer)`
    grid-row-start: 5;
    align-self: center;
    justify-self: center;
    margin: 5vh 0;
    position: relative;
    ${LinkContent} {
        transition: unset;
        :active {
            transform: unset;
        }
    }
    @media only screen and (min-width: ${laptop}){
        grid-column: 3;
        grid-row: 2;
    }
`