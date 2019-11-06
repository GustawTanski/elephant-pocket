import IUserService from "../../../Core/Port/Service/User/UserServiceInterface";
import { Router, Request, Response } from "express";
import InvalidArgumentError from "../../../Core/SharedKernel/Error/InvalidArgumentError";
import jwt from "../JWT/jwt";
import EmptyQueryError from "../../../Core/Port/Persistence/Error/EmptyQueryError";
import TypeChecker from "../TypeChecker/TypeChecker";
import AppRuntimeError from "../../../Core/SharedKernel/Error/AppRuntimeError";
import INewUserDTO from "../../../Core/Port/Service/User/NewUserDTOInterface";

interface INewUser {
	email: INewUserDTO["email"];
	password: INewUserDTO["password"];
	name: INewUserDTO["name"];
}

export default class UserRESTAPI {
	private readonly applicationService: IUserService;
	readonly router: Router = Router();
	readonly typeChecker = new TypeChecker();
	constructor(applicationService: IUserService) {
		this.applicationService = applicationService;
		this.router.post("/", this.postUser);
		this.router.get("/", this.getAllUsers);
		this.router.get("/:id", this.getUser);
		this.router.delete("/:id", this.deleteUser);
	}

	private postUser = async (req: Request, res: Response) => {
		try {
			const { body } = req;
			if (this.newUserTypeCheck(body)) {
				await this.applicationService.createUser(body);
				const { name, email } = body;
				const { id } = await this.applicationService.findOneByEmail(email);
				const token = jwt.sign({ id });
				res
					.status(200)
					.header({ "x-auth-token": token })
					.send({ name, email, id });
			}
		} catch (error) {
			this.handlePostUserError(error, res);
		}
	};

	private newUserTypeCheck(userData: any): userData is INewUser {
		const { name, password, email, ...rest } = userData;
		this.typeChecker.checkStringOrUndefined(name, "name");
		this.typeChecker.checkString(password, "password");
		this.typeChecker.checkString(email, "password");
		this.typeChecker.checkEmptyObject(rest);
		return true;
	}

	private handlePostUserError(error: any, res: Response) {
		if (this.isErrorExpectedToPostUser(error)) res.status(400).send(error.message);
		else {
			this.handleUnexpectedError(error, res);
		}
	}

	private isErrorExpectedToPostUser(error: any): error is InvalidArgumentError | AppRuntimeError {
		return error instanceof InvalidArgumentError || error instanceof AppRuntimeError;
	}

	private getAllUsers = async (req: Request, res: Response) => {
		const users = await this.applicationService.findAll();
		const usersMappedToResponse = users.map(({ name, email, id }) => ({
			name,
			email,
			id
		}));
		res.status(200).send(usersMappedToResponse);
	};

	private getUser = async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			if (this.typeChecker.checkString(id, "id")) {
				const { name, email } = await this.applicationService.findOneById(id);
				res.status(200).send({ name, email, id });
			}
		} catch (error) {
			this.handleGetUserError(error, res);
		}
	};

	private handleGetUserError(error: any, res: Response) {
		this.handleExpectedGetOrDeleteUserError(error, res);
	}

	private deleteUser = async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			if (this.typeChecker.checkString(id, "id")) {
				const { name, email, id: userId } = await this.applicationService.findOneById(id);
				await this.applicationService.deleteUser(id);
				res.status(200).send({ name, email, id: userId });
			}
		} catch (error) {
			this.handleDeleteUserError(error, res);
		}
	};

	private handleDeleteUserError(error: any, res: Response) {
		return this.handleGetOrDeleteUserError(error, res);
	}

	private handleGetOrDeleteUserError(error: any, res: Response) {
		if (this.isErrorExpectedToGetOrDeleteUser(error))
			this.handleExpectedGetOrDeleteUserError(error, res);
		else {
			this.handleUnexpectedError(error, res);
		}
	}

	private isErrorExpectedToGetOrDeleteUser(
		error: any
	): error is EmptyQueryError | InvalidArgumentError {
		return error instanceof EmptyQueryError || error instanceof InvalidArgumentError;
	}

	private handleExpectedGetOrDeleteUserError(
		error: EmptyQueryError | InvalidArgumentError,
		res: Response
	) {
		const statusCode = error instanceof EmptyQueryError ? 404 : 400;
		res.status(statusCode).send(error.message);
	}

	private handleUnexpectedError(error: any, res: Response) {
		console.error(error);
		res.status(500).send("Unexpected error ocurred!");
	}
}
