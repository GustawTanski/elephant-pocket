import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoError } from "mongodb";

const dotenvConfigResult = dotenv.config();
if (dotenvConfigResult.error) throw dotenvConfigResult.error;

const PORT = process.env.PORT || "3001";
const MONGODB_URI = process.env.DB_URI;

const app = express();

app.get("/", function bareGet(req, res) {
	res.send("Hello World!");
});

app.listen(PORT, function appStarted() {
	console.log(`Listening on ${PORT} port...`);
});

if (MONGODB_URI) {
	mongoose.connect(
		MONGODB_URI,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		(err: MongoError) => {
			if (err) console.error(err);
			else console.log("Connected to database...");
		}
	);
} else throw Error("DB_URI wasn't provided!");
