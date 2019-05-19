import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { UserModel } from "./entities/user";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import schemaGenerator from "./schemaGenerator";

async function main() {
  if (process.env.NODE_ENV === "development") {
    mongoose.set("debug", "true");
  }
  mongoose.Promise = global.Promise;
  mongoose.set("useCreateIndex", true);
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });

  const apolloServer = new ApolloServer({
    schema: await schemaGenerator(),
    context: ({ req }) => ({ req, UserModel })
  });
  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => console.log(`server is ready`));
}

main();
