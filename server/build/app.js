"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
// import { encrypt } from "./lib/ts-extension/src/Encryption/crypter";
var dotenvConfigResult = dotenv_1.default.config();
if (dotenvConfigResult.error)
    throw dotenvConfigResult.error;
var PORT = process.env.PORT || "3001";
var MONGODB_URI = process.env.DB_URI;
var app = express_1.default();
app.get("/", function bareGet(req, res) {
    res.send("Hello World!");
});
// const persistanceService = new MongoDBUserPersistanceService();
// const userRepository = new UserRepository(persistanceService);
// const userService = new UserService(userRepository, { encrypt: encrypt });
// const userAPI = new UserRESTAPI(userService);
app.use(cors_1.default());
app.use(express_1.default.json());
// app.use(userAPI.router);
app.listen(PORT, function appStarted() {
    console.log("Listening on " + PORT + " port...");
});
if (MONGODB_URI) {
    mongoose_1.default.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err)
            console.error(err);
        else
            console.log("Connected to database...");
    });
}
else
    throw Error("DB_URI wasn't provided!");
