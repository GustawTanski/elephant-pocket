import jsonwebtoken, { DecodeOptions, JsonWebTokenError } from "jsonwebtoken";
import AppRuntimeError from "../../../Core/SharedKernel/Error/AppRuntimeError";
import InvalidArgumentError from "../../../Core/SharedKernel/Error/InvalidArgumentError";

const jwtSecret = process.env.JWT_SECRET;
let secret = "";

if (!jwtSecret) {
	throw new AppRuntimeError("no environment variable JWT_SECRET found");
} else secret = jwtSecret;

export default abstract class jwt {
	static decode(token: string) {
		return jsonwebtoken.decode(token);
	}

	static sign(payload: string | object | Buffer): string {
		return jsonwebtoken.sign(payload, secret);
	}

	static verify(token: string): void {
		try {
			jsonwebtoken.verify(token, secret);
		} catch (error) {
			let newError = error;
			if (error instanceof JsonWebTokenError) newError = new InvalidArgumentError("invalid token");
			throw newError;
		}
	}
}
