const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema.js");

const app = express();
const PORT = 9000;

// middleware
// graphqlHTTP takes an argument of a schema object.
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
