import { Router, Response, Request } from "express";

import IUserService from "../../../../Core/Port/Service/User/UserServiceInterface";
import TypeChecker from "../../TypeChecker/TypeChecker";
import jwt from "../../JWT/jwt";
import { LoginErrorHandler } from "./LoginErrorHandler";
import IPersistedUserDTO from "../../../../Core/Port/Service/User/PersistedUserDTOInterface";

interface LoginBody {
	email: string;
	password: string;
}

export default class LoginRESTAPI {
	readonly router: Router = Router();
	readonly typeChecker = new TypeChecker();

	private readonly userService: IUserService;
	private response: Response = {} as Response;
	private request: Request = {} as Request;
	private body: LoginBody = {} as LoginBody;
	private user: IPersistedUserDTO = {} as IPersistedUserDTO;

	constructor(userService: IUserService) {
		this.userService = userService;
		this.router.post("/", this.logInCallback);
	}

	private logInCallback = async (req: Request, res: Response) => {
		this.response = res;
		this.request = req;
		try {
			await this.logIn();
		} catch (error) {
			LoginErrorHandler.handleErrorAndSendResponse(error, this.response);
		}
	};

	private async logIn() {
		const { body } = this.request;
		if (this.checkLoginBody(body)) {
			this.body = body;
			await this.authenticateUser();
			await this.acquireUserInfo();
			this.sendResponse();
		}
	}

	private checkLoginBody(body: any): body is LoginBody {
		const { email, password, ...rest } = body;
		this.typeChecker.checkString(email, "email");
		this.typeChecker.checkString(password, "password");
		this.typeChecker.checkEmptyObject(rest);
		return true;
	}

	private async authenticateUser(): Promise<void> {
		await this.userService.authenticate(this.body);
	}

	private async acquireUserInfo() {
		const { email } = this.body;
		this.user = await this.userService.findOneByEmail(email);
	}

	private sendResponse() {
		const { id } = this.user;
		const token = jwt.sign({ id });
		this.response
			.status(200)
			.header({ "x-auth-token": token })
			.send();
	}
}
