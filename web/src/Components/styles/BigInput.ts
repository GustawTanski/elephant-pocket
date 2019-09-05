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
    text-align: left;
    transform-origin: top left;
    width: 100%;
    padding: 0 2.5%;
    /* margin: 0 auto; */
    ::placeholder{
        color: inherit;
        opacity: 0.3;
    }
    ${({ disabled }) => {
        if (disabled) {
            return css`
                cursor: pointer;
            `
        }
    }}

`