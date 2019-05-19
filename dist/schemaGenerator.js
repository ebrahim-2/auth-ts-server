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
const type_graphql_1 = require("type-graphql");
const typegoose_middleware_1 = require("./typegoose-middleware");
const mongodb_1 = require("mongodb");
const path_1 = __importDefault(require("path"));
const object_id_scalar_1 = require("./object-id.scalar");
const Register_1 = __importDefault(require("./resolvers/user/Register"));
const Login_1 = __importDefault(require("./resolvers/user/Login"));
const Me_1 = require("./resolvers/user/Me");
const ChangePassword_1 = __importDefault(require("./resolvers/user/ChangePassword"));
const ForgotPassword_1 = __importDefault(require("./resolvers/user/ForgotPassword"));
const AuthFacebook_1 = require("./resolvers/user/AuthFacebook");
const AuthGoogle_1 = __importDefault(require("./resolvers/user/AuthGoogle"));
const schemaGenerator = () => __awaiter(this, void 0, void 0, function* () {
    const schema = yield type_graphql_1.buildSchema({
        resolvers: [
            Register_1.default,
            Login_1.default,
            Me_1.Me,
            ChangePassword_1.default,
            ForgotPassword_1.default,
            AuthFacebook_1.AuthFacebookResolver,
            AuthGoogle_1.default
        ],
        emitSchemaFile: path_1.default.resolve(__dirname, "schema.gql"),
        globalMiddlewares: [typegoose_middleware_1.TypegooseMiddleware],
        scalarsMap: [{ type: mongodb_1.ObjectId, scalar: object_id_scalar_1.ObjectIdScalar }]
    });
    return schema;
});
exports.default = schemaGenerator;
