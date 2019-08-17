import React, { Component, ReactChild } from "react";
import * as S from "./styles";

interface Props {
    children?: ReactChild
}

export default class TopBar extends Component {
    render() {
        const { children } = this.props;
        return (
            <S.TopBar>
                {children}
            </S.TopBar>
        )
    }
}