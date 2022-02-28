const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema.js");
const mongoose = require("mongoose");
let cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = 9000;

app.use(cors());

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

app.use(
  `/graphql`,
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
