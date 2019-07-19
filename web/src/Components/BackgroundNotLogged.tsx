import React, { Component, ReactNode } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { firstColor } from "../cssVariables";

export interface IBackgroundNotLoggedProps {
    children: ReactNode,
    forceLogin: boolean;
    xToken?: string;
}

class BackgroundNotLogged extends Component<IBackgroundNotLoggedProps>
{
    render(): ReactNode {

        return (<StyledBackground>
            {this.props.children}
        </StyledBackground>);
    }
}

const StyledBackground = styled.main`
    background: ${firstColor};
    width: 100%;
    min-height: 100vh;
`

export default BackgroundNotLogged;