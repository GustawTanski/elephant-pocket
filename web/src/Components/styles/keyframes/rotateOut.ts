import { keyframes } from "styled-components";

export default keyframes`
    0% {
        transform: skewY(0) translateY(0);
    }

    100% {
        transform: skewY(40deg) translateY(50px)
    }
`;
