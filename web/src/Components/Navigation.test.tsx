import Navigation from "./Navigation";

describe("Navigation#didWindowPassedBreakpoint ", () => {
	const navigation = new Navigation({});
	it("should return true when passing breakpoint", () => {
		expect(navigation.didWindowPassedBreakpoint(800, 801, 799)).toBeTruthy();
		expect(navigation.didWindowPassedBreakpoint(800, 799, 801)).toBeTruthy();
	});

	it("should return false when not passing breakpoint", () => {
		expect(navigation.didWindowPassedBreakpoint(800, 500, 501)).toBeFalsy();
		expect(navigation.didWindowPassedBreakpoint(800, 501, 500)).toBeFalsy();
		expect(navigation.didWindowPassedBreakpoint(800, 1000, 1001)).toBeFalsy();
		expect(navigation.didWindowPassedBreakpoint(800, 1001, 1000)).toBeFalsy();
	});
});
