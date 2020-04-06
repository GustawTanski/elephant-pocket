import styled from "styled-components";

import LinkContainer from "../LinkContainer";

export default styled(LinkContainer)`
    grid-row-start: 5;
    align-self: center;
    justify-self: center;
    margin: 5vh 0;
    position: relative;
    transition: unset;
    :active {
        transform: unset;
    }
`