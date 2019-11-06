import bcrypt from "bcrypt";

const saltRounds = 10;

function encrypt(secret: string, salt: number = saltRounds): Promise<string> {
	return bcrypt.hash(secret, salt);
}

function compare(data: string, hash: string): Promise<boolean> {
	debugger;
	return bcrypt.compare(data, hash);
}

const crypter = { encrypt, compare };

export { crypter as default };
