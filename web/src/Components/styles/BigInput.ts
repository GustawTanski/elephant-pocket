import styled, { css } from "styled-components";
import { positionAbsoluteCenter } from "./mixins";

export default styled.input<{disabled?: boolean}>`
    transform: translateY(20vh);
    ${positionAbsoluteCenter()}
    position: fixed;

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
    ${({ disabled }) => {
        if (disabled) {
            return css`
                font-size: 1rem;
            `
        }
    }}

`