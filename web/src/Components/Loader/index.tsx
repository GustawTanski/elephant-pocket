import React from "react";
import loader from "./loader.svg";

export default function Loader() {
	return (
		<img
			src={loader}
			alt="loader"
			style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
		/>
	);
}
