import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { UserModel } from "./entities/user";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import schemaGenerator from "./schemaGenerator";
import cors from "cors";

const app = Express();

const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://ebrahim-2.github.io"],
    optionsSuccessStatus: 200
  })
);
async function main() {
  if (process.env.NODE_ENV === "development") {
    mongoose.set("debug", "true");
  }
  mongoose.Promise = global.Promise;
  mongoose.set("useCreateIndex", true);
  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/auth", {
    useNewUrlParser: true
  });

  const apolloServer = new ApolloServer({
    schema: await schemaGenerator(),
    context: ({ req }) => ({ req, UserModel })
  });

  app.get("/", (req, res) => res.redirect("/graphql"));

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => console.log(`server is ready on port:${port}`));
}

main();
