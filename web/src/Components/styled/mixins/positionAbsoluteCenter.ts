import { css } from "styled-components";

export default function  positionAbsoluteCenter(unset?: "unset"){
    if (unset) return css`
        top: unset;
        left: unset;
        transform: unset;
        position: unset;
    `
    else return css`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
    `
}