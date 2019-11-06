export default interface IUserSecretCrypter {
	encrypt: (secret: string, salt?: number) => Promise<string>;
	compare: (data: string, hash: string) => Promise<boolean>;
}
