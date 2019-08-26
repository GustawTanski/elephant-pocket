import styled from "styled-components";
import { positionAbsoluteCenter } from "./mixins";

export default styled.input`
    transform: translateY(20vh);
    ${positionAbsoluteCenter()}
    position: fixed;

    background: transparent;
    outline: 0;
    border: 0;
    font: inherit;
    color: inherit;

`