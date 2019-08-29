import React, { Component } from "react";
import * as S from "./styles";
import Navigation from "./Navigation";
import Logo from "./Logo";


export default class TopBar extends Component {
    render() {
        return (
            <S.TopBar>
                <Logo />
				<Navigation />
            </S.TopBar>
        )
    }
}