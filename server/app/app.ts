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
import LoginRESTAPI from "./src/UserInterface/REST/Endpoints/Login/LoginRESTAPI";
import DailyLimitBudget from "./src/Core/Component/Budget/Domain/Budget/DailyLimitBudget";
import DateRange from "./lib/ts-extension/src/DateRange/DateRange";
import IncomeEvent from "./src/Core/Component/Budget/Domain/Event/IncomeEvent";
import MongoDBBudgetPersistenceService from "./src/Infrastructure/MongoDB/MongoDBBudgetPersistenceService";
import UserId from "./src/Core/SharedKernel/Component/User/Domain/User/UserId";

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

const budget = new DailyLimitBudget({
	minimalBalance: 0,
	dateRange: new DateRange({ begin: Date.now(), end: Date.now() + 10 ** 6 }),
	ownerId: new UserId()
});
budget.pushEvent(
	new IncomeEvent({
		balanceChange: 100
	})
);
console.log(budget);
const budgetService = new MongoDBBudgetPersistenceService();
budgetService.save(budget);

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
