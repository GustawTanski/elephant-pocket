import styled, { css } from "styled-components";
import { positionAbsoluteCenter } from "./mixins";

export default styled.input<{disabled: boolean, scalingFactor: number}>`
    left: 0;
    top: 0;
    position: absolute;
    background: transparent;
    outline: 0;
    border: 0;
    font-family: inherit;
    font-size: 36px;
    color: inherit;
    text-align: center;
    ::placeholder{
        color: inherit;
        opacity: 0.3;
    }
    /* ${({ disabled, scalingFactor }) => {
        if (disabled) {
            return css`
                transform: scale(${scalingFactor});
            `
        }
    }} */

`