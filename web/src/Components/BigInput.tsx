import React, { Component, ChangeEvent } from "react";

import * as S from "./styles";
import { BooleanLiteralTypeAnnotation } from "@babel/types";

interface Props {
    type?: string;
    placeholder?: string;
    name?: string;
    disabled?: boolean;
    value?: string;
    onChange?: (event: any) => void;
    spellCheck?: boolean;
}

export default class BigInput extends Component<Props> {
    render() {
        const { ...elementProps } = this.props;
        return <S.BigInput {...elementProps} />
    }
}