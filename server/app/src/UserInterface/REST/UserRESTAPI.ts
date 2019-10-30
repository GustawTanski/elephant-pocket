import IUserService from "../../Core/Port/Service/UserServicePort";
import { Router, Request, Response } from "express";
import { INewUserDTO } from "../../Core/Component/User/Aplication/DTO/NewUserDTO";
import InvalidArgumentError from "../../Core/SharedKernel/Error/InvalidArgumentError";
import AppRuntimeError from "../../Core/SharedKernel/Error/AppRuntimeError";

export default class UserRESTAPI {
	private readonly applicationService: IUserService;
	readonly router: Router = Router();
	private readonly path = "/user";

	constructor(applicationService: IUserService) {
		this.applicationService = applicationService;

		this.router.post(this.path, this.createUser);
	}

	private createUser = async (req: Request, res: Response) => {
		if (this.newUserTypeCheck(req.body)) {
			try {
				const user = await this.applicationService.createUser(req.body);
				return res.status(200).send({ name: user.name, email: user.email });
			} catch (error) {
				if (error instanceof AppRuntimeError || error instanceof InvalidArgumentError)
					return res.status(400).send(error.message);
				else {
					console.error(error);
					return res.status(500).send("Unexpected error ocurred!");
				}
			}
		} else return res.status(400).send("Some types error in request's body!");
	};

	private newUserTypeCheck(userData: any): userData is INewUserDTO {
		if (userData instanceof Object) {
			const { name, password, email, ...rest } = userData;
			console.log(name);
			const nameIsStringOrUndefined = name == void 0 || typeof name == "string";
			const passwordIsString = typeof password == "string";
			const emailIsString = typeof email == "string";
			const restIsEmpty = Object.keys(rest).length == 0;
			return nameIsStringOrUndefined && passwordIsString && emailIsString && restIsEmpty;
		} else return false;
	}
}
