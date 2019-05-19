"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_1 = require("./entities/user");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const mongoose_1 = __importDefault(require("mongoose"));
const schemaGenerator_1 = __importDefault(require("./schemaGenerator"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.env.NODE_ENV === "development") {
            mongoose_1.default.set("debug", "true");
        }
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.set("useCreateIndex", true);
        mongoose_1.default.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        });
        const apolloServer = new apollo_server_express_1.ApolloServer({
            schema: yield schemaGenerator_1.default(),
            context: ({ req }) => ({ req, UserModel: user_1.UserModel })
        });
        const app = express_1.default();
        apolloServer.applyMiddleware({ app });
        app.listen(4000, () => console.log(`server is ready`));
    });
}
main();
