import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { UserModel } from "./entities/user";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import schemaGenerator from "./schemaGenerator";
const app = Express();

const port = process.env.PORT || 4000;

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
  
  app.get('/', (req,res)=> res.redirect('/graphql'));

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => console.log(`server is ready on port:${port}`));
}

setInterval(function() {
  app.get("http://stormy-atoll-34870.herokuapp.com");
  app.get("/");
}, 300000); 


main();
