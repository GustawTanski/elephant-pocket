import mongoose, { Model, Document } from "mongoose";

export async function mongoBeforeAll() {
	const { MONGO_URL } = process.env;
	if (MONGO_URL)
		await mongoose.connect(MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	else throw Error("MONGO_URL wasn't provided!");
}
export function mongoAfterAll(model?: Model<any, {}>) {
	return async () => {
		if (model) {
			await model.deleteMany({});
		}
		await mongoose.connection.close();
	};
}
