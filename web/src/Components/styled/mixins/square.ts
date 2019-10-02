import { css } from "styled-components";

export default 
function square(sideLength: number | string, unit: string = "px") {
    return css`
        width: ${sideLength + unit};
        height: ${sideLength + unit};
    `
}