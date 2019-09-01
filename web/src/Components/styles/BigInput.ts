import styled, { css } from "styled-components";

export default styled.input<{disabled: boolean}>`
    left: 0;
    top: 0;
    position: fixed;
    z-index: 3;
    background: transparent;
    outline: 0;
    border: 0;
    font-family: inherit;
    font-size: 36px;
    color: inherit;
    text-align: center;
    transform-origin: top left;
    padding: 0 5%;
    width: 100%;
    ::placeholder{
        color: inherit;
        opacity: 0.3;
    }
    /* ${({ disabled }) => {
        if (disabled) {
            return css`
                transform: scale();
            `
        }
    }} */

`