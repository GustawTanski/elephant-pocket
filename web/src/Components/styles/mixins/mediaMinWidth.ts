import { css, FlattenSimpleInterpolation } from "styled-components";

export default function mediaMinWidth(width: string, cssRules: FlattenSimpleInterpolation ) {
    return css`
        @media only screen and (min-width: ${width}) {
            ${cssRules}
        }
    `
} 