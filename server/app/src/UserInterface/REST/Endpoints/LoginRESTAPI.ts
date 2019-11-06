import IUserService from "../../../Core/Port/Service/User/UserServiceInterface";
import { Router, Response, Request } from "express";
import TypeChecker from "../TypeChecker/TypeChecker";
import jwt from "../JWT/jwt";
import AuthenticationError from "../../../Core/Port/Auth/AuthenticationError";
import InvalidArgumentError from "../../../Core/SharedKernel/Error/InvalidArgumentError";

interface ILogin {
	email: string;
	password: string;
}

export default class LoginRESTAPI {
	private readonly userService: IUserService;
	readonly router: Router = Router();
	readonly typeChecker = new TypeChecker();
	constructor(userService: IUserService) {
		this.userService = userService;

		this.router.post("/", this.login);
	}

	private login = async (req: Request, res: Response) => {
		try {
			const { body } = req;
			if (this.loginTypeCheck(body)) {
				const { email } = body;
				await this.userService.authenticate(body);
				const user = await this.userService.findOneByEmail(email);
				const { id } = user;
				const token = jwt.sign({ id });
				res
					.status(200)
					.header({ "x-auth-token": token })
					.send();
			}
		} catch (error) {
			this.handleLoginError(error, res);
		}
	};

	private handleLoginError(error: any, res: Response) {
		if (this.isErrorExpectedForLogin(error)) res.status(400).send(error.message);
		else {
			this.handleUnexpectedError(error, res);
		}
	}

	private isErrorExpectedForLogin(error: any): error is InvalidArgumentError | AuthenticationError {
		return error instanceof AuthenticationError || error instanceof InvalidArgumentError;
	}

	private handleUnexpectedError(error: any, res: Response) {
		console.error(error);
		res.status(500).send("unexpected error occurred");
	}
	private loginTypeCheck(body: any): body is ILogin {
		const { email, password, ...rest } = body;
		this.typeChecker.checkString(email, "email");
		this.typeChecker.checkString(password, "password");
		this.typeChecker.checkEmptyObject(rest);
		return true;
	}
}
