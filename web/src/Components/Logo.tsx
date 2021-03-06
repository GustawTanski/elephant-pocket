import React from "react";
import { Link } from "react-router-dom";

import * as S from "./styled";

export default (props: any): React.ReactElement => {
	return (
		<S.Logo {...props}>
			<Link to="/">Elephant Pocket</Link>
		</S.Logo>
	);
};
