import { css } from "styled-components";

export default function  positionAbsoluteCenter(){
    return css`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
    `
}