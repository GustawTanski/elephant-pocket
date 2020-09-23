import { Response } from "express";

import AuthenticationError from "../../../../Core/Port/Auth/AuthenticationError";
import InvalidArgumentError from "../../../../Core/SharedKernel/Error/InvalidArgumentError";

export class LoginErrorHandler {
	private response: Response;
	private error: any;

	static handleErrorAndSendResponse(error: any, response: Response) {
		const handler = new LoginErrorHandler(response, error);
		handler.handleLoginError();
	}

	private constructor(response: Response, error: any) {
		this.response = response;
		this.error = error;
	}

	private handleLoginError() {
		if (this.isErrorExpectedForLogin(this.error) && this.response)
			this.response.status(400).send(this.error.message);
		else this.handleUnexpectedError();
	}

	private isErrorExpectedForLogin(error: any): error is InvalidArgumentError | AuthenticationError {
		return error instanceof AuthenticationError || error instanceof InvalidArgumentError;
	}

	private handleUnexpectedError() {
		console.error(this.error);
		this.response.status(500).send("unexpected error occurred");
	}
}
