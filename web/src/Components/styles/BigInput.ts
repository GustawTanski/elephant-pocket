import styled, { css } from "styled-components";
import { firstColor } from "../../cssVariables";

export default styled.input<{readOnly: boolean}>`
    left: 0;
    top: 0;
    position: fixed;
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
    overflow: hidden;
    ::placeholder{
        color: inherit;
        opacity: 0.3;
    }
    ${({ readOnly }) => {
        if (readOnly) {
            return css`
                cursor: pointer;
                overflow: visible;
            `
        }
    }}

    /* taking input to front when typing in mobiles */
    @media only screen and (max-height: 300px) and (orientation: landscape) {
        z-index: 1000;
        background-color: ${firstColor};
    } 

`