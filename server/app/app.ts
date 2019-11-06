import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const dotenvConfigResult = dotenv.config();

import { MongoError } from "mongodb";
import cors from "cors";
import UserRESTAPI from "./src/UserInterface/REST/Endpoints/UserRESTAPI";
import UserService from "./src/Core/Component/User/Aplication/Service/UserService";
import UserRepository from "./src/Core/Component/User/Aplication/Repository/MongoDB/UserRepository";
import MongoDBUserPersistanceService from "./src/Infrastructure/MongoDB/MongoDBUserPersistenceService";
import crypter from "./lib/ts-extension/src/Encryption/crypter";
import LoginRESTAPI from "./src/UserInterface/REST/Endpoints/LoginRESTAPI";

if (dotenvConfigResult.error) throw dotenvConfigResult.error;

const PORT = process.env.PORT || "3001";
const MONGODB_URI = process.env.DB_URI;

const app = express();

app.get("/", function bareGet(req, res) {
	res.send("Hello World!");
});

const persistanceService = new MongoDBUserPersistanceService();
const userRepository = new UserRepository(persistanceService);
const userService = new UserService(userRepository, crypter);
const userAPI = new UserRESTAPI(userService);
const loginAPI = new LoginRESTAPI(userService);
app.use(cors());
app.use(express.json());
app.use("/user", userAPI.router);
app.use("/login", loginAPI.router);

app.listen(PORT, function appStarted() {
	console.log(`Listening on ${PORT} port...`);
});

if (MONGODB_URI) {
	mongoose.connect(
		MONGODB_URI,
		{ useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false },
		(err: MongoError) => {
			if (err) console.error(err);
			else console.log("Connected to database...");
		}
	);
} else throw Error("DB_URI wasn't provided!");
