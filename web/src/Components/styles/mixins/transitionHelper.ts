import { FlattenSimpleInterpolation } from "styled-components";

export type transitionStateType = "entered" | "exited" | "exiting" | "entering";

export function transitionMixin(cssRules: {
	entered?: FlattenSimpleInterpolation;
	exited?: FlattenSimpleInterpolation;
	exiting?: FlattenSimpleInterpolation;
	entering?: FlattenSimpleInterpolation;
	default?: FlattenSimpleInterpolation;
}) {
	return ({ transitionState }: { transitionState?: transitionStateType }) => {
		return cssRules[transitionState || "default"];
	};
}
