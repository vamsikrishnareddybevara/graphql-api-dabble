const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");

const globalErrorHandler = require("./errorHandling/handleError");
const typeDefs = require("./schema.js");
const resolvers = require("./resolvers");
const port = process.env.PORT || 3000;
dotenv.config({ path: "./.env" });

const connectDatabase = () => {
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connection successful");
    })
    .catch((err) => console.log("err", err));
};
const startServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => console.log(`Server is running on ${port}`));
};

// Connect to remote database
connectDatabase();
// Start apollo server
startServer();

// Global error handling
app.use(globalErrorHandler);
