import crypter from "../../src/Encryption/crypter";

describe("crypter", () => {
	it("should recognize string hashed by itself", async () => {
		const randomText = "randomtext";
		const hash = await crypter.encrypt(randomText);
		await expect(crypter.compare(randomText, hash)).resolves.toBe(true);
	});

	describe(".compare", () => {
		it("should resolve to false when wrong password provided", async () => {
			const password = "back-end";
			const wrongPassword = "front-end";
			const hash = await crypter.encrypt(password);
			await expect(crypter.compare(wrongPassword, hash)).resolves.toBe(false);
		});
	});
});
