import xToken from "./xToken";
import { setToken } from "../actions";

describe("The xToken reducer", () => {
	it("should return new token, when action is correct", () => {
        const newToken = "314314sdfasfawfa231"
		expect(xToken("", setToken(newToken))).toEqual(newToken);
    });
    
});
