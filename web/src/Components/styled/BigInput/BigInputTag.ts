import styled from "styled-components"
import { rightRounded } from "../mixins";
import { thirdColor } from "../../../globals/cssVariables";

export default styled.div`
    position: relative;
    font-size: 1rem;
    display: inline-block;
    background: ${thirdColor};
    ${rightRounded(20)};
    padding: 0.2em .9em;
    user-select: none;
`