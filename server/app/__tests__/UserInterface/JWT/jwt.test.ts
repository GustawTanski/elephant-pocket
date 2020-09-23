import jsonwebtoken from "jsonwebtoken";
const testSecret = "testSecret";
process.env.JWT_SECRET = testSecret;
import jwt from "../../../src/UserInterface/REST/JWT/jwt";
import InvalidArgumentError from "../../../src/Core/SharedKernel/Error/InvalidArgumentError";

describe("jwt", () => {
	describe("#sign", () => {
		it("should create valid and matching json web token from string", () => {
			const secretCode = "dogs are awesome!";
			const token = jwt.sign(secretCode);
			const detokenizedCode = jsonwebtoken.decode(token);
			expect(detokenizedCode).toBe(secretCode);
		});
		it("should create valid and matching json web token from object", () => {
			const secretObject = {
				id: 54,
				message: "dogs are awesome!"
			};
			const token = jwt.sign(secretObject);
			const detokenizedObject = jsonwebtoken.decode(token);
			expect(detokenizedObject).toMatchObject(secretObject);
		});
	});
	describe("#decode", () => {
		it("should return matching string when token's origin is string", () => {
			const secretCode = "We need to parse the virtual RAM circuit!";
			const token = jsonwebtoken.sign(secretCode, testSecret);
			const detokenizedCode = jwt.decode(token);
			expect(detokenizedCode).toBe(secretCode);
		});
		it("should return matching string when token's origin is string", () => {
			const secretObject = {
				id: 120,
				message: "If we input the pixel, we can get to the HTTP array through the online ADP feed!"
			};
			const token = jsonwebtoken.sign(secretObject, testSecret);
			const detokenizedObject = jwt.decode(token);
			expect(detokenizedObject).toMatchObject(secretObject);
		});
		it("should return null when token is invalid", () => {
			const invalidToken = "not-a-token";
			const detokenized = jwt.decode(invalidToken);
			expect(detokenized).toBe(null);
		});
	});

	describe("#verify", () => {
		it("should throw InvalidArgumentError when invalid token provided", () => {
			const invalidToken = "not-a-token";
			expect(() => jwt.verify(invalidToken)).toThrow(InvalidArgumentError);
		});
		it("should throw InvalidArgumentError when token made with different key provided", () => {
			const exoticToken = jsonwebtoken.sign("anything", "notLocalSecretKey");
			expect(() => jwt.verify(exoticToken)).toThrow(InvalidArgumentError);
		});
	});
});
